# ✍️ Stage 3: Script Writing

Goal: Turn research brief into a tight, hooky, retention-optimized script.
Owner: Script Writer
SLA: 6 hours per video from "Scripting" → "Script Approval"

---

## Tools You Need

- The research doc (from Stage 2)
- Channel spec (from `docs/channels/CH-XXX-...md` — know the voice/avatar!)
- The long-form prompt: `prompts/script-writing/long-form-hook-first.txt`
- Script template: `templates/script-templates/long-form-template.md`
- ChatGPT Plus (GPT-4o) or Claude 3.5 Sonnet

---

## Workflow

### Step 1: Read the research doc
Spend 10 minutes reading the research brief. Understand:
- The core thesis
- Best stats (memorize the numbers)
- Stories/examples
- The unique angle (what competitors missed)
- Target avatar (who are you talking to?)

### Step 2: Run the AI
- Open ChatGPT/Claude, start a NEW conversation (avoids contamination from other channels!)
- Paste the long-form prompt first
- Then paste all the research brief content
- Then add any extra notes (style, specific jokes to add, brand voice)
- Hit generate

### Step 3: First Edit (THE HUMAN WORK — 30-45 min)
This is where 80% of the value is. AI drafts are 60% good — you make it 100%:

**CUT THE FLUFF**
- Remove generic openings: "In today's fast-paced world", "Welcome back to the channel", "In this video we will discuss..."
- Cut hedging language: "it's important to note that", "many experts believe", "some people say" → be direct
- Tighten long sentences. Aim for <15 words per sentence.
- Cut any paragraph that doesn't teach something OR hook the viewer.

**ADD SPECIFICS**
- Replace vague statements ("a lot of money") with specific numbers ("$8,492 in a single month")
- Add the personal story from research
- Add names of people, tools, websites — specifics build trust
- Add concrete how-to steps if it's a tutorial video

**INJECT PERSONALITY**
- Add conversational asides ("here's the thing...", "look...", "let me be straight with you")
- Add 1-2 rhetorical questions per section
- Use contractions (don't, can't, won't) — AI writes like a textbook; fix it
- Add one controversial/opinionated take (AI is too safe)
- Add channel personality ("On this channel we call it like we see it...")

**FIX THE HOOK**
- The AI hook is almost always mediocre. Rewrite it yourself.
- Hook must make YOU curious to keep reading. If it bores you, it bores the viewer.
- Use the 5 hooks from research doc as starting point.

**CHECK RETENTION DEVICES**
- Confirm there's a mini-hook every 90 seconds
- Confirm mid-roll retention hook at 50% mark
- Confirm visual cues [IN BRACKETS] for every major point
- Confirm end has specific CTA + comment prompt + next video tease

**FACT CHECK**
- Every stat: open source URL, confirm number matches (AI hallucinates!)
- Any quote: confirm attribution
- Any product recommendation: confirm product exists and is actually relevant

### Step 4: Write the metadata block
At TOP of script doc (above the hook):
- 5 title options (use title prompt)
- 15 tags (use tag prompt)
- 2 thumbnail ideas (text-focused + face-focused)
- Description summary (first 2 lines)
- Suggested timestamps

### Step 5: Extract Shorts
From the script, identify 5 moments that can stand alone as a 30-55 second Short. Copy them into a separate doc `CH-001-epXXX-shorts.md` and adapt each into Shorts format using `templates/shorts-templates/shorts-template.md` (if writer handles Shorts) — or note timestamps for Shorts editor later.

### Step 6: Word count target
Aim for ~150 words per finished minute. For a 10-min video: ~1500 words.
- Too long (>1800 for 10min) = tighten.
- Too short (<1200 for 10min) = add more detail/story/examples.

### Step 7: Save and submit
- Save as `CH-001-epXXX-title-slug` in channel's Scripts folder on Google Drive
- Link doc in Trello card
- Add comment: "Ready for review — best hook is #3, stats all sourced"
- Move card to "✅ Script Approval"

---

## Common Script Writing Mistakes

❌ **"Hello everyone welcome back"** → kill the intro, go straight to hook
❌ **Long list of generic points** → "exercise is good", "save money" → be specific
❌ **No concrete numbers** → "a lot" = nothing. Use numbers.
❌ **All tell no show** → don't just say "this works", show the story/screenshot/person
❌ **Robotic monotone** → AI writes essays. You write dialogue.
❌ **No visual cues** → editor is lost. Every major claim needs a [B-ROLL] note
❌ **Too much info upfront** → don't list all points in intro; tease 1-2, deliver later
❌ **Ending weak** → don't end with "thanks for watching". End with CTA + next video tease
❌ **Clickbait that overpromises** → "Make $1M in 30 days" → lies kill trust. Ground in reality.
❌ **Forgetting the avatar** → write like you're talking to a specific friend, not a stadium.

---

## Script Writer Quality Bar (non-negotiable)

If the script, when read OUT LOUD, doesn't make you want to keep listening — rewrite. If it sounds like a textbook — rewrite. If you would click away from it within 30 seconds — rewrite the hook.

Good scripts: **sound like a friend telling you something they just discovered and are excited about**.
