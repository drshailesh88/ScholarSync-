# illustrate — Spec 013

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Save & Persistence System
#### Recent Diagrams Tracking
- [ ] Oldest entries removed when limit exceeded
- [ ] Recent list updates on every save
#### Diagram Storage
- [ ] Individual diagrams stored in `localStorage['finnish-diagram-{id}']`
- [ ] Canvas JSON includes all objects, groups, viewport state
- [ ] Thumbnails generated as PNG data URLs for recent list
#### API Save
- [ ] `POST /api/illustration/save` — Saves diagram to database
- [ ] Request includes diagram data, name, metadata

### Credits Page (`/illustrate/credits`)
#### Scientific Illustrations
- [ ] SciDraw-style attribution (CC-BY) displayed
- [ ] Bioicons attribution (CC-BY) displayed
- [ ] Servier Medical Art attribution (CC-BY 4.0) displayed
#### Icon Libraries
- [ ] Tabler Icons (MIT) credited
- [ ] Health Icons (CC0) credited
- [ ] Science Icons (MIT) credited
- [ ] Icon Park (Apache 2.0) credited
- [ ] Simple Icons (CC0) credited
#### Software Libraries
- [ ] Fabric.js (MIT) credited
- [ ] Paper.js (MIT) credited
- [ ] Rough.js (MIT) credited
- [ ] KaTeX (MIT) credited
- [ ] Mermaid (MIT) credited
- [ ] jsPDF (MIT) credited
- [ ] pptxgenjs (MIT) credited
- [ ] MediaPipe (Apache 2.0) credited
#### UI & Layout
- [ ] Attribution cards display with license badges
- [ ] License badges color-coded by license type
- [ ] External links open in new tab (`target="_blank"`)
- [ ] Layout responsive on mobile viewports
- [ ] Back/home navigation link works
- [ ] Page accessible via keyboard navigation

### Error Handling & Edge Cases
#### Error Boundary
- [ ] React Error Boundary wraps entire editor
- [ ] Unhandled errors render fallback UI instead of white screen
- [ ] Fallback UI includes "Reset" button
- [ ] Clicking "Reset" recovers the editor to a working state
#### Toast Notifications
- [ ] **Info** (blue) — Status messages (e.g., "Diagram loaded")
- [ ] **Success** (green) — Completed operations (e.g., "Exported as PNG")
