# illustrate — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### MenuBar
#### Image Menu
- [ ] **Remove Background** (`Ctrl+Shift+B`) — Opens BackgroundRemovalTool dialog
- [ ] **Adjustments** — Submenu items (Brightness/Contrast, Hue/Saturation, Levels) shown as disabled
- [ ] **Filters** — Submenu items (Blur, Sharpen, Add Noise) shown as disabled
#### Help Menu
- [ ] **Keyboard Shortcuts** (`Ctrl+/`) — Displays toast/dialog listing all shortcuts
- [ ] **Documentation** — Opens `https://finnish.dev/docs` in new tab
- [ ] **About FINNISH** — Shows version info toast/dialog

### Toolbar
#### Toolbar UI
- [ ] Active tool is visually highlighted
- [ ] Tooltips display on hover with tool name and shortcut
- [ ] Polygon config popup appears on Polygon tool selection
- [ ] Sides input accepts values 3–24
- [ ] Input updates `polygonSides` in store
- [ ] Star config popup appears on Star tool selection
- [ ] Points input accepts values 3–24
- [ ] Input updates `starPoints` in store
- [ ] Scientific Shapes button opens shape generator panel
- [ ] Keyboard shortcuts activate corresponding tools

### Canvas — Drawing & Interaction
#### Shape Drawing
- [ ] Rectangle tool: click-drag creates rectangle on canvas
- [ ] Ellipse tool: click-drag creates ellipse on canvas
- [ ] Polygon tool: click-drag creates polygon with configured sides
- [ ] Star tool: click-drag creates star with configured points
- [ ] Line tool: click-drag creates straight line
- [ ] Arrow tool: click-drag creates line with arrowhead
#### Path Drawing
- [ ] Pen tool: click to place anchor points
- [ ] Pen tool: click-drag to create bezier curves with control handles
- [ ] Pen tool: click on first point to close path
- [ ] Brush tool: freehand drawing with natural brush strokes (perfect-freehand)
- [ ] Rough.js hand-drawn style toggle applies to drawn shapes
#### Text
- [ ] Text tool: click on canvas creates a new text object
- [ ] Double-click text object to enter inline editing
- [ ] Text editing supports typing, selection, delete
- [ ] Text properties update live during editing (font, size, color)
#### Selection & Manipulation
- [ ] Click to select a single object
- [ ] Click on empty space to deselect
- [ ] `Ctrl/Cmd`+click to add/remove from multi-selection
- [ ] Drag to move selected objects
