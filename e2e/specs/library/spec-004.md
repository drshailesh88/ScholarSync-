# library — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Paper Deletion
- [ ] Trash icon button on each paper card
- [ ] Red hover state on the button
- [ ] Calls `removePaper(refId)` — soft delete (`deletedAt = new Date()`)
- [ ] Optimistic removal from UI
- [ ] Reverts on error
- [ ] Revalidates `/library` path
- [ ] Triggers metadata refresh (counts, filters update)
- [ ] No confirmation dialog (soft delete is reversible server-side)

### Data Fetching & Server Actions
#### `getFilteredUserPapers(filters)`
- [ ] Joins `userReferences` → `papers`
- [ ] Filters by: userId, deletedAt IS NULL
- [ ] Search: ILIKE on title, journal, authors (JSONB cast)
- [ ] Project filter: inArray on paperIds from `projectPapers`
- [ ] Year range: gte/lte operators
- [ ] Study type: exact match
- [ ] Returns: paper data + refId, isFavorite, collection, notes, tags, addedAt
#### `getLibraryProjects()`
- [ ] Returns `{ id, title }[]` for user's non-deleted projects
- [ ] Ordered by `updated_at DESC`
#### `getLibraryStudyTypes()`
- [ ] Returns `string[]` of distinct non-null study types
#### `getLibraryYearRange()`
- [ ] Returns `{ min, max }` year values from user's papers
#### `toggleFavorite(refId)`
- [ ] Flips `isFavorite` boolean
- [ ] Revalidates `/library`
#### `removePaper(refId)`
- [ ] Sets `deletedAt = new Date()` (soft delete)
- [ ] Revalidates `/library`
#### `savePaper(data)`
- [ ] Deduplication: checks DOI → PMID → S2 ID → normalized title+year
- [ ] If found: enriches existing paper with new metadata
- [ ] If not found: creates new paper record
- [ ] Creates `userReference` link
- [ ] Conditionally auto-triggers abstract chunking/embedding and DOI/open-access PDF processing in background

### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Initial page state sets `loading = true`, `search = ""`, `sortBy = "date_added"`, `activeCollection = null`, and both overlays closed
- [ ] Initial load requests papers plus filter metadata, with projects/study-types/year-range fetched together via `Promise.all(...)`
- [ ] Main layout is one fixed-width sidebar plus one scrollable results column inside `h-[calc(100vh-7rem)]`
- [ ] Sidebar heading text renders as `Collections`
- [ ] `All Papers` is the default active collection on first render
- [ ] `All Papers` count renders the current `papers.length` returned by the server-side query
- [ ] `Favorites` row is always visible even when the favorite count is `0`
