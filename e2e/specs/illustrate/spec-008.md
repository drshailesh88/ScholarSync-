# illustrate — Spec 008

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Right Panel — Properties Tab
#### Transform Properties
- [x] PASS: **X** — Numeric input for horizontal position
- [x] PASS: **Y** — Numeric input for vertical position
- [x] PASS: **Width** — Numeric input for object width
- [x] PASS: **Height** — Numeric input for object height
- [x] PASS: **Rotation** — Numeric input for rotation angle (degrees)
- [x] PASS: Editing any field updates the object live on canvas
- [x] PASS: Values update when object is dragged/resized on canvas
#### Appearance
- [x] PASS: **Fill** — Color picker for object fill
- [x] PASS: **Stroke** — Color picker for stroke/border color
- [x] PASS: **Stroke Width** — Numeric input
- [x] PASS: **Opacity** — Slider 0%–100%
- [x] PASS: Changes apply immediately to selected object
#### Alignment Tools
- [x] PASS: Align Left — Aligns selected objects to left edge
- [x] PASS: Align Center (H) — Centers objects horizontally
- [x] PASS: Align Right — Aligns to right edge
- [x] PASS: Align Top — Aligns to top edge
- [x] PASS: Align Center (V) — Centers objects vertically
- [x] PASS: Align Bottom — Aligns to bottom edge
- [x] PASS: Distribute Horizontally — Equal horizontal spacing
- [x] PASS: Distribute Vertically — Equal vertical spacing
- [x] PASS: Alignment requires 2+ selected objects (or aligns to canvas)
#### Text Properties (visible when text is selected)
- [x] PASS: Font family picker
- [x] PASS: Font size input
- [x] PASS: Font weight selector (normal, bold)
- [x] PASS: Text alignment (left, center, right, justify)
- [x] PASS: Line height input
- [x] PASS: Text color (may use fill color control)
#### Effects
- [x] PASS: **Shadow** — Toggle shadow on/off
- [x] PASS: Shadow X offset
- [x] PASS: Shadow Y offset
- [x] PASS: Shadow blur radius
- [x] PASS: Shadow color picker
- [x] PASS: Shadow opacity
- [x] PASS: **Blur** — Blur amount slider
- [x] PASS: **Blend Mode** — Dropdown (normal, multiply, screen, overlay, etc.)
