# library — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Page Overview & Layout
#### Layout
- [ ] Two-column layout: Collections sidebar (w-64) + main content (flex-1)
- [ ] Height: `h-[calc(100vh-7rem)]`
- [ ] Client-side page with server actions for data
- [ ] Glass-panel styling throughout

### Collections Sidebar
#### Header
- [ ] Header text renders `Collections` with CSS `uppercase` styling (tracking-widest, muted text)
#### Navigation Items
- [ ] **All Papers** button — shows total paper count
- [ ] Active state highlighted when selected
- [ ] **Favorites** button — Star icon (amber-500 when filled), shows favorite count
- [ ] Active state highlighted when selected
- [ ] Divider line between standard and custom collections
#### Custom Collections
- [ ] Dynamically derived from distinct `collection` values in papers
- [ ] Each shows: Folder icon + collection name + paper count
- [ ] Clicking filters papers to that collection
- [ ] Active collection highlighted
#### Action Buttons (Bottom)
- [ ] **Upload PDF** button — triggers file picker
- [ ] **New Collection** button — placeholder for future feature

### Search & Sort
#### Search Input
- [ ] Placeholder: "Search papers..."
- [ ] Debounced at 300ms
- [ ] Searches across: title, journal, authors (case-insensitive)
- [ ] Results update as user types (after debounce)
- [ ] Clearing input restores full list
#### Sort Dropdown
- [ ] Selecting a sort option re-fetches and reorders papers
- [ ] Current sort option visually indicated

### Filters
#### Project Filter
- [ ] Dropdown populated from `getLibraryProjects()`
- [ ] Default: "All Projects"
- [ ] Shows project titles from user's projects
- [ ] Selecting a project filters to papers associated with that project
#### Study Type Filter
- [ ] Dropdown populated from `getLibraryStudyTypes()`
- [ ] Default: "All Study Types"
- [ ] Shows distinct study types from user's papers
- [ ] Selecting a type filters papers by exact match
#### Year Range Filters
- [ ] "From" number input — placeholder shows `From {yearRange.min}`
- [ ] "To" number input — placeholder shows `To {yearRange.max}`
- [ ] Separator text: "to" between inputs
- [ ] Entering values filters papers within range (inclusive)
