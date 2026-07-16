# 💡 Stage 1: Idea Generation

Goal: Fill the "Idea Backlog" Trello list with **60+ ideas per channel** so the team never runs out of things to make.

---

## Idea Sources (in order of priority)

### 1. YOUR OWN DATA (BEST IDEAS COME FROM HERE)
- Videos already on your channel with >50% higher CTR than channel average → make sequels/parts 2 & 3
- Comments: viewers ask "what about X?" or "can you do a video on Y?" → that's your next video
- YouTube Studio → Research → "Your viewers' searches" — goldmine
- YouTube Studio → Content → "Channels your audience watches" — mine their top videos
- High-retention moments in your videos: what section had highest AVD? Make a video on JUST that

### 2. COMPETITOR INTELLIGENCE
- Track 10 competitor channels per niche
- Look at their:
  - Videos with >1M views (proven topic)
  - Videos uploaded in last 30 days with >100k views (trending now)
  - Videos sorted by "Popular" — their all-time winners
- DON'T COPY. Find the ANGLE they missed:
  - If they did "5 side hustles" → you do "The side hustle that made them $10k isn't on their list"
  - If they did "best laptops for X" → you do "The dark truth about that #1 laptop they recommended"
  - If they did "How to start X" → you do "Why 90% fail at X (and how to not)"

### 3. KEYWORD RESEARCH
- **TubeBuddy Keyword Explorer**: search main keyword, look for long-tails with >1k searches, "fair" or better difficulty
- **VidIQ Keyword Tool**: same
- **AnswerThePublic**: type root keyword → gives 100+ questions people ask
- **Google Trends**: rising queries
- **Google "People also ask"**: bottom of search results
- **YouTube Autocomplete**: type keyword + space, see what pops up
- **TubeBuddy's Keyword Insights / Most Viewed** feature

### 4. COMMUNITY MINING
- Reddit (niche subreddits): sort by "Top" → "month/year" → high-upvote threads = winning topics
- Quora: questions with >100 answers = people care
- Facebook groups in niche: what gets asked every week?
- Twitter/X: viral threads in niche
- Discord servers: what's being discussed?
- Amazon book reviews in niche: negative reviews tell you what people are frustrated about

### 5. TREND SURFING (ONLY 20% OF CONTENT)
- Google Trends "trending now"
- YouTube Trending page
- TikTok Creative Center trending hashtags
- News cycle (careful — must fit niche; don't chase unrelated news)
- Use: `python automation-tools/python-scripts/01-idea-scraper.py` for automated trending digest

### 6. EVERGREEN TOPIC DATABASE
- Maintain a file `evergreen-topics-{niche}.md` with 50+ proven evergreen angles
- Re-record every 12 months with updated stats (date in title: "in 2026")
- Examples:
  - "How to start X for beginners (step by step)"
  - "X vs Y — which is actually better?"
  - "Best X under $Y"
  - "Common X mistakes to avoid"
  - "How much money do X make?" (REVENUE/INCOME questions get insane CTR)
  - "A day in the life of X"

---

## Idea Scoring (before adding to backlog)

Score each idea 1-5 on 4 dimensions; total >15 = produce; <10 = kill:

| Dimension | 1 | 5 |
|---|---|---|
| **Search demand** | No searches | 10k+ searches/month on TubeBuddy |
| **CTR potential** | Boring title | Shocking/number/controversy formula applies |
| **Production ease** | Needs custom animation / travel / on-camera | AI + B-roll easy |
| **Monetization fit** | No affiliate/product tie-in | Clear affiliate + possible digital product lead-in |

---

## Weekly Idea Routine (30 min, Sunday)

1. Run `python automation-tools/python-scripts/01-idea-scraper.py --niche "niche-name" --days 7`
2. Browse 10 competitors' channels for new uploads & winners
3. Scan 2 niche subreddits' top-of-week posts
4. Add 10-20 new ideas to Trello backlog with score
5. Kill any ideas in backlog older than 3 months you haven't made (stale)
6. Select next week's 3 long-form videos from top-scoring ideas

---

## Idea Card Template (Trello/Notion)

```
TITLE CARD: "5 AI Side Hustles That Make $500/Day in 2026"
- Keyword cluster: "ai side hustles", "side hustles 2026", "make money with ai"
- Score: 17/20
- Source: Competitor X's video hit 500k views in 2 weeks, but missed side hustle #3
- Angle: Reveal a hidden one competitors don't show
- Reference URLs: [links]
- Priority: HIGH (this week) / MEDIUM (next 2 weeks) / LOW (backlog)
```
