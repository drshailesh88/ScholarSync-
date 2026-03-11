# systematic-review — Spec 021

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Meta-Analysis Panel
- [ ] Meta-analysis panel defaults `model` to `random`
- [ ] Meta-analysis panel defaults `outcomeMeasure` to an empty string
- [ ] Meta-analysis panel initializes with 3 empty study rows rather than 1 or 2
- [ ] Outcome placeholder is `e.g., HbA1c reduction at 12 months`
- [ ] Effect-type buttons are `Odds Ratio`, `Risk Ratio`, `Std. Mean Diff`, `Mean Difference`, and `Risk Difference`
- [ ] Model buttons are exactly `Fixed` and `Random`
- [ ] Trim-and-fill checkbox label is `Include trim-and-fill analysis`
- [ ] Study-table headers are `Study Label`, `Effect(log optional)`, `SE`, `95% CI Lower`, `95% CI Upper`, and `Subgroup`
- [ ] Study-label placeholder is `Study {N}`
- [ ] Numeric placeholders in effect and SE inputs are `0.00`
- [ ] CI placeholders are `auto`
- [ ] Subgroup placeholder is `Group`
- [ ] Confidence interval values auto-compute on blur of the effect and SE inputs
- [ ] Remove-study control is disabled when only 2 study rows remain
- [ ] Primary run button label is `Run Meta-Analysis`
- [ ] Primary run button label changes to `Running...` while the standard analysis request is in flight
- [ ] Standard-analysis precheck error is `At least 2 complete studies are required`
- [ ] Standard-analysis network failure fallback shown to the user is `Analysis failed`
- [ ] Result tabs are exactly `Main`, `Subgroup`, and `Sensitivity`
- [ ] Main-result summary cards are `Studies`, `Pooled {effectType}`, `I²`, and `p-value`
- [ ] Detailed main-result text appends `(potential publication bias)` when Egger's test p-value is below 0.1
- [ ] Forest plot title is `Forest Plot — {analysisName}`
- [ ] Funnel plot title is `Funnel Plot — {analysisName}`
- [ ] Funnel plot title appends `({N} imputed studies)` when trim-and-fill returns imputed studies
- [ ] Trim-and-fill result block title is `Trim-and-Fill Adjusted Estimate`
- [ ] Trim-and-fill helper text says `{N} studies imputed to correct for asymmetry`
- [ ] Subgroup tab helper text says each subgroup needs at least 2 studies and the analysis needs at least 2 subgroups
- [ ] Subgroup chip counts render in amber styling when a subgroup has fewer than 2 studies
- [ ] Subgroup run button label is `Run Subgroup Analysis`
- [ ] Subgroup in-flight label is `Running...`
- [ ] Subgroup validation error is `At least 2 groups with 2+ studies each are required. Assign studies to groups using the Subgroup column.`
- [ ] Subgroup forest plot title format is `Subgroup: {groupName} ({studyCount} studies)`
- [ ] Subgroup comparison block title is `Test for Subgroup Differences`
- [ ] Sensitivity tab title is `Leave-One-Out Sensitivity Analysis`
- [ ] Sensitivity helper text says the analysis requires at least 3 complete studies
