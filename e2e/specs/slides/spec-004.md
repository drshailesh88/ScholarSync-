# slides — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### WYSIWYG Canvas (Center Panel)
#### Canvas Rulers
- [ ] Show percentage-based coordinates (switchable unit: percent)
- [ ] Mouse position indicator on rulers tracks cursor
- [ ] Selected block bounds highlighted on rulers
#### Grid Overlay
- [ ] Toggle grid on/off
- [ ] Configurable grid size
- [ ] Snap-to-grid toggle
- [ ] Grid renders as dotted overlay on the canvas
#### Animation Preview on Canvas
- [ ] Preview button in animation timeline triggers on-canvas preview
- [ ] Blocks animate in sequence according to their animation settings
- [ ] Preview state resets after completion

### Block Types (Insert Menu)
#### Content Blocks
- [ ] **Text** — Rich text block with body/heading styles
- [ ] **Bullets** — Ordered/unordered list block
- [ ] **Quote** — Quote with attribution
- [ ] **Shape** — Vector shapes with submenu of shape types:
- [ ] Rectangles, circles, triangles, arrows, stars, hearts, etc.
- [ ] Line shapes (no fill, stroke only)
- [ ] Shape type submenu grouped by category
- [ ] **Citation** — Claim text + source reference
- [ ] **Divider** — Horizontal separator (solid style)
- [ ] **Toggle** — Expandable/collapsible content section
- [ ] **Nested Card** — Sub-section card with nested content blocks
#### Media Blocks
- [ ] **Image** — Image with alt text and suggestion field
- [ ] **Chart** — Bar, line, pie charts with labels + datasets
- [ ] **Table** — Headers + rows grid
- [ ] **Infographic** — Process flow, comparison, and other infographic types
- [ ] **Illustration** — SVG-based scientific illustration with caption
- [ ] **Media** — Video/audio embed (URL, autoplay, loop, muted options)
- [ ] **Embed** — Generic URL embed (iframe)
#### Academic Blocks
- [ ] **Equation (Math)** — LaTeX math expression with display mode
- [ ] **Diagram** — Mermaid syntax diagram (flowchart, sequence, etc.)
- [ ] **Code** — Syntax-highlighted code block with language selector
- [ ] **Callout** — Info/warning/error callout box
- [ ] **Statistic** — Key metric with label, value, interpretation
- [ ] **Bibliography** — Reference list with citation style
- [ ] **Timeline** — Timeline entries with dates, labels, status
