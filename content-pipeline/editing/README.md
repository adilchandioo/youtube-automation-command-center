# 🎬 Stage 5: Editing

Goal: Turn VO + script cues into a finished, engaging video with B-roll, captions, music, and graphics.
Owner: Video Editor
SLA: 24 hours (MVP) / 12 hours (scale) from entering "Editing" list

---

## Tools
- **CapCut Desktop** (free, recommended for MVP — auto-captions, great stock library)
- Adobe Premiere Pro / DaVinci Resolve (scale, advanced)
- Stock footage: Pexels, Pixabay, Storyblocks
- Channel B-roll library: `assets/b-roll-library/CH-001/`
- Channel music: `assets/music/`

Reference: `sops/SOP-006-COPYRIGHT-SAFETY.md` — USE ONLY APPROVED SOURCES.

---

## Pre-Edit Checklist

Before starting, confirm you have:
- [ ] Final VO MP3 file (downloaded from Drive)
- [ ] Approved script (with [VISUAL CUES] in brackets)
- [ ] Channel spec doc (fonts, colors, intro sound, music style)
- [ ] Access to channel's B-roll folder
- [ ] Reference video (what "good" looks like for this channel)

---

## Editing Workflow (CapCut Step-by-Step)

### 1. Project Setup (5 min)
- New project, name: `CH-001-epXXX-v1`
- Resolution: 1920x1080 (long-form) or 1080x1920 (Shorts)
- Frame rate: 30fps (60fps for tech/gaming/fast-cut niches)
- Import VO file, place on track 1, snap to 0:00

### 2. Rough Cut & Pacing (20 min)
- Listen to VO and mark beats/cuts with razor tool (every 3-5 seconds MAX — no long static shots)
- Remove any dead air at start/end of VO
- Ensure total runtime matches VO length + 5 sec intro/outro

### 3. Auto-Captions (5 min)
- Text → Auto Captions → Generate (English)
- Style captions per channel spec:
  - Font: Bold sans-serif (Montserrat Bold, Bebas Neue, or default CapCut "Bold" preset)
  - Size: ~8-10 on CapCut scale (large, readable)
  - Color: White with 4-6px black outline/shadow
  - Position: lower third, NOT in the YouTube subscribe bar zone
  - Max 2-3 words per caption chunk (split captions manually if needed)
- **PROOFREAD AUTO-CAPTIONS** — they're ~95% correct. Fix all errors (names, brands, numbers).

### 4. B-roll Placement (45-60 min)
- Go through script and for every [B-ROLL: ...] / [SCREEN RECORDING: ...] cue, find and place matching footage
- Cut B-roll to 2-4 second clips (fast cuts = better retention)
- If script says "cash" → Pexels search "counting money", insert clip
- If script says "laptop" → Pexels "person working laptop"
- For screen recordings: record yourself walking through the app/website, zoom to 150% on text, add cursor highlighter
- Use **Ken Burns effect** (slow zoom in/out) on static images/footage to add movement
- Avoid jump-cuts in B-roll (use cross-fade transition or cut on beat)
- Never let viewer look at static face/text for >5 seconds

### 5. Text Overlays & Pop-Ups (10 min)
- For key points/numbers/stats: add big text pop-up (1-3 words)
- Animate in/out (pop or slide, 0.3 sec)
- Use channel accent color for highlights
- Keep text on screen 1.5-2 seconds (enough to read)

### 6. Transitions (5 min)
- Use simple transitions 95% of the time:
  - Cross-fade / dissolve (0.3 sec)
  - Hard cut (most common — just cut, no transition)
  - Zoom in/out (for emphasis)
- AVOID flashy transitions (star wipes, spins, pixelation) — looks amateur
- Use "whoosh" sound effect subtly on cuts (low volume, -20dB)

### 7. Music & Sound Design (10 min)
- Place background music on track 3 (under VO)
- Music volume: **-20 to -24dB** relative to voice (voice is king)
- Use lo-fi / ambient / corporate beat matching channel style
- Duck music -6dB during key revelations/hooks
- Fade music in/out over 1.5 sec at start/end
- Add subtle sound effects for emphasis:
  - "Cash register ka-ching" on money mentions (channel-specific: CH-001)
  - "Pop" on text pop-ups
  - "Whoosh" on zooms/transitions
  - All SFX at -18dB or lower — never overpower voice

### 8. Intro & Outro (5 min)
- **Intro (2-3 sec)**:
  - Channel logo animation
  - Intro sound effect (e.g., "ka-ching" for CH-001)
  - Quick montage of B-roll from channel
- **Outro (5-10 sec)**:
  - Channel logo
  - Music swells
  - End screen card (2 related videos + subscribe button placeholder)
  - Editor leaves last 20 seconds for YouTube end screen overlay (don't clutter)

### 9. Color Grade / Polish (optional, 5 min)
- Light color correction if footage varies (match exposure)
- Light vignette (subtle, pulls eye to center)
- Slight saturation boost (+10)

### 10. Final Quality Check (WATCH IT)
Watch entire video from start to finish at 1x speed. Flag and fix:
- [ ] Any black frames or flash frames
- [ ] Captions out of sync
- [ ] B-roll that doesn't match what's being said
- [ ] Any copyrighted music/footage (YouTube will flag — use approved sources only!)
- [ ] Audio levels consistent throughout (no sudden loud/quiet parts)
- [ ] Text overlays readable on phone preview (zoom out to 25% in editor)
- [ ] Watermarks from CapCut/stock footage (REMOVE — use paid tier or free sources without watermarks)
- [ ] Intro/outro present
- [ ] No typos in text/captions
- [ ] Total runtime matches target length for the video

---

## Export Settings
- Format: MP4
- Codec: H.264
- Resolution: 1920x1080 (1080p)
- Frame rate: 30fps (match project)
- Bitrate: 20-30 Mbps (high quality)
- Audio: AAC, 320kbps, 48kHz
- Filename: `CH-001-epXXX-FINAL-v1.mp4`

---

## Delivery
1. Upload MP4 to channel's "Final Videos" Google Drive folder
2. Also upload the CapCut project file (so future edits are fast)
3. Add Drive link to Trello card
4. Leave a comment for uploader: "Edit complete, runtime X:XX, captions proofread, end screen starts at X:XX"
5. Move card to "🖼 Thumbnails" (if editor and designer work in parallel) OR "📤 Ready to Upload" if thumbnails are already done
