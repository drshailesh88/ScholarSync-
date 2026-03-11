# compliance — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Page Header & Navigation
- [ ] **Back arrow** — ArrowLeft icon, links to `/studio`
- [ ] **Title** — "Integrity Check" displayed as `font-semibold text-ink`
- [ ] **Tab toggle** — two buttons: "Check" and "History"
- [ ] "Check" tab is active by default, styled `bg-brand text-white`
- [ ] "History" tab shows ClockCounterClockwise icon (13px) before label
- [ ] Clicking a tab switches `pageTab` state between `"check"` and `"history"`
- [ ] Inactive tab styled `text-ink-muted hover:text-ink`

### Source Mode Selection
- [ ] **Two-button toggle**: "From Document" / "Paste Text"
- [ ] "From Document" shows FileText icon (14px)
- [ ] Active button styled `bg-brand text-white`, inactive `text-ink-muted hover:text-ink`
- [ ] Clicking "From Document" sets `sourceMode` to `"document"`, loads active project document
- [ ] Clicking "Paste Text" sets `sourceMode` to `"paste"`, shows editable textarea

### Document Mode — Input
#### Project Selector
- [ ] **Label** — "Project:" in `text-xs text-ink-muted`
- [ ] **Dropdown button** — displays selected project title (truncated at 200px) with CaretDown icon
- [ ] **Dropdown menu** — glass-panel, 224px wide, max-height 240px with overflow scroll, z-50
- [ ] Items highlight `bg-brand/10 text-brand font-medium` when selected
- [ ] Clicking outside closes dropdown (mousedown listener on `document`)
- [ ] Projects loaded via `listProjectsForAnalysis()` on mount
- [ ] First project auto-selected if none is chosen
#### Document Display
- [ ] **Document title** — shown as "Document: **{title}**" next to project selector
- [ ] **Textarea** — read-only, displays document content from `activeDoc.plainText`
- [ ] **Placeholder** — "Document content loaded from your project..."
- [ ] Textarea styled with `glass-panel font-serif`, focus ring `ring-brand/40`
#### Loading States
- [ ] **Loading** — CircleNotch spinner (28px) + "Loading document..."
- [ ] **No document** — FileText icon (32px) + "No document found. Write something in the Studio first, or switch to paste mode."

### Paste Mode — Input
- [ ] **Textarea** — editable, accepts user paste/typing
- [ ] **Placeholder** — "Paste your text here to check for AI-generated content, plagiarism indicators, and writing quality..."
- [ ] Textarea fills available height (`flex-1`), non-resizable
- [ ] **Word count** — displayed below textarea: `"{N} words"` in `text-xs text-ink-muted`
- [ ] Word count updates on every keystroke (splits by whitespace)

### Realtime Integrity Toggle
- [ ] **Button** — Lightning icon (13px), label "Live"
- [ ] Enabled state: `bg-brand/10 text-brand border-brand/30`, Lightning icon weight `"fill"`
- [ ] Disabled state: `text-ink-muted border-border`, Lightning icon weight `"regular"`
- [ ] Clicking toggles `realtimeEnabled` state
- [ ] When enabled and a score exists, shows score as colored percentage:
