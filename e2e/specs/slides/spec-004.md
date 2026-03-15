# slides — Spec 004

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### WYSIWYG Canvas (Center Panel)
#### Canvas Rulers
- [x] PASS: Show percentage-based coordinates (switchable unit: percent)
- [x] PASS: Mouse position indicator on rulers tracks cursor
- [x] PASS: Selected block bounds highlighted on rulers
#### Grid Overlay
- [x] PASS: Toggle grid on/off
- [x] PASS: Configurable grid size
- [x] PASS: Snap-to-grid toggle
- [x] PASS: Grid renders as dotted overlay on the canvas
#### Animation Preview on Canvas
- [x] PASS: Preview button in animation timeline triggers on-canvas preview
- [x] PASS: Blocks animate in sequence according to their animation settings
- [x] PASS: Preview state resets after completion

### Block Types (Insert Menu)
#### Content Blocks
- [x] PASS: **Text** — Rich text block with body/heading styles
- [x] PASS: **Bullets** — Ordered/unordered list block
- [x] PASS: **Quote** — Quote with attribution
- [x] PASS: **Shape** — Vector shapes with submenu of shape types:
- [x] PASS: Rectangles, circles, triangles, arrows, stars, hearts, etc.
- [x] PASS: Line shapes (no fill, stroke only)
- [x] PASS: Shape type submenu grouped by category
- [x] PASS: **Citation** — Claim text + source reference
- [x] PASS: **Divider** — Horizontal separator (solid style)
- [x] PASS: **Toggle** — Expandable/collapsible content section
- [x] PASS: **Nested Card** — Sub-section card with nested content blocks
#### Media Blocks
- [x] PASS: **Image** — Image with alt text and suggestion field
- [x] PASS: **Chart** — Bar, line, pie charts with labels + datasets
- [x] PASS: **Table** — Headers + rows grid
- [x] PASS: **Infographic** — Process flow, comparison, and other infographic types
- [x] PASS: **Illustration** — SVG-based scientific illustration with caption
- [x] PASS: **Media** — Video/audio embed (URL, autoplay, loop, muted options)
- [x] PASS: **Embed** — Generic URL embed (iframe)
#### Academic Blocks
- [x] PASS: **Equation (Math)** — LaTeX math expression with display mode
- [x] PASS: **Diagram** — Mermaid syntax diagram (flowchart, sequence, etc.)
- [x] PASS: **Code** — Syntax-highlighted code block with language selector
- [x] PASS: **Callout** — Info/warning/error callout box
- [x] PASS: **Statistic** — Key metric with label, value, interpretation
- [x] PASS: **Bibliography** — Reference list with citation style
- [x] PASS: **Timeline** — Timeline entries with dates, labels, status
