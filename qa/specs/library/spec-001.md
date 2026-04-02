# library — Spec 001: Navigation & Layout

STATUS: PARTIAL
TESTED: 16/16
PASS: 15
FAIL: 1
BLOCKED: 0
PAGE: http://localhost:3000/library
MODULE: library

---
### Route Structure
- [x] **Home page loads** — navigate to /library, verify page renders without error `[CONFIRMED]`
- [x] **Inbox view loads** — navigate to /library/inbox, verify source list renders `[CONFIRMED]`
- [x] **Core view loads** — navigate to /library/core, verify source list renders `[CONFIRMED]`
- [x] **Background view loads** — navigate to /library/background, verify source list renders `[CONFIRMED]`
- [x] **Archived view loads** — navigate to /library/archived, verify source list renders `[CONFIRMED]`
- [x] **Trash view loads** — navigate to /library/trash, verify trash list renders `[CONFIRMED]`
- [x] **Project scoped view loads** — navigate to /library/project/[id], verify project-scoped content `[CONFIRMED]`
- [x] **Feature flag defaults to new Library** — with no env var, /library shows new Library UI `[CONFIRMED]`

### Sidebar Navigation
- [x] **Sidebar visible on desktop** — at 1024px+ width, sidebar is visible with 224px width `[CONFIRMED]`
- [x] **Sidebar hidden on mobile** — at <768px width, sidebar is hidden by default `[CONFIRMED]`
- [x] **Mobile hamburger opens sidebar** — click hamburger icon, sidebar slides in as overlay `[CONFIRMED]`
- [x] **Mobile backdrop closes sidebar** — click dark backdrop behind sidebar, sidebar closes `[CONFIRMED]`
- [x] **Sidebar counts show** — each workflow state link shows item count badge `[CONFIRMED]`
- [x] **Active state highlighted** — current route's sidebar link has accent border and tinted background `[CONFIRMED]`
- [x] **Sidebar links navigate** — click "Inbox" in sidebar, URL changes to /library/inbox `[CONFIRMED]`
- [x] **Home link works** — click "Home" in sidebar, navigates to /library `[CONFIRMED]`
