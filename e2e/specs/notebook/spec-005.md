# notebook — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Source Coverage Report
- [ ] Green (green-500/10) — 100% coverage ratio
- [ ] Amber (amber-500/10) — 50%+ coverage ratio
- [ ] Red (red-500/10) — below 50% coverage ratio
- [ ] **Unused papers** — shows truncated titles of papers not referenced
- [ ] **Cleared on new message** — reset when user sends a new message

### Sources Cited Panel
- [ ] **Toggle button** — BookOpen icon + "Sources cited (N)" + caret
- [ ] **Caret direction** — CaretUp when open, CaretDown when closed
- [ ] **Auto-opens** — when sources arrive from RAG response
- [ ] **Max height** — 40 lines, scrollable overflow
- [ ] **Each source shows**:
- [ ] Source index badge in brand color: `[N]`
- [ ] Paper title
- [ ] Page number (if available): "— Page N"
- [ ] Section type (if available): ", sectionType"
- [ ] **Highlighted source** — brand/10 background + brand/30 border when highlighted
- [ ] **Normal source** — surface-raised/50 background

### Follow-Up Suggestion Chips
#### Generation
- [ ] **Trigger** — generated after assistant response ≥ 100 characters
- [ ] **Non-blocking** — generated asynchronously after stream completes
- [ ] **Mode-aware** — research mode gets analytical suggestions, learn mode gets Socratic prompts
- [ ] **3 suggestions** — up to 3 follow-up questions generated
- [ ] **Source-aware** — references paper titles in suggestions
- [ ] **Max 100 characters** per suggestion
- [ ] **Cancellation** — previous suggestion requests cancelled on new message
#### Display
- [ ] **Position** — below the last assistant message, left-aligned (ml-10)
- [ ] **Only on last message** — only displayed under the most recent assistant message
- [ ] **Hidden during loading** — not shown while AI is responding
- [ ] **Loading state** — 3 bouncing dots while suggestions generate
- [ ] **Chip style** — rounded-full with border, flex items-center
- [ ] **Icon** — ArrowBendDownRight icon (brand color in research, amber in learn)
- [ ] **Research mode styling** — surface-raised/50 background, border-border, hover → brand/30
- [ ] **Learn mode styling** — amber-500/5 background, amber-500/20 border, hover → amber-500/40
- [ ] **Click action** — sends the suggestion text as a new message

### Message Actions (Copy & Feedback)
#### Copy Button
- [ ] **Position** — below each assistant message (ml-10)
- [ ] **Icon** — Copy icon (default) / Check icon (after copy, green)
- [ ] **Copies cleaned text** — removes `[N]` citation markers and extra whitespace
