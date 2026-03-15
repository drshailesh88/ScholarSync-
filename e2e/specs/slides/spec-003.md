# slides — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### WYSIWYG Canvas (Center Panel)
#### Block Selection
- [x] PASS: Marquee/rubber-band selection by dragging on empty canvas area
- [x] PASS: Tab cycles to next block; Shift+Tab cycles to previous
- [x] PASS: Cmd+A selects all blocks on the active slide
- [x] PASS: Escape deselects all (or exits editing mode first)
#### Block Editing
- [x] PASS: Double-click a text/bullets/quote block to enter inline edit mode
- [x] PASS: Editing state tracked globally (for keyboard shortcuts awareness)
- [x] PASS: Click outside the editing block to exit edit mode
- [x] PASS: Escape exits edit mode
#### Block Positioning (Drag & Resize)
- [x] PASS: Drag blocks to reposition them on the canvas
- [x] PASS: Resize handles on selected blocks
- [x] PASS: Multi-block group move (drag one selected block, all move together)
- [x] PASS: Grid snap when `snapToGrid` is enabled
- [x] PASS: Position values in percentage-based coordinates (0–100)
#### Block Z-Order
- [x] PASS: Cmd+] — Bring Forward
- [x] PASS: Cmd+Shift+] — Bring to Front
- [x] PASS: Cmd+[ — Send Backward
- [x] PASS: Cmd+Shift+[ — Send to Back
#### Block Lock/Unlock
- [x] PASS: Cmd+L — Toggle lock on selected block
- [x] PASS: Locked blocks cannot be moved, resized, or deleted
- [x] PASS: Lock/unlock icons displayed on locked blocks
#### Block Clipboard
- [x] PASS: Cmd+C — Copy selected block(s)
- [x] PASS: Cmd+X — Cut selected block(s)
- [x] PASS: Cmd+V — Paste block(s) from clipboard
- [x] PASS: Delete/Backspace — Delete selected block(s) (respects lock)
#### Canvas Context Menu (Right-Click on block)
- [x] PASS: Context menu appears at cursor position
- [x] PASS: Contains block-specific actions (copy, cut, delete, z-order, lock)
- [x] PASS: Submenu support with hover-reveal
- [x] PASS: Escape or click outside closes the menu
- [x] PASS: Scroll closes the menu
#### Slide Regenerate Dialog
- [x] PASS: Opened from context menu "Regenerate with AI..."
- [x] PASS: Instruction text input
- [x] PASS: Tone selector (RegenerateTone)
- [x] PASS: Submit regenerates the slide content
- [x] PASS: Dialog closes on cancel or after successful regeneration
#### Canvas Rulers
- [x] PASS: Toggle rulers on/off from canvas controls
