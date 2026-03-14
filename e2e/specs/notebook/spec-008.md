# notebook — Spec 008

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Audio Overview Panel
#### Opening
- [ ] **Creates conversation** — if no conversation exists yet
- [ ] **Closes other overlays** — PDF viewer, source notes, share dialog
#### Panel Layout
- [ ] **Inline** — appears above the chat input area
- [ ] **Header** — Headphones icon (brand) + "Audio Overview" label
- [ ] **Close button** — X icon, pauses audio on close
- [ ] **Escape key** — closes panel
#### Audio Length Options (before generating)
- [ ] **3 length options** — segmented buttons:
- [ ] "Brief (~1 min)"
- [ ] "Standard (~3 min)" (default)
- [ ] "Detailed (~5 min)"
- [ ] **Active option** — brand background + white text
- [ ] **Inactive option** — surface-raised background + muted text
#### Custom Focus Prompt
- [ ] **Text input** — "Focus on (optional)"
- [ ] **Placeholder** — "e.g., primary endpoint results, methodology comparison..."
- [ ] **Max length** — 500 characters
#### Generating State
- [ ] **Auto-generates** on first mount (only once per panel open)
- [ ] **Spinner** — CircleNotch spinning (brand color)
- [ ] **Progress text** — "Creating your audio summary..."
- [ ] **Time estimate** — "Writing script, then synthesizing speech. This usually takes 10-30 seconds."
- [ ] **Header label** — "Generating..." with spinning icon
#### Ready / Playback State
- [ ] **Play/Pause button** — circular brand button with Play/Pause icon
- [ ] **Seek slider** — range input (0 to duration, step 0.1)
- [ ] **Time display** — current time (left) and duration (right) in M:SS format
- [ ] **Speed button** — cycles through 1x, 1.25x, 1.5x, 2x
- [ ] **Download button** — DownloadSimple icon, downloads as `audio-overview.mp3`
- [ ] **Transcript toggle** — "Show transcript" / "Hide transcript"
- [ ] **Transcript view** — scrollable box (max-h-32) with pre-wrapped text
- [ ] **Cached badge** — "Cached" in green text when result was from cache
- [ ] **Options toggle** — "Options" link to change length/prompt and regenerate
#### Error State
- [ ] **Warning icon** — red-400 color
- [ ] **Error message** — displayed inline
- [ ] **Retry button** — ArrowsClockwise icon + "Retry" text (brand color)
#### Regenerate
- [ ] **"Regenerate with new settings" button** — full-width brand button
- [ ] Shown when options panel is open and audio already generated
- [ ] Resets state and triggers new generation
