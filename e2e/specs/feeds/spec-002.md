# feeds — Spec 002

STATUS: PARTIAL
TESTED: 35/35
PASS: 6
FAIL: 29
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Article List
#### Empty State
- [ ] FAIL: Newspaper icon
- [ ] FAIL: Title: "No articles"
- [ ] FAIL: Description: "No articles match your current filters. Try selecting a different feed or changing the view filter."
#### Pagination
- [x] PASS: "Load more" button at bottom when `hasMore` is true
- [ ] FAIL: Button text during loading: "Loading..."
- [ ] FAIL: Loads next page of articles

### Article Cards — Three Layouts
#### Card View (Default)
- [ ] FAIL: **Unread indicator**: 2×2 blue dot (if unread)
- [ ] FAIL: **Source row**: Favicon + source name + "·" + relative date + "·" + reading time
- [ ] FAIL: **Title**: font-semibold if unread, font-normal + text-ink-muted if read
- [ ] FAIL: **Authors**: text-xs text-ink-muted (truncated)
- [ ] FAIL: **Abstract snippet**: text-xs, line-clamp-2, first 120 chars + "..."
- [ ] FAIL: **Action buttons**: Star, Save to Library, Cite, AI, DOI link
- [x] PASS: **Selected state**: `bg-surface-raised`, `ring-1 ring-brand/20`
#### List View
- [ ] FAIL: Compact single-line layout
- [ ] FAIL: Unread indicator (2×2 dot or spacer)
- [ ] FAIL: Title: text-sm, muted if read
- [ ] FAIL: Feed name (hidden sm, visible md)
- [ ] FAIL: Published time + reading time
- [x] PASS: **No action buttons** (star, save, cite, AI, DOI are NOT shown in list view)
- [x] PASS: Selected state: `bg-brand/5`, `border-brand/20`
#### Magazine View
- [x] PASS: Image at top (h-48, if `imageUrl` exists)
- [ ] FAIL: Source row below image: favicon + name + time + reading time
- [ ] FAIL: Title: text-base, font-bold if unread, line-clamp-2
- [ ] FAIL: Authors (truncated)
- [ ] FAIL: Abstract: text-sm, line-clamp-3
- [ ] FAIL: Action buttons same as Card view
- [x] PASS: Selected state: `ring-2 ring-brand/30`
#### Action Buttons (All Layouts)
- [ ] FAIL: Action clicks stop propagation (don't select article)

### Article Search & Filters
#### Search Bar
- [ ] FAIL: MagnifyingGlass icon
- [ ] FAIL: Placeholder: "Search articles..."
- [ ] FAIL: Clear button (X icon) appears when text entered
- [ ] FAIL: Search triggers article reload
#### Filter Toggle
- [ ] FAIL: FunnelSimple icon + "Filters" label
- [ ] FAIL: Blue dot indicator when filters are active
- [ ] FAIL: Click toggles advanced filter panel
