# research — Spec 004

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Non-timeout failures surface either the API `error` string or `Search failed. Please try again.`
- [x] PASS: Starting a fresh search clears the current `error` state
- [x] PASS: Starting a fresh search clears the current `aiSummary` state before synthesis reruns
- [x] PASS: Search success replaces the current `results` array instead of appending to it
- [x] PASS: Successful searches persist a search-history row through `saveSearchQuery(...)` without blocking the UI on failure
- [x] PASS: Search-history save payload includes `originalQuery`, `queryType: "user"`, `source: "all"`, `resultCount`, and `filtersApplied`
- [x] PASS: Session persistence key is exactly `scholar-sync-research-page`
- [x] PASS: Persisted session payload includes `query`, `results`, `filters`, `sort`, `hasSearched`, `page`, `totalResults`, `hasMore`, `sourceCounts`, `augmentedQueries`, and `aiSummary`
- [x] PASS: Session restore repopulates the page from `sessionStorage` on mount when valid cached JSON exists
- [x] PASS: Restoring a cached searched state sets the init-skip ref so filters/sort do not immediately rerun the search once on hydration
- [x] PASS: Session write failures such as storage quota overflow are silently ignored
- [x] PASS: User plan is loaded once on mount through `getUserUsageStats()`
- [x] PASS: If plan lookup fails, the page falls back to `free`
- [x] PASS: Empty-state history load requests `getRecentSearches()` and `getUserPapers()` in parallel
- [x] PASS: Empty-state history load is skipped when restored session state already contains searched results
- [x] PASS: Suggested-search chips are limited to the first 5 items from the 15-item suggestion list
- [x] PASS: Clicking a suggested search stores that query in state and triggers a follow-up search through `pendingSearchRef`
- [x] PASS: Recent Searches section renders only when `recentSearches.length > 0`
- [x] PASS: Recent search rows show the result-count suffix only when `resultCount > 0`
- [x] PASS: Recent search rows rerun the saved query when clicked
- [x] PASS: Recently Saved section renders only when `recentPapers.length > 0`
- [x] PASS: Recently Saved cards are limited to the first 4 papers returned from `getUserPapers()`
- [x] PASS: Recently Saved author text shows at most two authors followed by ` et al.` when more than two authors exist
- [x] PASS: Empty-state loading helper reads `Loading your history...`
- [x] PASS: Empty-state loading helper appears only while history is loading and there are no recent searches yet
- [x] PASS: `Last 5 Years` filter toggles a boolean chip state instead of opening a date picker
- [x] PASS: Turning `Last 5 Years` on clears both manual year inputs
- [x] PASS: Typing either manual year input forces `last5Years` back to `false`
- [x] PASS: Manual year inputs use placeholders `From` and `To`
- [x] PASS: Manual year inputs do not set explicit `min` or `max` attributes in the current implementation
- [x] PASS: `PDF Available` filter translates to `openAccessOnly=true` in the search request
- [x] PASS: `High Impact` filter does not update visible sort state; it overrides the outgoing request sort to `citations`
- [x] PASS: `RCTs Only` adds `rct` to the outgoing `studyTypes` query parameter
- [x] PASS: `Reviews` adds both `review` and `systematic_review` to the outgoing `studyTypes` query parameter
- [x] PASS: `Meta-Analyses` adds `meta_analysis` to the outgoing `studyTypes` query parameter
