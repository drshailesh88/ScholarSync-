# slides — Spec 013

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Alignment & Layout Engine
#### Single Block → Canvas Alignment
- [ ] Align Right (x = 100 - width)
- [ ] Align Top (y = 0)
- [ ] Align Middle (y = 50 - height/2)
- [ ] Align Bottom (y = 100 - height)
- [ ] Clamped to stay within canvas bounds
#### Multi-Block Alignment (2+ blocks)
- [ ] Align Left — all blocks to leftmost edge
- [ ] Align Center — all blocks to horizontal center of bounding box
- [ ] Align Right — all blocks to rightmost edge
- [ ] Align Top — all blocks to topmost edge
- [ ] Align Middle — all blocks to vertical center of bounding box
- [ ] Align Bottom — all blocks to bottommost edge
#### Distribution (3+ blocks)
- [ ] Distribute Horizontally — equal center spacing
- [ ] Distribute Vertically — equal center spacing
- [ ] Disabled when fewer than 3 blocks selected
- [ ] First and last positions anchored; middle blocks redistributed
#### Slide Layout Engine
- [ ] `computeLayout()` calculates regions for slide layouts
- [ ] `regionToCSS()` converts regions to CSS positioning
- [ ] Multiple layout types supported (title_content, two_column, etc.)

### Collaboration Features
- [ ] **Presence Dots** — shown on filmstrip slides (`PresenceDotsSlot`)
- [ ] **Remote Cursors** — rendered on canvas (`RemoteCursorsSlot`)
- [ ] Collaboration slots integrate with collaboration provider
- [ ] Multi-user editing awareness on slides

### Export Options
#### Slide Image Export (from Filmstrip Context Menu)
- [ ] **PNG Export:**
- [ ] Default 2x scale
- [ ] Shift+Click for 3x scale (HD)
- [ ] Renders slide at 1920px width via offscreen `SlideRendererV2`
- [ ] Waits for fonts to load before capture
- [ ] Downloads with filename: `{DeckTitle}_slide_{number}_{SlideTitle}.png`
- [ ] **SVG Export:**
- [ ] Exports as SVG markup
- [ ] Downloads with `.svg` extension
#### Handout Export Dialog
- [ ] Opens from export controls
- [ ] **Layout options:**
- [ ] Full Slide — 1 per page, landscape
- [ ] 2 Slides — Portrait, stacked
