# poster — Spec 006

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Types & Data Structures
#### PosterGridLayout
- [ ] Grid layout column counts match the specification

### Templates
#### Template 4: Engineering/CS
- [ ] Clinical Research template uses `three_column` layout
- [ ] Clinical Research template has 9 sections including Results with colSpan 2
- [ ] Clinical Research Results section spans 2 columns
- [ ] Basic Science template uses `three_column` layout
- [ ] Basic Science template has 9 sections
- [ ] Basic Science template includes Hypothesis section
- [ ] Systematic Review template uses `three_column` layout
- [ ] Systematic Review template has 9 sections
- [ ] Systematic Review template includes PRISMA Flow and Risk of Bias sections
- [ ] Engineering/CS template uses `two_column_wide` layout
- [ ] Engineering/CS template has 9 sections
- [ ] Engineering/CS template includes Problem Statement and Proposed Approach sections
- [ ] All templates include Title, References, and Acknowledgments sections

### Icons & Visual Elements
- [ ] All listed icons render correctly without missing imports
- [ ] Icons are appropriately sized relative to their context
- [ ] Icons have correct color theming (inherit or explicit)

### Error Handling & Edge Cases
- [ ] Wizard handles browser back/forward navigation gracefully
- [ ] Editor handles missing poster data (deleted or invalid posterId)
- [ ] Editor handles poster with zero sections
- [ ] Editor handles poster with very long title (>300px truncation in toolbar)
- [ ] Editor handles poster with special characters in title
- [ ] Generation handles timeout from AI model
- [ ] Generation handles malformed JSON response from AI
- [ ] Zoom controls handle rapid clicking without visual glitches
- [ ] Section panel handles poster with many sections (scrolling)
- [ ] Theme changes apply immediately to the rendered poster
- [ ] Source selection handles switching between source types without data loss warnings
- [ ] Wizard prevents double-submission of the generate action
- [ ] Editor state persists across page refresh (or shows appropriate reload behavior)
- [ ] Mobile/responsive behavior for toolbar and panels
#### Detailed QA Coverage
- [ ] `/poster/new` renders inside a `Suspense` boundary with a centered `Loading...` fallback before the wizard hydrates
- [ ] New poster header shows an icon-only back link on the left and the title `New Conference Poster` on the right
- [ ] Step indicator labels appear in the order `Source`, `Size & Template`, `Theme & Options`, `Generate`
- [ ] Step indicator starts with step 1 visually active and the remaining steps rendered as future steps
