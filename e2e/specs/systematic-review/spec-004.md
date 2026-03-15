# systematic-review — Spec 004

STATUS: PARTIAL
TESTED: 35/35
PASS: 14
FAIL: 21
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Screening Panel
#### Screening Modes
- [x] PASS: **Mode icons** — correct icons displayed (User, Robot, Handshake)
#### AI Screening
- [ ] FAIL: **"Run AI Screening" button** — Lightning icon, triggers batch AI screening
- [ ] FAIL: **API call** — `POST /api/systematic-review/screen` (single or batch, max 100)
- [x] PASS: **Triple-agent screening** — AI uses triple-agent approach for reliability
- [ ] FAIL: **AI reasoning display** — shows AI rationale for each screening decision
- [ ] FAIL: **Priority scoring** — papers ranked by screening priority
- [ ] FAIL: **Batch processing** — screens multiple papers in one operation
- [ ] FAIL: **Progress indicator** — shows screening progress during batch operation
#### Screening Filters
- [x] PASS: **Filter toggle** — UI to switch between filter views
- [x] PASS: **Filter counts** — badge showing number of papers in each filter
#### Dual Screening & Inter-Rater Agreement
- [x] PASS: **Dual-screening support** — two independent reviewers can screen same paper
- [x] PASS: **Inter-rater agreement** — kappa or percentage agreement calculated and displayed
- [x] PASS: **Blinded mode toggle** — EyeSlash (blinded) / Eye (unblinded) icons
- [ ] FAIL: **Blinded screening** — second reviewer cannot see first reviewer's decision
- [ ] FAIL: **Unblinded mode** — decisions visible to both reviewers
#### Conflict Resolution
- [ ] FAIL: **Conflict detection** — papers where reviewers disagree are flagged
- [ ] FAIL: **Conflict resolution UI** — mechanism to resolve disagreements
- [x] PASS: **Resolution actions** — arbiter can make final include/exclude decision
#### Per-Paper Actions
- [ ] FAIL: **Decision persistence** — decisions saved via screening queue API
- [ ] FAIL: **Decision display** — each paper shows its current screening status
- [ ] FAIL: **Decision changeable** — screening decision can be updated
#### Refresh
- [x] PASS: **"Refresh" button** — ArrowsClockwise icon, refreshes screening data
- [x] PASS: **Reloads from API** — `GET /api/systematic-review/screening-queue`
#### Screening Queue API
- [x] PASS: `GET /api/systematic-review/screening-queue` — fetches queue with priority ordering
- [ ] FAIL: `POST /api/systematic-review/screening-queue` — submits screening decisions
- [ ] FAIL: `PUT /api/systematic-review/screening-queue` — updates decisions, triggers priority recomputation

### PRISMA Flow Panel
#### Diagram Generation
- [ ] FAIL: **"Generate Diagram" button** — triggers PRISMA 2020 flow diagram generation
- [ ] FAIL: **Auto-generated** — diagram built from actual screening/import data
- [x] PASS: **SVG output** — diagram rendered as SVG in the panel
- [ ] FAIL: **PRISMA 2020-compliant** — follows official PRISMA 2020 flow diagram template
#### Diagram Content
- [x] PASS: **Identification box** — shows records identified from databases
- [ ] FAIL: **Screening box** — shows records screened and excluded
- [x] PASS: **Eligibility box** — shows full-text articles assessed
- [ ] FAIL: **Included box** — shows studies included in review
- [ ] FAIL: **Exclusion reasons** — reasons for exclusion shown at each stage
