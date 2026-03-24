# systematic-review — Spec 008

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Network Meta-Analysis Panel
#### Network Plot
- [ ] **Edge thickness** — proportional to number of studies
#### Inconsistency Assessment
- [ ] **Global inconsistency test** — overall network consistency
- [ ] **Loop inconsistency** — specific loops with inconsistency detected
- [ ] **Node-splitting** — local inconsistency assessment
#### Rankings
- [ ] **SUCRA or P-scores** — treatment ranking scores
- [ ] **Ranking table** — treatments ordered by ranking
- [ ] **Rankogram** — visual ranking probabilities (if applicable)
#### Export
- [ ] **CSV export** — league table and rankings downloadable as CSV
#### API
- [ ] `POST /api/systematic-review/nma` — runs network meta-analysis

### GRADE Panel
#### Domain Ratings
- [ ] **Per-domain selector** — each domain has a rating selector
- [ ] **Justification text** — space for written rationale per domain
- [ ] **Downgrade indicators** — visual cue when domain causes downgrade
#### Overall Certainty
- [ ] **Auto-calculated** — overall certainty derived from domain ratings
- [ ] **Visual indicator** — prominent display of overall certainty level
- [ ] **Upgrade factors** — large effect, dose-response, confounding considered
#### Export
- [ ] **CSV export** — GRADE evidence table downloadable as CSV
- [ ] **Complete data** — includes all domains, ratings, justifications, and overall certainty
#### API
- [ ] `POST /api/systematic-review/grade` — submits GRADE assessment
- [ ] `GET /api/systematic-review/grade` — retrieves GRADE results + CSV export

### Manuscript Panel
#### Section Generation
- [ ] **5 sections** — all 5 manuscript sections available
- [ ] **Individual generation** — each section can be generated independently
- [ ] **"Generate All" button** — generates all 5 sections in sequence
- [ ] **Custom instructions** — text input for additional instructions per section
- [ ] **AI-generated content** — sections generated based on review data
#### Section Editing
- [ ] **Editable text** — generated sections can be manually edited
- [ ] **Rich text** — sections support formatting (headings, lists, etc.)
- [ ] **Auto-save** — edits saved automatically
#### Export
- [ ] **Copy to clipboard** — individual sections copiable
- [ ] **Download DOCX** — complete manuscript downloadable as Word document
- [ ] **Formatting preserved** — headings, references, and structure maintained in export
#### API
- [ ] `POST /api/systematic-review/manuscript` — generates manuscript section(s)
- [ ] `GET /api/systematic-review/manuscript` — retrieves saved manuscript content

### Snowballing Panel
#### Configuration
- [ ] **Direction selector** — choose snowballing direction:
- [ ] **Depth setting** — configurable depth (1 or 2 levels)
- [ ] **Depth 1** — direct citations only
