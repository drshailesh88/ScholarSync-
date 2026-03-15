# systematic-review — Spec 017

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Protocol and PROSPERO Panels — Detailed Behavior
- [ ] Empty auto field placeholder is `Auto-populated — edit if needed`
- [ ] Footer help text explicitly tells the user to use `Copy All` or `Download as TXT` for transfer into PROSPERO
#### Export, Living Review, and Other Advanced Panels
- [ ] Export References format buttons are `RIS`, `BibTeX`, `EndNote XML`, and `CSV`
- [ ] Export filter buttons are `All`, `Included`, and `Excluded`
- [ ] Export button label changes to `Download {FORMAT}` based on the selected export format
- [ ] Export button label changes to `Exporting...` while the reference export request is in flight
- [ ] Exported reference filename extension is `.bib` for BibTeX and `.xml` for EndNote XML
- [ ] RevMan export section is hidden behind `Prepare RevMan Export` until package generation succeeds
- [ ] Successful RevMan generation exposes 4 downloadable cards: Study Characteristics, Risk of Bias, Outcome Data, and Excluded Studies
- [ ] RevMan CSV filenames are hard-coded per card and downloaded individually
- [ ] RevMan package can be cleared with `Regenerate export`
- [ ] Living Review new-alert form is hidden by default
- [ ] New alert frequency default is `weekly`
- [ ] Living Review prefill only uses `reviewConfig.searchStrategy.pubmedQuery` when that property exists
- [ ] New alert creation requires a non-empty search string
- [ ] `New Alert` button in the header toggles the create form visibility
- [ ] Alert check-now action sets a temporary `checkingId` only for the active alert row
- [ ] Living Review `check_now` success stores a `lastCheckResult` summary card in local state
- [ ] Deleting an alert refetches the alerts list and does not show a separate confirmation modal in the current component
- [ ] GRADE panel supports row expansion for outcome-specific domain detail
- [ ] GRADE panel exposes `Export CSV` with its own export-loading state
- [ ] Manuscript panel has separate `Generate All Sections`, `Export Markdown`, and DOCX export actions
- [ ] Manuscript DOCX export has its own `Exporting...` state separate from markdown export
- [ ] Snowballing panel falls back to all project papers when there are no explicitly included papers
- [ ] Unified RoB panel defaults to its dashboard sub-view and supports CSV export from the dashboard summary
#### Store and API Persistence Details
- [ ] Systematic-review persisted store key is `scholarsync-systematic-review`
- [ ] Store persistence includes `projectId`, `projectTitle`, `activeTab`, `reviewStage`, and `pico`
- [ ] Store persistence intentionally excludes `criteria` to avoid stale criteria leaking across projects
- [ ] `clearProject()` resets active tab to `strategy` and review stage to `search_strategy`
- [ ] `GET /api/systematic-review/projects` orders projects by `updated_at DESC NULLS LAST`
- [ ] Projects API computes screening progress from `screeningDecisions / projectPapers`
- [ ] `POST /api/systematic-review/config` creates a `projects` row with `project_type: "systematic_review"` and `status: "planning"`
- [ ] New-config POST initializes `searchDatabases` to `["pubmed"]`
- [ ] New-config POST initializes `reviewStage` to `search_strategy`
- [ ] `PUT /api/systematic-review/config` only includes provided fields in its update payload
