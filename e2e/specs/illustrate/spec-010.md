# illustrate — Spec 010

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Right Panel — Style Tab (Hand-Drawn Effects)
- [x] PASS: **Stroke Width** control
- [x] PASS: **Apply to Selection** button — Applies current settings to selected objects
- [x] PASS: Settings preview updates live as sliders change
- [x] PASS: Rough.js style persists on save/export

### Right Panel — Journal Tab
- [x] PASS: Journal preset selector displays available presets
- [x] PASS: Presets format figures for academic publication standards
- [x] PASS: Selecting a preset applies formatting (margins, caption style, etc.)
- [x] PASS: Caption/annotation support for figure labeling
- [x] PASS: Preview of formatted output

### Status Bar
#### Left Section
- [x] PASS: Current tool badge displays (e.g., "Select", "Pen", "Rectangle")
- [x] PASS: Tool badge updates immediately on tool switch
- [x] PASS: Selection count shows when objects are selected (e.g., "3 objects")
#### Right Section
- [x] PASS: Canvas dimensions display (e.g., "800×600")
- [x] PASS: Mouse coordinates (X, Y) update in real time as cursor moves
- [x] PASS: Zoom percentage displayed (e.g., "100%")
- [x] PASS: `+` button increments zoom
- [x] PASS: `-` button decrements zoom
- [x] PASS: Clicking zoom percentage resets to 100%

### Rulers & Guides
#### Rulers
- [x] PASS: Horizontal ruler renders across top of canvas
- [x] PASS: Vertical ruler renders along left side of canvas
- [x] PASS: Rulers toggle with `Ctrl+R` or View menu
- [x] PASS: Ruler unit toggle button in corner (px ↔ pt)
- [x] PASS: Ruler markings update on zoom/pan
- [x] PASS: Current cursor position highlighted on rulers
#### Guides
- [x] PASS: Drag from horizontal ruler to create a horizontal guide
- [x] PASS: Drag from vertical ruler to create a vertical guide
- [x] PASS: Guides render as colored lines across the full canvas
- [x] PASS: Guides toggle visibility with `Ctrl+Shift+R`
- [x] PASS: Object snap to guide lines when dragging near them
- [x] PASS: Snap indicator appears when object snaps to guide
- [x] PASS: Double-click guide to edit position numerically
- [x] PASS: Drag guide off canvas to delete it
- [x] PASS: "Clear All Guides" option available

### Export Dialog
- [x] PASS: Opens via `Ctrl+E` or File → Export
- [x] PASS: Tab-based interface: PNG | SVG | PDF | PowerPoint | LaTeX
