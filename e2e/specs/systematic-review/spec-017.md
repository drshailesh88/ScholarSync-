# systematic-review — Spec 017

STATUS: PARTIAL
TESTED: 35/35
PASS: 0
FAIL: 35
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Protocol and PROSPERO Panels — Detailed Behavior
- [ ] FAIL: Empty auto field placeholder is `Auto-populated — edit if needed`
- [ ] FAIL: Footer help text explicitly tells the user to use `Copy All` or `Download as TXT` for transfer into PROSPERO
#### Export, Living Review, and Other Advanced Panels
- [ ] FAIL: Export References format buttons are `RIS`, `BibTeX`, `EndNote XML`, and `CSV`
- [ ] FAIL: Export filter buttons are `All`, `Included`, and `Excluded`
- [ ] FAIL: Export button label changes to `Download {FORMAT}` based on the selected export format
- [ ] FAIL: Export button label changes to `Exporting...` while the reference export request is in flight
- [ ] FAIL: Exported reference filename extension is `.bib` for BibTeX and `.xml` for EndNote XML
- [ ] FAIL: RevMan export section is hidden behind `Prepare RevMan Export` until package generation succeeds
- [ ] FAIL: Successful RevMan generation exposes 4 downloadable cards: Study Characteristics, Risk of Bias, Outcome Data, and Excluded Studies
- [ ] FAIL: RevMan CSV filenames are hard-coded per card and downloaded individually
- [ ] FAIL: RevMan package can be cleared with `Regenerate export`
- [ ] FAIL: Living Review new-alert form is hidden by default
- [ ] FAIL: New alert frequency default is `weekly`
- [ ] FAIL: Living Review prefill only uses `reviewConfig.searchStrategy.pubmedQuery` when that property exists
- [ ] FAIL: New alert creation requires a non-empty search string
- [ ] FAIL: `New Alert` button in the header toggles the create form visibility
- [ ] FAIL: Alert check-now action sets a temporary `checkingId` only for the active alert row
- [ ] FAIL: Living Review `check_now` success stores a `lastCheckResult` summary card in local state
- [ ] FAIL: Deleting an alert refetches the alerts list and does not show a separate confirmation modal in the current component
- [ ] FAIL: GRADE panel supports row expansion for outcome-specific domain detail
- [ ] FAIL: GRADE panel exposes `Export CSV` with its own export-loading state
- [ ] FAIL: Manuscript panel has separate `Generate All Sections`, `Export Markdown`, and DOCX export actions
- [ ] FAIL: Manuscript DOCX export has its own `Exporting...` state separate from markdown export
- [ ] FAIL: Snowballing panel falls back to all project papers when there are no explicitly included papers
- [ ] FAIL: Unified RoB panel defaults to its dashboard sub-view and supports CSV export from the dashboard summary
#### Store and API Persistence Details
- [ ] FAIL: Systematic-review persisted store key is `scholarsync-systematic-review`
- [ ] FAIL: Store persistence includes `projectId`, `projectTitle`, `activeTab`, `reviewStage`, and `pico`
- [ ] FAIL: Store persistence intentionally excludes `criteria` to avoid stale criteria leaking across projects
- [ ] FAIL: `clearProject()` resets active tab to `strategy` and review stage to `search_strategy`
- [ ] FAIL: `GET /api/systematic-review/projects` orders projects by `updated_at DESC NULLS LAST`
- [ ] FAIL: Projects API computes screening progress from `screeningDecisions / projectPapers`
- [ ] FAIL: `POST /api/systematic-review/config` creates a `projects` row with `project_type: "systematic_review"` and `status: "planning"`
- [ ] FAIL: New-config POST initializes `searchDatabases` to `["pubmed"]`
- [ ] FAIL: New-config POST initializes `reviewStage` to `search_strategy`
- [ ] FAIL: `PUT /api/systematic-review/config` only includes provided fields in its update payload
