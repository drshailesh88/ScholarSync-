# slides — Spec 005

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Insert Menu
- [x] PASS: Opens from toolbar button (anchored to button position)
- [x] PASS: Search bar with live filtering ("Search blocks...")
- [x] PASS: Blocks organized by category: Content | Media | Academic
- [x] PASS: Category headers shown
- [x] PASS: Keyboard navigation: Arrow Up/Down to move, Enter to insert
- [x] PASS: Escape closes the menu
- [x] PASS: Click outside closes the menu
- [x] PASS: Shape block shows expandable submenu with shape grid (4 columns)
- [x] PASS: Shape categories: geometric shapes grouped by type
- [x] PASS: AI Visualize button (sparkle icon) for diagram, infographic, chart types
- [x] PASS: Empty state: "No blocks found" when search yields no results

### Block Inserter (Canvas)
- [x] PASS: "+" inserter button on the canvas for quick block insertion
- [x] PASS: Inserts block at a default position on the slide
- [x] PASS: Uses `createDefaultBlock()` factory with type-specific defaults

### Properties Panel (Right Panel)
#### Design / Animation Tab Toggle
- [x] PASS: Two tabs: "Design" and "Animation"
- [x] PASS: Switching tabs shows the corresponding section
#### Selection Section (Single Block)
- [x] PASS: Shows "Align selected block to canvas" controls
- [x] PASS: 6 alignment buttons: Left, Center, Right, Top, Middle, Bottom
- [x] PASS: **Rotation** controls:
- [x] PASS: Numeric input (0–360 degrees)
- [x] PASS: Quick-set buttons: 0°, 90°, 180°, 270°
- [x] PASS: Flip Horizontal button
- [x] PASS: Flip Vertical button
#### Selection Section (Multi-Block: 2+ blocks)
- [x] PASS: Shows count of selected blocks (e.g., "3 blocks selected")
- [x] PASS: "Delete All" button (red/danger)
- [x] PASS: **Align** — 6 buttons: Left, Center, Right, Top, Middle, Bottom
- [x] PASS: **Distribute** — Horizontal and Vertical (disabled if < 3 blocks)
#### Block Properties
- [x] PASS: Shown when exactly one non-text block is selected
- [x] PASS: `BlockPropertyEditor` renders type-specific controls
- [x] PASS: Properties vary by block type (chart data, image URL, code language, etc.)
#### Background Section
- [x] PASS: **Background Type toggle:** Solid | Gradient | Image
- [x] PASS: **Solid:** Color picker with theme color swatches
- [x] PASS: **Gradient:** Gradient editor with:
- [x] PASS: Type selector (linear)
- [x] PASS: Angle control
