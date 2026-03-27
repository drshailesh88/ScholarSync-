# systematic-review — Spec 023

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Network Meta-Analysis Panel
- [x] PASS: Inconsistency tab header is `Node-Splitting Inconsistency Test`
- [x] PASS: Inconsistency empty-state text says no closed loops with both direct and indirect evidence were found
- [x] PASS: Inconsistency rows show `Inconsistent` when p-value is below 0.05
- [x] PASS: Inconsistency rows show `Consistent` when p-value is 0.05 or higher
- [x] PASS: Rankings tab header is `Treatment Rankings (P-scores)`
- [x] PASS: Rankings helper note cites `Ruecker & Schwarzer 2015`
#### GRADE Panel
- [x] PASS: GRADE panel initializes with `selectedOutcome` as an empty string
- [x] PASS: GRADE panel initializes with `selectedAnalysisId` as `null`
- [x] PASS: GRADE panel keeps `expandedRow` collapsed by default
- [x] PASS: Outcome selector is only rendered when at least one saved meta-analysis exists
- [x] PASS: Outcome selector placeholder option is `Select an outcome...`
- [x] PASS: Previously assessed outcomes are prefixed with `[Done] ` in the outcome selector
- [x] PASS: Free-text outcome input is always shown even when the selector is available
- [x] PASS: Free-text input placeholder is `Or type an outcome name...`
- [x] PASS: `Assess Certainty` button is disabled when the trimmed outcome value is empty
- [x] PASS: `Assess Certainty` button is disabled during initial panel loading
- [x] PASS: `Assess Certainty` button is disabled while an assessment request is in flight
- [x] PASS: `Assess Certainty` keeps the label `Assess Certainty` even while the icon swaps to a spinner
- [x] PASS: `Export CSV` button is hidden until at least one GRADE assessment exists
- [x] PASS: `Export CSV` shows a spinner icon but keeps the text `Export CSV` while exporting
- [x] PASS: Refresh button always remains visible, even when no assessments exist yet
- [x] PASS: Empty state headline is `No GRADE assessments yet.`
- [x] PASS: Empty state helper text says `Run a meta-analysis first, then return here to assess the certainty of evidence.` when no meta-analyses exist
- [x] PASS: Empty state helper text says `Select an outcome above or type one in, then click "Assess Certainty" to begin.` when meta-analyses exist
- [x] PASS: Initial loading message is `Loading assessments...`
- [x] PASS: Error banner uses a `Dismiss` button rather than auto-clearing
- [x] PASS: Summary section heading is `Summary of Findings`
- [x] PASS: Summary helper text says `{N} outcomes assessed. Click a row to expand domain rationale.`
- [x] PASS: Clicking an assessment row toggles the expanded domain-rationale view for that row
- [x] PASS: Effect estimate subtitle only renders under an outcome when an effect estimate exists
- [x] PASS: Participant-count cell renders as `{studies} (n={participants})` only when total participants are available
- [x] PASS: Domain cells use a check icon for `no_concern`
- [x] PASS: Domain cells use a single down-arrow icon for `serious`
- [x] PASS: Domain cells use a double down-arrow icon for `very_serious`
- [x] PASS: Expanded-domain downgrade text is `(-1 level)` for a single-level downgrade
