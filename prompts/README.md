# 🧠 Prompt Library

Copy-paste ready prompts for production. Version your improvements — if you tweak a prompt and it performs better, update it here and bump the version.

## How to Use

1. Copy the prompt file
2. Replace `{{variables}}` with actual values
3. Paste into ChatGPT (Plus/GPT-4o) or Claude (3.5 Sonnet)
4. Iterate once or twice if output isn't right (give feedback: "make hook more controversial, shorten sentences, add 1 more stat")
5. Human edits are mandatory — AI output is a draft, not a publish-ready product

## Directory

- `script-writing/` — long-form, Shorts, podcast-style scripts
  - `long-form-hook-first.txt` — main 8-15 min video script formula
  - `shorts-script.txt` — 30-55 second Shorts/Reels/TikTok
- `thumbnail/` — thumbnail briefs & AI image prompts
  - `thumbnail-brief.txt` — Midjourney/DALL-E prompt + designer brief
- `voiceover/` — TTS best practices and script prep
  - `vo-generation-guide.txt` — ElevenLabs settings + script cleaning
- `seo/` — titles, tags, descriptions
  - `title-tags-description.txt` — all metadata generation prompts

## Prompt Versioning Convention

When you improve a prompt, add a note like:
```
<!-- v1.1 — added curiosity gap rule, 2026-07-16 — 8% CTR lift vs v1.0 in tests -->
```
Track experiments in `analytics/reports/experiments-log.md`.
