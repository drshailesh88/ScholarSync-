# slides — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Insert Menu
- [ ] Opens from toolbar button (anchored to button position)
- [ ] Search bar with live filtering ("Search blocks...")
- [ ] Blocks organized by category: Content | Media | Academic
- [ ] Category headers shown
- [ ] Keyboard navigation: Arrow Up/Down to move, Enter to insert
- [ ] Escape closes the menu
- [ ] Click outside closes the menu
- [ ] Shape block shows expandable submenu with shape grid (4 columns)
- [ ] Shape categories: geometric shapes grouped by type
- [ ] AI Visualize button (sparkle icon) for diagram, infographic, chart types
- [ ] Empty state: "No blocks found" when search yields no results

### Block Inserter (Canvas)
- [ ] "+" inserter button on the canvas for quick block insertion
- [ ] Inserts block at a default position on the slide
- [ ] Uses `createDefaultBlock()` factory with type-specific defaults

### Properties Panel (Right Panel)
#### Design / Animation Tab Toggle
- [ ] Two tabs: "Design" and "Animation"
- [ ] Switching tabs shows the corresponding section
#### Selection Section (Single Block)
- [ ] Shows "Align selected block to canvas" controls
- [ ] 6 alignment buttons: Left, Center, Right, Top, Middle, Bottom
- [ ] **Rotation** controls:
- [ ] Numeric input (0–360 degrees)
- [ ] Quick-set buttons: 0°, 90°, 180°, 270°
- [ ] Flip Horizontal button
- [ ] Flip Vertical button
#### Selection Section (Multi-Block: 2+ blocks)
- [ ] Shows count of selected blocks (e.g., "3 blocks selected")
- [ ] "Delete All" button (red/danger)
- [ ] **Align** — 6 buttons: Left, Center, Right, Top, Middle, Bottom
- [ ] **Distribute** — Horizontal and Vertical (disabled if < 3 blocks)
#### Block Properties
- [ ] Shown when exactly one non-text block is selected
- [ ] `BlockPropertyEditor` renders type-specific controls
- [ ] Properties vary by block type (chart data, image URL, code language, etc.)
#### Background Section
- [ ] **Background Type toggle:** Solid | Gradient | Image
- [ ] **Solid:** Color picker with theme color swatches
- [ ] **Gradient:** Gradient editor with:
- [ ] Type selector (linear)
- [ ] Angle control
