# illustrate — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### MenuBar
#### Edit Menu
- [ ] **Ungroup** (`Ctrl+Shift+G`) — Ungroups selected group
#### View Menu
- [ ] **Zoom In** (`+`) — Increments zoom by 0.1
- [ ] **Zoom Out** (`-`) — Decrements zoom by 0.1
- [ ] **Zoom to 100%** (`Ctrl+0`) — Resets viewport to 1.0
- [ ] **Fit to Window** (`Ctrl+1`) — Fits all objects in view
- [ ] **Zoom presets**: 50%, 100%, 150%, 200% — Each sets zoom to value
- [ ] **Show Grid** (`Ctrl+'`) — Toggles `gridVisible`
- [ ] **Snap to Grid** (`Ctrl+Shift+;`) — Toggles `snapToGrid`
- [ ] **Show Rulers** (`Ctrl+R`) — Toggles ruler visibility
- [ ] **Show Guides** (`Ctrl+Shift+R`) — Toggles guide visibility
#### Object Menu
- [ ] **Bring to Front** (`Ctrl+Shift+]`) — Moves selected to top z-index
- [ ] **Bring Forward** (`Ctrl+]`) — Increases z-index by 1
- [ ] **Send Backward** (`Ctrl+[`) — Decreases z-index by 1
- [ ] **Send to Back** (`Ctrl+Shift+[`) — Moves selected to bottom z-index
- [ ] **Flip Horizontal** (`Shift+H`) — Flips selection horizontally
- [ ] **Flip Vertical** (`Shift+V`) — Flips selection vertically
- [ ] **Group** (`Ctrl+G`) — Groups selected objects
- [ ] **Ungroup** (`Ctrl+Shift+G`) — Ungroups selected group
- [ ] **Make Clipping Mask** (`Ctrl+7`) — Requires 2+ objects selected
- [ ] **Release Clipping Mask** (`Ctrl+Alt+7`) — Requires single clipped group
- [ ] **Make Compound Path** (`Ctrl+8`) — Requires 2+ path objects
- [ ] **Release Compound Path** (`Ctrl+Alt+8`) — Requires single compound path
- [ ] **Offset Path** — Prompts for distance (positive = outward, negative = inward)
- [ ] **Pathfinder — Unite** — Combines shapes into one
- [ ] **Pathfinder — Subtract** — Cuts bottom shape from top
- [ ] **Pathfinder — Intersect** — Keeps only overlapping area
- [ ] **Pathfinder — Exclude** — XOR: keeps non-overlapping areas
#### Insert Menu
- [ ] **DNA Helix** (`Ctrl+Shift+D`) — Inserts DNA helix shape
- [ ] **Cell Membrane** (`Ctrl+Shift+M`) — Inserts cell membrane shape
- [ ] **Cell Layer / Tissue** — Inserts tissue layer shape
- [ ] **Neuron** — Inserts neuron shape
- [ ] **Mitochondria** — Inserts mitochondria shape
- [ ] **Pathway Arrows** — Inserts pathway arrow set
- [ ] **All Scientific Shapes** (`Ctrl+Shift+S`) — Opens full shape generator panel
#### Image Menu
- [ ] **AI Generate Image** (`Ctrl+Shift+A`) — Opens AIGenerationTool dialog
