# library — Spec 005

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: `Favorites` row always uses a filled amber star icon, not a toggled icon state
- [x] PASS: Custom collection rows render only for truthy `paper.collection` values present in the current `papers` array
- [x] PASS: Papers with `collection = null` or empty string do not create a custom collection row
- [x] PASS: Custom collection counts are recalculated from the currently fetched paper list after search or filter changes
- [x] PASS: Clicking `All Papers` resets only the collection selection and does not clear search text, sort order, or active server-side filters
- [x] PASS: Clicking `Favorites` applies a client-side `isFavorite` filter on top of the current fetched papers
- [x] PASS: Clicking a custom collection applies a client-side exact-string match against `paper.collection`
- [x] PASS: `New Collection` button is visible but has no click handler, modal, or navigation in the current implementation
- [x] PASS: Hidden upload input uses `type="file"` with `accept=".pdf"`
- [x] PASS: Clicking `Upload PDF` forwards the click to the hidden file input via `fileInputRef.current?.click()`
- [x] PASS: Search control placeholder reads `Search papers...`
- [x] PASS: Typing updates local search state immediately, but paper refetch is delayed by a 300 ms debounce
- [x] PASS: Empty search input is sent to `getFilteredUserPapers(...)` as `search: undefined`
- [x] PASS: Server-side search matches paper `title` with `ILIKE`
- [x] PASS: Server-side search matches paper `journal` with `ILIKE`
- [x] PASS: Server-side search matches serialized `authors` JSON with `::text ILIKE`
- [x] PASS: Sort dropdown contains exactly four options: `Recently Added`, `Title A-Z`, `Citation Count`, and `Year`
- [x] PASS: Default selected sort option is `Recently Added`
- [x] PASS: Choosing `Title A-Z` sends `sortBy = "title"` with `sortDir = "asc"`
- [x] PASS: Choosing any non-title sort sends `sortDir = "desc"`
- [x] PASS: Project filter select is rendered only when `getLibraryProjects()` returns at least one project
- [x] PASS: Project filter default option label is `All Projects`
- [x] PASS: Selecting a project casts the selected option value to a number before storing it in state
- [x] PASS: Clearing the project filter resets `filterProjectId` back to `undefined`
- [x] PASS: Study Type filter select is rendered only when `getLibraryStudyTypes()` returns at least one non-empty value
- [x] PASS: Study Type filter default option label is `All Study Types`
- [x] PASS: Clearing the Study Type filter resets `filterStudyType` back to `undefined`
- [x] PASS: Year range inputs render only when both `yearRange.min` and `yearRange.max` are non-null
- [x] PASS: From-year input placeholder reads `From {minYear}`
- [x] PASS: To-year input placeholder reads `To {maxYear}`
- [x] PASS: Year inputs expose `min` and `max` attributes using the fetched year range bounds
- [x] PASS: Clearing either year input resets that filter back to `undefined`
- [x] PASS: `Clear Filters` button appears only when project, study-type, or year filters are active
- [x] PASS: Search text alone does not make `Clear Filters` appear
- [x] PASS: Clicking `Clear Filters` resets project, study-type, and both year inputs but preserves the current search text
