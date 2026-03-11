# editor — Spec 023

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Citation Dialog: Shared Modal and Search Tab
- [ ] Search-tab identifier-detection banner is a full-width button rather than passive help text
- [ ] Identifier-detection banner label is `Resolve DOI:` or `Resolve PMID:` followed by the typed identifier
- [ ] Search-tab `ArrowDown` moves the focused search row down by one and clamps at the last row
- [ ] Search-tab `ArrowUp` moves the focused search row up by one and clamps at zero
- [ ] Search-tab `Enter` resolves the typed identifier when DOI/PMID detection is active
- [ ] Search-tab `Enter` toggles the currently focused reference row when DOI/PMID detection is not active
- [ ] Search-tab merges local references and PubMed results without duplicate ids
- [ ] Search-tab selected rows show a blue checkbox state
- [ ] Search-tab already-numbered references show a right-side numeric badge like `[3]`
#### Citation Dialog: Library, DOI/PMID, and Manual Entry
- [ ] Library-tab data loads lazily on first switch to the `library` tab
- [ ] First library-tab load searches the saved papers library with an empty string
- [ ] Library-tab search input placeholder is `Search your saved papers...`
- [ ] Library-tab search waits 300 ms after typing before calling `searchPapersInLibrary(...)`
- [ ] Library-tab loading state is a centered spinner row
- [ ] Library-tab empty state text is `No papers match your search.` when a filter query returns no papers
- [ ] Library-tab empty state text is `No papers in your library yet. Save papers from the Research page.` when the library is empty
- [ ] Library-tab paper rows show title plus author/journal/year summary text
- [ ] Library-tab added papers are converted to references with ids `ref-paper-<paper.id>`
- [ ] Clicking a library paper that is already in references toggles selection instead of adding a duplicate reference object
- [ ] Library-tab non-selected already-added papers show helper text `Already in references`
- [ ] Resolving an identifier switches the active tab to `doi`
- [ ] DOI-tab label text is `Paste DOI or PMID`
- [ ] DOI-tab input placeholder is `10.1056/NEJMoa2301234 or 37654789`
- [ ] DOI-tab `Resolve` button is disabled when the input is blank
- [ ] DOI-tab `Resolve` button is also disabled while `doiLoading` is true
- [ ] DOI-tab pressing `Enter` with a non-empty input triggers resolution
- [ ] DOI-tab error panel includes a secondary action text `Try manual entry`
- [ ] Clicking `Try manual entry` switches the active tab to `manual`
- [ ] Successful DOI/PMID resolution shows a green preview card with title and condensed author/year/journal metadata
- [ ] DOI preview action label is `Add to References`
- [ ] Adding a resolved reference returns the dialog to the `search` tab
- [ ] Manual-entry `Type` select defaults to `Article`
- [ ] Manual-entry type options are `Article`, `Book`, `Book Chapter`, `Website`, `Guideline`, `Conference`, `Thesis`, and `Preprint`
- [ ] Manual-entry title label includes a required asterisk in `Title *`
- [ ] Manual-entry title placeholder is `Article title`
