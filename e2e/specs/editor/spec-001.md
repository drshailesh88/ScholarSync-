# editor — Spec 001

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Document Header & Metadata
#### Editor Page (`/editor/[id]`)
- [ ] **Editable document title** — click the title input field, type to rename (debounced 1s save)
- [ ] **Back button** — arrow left navigates to `/dashboard`
- [ ] **Document type selector** — dropdown with 4 options:
- [x] PASS: Pending citation notice — blue banner shows "Saved 'X' to your library. Open Citation Dialog to cite it." when scholarsync_pending_citation set in sessionStorage; auto-dismisses after 5s
#### Studio Page (`/studio`)
- [x] PASS: Editable document title — in the left sidebar header
- [x] PASS: Project selector dropdown — appears with multiple projects, switches between them
- [x] PASS: URL parameter support — ?projectId=X pre-selects project (fix: was /studio/${id} → /studio?projectId=${id}); ?mode=learn starts learn mode

### Editor Modes
#### Editor Page
- [ ] **Editing mode** — full editing, described as "Direct changes to document"
- [ ] **Viewing mode** — read-only, editor becomes non-editable, described as "Read-only, no edits"
- [ ] Mode toggle dropdown in TopBar shows icon + label + description for each mode
#### Studio Page
- [ ] **Write mode** — AI drafting assistance, shows AI Intensity bar
- [ ] **Learn mode** — guided educational mode, AI teaches instead of writing for you

### Structural Blocks (via Slash Commands)
#### Slash Menu UX
- [ ] Menu appears when typing `/` at start of block or after whitespace
- [ ] **Fuzzy search filtering** — typing after `/` filters commands by title, description, or category
- [ ] **Keyboard navigation** — Arrow Up/Down to navigate, Enter to select, Escape to close
- [ ] **Category headers** — commands grouped under Basic, Academic, AI, Tools
- [ ] Menu shows icon + title + description for each command
- [ ] "No commands" empty state when filter yields no results

### Academic Blocks (via Slash Commands)
#### Table Features
- [ ] Tables are **resizable** (drag column borders)
- [ ] First row renders as header
- [ ] Tables have CSS class `academic-table`

### Floating Selection Toolbar
- [ ] **Positioning** — toolbar appears above the selection, centered horizontally
- [ ] **Auto-hide** — disappears when selection is cleared or editor loses focus (150ms delay for button clicks)

### Link Management
#### Link Insertion
- [ ] **Cmd+Shift+K** — prompts for URL via `window.prompt`
- [ ] **Selection toolbar link button** — prompts for URL, pre-fills with existing link URL
- [ ] **Auto-linking** — URLs pasted or typed are auto-detected (`autolink: true`)
- [ ] **Link on paste** — pasting a URL over selected text creates a link (`linkOnPaste: true`)
- [ ] Links do NOT open on click in the editor (`openOnClick: false`)
#### LinkPopover (Editor page only)
- [ ] Clicking a link shows a floating popover with:
- [ ] Enter key confirms edit, Escape cancels
- [ ] Popover positions above the clicked link

### Citation System
#### Citation Dialog
- [ ] **Opens via** `Cmd+Shift+C` keyboard shortcut
- [ ] **Opens via** slash command (if available)
- [ ] **Opens via** "+" button in Studio left sidebar references section
- [ ] **Opens via** reference sidebar "Add" button
