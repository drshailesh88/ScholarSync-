# library — Spec 004

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Paper Deletion
- [x] PASS: Trash icon button on each paper card
- [x] PASS: Red hover state on the button
- [x] PASS: Calls `removePaper(refId)` — soft delete (`deletedAt = new Date()`)
- [x] PASS: Optimistic removal from UI
- [x] PASS: Reverts on error
- [x] PASS: Revalidates `/library` path
- [x] PASS: Triggers metadata refresh (counts, filters update)
- [x] PASS: No confirmation dialog (soft delete is reversible server-side)

### Data Fetching & Server Actions
#### `getFilteredUserPapers(filters)`
- [x] PASS: Joins `userReferences` → `papers`
- [x] PASS: Filters by: userId, deletedAt IS NULL
- [x] PASS: Search: ILIKE on title, journal, authors (JSONB cast)
- [x] PASS: Project filter: inArray on paperIds from `projectPapers`
- [x] PASS: Year range: gte/lte operators
- [x] PASS: Study type: exact match
- [x] PASS: Returns: paper data + refId, isFavorite, collection, notes, tags, addedAt
#### `getLibraryProjects()`
- [x] PASS: Returns `{ id, title }[]` for user's non-deleted projects
- [x] PASS: Ordered by `updated_at DESC`
#### `getLibraryStudyTypes()`
- [x] PASS: Returns `string[]` of distinct non-null study types
#### `getLibraryYearRange()`
- [x] PASS: Returns `{ min, max }` year values from user's papers
#### `toggleFavorite(refId)`
- [x] PASS: Flips `isFavorite` boolean
- [x] PASS: Revalidates `/library`
#### `removePaper(refId)`
- [x] PASS: Sets `deletedAt = new Date()` (soft delete)
- [x] PASS: Revalidates `/library`
#### `savePaper(data)`
- [x] PASS: Deduplication: checks DOI → PMID → S2 ID → normalized title+year
- [x] PASS: If found: enriches existing paper with new metadata
- [x] PASS: If not found: creates new paper record
- [x] PASS: Creates `userReference` link
- [x] PASS: Conditionally auto-triggers abstract chunking/embedding and DOI/open-access PDF processing in background

### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Initial page state sets `loading = true`, `search = ""`, `sortBy = "date_added"`, `activeCollection = null`, and both overlays closed
- [x] PASS: Initial load requests papers plus filter metadata, with projects/study-types/year-range fetched together via `Promise.all(...)`
- [x] PASS: Main layout is one fixed-width sidebar plus one scrollable results column inside `h-[calc(100vh-7rem)]`
- [x] PASS: Sidebar heading text renders as `Collections`
- [x] PASS: `All Papers` is the default active collection on first render
- [x] PASS: `All Papers` count renders the current `papers.length` returned by the server-side query
- [x] PASS: `Favorites` row is always visible even when the favorite count is `0`
