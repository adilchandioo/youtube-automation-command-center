# ⚙️ Automation Tools & Scripts

We automate everything that can be automated. Humans do the creative/approval work; machines do the repetitive work.

---

## Philosophy

- **Rule of 80/20**: Automate 80%, human-approve 20%. We NEVER auto-publish without human QA.
- **Start simple**: Google Sheets + Python cron jobs = enough for MVP. Don't over-engineer.
- **Upgrade progressively**: n8n / Make.com when manual steps become a bottleneck. Custom app at scale.
- **Fail loudly**: if a script breaks, it should email/Slack alert immediately. Silent failures = missed uploads = lost money.

---

## Directory

- `python-scripts/` — Python utilities (idea scraping, stats pulling, SEO helpers)
- `n8n-workflows/` — n8n workflow JSON exports (import directly into n8n)
- `make-com/` — Make.com scenario blueprints
- `zapier/` — Zapier zaps (simpler automations)
- `scripts/` — Bash utility scripts (backup, deploy, etc.)

---

## MVP Automations (Build these first, in order)

### 1. Daily Idea Scraper (Python)
- Pulls YouTube Trending RSS
- Pulls Reddit hot posts from niche subreddits
- Pulls Google Trends rising queries
- Outputs 20 ideas to Google Sheet / Trello
- Runs daily via cron
- File: `python-scripts/01-idea-scraper.py`

### 2. Competitor Tracker (Python)
- Monitors 10 competitor channels per niche
- Alerts on Discord when they post a new video
- Logs video stats (views at 24h, 7d, 30d)
- File: `python-scripts/02-competitor-tracker.py`

### 3. KPI Snapshot (Python + cron)
- Pulls channel stats via YouTube Data API daily
- Appends to `analytics/kpi-trackers/channel-kpis-daily.csv`
- Fires alert if any video is spiking (viral) or if any strikes appear
- File: `python-scripts/03-kpi-snapshot.py`

### 4. Auto-Description/Tag Generator (Python + OpenAI)
- Takes script + keyword, generates SEO description and tags via GPT
- Outputs ready-to-paste text file
- File: `python-scripts/04-seo-generator.py`

### 5. New-Published Webhook (n8n)
- Trigger: new video published (YouTube RSS poll)
- Actions: post to Discord, post to Twitter/X, add to Buffer for TikTok/IG, send email to list

### 6. Comment AI Reply Assistant (n8n + OpenAI)
- Polls new comments via YouTube API every hour
- Uses GPT-4o-mini to draft friendly reply
- Sends to Discord for human approval
- Approved replies posted via API

---

## Stack at Scale (Months 4+)

- **n8n** self-hosted as central orchestrator
- **Postgres** database replacing Google Sheets
- **BigQuery** for analytics at scale
- **GitHub Actions** or **cron** on VPS for Python scripts
- **Slack/Discord webhooks** for all alerts
- **Sentry** for error tracking
- **Custom React dashboard** (this repo's `mobile-dashboard/`) connected directly to Postgres

---

## Setup Python Env

```bash
cd automation-tools/python-scripts
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example ../../.env   # fill in keys
```

## Adding a New Script

1. Put script in `python-scripts/` with a numbered prefix (05-xxx.py)
2. Add dependencies to `requirements.txt`
3. Add a README section in script header explaining usage
4. If it needs keys, document in `.env.example`
5. If it runs on cron, document the cron schedule
