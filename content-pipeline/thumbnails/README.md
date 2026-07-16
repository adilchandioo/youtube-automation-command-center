# 🖼 Stage 6: Thumbnails

Goal: Design 2 thumbnail variants per video, optimized for CTR and on-brand.
Owner: Thumbnail Designer
SLA: Can run parallel with editing; ready same day edit is delivered.

---

## Reference
- Thumbnail design rules: `sops/SOP-004-THUMBNAIL-TESTING.md`
- Thumbnail brief prompt: `prompts/thumbnail/thumbnail-brief.txt`
- Canva template specs: `templates/thumbnail-templates/canva-thumbnail-specs.md`

---

## Workflow

### Step 1: Read the script
Open the script doc, focus on:
- Video title (the 5 title options)
- Thumbnail idea section in metadata
- Core hook/controversy/big number
- Channel (grab channel spec for colors/fonts)

### Step 2: Generate AI subject (if no stock photo)
Use Midjourney/DALL-E prompt from `prompts/thumbnail/thumbnail-brief.txt`:
- Generate face/subject matching channel aesthetic
- Extreme emotion (shock, amazement, excitement)
- Bright, high-contrast lighting
- Export at 1280x720

### Step 3: Open Canva template
- Open channel's pre-saved thumbnail template
- Duplicate for this video
- Place AI face/photo or stock image
- Add text (1-3 words MAX, bold, outlined)
- Add arrow/red circle if needed
- Apply brand colors

### Step 4: Make 2 variants
- **Variant A**: emotion/face dominant
- **Variant B**: text/object or different angle

### Step 5: Quality check
- [ ] 1280x720px
- [ ] <2MB file size
- [ ] Zoom out to 10% — still readable
- [ ] Max 3 words text
- [ ] Matches title (curiosity, not spoiler)
- [ ] Consistent with channel brand
- [ ] No typos
- [ ] No watermarks
- [ ] Different from competitor thumbnails on same topic

### Step 6: Export & deliver
- Export as PNG: `CH-001-epXXX-thumb-a.png` and `-b.png`
- Upload to Drive "Thumbnails" folder
- Attach to Trello card
- Leave comment for uploader: "Both thumbnails ready. Suggest starting with A (emotion) — B for A/B test day 2."
- If edit is also done, card moves to "📤 Ready to Upload"
