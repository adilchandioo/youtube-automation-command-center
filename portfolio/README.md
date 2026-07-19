# 🌌 Interactive 3D Portfolio

An Antigravity / Awwwards-level portfolio website built with **Vite + React Three Fiber + Three.js**. Full interactive 3D world with scroll-driven camera, glass/transmission materials, bloom, particles, and a custom cursor.

![tech](https://img.shields.io/badge/React-18-61dafb?logo=react) ![tech](https://img.shields.io/badge/Three.js-r169-000?logo=three.js) ![tech](https://img.shields.io/badge/R3F-8-black) ![tech](https://img.shields.io/badge/Vite-5-646cff?logo=vite)

---

## ✨ Features

- 🌍 **Full interactive 3D world** — always-on Canvas with a distorted core, glass torus knot, floating icosahedron, wire halos, particle field, and starfield
- 🎥 **Scroll-driven cinematography** — camera lerps through waypoints per section (Hero → About → Work → Stack → Contact)
- 🖱️ **Mouse parallax + custom animated cursor** (dot + trailing ring, mix-blend-mode)
- 💎 **Post-processing** — Bloom, chromatic aberration, vignette, film-grain noise overlay
- 🪞 **Glassmorphism UI** — backdrop-blur cards, hover spotlight, reveal-on-scroll
- 📱 **Fully responsive** — mobile fallback (no custom cursor, adjusted paddings)
- ⚡ **~150 KB gzipped** app shell, code-split, DPR-capped for perf
- 🚀 **One-click GitHub Pages deploy** via included Actions workflow

---

## 🚀 Local development

```bash
cd portfolio
npm install
npm run dev
```

Open `http://localhost:5173`. Hot reload is on.

Build:

```bash
npm run build      # → portfolio/dist
npm run preview    # preview the production build
```

---

## 🌐 Deploy to GitHub Pages

The included workflow (`.github/workflows/deploy.yml`) auto-builds and deploys on every push to `main` that changes anything in `portfolio/`.

**One-time setup:**

1. Push this branch and merge to `main`.
2. Go to **Repo → Settings → Pages**.
3. Under **Build and deployment**, set **Source** = `GitHub Actions`.
4. Push a commit (or run the workflow manually). Your site goes live at:
   ```
   https://<your-username>.github.io/youtube-automation-command-center/
   ```

> The `base` path in `vite.config.js` matches the repo name. If you rename the repo (or host it as a user site `<username>.github.io`), update `base` accordingly.

**Custom domain?** Add a `CNAME` file inside `portfolio/public/` with your domain (e.g. `you.dev`) and set `base: '/'` in `vite.config.js`.

---

## 🎨 Making it yours

All content lives in tiny files — no CMS, no framework lock-in.

| What | Where |
|---|---|
| Your name & nav | `src/components/Nav.jsx` |
| Hero headline | `src/components/Hero.jsx` |
| About text | `src/components/About.jsx` |
| Projects list | `src/components/Projects.jsx` (edit the `projects` array) |
| Skills / stack | `src/components/Skills.jsx` (edit the `skills` array) |
| Email + social links | `src/components/Contact.jsx` |
| Colors & fonts | `src/styles/global.css` (CSS custom properties on `:root`) |
| 3D scene | `src/scenes/World.jsx` — swap geometries, add GLTF models via `useGLTF` |

**Tips for going even further:**

- Drop a GLB into `public/` and load with `const { scene } = useGLTF('/model.glb')` from `@react-three/drei`.
- Try `<Text3D>` from drei for extruded 3D headings.
- Add a custom GLSL shader via `shaderMaterial`.
- Record a scroll-driven timeline with GSAP + ScrollTrigger for even more choreography.

---

## 📂 Structure

```
portfolio/
├─ public/                 # favicon, static assets, (optional) CNAME
├─ src/
│  ├─ components/          # UI sections (Hero, About, Projects, Skills, Contact…)
│  ├─ scenes/              # 3D scene: World.jsx + ParticleField.jsx
│  ├─ hooks/               # useScrollProgress, useReveal
│  ├─ styles/global.css    # design tokens + all UI styling
│  ├─ App.jsx              # composition root
│  └─ main.jsx             # React entry
├─ index.html
├─ vite.config.js          # base = repo name for GH Pages
└─ .github/workflows/deploy.yml
```

---

## 📜 License

MIT — use it, remix it, ship it. A ⭐ on the repo is appreciated.
