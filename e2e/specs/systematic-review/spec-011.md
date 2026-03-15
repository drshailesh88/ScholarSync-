# systematic-review — Spec 011

STATUS: PARTIAL
TESTED: 35/35
PASS: 20
FAIL: 15
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Loading & Error States
#### Error State (error.tsx)
- [ ] FAIL: **Error details** — technical error information displayed (if applicable)

### Accessibility
#### Navigation
- [ ] FAIL: **Back link** — accessible as standard link
#### Forms
- [ ] FAIL: **PICO inputs** — labeled with `aria-label` or associated `<label>`
- [x] PASS: **Criteria inputs** — labeled for screen readers
- [ ] FAIL: **Schema builder** — field inputs labeled
- [ ] FAIL: **GRADE domain selectors** — labeled for each domain
#### Buttons
- [ ] FAIL: **Stage badges** — include text labels (not color-only)
- [ ] FAIL: **Judgment colors** — text labels accompany color coding
- [x] PASS: **Compliance status icons** — screen reader text for each status

### Quick Test Workflows
#### Hub Page — Header, Form, and Error Banner Details
- [x] PASS: Hub-page description ends with a period in the rendered copy
- [x] PASS: "New Review" button always opens the create form and clears any existing error banner
- [x] PASS: Clicking "New Review" while the form is already visible does not toggle it closed
- [ ] FAIL: Error banner renders above page content when project load or creation fails
- [x] PASS: Error banner close button clears local `error` state without retrying the failed request
- [x] PASS: Create form heading is exactly "New Systematic Review"
- [x] PASS: Create form includes a `Review Title` label with a visible `Required` badge
- [x] PASS: Create form helper text explains the full PICO/protocol can be defined after opening the review
- [ ] FAIL: Title input is autofocused when the create form opens
- [x] PASS: Title input placeholder is `e.g., Metformin vs Sulfonylureas for T2DM: A Systematic Review`
- [x] PASS: Pressing Enter inside the title input triggers the same create handler as clicking `Create Review`
- [x] PASS: `Create Review` button is disabled when the trimmed title is empty
- [x] PASS: `Create Review` button swaps the Plus icon for a spinning `CircleNotch` during submission
- [ ] FAIL: `Cancel` closes the create form and resets the draft title to an empty string
- [x] PASS: Successful create clears the title field, hides the form, and refreshes the hub list
- [x] PASS: Successful create does not auto-navigate to `/systematic-review/[projectId]` in the current implementation
- [ ] FAIL: Failed create shows banner text `Failed to create project. Please try again.`
- [ ] FAIL: Failed projects fetch shows banner text `Failed to load projects. Please try again.`
#### Hub Page — Loading, Empty State, and Project Cards
- [x] PASS: Hub loading state is spinner-only and does not render loading text
- [x] PASS: Empty-state heading reads `No systematic reviews yet`
- [x] PASS: Empty-state body mentions AI help from search strategy to meta-analysis
- [x] PASS: Empty-state CTA label is `Create Your First Review`
- [x] PASS: Empty-state CTA opens the same create form used by the header button
- [ ] FAIL: Project cards render inside a responsive `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` grid
- [ ] FAIL: Project card title is line-clamped to 2 lines
- [ ] FAIL: Project card shows ArrowRight icon in the top-right corner
