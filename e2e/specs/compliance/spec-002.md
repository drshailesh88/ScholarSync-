# compliance — Spec 002

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Realtime Integrity Toggle
- [ ] When loading, shows CircleNotch spinner (10px) next to label
- [ ] Realtime uses `useRealtimeIntegrity` hook with 2-second debounce
- [ ] Hook requires minimum 100 characters, minimum 10 character change between checks
- [ ] Realtime is active only when `realtimeEnabled && !result` (disabled once full check runs)

### Run Integrity Check
- [ ] **Button** — "Run Integrity Check" with Sparkle icon (16px)
- [ ] Styled `bg-brand text-white`, `rounded-xl`, `px-6 py-3`
- [ ] Disabled when `loading` or text < 50 characters (opacity 50%)
- [ ] While running: button text changes to "Analyzing..."
- [ ] Minimum 50 characters required — shows error "Please enter at least 50 characters of text to analyze." if under
- [ ] Request has 30-second abort timeout
- [ ] Error messages displayed as `text-xs text-red-500` below textarea
- [ ] On timeout: "The check took too long. Please try again with shorter text."
- [ ] On network error: "Failed to connect to the analysis service. Please try again."
- [ ] Text split into paragraphs on `\n\n+` before display

### Results View — View Mode Toggle
- [ ] **Inline / Split toggle** — two-button toggle group
- [ ] "Inline" button — plain text
- [ ] "Split" button — SplitHorizontal icon (13px) + label
- [ ] Active styled `bg-brand text-white`, inactive `text-ink-muted hover:text-ink`
- [ ] **Download Report button** — DownloadSimple icon (16px) + "Download Report"
- [ ] **"Check New Text" link** — top-left of inline results, resets all state (result, paragraphs, copyleaks, humanize, paraphrase)

### Inline Results View
- [ ] **Glass panel** container, rounded-2xl, padding 32px
- [ ] **Engine badge** — if Binoculars engine, shows purple pill "Binoculars" top-right
- [ ] **Document title** — if from a document, shown top-right in `text-ink-muted`
#### Paragraph Rendering
- [ ] Paragraphs with sentence-level breakdown highlight individual sentences:
- [ ] **Flags** — shown below paragraph as "Flags: {comma-separated}" in `text-[10px] text-ink-muted`
- [ ] **Humanize result** — appears inline below flagged paragraphs (see section 17)

### Split / Diff View
#### Layout
- [ ] **Two columns** side by side with 16px gap
- [ ] Left column: "Original Text" header (uppercase, tracking-wide)
- [ ] Right column: "Annotated" header with legend
#### Legend (right column header)
- [ ] **AI (high)** — red swatch (`bg-red-500/15`)
- [ ] **AI (med)** — amber swatch (`bg-amber-500/10`)
- [ ] **Plagiarism** — red swatch with underline (`bg-red-500/10 underline decoration-red-500`)
#### Highlighting Rules
- [ ] Citation issues render as inline Warning icons (12px, filled):
- [ ] **Synchronized scrolling** — scrolling one column scrolls the other (via `requestAnimationFrame` sync guard)
- [ ] Both columns render inside `rounded-xl border border-border-subtle bg-surface-raised` containers
