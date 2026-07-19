import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages: repo name below is used as base path.
// Change 'youtube-automation-command-center' if you rename the repo.
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production'
    ? '/youtube-automation-command-center/'
    : '/',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1600,
  },
})
