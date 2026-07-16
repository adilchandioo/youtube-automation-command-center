# SOP-003: Script Writing & Approval Workflow

**Version**: 1.0
**Owner**: Scriptwriter (writes) → Manager/Founder (approves)
**SLA**: 24 hours from "Scripting" list to "Script Approval"

---

## Script Standard

Every script must follow the channel's template (see `templates/script-templates/`). At minimum:

1. **Hook (0–30 seconds)** — MUST accomplish in first 3 sentences:
   - State the payoff ("By the end you'll know X")
   - Create curiosity gap ("Most people get this wrong")
   - Disrupt ("What if I told you X isn't true?")

2. **Intro (30–60 sec)**
   - Welcome back / channel intro
   - Quick credibility (1 sentence)
   - Tease the #1 thing you'll reveal
   - "Like and subscribe" soft ask

3. **Body (60–80% of total time)**
   - 3–5 main points, each with: claim → evidence/stat → story/example → mini-conclusion
   - Mid-roll hook at 50% mark ("Wait till you see point #4 — it's the one that made me $10k")
   - Visual cues in [brackets] for editor: [B-ROLL: cash counting], [SCREENSHOT: earnings dashboard], [GRAPH: growth chart]

4. **Outro / CTA**
   - Summarize main message
   - Hard CTA: like, subscribe, notification bell
   - Comment prompt ("Which one are you going to try first?")
   - Affiliate/product pitch if applicable (disclose!)
   - Tease next video

5. **Word count guide**: ~150 words per finished minute. 10-min video = 1,500 words.

---

## Writer Workflow

1. Pull card from "Researching" → move to "Scripting"
2. Read competitor videos on the topic (top 3 on YouTube) — DON'T copy, but note gaps
3. Pull stats/sources: use Perplexity.ai, Google Scholar, Statista, Wikipedia with citation
4. Use prompt from `prompts/script-writing/long-form-hook-first.txt`
5. Paste into ChatGPT/Claude with channel context (voice, tone, length)
6. **Edit the AI output manually** — THIS is the human value-add:
   - Remove generic fluff ("In today's fast-paced world...")
   - Add specific numbers, real anecdotes, concrete examples
   - Tighten pacing (cut 10–20% of words — AI rambles)
   - Add at least 1 controversial or unexpected take
   - Ensure hook is genuinely shocking/curious
7. Write a separate **Shorts batch doc** — extract 5 moments that work as standalone Shorts (30–60 sec each)
8. Add metadata block at TOP of script doc:
   ```
   TITLE OPTIONS:
   1. ...
   2. ...
   3. ...
   TAGS: ...
   THUMBNAIL IDEA: ...
   ESTIMATED LENGTH: ...
   ```
9. Save to channel's Google Drive Scripts folder, link in Trello card
10. Move card to "✅ Script Approval"

---

## Approval Workflow (Manager/Founder)

Aim to approve within 12 hours. Read the script — don't just skim.

### Approve if:
- [ ] Hook genuinely makes YOU want to keep watching (read it out loud)
- [ ] No plagiarism (spot-check a few paragraphs via Google search)
- [ ] Stats have sources cited (at least "per X study" or "according to Y")
- [ ] No medical/legal/financial advice claims without disclaimer
- [ ] No un-disclosed affiliate pitches
- [ ] Pacing feels right (short sentences, conversational)
- [ ] End has clear CTA
- [ ] Length matches target for the channel
- [ ] Visual cues are specific enough for the editor
- [ ] There's at least one "wait, really?" moment

### Send back for revision with notes if:
- Hook is weak ("Today we're talking about X" = bad hook)
- Too generic — sounds like every other video on the topic
- Fact-check fails (any claim that seems off — flag it)
- No visual cues — editor will be lost
- Too long / too short
- Missing CTA or Shorts extras

### KILL if:
- Topic doesn't fit the channel
- Script is fundamentally unsalvageable (writer mismatch — reassess writer)
- Topic has 10 identical videos already in backlog

---

## Version Control

- Save each script as `CH-001-042-topic-slug.docx` where `042` = episode number
- After approval, LOCK the doc (suggesting mode only) so writer doesn't change after VO is recorded
- If edits are needed post-approval, re-do VO for changed sections (don't leave mismatched audio)

---

## Quality Bar (non-negotiable)

If you wouldn't watch this video all the way through if you saw it in your feed, **don't publish it**. The script is 80% of a video's success. Spend time here.
