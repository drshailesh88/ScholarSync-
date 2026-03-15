# systematic-review — Spec 007

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Data Extraction Panel
#### Export
- [x] PASS: **CSV format** — rows = papers, columns = extraction fields
- [x] PASS: **Complete data** — all extracted values included in export

### Meta-Analysis Panel
#### Effect Size Configuration
- [x] PASS: **Effect type selector** — dropdown or radio to choose effect measure
#### Model Selection
- [x] PASS: **Model toggle** — switch between fixed and random effects
- [x] PASS: **Trim-and-fill** — option to apply trim-and-fill adjustment for publication bias
#### Forest Plot
- [x] PASS: **Forest plot rendered** — standard meta-analysis forest plot
- [x] PASS: **Study labels** — each study labeled on left
- [x] PASS: **Effect estimates** — point estimates with confidence intervals
- [x] PASS: **Diamond summary** — pooled effect shown as diamond
- [x] PASS: **Heterogeneity stats** — I-squared, tau-squared, Q-test displayed
- [x] PASS: **Weights** — study weights shown
#### Funnel Plot
- [x] PASS: **Funnel plot rendered** — standard funnel plot for publication bias
- [x] PASS: **Symmetry assessment** — visual inspection of asymmetry
- [x] PASS: **Trim-and-fill** — imputed studies shown if trim-and-fill enabled
#### Subgroup Analysis
- [x] PASS: **Subgroup definition** — UI to define subgroups
- [x] PASS: **Subgroup forest plots** — separate analyses per subgroup
- [x] PASS: **Between-group comparison** — test for subgroup differences
#### Sensitivity Analysis
- [x] PASS: **Leave-one-out** — iteratively removes each study
- [x] PASS: **Results table** — shows effect with each study removed
- [x] PASS: **Influence detection** — highlights studies that strongly influence results
#### API
- [x] PASS: `POST /api/systematic-review/meta-analysis` — runs meta-analysis
- [x] PASS: `GET /api/systematic-review/meta-analysis` — retrieves saved results

### Network Meta-Analysis Panel
#### Study Input
- [x] PASS: **Treatment pair input** — define comparisons between treatments
- [x] PASS: **Treatment A** — input field for first treatment
- [x] PASS: **Treatment B** — input field for second treatment
- [x] PASS: **Effect data** — input fields for effect size and variance
- [x] PASS: **Add comparison** — button to add new study comparison
- [x] PASS: **Remove comparison** — button to remove a comparison
#### League Table
- [x] PASS: **Matrix format** — treatments on rows and columns
- [x] PASS: **Pairwise comparisons** — effect estimates in cells
- [x] PASS: **Confidence intervals** — shown for each comparison
- [x] PASS: **Color coding** — significant effects highlighted
#### Network Plot
- [x] PASS: **Node rendering** — each treatment as a node
- [x] PASS: **Edge rendering** — direct comparisons as edges
- [x] PASS: **Node size** — proportional to sample size
