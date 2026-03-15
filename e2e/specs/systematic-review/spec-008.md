# systematic-review — Spec 008

STATUS: PARTIAL
TESTED: 35/35
PASS: 10
FAIL: 25
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Network Meta-Analysis Panel
#### Network Plot
- [ ] FAIL: **Edge thickness** — proportional to number of studies
#### Inconsistency Assessment
- [ ] FAIL: **Global inconsistency test** — overall network consistency
- [ ] FAIL: **Loop inconsistency** — specific loops with inconsistency detected
- [ ] FAIL: **Node-splitting** — local inconsistency assessment
#### Rankings
- [ ] FAIL: **SUCRA or P-scores** — treatment ranking scores
- [ ] FAIL: **Ranking table** — treatments ordered by ranking
- [ ] FAIL: **Rankogram** — visual ranking probabilities (if applicable)
#### Export
- [x] PASS: **CSV export** — league table and rankings downloadable as CSV
#### API
- [x] PASS: `POST /api/systematic-review/nma` — runs network meta-analysis

### GRADE Panel
#### Domain Ratings
- [ ] FAIL: **Per-domain selector** — each domain has a rating selector
- [ ] FAIL: **Justification text** — space for written rationale per domain
- [ ] FAIL: **Downgrade indicators** — visual cue when domain causes downgrade
#### Overall Certainty
- [ ] FAIL: **Auto-calculated** — overall certainty derived from domain ratings
- [ ] FAIL: **Visual indicator** — prominent display of overall certainty level
- [ ] FAIL: **Upgrade factors** — large effect, dose-response, confounding considered
#### Export
- [x] PASS: **CSV export** — GRADE evidence table downloadable as CSV
- [ ] FAIL: **Complete data** — includes all domains, ratings, justifications, and overall certainty
#### API
- [x] PASS: `POST /api/systematic-review/grade` — submits GRADE assessment
- [x] PASS: `GET /api/systematic-review/grade` — retrieves GRADE results + CSV export

### Manuscript Panel
#### Section Generation
- [ ] FAIL: **5 sections** — all 5 manuscript sections available
- [ ] FAIL: **Individual generation** — each section can be generated independently
- [ ] FAIL: **"Generate All" button** — generates all 5 sections in sequence
- [ ] FAIL: **Custom instructions** — text input for additional instructions per section
- [x] PASS: **AI-generated content** — sections generated based on review data
#### Section Editing
- [ ] FAIL: **Editable text** — generated sections can be manually edited
- [ ] FAIL: **Rich text** — sections support formatting (headings, lists, etc.)
- [ ] FAIL: **Auto-save** — edits saved automatically
#### Export
- [ ] FAIL: **Copy to clipboard** — individual sections copiable
- [ ] FAIL: **Download DOCX** — complete manuscript downloadable as Word document
- [x] PASS: **Formatting preserved** — headings, references, and structure maintained in export
#### API
- [x] PASS: `POST /api/systematic-review/manuscript` — generates manuscript section(s)
- [x] PASS: `GET /api/systematic-review/manuscript` — retrieves saved manuscript content

### Snowballing Panel
#### Configuration
- [x] PASS: **Direction selector** — choose snowballing direction:
- [ ] FAIL: **Depth setting** — configurable depth (1 or 2 levels)
- [ ] FAIL: **Depth 1** — direct citations only
