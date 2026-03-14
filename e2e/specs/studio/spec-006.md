# studio — Spec 006

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Citation Dialog
#### Tab 1: Your References (search)
- [x] PASS: Search empty: "No matching references found."
- [x] PASS: Arrow Up/Down navigates list, Enter selects
#### Tab 2: Library (library)
- [x] PASS: Search input: "Search your saved papers..."
- [x] PASS: Loading spinner while fetching
- [x] PASS: Paper cards show title, authors, journal, year
- [x] PASS: "Already in references" badge (green) for previously added papers
- [x] PASS: Click toggles selection (auto-adds if new)
- [x] PASS: Empty: "No papers in your library yet. Save papers from the Research page."
- [x] PASS: Search empty: "No papers match your search."
#### Tab 3: Paste DOI/PMID (doi)
- [x] PASS: Label: "Paste DOI or PMID"
- [x] PASS: Input placeholder: "10.1056/NEJMoa2301234 or 37654789"
- [x] PASS: "Resolve" button (shows spinner while resolving)
- [x] PASS: Enter key submits
- [x] PASS: Error: red background with error text + "Try manual entry" link
- [x] PASS: Success: green preview with title, authors, year, journal + "Add to References" button
#### Tab 4: Manual Entry (manual)
- [x] PASS: Form fields:
- [x] PASS: "Save Reference" button (disabled if title empty)
#### Bottom Bar
- [x] PASS: "Selected (X)" counter with Hash icon
- [x] PASS: Selected reference badges: `{firstName} {year}` with removal X buttons
- [x] PASS: "Cancel" button closes dialog
- [x] PASS: "Insert Citation" button (only if selections made)
- [x] PASS: Clicking "Insert Citation" inserts formatted citations into editor

### Reference Sidebar
- [x] PASS: Opens when `sidebarOpen` is true (replaces AI right panel)
- [x] PASS: Toggle via `Cmd+Shift+R`
#### Reference List
- [x] PASS: All references displayed with metadata
- [x] PASS: Sortable (by citation number, author, year, or date added)
- [x] PASS: Filterable by search
- [x] PASS: Each reference expandable for full details
- [x] PASS: Citation number shown for each cited reference `[1]`, `[2]`, etc.; uncited references show `[--]`
#### Actions
- [x] PASS: Click reference row to expand or collapse details
- [x] PASS: Delete reference
- [x] PASS: DOI links can be opened or copied when available
- [x] PASS: Auto-numbering updates when references change

### Export System
#### PDF Export
- [x] PASS: Triggered via "Export as PDF" or top bar dropdown
- [x] PASS: Calls `POST /api/export/pdf`
