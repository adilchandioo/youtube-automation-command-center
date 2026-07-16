# n8n Workflows

Import these JSON files directly into your n8n instance via:
**n8n UI → Workflows → Import from File**

---

## Included Workflows (MVP)

1. **new-video-published.json** — When a video publishes (detected via YouTube RSS polling), post to Discord, Twitter, add cross-promotion queue
2. **daily-idea-digest.json** — Cron daily at 7am → runs Python idea scraper → posts top 10 to Discord
3. **comment-ai-reply.json** — Hourly cron → pulls new YouTube comments → drafts GPT reply → sends to Discord for approval → posts approved replies
4. **weekly-kpi-report.json** — Sunday 6pm cron → pulls KPI snapshot → generates Markdown report → posts to Discord, saves to repo

---

## Setup

1. Deploy n8n (see docs/SETUP_GUIDE.md)
2. Import the workflow JSON
3. Add credentials:
   - YouTube Data API key
   - OpenAI API key (for comment replies)
   - Discord webhook URL
   - Local filesystem access / SSH to run Python scripts
4. Update the channel IDs, subreddits, and keywords in the workflow nodes
5. Activate the workflow
6. Test with "Execute Workflow" button

---

## Workflow Creation Tips

- Name every node clearly
- Use the "Error Workflow Trigger" to catch failures and alert Discord
- Add wait nodes between API calls to respect rate limits
- Keep API keys in n8n credentials, NEVER hardcode
- Use environment-specific webhook URLs with a secret token
