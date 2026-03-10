# ScholarSync — Library Feature Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the Library / Papers page (`/library`).
> **Generated**: March 2026
> **Source**: `src/app/(app)/library/`, `src/components/ui/pdf-viewer.tsx`, `src/components/citations/`, `src/lib/actions/papers.ts`, and related API routes.

---

## Table of Contents

1. [Page Overview & Layout](#1-page-overview--layout)
2. [Collections Sidebar](#2-collections-sidebar)
3. [Search & Sort](#3-search--sort)
4. [Filters](#4-filters)
5. [Paper Cards](#5-paper-cards)
6. [Favorites](#6-favorites)
7. [Citation Modal](#7-citation-modal)
8. [PDF Viewer](#8-pdf-viewer)
9. [PDF Upload](#9-pdf-upload)
10. [Cite in Editor Integration](#10-cite-in-editor-integration)
11. [Paper Deletion](#11-paper-deletion)
12. [Citation Dialog (Shared Component)](#12-citation-dialog-shared-component)
13. [Reference Store](#13-reference-store)
14. [Data Fetching & Server Actions](#14-data-fetching--server-actions)
15. [Loading & Error States](#15-loading--error-states)
16. [Quick Test Workflows](#16-quick-test-workflows)

---

## 1. Page Overview & Layout

| Page | Route | Purpose |
|------|-------|---------|
| **Library** | `/library` | Paper management — save, organize, cite, and view academic papers with PDF support |

### Layout

```
┌──────────────┬────────────────────────────────────────────┐
│              │  Search Input + Sort Dropdown              │
│  Collections │  Filter Row (Project, Study Type, Year)    │
│  Sidebar     ├────────────────────────────────────────────┤
│  (w-64)      │                                            │
│              │  Paper Cards List                          │
│  - All Papers│  (scrollable, infinite)                    │
│  - Favorites │                                            │
│  - Custom    │                                            │
│              │                                            │
│  [Upload PDF]│                                            │
│  [New Coll.] │                                            │
└──────────────┴────────────────────────────────────────────┘
```

- [ ] Two-column layout: Collections sidebar (w-64) + main content (flex-1)
- [ ] Height: `h-[calc(100vh-7rem)]`
- [ ] Client-side page with server actions for data
- [ ] Glass-panel styling throughout

---

## 2. Collections Sidebar

### Header
- [ ] "COLLECTIONS" label (uppercase, tracking-widest, muted text)

### Navigation Items
- [ ] **All Papers** button — shows total paper count
  - [ ] Active state highlighted when selected
- [ ] **Favorites** button — Star icon (amber-500 when filled), shows favorite count
  - [ ] Active state highlighted when selected
- [ ] Divider line between standard and custom collections

### Custom Collections
- [ ] Dynamically derived from distinct `collection` values in papers
- [ ] Each shows: Folder icon + collection name + paper count
- [ ] Clicking filters papers to that collection
- [ ] Active collection highlighted

### Action Buttons (Bottom)
- [ ] **Upload PDF** button — triggers file picker
- [ ] **New Collection** button — placeholder for future feature

---

## 3. Search & Sort

### Search Input
- [ ] Placeholder: "Search papers..."
- [ ] Debounced at 300ms
- [ ] Searches across: title, journal, authors (case-insensitive)
- [ ] Results update as user types (after debounce)
- [ ] Clearing input restores full list

### Sort Dropdown
| Option | Sort Field | Direction | Test |
|--------|-----------|-----------|------|
| Recently Added | date_added | DESC | [ ] Default selected, newest first |
| Title A-Z | title | ASC | [ ] Alphabetical order |
| Citation Count | citation_count | DESC | [ ] Highest first |
| Year | year | DESC | [ ] Newest first |

- [ ] Selecting a sort option re-fetches and reorders papers
- [ ] Current sort option visually indicated

---

## 4. Filters

### Project Filter
- [ ] Dropdown populated from `getLibraryProjects()`
- [ ] Default: "All Projects"
- [ ] Shows project titles from user's projects
- [ ] Selecting a project filters to papers associated with that project

### Study Type Filter
- [ ] Dropdown populated from `getLibraryStudyTypes()`
- [ ] Default: "All Study Types"
- [ ] Shows distinct study types from user's papers
- [ ] Selecting a type filters papers by exact match

### Year Range Filters
- [ ] "From" number input — placeholder shows `From {yearRange.min}`
- [ ] "To" number input — placeholder shows `To {yearRange.max}`
- [ ] Separator text: "to" between inputs
- [ ] Entering values filters papers within range (inclusive)

### Clear Filters Button
- [ ] Red background/hover when filters are active
- [ ] Clicking resets all filters to defaults
- [ ] Hidden or neutral when no filters active

### Filter Behavior
- [ ] All filters are AND'd together (combined filtering)
- [ ] Filters trigger server-side re-fetch
- [ ] Filter state persists during session

---

## 5. Paper Cards

### Card Layout
- [ ] Glass-panel background with `rounded-xl` border
- [ ] Left icon: PDF icon (if `source === "user_upload"`) or Globe icon

### Card Content
- [ ] **Title** — bold, truncated to 1 line
- [ ] **Authors** — comma-separated, truncated
- [ ] **Metadata row** — "Journal · Year · Citation Count · Study Type"
- [ ] Missing metadata fields show fallback text (e.g., "Unknown journal" for missing journal — no raw "null" shown)

### Action Buttons
| Button | Color/Style | Condition | Test |
|--------|-------------|-----------|------|
| Cite | Teal/brand | Always | [ ] Opens citation modal |
| Cite in Editor | Neutral | Always | [ ] Navigates to `/editor/new` with citation |
| View PDF | Neutral | Only if paper has PDF | [ ] Opens PDF viewer overlay |
| DOI | External link | Only if paper has DOI | [ ] Opens `https://doi.org/{doi}` |
| Favorite ★ | Amber-500 when active | Always | [ ] Toggles favorite status |
| Delete 🗑 | Red hover | Always | [ ] Soft-deletes paper |

### Empty States
- [ ] Loading: "Loading papers..." with spinner
- [ ] No results (with filters/search): "No papers match your search or filters."
- [ ] Empty library: BookOpen icon + "Your library is empty. Add papers from Discover."

---

## 6. Favorites

- [ ] Star icon on each paper card toggles favorite
- [ ] Filled star (amber-500) = favorited
- [ ] Empty star = not favorited
- [ ] Toggle calls `toggleFavorite(refId)` server action
- [ ] Optimistic UI update (immediate visual toggle)
- [ ] Reverts on error
- [ ] Favorites collection in sidebar shows correct count
- [ ] Clicking "Favorites" in sidebar filters to favorited papers only

---

## 7. Citation Modal

- [ ] Opens when "Cite" button clicked on a paper card
- [ ] Modal title: "Cite Source"
- [ ] Modal with backdrop blur

### Citation Style Tabs
| Style | Format Type | Test |
|-------|-------------|------|
| APA 7 | Author-date | [ ] Correct formatting |
| MLA 9 | Author-page | [ ] Correct formatting |
| Chicago | Author-date | [ ] Correct formatting |
| Vancouver | Numeric | [ ] Correct formatting |
| Harvard | Author-date | [ ] Correct formatting |
| BibTeX | Machine-readable | [ ] Correct formatting |

- [ ] Selecting a tab shows formatted citation for that style
- [ ] Loading state: "Formatting citations..." with pulse animation
- [ ] Citation text displayed in monospace area (min-h-80px)

### Copy Buttons
- [ ] **Copy Citation** (primary/brand) — copies full bibliography entry
- [ ] **Copy In-Text** (secondary/bordered) — copies parenthetical citation
  - [ ] Hidden for BibTeX style (only full copy available)
- [ ] Copy feedback: text changes to "Copied!" for 2 seconds
- [ ] Clipboard write succeeds

---

## 8. PDF Viewer

- [ ] Opens when "View PDF" clicked on a paper card
- [ ] Full-screen modal with black backdrop and blur
- [ ] Dynamically loaded component (react-pdf)

### Toolbar
- [ ] **Previous page** button (disabled if page ≤ 1)
- [ ] **Page counter**: "X / Y" (shows "..." while loading page count)
- [ ] **Next page** button (disabled if page ≥ numPages)
- [ ] **Zoom out** button (min 0.5×, step 0.25)
- [ ] **Zoom percentage** display (e.g., "100%")
- [ ] **Zoom in** button (max 3.0×, step 0.25)
- [ ] **Fit width** button (resets to 1.0×)
- [ ] **Document title** (center, hidden on mobile)
- [ ] **Close** button (or press Escape)

### PDF Rendering
- [ ] Spinner while PDF loads
- [ ] Spinner while individual page renders
- [ ] Centered page with shadow
- [ ] Responsive layout

### Error Handling
- [ ] Red icon + error message on PDF load failure
- [ ] 404 message: "The original PDF is not available for this paper. It may have been imported from search without a PDF upload."

### Keyboard
- [ ] Escape closes viewer
- [ ] Arrow keys for page navigation (if supported)

---

## 9. PDF Upload

- [ ] "Upload PDF" button in sidebar
- [ ] Hidden `<input type="file" accept=".pdf">` triggered on click
- [ ] Button text changes to "Uploading..." during upload
- [ ] Button disabled during upload

### Upload Process (3 Steps)
1. [ ] **Extract metadata** — `POST /api/extract-pdf` with PDF file
   - [ ] Extracts title, authors, DOI from PDF content
2. [ ] **Save paper** — Creates paper record with extracted metadata
3. [ ] **Upload to GCS** — `POST /api/papers/{paperId}/pdf` with file
   - [ ] Triggers background text extraction and embedding
   - [ ] Sets `full_text_available = true`

### After Upload
- [ ] Paper appears in library list
- [ ] PDF icon shown (source = "user_upload")
- [ ] "View PDF" button available on the paper card
- [ ] Toast/notification on success
- [ ] Error handling if any step fails

---

## 10. Cite in Editor Integration

- [ ] "Cite in Editor" button on each paper card
- [ ] Stores pending citation in `sessionStorage`
- [ ] Navigates to `/editor/new`
- [ ] Editor retrieves citation from sessionStorage on load
- [ ] Citation inserted into document automatically

---

## 11. Paper Deletion

- [ ] Trash icon button on each paper card
- [ ] Red hover state on the button
- [ ] Calls `removePaper(refId)` — soft delete (`deletedAt = new Date()`)
- [ ] Optimistic removal from UI
- [ ] Reverts on error
- [ ] Revalidates `/library` path
- [ ] Triggers metadata refresh (counts, filters update)
- [ ] No confirmation dialog (soft delete is reversible server-side)

---

## 12. Citation Dialog (Shared Component)

> Also used in Studio. Full test coverage in STUDIO_FEATURES_TESTING.md.

### Tabs
- [ ] **Your References** — search existing references, DOI/PMID detection
- [ ] **Library** — search saved papers, add as references
- [ ] **Paste DOI/PMID** — resolve identifier to metadata
- [ ] **Manual Entry** — form with type, title, authors, journal, year, etc.

### Bottom Bar
- [ ] Selected count: "Selected (X)"
- [ ] Selected reference badges with remove buttons
- [ ] "Cancel" and "Insert Citation" buttons

---

## 13. Reference Store

### State
- [ ] `references` — Map of all references (id → Reference)
- [ ] `citationStyle` — Current style (vancouver, apa, ama, icmje, harvard, chicago-author-date, ieee)
- [ ] `referenceNumberMap` — Map of reference IDs to citation numbers
- [ ] `bibliographyEntries` — Formatted bibliography array
- [ ] `citationDisplayMap` — Node key to display text mapping
- [ ] `sidebarOpen` — Boolean for Reference Sidebar visibility
- [ ] `citationDialogOpen` — Boolean for Citation Dialog visibility

### Actions
- [ ] `addReference(ref)` — adds single reference
- [ ] `addReferences(refs)` — bulk add
- [ ] `updateReference(id, updates)` — partial update
- [ ] `removeReference(id)` — remove by ID
- [ ] `setCitationStyle(styleId)` — change citation format
- [ ] `clearReferences()` — remove all
- [ ] `toggleSidebar()` / `openCitationDialog()` / `closeCitationDialog()`

---

## 14. Data Fetching & Server Actions

### `getFilteredUserPapers(filters)`
- [ ] Joins `userReferences` → `papers`
- [ ] Filters by: userId, deletedAt IS NULL
- [ ] Search: ILIKE on title, journal, authors (JSONB cast)
- [ ] Project filter: inArray on paperIds from `projectPapers`
- [ ] Year range: gte/lte operators
- [ ] Study type: exact match
- [ ] Returns: paper data + refId, isFavorite, collection, notes, tags, addedAt

### `getLibraryProjects()`
- [ ] Returns `{ id, title }[]` for user's non-deleted projects
- [ ] Ordered by `updated_at DESC`

### `getLibraryStudyTypes()`
- [ ] Returns `string[]` of distinct non-null study types

### `getLibraryYearRange()`
- [ ] Returns `{ min, max }` year values from user's papers

### `toggleFavorite(refId)`
- [ ] Flips `isFavorite` boolean
- [ ] Revalidates `/library`

### `removePaper(refId)`
- [ ] Sets `deletedAt = new Date()` (soft delete)
- [ ] Revalidates `/library`

### `savePaper(data)`
- [ ] Deduplication: checks DOI → PMID → S2 ID → normalized title+year
- [ ] If found: enriches existing paper with new metadata
- [ ] If not found: creates new paper record
- [ ] Creates `userReference` link
- [ ] Auto-triggers: chunking, embedding, PDF processing (background)

### `POST /api/references/resolve`
- [ ] Resolves DOI, PMID, PMCID, or URL to full reference metadata
- [ ] DOI → CrossRef API
- [ ] PMID → PubMed E-utilities
- [ ] PMCID → converts to PMID → PubMed
- [ ] URL → attempts DOI extraction
- [ ] Returns: `{ success, reference, source, confidence }`

---

## 15. Loading & Error States

| State | Display | Test |
|-------|---------|------|
| Page loading | 5 skeleton cards + sidebar skeletons | [ ] Renders correctly |
| Papers loading | "Loading papers..." + spinner | [ ] Shows while fetching |
| Empty library | BookOpen icon + "Your library is empty. Add papers from Discover." | [ ] Shows when no papers |
| No results | "No papers match your search or filters." | [ ] Shows with active filters |
| PDF loading | Spinner "Loading PDF..." | [ ] Shows while PDF loads |
| Citation loading | "Formatting citations..." + pulse | [ ] Shows while generating |
| DOI resolving | Spinner in Resolve button | [ ] Shows during resolution |
| PDF error | "Failed to load PDF" header + detailed message below | [ ] Shows on PDF load failure |
| DOI error | Red box with error + "Try manual entry" | [ ] Shows on resolution failure |
| Page error | ErrorDisplay: "Library unavailable" + "Retry" | [ ] Shows on page error |

---

## 16. Quick Test Workflows

### A. Add Paper from Research & View in Library
1. [ ] Navigate to `/research`
2. [ ] Search for a paper
3. [ ] Click "Add to Library" on a result
4. [ ] Navigate to `/library`
5. [ ] Verify paper appears in "All Papers"
6. [ ] Verify title, authors, journal, year display correctly

### B. Search & Filter Papers
1. [ ] Navigate to `/library` with papers in library
2. [ ] Type in search: "diabetes" — verify filtered results
3. [ ] Clear search — verify full list restored
4. [ ] Select a project from Project Filter — verify scoped results
5. [ ] Select a study type — verify further filtering
6. [ ] Enter year range (2020–2024) — verify year filtering
7. [ ] Click "Clear Filters" — verify all filters reset

### C. Sort Papers
1. [ ] Default sort: "Recently Added" — verify newest first
2. [ ] Switch to "Title A-Z" — verify alphabetical order
3. [ ] Switch to "Citation Count" — verify highest count first
4. [ ] Switch to "Year" — verify newest year first

### D. Cite a Paper
1. [ ] Click "Cite" on a paper card
2. [ ] Verify citation modal opens with APA 7 default
3. [ ] Check formatted citation text
4. [ ] Switch to Vancouver tab — verify numeric format
5. [ ] Switch to BibTeX tab — verify machine-readable format
6. [ ] Click "Copy Citation" — verify clipboard content
7. [ ] Click "Copy In-Text" — verify in-text citation copied
8. [ ] Verify "Copied!" feedback appears for 2 seconds

### E. View PDF
1. [ ] Upload a PDF or find a paper with PDF
2. [ ] Click "View PDF" — verify viewer opens full-screen
3. [ ] Navigate pages: Next, Previous
4. [ ] Zoom in, zoom out, fit width
5. [ ] Verify page counter "X / Y"
6. [ ] Press Escape — verify viewer closes
7. [ ] Try viewing a paper without PDF — verify error message

### F. Upload PDF
1. [ ] Click "Upload PDF" in sidebar
2. [ ] Select a PDF file
3. [ ] Verify "Uploading..." state on button
4. [ ] Wait for upload to complete
5. [ ] Verify paper appears in library with PDF icon
6. [ ] Click "View PDF" on uploaded paper — verify it displays

### G. Favorites Management
1. [ ] Click star on a paper — verify it fills (amber)
2. [ ] Click "Favorites" in sidebar — verify paper appears
3. [ ] Verify favorite count in sidebar updates
4. [ ] Click star again — verify unfavorited
5. [ ] Verify paper removed from Favorites view
6. [ ] Go back to "All Papers" — verify paper still present

### H. Delete Paper
1. [ ] Click trash icon on a paper
2. [ ] Verify paper immediately removed from list (optimistic)
3. [ ] Verify counts update in sidebar
4. [ ] Verify deletion is soft (paper still in database)

### I. Collections
1. [ ] Verify "All Papers" collection shows all papers
2. [ ] If papers have different collections, verify custom collections in sidebar
3. [ ] Click a custom collection — verify filtered view
4. [ ] Verify collection paper counts are accurate

### J. Cite in Editor
1. [ ] Click "Cite in Editor" on a paper
2. [ ] Verify navigation to `/editor/new`
3. [ ] Verify citation data stored in sessionStorage
4. [ ] Verify editor loads with citation inserted

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI implementation and source code but were
> missing from the original document generated by Claude Code.

### Detailed QA Coverage
- [ ] Initial page state sets `loading = true`, `search = ""`, `sortBy = "date_added"`, `activeCollection = null`, and both overlays closed
- [ ] Initial load requests papers plus filter metadata, with projects/study-types/year-range fetched together via `Promise.all(...)`
- [ ] Main layout is one fixed-width sidebar plus one scrollable results column inside `h-[calc(100vh-7rem)]`
- [ ] Sidebar heading text renders as `Collections`
- [ ] `All Papers` is the default active collection on first render
- [ ] `All Papers` count renders the current `papers.length` returned by the server-side query
- [ ] `Favorites` row is always visible even when the favorite count is `0`
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
- [ ] Citation loading state text reads `Formatting citations...`
- [ ] Citation formatting request is one batched `getAllCitationFormats(...)` call, not one request per tab click
- [ ] If citation formatting fails, the modal body shows `Failed to load citation formats`
- [ ] Primary copy button is disabled while citation formats are still unavailable
- [ ] Primary copy button label is `Copy Citation` for non-BibTeX tabs
- [ ] Primary copy button label changes to `Copy BibTeX` on the `BibTeX` tab
- [ ] Secondary `Copy In-Text` button is hidden entirely on the `BibTeX` tab
- [ ] Clicking the primary copy button writes the current full citation to the clipboard
- [ ] Clicking `Copy In-Text` writes the active style's `inText` citation to the clipboard
- [ ] After copying a full citation, the primary button label changes to `Copied!` for 2 seconds
- [ ] After copying an in-text citation, the secondary button label changes to `Copied!` for 2 seconds
- [ ] Closing and reopening the modal returns it to the `APA 7` tab instead of preserving the prior tab
- [ ] Clicking `Cite in Editor` stores `scholarsync_pending_citation` in `sessionStorage`
- [ ] Stored `scholarsync_pending_citation` payload contains only `paperId` and `title`
- [ ] Clicking `Cite in Editor` routes to `/editor/new`
- [ ] Library page does not itself verify citation insertion; editor-side consumption must be tested separately
- [ ] If the file chooser is cancelled and no file is selected, the upload handler returns early and the button stays in the `Upload PDF` state
- [ ] While upload is in progress, the sidebar button label changes from `Upload PDF` to `Uploading...`
- [ ] While upload is in progress, the upload button is disabled and uses reduced-opacity styling
- [ ] Upload step 1 posts the raw file to `/api/extract-pdf`
- [ ] If extracted metadata has no title, saved paper title falls back to the selected filename without the `.pdf` extension
- [ ] If extracted metadata has no author, saved paper uses an empty `authors` array
- [ ] Upload step 2 dynamically imports `savePaper` from `@/lib/actions/papers`
- [ ] Upload step 2 saves the new record with `source: "user_upload"`
- [ ] Upload step 3 posts the raw file to `/api/papers/{paperId}/pdf`
- [ ] If the storage-upload request returns a non-OK response, code logs `PDF upload to storage failed` but still refreshes the list and metadata
- [ ] Successful or failed uploads always clear the hidden file input value in `finally`, allowing the same filename to be selected again
- [ ] Upload flow does not show a progress bar, toast, inline success message, or inline error message in the current UI
- [ ] Upload failures are logged to the console as `PDF upload failed:`
- [ ] Clicking `View PDF` sets `viewingPaperId` and mounts `PDFViewer` with URL `/api/papers/{id}/pdf`
- [ ] Library usage of `PDFViewer` does not pass a `title` prop, so the toolbar title slot is absent even when the paper has a title
- [ ] PDF overlay renders with `role="dialog"` and `aria-modal="true"`
- [ ] Previous-page button is disabled on the first page
- [ ] Page counter shows `...` until the document finishes loading and page count is known
- [ ] Zoom percentage starts at `100%`
- [ ] Zoom out is disabled at the lower bound of `50%`
- [ ] Zoom in is disabled at the upper bound of `300%`
- [ ] `Fit width` resets zoom to exactly `100%`
- [ ] `Escape` key closes the PDF viewer overlay
- [ ] Close icon button unmounts the PDF viewer overlay
- [ ] `PDFViewer` returns `null` if neither `url` nor `file` is provided
- [ ] Document-level loading UI shows a spinner plus the text `Loading PDF...`
- [ ] Page-level loading UI shows a spinner with no extra text
- [ ] Generic document error slot renders `Failed to load PDF document.`
- [ ] 404 / `Not Found` / `Missing` load errors are normalized to the unavailable-PDF explanation text
- [ ] Non-404 PDF load errors show top line `Failed to load PDF` with the raw error message below it
- [ ] Arrow-key page navigation is not implemented in the current `PDFViewer`
- [ ] Route-level `loading.tsx` renders a sidebar skeleton, a search skeleton, a sort skeleton, and five `SkeletonCard` placeholders
- [ ] Route-level error boundary title reads `Library unavailable`
- [ ] Route-level error boundary message reads `We couldn't load your paper library. Please try again.`
- [ ] A client-side fetch failure in `fetchPapers()` logs an error and drops back to non-loading UI; it does not trip the route-level error boundary by itself
- [ ] Library results are rendered as a simple scrolling column; infinite scroll is not implemented in the current page component
- [ ] Shared Citation Dialog and Reference Store UI described later in the original document are not rendered by `/library` in the current implementation

*Generated from source code in `src/app/(app)/library/`, `src/components/ui/pdf-viewer.tsx`, `src/lib/actions/papers.ts`, and related modules — March 2026*

---

## Re-Audit Discoveries (Claude Code Pass 2)

> Cross-referenced against `src/app/(app)/library/page.tsx`, `src/components/ui/pdf-viewer.tsx`,
> `src/components/ui/modal.tsx`, `src/components/ui/search-input.tsx`, `src/components/ui/skeleton.tsx`,
> `src/components/ui/error-display.tsx`, `src/lib/actions/papers.ts`, `src/lib/actions/citations.ts`,
> `src/lib/citations.ts`, `src/app/api/extract-pdf/route.ts`, `src/app/api/papers/save/route.ts`,
> `src/app/api/papers/[id]/pdf/route.ts`, and `src/app/api/references/resolve/route.ts`.

### Behavior Corrections (Pass 2)

- [ ] Paper title uses `font-medium` class, not `font-bold` — original section 5 says "bold" but code renders `<h3 className="font-medium ...">` (page.tsx:539)
- [ ] Paper title has NO truncation — original says "truncated to 1 line" but the `<h3>` has no `truncate` or `line-clamp` class; only the authors `<p>` has `truncate` (page.tsx:542)
- [ ] Error boundary retry button reads `Try Again` (with ArrowCounterClockwise icon), not `Retry` — original section 15 says "Retry" (error-display.tsx:43)
- [ ] Clear Filters uses translucent red styling `bg-red-500/10 hover:bg-red-500/20`, not solid red background — original says "Red background/hover" (page.tsx:503)
- [ ] Cite button icon is `BookOpen` (size 14), not a clipboard or citation-specific icon (page.tsx:561)
- [ ] Sidebar heading source text is `Collections` (first-letter capitalized), transformed to "COLLECTIONS" by the CSS `uppercase` class — not a literal "COLLECTIONS" string in markup (page.tsx:334)
- [ ] `toPaperData()` only passes `title`, `authors`, `journal`, `year`, `doi` to the citation formatter — `volume`, `issue`, and `pages` are never mapped even though `PaperData` supports them (page.tsx:79-87, citations.ts:18-27)
- [ ] `View PDF` button condition does NOT check `open_access_url`, only `source === "user_upload" || pdf_storage_path || pdf_url` — yet the GET API route falls back to `open_access_url` if no other PDF source exists (page.tsx:581 vs route.ts:74)

### Citation Modal — Modal Component Behaviors

- [ ] Escape key closes the citation modal — inherited from Modal component keydown listener (modal.tsx:17-21)
- [ ] Clicking the dark backdrop overlay closes the citation modal — backdrop div has `onClick={onClose}` (modal.tsx:39)
- [ ] Body scroll is locked when citation modal is open — `document.body.style.overflow = "hidden"` set in Modal useEffect, restored on unmount (modal.tsx:27-30)
- [ ] Modal header renders a close X button (Phosphor `X` icon, size 18) on the right side (modal.tsx:50-55)
- [ ] Modal max width is `max-w-lg` with `mx-4` horizontal margin (modal.tsx:43-45)
- [ ] Citation formatted text uses `whitespace-pre-wrap` class — preserves line breaks in multi-line output like BibTeX (page.tsx:642)

### Search Input Component Details

- [ ] Search input renders a `MagnifyingGlass` icon (size 18) absolutely positioned on the left (search-input.tsx:21-24)
- [ ] Search input has `pl-10` left padding to accommodate the icon (search-input.tsx:30)
- [ ] Search input shows focus ring: `focus:ring-2 focus:ring-brand/40` (search-input.tsx:30)
- [ ] Search input uses `rounded-xl bg-surface-raised border border-border` base styling (search-input.tsx:30)

### Error Display Component Details

- [ ] ErrorDisplay reports the error to Sentry via `Sentry.captureException(error)` on mount (error-display.tsx:24-26)
- [ ] ErrorDisplay renders a `WarningCircle` icon (red, size 32) in a `bg-red-500/10` circle (error-display.tsx:35-36)
- [ ] ErrorDisplay retry button shows `ArrowCounterClockwise` icon (size 16) next to "Try Again" text, styled as `bg-brand text-white` (error-display.tsx:41-45)

### Paper Card Action Button Icons

- [ ] Cite in Editor button uses `ClipboardText` icon (size 14) and has `title="Cite in Editor"` tooltip attribute (page.tsx:576-577)
- [ ] View PDF button uses `Eye` icon (size 14) from Phosphor icons (page.tsx:586)
- [ ] DOI link uses `GlobeSimple` icon (size 14), same icon as the non-upload paper card left indicator (page.tsx:596)
- [ ] Favorite button uses `Star` with `weight="fill"` when favorited, `weight="regular"` (outlined) when not (page.tsx:610)
- [ ] Delete button uses `Trash` icon (size 16) with `hover:text-red-500 hover:bg-red-500/10` (page.tsx:614)

### PDF Viewer Additional Details

- [ ] PDF viewer `aria-label` is `"PDF Viewer"` when no title prop is passed — Library does not pass `title` (pdf-viewer.tsx:122, page.tsx:685)
- [ ] PDF viewer accepts `initialPage` prop to set starting page, clamped to 1..numPages range (pdf-viewer.tsx:55-57)
- [ ] PDF viewer close button only renders when `onClose` prop is provided (pdf-viewer.tsx:183)
- [ ] PDF content area uses `overflow-auto` for scrolling when zoomed beyond viewport (pdf-viewer.tsx:195)
- [ ] PDF page element rendered with `shadow-xl rounded-lg` class (pdf-viewer.tsx:228)
- [ ] PDF viewer uses `pdfjs-dist/build/pdf.worker.min.mjs` as the PDF.js web worker (pdf-viewer.tsx:18-21)
- [ ] PDF viewer toolbar background is `bg-surface border-b border-border` (pdf-viewer.tsx:125)
- [ ] Previous/Next page buttons use `disabled:opacity-30 disabled:cursor-not-allowed` styling (pdf-viewer.tsx:130-131)
- [ ] Page counter uses `tabular-nums min-w-[5rem] text-center` for fixed-width numeric display (pdf-viewer.tsx:135)
- [ ] Zoom percentage uses `tabular-nums min-w-[3rem] text-center` for fixed-width display (pdf-viewer.tsx:163)

### Skeleton Loading Composition Details

- [ ] `loading.tsx` sidebar skeleton: one `h-4 w-20` heading placeholder + 5 `h-9 w-full rounded-lg` row placeholders (loading.tsx:7-12)
- [ ] `loading.tsx` search skeleton: `h-11 flex-1 rounded-xl` placeholder (loading.tsx:16)
- [ ] `loading.tsx` sort skeleton: `h-11 w-40 rounded-xl` placeholder (loading.tsx:17)
- [ ] `SkeletonCard` composition: `glass-panel rounded-2xl p-6` container with `h-12 w-12 rounded-xl` icon + `h-4 w-3/4` title + `h-3 w-1/2` subtitle + 2-line `SkeletonText` (skeleton.tsx:26-38)
- [ ] `SkeletonText` last line renders at `60%` width, all others at `100%` (skeleton.tsx:19)

### Layout & Styling Extras

- [ ] Filter row uses `flex-wrap` so filter controls wrap to next line on narrow viewports (page.tsx:427)
- [ ] Paper card hover effect uses `hover:bg-surface-raised/30 transition-all` (page.tsx:529)
- [ ] Sidebar bottom section has `border-t border-border-subtle` divider above Upload/New Collection buttons (page.tsx:387)
- [ ] Sidebar nav uses `space-y-0.5` for minimal gap between collection items (page.tsx:336)
- [ ] Upload button disabled styling uses `disabled:opacity-50` (page.tsx:392)
- [ ] Sort dropdown styling: `rounded-xl bg-surface-raised border border-border text-ink text-sm` (page.tsx:417)
- [ ] Paper card left icon container: `w-10 h-10 rounded-lg bg-surface-raised` (page.tsx:531)
- [ ] `All Papers` active state: `bg-surface-raised text-ink font-medium`; inactive: `text-ink-muted hover:text-ink hover:bg-surface-raised/50` (page.tsx:341-344)

### `/api/extract-pdf` Route Details

- [ ] Requires authentication; returns 401 `"Authentication required"` if unauthenticated (extract-pdf/route.ts:27-29)
- [ ] Applies rate limiting with `RATE_LIMITS.ai` bucket (extract-pdf/route.ts:34)
- [ ] Validates Content-Type header must include `multipart/form-data`; returns 400 `"Content-Type must be multipart/form-data"` (extract-pdf/route.ts:41-46)
- [ ] Validates file field exists and is a File instance; returns 400 `"No PDF file provided. Include a 'file' field in the form data."` (extract-pdf/route.ts:51-56)
- [ ] Validates file has PDF MIME type or `.pdf` extension; returns 400 `"Uploaded file must be a PDF"` (extract-pdf/route.ts:58-63)
- [ ] Enforces 20 MB max file size; returns 413 with message `"File size exceeds the 20MB limit. Uploaded file is {N}MB."` including actual file size (extract-pdf/route.ts:65-72)
- [ ] Response shape on success: `{ text: string, pages: number, info: { title?: string, author?: string } }` (extract-pdf/route.ts:85-92)
- [ ] Returns 500 `"Failed to extract text from PDF"` on parse errors (extract-pdf/route.ts:100-103)

### `/api/papers/save` Route Details

- [ ] Validates request body with Zod schema: `title` (string, min 1 required), `source` (enum `"semantic_scholar" | "pubmed"` only), `authors` (string[] optional, default []) (papers/save/route.ts:7-25)
- [ ] Returns 400 `{ error: "Invalid paper payload", details: <flattened Zod errors> }` on validation failure (papers/save/route.ts:52-56)
- [ ] Applies rate limiting with `RATE_LIMITS.write` bucket (papers/save/route.ts:43-48)
- [ ] Returns `{ paperId: number }` on success (papers/save/route.ts:79)
- [ ] Returns 500 `"Failed to save paper"` on server errors (papers/save/route.ts:82-86)

### `/api/papers/[id]/pdf` Route Details

- [ ] GET validates `id` param as numeric (`/^\d+$/`); returns 400 `"Invalid paper ID"` (papers/[id]/pdf/route.ts:22-23)
- [ ] GET requires authentication; returns 401 `"Authentication required"` (papers/[id]/pdf/route.ts:28-31)
- [ ] GET applies rate limiting with `RATE_LIMITS.export` bucket (papers/[id]/pdf/route.ts:35-36)
- [ ] GET fallback chain: signed GCS URL (redirect) → local buffer (streamed with `Content-Type: application/pdf`, `Content-Disposition: inline`, `Cache-Control: private, max-age=3600`) → `pdf_url` redirect → `open_access_url` redirect → 404 (papers/[id]/pdf/route.ts:42-79)
- [ ] GET returns 404 `"PDF not found for this paper"` when no PDF source found (papers/[id]/pdf/route.ts:77-80)
- [ ] GET returns 500 `"Failed to serve PDF"` on server errors (papers/[id]/pdf/route.ts:83-86)
- [ ] POST validates Content-Type must include `multipart/form-data`; returns 400 (papers/[id]/pdf/route.ts:121-127)
- [ ] POST validates `id` param as numeric; returns 400 `"Invalid paper ID"` (papers/[id]/pdf/route.ts:102-103)
- [ ] POST stores PDF in GCS, sets `pdf_storage_path` and `full_text_available = true` on paper record (papers/[id]/pdf/route.ts:143-152)
- [ ] POST triggers `queuePdfProcessing(paperId, buffer)` for background text extraction and embedding (papers/[id]/pdf/route.ts:155)
- [ ] POST returns `{ success: true, paperId: string, storagePath: string }` on success (papers/[id]/pdf/route.ts:157-161)
- [ ] POST returns 500 `"Failed to store PDF file"` on server errors (papers/[id]/pdf/route.ts:164-168)

### `/api/references/resolve` Route Details

- [ ] Uses 10-second `AbortSignal.timeout` on CrossRef and PubMed external API calls (references/resolve/route.ts:87,135)
- [ ] Returns 504 on CrossRef timeout: `"CrossRef request timed out. Try again."` (references/resolve/route.ts:118-120)
- [ ] Returns 504 on PubMed timeout: `"PubMed request timed out. Try again."` (references/resolve/route.ts:169-174)
- [ ] DOI 404 returns status 200 with `{ success: false, error: "Could not find a reference for this DOI. Check the DOI and try again, or add the reference manually." }` (references/resolve/route.ts:91-96)
- [ ] Non-404 DOI failure returns 502 `"CrossRef returned status {N}"` (references/resolve/route.ts:97-103)
- [ ] Bad PMID returns `"No PubMed record found for this ID."` — checks both HTTP error and XML `<ERROR>` tag (references/resolve/route.ts:139-152)
- [ ] Unparseable PubMed record returns `"Could not parse PubMed record."` (references/resolve/route.ts:156-159)
- [ ] Unresolvable PMCID returns `"Could not resolve PMCID. Try using the PMID or DOI instead."` (references/resolve/route.ts:198-201)
- [ ] PMCID converter failure returns `"Failed to convert PMCID. Try using the PMID or DOI instead."` (references/resolve/route.ts:203-206)
- [ ] URL without extractable DOI returns `"Could not extract a DOI from this URL. Try pasting the DOI directly."` (references/resolve/route.ts:49-56)
- [ ] Unknown identifier type returns `"Could not determine identifier type. Try a DOI (starting with 10.) or a PMID (numeric)."` (references/resolve/route.ts:59-66)
- [ ] Returns 500 `"Internal server error"` on unexpected exceptions (references/resolve/route.ts:70-74)

### Server Action Additional Details

- [ ] `savePaper` creates userReference with `collection: "All Papers"` as default collection value (papers.ts:464)
- [ ] `savePaper` creates userReference with `isFavorite: false` as default (papers.ts:465)
- [ ] `savePaper` uses `onConflictDoNothing()` on userReference insert, silently deduplicating user-paper links (papers.ts:467)
- [ ] `savePaper` auto-triggers background `autoChunkPaper` + `embedPaperChunks` for papers with abstract or tldr (papers.ts:472-487)
- [ ] `savePaper` auto-triggers background `queuePdfProcessing` for papers with DOI or `open_access_url` (papers.ts:494-502)
- [ ] `toggleFavorite` server action verifies both `refId` AND `userId` match before updating — prevents cross-user mutations (papers.ts:577-583)
- [ ] `removePaper` server action verifies both `refId` AND `userId` match before soft-deleting (papers.ts:596-602)
- [ ] `getAllCitationFormats` is a server action (not API route) — called via React Server Action protocol from client (citations.ts:1)
- [ ] `getAllCitationFormats` iterates all five non-BibTeX styles in a `for` loop, generating both `full` and `inText` for each; BibTeX is generated separately via `_generateBibTeX` (citations.ts:43-56)

### Components Referenced But Not Rendered

- [ ] Sections 12 (Citation Dialog) and 13 (Reference Store) describe shared components NOT imported or rendered by `/library/page.tsx` — they are Studio/Editor features only
- [ ] Section 14 describes `POST /api/references/resolve` which is called by the Citation Dialog component, not by the Library page itself
- [ ] Original section 5 claims infinite scroll — not implemented; Library renders a flat scrollable column via `overflow-y-auto` (page.tsx:405)
