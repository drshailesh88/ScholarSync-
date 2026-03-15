# deep-research — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Research Document — Markdown Report
#### Markdown Rendering
- [x] PASS: Unordered lists with custom bullet styling
- [x] PASS: Ordered lists with numbered items
- [x] PASS: Tables with borders, header background, hover row states
- [x] PASS: Blockquotes with blue left border, italic, muted color
- [x] PASS: Inline code: gray background, emerald text, monospace
- [x] PASS: Code blocks: monospace, scrollable, dark background
- [x] PASS: Links: blue, underlined, open in new tab (`target="_blank"`)
- [x] PASS: Bold and italic formatting
#### Dark Mode
- [x] PASS: All markdown elements adapt to dark color scheme
- [x] PASS: Background transitions from white to gray-950
- [x] PASS: Text transitions from dark to light
- [x] PASS: Table borders update for dark theme
#### Print Styles
- [x] PASS: White background forced
- [x] PASS: Black text forced
- [x] PASS: Simple table borders
- [x] PASS: All panels hidden during print

### Table of Contents Navigation
#### Desktop (Sidebar)
- [x] PASS: Fixed-width sidebar (w-56), sticky positioning
- [x] PASS: Extracts h2 and h3 headings from report
- [x] PASS: Click heading to smooth-scroll to section
- [x] PASS: Active heading highlighted as user scrolls
- [x] PASS: Indentation for h3 (nested under h2)
#### Mobile (Overlay)
- [x] PASS: Left-side drawer overlay (`w-72`), not a full-screen handle-sheet UI
- [x] PASS: Same heading list as desktop
- [x] PASS: Click heading scrolls and closes overlay
- [x] PASS: Opens via the floating TOC button and closes on backdrop click or the `X` button

### Citations Panel
#### Desktop Layout
- [x] PASS: Right sidebar (w-72), sticky positioning
- [x] PASS: Max-height with overflow scroll
- [x] PASS: Shows up to 50 citations
#### Mobile Layout
- [x] PASS: Bottom sheet (max-h-[70vh])
- [x] PASS: Decorative handle bar only (no drag or swipe behavior)
- [x] PASS: Scrollable content
#### Citation Entries
- [x] PASS: `[N]` index number
- [x] PASS: Title (line-clamp-2, truncated)
- [x] PASS: Authors: first 2 + "et al." if more
- [x] PASS: Journal name with year in parentheses
