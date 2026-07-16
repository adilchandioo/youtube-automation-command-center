# 🎙 Stage 4: Voiceover

Goal: Turn approved script into high-quality, human-sounding narration audio.
Owner: VA / Founder (MVP)
SLA: 4 hours per video from "Voiceover" list entry

---

## Tools
- ElevenLabs.io (recommended) or Play.ht / Murf / Descript Overdub
- Reference: `prompts/voiceover/vo-generation-guide.txt` for settings

---

## Pre-Script (clean before generating)

1. Open approved script doc (locked — don't change content)
2. Copy ONLY the spoken words (NOT metadata, visual cues [in brackets], timestamps, chapter labels)
3. Paste into a clean text editor
4. Clean:
   - Remove all `[B-ROLL: ...]`, `[SCREENSHOT: ...]`, `[TEXT: ...]`, `[ZOOM: ...]`
   - Remove stage directions like "(pause)"
   - Spell out all numbers (see voiceover guide)
   - Add line breaks between paragraphs (helps with pacing)
   - Add `...` or `—` for natural pauses
5. Save as plain text `.txt` file

---

## Generation Settings (ElevenLabs)

Use the channel's designated voice:
- See `docs/channels/CH-XXX-...md` for voice assignment
- DO NOT switch voices between videos on the same channel

Settings:
- Model: Eleven Turbo 2.5 v2
- Stability: 0.40
- Similarity boost: 0.85
- Style exaggeration: 0.40
- Speaker boost: ON

---

## Generation Workflow

1. Paste first 2 paragraphs (don't generate whole script at once — easier to fix mistakes)
2. Generate, listen
3. If any sentence sounds off:
   - Click individual sentence, regen that one (try 2-3 variants)
   - If still bad, respell the word phonetically or rephrase
4. When a paragraph is perfect, add to project timeline
5. Continue paragraph by paragraph
6. Add pauses between major sections (0.5–1 sec)
7. Export as MP3, 192kbps+, named: `CH-001-epXXX-vo.mp3`

---

## Quality Check (listen ALL THE WAY THROUGH)

- [ ] No mispronunciations (check brands, names, numbers)
- [ ] No random voice glitches (clicks, distortion, voice changes)
- [ ] Natural pace (not robotic-fast, not too slow — 150–170 wpm for finance/tech)
- [ ] Natural breathing (ElevenLabs adds breaths; if you don't like them you can reduce)
- [ ] Emphasis on the right words (especially in hook)
- [ ] Consistent tone throughout (no sudden changes)
- [ ] Audio not clipping (volume level ~-1dB peak max)
- [ ] Ends cleanly (cut-off last breath/noise)

---

## Manual VO (Human Voiceover — later scale)

If you switch to human narrator:
1. Send script + reference video to voice actor
2. Specify: WPM pace, energy level, tone, any words to emphasize
3. Request 2 takes of hook paragraph
4. Receive WAV/MP3, apply light processing (normalize, de-noise, light EQ in Audacity)
5. Add to project

---

## Post-Generation Delivery

1. Upload final MP3 to channel's Drive folder (Voiceovers folder)
2. Link in Trello card
3. Move card to "🎬 Editing"
4. Assign to editor
5. Add a note: "VO is ready. Pace matches CapCut project at 160 WPM — align B-roll tightly."
