# systematic-review — Spec 004

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Screening Panel
#### Screening Modes
- [ ] **Mode icons** — correct icons displayed (User, Robot, Handshake)
#### AI Screening
- [ ] **"Run AI Screening" button** — Lightning icon, triggers batch AI screening
- [ ] **API call** — `POST /api/systematic-review/screen` (single or batch, max 100)
- [ ] **Triple-agent screening** — AI uses triple-agent approach for reliability
- [ ] **AI reasoning display** — shows AI rationale for each screening decision
- [ ] **Priority scoring** — papers ranked by screening priority
- [ ] **Batch processing** — screens multiple papers in one operation
- [ ] **Progress indicator** — shows screening progress during batch operation
#### Screening Filters
- [ ] **Filter toggle** — UI to switch between filter views
- [ ] **Filter counts** — badge showing number of papers in each filter
#### Dual Screening & Inter-Rater Agreement
- [ ] **Dual-screening support** — two independent reviewers can screen same paper
- [ ] **Inter-rater agreement** — kappa or percentage agreement calculated and displayed
- [ ] **Blinded mode toggle** — EyeSlash (blinded) / Eye (unblinded) icons
- [ ] **Blinded screening** — second reviewer cannot see first reviewer's decision
- [ ] **Unblinded mode** — decisions visible to both reviewers
#### Conflict Resolution
- [ ] **Conflict detection** — papers where reviewers disagree are flagged
- [ ] **Conflict resolution UI** — mechanism to resolve disagreements
- [ ] **Resolution actions** — arbiter can make final include/exclude decision
#### Per-Paper Actions
- [ ] **Decision persistence** — decisions saved via screening queue API
- [ ] **Decision display** — each paper shows its current screening status
- [ ] **Decision changeable** — screening decision can be updated
#### Refresh
- [ ] **"Refresh" button** — ArrowsClockwise icon, refreshes screening data
- [ ] **Reloads from API** — `GET /api/systematic-review/screening-queue`
#### Screening Queue API
- [ ] `GET /api/systematic-review/screening-queue` — fetches queue with priority ordering
- [ ] `POST /api/systematic-review/screening-queue` — submits screening decisions
- [ ] `PUT /api/systematic-review/screening-queue` — updates decisions, triggers priority recomputation

### PRISMA Flow Panel
#### Diagram Generation
- [ ] **"Generate Diagram" button** — triggers PRISMA 2020 flow diagram generation
- [ ] **Auto-generated** — diagram built from actual screening/import data
- [ ] **SVG output** — diagram rendered as SVG in the panel
- [ ] **PRISMA 2020-compliant** — follows official PRISMA 2020 flow diagram template
#### Diagram Content
- [ ] **Identification box** — shows records identified from databases
- [ ] **Screening box** — shows records screened and excluded
- [ ] **Eligibility box** — shows full-text articles assessed
- [ ] **Included box** — shows studies included in review
- [ ] **Exclusion reasons** — reasons for exclusion shown at each stage
