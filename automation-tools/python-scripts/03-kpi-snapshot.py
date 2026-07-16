#!/usr/bin/env python3
"""
03-kpi-snapshot.py — Daily KPI pull from YouTube Data API.

Pulls stats for all configured channels + recent videos, appends to CSV,
and optionally alerts on viral spikes or strikes.

Usage:
  python 03-kpi-snapshot.py
  python 03-kpi-snapshot.py --config ../../analytics/dashboards/mobile-dashboard-config.json

Dependencies: pip install google-api-python-client python-dotenv pandas discord-webhook
"""

import argparse
import csv
import json
import os
import sys
from datetime import datetime
from pathlib import Path

try:
    import pandas as pd
    from dotenv import load_dotenv
    from googleapiclient.discovery import build
except ImportError as e:
    print(f"Missing dependency: {e}")
    sys.exit(1)

load_dotenv()

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
DEFAULT_CONFIG = Path(__file__).parent.parent.parent / "analytics" / "dashboards" / "mobile-dashboard-config.json"
TRACKER_CSV = Path(__file__).parent.parent.parent / "analytics" / "kpi-trackers" / "channel-kpis-daily.csv"
VIDEO_CSV = Path(__file__).parent.parent.parent / "analytics" / "kpi-trackers" / "video-kpis-48h.csv"


def load_config(path: Path) -> dict:
    if path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    return {"channels": []}


def get_youtube_client():
    key = os.getenv("YOUTUBE_API_KEY")
    if not key:
        print("[!] YOUTUBE_API_KEY not set in .env")
        sys.exit(1)
    return build("youtube", "v3", developerKey=key)


# ---------------------------------------------------------------------------
# Fetch channel stats
# ---------------------------------------------------------------------------
def fetch_channel_stats(youtube, channel_id: str) -> dict:
    req = youtube.channels().list(
        part="snippet,statistics,contentDetails,status",
        id=channel_id,
    )
    resp = req.execute()
    if not resp.get("items"):
        return {}
    item = resp["items"][0]
    s = item["statistics"]
    return {
        "subscribers": int(s.get("subscriberCount", 0)),
        "total_views": int(s.get("viewCount", 0)),
        "video_count": int(s.get("videoCount", 0)),
        "hidden_subs": s.get("hiddenSubscriberCount", False),
    }


