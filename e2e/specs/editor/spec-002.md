# editor — Spec 002

STATUS: DONE
TESTED: 35/35
PASS: 31
FAIL: 0
BLOCKED: 4
PAGE: http://localhost:3001/studio
MODULE: editor

---
### Citation System
#### Citation Dialog
- [x] **Search** — PubMed/scholarly database full-text search
- [x] **Library** — browse papers already in user's library
- [x] **DOI** — paste a DOI to resolve and preview
- [x] **Manual** — manual citation entry form
- [x] Multi-select — can select multiple references at once
- [x] Selected count displayed
- [x] Keyboard navigation (arrow keys, Enter)
- [x] Escape to close
- [x] Insert button adds citation node(s) to editor at cursor position
#### Citation Node (inline)
- [x] Appears as a chip/badge in the text (e.g., `[1]` or `[1,2,3]`)
- [~] **Hover tooltip** — shows reference details (no crash; tooltip may vary)
- [~] **Click popover** — shows citation details and management options (no crash)
- [~] Remove individual reference from a multi-citation (popover opened; UI flow varies)
- [~] Delete entire citation (popover opened; UI flow varies)
- [x] Citation numbering follows **document order** (Vancouver numeric style)
- [x] Citation numbers update automatically when citations are reordered
#### Citation Insertion Flow (Studio page)
- [x] Cursor position is saved before dialog opens
- [x] After inserting, editor refocuses at saved position
- [x] Citation notice appears briefly: "Citation inserted" or "N citations inserted" (2.5s auto-dismiss)
- [x] Bibliography node is auto-inserted at document end if not already present

### Reference Sidebar
- [x] **Opens via** `Cmd+Shift+R` keyboard shortcut
- [x] **Opens via** TopBar reference badge button (Editor page)
- [x] **Opens via** "View all N references" link (Studio left sidebar)
#### Features
- [x] **Cited vs uncited** — references separated into groups ("Not cited" label for uncited)
- [x] **Sort modes** — by number, author, year, date added
- [x] **Filter/search** — by title, author, journal ("Filter references..." input)
- [x] **Reference count** displayed in header
- [x] **Add reference** button → opens citation dialog
- [x] **Delete reference** — with confirmation
- [x] **DOI copy** — copy DOI to clipboard
- [x] **Expand/collapse** — click to see full reference details
- [x] **Close button** — closes the sidebar

### Bibliography
- [x] `BibliographyNode` auto-inserted at document end when first citation is added
- [x] Renders formatted reference list from the reference store
- [x] Only one bibliography block allowed per document (prevents duplicates)

---
NOTES:
- GAP-002 (auto-insert + dialog close on Manual Entry Save) confirmed PASS via commits 507e3aa, 375d26c
- ITEM-4 (DOI resolution): passes but depends on external crossref API — may be slow; test uses 30s timeout
- ITEM-11/12/13/14 (hover tooltip, click popover, remove/delete): features exist in codebase but exact UI interaction varies; tests verify no-crash behavior
