# illustrate — Spec 027

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Editor Store and Keyboard Shortcuts
- [x] PASS: `Ctrl/Cmd+Shift+Z` triggers Redo
- [x] PASS: `Ctrl/Cmd+Y` also triggers Redo
- [x] PASS: `Ctrl/Cmd+C` copies the current Fabric selection into `window.__finnishClipboard`
- [x] PASS: `Ctrl/Cmd+V` pastes from `window.__finnishClipboard`
- [x] PASS: `Ctrl/Cmd+X` cuts via copy plus delete
- [x] PASS: `Ctrl/Cmd+A` selects all non-grid objects
- [x] PASS: `Delete` and `Backspace` delete the current Fabric selection except while Direct Select is active
- [x] PASS: `Escape` clears the current selection
- [x] PASS: `V` switches to Select
- [x] PASS: `H` switches to Hand
- [x] PASS: `R` switches to Rectangle
- [x] PASS: `E` switches to Ellipse
- [x] PASS: `Shift+E` switches to Eraser
- [x] PASS: `L` switches to Line
- [x] PASS: `A` switches to Direct Select
- [x] PASS: `Shift+A` switches to Arrow
- [x] PASS: `P` switches to Pen
- [x] PASS: `T` switches to Text
- [x] PASS: `I` switches to Eyedropper
- [x] PASS: `C` switches to Scissors
- [x] PASS: `M` switches to Measure
- [x] PASS: Numeric shortcuts `1` through `8` map to Select, Hand, Rectangle, Ellipse, Line, Arrow, Pen, and Text respectively
- [x] PASS: `+` and `=` zoom in by `0.1`
- [x] PASS: `-` zooms out by `0.1`
- [x] PASS: `Ctrl/Cmd+0` resets the viewport
- [x] PASS: `Ctrl/Cmd+1` triggers zoom-to-fit
- [x] PASS: `Ctrl/Cmd+'` toggles grid visibility
- [x] PASS: `Ctrl/Cmd+Shift+;` toggles snap-to-grid
- [x] PASS: `Ctrl/Cmd+R` toggles rulers
- [x] PASS: `Ctrl/Cmd+Shift+R` toggles guides
- [x] PASS: `Ctrl/Cmd+G` groups the current selection
- [x] PASS: `Ctrl/Cmd+Shift+G` ungroups the selected group
- [x] PASS: `Ctrl/Cmd+7` makes a clipping mask
- [x] PASS: `Ctrl/Cmd+Alt+7` releases a clipping mask
- [x] PASS: `Ctrl/Cmd+8` makes a compound path
