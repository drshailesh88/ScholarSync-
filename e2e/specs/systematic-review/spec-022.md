# systematic-review — Spec 022

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Meta-Analysis Panel
- [ ] Sensitivity run button label is `Run Leave-One-Out`
- [ ] Sensitivity in-flight label is `Running...`
- [ ] Sensitivity validation error is `At least 3 complete studies are required for leave-one-out analysis`
- [ ] Leave-one-out result rows are visually highlighted when dropping that study changes the significance conclusion relative to the main analysis
#### Network Meta-Analysis Panel
- [ ] Network meta-analysis panel initializes with 2 empty study rows
- [ ] NMA panel defaults the model toggle to `fixed`
- [ ] NMA panel shows a spinner-only loading state while fetching saved results, with no loading text
- [ ] Failed saved-result GET requests do not block manual data entry and do not show a dedicated banner by default
- [ ] Header title is `Network Meta-Analysis`
- [ ] Header description explicitly references a graph-theoretical approach and `Ruecker 2012`
- [ ] Study table headers are `Study ID`, `Treatment 1`, `Treatment 2`, `Effect (log)`, and `SE`
- [ ] Study ID placeholder is `e.g., Smith 2020`
- [ ] Treatment 1 placeholder is `e.g., Drug A`
- [ ] Treatment 2 placeholder is `e.g., Placebo`
- [ ] Effect and SE placeholders are both `0.00`
- [ ] SE input enforces a minimum of `0.001`
- [ ] Remove-study button tooltip is `Remove study`
- [ ] Remove-study button is disabled when only 2 study rows remain
- [ ] Add-row link label is `Add Study`
- [ ] Run button label is `Run NMA`
- [ ] Run button is disabled when any validation error exists
- [ ] Only the first validation error string is rendered inline beside the run button
- [ ] Validation error text can be `At least 2 complete studies are required.`
- [ ] Validation error text can be `Study "{studyId}" compares a treatment to itself.`
- [ ] Validation error text can be `Study "{studyId}" has invalid effect value.`
- [ ] Validation error text can be `Study "{studyId}" has invalid SE (must be > 0).`
- [ ] Successful NMA run always switches the active result tab back to `league`
- [ ] Result tabs are `League Table`, `Network Plot`, `Forest Plot`, `Inconsistency`, and `Rankings`
- [ ] League-tab export action label is `Export CSV`
- [ ] League-table export filename is `nma-league-table.csv`
- [ ] Result status text shows `Random-effects | tau² = {value} | {N} treatments` for random models
- [ ] Result status text shows `Fixed-effect model | {N} treatments` for fixed models
- [ ] Forest-tab reference selector label is `Reference:`
- [ ] Forest-tab reference select defaults to the first treatment when no explicit reference has been chosen
- [ ] Forest plot title is `NMA Forest Plot`
