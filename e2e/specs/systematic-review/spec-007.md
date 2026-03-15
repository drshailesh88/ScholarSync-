# systematic-review — Spec 007

STATUS: PARTIAL
TESTED: 35/35
PASS: 2
FAIL: 33
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Data Extraction Panel
#### Export
- [ ] FAIL: **CSV format** — rows = papers, columns = extraction fields
- [x] PASS: **Complete data** — all extracted values included in export

### Meta-Analysis Panel
#### Effect Size Configuration
- [ ] FAIL: **Effect type selector** — dropdown or radio to choose effect measure
#### Model Selection
- [ ] FAIL: **Model toggle** — switch between fixed and random effects
- [ ] FAIL: **Trim-and-fill** — option to apply trim-and-fill adjustment for publication bias
#### Forest Plot
- [x] PASS: **Forest plot rendered** — standard meta-analysis forest plot
- [ ] FAIL: **Study labels** — each study labeled on left
- [ ] FAIL: **Effect estimates** — point estimates with confidence intervals
- [ ] FAIL: **Diamond summary** — pooled effect shown as diamond
- [ ] FAIL: **Heterogeneity stats** — I-squared, tau-squared, Q-test displayed
- [ ] FAIL: **Weights** — study weights shown
#### Funnel Plot
- [ ] FAIL: **Funnel plot rendered** — standard funnel plot for publication bias
- [ ] FAIL: **Symmetry assessment** — visual inspection of asymmetry
- [ ] FAIL: **Trim-and-fill** — imputed studies shown if trim-and-fill enabled
#### Subgroup Analysis
- [ ] FAIL: **Subgroup definition** — UI to define subgroups
- [ ] FAIL: **Subgroup forest plots** — separate analyses per subgroup
- [ ] FAIL: **Between-group comparison** — test for subgroup differences
#### Sensitivity Analysis
- [ ] FAIL: **Leave-one-out** — iteratively removes each study
- [ ] FAIL: **Results table** — shows effect with each study removed
- [ ] FAIL: **Influence detection** — highlights studies that strongly influence results
#### API
- [ ] FAIL: `POST /api/systematic-review/meta-analysis` — runs meta-analysis
- [ ] FAIL: `GET /api/systematic-review/meta-analysis` — retrieves saved results

### Network Meta-Analysis Panel
#### Study Input
- [ ] FAIL: **Treatment pair input** — define comparisons between treatments
- [ ] FAIL: **Treatment A** — input field for first treatment
- [ ] FAIL: **Treatment B** — input field for second treatment
- [ ] FAIL: **Effect data** — input fields for effect size and variance
- [ ] FAIL: **Add comparison** — button to add new study comparison
- [ ] FAIL: **Remove comparison** — button to remove a comparison
#### League Table
- [ ] FAIL: **Matrix format** — treatments on rows and columns
- [ ] FAIL: **Pairwise comparisons** — effect estimates in cells
- [ ] FAIL: **Confidence intervals** — shown for each comparison
- [ ] FAIL: **Color coding** — significant effects highlighted
#### Network Plot
- [ ] FAIL: **Node rendering** — each treatment as a node
- [ ] FAIL: **Edge rendering** — direct comparisons as edges
- [ ] FAIL: **Node size** — proportional to sample size
