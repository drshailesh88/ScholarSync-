# systematic-review — Spec 018

STATUS: PARTIAL
TESTED: 35/35
PASS: 0
FAIL: 35
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Store and API Persistence Details
- [ ] FAIL: Config GET requires `projectId` query param and returns 400 when it is missing
#### Unified Risk of Bias Panel
- [ ] FAIL: Unified RoB panel initializes with `dashboard` sub-view before any tool-specific panel is opened
- [ ] FAIL: Unified RoB panel initializes the tool filter to `all`
- [ ] FAIL: Panel title renders as `Unified Risk of Bias Dashboard`
- [ ] FAIL: Header description explicitly says the panel auto-detects study type and routes papers to RoB 2, ROBINS-I, or QUADAS-2
- [ ] FAIL: Dashboard action button label is `Auto-Assign Tools`
- [ ] FAIL: Dashboard action button label is `Export CSV`
- [ ] FAIL: Dashboard action button label is `Refresh`
- [ ] FAIL: `Auto-Assign Tools` is disabled while the panel is loading
- [ ] FAIL: `Auto-Assign Tools` is disabled while auto-assignment is already running
- [ ] FAIL: `Auto-Assign Tools` is disabled when the paper list is empty
- [ ] FAIL: `Export CSV` is disabled until at least one assessment result exists across the three RoB tools
- [ ] FAIL: `Refresh` shows a spinning refresh icon while the dashboard is loading
- [ ] FAIL: Initial full-panel loading state only appears when `isLoading` is true and no papers have been loaded yet
- [ ] FAIL: Initial loading message is exactly `Loading papers and assessments...`
- [ ] FAIL: Included-paper load prefers papers with screening decision `include` or `included`
- [ ] FAIL: If no papers are explicitly included yet, Unified RoB falls back to all imported papers instead of rendering an empty dashboard immediately
- [ ] FAIL: Auto-assignment preserves a paper's manual override instead of overwriting it on subsequent auto-assign runs
- [ ] FAIL: Papers with diagnostic-study heuristics are auto-assigned to `QUADAS-2`
- [ ] FAIL: Papers with observational-study heuristics are auto-assigned to `ROBINS-I`
- [ ] FAIL: Papers without a stronger heuristic fallback are auto-assigned to `RoB 2`
- [ ] FAIL: Summary cards are `Included Papers`, `Assessed`, `Remaining`, and `Completion`
- [ ] FAIL: Completion card rounds to a whole-number percentage
- [ ] FAIL: Completion shows `0%` when no papers have been assigned a tool yet
- [ ] FAIL: Tool distribution section header is `Tool Assignment Distribution`
- [ ] FAIL: Tool distribution helper copy says the detected study type determines the suggested assessment tool
- [ ] FAIL: Tool filter tabs are `All Papers`, `RoB 2 (N)`, `ROBINS-I (N)`, and `QUADAS-2 (N)`
- [ ] FAIL: Filtered empty state message is `No papers match this filter.`
- [ ] FAIL: Global empty state message is `No included papers found. Import and screen papers first.`
- [ ] FAIL: Table columns are expand control, `Paper`, `Study Type`, `Assigned Tool`, `Status`, and `Overall Judgment`
- [ ] FAIL: Paper titles in the table truncate after 55 characters with an ellipsis
- [ ] FAIL: Year is appended to the table title as ` (YEAR)` only when a year exists
- [ ] FAIL: Assigned-tool select options are exactly `RoB 2`, `ROBINS-I`, and `QUADAS-2`
- [ ] FAIL: Manual tool overrides add `overridden` helper text below the select and apply a highlighted ring style
- [ ] FAIL: Status cell shows `Done` with a success icon when a result exists for the assigned tool
