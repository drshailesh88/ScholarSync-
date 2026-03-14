# feeds — Spec 013

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Article Card — List View (article-card-list.tsx)
- [ ] List view does NOT render a favicon image
- [ ] List view does NOT render authors
- [ ] List view does NOT render abstract/snippet text
#### Article Card — Magazine View (article-card-magazine.tsx)
- [ ] Magazine card: `glass-panel rounded-2xl overflow-hidden`
- [ ] Magazine hover state (unselected): `hover:ring-1 hover:ring-border`
- [ ] Image container: `w-full h-48 bg-surface-raised overflow-hidden` (bg visible when image loading)
- [ ] Image uses `object-cover` fit
- [ ] Content area padding: `p-5`
- [ ] Magazine title: `text-base` (larger than card view's `text-sm`)
- [ ] Magazine read title: `font-medium text-ink-muted` (card view uses `font-normal`)
- [ ] Magazine abstract shows full `article.abstractSnippet` (NOT truncated to 120 chars like card view)
- [ ] Magazine abstract styling: `text-sm text-ink-muted line-clamp-3 leading-relaxed`
- [ ] Magazine external link text: "Open" (NOT "DOI" like card view)
- [ ] Magazine external link uses `article.link` (NOT `https://doi.org/${article.doi}`)
- [ ] Magazine external link only shows when `article.link` is truthy (NOT `article.doi`)
#### Article Search Bar (article-search-bar.tsx)
- [ ] Search input: `pl-9 pr-4 py-2 rounded-xl text-xs`
- [ ] Search clear button position: `right-3 top-1/2 -translate-y-1/2`
- [ ] Filter toggle with active filters: `bg-brand/10 text-brand border-brand/20`
- [ ] Filter toggle without active filters: `bg-surface-raised text-ink-muted border-border hover:text-ink`
- [ ] Blue dot indicator: `w-1.5 h-1.5 rounded-full bg-brand`
- [ ] Sort toggle icon: `SortAscending` when `sortBy === "oldest"`, `SortDescending` otherwise
- [ ] Advanced filter panel: `glass-panel rounded-xl p-3 space-y-3` (only rendered when `showAdvancedFilters`)
- [ ] Date filter "From" label: `text-[10px] text-ink-muted font-medium uppercase tracking-wide`
- [ ] Date filter "To" label: same styling as "From"
- [ ] Date inputs are `type="date"` (native HTML date picker)
- [ ] Journal dropdown label: "Journal" (uppercase tracking-wide)
- [ ] Journal dropdown default option text: "All journals"
- [ ] Advanced sort labels: "Date" (for published), "Added", "Title" (3 equal-width buttons)
- [ ] Advanced sort active: `bg-brand/10 text-brand border border-brand/20`
- [ ] Advanced sort inactive: `bg-surface-raised text-ink-muted border border-border hover:text-ink`
- [ ] `currentLegacySort` derivation: `sortBy === "relevance" ? "title" : "published"` — maps store sort to advanced sort visual state
- [ ] Setting sort "added" with `sortDir = "asc"` normalizes to store `sortBy = "oldest"`
- [ ] Setting sort "published" with `sortDir = "desc"` normalizes to store `sortBy = "newest"`
- [ ] `hasActiveFilters` does NOT include `searchQuery` — only checks `filterDateFrom || filterDateTo || filterJournal`
#### Article Reader (article-reader.tsx)
- [ ] Reader panel: `glass-panel rounded-2xl h-full overflow-y-auto p-5`
