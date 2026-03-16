# editor — Spec 023

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Citation Dialog: Shared Modal and Search Tab
- [x] PASS: Search-tab identifier-detection banner is a full-width button rather than passive help text
- [x] PASS: Identifier-detection banner label is `Resolve DOI:` or `Resolve PMID:` followed by the typed identifier
- [x] PASS: Search-tab `ArrowDown` moves the focused search row down by one and clamps at the last row
- [x] PASS: Search-tab `ArrowUp` moves the focused search row up by one and clamps at zero
- [x] PASS: Search-tab `Enter` resolves the typed identifier when DOI/PMID detection is active
- [x] PASS: Search-tab `Enter` toggles the currently focused reference row when DOI/PMID detection is not active
- [x] PASS: Search-tab merges local references and PubMed results without duplicate ids
- [x] PASS: Search-tab selected rows show a blue checkbox state
- [x] PASS: Search-tab already-numbered references show a right-side numeric badge like `[3]`
#### Citation Dialog: Library, DOI/PMID, and Manual Entry
- [x] PASS: Library-tab data loads lazily on first switch to the `library` tab
- [x] PASS: First library-tab load searches the saved papers library with an empty string
- [x] PASS: Library-tab search input placeholder is `Search your saved papers...`
- [x] PASS: Library-tab search waits 300 ms after typing before calling `searchPapersInLibrary(...)`
- [x] PASS: Library-tab loading state is a centered spinner row
- [x] PASS: Library-tab empty state text is `No papers match your search.` when a filter query returns no papers
- [x] PASS: Library-tab empty state text is `No papers in your library yet. Save papers from the Research page.` when the library is empty
- [x] PASS: Library-tab paper rows show title plus author/journal/year summary text
- [x] PASS: Library-tab added papers are converted to references with ids `ref-paper-<paper.id>`
- [x] PASS: Clicking a library paper that is already in references toggles selection instead of adding a duplicate reference object
- [x] PASS: Library-tab non-selected already-added papers show helper text `Already in references`
- [x] PASS: Resolving an identifier switches the active tab to `doi`
- [x] PASS: DOI-tab label text is `Paste DOI or PMID`
- [x] PASS: DOI-tab input placeholder is `10.1056/NEJMoa2301234 or 37654789`
- [x] PASS: DOI-tab `Resolve` button is disabled when the input is blank
- [x] PASS: DOI-tab `Resolve` button is also disabled while `doiLoading` is true
- [x] PASS: DOI-tab pressing `Enter` with a non-empty input triggers resolution
- [x] PASS: DOI-tab error panel includes a secondary action text `Try manual entry`
- [x] PASS: Clicking `Try manual entry` switches the active tab to `manual`
- [x] PASS: Successful DOI/PMID resolution shows a green preview card with title and condensed author/year/journal metadata
- [x] PASS: DOI preview action label is `Add to References`
- [x] PASS: Adding a resolved reference returns the dialog to the `search` tab
- [x] PASS: Manual-entry `Type` select defaults to `Article`
- [x] PASS: Manual-entry type options are `Article`, `Book`, `Book Chapter`, `Website`, `Guideline`, `Conference`, `Thesis`, and `Preprint`
- [x] PASS: Manual-entry title label includes a required asterisk in `Title *`
- [x] PASS: Manual-entry title placeholder is `Article title`

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Source verification covered the search-tab keyboard handlers, duplicate-merging logic, selected-row styling, library lazy-load/search behavior, DOI/manual state transitions, and manual-entry labels/options/placeholders in `src/components/citations/citation-dialog.tsx`.
  - Live browser verification on `/studio` covered the search-tab default state, identifier-detection banner/button label, search-input focus, search-to-DOI tab transition, DOI-tab label/placeholder/resolve action, and return to the search tab after adding a resolved reference.
  - For the DOI error/manual branch and some keyboard transitions, source was used as the deciding evidence when the browser automation wrapper was unreliable with controlled modal inputs.
-->
