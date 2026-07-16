# 🛠 Setup Guide — From Zero to First Upload

Follow this in order. Each step takes ~30–60 min.

---

## Step 1: Brand New Google Account (critical!)

Do NOT use your personal Google account.
- Create a fresh Gmail, e.g. `yourchannelname.brand@gmail.com`
- Enable 2FA
- Create a new YouTube channel (Brand Account recommended for easy transfer)
- Fill in: channel name, handle, description (use templates/description-templates/channel-about-template.txt), profile pic, banner (use Canva YouTube banner template)
- Add channel watermark (subscribe logo, 150x150 PNG)

---

## Step 2: Core Tools (sign up in order)

**Free / $0 tier first, upgrade only when needed:**
1. [TubeBuddy](https://www.tubebuddy.com) — free browser extension, upgrade to Pro when you hit 1k subs
2. [Canva](https://canva.com) — free tier enough for MVP
3. [ChatGPT](https://chat.openai.com) — Plus ($20/mo) worth it
4. [ElevenLabs](https://elevenlabs.io) — free tier for testing, Creator ($22) when you start uploading
5. [CapCut](https://capcut.com) — free desktop app, install now
6. [Google Sheets](https://sheets.google.com) — for analytics tracker (free)
7. [n8n](https://n8n.io) — self-host with Docker (see below), OR start with Make.com free tier
8. [Notion](https://notion.so) or Trello — free, for production pipeline board

---

## Step 3: Self-Host n8n (Optional but Recommended)

If you have a VPS ($6/mo DigitalOcean droplet works):

```bash
# Create folder
mkdir n8n && cd n8n

# docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: "3"
services:
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    volumes:
      - ./data:/home/node/.n8n
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=CHOOSE_A_STRONG_PASSWORD
      - TZ=UTC
    restart: unless-stopped
EOF

docker compose up -d
```

Access at `http://YOUR-VPS-IP:5678`. Backup the `./data` folder regularly.

---

## Step 4: YouTube Data API v3 (for automation)

1. Go to https://console.cloud.google.com
2. Create project → "YACC Analytics"
3. Enable **YouTube Data API v3**
4. Credentials → Create API Key → restrict to YouTube Data API v3
5. Save to your `.env` file as `YOUTUBE_API_KEY=...`
6. (Later, for uploads) Create OAuth 2.0 Client ID; download JSON as `client_secret.json`

---

## Step 5: Production Pipeline Board (Trello/Notion)

Create these lists (left → right):
1. **💡 Idea Backlog** — unsorted ideas
2. **🔬 Researching** — writer is fact-finding
3. **✍️ Scripting** — script in progress
4. **✅ Script Approval** — waiting for founder/manager
5. **🎙 Voiceover** — VO being generated
6. **🎬 Editing** — editor working
7. **🖼 Thumbnails** — designer working
8. **📤 Ready to Upload** — fully rendered
9. **🚀 Scheduled** — scheduled in YouTube Studio
10. **✅ Published** — live
11. **❌ Rejected/Killed** — dropped (with reason)

Each card moves left to right. Cards over 48h in a list are flagged.

---

## Step 6: Clone This Repo & Configure

```bash
git clone https://github.com/YOUR-USER/youtube-automation-command-center.git
cd youtube-automation-command-center
cp .env.example .env
# Edit .env with your keys
```

---

## Step 7: Install Python Dependencies (for automation scripts)

```bash
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r automation-tools/python-scripts/requirements.txt
```

---

## Step 8: Run Idea Scraper (first automation win)

```bash
python automation-tools/python-scripts/01-idea-scraper.py --niche "make money online" --days 7
# Outputs 20 trending video ideas to ideas.csv
```

Review, pick the best 5, add to Trello.

---

## Step 9: Write First Script (using prompts)

1. Copy `prompts/script-writing/long-form-hook-first.txt`
2. Fill in niche/topic/avatar
3. Paste into ChatGPT
4. Edit output for flow, fact-check, add personal voice notes
5. Save script to Google Docs, link in Trello card

---

## Step 10: Generate Voiceover

1. Pick a voice in ElevenLabs — "Daniel" (narration), "Rachel" (friendly), "Adam" (authoritative) are solid defaults
2. Paste script (remove visual cues like [B-ROLL: ...])
3. Generate, listen once, re-generate any bad sections
4. Download MP3, save to Drive folder linked in Trello card

---

## Step 11: Edit in CapCut

1. New project → import VO audio
2. Auto-generate captions (1-click in CapCut, 95% accurate)
3. Style captions: bold, large, 2 words at a time, outline
4. Add B-roll from `assets/b-roll-library/`, Pexels, Pixabay, Storyblocks
5. Add transitions (subtle — cross-fade, zoom, no flashy stuff)
6. Add background music from `assets/music/` (royalty-free) at -24dB
7. Add intro (2–3 sec) and outro (5 sec with subscribe CTA)
8. Export 1080p, 30fps (or 60fps for tech/gaming niches)

---

## Step 12: Thumbnails (A/B 2 variants)

Use `prompts/thumbnail/thumbnail-brief.txt` + Canva:
- Big face/emotion (or shocking object)
- 3-word MAX text, bold, high contrast
- Bright colors (red, yellow, neon)
- Variant A: face-focused
- Variant B: text-focused
- Test with TubeBuddy A/B after upload

---

## Step 13: Upload & Schedule

1. YouTube Studio → Upload
2. Title (use `prompts/seo/title-generator.txt`)
3. Description (use `templates/description-templates/long-form-description.txt`)
4. Tags (TubeBuddy suggests + `prompts/seo/tag-generator.txt`)
5. Thumbnail: Variant A first
6. End screen: 2 videos + 1 subscribe
7. Cards: link to playlist + 1 related video
8. Schedule for **peak hour** (check analytics: typically 3–5pm local time of audience)
9. Set visibility to "Scheduled"

---

## Step 14: Mobile Dashboard

```bash
cd mobile-dashboard
npm install
npm run dev
# Open http://localhost:5173
```

Deploy to Vercel with one click:
```bash
npm install -g vercel
vercel
```

---

## Step 15: You're Live — Now Do It Again

The first video won't pop. The first 10 probably won't. The key is to **publish, analyze, iterate**:
- After 48h: check CTR (<5%? thumbnail/title bad)
- After 7 days: check AVD (<35%? hook/pacing bad)
- After 30 days: check which videos are still getting views — MAKE MORE LIKE THESE

Welcome to the grind. 🎬
