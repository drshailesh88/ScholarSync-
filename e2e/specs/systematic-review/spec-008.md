# systematic-review — Spec 008

STATUS: PARTIAL
TESTED: 35/35
PASS: 27
FAIL: 8
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Network Meta-Analysis Panel
#### Network Plot
- [x] PASS: **Edge thickness** — proportional to number of studies
#### Inconsistency Assessment
- [x] PASS: **Global inconsistency test** — overall network consistency
- [x] PASS: **Loop inconsistency** — specific loops with inconsistency detected
- [x] PASS: **Node-splitting** — local inconsistency assessment
#### Rankings
- [x] PASS: **SUCRA or P-scores** — treatment ranking scores
- [x] PASS: **Ranking table** — treatments ordered by ranking
- [x] PASS: **Rankogram** — visual ranking probabilities (if applicable)
#### Export
- [x] PASS: **CSV export** — league table and rankings downloadable as CSV
#### API
- [ ] FAIL: `POST /api/systematic-review/nma` — runs network meta-analysis

### GRADE Panel
#### Domain Ratings
- [x] PASS: **Per-domain selector** — each domain has a rating selector
- [x] PASS: **Justification text** — space for written rationale per domain
- [x] PASS: **Downgrade indicators** — visual cue when domain causes downgrade
#### Overall Certainty
- [x] PASS: **Auto-calculated** — overall certainty derived from domain ratings
- [x] PASS: **Visual indicator** — prominent display of overall certainty level
- [x] PASS: **Upgrade factors** — large effect, dose-response, confounding considered
#### Export
- [x] PASS: **CSV export** — GRADE evidence table downloadable as CSV
- [x] PASS: **Complete data** — includes all domains, ratings, justifications, and overall certainty
#### API
- [ ] FAIL: `POST /api/systematic-review/grade` — submits GRADE assessment
- [ ] FAIL: `GET /api/systematic-review/grade` — retrieves GRADE results + CSV export

### Manuscript Panel
#### Section Generation
- [x] PASS: **5 sections** — all 5 manuscript sections available
- [x] PASS: **Individual generation** — each section can be generated independently
- [x] PASS: **"Generate All" button** — generates all 5 sections in sequence
- [x] PASS: **Custom instructions** — text input for additional instructions per section
- [ ] FAIL: **AI-generated content** — sections generated based on review data
#### Section Editing
- [x] PASS: **Editable text** — generated sections can be manually edited
- [x] PASS: **Rich text** — sections support formatting (headings, lists, etc.)
- [x] PASS: **Auto-save** — edits saved automatically
#### Export
- [x] PASS: **Copy to clipboard** — individual sections copiable
- [x] PASS: **Download DOCX** — complete manuscript downloadable as Word document
- [ ] FAIL: **Formatting preserved** — headings, references, and structure maintained in export
#### API
- [ ] FAIL: `POST /api/systematic-review/manuscript` — generates manuscript section(s)
- [ ] FAIL: `GET /api/systematic-review/manuscript` — retrieves saved manuscript content

### Snowballing Panel
#### Configuration
- [ ] FAIL: **Direction selector** — choose snowballing direction:
- [x] PASS: **Depth setting** — configurable depth (1 or 2 levels)
- [x] PASS: **Depth 1** — direct citations only
