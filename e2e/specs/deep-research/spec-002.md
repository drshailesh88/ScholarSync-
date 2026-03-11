# deep-research — Spec 002

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Plan Preview State
#### Perspective List
- [ ] Editable perspective name fields
- [ ] Chevron toggle to expand/collapse each perspective
- [ ] Expanded perspectives show search queries section
#### Search Query Editing
- [ ] Each perspective has 3–4 search queries by default
- [ ] Query text displayed in editable input fields
- [ ] **"Add query"** link (Plus icon, lowercase) appends new empty query
- [ ] Trash icon button (icon-only, no text label) visible when >1 query exists
- [ ] Clicking Trash icon deletes that query row
#### Actions
- [ ] **Regenerate** button (top right) — re-generates perspectives
- [ ] The page re-fetches perspectives, but it does not pass `isRegenerating`, so the button never shows its built-in spinner state
- [ ] Replaces perspectives with new set
- [ ] **Confirm & Start Research** button (bottom right, blue with Play icon)
- [ ] Sends confirmed perspectives to execute API
- [ ] Transitions to `running` state
- [ ] **Stop** button (red) — cancels and returns to `idle`

### Running State — Progress & Streaming
#### Progress Stepper (Left Sidebar)
- [ ] Progress-bar UI exists, but the live execute route does not send numeric `progress`, so the bar stays hidden until the final report sets 100%
- [ ] 9 stages displayed in vertical timeline:
#### Stage Icons
- [ ] Connector lines between stages
- [ ] Current message text below active stage
- [ ] Stages transition: pending → active → completed sequentially
#### Streaming Content (Right Side)
- [ ] The current live execute route does not emit `section` chunks, so no progressive markdown preview appears during running
- [ ] A dead `streamingSections` preview path exists in the page, but it is not exercised by the current server routes
- [ ] Running-state loading UI shows a pulsing Microscope icon (`animate-pulse`)
- [ ] The right side stays on the loading placeholder until the final `report` event arrives
#### Abort
- [ ] Stop button (red) visible during running
- [ ] Clicking Stop aborts fetch request
- [ ] Returns to `idle` state
- [ ] Stop clears `planPerspectives` and returns to `idle`, but it does not explicitly reset progress/message/streaming state

### Done State — Report Display
- [ ] Topic header shows the topic plus a metadata line with `{mode} mode` and `{totalSources} sources analyzed`
- [ ] Full report rendered (markdown or legacy card format)
- [ ] "Start New Research" button (center, secondary style) returns to `idle`
- [ ] Export buttons visible in header
- [ ] Save to Library button visible in header

### Research Document — Markdown Report
#### Markdown Rendering
- [ ] Headings (h1–h5) styled with correct sizes and scroll margins
- [ ] Paragraphs with proper spacing and line-height (1.6)
