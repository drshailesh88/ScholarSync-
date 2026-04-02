# library — Spec 001: Navigation & Layout

STATUS: PENDING
TESTED: 0/16
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/library
MODULE: library

---
### Route Structure
- [ ] **Home page loads** — navigate to /library, verify page renders without error `[CONFIRMED]`
- [ ] **Inbox view loads** — navigate to /library/inbox, verify source list renders `[CONFIRMED]`
- [ ] **Core view loads** — navigate to /library/core, verify source list renders `[CONFIRMED]`
- [ ] **Background view loads** — navigate to /library/background, verify source list renders `[CONFIRMED]`
- [ ] **Archived view loads** — navigate to /library/archived, verify source list renders `[CONFIRMED]`
- [ ] **Trash view loads** — navigate to /library/trash, verify trash list renders `[CONFIRMED]`
- [ ] **Project scoped view loads** — navigate to /library/project/[id], verify project-scoped content `[CONFIRMED]`
- [ ] **Feature flag defaults to new Library** — with no env var, /library shows new Library UI `[CONFIRMED]`

### Sidebar Navigation
- [ ] **Sidebar visible on desktop** — at 1024px+ width, sidebar is visible with 224px width `[CONFIRMED]`
- [ ] **Sidebar hidden on mobile** — at <768px width, sidebar is hidden by default `[CONFIRMED]`
- [ ] **Mobile hamburger opens sidebar** — click hamburger icon, sidebar slides in as overlay `[CONFIRMED]`
- [ ] **Mobile backdrop closes sidebar** — click dark backdrop behind sidebar, sidebar closes `[CONFIRMED]`
- [ ] **Sidebar counts show** — each workflow state link shows item count badge `[CONFIRMED]`
- [ ] **Active state highlighted** — current route's sidebar link has accent border and tinted background `[CONFIRMED]`
- [ ] **Sidebar links navigate** — click "Inbox" in sidebar, URL changes to /library/inbox `[CONFIRMED]`
- [ ] **Home link works** — click "Home" in sidebar, navigates to /library `[CONFIRMED]`
