import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages: repo name below is used as base path.
// Change 'youtube-automation-command-center' if you rename the repo.
// DEPLOY_TARGET controls the base path:
//   - 'ghpages'  → '/youtube-automation-command-center/'  (GitHub Pages under repo)
//   - anything else (Vercel/Netlify/custom domain) → '/'
// Set it in your host's env vars, or just leave unset for Vercel/Netlify.
const isGhPages = process.env.DEPLOY_TARGET === 'ghpages'

export default defineConfig({
  plugins: [react()],
  base: isGhPages ? '/youtube-automation-command-center/' : '/',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1600,
  },
})