# ---------------------------------------------------------------------------
# Fetch recent videos (last 7 days)
# ---------------------------------------------------------------------------
def fetch_recent_videos(youtube, channel_id: str, days: int = 7) -> list[dict]:
    """Fetch videos uploaded in last N days and their stats."""
    # Get uploads playlist id
    ch = youtube.channels().list(part="contentDetails", id=channel_id).execute()
    uploads_id = ch["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]

    # Fetch recent playlist items
    videos = []
    next_page = None
    cutoff = datetime.utcnow().timestamp() - days * 86400
    while True:
        resp = youtube.playlistItems().list(
            part="snippet,contentDetails",
            playlistId=uploads_id,
            maxResults=20,
            pageToken=next_page,
        ).execute()
        for it in resp.get("items", []):
            vid_id = it["contentDetails"]["videoId"]
            published = it["snippet"]["publishedAt"]  # ISO 8601
            pub_dt = datetime.fromisoformat(published.replace("Z", "+00:00"))
            if pub_dt.timestamp() < cutoff:
                return videos  # playlist is newest-first, so bail early
            videos.append({"video_id": vid_id, "title": it["snippet"]["title"], "published_at": published})
        next_page = resp.get("nextPageToken")
        if not next_page:
            break
    return videos


def fetch_video_stats(youtube, video_ids: list[str]) -> dict:
    """Bulk fetch stats for a list of videos."""
    out = {}
    # API allows max 50 ids per call
    for i in range(0, len(video_ids), 50):
        batch = video_ids[i:i+50]
        resp = youtube.videos().list(
            part="statistics,contentDetails",
            id=",".join(batch),
        ).execute()
        for it in resp.get("items", []):
            s = it["statistics"]
            out[it["id"]] = {
                "views": int(s.get("viewCount", 0)),
                "likes": int(s.get("likeCount", 0)),
                "comments": int(s.get("commentCount", 0)),
            }
    return out


# ---------------------------------------------------------------------------
# Alerts
# ---------------------------------------------------------------------------
def alert(message: str):
    print(f"  🚨 {message}")
    webhook = os.getenv("DISCORD_WEBHOOK_URL", "")
    if webhook:
        try:
            from discord_webhook import DiscordWebhook
            DiscordWebhook(url=webhook, content=f"🚨 YACC Alert: {message}").execute()
        except Exception as e:
            print(f"  [!] Discord alert failed: {e}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", default=str(DEFAULT_CONFIG))
    parser.add_argument("--days", type=int, default=7)
    args = parser.parse_args()

    cfg = load_config(Path(args.config))
    channels = cfg.get("channels", [])
    if not channels:
        print("[!] No channels configured. Edit analytics/dashboards/mobile-dashboard-config.json and set youtubeChannelId.")
        sys.exit(0)

    youtube = get_youtube_client()

    today = datetime.utcnow().strftime("%Y-%m-%d")
    rows_to_add = []
    viral_threshold = cfg.get("alerts", {}).get("viralVideoViewsThreshold24h", 50000)

    print(f"📊 KPI snapshot for {today}")
    for ch in channels:
        ch_id = ch.get("youtubeChannelId", "")
        if not ch_id:
            print(f"  [!] {ch['name']}: youtubeChannelId not set, skipping")
            continue
        print(f"  → {ch['name']}")
        stats = fetch_channel_stats(youtube, ch_id)
        if not stats:
            print(f"    [!] Failed to fetch stats")
            continue
        # Get yesterday's subs if we have it (for delta)
        prev_subs = None
        if TRACKER_CSV.exists():
            try:
                hist = pd.read_csv(TRACKER_CSV)
                ch_hist = hist[(hist["channel_id"] == ch["id"]) & (hist["date"] != today)]
                if not ch_hist.empty:
                    prev_subs = int(ch_hist.sort_values("date").iloc[-1]["subscribers"])
            except Exception:
                prev_subs = None

        subs_delta = stats["subscribers"] - prev_subs if prev_subs is not None else 0
        print(f"    Subs: {stats['subscribers']:,} (+{subs_delta}) | Total views: {stats['total_views']:,}")

        # Fetch recent videos & their stats
        recent = fetch_recent_videos(youtube, ch_id, days=args.days)
        vstats = fetch_video_stats(youtube, [v["video_id"] for v in recent]) if recent else {}

        # Views in last 24h approximation: views on videos <48h old
        views_24h = 0
        for v in recent:
            v_age_h = (datetime.utcnow() - datetime.fromisoformat(v["published_at"].replace("Z", "+00:00"))).total_seconds() / 3600
            if v_age_h < 48 and v["video_id"] in vstats:
                views = vstats[v["video_id"]]["views"]
                views_24h += views
                if views > viral_threshold:
                    alert(f"VIRAL: '{v['title'][:60]}' on {ch['name']} has {views:,} views in <48h!")

        rows_to_add.append({
            "date": today,
            "channel_id": ch["id"],
            "channel_name": ch["name"],
            "subscribers": stats["subscribers"],
            "subs_gained_24h": subs_delta,
            "total_views": stats["total_views"],
            "views_24h": views_24h,
            "watch_time_hours_24h": "",  # needs YouTube Analytics API (OAuth)
            "revenue_ads_24h": "",
            "revenue_affiliate_24h": "",
            "revenue_sponsor_24h": "",
            "avg_ctr_pct": "",  # needs Analytics API
            "avg_avd_pct": "",
            "videos_published_total": stats["video_count"],
            "videos_in_backlog": "",
            "notes": "",
        })

    # Append to CSV
    TRACKER_CSV.parent.mkdir(parents=True, exist_ok=True)
    file_exists = TRACKER_CSV.exists()
    with TRACKER_CSV.open("a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows_to_add[0].keys()) if rows_to_add else [])
        if not file_exists:
            writer.writeheader()
        writer.writerows(rows_to_add)
    print(f"  [✓] Appended {len(rows_to_add)} rows → {TRACKER_CSV}")

    # Print daily summary
    total_subs = sum(r["subscribers"] for r in rows_to_add)
    total_views_today = sum(r["views_24h"] for r in rows_to_add if isinstance(r["views_24h"], int))
    total_delta = sum(r["subs_gained_24h"] for r in rows_to_add)
    print(f"\n  📈 Network totals: {total_subs:,} subs (+{total_delta}), ~{total_views_today:,} views in last 48h")


if __name__ == "__main__":
    main()
