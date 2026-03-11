# research — Spec 003

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Synthesis Report
#### Live Synthesis Behavior (`POST /api/research/synthesize`)
- [ ] **Plan mode** — can generate plan before full synthesis
- [ ] **Rate limiting** — enforced

### Citation Insertion
- [ ] **Save & Cite persistence** — writes `scholarsync_pending_citation` to sessionStorage
- [ ] **Save & Cite payload** — includes title, authors, journal, year, doi, and pmid when present
- [ ] **Editor handoff** — routes to `/editor/new` after the citation payload is stored

### Session Persistence
- [ ] **Storage key** — `scholar-sync-research-page` in sessionStorage
- [ ] **Persisted fields**: query, results, filters, sort, hasSearched, page, totalResults, hasMore, sourceCounts, augmentedQueries, aiSummary
- [ ] **Restored on mount** — hydrates state from session
- [ ] **Updated on changes** — writes to session after each search/filter change

### Pagination & Load More
- [ ] **20 results per page** (`perPage = 20`)
- [ ] **Previous / Next buttons** — shown when `hasSearched` and `totalResults > 0`
- [ ] **Replacing results** — each page navigation replaces the current result list instead of appending
- [ ] **Page counter** — status text reads `Page {current} of {total}`
- [ ] **Total results** — displayed in header

### Error Handling & Edge Cases
- [ ] **Search API error** — error state displayed
- [ ] **Rate limiting** — enforced, error shown to user
- [ ] **Source timeout** — 4.5s per source in `/api/search/unified`, with graceful degradation when one source fails
- [ ] **Session quota exceeded** — sessionStorage write silently ignored
- [ ] **Similar paper errors** — tracked per paper, non-blocking
- [ ] **Synthesis failure** — error thrown, state reset
- [ ] **Empty results** — appropriate empty state message
- [ ] **User plan check** — `getUserUsageStats()` loaded on mount

### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Research page uses a single-line text `<input>`, not a textarea, for the primary query field
- [ ] Query input initializes as an empty string on first render before any session restore
- [ ] Query input placeholder reads `Search 200M+ papers — try 'CRISPR sickle cell gene therapy'`
- [ ] Pressing `Enter` in the query input calls `handleSearch(0)`
- [ ] Search button is disabled only while `loading` is true
- [ ] Clicking `Search` with an empty query leaves the page unchanged because `handleSearch()` returns early
- [ ] Search button label changes from `Search` to `Searching...` while a request is in flight
- [ ] Search requests are sent to `/api/search/unified`, not `/api/research/search`
- [ ] Query URL always includes `q`, `page`, `perPage`, and `sort` query parameters
- [ ] Search page size is fixed at `20` results per request
- [ ] Starting a new search aborts any previous in-flight request through `AbortController`
- [ ] Client-side search timeout aborts the request after 15 seconds
- [ ] Timed-out searches surface the exact message `Search timed out. Try a more specific query or check your connection.`
