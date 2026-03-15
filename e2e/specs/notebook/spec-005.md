# notebook — Spec 005

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Source Coverage Report
- [x] PASS: Green (green-500/10) — 100% coverage ratio
- [x] PASS: Amber (amber-500/10) — 50%+ coverage ratio
- [x] PASS: Red (red-500/10) — below 50% coverage ratio
- [x] PASS: **Unused papers** — shows truncated titles of papers not referenced
- [x] PASS: **Cleared on new message** — reset when user sends a new message

### Sources Cited Panel
- [x] PASS: **Toggle button** — BookOpen icon + "Sources cited (N)" + caret
- [x] PASS: **Caret direction** — CaretUp when open, CaretDown when closed
- [x] PASS: **Auto-opens** — when sources arrive from RAG response
- [x] PASS: **Max height** — 40 lines, scrollable overflow
- [x] PASS: **Each source shows**:
- [x] PASS: Source index badge in brand color: `[N]`
- [x] PASS: Paper title
- [x] PASS: Page number (if available): "— Page N"
- [x] PASS: Section type (if available): ", sectionType"
- [x] PASS: **Highlighted source** — brand/10 background + brand/30 border when highlighted
- [x] PASS: **Normal source** — surface-raised/50 background

### Follow-Up Suggestion Chips
#### Generation
- [x] PASS: **Trigger** — generated after assistant response ≥ 100 characters
- [x] PASS: **Non-blocking** — generated asynchronously after stream completes
- [x] PASS: **Mode-aware** — research mode gets analytical suggestions, learn mode gets Socratic prompts
- [x] PASS: **3 suggestions** — up to 3 follow-up questions generated
- [x] PASS: **Source-aware** — references paper titles in suggestions
- [x] PASS: **Max 100 characters** per suggestion
- [x] PASS: **Cancellation** — previous suggestion requests cancelled on new message
#### Display
- [x] PASS: **Position** — below the last assistant message, left-aligned (ml-10)
- [x] PASS: **Only on last message** — only displayed under the most recent assistant message
- [x] PASS: **Hidden during loading** — not shown while AI is responding
- [x] PASS: **Loading state** — 3 bouncing dots while suggestions generate
- [x] PASS: **Chip style** — rounded-full with border, flex items-center
- [x] PASS: **Icon** — ArrowBendDownRight icon (brand color in research, amber in learn)
- [x] PASS: **Research mode styling** — surface-raised/50 background, border-border, hover → brand/30
- [x] PASS: **Learn mode styling** — amber-500/5 background, amber-500/20 border, hover → amber-500/40
- [x] PASS: **Click action** — sends the suggestion text as a new message

### Message Actions (Copy & Feedback)
#### Copy Button
- [x] PASS: **Position** — below each assistant message (ml-10)
- [x] PASS: **Icon** — Copy icon (default) / Check icon (after copy, green)
- [x] PASS: **Copies cleaned text** — removes `[N]` citation markers and extra whitespace
