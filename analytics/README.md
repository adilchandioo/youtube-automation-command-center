# 📊 Analytics & KPIs

What gets measured gets managed. Track these religiously.

---

## Key Metrics Definitions

### Channel-Level KPIs
| Metric | What it means | Target (mature channel) |
|---|---|---|
| **Subscribers** | Total subs | Growing consistently |
| **Subscriber velocity** | New subs/day | >100/day at scale |
| **Views (total)** | All-time views | Growing |
| **Views/day** | Current daily views | Spiking after publish, then steady evergreen tail |
| **Watch time (hours)** | Total hours watched — feeds YPP requirement | >4000 hrs for YPP |
| **Revenue** | AdSense + affiliates + sponsors combined | Track per stream |
| **RPM** | Revenue per 1000 views | $10+ is strong; $20+ is excellent |
| **CPM** | What advertisers pay per 1000 impressions | Varies by niche/season |

### Video-Level KPIs (most important for iteration)
| Metric | Definition | Target |
|---|---|---|
| **Impressions** | Times thumbnail shown | — |
| **CTR (Click-Through Rate)** | % of impressions that became views | **>7% is good, >10% is viral-worthy** |
| **AVD (Average View Duration)** | Avg minutes watched | >40% of video length = good |
| **AVERAGE % VIEWED** | Avg % of video watched | >40% good, >55% excellent |
| **Audience Retention** | Curve showing when people drop off | Should start high, dip gradually; any sharp drops indicate a bad section to fix in future videos |
| **Engagement rate** | (likes + comments + shares) / views | >5% good |
| **Likes/dislikes ratio** | Approval | >95% likes |
| **Views at 24h** | Early signal | >1000 good, >10k possible viral |
| **Views at 7 days** | First-week signal | >5x 24h views = algo is pushing |
| **Views at 30 days** | Month signal | Good videos continue growing |

### Thumbnail/Title KPIs
- CTR 0-24h (first impression) — drives initial push
- CTR vs channel average — is this thumb better or worse?

### Production KPIs
| Metric | Definition | Target |
|---|---|---|
| Videos/week/channel | Output consistency | 3 long-form/week + 14 Shorts/week |
| Cost per video | All-in cost (writers, editors, tools) | <$20 per finished video at scale |
| Production time per video | Human hours per finished video | <2 hours total human time (scaled) |
| Videos in backlog | Ready-to-publish queue | >2 weeks ahead |

---

## Folder Structure

- `kpi-trackers/` — Google Sheets / CSV logs
  - `channel-kpis-daily.csv` — daily snapshot
  - `video-kpis-48h.csv` — per-video performance at 48h mark
  - `revenue-tracker.csv` — monthly revenue breakdown by stream
- `dashboards/` — mobile dashboard configs, Google Data Studio templates
  - `mobile-dashboard-config.json` — channel list for React PWA
- `reports/` — weekly/monthly reports
  - `weekly-report-template.md`
  - `monthly-report-template.md`
  - `experiments-log.md` — A/B test results

---

## Review Rhythm

- **Daily (5 min)**: Check mobile dashboard — any strikes? any viral spikes?
- **Per video, 48h after publish**: Check 24h CTR + AVD; if CTR <4%, change thumbnail; if AVD <30%, study retention curve
- **Weekly (60-90 min Sunday)**: Full weekly review — see `sops/SOP-002-WEEKLY-REVIEW.md`
- **Monthly (2 hours)**: Deep dive — revenue, per-channel P&L, team performance, next month plan
- **Quarterly (half day)**: Strategy — new niches, team changes, tooling upgrades, 90-day goals

---

## Golden Rules of YouTube Analytics

1. **CTR is the gatekeeper**. If people don't click, nothing else matters. Obsess over thumbnails.
2. **AVD/Retention is the algorithm's favorite signal**. Every second you keep someone watching tells YouTube "this is good, push it to more people."
3. **First 30 seconds determine AVD**. If 30%+ leave in first 30 sec, your hook is broken.
4. **Compare videos to YOUR channel average**, not to MrBeast. Context matters.
5. **Double down on winners, kill losers fast**. Make 3 more videos on your best topic; don't waste time on topics that flopped 2x.
6. **Don't chase views alone**. A 20k-view video that earns $500 in affiliate commissions is better than a 100k-view viral video with no monetization.
7. **Ignore comments about algorithm "conspiracies"**. The algo is simple: show thumbnail → if clicked, show more; if they watch, show even more. Make people click AND stay. That's 100% of it.
