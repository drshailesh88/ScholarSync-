# illustrate — Spec 028

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Editor Store and Keyboard Shortcuts
- [ ] `Ctrl/Cmd+Alt+8` releases a compound path
- [ ] `Shift+H` flips the current selection horizontally
- [ ] `Shift+V` flips the current selection vertically
- [ ] While the Eraser tool is active, `[` decreases eraser size and `]` increases eraser size
- [ ] While the point-editing overlay is active, `Delete` or `Backspace` removes the selected anchor points and fires `object:modified`
- [ ] While the scientific text toolbar is open, `Escape` closes the toolbar
- [ ] Inline layer rename input commits on `Enter` and cancels on `Escape`
#### Drag, Drop, Guides, and Toast System
- [ ] Supported image imports are `image/png`, `image/jpeg`, `image/jpg`, and `image/svg+xml`, plus filenames ending with `.png`, `.jpg`, `.jpeg`, or `.svg`
- [ ] Dropped or pasted images are always centered on the canvas by `centerImageOnCanvas()`; drop coordinates are not used for placement
- [ ] Imported images are scaled down only when their source width exceeds 50% of the canvas width
- [ ] Drag-and-drop import scans `event.dataTransfer.files` and picks the first supported image file; additional supported files in the same drop are ignored
- [ ] Guide dragging uses window-level `pointermove` and `pointerup` listeners and cleans both up when the drag ends or the component unmounts
- [ ] Dragging a horizontal guide back above the canvas overlay deletes it when `localY < 0`
- [ ] Dragging a vertical guide back left of the canvas overlay deletes it when `localX < 0`
- [ ] Double-clicking a horizontal guide prompts `Set horizontal guide position (px)`
- [ ] Double-clicking a vertical guide prompts `Set vertical guide position (px)`
- [ ] Toast provider defaults each toast to duration `5000`, keeps at most `5` visible toasts, and makes them dismissible by default
- [ ] Toast manual dismiss waits `200` ms before removing the toast from state so the exit animation can finish
- [ ] `Editor ready. Start creating!` is an info toast with explicit duration `3000`
- [ ] Help > Keyboard Shortcuts uses an info toast with duration `10000`
- [ ] Help > About FINNISH uses an info toast with duration `8000`
- [ ] Canvas eyedropper sampling uses an info toast `Color sampled: {HEX}`
- [ ] Canvas brush lazy-load uses an info toast `Loading brush engine...`
- [ ] Properties-panel pathfinder warning toast is `Select at least 2 objects for pathfinder operations`
- [ ] Properties-panel pathfinder failure toasts are `Operation produced no result`, `Unable to convert one or more selected objects for pathfinder`, and `Pathfinder operation failed` or the thrown message
- [ ] Right-panel icon insertion warning toast `No valid objects found in SVG` exists in the live code even though Pass 1 did not enumerate it
- [ ] There is no Yjs collaboration provider, awareness/cursor sync, or conflict-resolution layer wired into the rendered illustrate routes
#### MenuBar Operation Toast Messages (`MenuBar.tsx`)
- [ ] Flip selection with no objects selected shows warning toast `Select at least 1 object to flip`
- [ ] Flip operation calls `toggleObjectFlip()` for each selected object and fires `object:modified` event
- [ ] Offset Path prompt reads `Offset distance in pixels (positive = outward, negative = inward):` with default value `10`
- [ ] Offset Path with selection count ≠ 1 shows warning toast `Select exactly 1 path or line`
- [ ] Offset Path success toast reads `Offset path created (${distance}px)`
- [ ] Offset Path supports both `FabricPath` and `Line` object types
- [ ] Clipping mask creation with < 2 objects shows warning toast `Select at least 2 objects. Topmost object will be used as clip shape.`
- [ ] Clipping mask creation success toast reads `Clipping mask created`
