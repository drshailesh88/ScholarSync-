# notebook — Spec 008

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Audio Overview Panel
#### Opening
- [x] PASS: **Creates conversation** — if no conversation exists yet
- [x] PASS: **Closes other overlays** — PDF viewer, source notes, share dialog
#### Panel Layout
- [x] PASS: **Inline** — appears above the chat input area
- [x] PASS: **Header** — Headphones icon (brand) + "Audio Overview" label
- [x] PASS: **Close button** — X icon, pauses audio on close
- [x] PASS: **Escape key** — closes panel
#### Audio Length Options (before generating)
- [x] PASS: **3 length options** — segmented buttons:
- [x] PASS: "Brief (~1 min)"
- [x] PASS: "Standard (~3 min)" (default)
- [x] PASS: "Detailed (~5 min)"
- [x] PASS: **Active option** — brand background + white text
- [x] PASS: **Inactive option** — surface-raised background + muted text
#### Custom Focus Prompt
- [x] PASS: **Text input** — "Focus on (optional)"
- [x] PASS: **Placeholder** — "e.g., primary endpoint results, methodology comparison..."
- [x] PASS: **Max length** — 500 characters
#### Generating State
- [x] PASS: **Auto-generates** on first mount (only once per panel open)
- [x] PASS: **Spinner** — CircleNotch spinning (brand color)
- [x] PASS: **Progress text** — "Creating your audio summary..."
- [x] PASS: **Time estimate** — "Writing script, then synthesizing speech. This usually takes 10-30 seconds."
- [x] PASS: **Header label** — "Generating..." with spinning icon
#### Ready / Playback State
- [x] PASS: **Play/Pause button** — circular brand button with Play/Pause icon
- [x] PASS: **Seek slider** — range input (0 to duration, step 0.1)
- [x] PASS: **Time display** — current time (left) and duration (right) in M:SS format
- [x] PASS: **Speed button** — cycles through 1x, 1.25x, 1.5x, 2x
- [x] PASS: **Download button** — DownloadSimple icon, downloads as `audio-overview.mp3`
- [x] PASS: **Transcript toggle** — "Show transcript" / "Hide transcript"
- [x] PASS: **Transcript view** — scrollable box (max-h-32) with pre-wrapped text
- [x] PASS: **Cached badge** — "Cached" in green text when result was from cache
- [x] PASS: **Options toggle** — "Options" link to change length/prompt and regenerate
#### Error State
- [x] PASS: **Warning icon** — red-400 color
- [x] PASS: **Error message** — displayed inline
- [x] PASS: **Retry button** — ArrowsClockwise icon + "Retry" text (brand color)
#### Regenerate
- [x] PASS: **"Regenerate with new settings" button** — full-width brand button
- [x] PASS: Shown when options panel is open and audio already generated
- [x] PASS: Resets state and triggers new generation
