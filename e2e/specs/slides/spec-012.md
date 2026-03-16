# slides — Spec 012

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Keyboard Shortcuts (Global)
#### Z-Order
- [x] PASS: `Cmd+Shift+[` — Send to Back
#### Block Operations
- [x] PASS: `Cmd+L` — Toggle Lock on selected block
- [x] PASS: `Cmd+G` — Group (TODO/placeholder)
- [x] PASS: `Cmd+Shift+G` — Ungroup (TODO/placeholder)
- [x] PASS: `Delete` / `Backspace` — Delete selected blocks (respects lock)
#### Slide Operations
- [x] PASS: `Cmd+Shift+D` — Duplicate active slide
- [x] PASS: `Cmd+C` — Copy block (if block selected) or copy slide (if no block selected)
- [x] PASS: `Cmd+X` — Cut selected block(s)
- [x] PASS: `Cmd+V` — Paste block (if blocks in clipboard) or paste slide
#### Navigation
- [x] PASS: `Home` — Jump to first slide
- [x] PASS: `End` — Jump to last slide
- [x] PASS: `PageUp` — Previous slide
- [x] PASS: `PageDown` — Next slide
#### Smart Target Detection
- [x] PASS: Shortcuts disabled when typing in INPUT, TEXTAREA, or contentEditable elements
- [x] PASS: Undo/Redo disabled when editing a block
- [x] PASS: Z-order shortcuts only work when block is selected (not "select all")

### Slide Background System
#### Background Types
- [x] PASS: **Solid Color** — Single color from ColorPicker
- [x] PASS: **Gradient** — Linear gradient with configurable angle and color stops
- [x] PASS: **Image** — Background image with URL
#### Image Position Options
- [x] PASS: Cover
- [x] PASS: Contain
- [x] PASS: Top
- [x] PASS: Center
- [x] PASS: Bottom
#### Overlay System
- [x] PASS: **None** — No overlay
- [x] PASS: **Frosted** — Frosted glass effect
- [x] PASS: **Faded** — Semi-transparent color overlay
- [x] PASS: Overlay Intensity slider (0–100%)
- [x] PASS: Overlay Color picker
- [x] PASS: Overlay style correctly renders in both editor and presenter
#### Per-Slide Override
- [x] PASS: Each slide can override the theme background
- [x] PASS: "Reset to Theme Default" removes the override
- [x] PASS: Background changes reflect in filmstrip thumbnails

### Alignment & Layout Engine
#### Single Block → Canvas Alignment
- [x] PASS: Align Left (x = 0)
- [x] PASS: Align Center (x = 50 - width/2)
