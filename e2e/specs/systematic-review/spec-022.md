# systematic-review — Spec 022

STATUS: PARTIAL
TESTED: 35/35
PASS: 0
FAIL: 35
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Meta-Analysis Panel
- [ ] FAIL: Sensitivity run button label is `Run Leave-One-Out`
- [ ] FAIL: Sensitivity in-flight label is `Running...`
- [ ] FAIL: Sensitivity validation error is `At least 3 complete studies are required for leave-one-out analysis`
- [ ] FAIL: Leave-one-out result rows are visually highlighted when dropping that study changes the significance conclusion relative to the main analysis
#### Network Meta-Analysis Panel
- [ ] FAIL: Network meta-analysis panel initializes with 2 empty study rows
- [ ] FAIL: NMA panel defaults the model toggle to `fixed`
- [ ] FAIL: NMA panel shows a spinner-only loading state while fetching saved results, with no loading text
- [ ] FAIL: Failed saved-result GET requests do not block manual data entry and do not show a dedicated banner by default
- [ ] FAIL: Header title is `Network Meta-Analysis`
- [ ] FAIL: Header description explicitly references a graph-theoretical approach and `Ruecker 2012`
- [ ] FAIL: Study table headers are `Study ID`, `Treatment 1`, `Treatment 2`, `Effect (log)`, and `SE`
- [ ] FAIL: Study ID placeholder is `e.g., Smith 2020`
- [ ] FAIL: Treatment 1 placeholder is `e.g., Drug A`
- [ ] FAIL: Treatment 2 placeholder is `e.g., Placebo`
- [ ] FAIL: Effect and SE placeholders are both `0.00`
- [ ] FAIL: SE input enforces a minimum of `0.001`
- [ ] FAIL: Remove-study button tooltip is `Remove study`
- [ ] FAIL: Remove-study button is disabled when only 2 study rows remain
- [ ] FAIL: Add-row link label is `Add Study`
- [ ] FAIL: Run button label is `Run NMA`
- [ ] FAIL: Run button is disabled when any validation error exists
- [ ] FAIL: Only the first validation error string is rendered inline beside the run button
- [ ] FAIL: Validation error text can be `At least 2 complete studies are required.`
- [ ] FAIL: Validation error text can be `Study "{studyId}" compares a treatment to itself.`
- [ ] FAIL: Validation error text can be `Study "{studyId}" has invalid effect value.`
- [ ] FAIL: Validation error text can be `Study "{studyId}" has invalid SE (must be > 0).`
- [ ] FAIL: Successful NMA run always switches the active result tab back to `league`
- [ ] FAIL: Result tabs are `League Table`, `Network Plot`, `Forest Plot`, `Inconsistency`, and `Rankings`
- [ ] FAIL: League-tab export action label is `Export CSV`
- [ ] FAIL: League-table export filename is `nma-league-table.csv`
- [ ] FAIL: Result status text shows `Random-effects | tau² = {value} | {N} treatments` for random models
- [ ] FAIL: Result status text shows `Fixed-effect model | {N} treatments` for fixed models
- [ ] FAIL: Forest-tab reference selector label is `Reference:`
- [ ] FAIL: Forest-tab reference select defaults to the first treatment when no explicit reference has been chosen
- [ ] FAIL: Forest plot title is `NMA Forest Plot`
