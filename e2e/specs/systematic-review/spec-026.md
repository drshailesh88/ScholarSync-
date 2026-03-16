# systematic-review — Spec 026

STATUS: PARTIAL
TESTED: 35/35
PASS: 3
FAIL: 32
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Living Review Panel
- [ ] FAIL: `Cancel` button hides the form without resetting the selected frequency
- [ ] FAIL: Successful create hides the form and clears `newSearchString`
- [ ] FAIL: Successful create does not render a dedicated toast or banner; it simply refetches the alerts list
- [ ] FAIL: `lastCheckResult` success banner is only shown after the `check_now` action returns a result payload
- [ ] FAIL: `lastCheckResult` banner headline is `Check complete.`
- [ ] FAIL: `lastCheckResult` banner includes a `Dismiss` button that clears only the local summary card
- [ ] FAIL: Alerts empty state copy is `No search alerts yet. Create one to automatically check for new papers.`
- [ ] FAIL: Alert search string is displayed in a monospaced block with `line-clamp-2`
- [ ] FAIL: Active alert rows show `Last:` date only when `lastChecked` exists
- [ ] FAIL: Active alert rows show `Next:` date only when `nextCheck` exists and status is `active`
- [ ] FAIL: `Check now` action sets a row-specific spinner only for the alert being checked
- [ ] FAIL: Pause/resume controls switch by status: `Pause` appears only for active alerts, `Resume` appears for non-active alerts
- [ ] FAIL: Delete action does not ask for confirmation in the current component
- [ ] FAIL: Pause, resume, check-now, and delete success paths refetch the alerts list without showing a dedicated success toast
- [ ] FAIL: Footer explainer starts with `How it works:` and says alerts re-run the PubMed search at the selected frequency
#### Second-Pass Verified Behavior Corrections
- [ ] FAIL: Screening PDF viewer shows keyboard shortcut hints for `Esc`, `I`, `E`, and `U`, but this component does not register matching keyboard handlers in the current source
- [ ] FAIL: Screening PDF viewer exclusion reason form is only forced open from the `Exclude` button while the viewer is in `full-text` mode
- [ ] FAIL: Screening PDF viewer `Exclude` action in `title-abstract` mode does not capture a reason before submitting
- [x] PASS: Protocol export buttons call `GET /api/systematic-review/protocol?format={format}` without supplying the `protocol` query payload that the route currently requires
- [x] PASS: Manuscript panel only uses client-side markdown export; the `GET /api/systematic-review/manuscript` export path is not used by the panel
- [ ] FAIL: Manuscript DOCX export sanitizes the filename from the provided title, but the panel always passes the fixed title `Systematic Review Manuscript Draft`
- [ ] FAIL: Living Review panel never exposes the API's `update_frequency` action in the current UI
- [ ] FAIL: Alerts route supports `update_frequency`, but the panel only offers `pause`, `resume`, `check_now`, and `delete`
- [x] PASS: Data Extraction inline edits do not call `GET` or `POST /api/systematic-review/extract`; edited values are session-local until a new extraction or reload replaces them
- [ ] FAIL: NMA saved-result loading failure is intentionally non-blocking; the UI falls back to manual entry without a blocking error state
#### Activity Feed — Sidebar Rendering Details
- [ ] FAIL: Activity feed is a collapsible sidebar, not inline in the page layout
- [ ] FAIL: Collapsed state renders a fixed button on the right side of the viewport at vertical center
- [ ] FAIL: Collapsed button uses Lightning icon (weight bold, size 16) and title `Open activity feed`
- [ ] FAIL: Collapsed button entry count badge shows exact count when ≤ 9, or `9+` when entries exceed 9
- [ ] FAIL: Expanded sidebar is 320px wide (`w-80`), slides in from right with `animate-in slide-in-from-right` animation
- [ ] FAIL: Expanded sidebar header text is exactly `Activity Feed` with Lightning icon in brand color
- [ ] FAIL: Expanded sidebar header shows entry count badge in brand styling when entries exist
- [ ] FAIL: Expanded sidebar close button uses X icon (weight bold, size 14)
- [ ] FAIL: Empty feed text is `No activity yet. Actions by collaborators will appear here in real time.`
- [ ] FAIL: Empty feed shows a large Lightning icon (weight light, size 32) above the text
