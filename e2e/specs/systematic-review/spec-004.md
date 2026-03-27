# systematic-review — Spec 004

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Screening Panel
#### Screening Modes
- [x] PASS: **Mode icons** — correct icons displayed (User, Robot, Handshake)
#### AI Screening
- [x] PASS: **"Run AI Screening" button** — Lightning icon, triggers batch AI screening
- [x] PASS: **API call** — `POST /api/systematic-review/screen` (single or batch, max 100)
- [x] PASS: **Triple-agent screening** — AI uses triple-agent approach for reliability
- [x] PASS: **AI reasoning display** — shows AI rationale for each screening decision
- [x] PASS: **Priority scoring** — papers ranked by screening priority
- [x] PASS: **Batch processing** — screens multiple papers in one operation
- [x] PASS: **Progress indicator** — shows screening progress during batch operation
#### Screening Filters
- [x] PASS: **Filter toggle** — UI to switch between filter views
- [x] PASS: **Filter counts** — badge showing number of papers in each filter
#### Dual Screening & Inter-Rater Agreement
- [x] PASS: **Dual-screening support** — two independent reviewers can screen same paper
- [x] PASS: **Inter-rater agreement** — kappa or percentage agreement calculated and displayed
- [x] PASS: **Blinded mode toggle** — EyeSlash (blinded) / Eye (unblinded) icons
- [x] PASS: **Blinded screening** — second reviewer cannot see first reviewer's decision
- [x] PASS: **Unblinded mode** — decisions visible to both reviewers
#### Conflict Resolution
- [x] PASS: **Conflict detection** — papers where reviewers disagree are flagged
- [x] PASS: **Conflict resolution UI** — mechanism to resolve disagreements
- [x] PASS: **Resolution actions** — arbiter can make final include/exclude decision
#### Per-Paper Actions
- [x] PASS: **Decision persistence** — decisions saved via screening queue API
- [x] PASS: **Decision display** — each paper shows its current screening status
- [x] PASS: **Decision changeable** — screening decision can be updated
#### Refresh
- [x] PASS: **"Refresh" button** — ArrowsClockwise icon, refreshes screening data
- [x] PASS: **Reloads from API** — `GET /api/systematic-review/screening-queue`
#### Screening Queue API
- [x] PASS: `GET /api/systematic-review/screening-queue` — fetches queue with priority ordering
- [x] PASS: `POST /api/systematic-review/screening-queue` — submits screening decisions
- [x] PASS: `PUT /api/systematic-review/screening-queue` — updates decisions, triggers priority recomputation

### PRISMA Flow Panel
#### Diagram Generation
- [x] PASS: **"Generate Diagram" button** — triggers PRISMA 2020 flow diagram generation
- [x] PASS: **Auto-generated** — diagram built from actual screening/import data
- [x] PASS: **SVG output** — diagram rendered as SVG in the panel
- [x] PASS: **PRISMA 2020-compliant** — follows official PRISMA 2020 flow diagram template
#### Diagram Content
- [x] PASS: **Identification box** — shows records identified from databases
- [x] PASS: **Screening box** — shows records screened and excluded
- [x] PASS: **Eligibility box** — shows full-text articles assessed
- [x] PASS: **Included box** — shows studies included in review
- [x] PASS: **Exclusion reasons** — reasons for exclusion shown at each stage
