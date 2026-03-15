# library — Spec 006

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Selecting a server-side filter does not clear the current collection or favorites selection
- [x] PASS: Results area loading state currently shows text `Loading papers...` without a spinner icon
- [x] PASS: If the paper query resolves to an empty result while search or filters are active, the empty-state message reads `No papers match your search or filters.`
- [x] PASS: If the user has no library papers and no active search/filter state, the empty-state message reads `Your library is empty. Add papers from Discover.`
- [x] PASS: Empty states render a `BookOpen` icon above the message text
- [x] PASS: Each paper card key is `paper.refId`, not `paper.id`
- [x] PASS: Paper cards render a PDF icon only when `paper.source === "user_upload"`; all other sources show the globe icon
- [x] PASS: Paper title renders as plain text, not as a link to a detail page
- [x] PASS: Authors line joins the authors array with `, ` separators
- [x] PASS: If `authors` is not an array, the authors row renders as an empty string instead of showing raw JSON
- [x] PASS: Missing `journal` renders fallback text `Unknown journal`
- [x] PASS: Missing `year` renders fallback text `n.d.`
- [x] PASS: Citation-count suffix is shown only when `citation_count > 0`
- [x] PASS: Study-type suffix is shown only when `paper.study_type` is truthy
- [x] PASS: Action button row is visually indented under the metadata block with `ml-14`
- [x] PASS: `Cite` button is rendered for every paper row
- [x] PASS: `Cite in Editor` button is rendered for every paper row
- [x] PASS: `View PDF` button renders only when the paper is a user upload or has `pdf_storage_path` or `pdf_url`
- [x] PASS: `DOI` button renders only when `paper.doi` is truthy
- [x] PASS: `DOI` button targets `https://doi.org/{doi}` in a new tab with `rel="noopener noreferrer"`
- [x] PASS: Favorite button uses a filled star only when `paper.isFavorite` is truthy
- [x] PASS: Delete button is always present and does not open a confirmation dialog before removal
- [x] PASS: Clicking the favorite button updates the star state optimistically before `toggleFavorite(...)` resolves
- [x] PASS: If `toggleFavorite(...)` throws, the same row is flipped back to its prior favorite state
- [x] PASS: Favorite failures are logged to the console and do not show a toast, inline error, or retry UI
- [x] PASS: Favorites count in the sidebar updates immediately because it is derived from the optimistic `papers` state
- [x] PASS: Clicking delete removes the row optimistically before `removePaper(...)` resolves
- [x] PASS: If delete fails, the page restores the previous full `papers` array
- [x] PASS: Successful delete triggers `refreshMetadata()` so projects/study-types/year-range can shrink after removal
- [x] PASS: Delete failures are logged to the console and do not show a toast, inline error, or retry UI
- [x] PASS: Clicking `Cite` opens the modal and immediately resets the active citation tab to `apa`
- [x] PASS: Opening the citation modal clears any previous `citationFormats` value before the new request resolves
- [x] PASS: Citation modal title reads `Cite Source`
- [x] PASS: Citation tabs render exactly `APA 7`, `MLA 9`, `Chicago`, `Vancouver`, `Harvard`, and `BibTeX`
- [x] PASS: Citation content panel keeps a minimum height of `80px` across loading and loaded states
