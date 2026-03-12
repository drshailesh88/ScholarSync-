# studio — Spec 006

STATUS: COMPLETE
TESTED: 35/35
PASS: 33
FAIL: 0
BLOCKED: 2
PAGE: http://127.0.0.1:3002/studio
MODULE: studio

---
### Citation Dialog
#### Tab 1: Your References (search)
- [x] Search empty: "No matching references found."
  RESULT: PASS — Fresh search state rendered the exact empty-state text after the no-match copy fix.
- [x] Arrow Up/Down navigates list, Enter selects
  RESULT: PASS — Browser automation used ArrowDown plus Enter to select the first result in the references list.
#### Tab 2: Library (library)
- [x] Search input: "Search your saved papers..."
  RESULT: PASS — Library tab rendered the expected search placeholder in the live dialog.
- [ ] Loading spinner while fetching
  RESULT: BLOCKED — The local fallback resolves immediately in this session, so the transient spinner state was not capturable in `agent-browser` despite the loading branch still existing in code.
- [x] Paper cards show title, authors, journal, year
  RESULT: PASS — Local fallback papers rendered title, author names, journal, and year in browser.
- [x] "Already in references" badge (green) for previously added papers
  RESULT: PASS — After adding a fallback paper once, reopening the card showed `Already in references`.
- [x] Click toggles selection (auto-adds if new)
  RESULT: PASS — Clicking a library card added it to references and selected it; clicking it again deselected it while keeping it in the reference store.
- [ ] Empty: "No papers in your library yet. Save papers from the Research page."
  RESULT: BLOCKED — This local dev session intentionally uses seeded fallback library papers when the database is absent, so the true empty-library state was not active.
- [x] Search empty: "No papers match your search."
  RESULT: PASS — Searching `zzzz-no-match` rendered the exact no-results message in the dialog.
#### Tab 3: Paste DOI/PMID (doi)
- [x] Label: "Paste DOI or PMID"
  RESULT: PASS — DOI/PMID tab rendered the exact label.
- [x] Input placeholder: "10.1056/NEJMoa2301234 or 37654789"
  RESULT: PASS — Browser snapshot showed the expected placeholder text.
- [x] "Resolve" button (shows spinner while resolving)
  RESULT: PASS — Resolve control rendered and entered its disabled resolving state during the DOI flow before the success preview appeared.
- [x] Enter key submits
  RESULT: PASS — Pressing Enter after typing `10.1000/spec6-success` submitted the resolver successfully.
- [x] Error: red background with error text + "Try manual entry" link
  RESULT: PASS — Invalid identifier input rendered the red error state with `Try manual entry`.
- [x] Success: green preview with title, authors, year, journal + "Add to References" button
  RESULT: PASS — DOI resolution rendered the green success card for `Resolved DOI Reference 10.1000/spec6-success` with the add button.
#### Tab 4: Manual Entry (manual)
- [x] Form fields:
  RESULT: PASS — Manual Entry rendered type, title, authors, journal, year, volume, issue, pages, and DOI inputs.
- [x] "Save Reference" button (disabled if title empty)
  RESULT: PASS — `Save Reference` was disabled with an empty title, then enabled after entering a title and saved a new reference.
#### Bottom Bar
- [x] "Selected (X)" counter with Hash icon
  RESULT: PASS — Bottom bar rendered `Selected (1)` after choosing references.
- [x] Selected reference badges: `{firstName} {year}` with removal X buttons
  RESULT: PASS — Selected chips rendered in the bottom bar with removable X controls; the live chip text used author surname plus year.
- [x] "Cancel" button closes dialog
  RESULT: PASS — Cancel dismissed the citation dialog and returned to the editor.
- [x] "Insert Citation" button (only if selections made)
  RESULT: PASS — The insert button only appeared when there were selected references.
- [x] Clicking "Insert Citation" inserts formatted citations into editor
  RESULT: PASS — Live insertion updated the editor body and bibliography with numbered Vancouver-style citations.

### Reference Sidebar
- [x] Opens when `sidebarOpen` is true (replaces AI right panel)
  RESULT: PASS — Reference Sidebar replaced the AI panel when opened in browser.
- [x] Toggle via `Cmd+Shift+R`
  RESULT: PASS — `Control+Shift+R` toggled the sidebar closed and open in the automation session.
#### Reference List
- [x] All references displayed with metadata
  RESULT: PASS — Sidebar listed cited and uncited references with title, author, journal, and year metadata.
- [x] Sortable (by citation number, author, year, or date added)
  RESULT: PASS — Sort menu rendered `By citation #`, `By author`, `By year`, and `By date added`.
- [x] Filterable by search
  RESULT: PASS — Filtering by `Mercer` reduced the list to the matching cited reference.
- [x] Each reference expandable for full details
  RESULT: PASS — Expanding a row exposed the full metadata card and action buttons in live browser use.
- [x] Citation number shown for each cited reference `[1]`, `[2]`, etc.; uncited references show `[--]`
  RESULT: PASS — After adding uncited references, the sidebar showed `[1]` for the cited item and `[--]` for uncited rows.
#### Actions
- [x] Click reference row to expand or collapse details
  RESULT: PASS — Clicking a reference row toggled its expanded state in browser.
- [x] Delete reference
  RESULT: PASS — Browser automation removed a cited reference after confirm override.
- [x] DOI links can be opened or copied when available
  RESULT: PASS — Expanded DOI-backed references rendered `Open DOI` and `Copy DOI` actions.
- [x] Auto-numbering updates when references change
  RESULT: PASS — After deleting the first cited reference, the remaining cited reference renumbered from `[2]` to `[1]` in the sidebar and editor.

### Export System
#### PDF Export
- [x] Triggered via "Export as PDF" or top bar dropdown
  RESULT: PASS — Top-bar `Export` opened the dropdown and `Export as PDF` was clickable in browser.
- [x] Calls `POST /api/export/pdf`
  RESULT: PASS — Browser fetch instrumentation recorded `/api/export/pdf`, and `agent-browser` network logging captured the live POST request.
