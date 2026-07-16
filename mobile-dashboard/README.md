# 📱 Mobile Dashboard — React PWA

A phone-first dashboard to monitor your YouTube empire at a glance. Built with **React + Vite + Tailwind CSS + Recharts**. Works offline-ish (caches last fetch), installable as an app on iOS/Android.

---

## What It Shows
- Per-channel card with subs, views, revenue, last video
- 7-day views/subs/revenue sparkline charts
- Cross-channel rollup (total subs, total MRR)
- Alerts (viral videos, strikes, underperforming uploads)
- Recent videos list with 24h CTR + views
- Quick links to YouTube Studio, Trello, Discord

---

## Local Development

```bash
cd mobile-dashboard
npm install
npm run dev
# Open http://localhost:5173
```

Password is set via `VITE_DASHBOARD_PASSWORD` env var (or `DASHBOARD_PASSWORD` in root `.env`).

---

## Deploy to Vercel (1 minute)

1. Push repo to GitHub
2. Go to https://vercel.com → New Project → Import repo
3. Root directory: `mobile-dashboard/`
4. Build command: `npm run build`
5. Output dir: `dist`
6. Add env var `VITE_DASHBOARD_PASSWORD=yourpass` and `VITE_DATA_URL=https://your-data-source.com/dashboard.json`
7. Deploy
8. Open on phone → "Add to Home Screen" to install as PWA

---

## Data Source

MVP: A JSON endpoint (`dashboard.json`) refreshed nightly by `03-kpi-snapshot.py`.
Format is documented in `src/data/sample-dashboard.json`.

For production, swap the data fetch hook to hit your backend (Postgres / Supabase / Google Sheets API).

---

## Stack
- React 18 + Vite 5
- Tailwind CSS 3
- Recharts (sparkline charts)
- Lucide React (icons)
- No backend required (reads from static JSON at MVP)
