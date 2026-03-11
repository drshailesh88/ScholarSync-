# editor — Spec 002

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Citation System
#### Citation Dialog
- [ ] **Search** — PubMed/scholarly database full-text search
- [ ] **Library** — browse papers already in user's library
- [ ] **DOI** — paste a DOI to resolve and preview
- [ ] **Manual** — manual citation entry form
- [ ] Multi-select — can select multiple references at once
- [ ] Selected count displayed
- [ ] Keyboard navigation (arrow keys, Enter)
- [ ] Escape to close
- [ ] Insert button adds citation node(s) to editor at cursor position
#### Citation Node (inline)
- [ ] Appears as a chip/badge in the text (e.g., `[1]` or `[1,2,3]`)
- [ ] **Hover tooltip** — shows reference details
- [ ] **Click popover** — shows citation details and management options
- [ ] Remove individual reference from a multi-citation
- [ ] Delete entire citation
- [ ] Citation numbering follows **document order** (Vancouver numeric style)
- [ ] Citation numbers update automatically when citations are reordered
#### Citation Insertion Flow (Studio page)
- [ ] Cursor position is saved before dialog opens
- [ ] After inserting, editor refocuses at saved position
- [ ] Citation notice appears briefly: "Citation inserted" or "N citations inserted" (2.5s auto-dismiss)
- [ ] Bibliography node is auto-inserted at document end if not already present

### Reference Sidebar
- [ ] **Opens via** `Cmd+Shift+R` keyboard shortcut
- [ ] **Opens via** TopBar reference badge button (Editor page)
- [ ] **Opens via** "View all N references" link (Studio left sidebar)
#### Features
- [ ] **Cited vs uncited** — references separated into groups
- [ ] **Sort modes** — by number, author, year, date added
- [ ] **Filter/search** — by title, author, journal
- [ ] **Reference count** displayed in header
- [ ] **Add reference** button → opens citation dialog
- [ ] **Delete reference** — with confirmation
- [ ] **DOI copy** — copy DOI to clipboard
- [ ] **Expand/collapse** — click to see full reference details
- [ ] **Close button** — closes the sidebar

### Bibliography
- [ ] `BibliographyNode` auto-inserted at document end when first citation is added
- [ ] Renders formatted reference list from the reference store
- [ ] Only one bibliography block allowed per document (prevents duplicates)
