# feeds — Spec 013

STATUS: PARTIAL
TESTED: 35/35
PASS: 26
FAIL: 9
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Article Card — List View (article-card-list.tsx)
- [ ] FAIL: List view does NOT render a favicon image
- [ ] FAIL: List view does NOT render authors
- [ ] FAIL: List view does NOT render abstract/snippet text
#### Article Card — Magazine View (article-card-magazine.tsx)
- [x] PASS: Magazine card: `glass-panel rounded-2xl overflow-hidden`
- [x] PASS: Magazine hover state (unselected): `hover:ring-1 hover:ring-border`
- [x] PASS: Image container: `w-full h-48 bg-surface-raised overflow-hidden` (bg visible when image loading)
- [x] PASS: Image uses `object-cover` fit
- [x] PASS: Content area padding: `p-5`
- [x] PASS: Magazine title: `text-base` (larger than card view's `text-sm`)
- [x] PASS: Magazine read title: `font-medium text-ink-muted` (card view uses `font-normal`)
- [x] PASS: Magazine abstract shows full `article.abstractSnippet` (NOT truncated to 120 chars like card view)
- [x] PASS: Magazine abstract styling: `text-sm text-ink-muted line-clamp-3 leading-relaxed`
- [ ] FAIL: Magazine external link text: "Open" (NOT "DOI" like card view)
- [x] PASS: Magazine external link uses `article.link` (NOT `https://doi.org/${article.doi}`)
- [x] PASS: Magazine external link only shows when `article.link` is truthy (NOT `article.doi`)
#### Article Search Bar (article-search-bar.tsx)
- [ ] FAIL: Search input: `pl-9 pr-4 py-2 rounded-xl text-xs`
- [x] PASS: Search clear button position: `right-3 top-1/2 -translate-y-1/2`
- [x] PASS: Filter toggle with active filters: `bg-brand/10 text-brand border-brand/20`
- [x] PASS: Filter toggle without active filters: `bg-surface-raised text-ink-muted border-border hover:text-ink`
- [x] PASS: Blue dot indicator: `w-1.5 h-1.5 rounded-full bg-brand`
- [x] PASS: Sort toggle icon: `SortAscending` when `sortBy === "oldest"`, `SortDescending` otherwise
- [x] PASS: Advanced filter panel: `glass-panel rounded-xl p-3 space-y-3` (only rendered when `showAdvancedFilters`)
- [x] PASS: Date filter "From" label: `text-[10px] text-ink-muted font-medium uppercase tracking-wide`
- [ ] FAIL: Date filter "To" label: same styling as "From"
- [x] PASS: Date inputs are `type="date"` (native HTML date picker)
- [ ] FAIL: Journal dropdown label: "Journal" (uppercase tracking-wide)
- [ ] FAIL: Journal dropdown default option text: "All journals"
- [ ] FAIL: Advanced sort labels: "Date" (for published), "Added", "Title" (3 equal-width buttons)
- [x] PASS: Advanced sort active: `bg-brand/10 text-brand border border-brand/20`
- [x] PASS: Advanced sort inactive: `bg-surface-raised text-ink-muted border border-border hover:text-ink`
- [x] PASS: `currentLegacySort` derivation: `sortBy === "relevance" ? "title" : "published"` — maps store sort to advanced sort visual state
- [x] PASS: Setting sort "added" with `sortDir = "asc"` normalizes to store `sortBy = "oldest"`
- [x] PASS: Setting sort "published" with `sortDir = "desc"` normalizes to store `sortBy = "newest"`
- [x] PASS: `hasActiveFilters` does NOT include `searchQuery` — only checks `filterDateFrom || filterDateTo || filterJournal`
#### Article Reader (article-reader.tsx)
- [x] PASS: Reader panel: `glass-panel rounded-2xl h-full overflow-y-auto p-5`
