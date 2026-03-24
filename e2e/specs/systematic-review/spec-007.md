# systematic-review — Spec 007

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Data Extraction Panel
#### Export
- [ ] **CSV format** — rows = papers, columns = extraction fields
- [ ] **Complete data** — all extracted values included in export

### Meta-Analysis Panel
#### Effect Size Configuration
- [ ] **Effect type selector** — dropdown or radio to choose effect measure
#### Model Selection
- [ ] **Model toggle** — switch between fixed and random effects
- [ ] **Trim-and-fill** — option to apply trim-and-fill adjustment for publication bias
#### Forest Plot
- [ ] **Forest plot rendered** — standard meta-analysis forest plot
- [ ] **Study labels** — each study labeled on left
- [ ] **Effect estimates** — point estimates with confidence intervals
- [ ] **Diamond summary** — pooled effect shown as diamond
- [ ] **Heterogeneity stats** — I-squared, tau-squared, Q-test displayed
- [ ] **Weights** — study weights shown
#### Funnel Plot
- [ ] **Funnel plot rendered** — standard funnel plot for publication bias
- [ ] **Symmetry assessment** — visual inspection of asymmetry
- [ ] **Trim-and-fill** — imputed studies shown if trim-and-fill enabled
#### Subgroup Analysis
- [ ] **Subgroup definition** — UI to define subgroups
- [ ] **Subgroup forest plots** — separate analyses per subgroup
- [ ] **Between-group comparison** — test for subgroup differences
#### Sensitivity Analysis
- [ ] **Leave-one-out** — iteratively removes each study
- [ ] **Results table** — shows effect with each study removed
- [ ] **Influence detection** — highlights studies that strongly influence results
#### API
- [ ] `POST /api/systematic-review/meta-analysis` — runs meta-analysis
- [ ] `GET /api/systematic-review/meta-analysis` — retrieves saved results

### Network Meta-Analysis Panel
#### Study Input
- [ ] **Treatment pair input** — define comparisons between treatments
- [ ] **Treatment A** — input field for first treatment
- [ ] **Treatment B** — input field for second treatment
- [ ] **Effect data** — input fields for effect size and variance
- [ ] **Add comparison** — button to add new study comparison
- [ ] **Remove comparison** — button to remove a comparison
#### League Table
- [ ] **Matrix format** — treatments on rows and columns
- [ ] **Pairwise comparisons** — effect estimates in cells
- [ ] **Confidence intervals** — shown for each comparison
- [ ] **Color coding** — significant effects highlighted
#### Network Plot
- [ ] **Node rendering** — each treatment as a node
- [ ] **Edge rendering** — direct comparisons as edges
- [ ] **Node size** — proportional to sample size
