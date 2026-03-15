# systematic-review — Spec 018

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Store and API Persistence Details
- [ ] Config GET requires `projectId` query param and returns 400 when it is missing
#### Unified Risk of Bias Panel
- [ ] Unified RoB panel initializes with `dashboard` sub-view before any tool-specific panel is opened
- [ ] Unified RoB panel initializes the tool filter to `all`
- [ ] Panel title renders as `Unified Risk of Bias Dashboard`
- [ ] Header description explicitly says the panel auto-detects study type and routes papers to RoB 2, ROBINS-I, or QUADAS-2
- [ ] Dashboard action button label is `Auto-Assign Tools`
- [ ] Dashboard action button label is `Export CSV`
- [ ] Dashboard action button label is `Refresh`
- [ ] `Auto-Assign Tools` is disabled while the panel is loading
- [ ] `Auto-Assign Tools` is disabled while auto-assignment is already running
- [ ] `Auto-Assign Tools` is disabled when the paper list is empty
- [ ] `Export CSV` is disabled until at least one assessment result exists across the three RoB tools
- [ ] `Refresh` shows a spinning refresh icon while the dashboard is loading
- [ ] Initial full-panel loading state only appears when `isLoading` is true and no papers have been loaded yet
- [ ] Initial loading message is exactly `Loading papers and assessments...`
- [ ] Included-paper load prefers papers with screening decision `include` or `included`
- [ ] If no papers are explicitly included yet, Unified RoB falls back to all imported papers instead of rendering an empty dashboard immediately
- [ ] Auto-assignment preserves a paper's manual override instead of overwriting it on subsequent auto-assign runs
- [ ] Papers with diagnostic-study heuristics are auto-assigned to `QUADAS-2`
- [ ] Papers with observational-study heuristics are auto-assigned to `ROBINS-I`
- [ ] Papers without a stronger heuristic fallback are auto-assigned to `RoB 2`
- [ ] Summary cards are `Included Papers`, `Assessed`, `Remaining`, and `Completion`
- [ ] Completion card rounds to a whole-number percentage
- [ ] Completion shows `0%` when no papers have been assigned a tool yet
- [ ] Tool distribution section header is `Tool Assignment Distribution`
- [ ] Tool distribution helper copy says the detected study type determines the suggested assessment tool
- [ ] Tool filter tabs are `All Papers`, `RoB 2 (N)`, `ROBINS-I (N)`, and `QUADAS-2 (N)`
- [ ] Filtered empty state message is `No papers match this filter.`
- [ ] Global empty state message is `No included papers found. Import and screen papers first.`
- [ ] Table columns are expand control, `Paper`, `Study Type`, `Assigned Tool`, `Status`, and `Overall Judgment`
- [ ] Paper titles in the table truncate after 55 characters with an ellipsis
- [ ] Year is appended to the table title as ` (YEAR)` only when a year exists
- [ ] Assigned-tool select options are exactly `RoB 2`, `ROBINS-I`, and `QUADAS-2`
- [ ] Manual tool overrides add `overridden` helper text below the select and apply a highlighted ring style
- [ ] Status cell shows `Done` with a success icon when a result exists for the assigned tool
