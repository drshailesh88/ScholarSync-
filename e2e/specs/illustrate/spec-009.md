# illustrate — Spec 009

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Right Panel — Properties Tab
#### Gradient Editor
- [ ] Toggle between solid fill and gradient fill
- [ ] Linear gradient mode
- [ ] Radial gradient mode
- [ ] Gradient bar with draggable color stops
- [ ] Add/remove color stops
- [ ] Gradient presets available
#### No Selection State
- [ ] Properties tab shows empty/instructional state when nothing selected
- [ ] Message like "Select an object to view properties"

### Right Panel — Icons Tab
- [ ] Icon search input with text filtering
- [ ] Multiple icon library sources available:
- [ ] Tabler Icons
- [ ] Health Icons
- [ ] Science Icons
- [ ] Icon Park
- [ ] Simple Icons
- [ ] Icon categories filter/browse
- [ ] Icons display in a grid with preview
- [ ] Click or drag an icon to insert it on canvas
- [ ] Inserted icon is a vector object (editable)
- [ ] Search updates results dynamically as user types
#### API Integration
- [ ] `GET /api/illustration/icons/search` — Search across libraries
- [ ] `GET /api/illustration/icons/route` — List available icons
- [ ] `POST /api/illustration/icons/generate` — Generate custom icons

### Right Panel — Style Tab (Hand-Drawn Effects)
- [ ] **Hand-Drawn Toggle** — Enables/disables Rough.js rendering
- [ ] **Roughness** slider — Range 0 (clean) to 2+ (sketchy)
- [ ] Value 0 = smooth, vector-clean lines
- [ ] Value 2+ = very rough, hand-drawn look
- [ ] **Bowing** control — Line curvature amount
- [ ] **Fill Pattern** dropdown — 6 options:
- [ ] Solid
- [ ] Hachure
- [ ] Cross-hatch
- [ ] Dots
- [ ] Zigzag
- [ ] Dashed
