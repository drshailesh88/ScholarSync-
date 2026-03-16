# systematic-review — Spec 023

STATUS: PARTIAL
TESTED: 35/35
PASS: 1
FAIL: 34
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Network Meta-Analysis Panel
- [ ] FAIL: Inconsistency tab header is `Node-Splitting Inconsistency Test`
- [ ] FAIL: Inconsistency empty-state text says no closed loops with both direct and indirect evidence were found
- [ ] FAIL: Inconsistency rows show `Inconsistent` when p-value is below 0.05
- [ ] FAIL: Inconsistency rows show `Consistent` when p-value is 0.05 or higher
- [x] PASS: Rankings tab header is `Treatment Rankings (P-scores)`
- [ ] FAIL: Rankings helper note cites `Ruecker & Schwarzer 2015`
#### GRADE Panel
- [ ] FAIL: GRADE panel initializes with `selectedOutcome` as an empty string
- [ ] FAIL: GRADE panel initializes with `selectedAnalysisId` as `null`
- [ ] FAIL: GRADE panel keeps `expandedRow` collapsed by default
- [ ] FAIL: Outcome selector is only rendered when at least one saved meta-analysis exists
- [ ] FAIL: Outcome selector placeholder option is `Select an outcome...`
- [ ] FAIL: Previously assessed outcomes are prefixed with `[Done] ` in the outcome selector
- [ ] FAIL: Free-text outcome input is always shown even when the selector is available
- [ ] FAIL: Free-text input placeholder is `Or type an outcome name...`
- [ ] FAIL: `Assess Certainty` button is disabled when the trimmed outcome value is empty
- [ ] FAIL: `Assess Certainty` button is disabled during initial panel loading
- [ ] FAIL: `Assess Certainty` button is disabled while an assessment request is in flight
- [ ] FAIL: `Assess Certainty` keeps the label `Assess Certainty` even while the icon swaps to a spinner
- [ ] FAIL: `Export CSV` button is hidden until at least one GRADE assessment exists
- [ ] FAIL: `Export CSV` shows a spinner icon but keeps the text `Export CSV` while exporting
- [ ] FAIL: Refresh button always remains visible, even when no assessments exist yet
- [ ] FAIL: Empty state headline is `No GRADE assessments yet.`
- [ ] FAIL: Empty state helper text says `Run a meta-analysis first, then return here to assess the certainty of evidence.` when no meta-analyses exist
- [ ] FAIL: Empty state helper text says `Select an outcome above or type one in, then click "Assess Certainty" to begin.` when meta-analyses exist
- [ ] FAIL: Initial loading message is `Loading assessments...`
- [ ] FAIL: Error banner uses a `Dismiss` button rather than auto-clearing
- [ ] FAIL: Summary section heading is `Summary of Findings`
- [ ] FAIL: Summary helper text says `{N} outcomes assessed. Click a row to expand domain rationale.`
- [ ] FAIL: Clicking an assessment row toggles the expanded domain-rationale view for that row
- [ ] FAIL: Effect estimate subtitle only renders under an outcome when an effect estimate exists
- [ ] FAIL: Participant-count cell renders as `{studies} (n={participants})` only when total participants are available
- [ ] FAIL: Domain cells use a check icon for `no_concern`
- [ ] FAIL: Domain cells use a single down-arrow icon for `serious`
- [ ] FAIL: Domain cells use a double down-arrow icon for `very_serious`
- [ ] FAIL: Expanded-domain downgrade text is `(-1 level)` for a single-level downgrade
