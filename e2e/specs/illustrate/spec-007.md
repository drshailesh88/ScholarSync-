# illustrate — Spec 007

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Canvas — Drawing & Interaction
#### Selection & Manipulation
- [ ] Corner handles resize objects proportionally
- [ ] Side handles resize non-proportionally
- [ ] Rotation handle rotates object (visible above selection)
- [ ] Double-click group to enter group editing
#### Navigation
- [ ] Scroll wheel zooms in/out
- [ ] `Space`+drag pans canvas
- [ ] Middle mouse button drag pans canvas
- [ ] Hand tool (`H`) enables pan mode on any drag
#### Drag & Drop
- [ ] Drag image from desktop onto canvas inserts it
- [ ] Supported image formats: PNG, JPG, SVG
- [ ] Paste image from clipboard (`Ctrl+V`) inserts onto canvas
#### History (Undo/Redo)
- [ ] Each object modification pushes state to history
- [ ] `Ctrl+Z` undoes last action
- [ ] `Ctrl+Y` redoes last undone action
- [ ] History limited to 50 states
- [ ] History clears on "New" canvas
#### Grid & Snap
- [ ] Grid overlay renders when `gridVisible` is true
- [ ] Grid size configurable (default 20px)
- [ ] Objects snap to grid lines when `snapToGrid` is true
- [ ] Snap behavior applies during drag/resize/create

### Right Panel — Layers Tab
- [ ] Lists all canvas objects in hierarchical tree view
- [ ] Object names/types displayed (Rectangle, Ellipse, Text, Group, etc.)
- [ ] Clicking a layer entry selects the corresponding object on canvas
- [ ] Selected object's layer entry is highlighted
- [ ] **Visibility toggle** (eye icon):
- [ ] Click to hide object on canvas
- [ ] Click again to show
- [ ] Hidden objects display dimmed in layer list
- [ ] **Lock toggle** (lock icon):
- [ ] Click to lock object (prevent selection/move)
- [ ] Click again to unlock
- [ ] Locked objects show lock indicator
- [ ] **Drag-to-reorder**: dragging a layer entry changes z-order
- [ ] Groups show expandable children
- [ ] Layer order matches visual z-order on canvas
