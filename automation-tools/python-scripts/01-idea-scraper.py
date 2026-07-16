#!/usr/bin/env python3
"""
01-idea-scraper.py — Daily idea generation from multiple sources.

Pulls:
  1. YouTube Trending (RSS) for a country
  2. Reddit hot posts from configurable subreddits
  3. Google Trends rising queries
  4. TubeBuddy/VidIQ style seed keywords (simple combinatorics)

Outputs:
  - ideas.csv with columns: source, title, url, score, suggested_keyword
  - Optional: Discord webhook ping with top 10 ideas

Usage:
  python 01-idea-scraper.py --niche "make money online" --days 7
  python 01-idea-scraper.py --config config.json

Dependencies: pip install feedparser praw pytrends python-dotenv discord-webhook pandas
"""

import argparse
import csv
import json
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path

try:
    import feedparser
    import pandas as pd
    import praw
    from dotenv import load_dotenv
    from pytrends.request import TrendReq
except ImportError as e:
    print(f"Missing dependency: {e}. Run: pip install -r requirements.txt")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Load env
# ---------------------------------------------------------------------------
load_dotenv()

# Defaults — customize via CLI args or config file
DEFAULT_SUBREDDITS = {
    "make money online": ["sidehustle", "beermoney", "Entrepreneur", "passive_income", "WorkOnline"],
    "tech": ["technology", "startups", "SaaS", "ArtificialInteligence"],
    "self improvement": ["DecidingToBeBetter", "productivity", "selfimprovement"],
    "general": ["videos", "popular", "todayilearned"],
}

# ---------------------------------------------------------------------------
# Source 1: Reddit hot posts
# ---------------------------------------------------------------------------
def scrape_reddit(subreddits: list[str], limit: int = 25, min_score: int = 50) -> list[dict]:
    """Pull hot posts from Reddit using PRAW."""
    ideas = []
    try:
        reddit = praw.Reddit(
            client_id=os.getenv("REDDIT_CLIENT_ID", ""),
            client_secret=os.getenv("REDDIT_CLIENT_SECRET", ""),
            user_agent=os.getenv("REDDIT_USER_AGENT", "yacc-idea-bot/0.1"),
            check_for_async=False,
        )
        for sub_name in subreddits:
            try:
                sub = reddit.subreddit(sub_name)
                for post in sub.hot(limit=limit):
                    if post.score < min_score:
                        continue
                    if post.over_18:
                        continue
                    ideas.append({
                        "source": f"reddit.com/r/{sub_name}",
                        "title": post.title,
                        "url": f"https://reddit.com{post.permalink}",
                        "score": post.score,
                        "suggested_keyword": post.title.lower()[:80],
                    })
            except Exception as e:
                print(f"  [!] Reddit scrape failed for r/{sub_name}: {e}")
    except Exception as e:
        print(f"  [!] Reddit not configured or failed: {e}")
        print("      Set REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USER_AGENT in .env")

    return ideas


# ---------------------------------------------------------------------------
# Source 2: YouTube Trending RSS (no API key needed)
# ---------------------------------------------------------------------------
def scrape_youtube_trending(region: str = "US", limit: int = 20) -> list[dict]:
    """Pull trending YouTube videos via RSS feed."""
    ideas = []
    try:
        feed = feedparser.parse(
            f"https://www.youtube.com/feeds/videos.xml?regionCode={region.upper()}&chart=mostPopular"
        )
        for entry in feed.entries[:limit]:
            ideas.append({
                "source": f"youtube-trending-{region}",
                "title": entry.title,
                "url": entry.link,
                "score": entry.get("media_statistics", {}).get("views", "0"),
                "suggested_keyword": entry.title.lower()[:80],
            })
    except Exception as e:
        print(f"  [!] YouTube trending fetch failed: {e}")

    return ideas


# ---------------------------------------------------------------------------
# Source 3: Google Trends — rising queries
# ---------------------------------------------------------------------------
def scrape_google_trends(keywords: list[str]) -> list[dict]:
    """Pull rising related queries from Google Trends."""
    ideas = []
    try:
        pytrends = TrendReq(hl="en-US", tz=360)
        pytrends.build_payload(keywords, cat=0, timeframe="now 7-d", geo="", gprop="youtube")
        related = pytrends.related_queries()
        for kw in keywords:
            if kw in related and related[kw] is not None and "rising" in related[kw] and related[kw]["rising"] is not None:
                for _, row in related[kw]["rising"].head(10).iterrows():
                    ideas.append({
                        "source": "google-trends-rising",
                        "title": f"Rising topic: {row['query']} (+{row['value']}%)",
                        "url": f"https://www.youtube.com/results?search_query={row['query'].replace(' ', '+')}",
                        "score": row["value"],
                        "suggested_keyword": row["query"],
                    })
    except Exception as e:
        print(f"  [!] Google Trends fetch failed (rate limited?): {e}")

    return ideas


# ---------------------------------------------------------------------------
# Source 4: Keyword combinator seed ideas (simple)
# ---------------------------------------------------------------------------
def seed_keyword_ideas(niche_keywords: list[str]) -> list[dict]:
    """Generate listicle/how-to/warning titles from seed keywords."""
    templates = [
        "5 {kw} that actually work in {year}",
        "How to start {kw} in {year} (step by step)",
        "Why 90% of people fail at {kw} (and how not to)",
        "Best {kw} for beginners in {year}",
        "I tried {kw} for 30 days — here's what happened",
        "Never do this with {kw} — it will cost you",
        "{kw} secrets nobody tells you",
        "How much money can you make from {kw} in {year}?",
        "{kw} mistakes that are costing you thousands",
        "The truth about {kw} in {year}",
    ]
    year = datetime.now().year
    ideas = []
    for kw in niche_keywords:
        for tmpl in templates:
            title = tmpl.format(kw=kw, year=year)
            ideas.append({
                "source": "seed-template",
                "title": title,
                "url": "",
                "score": 0,
                "suggested_keyword": kw,
            })
    return ideas


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------
def save_csv(ideas: list[dict], path: str):
    fieldnames = ["source", "title", "url", "score", "suggested_keyword"]
    df = pd.DataFrame(ideas, columns=fieldnames)
    df.to_csv(path, index=False, encoding="utf-8")
    print(f"  [✓] Saved {len(df)} ideas → {path}")


def send_discord_digest(ideas: list[dict], webhook_url: str, top_n: int = 10):
    """Send top ideas to a Discord webhook."""
    try:
        from discord_webhook import DiscordWebhook, DiscordEmbed
        webhook = DiscordWebhook(url=webhook_url)
        embed = DiscordEmbed(
            title=f"💡 Daily Idea Digest — {datetime.now().strftime('%Y-%m-%d')}",
            description=f"Top {min(top_n, len(ideas))} ideas today:",
            color="03b2f8",
        )
        for i, idea in enumerate(ideas[:top_n], 1):
            embed.add_embed_field(
                name=f"{i}. ({idea['source']})",
                value=f"[{idea['title'][:90]}]({idea['url']})" if idea['url'] else idea['title'][:100],
                inline=False,
            )
        webhook.add_embed(embed)
        webhook.execute()
        print(f"  [✓] Sent top {top_n} ideas to Discord")
    except Exception as e:
        print(f"  [!] Discord webhook failed: {e}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(description="YouTube automation idea scraper")
    parser.add_argument("--niche", default="general", help="Niche key (from DEFAULT_SUBREDDITS or custom)")
    parser.add_argument("--keywords", nargs="+", default=[], help="Extra seed keywords for Google Trends + seed titles")
    parser.add_argument("--subreddits", nargs="+", default=[], help="Override subreddits to scrape")
    parser.add_argument("--region", default="US", help="YouTube trending region code (US, GB, IN, etc.)")
    parser.add_argument("--days", type=int, default=7, help="Trend window days")
    parser.add_argument("--limit", type=int, default=20, help="Posts per source")
    parser.add_argument("--output", default="ideas.csv", help="Output CSV path")
    parser.add_argument("--no-discord", action="store_true", help="Skip Discord notification")
    args = parser.parse_args()

    print(f"🚀 Scraping ideas for niche: {args.niche}")
    all_ideas: list[dict] = []

    # 1. Reddit
    subs = args.subreddits or DEFAULT_SUBREDDITS.get(args.niche.lower(), DEFAULT_SUBREDDITS["general"])
    print(f"  → Reddit ({len(subs)} subs: {', '.join(subs)})")
    all_ideas.extend(scrape_reddit(subs, limit=args.limit))

    # 2. YouTube trending
    print(f"  → YouTube Trending ({args.region})")
    all_ideas.extend(scrape_youtube_trending(region=args.region, limit=args.limit))

    # 3. Google Trends
    trend_keywords = args.keywords or [args.niche]
    print(f"  → Google Trends (kw: {trend_keywords})")
    all_ideas.extend(scrape_google_trends(trend_keywords))

    # 4. Seed titles
    seed_kws = args.keywords or [args.niche]
    print(f"  → Seed templates ({len(seed_kws)} keywords)")
    all_ideas.extend(seed_keyword_ideas(seed_kws))

    # Sort by score desc (string safety)
    def _score(idea):
        try:
            return float(idea["score"])
        except (ValueError, TypeError):
            return 0

    all_ideas.sort(key=_score, reverse=True)

    # Save
    out_path = Path(args.output)
    save_csv(all_ideas, str(out_path))

    # Discord
    webhook = os.getenv("DISCORD_WEBHOOK_URL", "")
    if webhook and not args.no_discord:
        send_discord_digest(all_ideas, webhook)
    elif not webhook:
        print("  [i] Set DISCORD_WEBHOOK_URL in .env to receive daily digests")

    # Print top 10 to console
    print("\n🏆 Top 10 ideas:")
    for i, idea in enumerate(all_ideas[:10], 1):
        print(f"  {i:2}. [{idea['source'][:25]:25}] {idea['title'][:80]}")


if __name__ == "__main__":
    main()
