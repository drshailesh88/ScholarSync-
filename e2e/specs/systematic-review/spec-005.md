# systematic-review — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### PRISMA Flow Panel
#### Diagram Content
- [ ] **Counts accurate** — numbers match actual project data
#### Export
- [ ] **"Download SVG" button** — downloads the PRISMA diagram as SVG file
- [ ] **SVG quality** — downloaded file is valid, well-formed SVG
- [ ] **Print-ready** — diagram suitable for manuscript inclusion

### PRISMA Checklist Panel
#### Checklist Variants
- [ ] **Variant selector** — UI to switch between 3 checklist variants
- [ ] **Correct item count** — each variant shows the correct number of items
#### Checklist Items
- [ ] **Status toggle** — each item's status can be changed
- [ ] **Item description** — each checklist item shows its description
- [ ] **Section headings** — items grouped by PRISMA section
#### Manuscript Verification
- [ ] **Manuscript paste area** — text area to paste manuscript text
- [ ] **Verify button** — triggers AI verification against checklist
- [ ] **Auto-check** — AI scans manuscript and auto-populates compliance statuses
#### Compliance Summary
- [ ] **Compliance percentage** — overall percentage displayed
- [ ] **Breakdown** — counts per status (reported, partially, not reported, N/A)
- [ ] **Color-coded summary** — uses status colors in summary display
#### Export
- [ ] **CSV export** — downloads completed checklist as CSV file
- [ ] **CSV format** — includes item number, description, status, and notes

### Unified Risk of Bias Panel
#### Tool Selection
- [ ] **Tool toggle** — UI to select which RoB tool to use
- [ ] **Auto-detection** — system auto-detects appropriate tool based on study type
- [ ] **Manual override** — user can override auto-detected tool selection
- [ ] **Color coding** — each tool renders with its designated color
#### RoB 2 (for RCTs)
- [ ] **Domain assessment** — assess each RoB 2 domain
- [ ] **Domains** — randomization, deviations, missing data, measurement, selection
- [ ] **Per-domain judgment** — Low / Some concerns / High risk
- [ ] **Supporting text** — space for justification per domain
- [ ] **Overall judgment** — aggregated across domains
#### ROBINS-I (for Observational Studies)
- [ ] **Domain assessment** — assess each ROBINS-I domain
- [ ] **Domains** — confounding, selection, classification, deviations, missing, measurement, reporting
- [ ] **Per-domain judgment** — Low / Moderate / Serious / Critical risk
- [ ] **Supporting text** — justification per domain
- [ ] **Overall judgment** — aggregated across domains
#### QUADAS-2 (for Diagnostic Studies)
- [ ] **Domain assessment** — assess each QUADAS-2 domain
- [ ] **Domains** — patient selection, index test, reference standard, flow and timing
- [ ] **Per-domain judgment** — Low / High / Unclear risk
- [ ] **Applicability concerns** — separate applicability assessment
