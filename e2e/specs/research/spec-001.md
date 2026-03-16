# research — Spec 001

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Search Input & Query
- [x] PASS: **Single-line input** — primary query field is a single-line text `<input>`
- [x] PASS: **Placeholder** — "Search 200M+ papers — try 'CRISPR sickle cell gene therapy'"
- [x] PASS: **Enter key** — submits search (without Shift)
- [x] PASS: **Search button** — text-only button, disabled only while searching
- [x] PASS: **Loading state** — button label changes to "Searching..." during search

### Filter System
#### Year Range
- [x] PASS: **Year Start** — number input with placeholder `From`
- [x] PASS: **Year End** — number input with placeholder `To`
- [x] PASS: **Year inputs** — current implementation does not apply explicit `min` or `max` attributes
#### Filter Behavior
- [x] PASS: Changing filters triggers new search automatically (after init)
- [x] PASS: Filter state persisted in sessionStorage

### Sort Options
- [x] PASS: **Sort dropdown** — CaretDown caret icon, toggles on click
- [x] PASS: **Active sort** — highlighted in dropdown
- [x] PASS: **Sort change** — re-sorts existing results (or triggers new search)

### Search Results
#### API (`GET /api/search/unified`)
- [x] PASS: **Multi-source search** — PubMed, Semantic Scholar, OpenAlex, and ClinicalTrials.gov searched in parallel
- [x] PASS: **4.5-second timeout** per source
- [x] PASS: **Reciprocal Rank Fusion** — merges results across sources
- [x] PASS: **Rate limiting** — enforced per user
- [x] PASS: **Per page** — 20 results per request
#### Results Display
- [x] PASS: **Skeleton loader** — 4 placeholder cards during in-page search
- [x] PASS: **Source counts** — PubMed, Semantic Scholar, OpenAlex, Clinical Trials counts
- [x] PASS: **Empty state (before search)** — recent searches, recently saved papers, suggested searches, and optional `Loading your history...`
- [x] PASS: **Empty state (no results)** — "No results found. Try a different query."

### Evidence Level System
- [x] PASS: Evidence badge displayed on each result card
- [x] PASS: Used in sort-by-evidence ordering

### Paper Result Cards
- [x] PASS: **Title** — links to DOI when available, otherwise to PubMed when PMID exists
- [x] PASS: **Authors** — truncated with "et al." if more than 3 authors
- [x] PASS: **Journal** — journal name
- [x] PASS: **Year** — publication year
- [x] PASS: **Evidence level badge** — color-coded (see Section 6)
- [x] PASS: **Citation count** — number of citations
- [x] PASS: **DOI link** — text link labeled `DOI` in the metadata row when DOI exists
- [x] PASS: **Open Access indicator** — if applicable
- [x] PASS: **Save button** — FloppyDisk icon, saves to library
- [x] PASS: **Save & Cite button** — saves the paper and routes to `/editor/new`
- [x] PASS: **Similar button** — shown only when Semantic Scholar ID exists
