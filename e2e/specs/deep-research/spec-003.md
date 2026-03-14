# deep-research — Spec 003

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Research Document — Markdown Report
#### Markdown Rendering
- [ ] Unordered lists with custom bullet styling
- [ ] Ordered lists with numbered items
- [ ] Tables with borders, header background, hover row states
- [ ] Blockquotes with blue left border, italic, muted color
- [ ] Inline code: gray background, emerald text, monospace
- [ ] Code blocks: monospace, scrollable, dark background
- [ ] Links: blue, underlined, open in new tab (`target="_blank"`)
- [ ] Bold and italic formatting
#### Dark Mode
- [ ] All markdown elements adapt to dark color scheme
- [ ] Background transitions from white to gray-950
- [ ] Text transitions from dark to light
- [ ] Table borders update for dark theme
#### Print Styles
- [ ] White background forced
- [ ] Black text forced
- [ ] Simple table borders
- [ ] All panels hidden during print

### Table of Contents Navigation
#### Desktop (Sidebar)
- [ ] Fixed-width sidebar (w-56), sticky positioning
- [ ] Extracts h2 and h3 headings from report
- [ ] Click heading to smooth-scroll to section
- [ ] Active heading highlighted as user scrolls
- [ ] Indentation for h3 (nested under h2)
#### Mobile (Overlay)
- [ ] Left-side drawer overlay (`w-72`), not a full-screen handle-sheet UI
- [ ] Same heading list as desktop
- [ ] Click heading scrolls and closes overlay
- [ ] Opens via the floating TOC button and closes on backdrop click or the `X` button

### Citations Panel
#### Desktop Layout
- [ ] Right sidebar (w-72), sticky positioning
- [ ] Max-height with overflow scroll
- [ ] Shows up to 50 citations
#### Mobile Layout
- [ ] Bottom sheet (max-h-[70vh])
- [ ] Decorative handle bar only (no drag or swipe behavior)
- [ ] Scrollable content
#### Citation Entries
- [ ] `[N]` index number
- [ ] Title (line-clamp-2, truncated)
- [ ] Authors: first 2 + "et al." if more
- [ ] Journal name with year in parentheses
