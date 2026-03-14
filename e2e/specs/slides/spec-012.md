# slides — Spec 012

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Keyboard Shortcuts (Global)
#### Z-Order
- [ ] `Cmd+Shift+[` — Send to Back
#### Block Operations
- [ ] `Cmd+L` — Toggle Lock on selected block
- [ ] `Cmd+G` — Group (TODO/placeholder)
- [ ] `Cmd+Shift+G` — Ungroup (TODO/placeholder)
- [ ] `Delete` / `Backspace` — Delete selected blocks (respects lock)
#### Slide Operations
- [ ] `Cmd+Shift+D` — Duplicate active slide
- [ ] `Cmd+C` — Copy block (if block selected) or copy slide (if no block selected)
- [ ] `Cmd+X` — Cut selected block(s)
- [ ] `Cmd+V` — Paste block (if blocks in clipboard) or paste slide
#### Navigation
- [ ] `Home` — Jump to first slide
- [ ] `End` — Jump to last slide
- [ ] `PageUp` — Previous slide
- [ ] `PageDown` — Next slide
#### Smart Target Detection
- [ ] Shortcuts disabled when typing in INPUT, TEXTAREA, or contentEditable elements
- [ ] Undo/Redo disabled when editing a block
- [ ] Z-order shortcuts only work when block is selected (not "select all")

### Slide Background System
#### Background Types
- [ ] **Solid Color** — Single color from ColorPicker
- [ ] **Gradient** — Linear gradient with configurable angle and color stops
- [ ] **Image** — Background image with URL
#### Image Position Options
- [ ] Cover
- [ ] Contain
- [ ] Top
- [ ] Center
- [ ] Bottom
#### Overlay System
- [ ] **None** — No overlay
- [ ] **Frosted** — Frosted glass effect
- [ ] **Faded** — Semi-transparent color overlay
- [ ] Overlay Intensity slider (0–100%)
- [ ] Overlay Color picker
- [ ] Overlay style correctly renders in both editor and presenter
#### Per-Slide Override
- [ ] Each slide can override the theme background
- [ ] "Reset to Theme Default" removes the override
- [ ] Background changes reflect in filmstrip thumbnails

### Alignment & Layout Engine
#### Single Block → Canvas Alignment
- [ ] Align Left (x = 0)
- [ ] Align Center (x = 50 - width/2)
