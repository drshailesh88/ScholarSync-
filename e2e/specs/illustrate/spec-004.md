# illustrate — Spec 004

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Editor — Workspace Layout (`/illustrate/editor`)
#### Layout
- [ ] Three-region layout: Toolbar (left) | Canvas (center) | Right Panel (right)
- [ ] MenuBar spans full width at top
- [ ] Status Bar spans full width at bottom
- [ ] Rulers display on top and left of canvas (toggleable)
- [ ] Layout is responsive and panels resize appropriately
#### Loading Existing Diagrams (`/illustrate/editor/[id]`)
- [ ] Loading spinner shows while diagram data is retrieved
- [ ] Diagram loads from `localStorage['finnish-diagram-{id}']`
- [ ] Toast notification on successful load
- [ ] Error toast if diagram ID not found
- [ ] Canvas populates with saved objects
#### Import from Agent Mode
- [ ] When URL contains `?import=agent`, checks sessionStorage
- [ ] SVG from `sessionStorage['scholarsync-illustration-agent-import']` imports into canvas
- [ ] SessionStorage entry cleared after successful import
- [ ] Toast notification on successful import
- [ ] Error handling if sessionStorage is empty or SVG is invalid

### MenuBar
#### File Menu
- [ ] **New** (`Ctrl+N`) — Shows confirm dialog, clears canvas on confirm
- [ ] **Open** (`Ctrl+O`) — Opens file picker for `.finnish`, `.json`, `.svg` files
- [ ] **Place Image** (`Ctrl+Shift+P`) — Opens file picker for image files
- [ ] **Canvas Size** — Opens document settings dialog (width, height, background color)
- [ ] **Save** (`Ctrl+S`) — Downloads as `diagram.finnish`
- [ ] **Save As** (`Ctrl+Shift+S`) — Prompts for filename, then downloads
- [ ] **Export** (`Ctrl+E`) — Opens Export dialog
- [ ] **Quick Export — SVG** — Downloads SVG immediately
- [ ] **Quick Export — PNG** — Downloads PNG immediately
- [ ] **Quick Export — PNG @2x** — Downloads PNG at 2× scale
- [ ] **Recent Files** — Disabled placeholder item
#### Edit Menu
- [ ] **Undo** (`Ctrl+Z`) — Enabled only when `history.past.length > 0`
- [ ] **Redo** (`Ctrl+Y`) — Enabled only when `history.future.length > 0`
- [ ] **Cut** (`Ctrl+X`) — Copies and deletes selected objects
- [ ] **Copy** (`Ctrl+C`) — Copies selected objects to clipboard
- [ ] **Paste** (`Ctrl+V`) — Pastes from clipboard to canvas
- [ ] **Delete** (`Del`) — Removes selected objects
- [ ] **Select All** (`Ctrl+A`) — Selects all canvas objects
- [ ] **Deselect** (`Esc`) — Clears selection
- [ ] **Group** (`Ctrl+G`) — Groups 2+ selected objects (disabled if < 2 selected)
