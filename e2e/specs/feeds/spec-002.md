# feeds — Spec 002

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Article List
#### Empty State
- [ ] Newspaper icon
- [ ] Title: "No articles"
- [ ] Description: "No articles match your current filters. Try selecting a different feed or changing the view filter."
#### Pagination
- [ ] "Load more" button at bottom when `hasMore` is true
- [ ] Button text during loading: "Loading..."
- [ ] Loads next page of articles

### Article Cards — Three Layouts
#### Card View (Default)
- [ ] **Unread indicator**: 2×2 blue dot (if unread)
- [ ] **Source row**: Favicon + source name + "·" + relative date + "·" + reading time
- [ ] **Title**: font-semibold if unread, font-normal + text-ink-muted if read
- [ ] **Authors**: text-xs text-ink-muted (truncated)
- [ ] **Abstract snippet**: text-xs, line-clamp-2, first 120 chars + "..."
- [ ] **Action buttons**: Star, Save to Library, Cite, AI, DOI link
- [ ] **Selected state**: `bg-surface-raised`, `ring-1 ring-brand/20`
#### List View
- [ ] Compact single-line layout
- [ ] Unread indicator (2×2 dot or spacer)
- [ ] Title: text-sm, muted if read
- [ ] Feed name (hidden sm, visible md)
- [ ] Published time + reading time
- [ ] **No action buttons** (star, save, cite, AI, DOI are NOT shown in list view)
- [ ] Selected state: `bg-brand/5`, `border-brand/20`
#### Magazine View
- [ ] Image at top (h-48, if `imageUrl` exists)
- [ ] Source row below image: favicon + name + time + reading time
- [ ] Title: text-base, font-bold if unread, line-clamp-2
- [ ] Authors (truncated)
- [ ] Abstract: text-sm, line-clamp-3
- [ ] Action buttons same as Card view
- [ ] Selected state: `ring-2 ring-brand/30`
#### Action Buttons (All Layouts)
- [ ] Action clicks stop propagation (don't select article)

### Article Search & Filters
#### Search Bar
- [ ] MagnifyingGlass icon
- [ ] Placeholder: "Search articles..."
- [ ] Clear button (X icon) appears when text entered
- [ ] Search triggers article reload
#### Filter Toggle
- [ ] FunnelSimple icon + "Filters" label
- [ ] Blue dot indicator when filters are active
- [ ] Click toggles advanced filter panel
