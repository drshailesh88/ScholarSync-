# library — Spec 005

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
- [ ] `Favorites` row always uses a filled amber star icon, not a toggled icon state
- [ ] Custom collection rows render only for truthy `paper.collection` values present in the current `papers` array
- [ ] Papers with `collection = null` or empty string do not create a custom collection row
- [ ] Custom collection counts are recalculated from the currently fetched paper list after search or filter changes
- [ ] Clicking `All Papers` resets only the collection selection and does not clear search text, sort order, or active server-side filters
- [ ] Clicking `Favorites` applies a client-side `isFavorite` filter on top of the current fetched papers
- [ ] Clicking a custom collection applies a client-side exact-string match against `paper.collection`
- [ ] `New Collection` button is visible but has no click handler, modal, or navigation in the current implementation
- [ ] Hidden upload input uses `type="file"` with `accept=".pdf"`
- [ ] Clicking `Upload PDF` forwards the click to the hidden file input via `fileInputRef.current?.click()`
- [ ] Search control placeholder reads `Search papers...`
- [ ] Typing updates local search state immediately, but paper refetch is delayed by a 300 ms debounce
- [ ] Empty search input is sent to `getFilteredUserPapers(...)` as `search: undefined`
- [ ] Server-side search matches paper `title` with `ILIKE`
- [ ] Server-side search matches paper `journal` with `ILIKE`
- [ ] Server-side search matches serialized `authors` JSON with `::text ILIKE`
- [ ] Sort dropdown contains exactly four options: `Recently Added`, `Title A-Z`, `Citation Count`, and `Year`
- [ ] Default selected sort option is `Recently Added`
- [ ] Choosing `Title A-Z` sends `sortBy = "title"` with `sortDir = "asc"`
- [ ] Choosing any non-title sort sends `sortDir = "desc"`
- [ ] Project filter select is rendered only when `getLibraryProjects()` returns at least one project
- [ ] Project filter default option label is `All Projects`
- [ ] Selecting a project casts the selected option value to a number before storing it in state
- [ ] Clearing the project filter resets `filterProjectId` back to `undefined`
- [ ] Study Type filter select is rendered only when `getLibraryStudyTypes()` returns at least one non-empty value
- [ ] Study Type filter default option label is `All Study Types`
- [ ] Clearing the Study Type filter resets `filterStudyType` back to `undefined`
- [ ] Year range inputs render only when both `yearRange.min` and `yearRange.max` are non-null
- [ ] From-year input placeholder reads `From {minYear}`
- [ ] To-year input placeholder reads `To {maxYear}`
- [ ] Year inputs expose `min` and `max` attributes using the fetched year range bounds
- [ ] Clearing either year input resets that filter back to `undefined`
- [ ] `Clear Filters` button appears only when project, study-type, or year filters are active
- [ ] Search text alone does not make `Clear Filters` appear
- [ ] Clicking `Clear Filters` resets project, study-type, and both year inputs but preserves the current search text
