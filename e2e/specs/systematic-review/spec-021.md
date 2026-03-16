# systematic-review — Spec 021

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
- [x] PASS: Meta-analysis panel defaults `model` to `random`
- [x] PASS: Meta-analysis panel defaults `outcomeMeasure` to an empty string
- [x] PASS: Meta-analysis panel initializes with 3 empty study rows rather than 1 or 2
- [x] PASS: Outcome placeholder is `e.g., HbA1c reduction at 12 months`
- [x] PASS: Effect-type buttons are `Odds Ratio`, `Risk Ratio`, `Std. Mean Diff`, `Mean Difference`, and `Risk Difference`
- [x] PASS: Model buttons are exactly `Fixed` and `Random`
- [x] PASS: Trim-and-fill checkbox label is `Include trim-and-fill analysis`
- [x] PASS: Study-table headers are `Study Label`, `Effect(log optional)`, `SE`, `95% CI Lower`, `95% CI Upper`, and `Subgroup`
- [x] PASS: Study-label placeholder is `Study {N}`
- [x] PASS: Numeric placeholders in effect and SE inputs are `0.00`
- [x] PASS: CI placeholders are `auto`
- [x] PASS: Subgroup placeholder is `Group`
- [x] PASS: Confidence interval values auto-compute on blur of the effect and SE inputs
- [x] PASS: Remove-study control is disabled when only 2 study rows remain
- [x] PASS: Primary run button label is `Run Meta-Analysis`
- [x] PASS: Primary run button label changes to `Running...` while the standard analysis request is in flight
- [x] PASS: Standard-analysis precheck error is `At least 2 complete studies are required`
- [x] PASS: Standard-analysis network failure fallback shown to the user is `Analysis failed`
- [x] PASS: Result tabs are exactly `Main`, `Subgroup`, and `Sensitivity`
- [x] PASS: Main-result summary cards are `Studies`, `Pooled {effectType}`, `I²`, and `p-value`
- [x] PASS: Detailed main-result text appends `(potential publication bias)` when Egger's test p-value is below 0.1
- [x] PASS: Forest plot title is `Forest Plot — {analysisName}`
- [x] PASS: Funnel plot title is `Funnel Plot — {analysisName}`
- [x] PASS: Funnel plot title appends `({N} imputed studies)` when trim-and-fill returns imputed studies
- [x] PASS: Trim-and-fill result block title is `Trim-and-Fill Adjusted Estimate`
- [x] PASS: Trim-and-fill helper text says `{N} studies imputed to correct for asymmetry`
- [x] PASS: Subgroup tab helper text says each subgroup needs at least 2 studies and the analysis needs at least 2 subgroups
- [x] PASS: Subgroup chip counts render in amber styling when a subgroup has fewer than 2 studies
- [x] PASS: Subgroup run button label is `Run Subgroup Analysis`
- [x] PASS: Subgroup in-flight label is `Running...`
- [x] PASS: Subgroup validation error is `At least 2 groups with 2+ studies each are required. Assign studies to groups using the Subgroup column.`
- [x] PASS: Subgroup forest plot title format is `Subgroup: {groupName} ({studyCount} studies)`
- [x] PASS: Subgroup comparison block title is `Test for Subgroup Differences`
- [x] PASS: Sensitivity tab title is `Leave-One-Out Sensitivity Analysis`
- [x] PASS: Sensitivity helper text says the analysis requires at least 3 complete studies
