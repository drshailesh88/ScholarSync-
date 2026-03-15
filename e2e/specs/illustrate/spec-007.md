# illustrate — Spec 007

STATUS: PARTIAL
TESTED: 35/35
PASS: 34
FAIL: 1
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Canvas — Drawing & Interaction
#### Selection & Manipulation
- [x] PASS: Corner handles resize objects proportionally
- [x] PASS: Side handles resize non-proportionally
- [ ] FAIL: Rotation handle rotates object (visible above selection)
- [x] PASS: Double-click group to enter group editing
#### Navigation
- [x] PASS: Scroll wheel zooms in/out
- [x] PASS: `Space`+drag pans canvas
- [x] PASS: Middle mouse button drag pans canvas
- [x] PASS: Hand tool (`H`) enables pan mode on any drag
#### Drag & Drop
- [x] PASS: Drag image from desktop onto canvas inserts it
- [x] PASS: Supported image formats: PNG, JPG, SVG
- [x] PASS: Paste image from clipboard (`Ctrl+V`) inserts onto canvas
#### History (Undo/Redo)
- [x] PASS: Each object modification pushes state to history
- [x] PASS: `Ctrl+Z` undoes last action
- [x] PASS: `Ctrl+Y` redoes last undone action
- [x] PASS: History limited to 50 states
- [x] PASS: History clears on "New" canvas
#### Grid & Snap
- [x] PASS: Grid overlay renders when `gridVisible` is true
- [x] PASS: Grid size configurable (default 20px)
- [x] PASS: Objects snap to grid lines when `snapToGrid` is true
- [x] PASS: Snap behavior applies during drag/resize/create

### Right Panel — Layers Tab
- [x] PASS: Lists all canvas objects in hierarchical tree view
- [x] PASS: Object names/types displayed (Rectangle, Ellipse, Text, Group, etc.)
- [x] PASS: Clicking a layer entry selects the corresponding object on canvas
- [x] PASS: Selected object's layer entry is highlighted
- [x] PASS: **Visibility toggle** (eye icon):
- [x] PASS: Click to hide object on canvas
- [x] PASS: Click again to show
- [x] PASS: Hidden objects display dimmed in layer list
- [x] PASS: **Lock toggle** (lock icon):
- [x] PASS: Click to lock object (prevent selection/move)
- [x] PASS: Click again to unlock
- [x] PASS: Locked objects show lock indicator
- [x] PASS: **Drag-to-reorder**: dragging a layer entry changes z-order
- [x] PASS: Groups show expandable children
- [x] PASS: Layer order matches visual z-order on canvas
