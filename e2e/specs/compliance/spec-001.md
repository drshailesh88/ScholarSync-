# compliance — Spec 001

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Page Header & Navigation
- [x] PASS: **Back arrow** — ArrowLeft icon, links to `/studio`
- [x] PASS: **Title** — "Integrity Check" displayed as `font-semibold text-ink`
- [x] PASS: **Tab toggle** — two buttons: "Check" and "History"
- [x] PASS: "Check" tab is active by default, styled `bg-brand text-white`
- [x] PASS: "History" tab shows ClockCounterClockwise icon (13px) before label
- [x] PASS: Clicking a tab switches `pageTab` state between `"check"` and `"history"`
- [x] PASS: Inactive tab styled `text-ink-muted hover:text-ink`

### Source Mode Selection
- [x] PASS: **Two-button toggle**: "From Document" / "Paste Text"
- [x] PASS: "From Document" shows FileText icon (14px)
- [x] PASS: Active button styled `bg-brand text-white`, inactive `text-ink-muted hover:text-ink`
- [x] PASS: Clicking "From Document" sets `sourceMode` to `"document"`, loads active project document
- [x] PASS: Clicking "Paste Text" sets `sourceMode` to `"paste"`, shows editable textarea

### Document Mode — Input
#### Project Selector
- [x] PASS: **Label** — "Project:" in `text-xs text-ink-muted`
- [x] PASS: **Dropdown button** — displays selected project title (truncated at 200px) with CaretDown icon
- [x] PASS: **Dropdown menu** — glass-panel, 224px wide, max-height 240px with overflow scroll, z-50
- [x] PASS: Items highlight `bg-brand/10 text-brand font-medium` when selected
- [x] PASS: Clicking outside closes dropdown (mousedown listener on `document`)
- [x] PASS: Projects loaded via `listProjectsForAnalysis()` on mount
- [x] PASS: First project auto-selected if none is chosen
#### Document Display
- [x] PASS: **Document title** — shown as "Document: **{title}**" next to project selector
- [x] PASS: **Textarea** — read-only, displays document content from `activeDoc.plainText`
- [x] PASS: **Placeholder** — "Document content loaded from your project..."
- [x] PASS: Textarea styled with `glass-panel font-serif`, focus ring `ring-brand/40`
#### Loading States
- [x] PASS: **Loading** — CircleNotch spinner (28px) + "Loading document..."
- [x] PASS: **No document** — FileText icon (32px) + "No document found. Write something in the Studio first, or switch to paste mode."

### Paste Mode — Input
- [x] PASS: **Textarea** — editable, accepts user paste/typing
- [x] PASS: **Placeholder** — "Paste your text here to check for AI-generated content, plagiarism indicators, and writing quality..."
- [x] PASS: Textarea fills available height (`flex-1`), non-resizable
- [x] PASS: **Word count** — displayed below textarea: `"{N} words"` in `text-xs text-ink-muted`
- [x] PASS: Word count updates on every keystroke (splits by whitespace)

### Realtime Integrity Toggle
- [x] PASS: **Button** — Lightning icon (13px), label "Live"
- [x] PASS: Enabled state: `bg-brand/10 text-brand border-brand/30`, Lightning icon weight `"fill"`
- [x] PASS: Disabled state: `text-ink-muted border-border`, Lightning icon weight `"regular"`
- [x] PASS: Clicking toggles `realtimeEnabled` state
- [x] PASS: When enabled and a score exists, shows score as colored percentage:
