/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        yt: { red: '#FF0000', dark: '#0f0f0f', panel: '#1a1a1a', accent: '#10b981' },
      },
    },
  },
  plugins: [],
}
