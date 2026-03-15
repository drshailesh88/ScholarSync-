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
- [x] PASS: **Editable document title** — click the title input field, type to rename (debounced 1s save)
- [x] PASS: **Back button** — arrow left navigates to `/dashboard`
- [x] PASS: **Document type selector** — dropdown with 4 options:
- [x] PASS: Pending citation notice — blue banner shows "Saved 'X' to your library. Open Citation Dialog to cite it." when scholarsync_pending_citation set in sessionStorage; auto-dismisses after 5s
#### Studio Page (`/studio`)
- [x] PASS: Editable document title — in the left sidebar header
- [x] PASS: Project selector dropdown — appears with multiple projects, switches between them
- [x] PASS: URL parameter support — ?projectId=X pre-selects project (fix: was /studio/${id} → /studio?projectId=${id}); ?mode=learn starts learn mode

### Editor Modes
#### Editor Page
- [x] PASS: **Editing mode** — full editing, described as "Direct changes to document"
- [x] PASS: **Viewing mode** — read-only, editor becomes non-editable, described as "Read-only, no edits"
- [x] PASS: Mode toggle dropdown in TopBar shows icon + label + description for each mode
#### Studio Page
- [x] PASS: **Write mode** — AI drafting assistance, shows AI Intensity bar
- [x] PASS: **Learn mode** — guided educational mode, AI teaches instead of writing for you

### Structural Blocks (via Slash Commands)
#### Slash Menu UX
- [x] PASS: Menu appears when typing `/` at start of block or after whitespace
- [x] PASS: **Fuzzy search filtering** — typing after `/` filters commands by title, description, or category
- [x] PASS: **Keyboard navigation** — Arrow Up/Down to navigate, Enter to select, Escape to close
- [x] PASS: **Category headers** — commands grouped under Basic, Academic, AI, Tools
- [x] PASS: Menu shows icon + title + description for each command
- [x] PASS: "No commands" empty state when filter yields no results

### Academic Blocks (via Slash Commands)
#### Table Features
- [x] PASS: Tables are **resizable** (drag column borders)
- [x] PASS: First row renders as header
- [x] PASS: Tables have CSS class `academic-table`

### Floating Selection Toolbar
- [x] PASS: **Positioning** — toolbar appears above the selection, centered horizontally
- [x] PASS: **Auto-hide** — disappears when selection is cleared or editor loses focus (150ms delay for button clicks)

### Link Management
#### Link Insertion
- [x] PASS: **Cmd+Shift+K** — prompts for URL via `window.prompt`
- [x] PASS: **Selection toolbar link button** — prompts for URL, pre-fills with existing link URL
- [x] PASS: **Auto-linking** — URLs pasted or typed are auto-detected (`autolink: true`)
- [x] PASS: **Link on paste** — pasting a URL over selected text creates a link (`linkOnPaste: true`)
- [x] PASS: Links do NOT open on click in the editor (`openOnClick: false`)
#### LinkPopover (Editor page only)
- [x] PASS: Clicking a link shows a floating popover with:
- [x] PASS: Enter key confirms edit, Escape cancels
- [x] PASS: Popover positions above the clicked link

### Citation System
#### Citation Dialog
- [x] PASS: **Opens via** `Cmd+Shift+C` keyboard shortcut
- [x] PASS: **Opens via** slash command (if available)
- [x] PASS: **Opens via** "+" button in Studio left sidebar references section
- [x] PASS: **Opens via** reference sidebar "Add" button
