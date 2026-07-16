# SOP-004: Thumbnail Design & A/B Testing

**Version**: 1.0
**Owner**: Thumbnail Designer (creates) → Manager (approves & tests)
**Why this matters**: Thumbnail + title = 80% of CTR. Doubling CTR doubles views.

---

## Thumbnail Design Rules (every thumbnail, every time)

### Must-Haves
- [ ] **Resolution**: 1280x720px (YouTube's recommended), exported as JPG/PNG <2MB
- [ ] **Visible at tiny size**: Test by zooming out to 10% — you should still read the text and see the main subject
- [ ] **Big emotion**: Shocked face, wide eyes, pointing hand, reaction — no neutral faces
- [ ] **MAX 3 words of text** (bold, huge, high contrast against background)
- [ ] **Contrast**: Subject POPS from background. Use outline/glow/shadow
- [ ] **Brand color consistency**: Use channel's primary/accent colors

### Never Do
- ❌ More than 5 words of text
- ❌ Tiny text (unreadable on mobile)
- ❌ Cluttered with 4+ objects
- ❌ Misleading imagery (clickbait that doesn't deliver → kills AVD)
- ❌ Same thumbnail style as 10 other channels in the niche (blend in = get ignored)
- ❌ Watermarks from Canva/AI tools
- ❌ Low-resolution faces (always use HD source)

### Formulas That Work
1. **Face + emotion + 1–3 word text** (most reliable)
2. **Before/after split** (e.g., "POOR" → "RICH")
3. **Shocking object + arrow** (pointing at weird thing)
4. **Red circle / arrow** pointing at something
5. **Two faces reacting** (debate/controversy videos)
6. **Big number** (e.g., "$10,000" in huge font)

---

## A/B Testing Protocol

### For every new video, produce 2 variants:
- **Variant A**: Face-forward, emotional, 1–3 words
- **Variant B**: Object/text-forward, more curiosity-driven

### Testing method (using TubeBuddy or manually):
1. Upload video with Variant A as thumbnail
2. Schedule video
3. Set TubeBuddy A/B test to swap every 24h for 7 days (or manually swap at 24h mark)
4. After 7 days / 1000+ impressions, **keep the winner**
5. Winner = higher CTR (statistically significant — if CTR difference is <1% with <5k impressions, keep testing)

### If you don't have TubeBuddy Pro:
- Run Variant A for 24 hours, note impressions & CTR
- Swap to Variant B for 24 hours
- Compare (note: time-of-day variance exists, so this is directional, not scientific)

---

## Designer Workflow

1. Pull card from "Editing" or "Thumbnails" list
2. Read script's "THUMBNAIL IDEA" line (from metadata block)
3. Pull face/emotion reference: use Midjourney/DALL-E for faceless character OR use stock photos + face swap if needed
   - Prompt: see `prompts/thumbnail/thumbnail-brief.txt`
4. Design both variants in Canva using channel template
5. Export as PNG
6. Upload to channel's thumbnails folder in Drive
7. Add both links to Trello card as comment
8. Move card to "📤 Ready to Upload" (if edit is done)

---

## Thumbnail Review Checklist (Manager)

Before approving:
- [ ] Both variants under 2MB?
- [ ] Tested at 10% zoom — readable?
- [ ] Face emotion matches video hook?
- [ ] Text 3 words or less?
- [ ] Not a copy of competitor's exact thumbnail?
- [ ] Consistent with channel branding (colors/fonts)?
- [ ] No spoilers (don't reveal the punchline in thumbnail!)
- [ ] Would YOU click this?

Approve both → approve for upload.

---

## Thumbnail Retrospective (Monthly)

At monthly review:
1. Pull top 10 thumbnails by CTR — what patterns?
2. Pull bottom 10 — what failed?
3. Update design rules based on data
4. Refresh Canva templates to match winning patterns
5. Kill formulas that aren't working (e.g., if "text-only" variants consistently lose, stop making them)

---

## Tools
- **Canva** — primary design tool (channel template saved)
- **Midjourney / DALL-E** — generate faces/objects/scenes
- **Photoshop** (optional) — advanced compositing
- **TubeBuddy** — A/B testing
- **Thumbnailcheck.com** (free) — preview how it looks in feed
