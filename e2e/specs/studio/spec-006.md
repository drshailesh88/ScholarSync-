# studio — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Citation Dialog
#### Tab 1: Your References (search)
- [ ] Search empty: "No matching references found."
- [ ] Arrow Up/Down navigates list, Enter selects
#### Tab 2: Library (library)
- [ ] Search input: "Search your saved papers..."
- [ ] Loading spinner while fetching
- [ ] Paper cards show title, authors, journal, year
- [ ] "Already in references" badge (green) for previously added papers
- [ ] Click toggles selection (auto-adds if new)
- [ ] Empty: "No papers in your library yet. Save papers from the Research page."
- [ ] Search empty: "No papers match your search."
#### Tab 3: Paste DOI/PMID (doi)
- [ ] Label: "Paste DOI or PMID"
- [ ] Input placeholder: "10.1056/NEJMoa2301234 or 37654789"
- [ ] "Resolve" button (shows spinner while resolving)
- [ ] Enter key submits
- [ ] Error: red background with error text + "Try manual entry" link
- [ ] Success: green preview with title, authors, year, journal + "Add to References" button
#### Tab 4: Manual Entry (manual)
- [ ] Form fields:
- [ ] "Save Reference" button (disabled if title empty)
#### Bottom Bar
- [ ] "Selected (X)" counter with Hash icon
- [ ] Selected reference badges: `{firstName} {year}` with removal X buttons
- [ ] "Cancel" button closes dialog
- [ ] "Insert Citation" button (only if selections made)
- [ ] Clicking "Insert Citation" inserts formatted citations into editor

### Reference Sidebar
- [ ] Opens when `sidebarOpen` is true (replaces AI right panel)
- [ ] Toggle via `Cmd+Shift+R`
#### Reference List
- [ ] All references displayed with metadata
- [ ] Sortable (by citation number, author, year, or date added)
- [ ] Filterable by search
- [ ] Each reference expandable for full details
- [ ] Citation number shown for each cited reference `[1]`, `[2]`, etc.; uncited references show `[--]`
#### Actions
- [ ] Click reference row to expand or collapse details
- [ ] Delete reference
- [ ] DOI links can be opened or copied when available
- [ ] Auto-numbering updates when references change

### Export System
#### PDF Export
- [ ] Triggered via "Export as PDF" or top bar dropdown
- [ ] Calls `POST /api/export/pdf`
