# illustrate — Spec 005

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### MenuBar
#### Edit Menu
- [x] PASS: **Ungroup** (`Ctrl+Shift+G`) — Ungroups selected group
#### View Menu
- [x] PASS: **Zoom In** (`+`) — Increments zoom by 0.1
- [x] PASS: **Zoom Out** (`-`) — Decrements zoom by 0.1
- [x] PASS: **Zoom to 100%** (`Ctrl+0`) — Resets viewport to 1.0
- [x] PASS: **Fit to Window** (`Ctrl+1`) — Fits all objects in view
- [x] PASS: **Zoom presets**: 50%, 100%, 150%, 200% — Each sets zoom to value
- [x] PASS: **Show Grid** (`Ctrl+'`) — Toggles `gridVisible`
- [x] PASS: **Snap to Grid** (`Ctrl+Shift+;`) — Toggles `snapToGrid`
- [x] PASS: **Show Rulers** (`Ctrl+R`) — Toggles ruler visibility
- [x] PASS: **Show Guides** (`Ctrl+Shift+R`) — Toggles guide visibility
#### Object Menu
- [x] PASS: **Bring to Front** (`Ctrl+Shift+]`) — Moves selected to top z-index
- [x] PASS: **Bring Forward** (`Ctrl+]`) — Increases z-index by 1
- [x] PASS: **Send Backward** (`Ctrl+[`) — Decreases z-index by 1
- [x] PASS: **Send to Back** (`Ctrl+Shift+[`) — Moves selected to bottom z-index
- [x] PASS: **Flip Horizontal** (`Shift+H`) — Flips selection horizontally
- [x] PASS: **Flip Vertical** (`Shift+V`) — Flips selection vertically
- [x] PASS: **Group** (`Ctrl+G`) — Groups selected objects
- [x] PASS: **Ungroup** (`Ctrl+Shift+G`) — Ungroups selected group
- [x] PASS: **Make Clipping Mask** (`Ctrl+7`) — Requires 2+ objects selected
- [x] PASS: **Release Clipping Mask** (`Ctrl+Alt+7`) — Requires single clipped group
- [x] PASS: **Make Compound Path** (`Ctrl+8`) — Requires 2+ path objects
- [x] PASS: **Release Compound Path** (`Ctrl+Alt+8`) — Requires single compound path
- [x] PASS: **Offset Path** — Prompts for distance (positive = outward, negative = inward)
- [x] PASS: **Pathfinder — Unite** — Combines shapes into one
- [x] PASS: **Pathfinder — Subtract** — Cuts bottom shape from top
- [x] PASS: **Pathfinder — Intersect** — Keeps only overlapping area
- [x] PASS: **Pathfinder — Exclude** — XOR: keeps non-overlapping areas
#### Insert Menu
- [x] PASS: **DNA Helix** (`Ctrl+Shift+D`) — Inserts DNA helix shape
- [x] PASS: **Cell Membrane** (`Ctrl+Shift+M`) — Inserts cell membrane shape
- [x] PASS: **Cell Layer / Tissue** — Inserts tissue layer shape
- [x] PASS: **Neuron** — Inserts neuron shape
- [x] PASS: **Mitochondria** — Inserts mitochondria shape
- [x] PASS: **Pathway Arrows** — Inserts pathway arrow set
- [x] PASS: **All Scientific Shapes** (`Ctrl+Shift+S`) — Opens full shape generator panel
#### Image Menu
- [x] PASS: **AI Generate Image** (`Ctrl+Shift+A`) — Opens AIGenerationTool dialog
