# deep-research — Spec 002

STATUS: PARTIAL
TESTED: 35/35
PASS: 17
FAIL: 18
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Plan Preview State
#### Perspective List
- [x] PASS: Editable perspective name fields
- [x] PASS: Chevron toggle to expand/collapse each perspective
- [ ] FAIL: Expanded perspectives show search queries section
#### Search Query Editing
- [ ] FAIL: Each perspective has 3–4 search queries by default
- [ ] FAIL: Query text displayed in editable input fields
- [x] PASS: **"Add query"** link (Plus icon, lowercase) appends new empty query
- [ ] FAIL: Trash icon button (icon-only, no text label) visible when >1 query exists
- [ ] FAIL: Clicking Trash icon deletes that query row
#### Actions
- [x] PASS: **Regenerate** button (top right) — re-generates perspectives
- [x] PASS: The page re-fetches perspectives, but it does not pass `isRegenerating`, so the button never shows its built-in spinner state
- [ ] FAIL: Replaces perspectives with new set
- [ ] FAIL: **Confirm & Start Research** button (bottom right, blue with Play icon)
- [ ] FAIL: Sends confirmed perspectives to execute API
- [x] PASS: Transitions to `running` state
- [x] PASS: **Stop** button (red) — cancels and returns to `idle`

### Running State — Progress & Streaming
#### Progress Stepper (Left Sidebar)
- [x] PASS: Progress-bar UI exists, but the live execute route does not send numeric `progress`, so the bar stays hidden until the final report sets 100%
- [ ] FAIL: 9 stages displayed in vertical timeline:
#### Stage Icons
- [ ] FAIL: Connector lines between stages
- [ ] FAIL: Current message text below active stage
- [ ] FAIL: Stages transition: pending → active → completed sequentially
#### Streaming Content (Right Side)
- [x] PASS: The current live execute route does not emit `section` chunks, so no progressive markdown preview appears during running
- [x] PASS: A dead `streamingSections` preview path exists in the page, but it is not exercised by the current server routes
- [x] PASS: Running-state loading UI shows a pulsing Microscope icon (`animate-pulse`)
- [x] PASS: The right side stays on the loading placeholder until the final `report` event arrives
#### Abort
- [x] PASS: Stop button (red) visible during running
- [ ] FAIL: Clicking Stop aborts fetch request
- [x] PASS: Returns to `idle` state
- [x] PASS: Stop clears `planPerspectives` and returns to `idle`, but it does not explicitly reset progress/message/streaming state

### Done State — Report Display
- [ ] FAIL: Topic header shows the topic plus a metadata line with `{mode} mode` and `{totalSources} sources analyzed`
- [ ] FAIL: Full report rendered (markdown or legacy card format)
- [ ] FAIL: "Start New Research" button (center, secondary style) returns to `idle`
- [ ] FAIL: Export buttons visible in header
- [x] PASS: Save to Library button visible in header

### Research Document — Markdown Report
#### Markdown Rendering
- [x] PASS: Headings (h1–h5) styled with correct sizes and scroll margins
- [ ] FAIL: Paragraphs with proper spacing and line-height (1.6)
