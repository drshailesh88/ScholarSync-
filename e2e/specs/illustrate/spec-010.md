# illustrate — Spec 010

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Right Panel — Style Tab (Hand-Drawn Effects)
- [ ] **Stroke Width** control
- [ ] **Apply to Selection** button — Applies current settings to selected objects
- [ ] Settings preview updates live as sliders change
- [ ] Rough.js style persists on save/export

### Right Panel — Journal Tab
- [ ] Journal preset selector displays available presets
- [ ] Presets format figures for academic publication standards
- [ ] Selecting a preset applies formatting (margins, caption style, etc.)
- [ ] Caption/annotation support for figure labeling
- [ ] Preview of formatted output

### Status Bar
#### Left Section
- [ ] Current tool badge displays (e.g., "Select", "Pen", "Rectangle")
- [ ] Tool badge updates immediately on tool switch
- [ ] Selection count shows when objects are selected (e.g., "3 objects")
#### Right Section
- [ ] Canvas dimensions display (e.g., "800×600")
- [ ] Mouse coordinates (X, Y) update in real time as cursor moves
- [ ] Zoom percentage displayed (e.g., "100%")
- [ ] `+` button increments zoom
- [ ] `-` button decrements zoom
- [ ] Clicking zoom percentage resets to 100%

### Rulers & Guides
#### Rulers
- [ ] Horizontal ruler renders across top of canvas
- [ ] Vertical ruler renders along left side of canvas
- [ ] Rulers toggle with `Ctrl+R` or View menu
- [ ] Ruler unit toggle button in corner (px ↔ pt)
- [ ] Ruler markings update on zoom/pan
- [ ] Current cursor position highlighted on rulers
#### Guides
- [ ] Drag from horizontal ruler to create a horizontal guide
- [ ] Drag from vertical ruler to create a vertical guide
- [ ] Guides render as colored lines across the full canvas
- [ ] Guides toggle visibility with `Ctrl+Shift+R`
- [ ] Object snap to guide lines when dragging near them
- [ ] Snap indicator appears when object snaps to guide
- [ ] Double-click guide to edit position numerically
- [ ] Drag guide off canvas to delete it
- [ ] "Clear All Guides" option available

### Export Dialog
- [ ] Opens via `Ctrl+E` or File → Export
- [ ] Tab-based interface: PNG | SVG | PDF | PowerPoint | LaTeX
