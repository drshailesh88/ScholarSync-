# illustrate — Spec 006

STATUS: PARTIAL
TESTED: 35/35
PASS: 33
FAIL: 2
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### MenuBar
#### Image Menu
- [x] PASS: **Remove Background** (`Ctrl+Shift+B`) — Opens BackgroundRemovalTool dialog
- [x] PASS: **Adjustments** — Submenu items (Brightness/Contrast, Hue/Saturation, Levels) shown as disabled
- [x] PASS: **Filters** — Submenu items (Blur, Sharpen, Add Noise) shown as disabled
#### Help Menu
- [x] PASS: **Keyboard Shortcuts** (`Ctrl+/`) — Displays toast/dialog listing all shortcuts
- [x] PASS: **Documentation** — Opens `https://finnish.dev/docs` in new tab
- [x] PASS: **About FINNISH** — Shows version info toast/dialog

### Toolbar
#### Toolbar UI
- [x] PASS: Active tool is visually highlighted
- [x] PASS: Tooltips display on hover with tool name and shortcut
- [x] PASS: Polygon config popup appears on Polygon tool selection
- [x] PASS: Sides input accepts values 3–24
- [x] PASS: Input updates `polygonSides` in store
- [x] PASS: Star config popup appears on Star tool selection
- [x] PASS: Points input accepts values 3–24
- [x] PASS: Input updates `starPoints` in store
- [x] PASS: Scientific Shapes button opens shape generator panel
- [x] PASS: Keyboard shortcuts activate corresponding tools

### Canvas — Drawing & Interaction
#### Shape Drawing
- [x] PASS: Rectangle tool: click-drag creates rectangle on canvas
- [x] PASS: Ellipse tool: click-drag creates ellipse on canvas
- [x] PASS: Polygon tool: click-drag creates polygon with configured sides
- [x] PASS: Star tool: click-drag creates star with configured points
- [x] PASS: Line tool: click-drag creates straight line
- [x] PASS: Arrow tool: click-drag creates line with arrowhead
#### Path Drawing
- [x] PASS: Pen tool: click to place anchor points
- [ ] FAIL: Pen tool: click-drag to create bezier curves with control handles
- [x] PASS: Pen tool: click on first point to close path
- [x] PASS: Brush tool: freehand drawing with natural brush strokes (perfect-freehand)
- [x] PASS: Rough.js hand-drawn style toggle applies to drawn shapes
#### Text
- [x] PASS: Text tool: click on canvas creates a new text object
- [x] PASS: Double-click text object to enter inline editing
- [x] PASS: Text editing supports typing, selection, delete
- [x] PASS: Text properties update live during editing (font, size, color)
#### Selection & Manipulation
- [x] PASS: Click to select a single object
- [x] PASS: Click on empty space to deselect
- [ ] FAIL: `Ctrl/Cmd`+click to add/remove from multi-selection
- [x] PASS: Drag to move selected objects
