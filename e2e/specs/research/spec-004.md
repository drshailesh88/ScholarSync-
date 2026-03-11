# research — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Non-timeout failures surface either the API `error` string or `Search failed. Please try again.`
- [ ] Starting a fresh search clears the current `error` state
- [ ] Starting a fresh search clears the current `aiSummary` state before synthesis reruns
- [ ] Search success replaces the current `results` array instead of appending to it
- [ ] Successful searches persist a search-history row through `saveSearchQuery(...)` without blocking the UI on failure
- [ ] Search-history save payload includes `originalQuery`, `queryType: "user"`, `source: "all"`, `resultCount`, and `filtersApplied`
- [ ] Session persistence key is exactly `scholar-sync-research-page`
- [ ] Persisted session payload includes `query`, `results`, `filters`, `sort`, `hasSearched`, `page`, `totalResults`, `hasMore`, `sourceCounts`, `augmentedQueries`, and `aiSummary`
- [ ] Session restore repopulates the page from `sessionStorage` on mount when valid cached JSON exists
- [ ] Restoring a cached searched state sets the init-skip ref so filters/sort do not immediately rerun the search once on hydration
- [ ] Session write failures such as storage quota overflow are silently ignored
- [ ] User plan is loaded once on mount through `getUserUsageStats()`
- [ ] If plan lookup fails, the page falls back to `free`
- [ ] Empty-state history load requests `getRecentSearches()` and `getUserPapers()` in parallel
- [ ] Empty-state history load is skipped when restored session state already contains searched results
- [ ] Suggested-search chips are limited to the first 5 items from the 15-item suggestion list
- [ ] Clicking a suggested search stores that query in state and triggers a follow-up search through `pendingSearchRef`
- [ ] Recent Searches section renders only when `recentSearches.length > 0`
- [ ] Recent search rows show the result-count suffix only when `resultCount > 0`
- [ ] Recent search rows rerun the saved query when clicked
- [ ] Recently Saved section renders only when `recentPapers.length > 0`
- [ ] Recently Saved cards are limited to the first 4 papers returned from `getUserPapers()`
- [ ] Recently Saved author text shows at most two authors followed by ` et al.` when more than two authors exist
- [ ] Empty-state loading helper reads `Loading your history...`
- [ ] Empty-state loading helper appears only while history is loading and there are no recent searches yet
- [ ] `Last 5 Years` filter toggles a boolean chip state instead of opening a date picker
- [ ] Turning `Last 5 Years` on clears both manual year inputs
- [ ] Typing either manual year input forces `last5Years` back to `false`
- [ ] Manual year inputs use placeholders `From` and `To`
- [ ] Manual year inputs do not set explicit `min` or `max` attributes in the current implementation
- [ ] `PDF Available` filter translates to `openAccessOnly=true` in the search request
- [ ] `High Impact` filter does not update visible sort state; it overrides the outgoing request sort to `citations`
- [ ] `RCTs Only` adds `rct` to the outgoing `studyTypes` query parameter
- [ ] `Reviews` adds both `review` and `systematic_review` to the outgoing `studyTypes` query parameter
- [ ] `Meta-Analyses` adds `meta_analysis` to the outgoing `studyTypes` query parameter
