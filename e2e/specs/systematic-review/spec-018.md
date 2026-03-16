# systematic-review — Spec 018

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Store and API Persistence Details
- [x] PASS: Config GET requires `projectId` query param and returns 400 when it is missing
#### Unified Risk of Bias Panel
- [x] PASS: Unified RoB panel initializes with `dashboard` sub-view before any tool-specific panel is opened
- [x] PASS: Unified RoB panel initializes the tool filter to `all`
- [x] PASS: Panel title renders as `Unified Risk of Bias Dashboard`
- [x] PASS: Header description explicitly says the panel auto-detects study type and routes papers to RoB 2, ROBINS-I, or QUADAS-2
- [x] PASS: Dashboard action button label is `Auto-Assign Tools`
- [x] PASS: Dashboard action button label is `Export CSV`
- [x] PASS: Dashboard action button label is `Refresh`
- [x] PASS: `Auto-Assign Tools` is disabled while the panel is loading
- [x] PASS: `Auto-Assign Tools` is disabled while auto-assignment is already running
- [x] PASS: `Auto-Assign Tools` is disabled when the paper list is empty
- [x] PASS: `Export CSV` is disabled until at least one assessment result exists across the three RoB tools
- [x] PASS: `Refresh` shows a spinning refresh icon while the dashboard is loading
- [x] PASS: Initial full-panel loading state only appears when `isLoading` is true and no papers have been loaded yet
- [x] PASS: Initial loading message is exactly `Loading papers and assessments...`
- [x] PASS: Included-paper load prefers papers with screening decision `include` or `included`
- [x] PASS: If no papers are explicitly included yet, Unified RoB falls back to all imported papers instead of rendering an empty dashboard immediately
- [x] PASS: Auto-assignment preserves a paper's manual override instead of overwriting it on subsequent auto-assign runs
- [x] PASS: Papers with diagnostic-study heuristics are auto-assigned to `QUADAS-2`
- [x] PASS: Papers with observational-study heuristics are auto-assigned to `ROBINS-I`
- [x] PASS: Papers without a stronger heuristic fallback are auto-assigned to `RoB 2`
- [x] PASS: Summary cards are `Included Papers`, `Assessed`, `Remaining`, and `Completion`
- [x] PASS: Completion card rounds to a whole-number percentage
- [x] PASS: Completion shows `0%` when no papers have been assigned a tool yet
- [x] PASS: Tool distribution section header is `Tool Assignment Distribution`
- [x] PASS: Tool distribution helper copy says the detected study type determines the suggested assessment tool
- [x] PASS: Tool filter tabs are `All Papers`, `RoB 2 (N)`, `ROBINS-I (N)`, and `QUADAS-2 (N)`
- [x] PASS: Filtered empty state message is `No papers match this filter.`
- [x] PASS: Global empty state message is `No included papers found. Import and screen papers first.`
- [x] PASS: Table columns are expand control, `Paper`, `Study Type`, `Assigned Tool`, `Status`, and `Overall Judgment`
- [x] PASS: Paper titles in the table truncate after 55 characters with an ellipsis
- [x] PASS: Year is appended to the table title as ` (YEAR)` only when a year exists
- [x] PASS: Assigned-tool select options are exactly `RoB 2`, `ROBINS-I`, and `QUADAS-2`
- [x] PASS: Manual tool overrides add `overridden` helper text below the select and apply a highlighted ring style
- [x] PASS: Status cell shows `Done` with a success icon when a result exists for the assigned tool
