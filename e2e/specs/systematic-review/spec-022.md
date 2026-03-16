# systematic-review — Spec 022

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Meta-Analysis Panel
- [x] PASS: Sensitivity run button label is `Run Leave-One-Out`
- [x] PASS: Sensitivity in-flight label is `Running...`
- [x] PASS: Sensitivity validation error is `At least 3 complete studies are required for leave-one-out analysis`
- [x] PASS: Leave-one-out result rows are visually highlighted when dropping that study changes the significance conclusion relative to the main analysis
#### Network Meta-Analysis Panel
- [x] PASS: Network meta-analysis panel initializes with 2 empty study rows
- [x] PASS: NMA panel defaults the model toggle to `fixed`
- [x] PASS: NMA panel shows a spinner-only loading state while fetching saved results, with no loading text
- [x] PASS: Failed saved-result GET requests do not block manual data entry and do not show a dedicated banner by default
- [x] PASS: Header title is `Network Meta-Analysis`
- [x] PASS: Header description explicitly references a graph-theoretical approach and `Ruecker 2012`
- [x] PASS: Study table headers are `Study ID`, `Treatment 1`, `Treatment 2`, `Effect (log)`, and `SE`
- [x] PASS: Study ID placeholder is `e.g., Smith 2020`
- [x] PASS: Treatment 1 placeholder is `e.g., Drug A`
- [x] PASS: Treatment 2 placeholder is `e.g., Placebo`
- [x] PASS: Effect and SE placeholders are both `0.00`
- [x] PASS: SE input enforces a minimum of `0.001`
- [x] PASS: Remove-study button tooltip is `Remove study`
- [x] PASS: Remove-study button is disabled when only 2 study rows remain
- [x] PASS: Add-row link label is `Add Study`
- [x] PASS: Run button label is `Run NMA`
- [x] PASS: Run button is disabled when any validation error exists
- [x] PASS: Only the first validation error string is rendered inline beside the run button
- [x] PASS: Validation error text can be `At least 2 complete studies are required.`
- [x] PASS: Validation error text can be `Study "{studyId}" compares a treatment to itself.`
- [x] PASS: Validation error text can be `Study "{studyId}" has invalid effect value.`
- [x] PASS: Validation error text can be `Study "{studyId}" has invalid SE (must be > 0).`
- [x] PASS: Successful NMA run always switches the active result tab back to `league`
- [x] PASS: Result tabs are `League Table`, `Network Plot`, `Forest Plot`, `Inconsistency`, and `Rankings`
- [x] PASS: League-tab export action label is `Export CSV`
- [x] PASS: League-table export filename is `nma-league-table.csv`
- [x] PASS: Result status text shows `Random-effects | tau² = {value} | {N} treatments` for random models
- [x] PASS: Result status text shows `Fixed-effect model | {N} treatments` for fixed models
- [x] PASS: Forest-tab reference selector label is `Reference:`
- [x] PASS: Forest-tab reference select defaults to the first treatment when no explicit reference has been chosen
- [x] PASS: Forest plot title is `NMA Forest Plot`
