# illustrate — Spec 004

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Editor — Workspace Layout (`/illustrate/editor`)
#### Layout
- [x] PASS: Three-region layout: Toolbar (left) | Canvas (center) | Right Panel (right)
- [x] PASS: MenuBar spans full width at top
- [x] PASS: Status Bar spans full width at bottom
- [x] PASS: Rulers display on top and left of canvas (toggleable)
- [x] PASS: Layout is responsive and panels resize appropriately
#### Loading Existing Diagrams (`/illustrate/editor/[id]`)
- [x] PASS: Loading spinner shows while diagram data is retrieved
- [x] PASS: Diagram loads from `localStorage['finnish-diagram-{id}']`
- [x] PASS: Toast notification on successful load
- [x] PASS: Error toast if diagram ID not found
- [x] PASS: Canvas populates with saved objects
#### Import from Agent Mode
- [x] PASS: When URL contains `?import=agent`, checks sessionStorage
- [x] PASS: SVG from `sessionStorage['scholarsync-illustration-agent-import']` imports into canvas
- [x] PASS: SessionStorage entry cleared after successful import
- [x] PASS: Toast notification on successful import
- [x] PASS: Error handling if sessionStorage is empty or SVG is invalid

### MenuBar
#### File Menu
- [x] PASS: **New** (`Ctrl+N`) — Shows confirm dialog, clears canvas on confirm
- [x] PASS: **Open** (`Ctrl+O`) — Opens file picker for `.finnish`, `.json`, `.svg` files
- [x] PASS: **Place Image** (`Ctrl+Shift+P`) — Opens file picker for image files
- [x] PASS: **Canvas Size** — Opens document settings dialog (width, height, background color)
- [x] PASS: **Save** (`Ctrl+S`) — Downloads as `diagram.finnish`
- [x] PASS: **Save As** (`Ctrl+Shift+S`) — Prompts for filename, then downloads
- [x] PASS: **Export** (`Ctrl+E`) — Opens Export dialog
- [x] PASS: **Quick Export — SVG** — Downloads SVG immediately
- [x] PASS: **Quick Export — PNG** — Downloads PNG immediately
- [x] PASS: **Quick Export — PNG @2x** — Downloads PNG at 2× scale
- [x] PASS: **Recent Files** — Disabled placeholder item
#### Edit Menu
- [x] PASS: **Undo** (`Ctrl+Z`) — Enabled only when `history.past.length > 0`
- [x] PASS: **Redo** (`Ctrl+Y`) — Enabled only when `history.future.length > 0`
- [x] PASS: **Cut** (`Ctrl+X`) — Copies and deletes selected objects
- [x] PASS: **Copy** (`Ctrl+C`) — Copies selected objects to clipboard
- [x] PASS: **Paste** (`Ctrl+V`) — Pastes from clipboard to canvas
- [x] PASS: **Delete** (`Del`) — Removes selected objects
- [x] PASS: **Select All** (`Ctrl+A`) — Selects all canvas objects
- [x] PASS: **Deselect** (`Esc`) — Clears selection
- [x] PASS: **Group** (`Ctrl+G`) — Groups 2+ selected objects (disabled if < 2 selected)
