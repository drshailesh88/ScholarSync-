# compliance — Spec 002

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Realtime Integrity Toggle
- [x] PASS: When loading, shows CircleNotch spinner (10px) next to label
- [x] PASS: Realtime uses `useRealtimeIntegrity` hook with 2-second debounce
- [x] PASS: Hook requires minimum 100 characters, minimum 10 character change between checks
- [x] PASS: Realtime is active only when `realtimeEnabled && !result` (disabled once full check runs)

### Run Integrity Check
- [x] PASS: **Button** — "Run Integrity Check" with Sparkle icon (16px)
- [x] PASS: Styled `bg-brand text-white`, `rounded-xl`, `px-6 py-3`
- [x] PASS: Disabled when `loading` or text < 50 characters (opacity 50%)
- [x] PASS: While running: button text changes to "Analyzing..."
- [x] PASS: Minimum 50 characters required — shows error "Please enter at least 50 characters of text to analyze." if under
- [x] PASS: Request has 30-second abort timeout
- [x] PASS: Error messages displayed as `text-xs text-red-500` below textarea
- [x] PASS: On timeout: "The check took too long. Please try again with shorter text."
- [x] PASS: On network error: "Failed to connect to the analysis service. Please try again."
- [x] PASS: Text split into paragraphs on `\n\n+` before display

### Results View — View Mode Toggle
- [x] PASS: **Inline / Split toggle** — two-button toggle group
- [x] PASS: "Inline" button — plain text
- [x] PASS: "Split" button — SplitHorizontal icon (13px) + label
- [x] PASS: Active styled `bg-brand text-white`, inactive `text-ink-muted hover:text-ink`
- [x] PASS: **Download Report button** — DownloadSimple icon (16px) + "Download Report"
- [x] PASS: **"Check New Text" link** — top-left of inline results, resets all state (result, paragraphs, copyleaks, humanize, paraphrase)

### Inline Results View
- [x] PASS: **Glass panel** container, rounded-2xl, padding 32px
- [x] PASS: **Engine badge** — if Binoculars engine, shows purple pill "Binoculars" top-right
- [x] PASS: **Document title** — if from a document, shown top-right in `text-ink-muted`
#### Paragraph Rendering
- [x] PASS: Paragraphs with sentence-level breakdown highlight individual sentences:
- [x] PASS: **Flags** — shown below paragraph as "Flags: {comma-separated}" in `text-[10px] text-ink-muted`
- [x] PASS: **Humanize result** — appears inline below flagged paragraphs (see section 17)

### Split / Diff View
#### Layout
- [x] PASS: **Two columns** side by side with 16px gap
- [x] PASS: Left column: "Original Text" header (uppercase, tracking-wide)
- [x] PASS: Right column: "Annotated" header with legend
#### Legend (right column header)
- [x] PASS: **AI (high)** — red swatch (`bg-red-500/15`)
- [x] PASS: **AI (med)** — amber swatch (`bg-amber-500/10`)
- [x] PASS: **Plagiarism** — red swatch with underline (`bg-red-500/10 underline decoration-red-500`)
#### Highlighting Rules
- [x] PASS: Citation issues render as inline Warning icons (12px, filled):
- [x] PASS: **Synchronized scrolling** — scrolling one column scrolls the other (via `requestAnimationFrame` sync guard)
- [x] PASS: Both columns render inside `rounded-xl border border-border-subtle bg-surface-raised` containers
