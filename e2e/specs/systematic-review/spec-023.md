# systematic-review — Spec 023

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Network Meta-Analysis Panel
- [ ] Inconsistency tab header is `Node-Splitting Inconsistency Test`
- [ ] Inconsistency empty-state text says no closed loops with both direct and indirect evidence were found
- [ ] Inconsistency rows show `Inconsistent` when p-value is below 0.05
- [ ] Inconsistency rows show `Consistent` when p-value is 0.05 or higher
- [ ] Rankings tab header is `Treatment Rankings (P-scores)`
- [ ] Rankings helper note cites `Ruecker & Schwarzer 2015`
#### GRADE Panel
- [ ] GRADE panel initializes with `selectedOutcome` as an empty string
- [ ] GRADE panel initializes with `selectedAnalysisId` as `null`
- [ ] GRADE panel keeps `expandedRow` collapsed by default
- [ ] Outcome selector is only rendered when at least one saved meta-analysis exists
- [ ] Outcome selector placeholder option is `Select an outcome...`
- [ ] Previously assessed outcomes are prefixed with `[Done] ` in the outcome selector
- [ ] Free-text outcome input is always shown even when the selector is available
- [ ] Free-text input placeholder is `Or type an outcome name...`
- [ ] `Assess Certainty` button is disabled when the trimmed outcome value is empty
- [ ] `Assess Certainty` button is disabled during initial panel loading
- [ ] `Assess Certainty` button is disabled while an assessment request is in flight
- [ ] `Assess Certainty` keeps the label `Assess Certainty` even while the icon swaps to a spinner
- [ ] `Export CSV` button is hidden until at least one GRADE assessment exists
- [ ] `Export CSV` shows a spinner icon but keeps the text `Export CSV` while exporting
- [ ] Refresh button always remains visible, even when no assessments exist yet
- [ ] Empty state headline is `No GRADE assessments yet.`
- [ ] Empty state helper text says `Run a meta-analysis first, then return here to assess the certainty of evidence.` when no meta-analyses exist
- [ ] Empty state helper text says `Select an outcome above or type one in, then click "Assess Certainty" to begin.` when meta-analyses exist
- [ ] Initial loading message is `Loading assessments...`
- [ ] Error banner uses a `Dismiss` button rather than auto-clearing
- [ ] Summary section heading is `Summary of Findings`
- [ ] Summary helper text says `{N} outcomes assessed. Click a row to expand domain rationale.`
- [ ] Clicking an assessment row toggles the expanded domain-rationale view for that row
- [ ] Effect estimate subtitle only renders under an outcome when an effect estimate exists
- [ ] Participant-count cell renders as `{studies} (n={participants})` only when total participants are available
- [ ] Domain cells use a check icon for `no_concern`
- [ ] Domain cells use a single down-arrow icon for `serious`
- [ ] Domain cells use a double down-arrow icon for `very_serious`
- [ ] Expanded-domain downgrade text is `(-1 level)` for a single-level downgrade
