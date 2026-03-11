# slides — Spec 003

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### WYSIWYG Canvas (Center Panel)
#### Block Selection
- [ ] Marquee/rubber-band selection by dragging on empty canvas area
- [ ] Tab cycles to next block; Shift+Tab cycles to previous
- [ ] Cmd+A selects all blocks on the active slide
- [ ] Escape deselects all (or exits editing mode first)
#### Block Editing
- [ ] Double-click a text/bullets/quote block to enter inline edit mode
- [ ] Editing state tracked globally (for keyboard shortcuts awareness)
- [ ] Click outside the editing block to exit edit mode
- [ ] Escape exits edit mode
#### Block Positioning (Drag & Resize)
- [ ] Drag blocks to reposition them on the canvas
- [ ] Resize handles on selected blocks
- [ ] Multi-block group move (drag one selected block, all move together)
- [ ] Grid snap when `snapToGrid` is enabled
- [ ] Position values in percentage-based coordinates (0–100)
#### Block Z-Order
- [ ] Cmd+] — Bring Forward
- [ ] Cmd+Shift+] — Bring to Front
- [ ] Cmd+[ — Send Backward
- [ ] Cmd+Shift+[ — Send to Back
#### Block Lock/Unlock
- [ ] Cmd+L — Toggle lock on selected block
- [ ] Locked blocks cannot be moved, resized, or deleted
- [ ] Lock/unlock icons displayed on locked blocks
#### Block Clipboard
- [ ] Cmd+C — Copy selected block(s)
- [ ] Cmd+X — Cut selected block(s)
- [ ] Cmd+V — Paste block(s) from clipboard
- [ ] Delete/Backspace — Delete selected block(s) (respects lock)
#### Canvas Context Menu (Right-Click on block)
- [ ] Context menu appears at cursor position
- [ ] Contains block-specific actions (copy, cut, delete, z-order, lock)
- [ ] Submenu support with hover-reveal
- [ ] Escape or click outside closes the menu
- [ ] Scroll closes the menu
#### Slide Regenerate Dialog
- [ ] Opened from context menu "Regenerate with AI..."
- [ ] Instruction text input
- [ ] Tone selector (RegenerateTone)
- [ ] Submit regenerates the slide content
- [ ] Dialog closes on cancel or after successful regeneration
#### Canvas Rulers
- [ ] Toggle rulers on/off from canvas controls
