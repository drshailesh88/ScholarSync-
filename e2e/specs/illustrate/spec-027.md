# illustrate — Spec 027

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Editor Store and Keyboard Shortcuts
- [ ] `Ctrl/Cmd+Shift+Z` triggers Redo
- [ ] `Ctrl/Cmd+Y` also triggers Redo
- [ ] `Ctrl/Cmd+C` copies the current Fabric selection into `window.__finnishClipboard`
- [ ] `Ctrl/Cmd+V` pastes from `window.__finnishClipboard`
- [ ] `Ctrl/Cmd+X` cuts via copy plus delete
- [ ] `Ctrl/Cmd+A` selects all non-grid objects
- [ ] `Delete` and `Backspace` delete the current Fabric selection except while Direct Select is active
- [ ] `Escape` clears the current selection
- [ ] `V` switches to Select
- [ ] `H` switches to Hand
- [ ] `R` switches to Rectangle
- [ ] `E` switches to Ellipse
- [ ] `Shift+E` switches to Eraser
- [ ] `L` switches to Line
- [ ] `A` switches to Direct Select
- [ ] `Shift+A` switches to Arrow
- [ ] `P` switches to Pen
- [ ] `T` switches to Text
- [ ] `I` switches to Eyedropper
- [ ] `C` switches to Scissors
- [ ] `M` switches to Measure
- [ ] Numeric shortcuts `1` through `8` map to Select, Hand, Rectangle, Ellipse, Line, Arrow, Pen, and Text respectively
- [ ] `+` and `=` zoom in by `0.1`
- [ ] `-` zooms out by `0.1`
- [ ] `Ctrl/Cmd+0` resets the viewport
- [ ] `Ctrl/Cmd+1` triggers zoom-to-fit
- [ ] `Ctrl/Cmd+'` toggles grid visibility
- [ ] `Ctrl/Cmd+Shift+;` toggles snap-to-grid
- [ ] `Ctrl/Cmd+R` toggles rulers
- [ ] `Ctrl/Cmd+Shift+R` toggles guides
- [ ] `Ctrl/Cmd+G` groups the current selection
- [ ] `Ctrl/Cmd+Shift+G` ungroups the selected group
- [ ] `Ctrl/Cmd+7` makes a clipping mask
- [ ] `Ctrl/Cmd+Alt+7` releases a clipping mask
- [ ] `Ctrl/Cmd+8` makes a compound path
