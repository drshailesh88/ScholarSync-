# deep-research — Spec 003

STATUS: PARTIAL
TESTED: 35/35
PASS: 10
FAIL: 25
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Research Document — Markdown Report
#### Markdown Rendering
- [ ] FAIL: Unordered lists with custom bullet styling
- [ ] FAIL: Ordered lists with numbered items
- [x] PASS: Tables with borders, header background, hover row states
- [x] PASS: Blockquotes with blue left border, italic, muted color
- [x] PASS: Inline code: gray background, emerald text, monospace
- [x] PASS: Code blocks: monospace, scrollable, dark background
- [x] PASS: Links: blue, underlined, open in new tab (`target="_blank"`)
- [ ] FAIL: Bold and italic formatting
#### Dark Mode
- [ ] FAIL: All markdown elements adapt to dark color scheme
- [ ] FAIL: Background transitions from white to gray-950
- [ ] FAIL: Text transitions from dark to light
- [x] PASS: Table borders update for dark theme
#### Print Styles
- [ ] FAIL: White background forced
- [ ] FAIL: Black text forced
- [x] PASS: Simple table borders
- [ ] FAIL: All panels hidden during print

### Table of Contents Navigation
#### Desktop (Sidebar)
- [ ] FAIL: Fixed-width sidebar (w-56), sticky positioning
- [ ] FAIL: Extracts h2 and h3 headings from report
- [ ] FAIL: Click heading to smooth-scroll to section
- [ ] FAIL: Active heading highlighted as user scrolls
- [ ] FAIL: Indentation for h3 (nested under h2)
#### Mobile (Overlay)
- [x] PASS: Left-side drawer overlay (`w-72`), not a full-screen handle-sheet UI
- [ ] FAIL: Same heading list as desktop
- [ ] FAIL: Click heading scrolls and closes overlay
- [ ] FAIL: Opens via the floating TOC button and closes on backdrop click or the `X` button

### Citations Panel
#### Desktop Layout
- [ ] FAIL: Right sidebar (w-72), sticky positioning
- [ ] FAIL: Max-height with overflow scroll
- [x] PASS: Shows up to 50 citations
#### Mobile Layout
- [ ] FAIL: Bottom sheet (max-h-[70vh])
- [ ] FAIL: Decorative handle bar only (no drag or swipe behavior)
- [ ] FAIL: Scrollable content
#### Citation Entries
- [x] PASS: `[N]` index number
- [ ] FAIL: Title (line-clamp-2, truncated)
- [ ] FAIL: Authors: first 2 + "et al." if more
- [ ] FAIL: Journal name with year in parentheses
