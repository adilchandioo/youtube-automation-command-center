# 🏗 System Architecture — YouTube Automation Command Center

## High-Level Flow

```
 ┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
 │  IDEA INGEST    │────▶│  PRODUCTION      │────▶│  PUBLISH +      │
 │  (trends,       │     │  PIPELINE        │     │  DISTRIBUTION   │
 │   competitors,  │     │  (script→VO→edit)│     │                 │
 │   Reddit, etc.) │     │                  │     │                 │
 └────────┬────────┘     └────────┬─────────┘     └────────┬────────┘
          │                       │                        │
          ▼                       ▼                        ▼
 ┌─────────────────────────────────────────────────────────────────┐
 │                   AUTOMATION LAYER (n8n / Make / Python)        │
 └────────┬──────────────────────────────────────────────┬─────────┘
          │                                              │
          ▼                                              ▼
 ┌─────────────────┐                           ┌─────────────────┐
 │  NOTION / TRELLO│                           │  ANALYTICS DB   │
 │  (task mgmt)    │                           │  (Google Sheets/│
 │                 │                           │   BigQuery)     │
 └─────────────────┘                           └────────┬────────┘
                                                         │
                                                         ▼
                                               ┌─────────────────┐
                                               │ MOBILE DASHBOARD│
                                               │ (React PWA)     │
                                               └─────────────────┘
```

---

## Component Details

### 1. Idea Ingest Layer
- **Sources**: YouTube Trending RSS, TubeBuddy keyword explorer, Reddit API (r/sidehustle, r/entrepreneur, niche subs), Google Trends, AnswerThePublic, competitor channel RSS
- **Output**: Trello/Notion cards in "Idea Backlog" list with:
  - Proposed title
  - Keyword cluster
  - Estimated search volume
  - Competitor reference URLs
  - Hook suggestion

### 2. Production Pipeline (7 stages — see `content-pipeline/`)
Each stage has a STATUS field and an ASSIGNEE. SLA per video: 48–72 hours end-to-end in MVP.

| Stage | Tool | Owner |
|---|---|---|
| Idea | Auto + human | Founder |
| Research | Perplexity + manual | Writer |
| Script | GPT-4/Claude + writer edit | Writer |
| Approve script | Google Docs comment | Founder/Manager |
| Voiceover | ElevenLabs API / manual | VA |
| Edit | CapCut / Descript / VA editor | Editor |
| Thumbnail | Canva + Midjourney | Designer |
| SEO + upload | TubeBuddy + YouTube Studio | Uploader VA |
| Approve & schedule | YouTube Studio review | Founder/Manager |
| Publish | Scheduled | Automated |

### 3. Automation Layer
- **Orchestrator**: n8n (self-hosted, docker-compose) or Make.com
- **Custom scripts**: Python 3.11+ in `automation-tools/python-scripts/`
- **Trigger**: Cron (daily idea digests, weekly reports) + webhooks (new Trello card, YouTube Studio webhook)

### 4. Data Layer
- **Primary store**: Google Sheets (MVP) → BigQuery (scale)
- **KPIs pulled via**: YouTube Data API v3
- **Revenue data**: YouTube Analytics API + affiliate dashboards (manual CSV import MVP, API at scale)
- **Refresh**: Hourly for last 48h videos, daily for channel rollups

### 5. Presentation Layer — Mobile Dashboard
- **Stack**: React + Vite + Tailwind + Recharts (see `mobile-dashboard/`)
- **Auth**: Simple password + optional Google OAuth
- **Hosting**: Vercel free tier (MVP)
- **Shows**: Channel list, today/7d/30d views/subs/revenue, top videos, alerts (strikes, trending videos, comment spikes)

---

## Data Contracts

### Video Object (canonical)
```json
{
  "video_id": "dQw4w9WgXcQ",
  "channel_id": "UCxxx",
  "title": "5 Side Hustles That Actually Work in 2026",
  "niche": "make-money-online",
  "status": "published",
  "script_url": "https://docs.google.com/...",
  "vo_file": "gs://bucket/vo/xxx.mp3",
  "edit_project": "https://capcut.com/...",
  "thumbnail_a": "gs://thumbs/xxx-a.png",
  "thumbnail_b": "gs://thumbs/xxx-b.png",
  "publish_date": "2026-07-20T10:00:00Z",
  "kpis": {
    "views_24h": 4200,
    "ctr_24h": 0.087,
    "avd_24h": 0.48,
    "likes": 310,
    "comments": 42
  }
}
```

### Channel Object
```json
{
  "channel_id": "UCxxx",
  "name": "Side Hustle King",
  "niche": "make-money-online",
  "launched": "2026-07-10",
  "monetized": false,
  "subs": 342,
  "watch_hours_lifetime": 1200,
  "kpi_targets": {"ctr": 0.08, "avd": 0.40, "upload_freq_per_week": 3}
}
```

---

## Security & Keys

- `.env` file (never commit) for API keys:
  - `YOUTUBE_API_KEY`
  - `YOUTUBE_CLIENT_ID/SECRET` (OAuth for uploads)
  - `OPENAI_API_KEY`
  - `ELEVENLABS_API_KEY`
  - `NOTION_API_KEY` / Trello keys
  - `N8N_WEBHOOK_SECRET`
- Use restricted API keys where possible (IP whitelist, scope limits)
- Rotate keys every 90 days
- All `.env` files are gitignored

---

## Evolution Path

- **MVP (weeks 1–4)**: Python scripts + Google Sheets + manual triggers + Make.com free tier
- **V1 (months 2–3)**: n8n self-hosted, BigQuery, mobile dashboard v1
- **V2 (months 4–6)**: Custom Postgres DB, proper auth, AI auto-reply to comments
- **V3 (months 6+)**: Internal web app replacing Notion/Trello, custom CMS, multi-tenant if spun out as SaaS
