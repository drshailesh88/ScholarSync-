# slides — Spec 013

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Alignment & Layout Engine
#### Single Block → Canvas Alignment
- [x] PASS: Align Right (x = 100 - width)
- [x] PASS: Align Top (y = 0)
- [x] PASS: Align Middle (y = 50 - height/2)
- [x] PASS: Align Bottom (y = 100 - height)
- [x] PASS: Clamped to stay within canvas bounds
#### Multi-Block Alignment (2+ blocks)
- [x] PASS: Align Left — all blocks to leftmost edge
- [x] PASS: Align Center — all blocks to horizontal center of bounding box
- [x] PASS: Align Right — all blocks to rightmost edge
- [x] PASS: Align Top — all blocks to topmost edge
- [x] PASS: Align Middle — all blocks to vertical center of bounding box
- [x] PASS: Align Bottom — all blocks to bottommost edge
#### Distribution (3+ blocks)
- [x] PASS: Distribute Horizontally — equal center spacing
- [x] PASS: Distribute Vertically — equal center spacing
- [x] PASS: Disabled when fewer than 3 blocks selected
- [x] PASS: First and last positions anchored; middle blocks redistributed
#### Slide Layout Engine
- [x] PASS: `computeLayout()` calculates regions for slide layouts
- [x] PASS: `regionToCSS()` converts regions to CSS positioning
- [x] PASS: Multiple layout types supported (title_content, two_column, etc.)

### Collaboration Features
- [x] PASS: **Presence Dots** — shown on filmstrip slides (`PresenceDotsSlot`)
- [x] PASS: **Remote Cursors** — rendered on canvas (`RemoteCursorsSlot`)
- [x] PASS: Collaboration slots integrate with collaboration provider
- [x] PASS: Multi-user editing awareness on slides

### Export Options
#### Slide Image Export (from Filmstrip Context Menu)
- [x] PASS: **PNG Export:**
- [x] PASS: Default 2x scale
- [x] PASS: Shift+Click for 3x scale (HD)
- [x] PASS: Renders slide at 1920px width via offscreen `SlideRendererV2`
- [x] PASS: Waits for fonts to load before capture
- [x] PASS: Downloads with filename: `{DeckTitle}_slide_{number}_{SlideTitle}.png`
- [x] PASS: **SVG Export:**
- [x] PASS: Exports as SVG markup
- [x] PASS: Downloads with `.svg` extension
#### Handout Export Dialog
- [x] PASS: Opens from export controls
- [x] PASS: **Layout options:**
- [x] PASS: Full Slide — 1 per page, landscape
- [x] PASS: 2 Slides — Portrait, stacked
