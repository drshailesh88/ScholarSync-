# library — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Selecting a server-side filter does not clear the current collection or favorites selection
- [ ] Results area loading state currently shows text `Loading papers...` without a spinner icon
- [ ] If the paper query resolves to an empty result while search or filters are active, the empty-state message reads `No papers match your search or filters.`
- [ ] If the user has no library papers and no active search/filter state, the empty-state message reads `Your library is empty. Add papers from Discover.`
- [ ] Empty states render a `BookOpen` icon above the message text
- [ ] Each paper card key is `paper.refId`, not `paper.id`
- [ ] Paper cards render a PDF icon only when `paper.source === "user_upload"`; all other sources show the globe icon
- [ ] Paper title renders as plain text, not as a link to a detail page
- [ ] Authors line joins the authors array with `, ` separators
- [ ] If `authors` is not an array, the authors row renders as an empty string instead of showing raw JSON
- [ ] Missing `journal` renders fallback text `Unknown journal`
- [ ] Missing `year` renders fallback text `n.d.`
- [ ] Citation-count suffix is shown only when `citation_count > 0`
- [ ] Study-type suffix is shown only when `paper.study_type` is truthy
- [ ] Action button row is visually indented under the metadata block with `ml-14`
- [ ] `Cite` button is rendered for every paper row
- [ ] `Cite in Editor` button is rendered for every paper row
- [ ] `View PDF` button renders only when the paper is a user upload or has `pdf_storage_path` or `pdf_url`
- [ ] `DOI` button renders only when `paper.doi` is truthy
- [ ] `DOI` button targets `https://doi.org/{doi}` in a new tab with `rel="noopener noreferrer"`
- [ ] Favorite button uses a filled star only when `paper.isFavorite` is truthy
- [ ] Delete button is always present and does not open a confirmation dialog before removal
- [ ] Clicking the favorite button updates the star state optimistically before `toggleFavorite(...)` resolves
- [ ] If `toggleFavorite(...)` throws, the same row is flipped back to its prior favorite state
- [ ] Favorite failures are logged to the console and do not show a toast, inline error, or retry UI
- [ ] Favorites count in the sidebar updates immediately because it is derived from the optimistic `papers` state
- [ ] Clicking delete removes the row optimistically before `removePaper(...)` resolves
- [ ] If delete fails, the page restores the previous full `papers` array
- [ ] Successful delete triggers `refreshMetadata()` so projects/study-types/year-range can shrink after removal
- [ ] Delete failures are logged to the console and do not show a toast, inline error, or retry UI
- [ ] Clicking `Cite` opens the modal and immediately resets the active citation tab to `apa`
- [ ] Opening the citation modal clears any previous `citationFormats` value before the new request resolves
- [ ] Citation modal title reads `Cite Source`
- [ ] Citation tabs render exactly `APA 7`, `MLA 9`, `Chicago`, `Vancouver`, `Harvard`, and `BibTeX`
- [ ] Citation content panel keeps a minimum height of `80px` across loading and loaded states
