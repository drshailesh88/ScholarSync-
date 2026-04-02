# library — Spec 002: Home Screen & Source Cards

STATUS: PENDING
TESTED: 0/15
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/library
MODULE: library

---
### Home Screen Sections
- [ ] **Continue Reading section** — items with reading_progress > 0 appear in Continue Reading `[CONFIRMED]`
- [ ] **Active Project section** — when a project is active, shows project-scoped items `[CONFIRMED]`
- [ ] **Needs Review section** — unread items with high signal appear in Needs Review `[CONFIRMED]`
- [ ] **Recently Saved section** — most recently saved items appear in Recently Saved `[CONFIRMED]`

### Source Cards
- [ ] **Card click navigates** — click a source card, navigates to /library/item/[libraryId] `[CONFIRMED]`
- [ ] **Workflow state badge renders** — each card shows colored badge with state name (Inbox/Core/etc.) `[CONFIRMED]`
- [ ] **Trust tier dot shows** — cards display small colored dot for trust/evidence tier `[CONFIRMED]`
- [ ] **3-dot menu opens** — click dots icon on card, action menu dropdown appears `[CONFIRMED]`
- [ ] **Move to Core from menu** — click "Move to Core" in action menu, card state updates `[CONFIRMED]`
- [ ] **Delete from menu** — click "Delete" in action menu, source moves to trash `[CONFIRMED]`
- [ ] **Menu closes on outside click** — click outside the open action menu, menu closes `[CONFIRMED]`

### Source List & Pagination
- [ ] **Show more loads items** — click "Show more" button, additional sources appear below `[CONFIRMED]`
- [ ] **Loading indicator during fetch** — while loading more, a spinner/skeleton shows `[CONFIRMED]`
- [ ] **Multi-select checkbox** — click checkbox on card, card enters selected state `[CONFIRMED]`
- [ ] **Bulk toolbar appears** — with 1+ cards selected, bulk action toolbar appears at top `[CONFIRMED]`
