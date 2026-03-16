# research — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Synthesis Report
#### Live Synthesis Behavior (`POST /api/research/synthesize`)
- [x] PASS: **Plan mode** — can generate plan before full synthesis
- [x] PASS: **Rate limiting** — enforced

### Citation Insertion
- [x] PASS: **Save & Cite persistence** — writes `scholarsync_pending_citation` to sessionStorage
- [x] PASS: **Save & Cite payload** — includes title, authors, journal, year, doi, and pmid when present
- [x] PASS: **Editor handoff** — routes to `/editor/new` after the citation payload is stored

### Session Persistence
- [x] PASS: **Storage key** — `scholar-sync-research-page` in sessionStorage
- [x] PASS: **Persisted fields**: query, results, filters, sort, hasSearched, page, totalResults, hasMore, sourceCounts, augmentedQueries, aiSummary
- [x] PASS: **Restored on mount** — hydrates state from session
- [x] PASS: **Updated on changes** — writes to session after each search/filter change

### Pagination & Load More
- [x] PASS: **20 results per page** (`perPage = 20`)
- [x] PASS: **Previous / Next buttons** — shown when `hasSearched` and `totalResults > 0`
- [x] PASS: **Replacing results** — each page navigation replaces the current result list instead of appending
- [x] PASS: **Page counter** — status text reads `Page {current} of {total}`
- [x] PASS: **Total results** — displayed in header

### Error Handling & Edge Cases
- [x] PASS: **Search API error** — error state displayed
- [x] PASS: **Rate limiting** — enforced, error shown to user
- [x] PASS: **Source timeout** — 4.5s per source in `/api/search/unified`, with graceful degradation when one source fails
- [x] PASS: **Session quota exceeded** — sessionStorage write silently ignored
- [x] PASS: **Similar paper errors** — tracked per paper, non-blocking
- [x] PASS: **Synthesis failure** — error thrown, state reset
- [x] PASS: **Empty results** — appropriate empty state message
- [x] PASS: **User plan check** — `getUserUsageStats()` loaded on mount

### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Research page uses a single-line text `<input>`, not a textarea, for the primary query field
- [x] PASS: Query input initializes as an empty string on first render before any session restore
- [x] PASS: Query input placeholder reads `Search 200M+ papers — try 'CRISPR sickle cell gene therapy'`
- [x] PASS: Pressing `Enter` in the query input calls `handleSearch(0)`
- [x] PASS: Search button is disabled only while `loading` is true
- [x] PASS: Clicking `Search` with an empty query leaves the page unchanged because `handleSearch()` returns early
- [x] PASS: Search button label changes from `Search` to `Searching...` while a request is in flight
- [x] PASS: Search requests are sent to `/api/search/unified`, not `/api/research/search`
- [x] PASS: Query URL always includes `q`, `page`, `perPage`, and `sort` query parameters
- [x] PASS: Search page size is fixed at `20` results per request
- [x] PASS: Starting a new search aborts any previous in-flight request through `AbortController`
- [x] PASS: Client-side search timeout aborts the request after 15 seconds
- [x] PASS: Timed-out searches surface the exact message `Search timed out. Try a more specific query or check your connection.`
