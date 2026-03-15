# poster — Spec 006

STATUS: PARTIAL
TESTED: 35/35
PASS: 29
FAIL: 6
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Types & Data Structures
#### PosterGridLayout
- [x] PASS: Grid layout column counts match the specification

### Templates
#### Template 4: Engineering/CS
- [x] PASS: Clinical Research template uses `three_column` layout
- [x] PASS: Clinical Research template has 9 sections including Results with colSpan 2
- [x] PASS: Clinical Research Results section spans 2 columns
- [x] PASS: Basic Science template uses `three_column` layout
- [x] PASS: Basic Science template has 9 sections
- [ ] FAIL: Basic Science template includes Hypothesis section
- [ ] FAIL: Systematic Review template uses `three_column` layout
- [ ] FAIL: Systematic Review template has 9 sections
- [x] PASS: Systematic Review template includes PRISMA Flow and Risk of Bias sections
- [x] PASS: Engineering/CS template uses `two_column_wide` layout
- [x] PASS: Engineering/CS template has 9 sections
- [x] PASS: Engineering/CS template includes Problem Statement and Proposed Approach sections
- [x] PASS: All templates include Title, References, and Acknowledgments sections

### Icons & Visual Elements
- [ ] FAIL: All listed icons render correctly without missing imports
- [ ] FAIL: Icons are appropriately sized relative to their context
- [ ] FAIL: Icons have correct color theming (inherit or explicit)

### Error Handling & Edge Cases
- [x] PASS: Wizard handles browser back/forward navigation gracefully
- [x] PASS: Editor handles missing poster data (deleted or invalid posterId)
- [x] PASS: Editor handles poster with zero sections
- [x] PASS: Editor handles poster with very long title (>300px truncation in toolbar)
- [x] PASS: Editor handles poster with special characters in title
- [x] PASS: Generation handles timeout from AI model
- [x] PASS: Generation handles malformed JSON response from AI
- [x] PASS: Zoom controls handle rapid clicking without visual glitches
- [x] PASS: Section panel handles poster with many sections (scrolling)
- [x] PASS: Theme changes apply immediately to the rendered poster
- [x] PASS: Source selection handles switching between source types without data loss warnings
- [x] PASS: Wizard prevents double-submission of the generate action
- [x] PASS: Editor state persists across page refresh (or shows appropriate reload behavior)
- [x] PASS: Mobile/responsive behavior for toolbar and panels
#### Detailed QA Coverage
- [x] PASS: `/poster/new` renders inside a `Suspense` boundary with a centered `Loading...` fallback before the wizard hydrates
- [x] PASS: New poster header shows an icon-only back link on the left and the title `New Conference Poster` on the right
- [x] PASS: Step indicator labels appear in the order `Source`, `Size & Template`, `Theme & Options`, `Generate`
- [x] PASS: Step indicator starts with step 1 visually active and the remaining steps rendered as future steps
