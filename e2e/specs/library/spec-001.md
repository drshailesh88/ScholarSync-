# library — Spec 001

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Page Overview & Layout
#### Layout
- [x] PASS: Two-column layout: Collections sidebar (w-64) + main content (flex-1)
- [x] PASS: Height: `h-[calc(100vh-7rem)]`
- [x] PASS: Client-side page with server actions for data
- [x] PASS: Glass-panel styling throughout

### Collections Sidebar
#### Header
- [x] PASS: Header text renders `Collections` with CSS `uppercase` styling (tracking-widest, muted text)
#### Navigation Items
- [x] PASS: **All Papers** button — shows total paper count
- [x] PASS: Active state highlighted when selected
- [x] PASS: **Favorites** button — Star icon (amber-500 when filled), shows favorite count
- [x] PASS: Active state highlighted when selected
- [x] PASS: Divider line between standard and custom collections
#### Custom Collections
- [x] PASS: Dynamically derived from distinct `collection` values in papers
- [x] PASS: Each shows: Folder icon + collection name + paper count
- [x] PASS: Clicking filters papers to that collection
- [x] PASS: Active collection highlighted
#### Action Buttons (Bottom)
- [x] PASS: **Upload PDF** button — triggers file picker
- [x] PASS: **New Collection** button — placeholder for future feature

### Search & Sort
#### Search Input
- [x] PASS: Placeholder: "Search papers..."
- [x] PASS: Debounced at 300ms
- [x] PASS: Searches across: title, journal, authors (case-insensitive)
- [x] PASS: Results update as user types (after debounce)
- [x] PASS: Clearing input restores full list
#### Sort Dropdown
- [x] PASS: Selecting a sort option re-fetches and reorders papers
- [x] PASS: Current sort option visually indicated

### Filters
#### Project Filter
- [x] PASS: Dropdown populated from `getLibraryProjects()`
- [x] PASS: Default: "All Projects"
- [x] PASS: Shows project titles from user's projects
- [x] PASS: Selecting a project filters to papers associated with that project
#### Study Type Filter
- [x] PASS: Dropdown populated from `getLibraryStudyTypes()`
- [x] PASS: Default: "All Study Types"
- [x] PASS: Shows distinct study types from user's papers
- [x] PASS: Selecting a type filters papers by exact match
#### Year Range Filters
- [x] PASS: "From" number input — placeholder shows `From {yearRange.min}`
- [x] PASS: "To" number input — placeholder shows `To {yearRange.max}`
- [x] PASS: Separator text: "to" between inputs
- [x] PASS: Entering values filters papers within range (inclusive)
