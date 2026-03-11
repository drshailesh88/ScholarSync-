# research — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Search Input & Query
- [ ] **Single-line input** — primary query field is a single-line text `<input>`
- [ ] **Placeholder** — "Search 200M+ papers — try 'CRISPR sickle cell gene therapy'"
- [ ] **Enter key** — submits search (without Shift)
- [ ] **Search button** — text-only button, disabled only while searching
- [ ] **Loading state** — button label changes to "Searching..." during search

### Filter System
#### Year Range
- [ ] **Year Start** — number input with placeholder `From`
- [ ] **Year End** — number input with placeholder `To`
- [ ] **Year inputs** — current implementation does not apply explicit `min` or `max` attributes
#### Filter Behavior
- [ ] Changing filters triggers new search automatically (after init)
- [ ] Filter state persisted in sessionStorage

### Sort Options
- [ ] **Sort dropdown** — CaretDown caret icon, toggles on click
- [ ] **Active sort** — highlighted in dropdown
- [ ] **Sort change** — re-sorts existing results (or triggers new search)

### Search Results
#### API (`GET /api/search/unified`)
- [ ] **Multi-source search** — PubMed, Semantic Scholar, OpenAlex, and ClinicalTrials.gov searched in parallel
- [ ] **4.5-second timeout** per source
- [ ] **Reciprocal Rank Fusion** — merges results across sources
- [ ] **Rate limiting** — enforced per user
- [ ] **Per page** — 20 results per request
#### Results Display
- [ ] **Skeleton loader** — 4 placeholder cards during in-page search
- [ ] **Source counts** — PubMed, Semantic Scholar, OpenAlex, Clinical Trials counts
- [ ] **Empty state (before search)** — recent searches, recently saved papers, suggested searches, and optional `Loading your history...`
- [ ] **Empty state (no results)** — "No results found. Try a different query."

### Evidence Level System
- [ ] Evidence badge displayed on each result card
- [ ] Used in sort-by-evidence ordering

### Paper Result Cards
- [ ] **Title** — links to DOI when available, otherwise to PubMed when PMID exists
- [ ] **Authors** — truncated with "et al." if more than 3 authors
- [ ] **Journal** — journal name
- [ ] **Year** — publication year
- [ ] **Evidence level badge** — color-coded (see Section 6)
- [ ] **Citation count** — number of citations
- [ ] **DOI link** — text link labeled `DOI` in the metadata row when DOI exists
- [ ] **Open Access indicator** — if applicable
- [ ] **Save button** — FloppyDisk icon, saves to library
- [ ] **Save & Cite button** — saves the paper and routes to `/editor/new`
- [ ] **Similar button** — shown only when Semantic Scholar ID exists
