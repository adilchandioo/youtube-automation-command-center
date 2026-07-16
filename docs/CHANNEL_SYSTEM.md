# 📺 Channel System — How We Run Multiple Channels

Each channel gets its own folder, ID, brand, KPIs, and owner.

---

## Channel ID Convention

- `CH-001` — first channel (main, finance example)
- `CH-002` — second channel (tech)
- etc.

Folder: `docs/channels/CH-001-{slug}.md`
Asset folder: `assets/brand/CH-001/`

---

## Channel Spec Template (create one per channel)

```markdown
# CH-001: Side Hustle King

## Basic Info
- **Channel name**: Side Hustle King
- **Channel handle**: @SideHustleKing
- **YouTube ID**: UCxxxxxxxxxxxx
- **Niche**: Make Money Online / Side Hustles
- **Sub-niche**: AI-powered side hustles, remote jobs
- **Launched**: 2026-07-20
- **Target avatar**: Restless Raj (22–38, stuck in 9–5, wants out)
- **Monetized**: No (target: 2026-10-01)

## Voice & Tone
- **AI voice**: ElevenLabs — Adam (punchy, American male)
- **Pace**: 155–170 WPM (fast, energetic — finance bro energy)
- **Tone**: Direct, no fluff, numbers-backed, "I've tried this" energy
- **Pronouns**: "You" direct address; "I" when giving personal experience
- **Language**: English (US), simple, avoid jargon

## Brand
- **Primary color**: #10b981 (emerald green — money)
- **Secondary**: #0f172a (dark navy background)
- **Accent**: #f59e0b (amber)
- **Font for thumbnails**: Impact / Bebas Neue (bold, caps)
- **Logo**: Crown + money bag (in assets/brand/CH-001/logo.png)
- **Intro sound**: Cash register "ka-ching" 2 sec

## Content Formula
- **Length**: 8–12 min (target avg 10 min)
- **Structure**:
  1. Hook (0–30s): Shock number or controversial claim
  2. Tease what you'll learn (30–45s)
  3. Point 1 (with proof/story): 2 min
  4. Point 2: 2 min
  5. Point 3: 2 min
  6. Point 4 (best one last): 2 min
  7. CTA (subscribe + like + comment + affiliate): 45s
- **Shorts**: 30–55 sec, single hook → single tip → CTA to watch long-form
- **Upload schedule**: Mon/Wed/Fri 4pm ET + 2 Shorts daily
- **Playlist strategy**: Group by sub-topic ("AI Side Hustles", "Passive Income", "Work From Home Jobs")

## SEO Targets
- **Root keyword**: "side hustles" (300k/mo search)
- **Long-tail clusters**:
  - side hustles for beginners
  - online side hustles
  - AI side hustles 2026
  - side hustles no experience
  - weekend side hustles
- **Tags**: 10–15 per video, mix of broad and long-tail

## Monetization Plan
- AdSense (post YPP)
- Affiliates (primary early):
  - Hostinger ($60/sale)
  - Shopify ($150/sale)
  - InVideo ($30/sale)
  - Amazon Associates (books/gear)
- Digital product (month 4): "30 AI Side Hustles" PDF — $17
- Sponsorships (post 10k subs): fintech apps, SaaS tools

## KPI Targets
| Metric | Month 1 | Month 3 | Month 6 |
|---|---|---|---|
| Subs | 100 | 1,500 | 10,000 |
| Views/mo | 5,000 | 100,000 | 1,000,000 |
| Avg CTR | 5% | 7% | 9% |
| Avg AVD | 35% | 45% | 50% |
| Revenue/mo | $0 | $300 | $3,000 |

## Team Assigned
- **Strategist**: Founder
- **Writer**: Jane D. (freelancer, $8/script)
- **Editor**: Raj P. (VA, $15/video)
- **Thumbnail**: Maria S. ($5/thumb, 2 variants)
- **Uploader**: Same as editor

## Top 10 Seed Ideas
1. 7 AI Side Hustles That Make $500/day in 2026
2. I Tried 50 Side Hustles — Only These 3 Actually Worked
3. How to Make $1,000/week on Autopilot Using ChatGPT
4. 5 Remote Jobs NO ONE Talks About (Hiring Now)
5. Side Hustles for People With 0 Free Time
...etc.
```

---

## Channel Playbook Rules

1. **One niche per channel** — never mix finance + fitness.
2. **One avatar per channel** — write everything to ONE person.
3. **Consistent upload schedule for first 90 days** — algorithm rewards consistency.
4. **Thumbnail style is consistent** — viewers should recognize your videos at a glance (same fonts, colors, face/emotion style).
5. **Review every 10 videos** — what's working? Kill what isn't, double down on what is.
6. **Rotate channels** — don't put all upload slots in one channel at scale.
7. **Backup everything** — export scripts, VO, edited files weekly to separate drive.

---

## Adding a New Channel (Checklist)

- [ ] Niche score > 350 on rubric (see NICHE_SELECTION.md)
- [ ] Channel spec file created
- [ ] Brand assets (logo, banner, watermark) designed
- [ ] Google account created, 2FA enabled
- [ ] Channel created, About section filled, links added
- [ ] TubeBuddy connected
- [ ] 20 seed ideas in backlog
- [ ] Team assigned (writer, editor, thumbnail)
- [ ] Dashboard entry added (channel shows up on mobile dashboard)
- [ ] First 3 scripts written
- [ ] Launch date set

---

## Channel Kill Criteria

Kill a channel (pivot niche) if ALL of these are true after 90 days of consistent uploads (3x/week):
- <500 subscribers
- Avg CTR < 3% across last 10 videos
- Avg AVD < 25% across last 10 videos
- No video over 10k views
- You've already tested 3 different thumbnail styles and 2 script formulas

Move on. Don't sink more time. The lessons translate to the next channel.
