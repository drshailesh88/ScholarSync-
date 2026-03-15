# feeds — Spec 002

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Article List
#### Empty State
- [x] PASS: Newspaper icon
- [x] PASS: Title: "No articles"
- [x] PASS: Description: "No articles match your current filters. Try selecting a different feed or changing the view filter."
#### Pagination
- [x] PASS: "Load more" button at bottom when `hasMore` is true
- [x] PASS: Button text during loading: "Loading..."
- [x] PASS: Loads next page of articles

### Article Cards — Three Layouts
#### Card View (Default)
- [x] PASS: **Unread indicator**: 2×2 blue dot (if unread)
- [x] PASS: **Source row**: Favicon + source name + "·" + relative date + "·" + reading time
- [x] PASS: **Title**: font-semibold if unread, font-normal + text-ink-muted if read
- [x] PASS: **Authors**: text-xs text-ink-muted (truncated)
- [x] PASS: **Abstract snippet**: text-xs, line-clamp-2, first 120 chars + "..."
- [x] PASS: **Action buttons**: Star, Save to Library, Cite, AI, DOI link
- [x] PASS: **Selected state**: `bg-surface-raised`, `ring-1 ring-brand/20`
#### List View
- [x] PASS: Compact single-line layout
- [x] PASS: Unread indicator (2×2 dot or spacer)
- [x] PASS: Title: text-sm, muted if read
- [x] PASS: Feed name (hidden sm, visible md)
- [x] PASS: Published time + reading time
- [x] PASS: **No action buttons** (star, save, cite, AI, DOI are NOT shown in list view)
- [x] PASS: Selected state: `bg-brand/5`, `border-brand/20`
#### Magazine View
- [x] PASS: Image at top (h-48, if `imageUrl` exists)
- [x] PASS: Source row below image: favicon + name + time + reading time
- [x] PASS: Title: text-base, font-bold if unread, line-clamp-2
- [x] PASS: Authors (truncated)
- [x] PASS: Abstract: text-sm, line-clamp-3
- [x] PASS: Action buttons same as Card view
- [x] PASS: Selected state: `ring-2 ring-brand/30`
#### Action Buttons (All Layouts)
- [x] PASS: Action clicks stop propagation (don't select article)

### Article Search & Filters
#### Search Bar
- [x] PASS: MagnifyingGlass icon
- [x] PASS: Placeholder: "Search articles..."
- [x] PASS: Clear button (X icon) appears when text entered
- [x] PASS: Search triggers article reload
#### Filter Toggle
- [x] PASS: FunnelSimple icon + "Filters" label
- [x] PASS: Blue dot indicator when filters are active
- [x] PASS: Click toggles advanced filter panel
