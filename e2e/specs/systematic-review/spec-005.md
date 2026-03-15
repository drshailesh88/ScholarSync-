# systematic-review — Spec 005

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### PRISMA Flow Panel
#### Diagram Content
- [x] PASS: **Counts accurate** — numbers match actual project data
#### Export
- [x] PASS: **"Download SVG" button** — downloads the PRISMA diagram as SVG file
- [x] PASS: **SVG quality** — downloaded file is valid, well-formed SVG
- [x] PASS: **Print-ready** — diagram suitable for manuscript inclusion

### PRISMA Checklist Panel
#### Checklist Variants
- [x] PASS: **Variant selector** — UI to switch between 3 checklist variants
- [x] PASS: **Correct item count** — each variant shows the correct number of items
#### Checklist Items
- [x] PASS: **Status toggle** — each item's status can be changed
- [x] PASS: **Item description** — each checklist item shows its description
- [x] PASS: **Section headings** — items grouped by PRISMA section
#### Manuscript Verification
- [x] PASS: **Manuscript paste area** — text area to paste manuscript text
- [x] PASS: **Verify button** — triggers AI verification against checklist
- [x] PASS: **Auto-check** — AI scans manuscript and auto-populates compliance statuses
#### Compliance Summary
- [x] PASS: **Compliance percentage** — overall percentage displayed
- [x] PASS: **Breakdown** — counts per status (reported, partially, not reported, N/A)
- [x] PASS: **Color-coded summary** — uses status colors in summary display
#### Export
- [x] PASS: **CSV export** — downloads completed checklist as CSV file
- [x] PASS: **CSV format** — includes item number, description, status, and notes

### Unified Risk of Bias Panel
#### Tool Selection
- [x] PASS: **Tool toggle** — UI to select which RoB tool to use
- [x] PASS: **Auto-detection** — system auto-detects appropriate tool based on study type
- [x] PASS: **Manual override** — user can override auto-detected tool selection
- [x] PASS: **Color coding** — each tool renders with its designated color
#### RoB 2 (for RCTs)
- [x] PASS: **Domain assessment** — assess each RoB 2 domain
- [x] PASS: **Domains** — randomization, deviations, missing data, measurement, selection
- [x] PASS: **Per-domain judgment** — Low / Some concerns / High risk
- [x] PASS: **Supporting text** — space for justification per domain
- [x] PASS: **Overall judgment** — aggregated across domains
#### ROBINS-I (for Observational Studies)
- [x] PASS: **Domain assessment** — assess each ROBINS-I domain
- [x] PASS: **Domains** — confounding, selection, classification, deviations, missing, measurement, reporting
- [x] PASS: **Per-domain judgment** — Low / Moderate / Serious / Critical risk
- [x] PASS: **Supporting text** — justification per domain
- [x] PASS: **Overall judgment** — aggregated across domains
#### QUADAS-2 (for Diagnostic Studies)
- [x] PASS: **Domain assessment** — assess each QUADAS-2 domain
- [x] PASS: **Domains** — patient selection, index test, reference standard, flow and timing
- [x] PASS: **Per-domain judgment** — Low / High / Unclear risk
- [x] PASS: **Applicability concerns** — separate applicability assessment
