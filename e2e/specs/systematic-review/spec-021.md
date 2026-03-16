# systematic-review — Spec 021

STATUS: PARTIAL
TESTED: 35/35
PASS: 3
FAIL: 32
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Meta-Analysis Panel
- [ ] FAIL: Meta-analysis panel defaults `model` to `random`
- [ ] FAIL: Meta-analysis panel defaults `outcomeMeasure` to an empty string
- [ ] FAIL: Meta-analysis panel initializes with 3 empty study rows rather than 1 or 2
- [x] PASS: Outcome placeholder is `e.g., HbA1c reduction at 12 months`
- [ ] FAIL: Effect-type buttons are `Odds Ratio`, `Risk Ratio`, `Std. Mean Diff`, `Mean Difference`, and `Risk Difference`
- [ ] FAIL: Model buttons are exactly `Fixed` and `Random`
- [ ] FAIL: Trim-and-fill checkbox label is `Include trim-and-fill analysis`
- [ ] FAIL: Study-table headers are `Study Label`, `Effect(log optional)`, `SE`, `95% CI Lower`, `95% CI Upper`, and `Subgroup`
- [ ] FAIL: Study-label placeholder is `Study {N}`
- [ ] FAIL: Numeric placeholders in effect and SE inputs are `0.00`
- [ ] FAIL: CI placeholders are `auto`
- [ ] FAIL: Subgroup placeholder is `Group`
- [ ] FAIL: Confidence interval values auto-compute on blur of the effect and SE inputs
- [ ] FAIL: Remove-study control is disabled when only 2 study rows remain
- [ ] FAIL: Primary run button label is `Run Meta-Analysis`
- [ ] FAIL: Primary run button label changes to `Running...` while the standard analysis request is in flight
- [ ] FAIL: Standard-analysis precheck error is `At least 2 complete studies are required`
- [ ] FAIL: Standard-analysis network failure fallback shown to the user is `Analysis failed`
- [ ] FAIL: Result tabs are exactly `Main`, `Subgroup`, and `Sensitivity`
- [ ] FAIL: Main-result summary cards are `Studies`, `Pooled {effectType}`, `I²`, and `p-value`
- [ ] FAIL: Detailed main-result text appends `(potential publication bias)` when Egger's test p-value is below 0.1
- [ ] FAIL: Forest plot title is `Forest Plot — {analysisName}`
- [ ] FAIL: Funnel plot title is `Funnel Plot — {analysisName}`
- [x] PASS: Funnel plot title appends `({N} imputed studies)` when trim-and-fill returns imputed studies
- [ ] FAIL: Trim-and-fill result block title is `Trim-and-Fill Adjusted Estimate`
- [x] PASS: Trim-and-fill helper text says `{N} studies imputed to correct for asymmetry`
- [ ] FAIL: Subgroup tab helper text says each subgroup needs at least 2 studies and the analysis needs at least 2 subgroups
- [ ] FAIL: Subgroup chip counts render in amber styling when a subgroup has fewer than 2 studies
- [ ] FAIL: Subgroup run button label is `Run Subgroup Analysis`
- [ ] FAIL: Subgroup in-flight label is `Running...`
- [ ] FAIL: Subgroup validation error is `At least 2 groups with 2+ studies each are required. Assign studies to groups using the Subgroup column.`
- [ ] FAIL: Subgroup forest plot title format is `Subgroup: {groupName} ({studyCount} studies)`
- [ ] FAIL: Subgroup comparison block title is `Test for Subgroup Differences`
- [ ] FAIL: Sensitivity tab title is `Leave-One-Out Sensitivity Analysis`
- [ ] FAIL: Sensitivity helper text says the analysis requires at least 3 complete studies
