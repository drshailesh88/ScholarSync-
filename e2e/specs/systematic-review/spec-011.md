# systematic-review — Spec 011

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Loading & Error States
#### Error State (error.tsx)
- [ ] **Error details** — technical error information displayed (if applicable)

### Accessibility
#### Navigation
- [ ] **Back link** — accessible as standard link
#### Forms
- [ ] **PICO inputs** — labeled with `aria-label` or associated `<label>`
- [ ] **Criteria inputs** — labeled for screen readers
- [ ] **Schema builder** — field inputs labeled
- [ ] **GRADE domain selectors** — labeled for each domain
#### Buttons
- [ ] **Stage badges** — include text labels (not color-only)
- [ ] **Judgment colors** — text labels accompany color coding
- [ ] **Compliance status icons** — screen reader text for each status

### Quick Test Workflows
#### Hub Page — Header, Form, and Error Banner Details
- [ ] Hub-page description ends with a period in the rendered copy
- [ ] "New Review" button always opens the create form and clears any existing error banner
- [ ] Clicking "New Review" while the form is already visible does not toggle it closed
- [ ] Error banner renders above page content when project load or creation fails
- [ ] Error banner close button clears local `error` state without retrying the failed request
- [ ] Create form heading is exactly "New Systematic Review"
- [ ] Create form includes a `Review Title` label with a visible `Required` badge
- [ ] Create form helper text explains the full PICO/protocol can be defined after opening the review
- [ ] Title input is autofocused when the create form opens
- [ ] Title input placeholder is `e.g., Metformin vs Sulfonylureas for T2DM: A Systematic Review`
- [ ] Pressing Enter inside the title input triggers the same create handler as clicking `Create Review`
- [ ] `Create Review` button is disabled when the trimmed title is empty
- [ ] `Create Review` button swaps the Plus icon for a spinning `CircleNotch` during submission
- [ ] `Cancel` closes the create form and resets the draft title to an empty string
- [ ] Successful create clears the title field, hides the form, and refreshes the hub list
- [ ] Successful create does not auto-navigate to `/systematic-review/[projectId]` in the current implementation
- [ ] Failed create shows banner text `Failed to create project. Please try again.`
- [ ] Failed projects fetch shows banner text `Failed to load projects. Please try again.`
#### Hub Page — Loading, Empty State, and Project Cards
- [ ] Hub loading state is spinner-only and does not render loading text
- [ ] Empty-state heading reads `No systematic reviews yet`
- [ ] Empty-state body mentions AI help from search strategy to meta-analysis
- [ ] Empty-state CTA label is `Create Your First Review`
- [ ] Empty-state CTA opens the same create form used by the header button
- [ ] Project cards render inside a responsive `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` grid
- [ ] Project card title is line-clamped to 2 lines
- [ ] Project card shows ArrowRight icon in the top-right corner
