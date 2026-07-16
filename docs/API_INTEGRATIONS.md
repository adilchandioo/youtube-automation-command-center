# 🔌 API Integrations Reference

All keys go in `.env` (copy from `.env.example`). Never commit keys.

---

## YouTube Data API v3

**Docs**: https://developers.google.com/youtube/v3
**Use**: Pull analytics, upload videos, manage playlists, read comments

### Key endpoints used:
| Endpoint | What for |
|---|---|
| `videos.list` | Get video stats (views, likes, comments, duration) |
| `channels.list` | Channel subscriber count, thumbnail, stats |
| `search.list` | Find competitor videos by keyword |
| `commentThreads.list` | Pull comments for AI replies |
| `playlists.list` / `playlistItems.list` | Manage playlists |
| `videoCategories.list` | Map category IDs |

### Quota:
- 10,000 units/day free
- A video upload = 1,600 units (be careful!)
- A `videos.list` read = 1 unit — fine for hourly polling

### OAuth scopes needed for uploads:
- `https://www.googleapis.com/auth/youtube.upload`
- `https://www.googleapis.com/auth/youtube.readonly`

---

## OpenAI API (GPT-4, DALL-E, Whisper)

**Docs**: https://platform.openai.com/docs
**Use**: Script generation, SEO titles/tags, comment replies, thumbnail briefs, transcript cleanup

### Models used:
| Job | Model |
|---|---|
| Script writing | `gpt-4o` or `claude-3-5-sonnet` |
| Title/tag generation | `gpt-4o-mini` (cheaper) |
| Comment replies | `gpt-4o-mini` |
| Transcription | `whisper-1` |
| Thumbnail concept art | `dall-e-3` |

### Cost: ~$5–$20/month at MVP scale.

---

## Anthropic Claude API

**Docs**: https://docs.anthropic.com
**Use**: Alternative to GPT-4 for scripts (often better narrative flow, longer context)

### Models:
- `claude-3-5-sonnet-20241022` — best balance for long scripts
- `claude-3-opus` — premium quality, ~5x more expensive, use for flagship videos

---

## ElevenLabs API (Voice Generation)

**Docs**: https://elevenlabs.io/docs/api-reference
**Use**: AI voiceover from scripts

### Key endpoints:
| Endpoint | Use |
|---|---|
| `POST /v1/text-to-speech/{voice_id}` | Generate speech |
| `GET /v1/voices` | List available voices |
| `POST /v1/voices/add` | Clone custom voice (use your own or licensed only!) |

### Recommended voices (as of 2026):
- `Daniel` — deep male narrator
- `Adam` — punchy, finance/tech energy
- `Rachel` — friendly female
- `Charlotte` — energetic female, good for self-improvement
- Custom clone (if you want unique brand voice) — record 30 min of clean audio

**Cost**: ~$0.30 per 1k characters. A 10-min script = ~1,500 words = ~9k chars ≈ $2.70.

---

## Canva API (Optional)

**Docs**: https://www.canva.dev/
**Use**: Auto-generate thumbnails from templates
**Note**: Requires Canva Enterprise/Teams plan for full API access. MVP: manual Canva is fine.

---

## Notion API / Trello API

### Notion
**Docs**: https://developers.notion.com
**Use**: Move cards through pipeline, fetch script from Notion pages
**Setup**: Create integration at https://www.notion.so/my-integrations, share the pipeline database with the integration bot.

### Trello
**Docs**: https://developer.atlassian.com/cloud/trello/
**Use**: Same as Notion, simpler API. MVP can use Trello; switch to Notion when needed.
**Setup**: Get API key from https://trello.com/app-key, generate token.

---

## Google Trends / PyTrends (unofficial)

**Library**: `pytrends` (pip install pytrends)
**Use**: Validate keyword interest, find rising queries, compare topics
**No API key needed** — scrapes Google Trends public endpoint.
**Rate limits**: go slow (1 req per 5 sec) or use residential proxy.

---

## Reddit API (PRAW)

**Docs**: https://praw.readthedocs.io
**Use**: Mine hot threads for video ideas, find pain points
**Setup**: Create "script app" at https://www.reddit.com/prefs/apps; get client_id + client_secret + user_agent.
**Rate limits**: 60 req/min — generous.

---

## n8n Webhooks & Internal APIs

Our n8n workflows use webhooks to glue services together. Common webhooks:

| Path | Trigger | Action |
|---|---|---|
| `/webhook/new-idea` | Python script posts | Create Trello card |
| `/webhook/video-published` | Manual/YouTube notification | Cross-post to Shorts/TikTok/IG |
| `/webhook/comment-received` | YouTube API poll | Queue for AI reply |
| `/webhook/kpi-snapshot` | Daily cron | Pull KPIs, append to Google Sheet |

Set a strong `N8N_WEBHOOK_SECRET` and validate it in every workflow.

---

## Analytics → Mobile Dashboard

The mobile dashboard reads a simple JSON endpoint. Recommended setup (MVP):
- Python cron job pulls YouTube data nightly
- Writes `data/dashboard.json` to a public Gist or Google Cloud Storage
- React dashboard fetches the JSON on load

At scale: proper backend with auth.

---

## `.env.example` Template

```env
# YouTube
YOUTUBE_API_KEY=
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
YOUTUBE_REFRESH_TOKEN=

# AI
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
ELEVENLABS_API_KEY=

# Workflow
NOTION_API_KEY=
NOTION_DB_ID=
TRELLO_API_KEY=
TRELLO_TOKEN=
TRELLO_BOARD_ID=

# Reddit
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=
REDDIT_USER_AGENT=yacc/0.1 by /u/YourUsername

# n8n
N8N_WEBHOOK_URL=http://localhost:5678/webhook
N8N_WEBHOOK_SECRET=

# Dashboard
DASHBOARD_JSON_URL=https://api.example.com/dashboard.json
DASHBOARD_PASSWORD=yourdashboardpass
```

Copy this file to `.env` and fill in before running any scripts.
