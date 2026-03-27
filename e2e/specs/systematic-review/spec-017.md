# systematic-review — Spec 017

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Protocol and PROSPERO Panels — Detailed Behavior
- [x] PASS: Empty auto field placeholder is `Auto-populated — edit if needed`
- [x] PASS: Footer help text explicitly tells the user to use `Copy All` or `Download as TXT` for transfer into PROSPERO
#### Export, Living Review, and Other Advanced Panels
- [x] PASS: Export References format buttons are `RIS`, `BibTeX`, `EndNote XML`, and `CSV`
- [x] PASS: Export filter buttons are `All`, `Included`, and `Excluded`
- [x] PASS: Export button label changes to `Download {FORMAT}` based on the selected export format
- [x] PASS: Export button label changes to `Exporting...` while the reference export request is in flight
- [x] PASS: Exported reference filename extension is `.bib` for BibTeX and `.xml` for EndNote XML
- [x] PASS: RevMan export section is hidden behind `Prepare RevMan Export` until package generation succeeds
- [x] PASS: Successful RevMan generation exposes 4 downloadable cards: Study Characteristics, Risk of Bias, Outcome Data, and Excluded Studies
- [x] PASS: RevMan CSV filenames are hard-coded per card and downloaded individually
- [x] PASS: RevMan package can be cleared with `Regenerate export`
- [x] PASS: Living Review new-alert form is hidden by default
- [x] PASS: New alert frequency default is `weekly`
- [x] PASS: Living Review prefill only uses `reviewConfig.searchStrategy.pubmedQuery` when that property exists
- [x] PASS: New alert creation requires a non-empty search string
- [x] PASS: `New Alert` button in the header toggles the create form visibility
- [x] PASS: Alert check-now action sets a temporary `checkingId` only for the active alert row
- [x] PASS: Living Review `check_now` success stores a `lastCheckResult` summary card in local state
- [x] PASS: Deleting an alert refetches the alerts list and does not show a separate confirmation modal in the current component
- [x] PASS: GRADE panel supports row expansion for outcome-specific domain detail
- [x] PASS: GRADE panel exposes `Export CSV` with its own export-loading state
- [x] PASS: Manuscript panel has separate `Generate All Sections`, `Export Markdown`, and DOCX export actions
- [x] PASS: Manuscript DOCX export has its own `Exporting...` state separate from markdown export
- [x] PASS: Snowballing panel falls back to all project papers when there are no explicitly included papers
- [x] PASS: Unified RoB panel defaults to its dashboard sub-view and supports CSV export from the dashboard summary
#### Store and API Persistence Details
- [x] PASS: Systematic-review persisted store key is `scholarsync-systematic-review`
- [x] PASS: Store persistence includes `projectId`, `projectTitle`, `activeTab`, `reviewStage`, and `pico`
- [x] PASS: Store persistence intentionally excludes `criteria` to avoid stale criteria leaking across projects
- [x] PASS: `clearProject()` resets active tab to `strategy` and review stage to `search_strategy`
- [x] PASS: `GET /api/systematic-review/projects` orders projects by `updated_at DESC NULLS LAST`
- [x] PASS: Projects API computes screening progress from `screeningDecisions / projectPapers`
- [x] PASS: `POST /api/systematic-review/config` creates a `projects` row with `project_type: "systematic_review"` and `status: "planning"`
- [x] PASS: New-config POST initializes `searchDatabases` to `["pubmed"]`
- [x] PASS: New-config POST initializes `reviewStage` to `search_strategy`
- [x] PASS: `PUT /api/systematic-review/config` only includes provided fields in its update payload
