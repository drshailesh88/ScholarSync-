# systematic-review — Spec 028

STATUS: PARTIAL
TESTED: 35/35
PASS: 2
FAIL: 33
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Funnel Plot — Recharts Rendering Details
- [ ] FAIL: Funnel plot uses Recharts ScatterChart (not custom SVG)
- [ ] FAIL: Chart height is fixed at 350px in a ResponsiveContainer
- [ ] FAIL: X-axis label is the full effect type name: `Odds Ratio`, `Risk Ratio`, `Std. Mean Difference`, `Mean Difference`, or `Risk Difference`
- [ ] FAIL: Y-axis label is `SE`, reversed axis (0 at top)
- [ ] FAIL: Real studies rendered as filled indigo (#6366f1) circles (radius 4)
- [ ] FAIL: Imputed studies rendered as hollow amber (#f59e0b) circles with 1.5px stroke
- [ ] FAIL: Pooled effect vertical reference line: dashed indigo (#6366f1) at 1.5px width
- [ ] FAIL: Custom tooltip shows study name, effect value (3 decimal places), SE (3 decimal places)
- [x] PASS: Tooltip shows `Imputed (trim-and-fill)` in amber text for imputed studies
- [ ] FAIL: Egger's test result displays below the chart: `Egger's test: intercept = {val}, p = {val}`
- [ ] FAIL: Egger's test shows `(significant asymmetry detected)` in amber font-medium when p < 0.05
#### Network Plot — SVG Rendering Details
- [ ] FAIL: Network plot supports two layout algorithms: `circular` (default) and `force-directed` (via `forceLayout` prop)
- [ ] FAIL: Force-directed layout runs 120 iterations with spring-charge model (Coulomb repulsion + Hooke attraction)
- [ ] FAIL: 12-color palette for nodes: indigo, pink, teal, amber, violet, emerald, orange, cyan, red, lime, purple, sky
- [ ] FAIL: Default SVG dimensions are 600×500
- [ ] FAIL: Node hover highlights connected nodes and edges; dims unconnected to 0.15 opacity
- [ ] FAIL: Hovered node gets white stroke (2.5px) instead of self-color stroke
- [ ] FAIL: Edge weight labels only shown when weight > 1
- [ ] FAIL: Node labels truncated at 18 characters with `...` suffix
- [x] PASS: Node size range: 12px to 36px, proportional to sample size ratio
- [ ] FAIL: Edge thickness range: 1.5px to ~6.5px, proportional to weight ratio
- [ ] FAIL: Legend text: `Node size = total sample size | Edge thickness = number of studies`
- [ ] FAIL: Glass background rect at 0.02 opacity with 12px border radius
#### League Table — SVG Rendering Details
- [ ] FAIL: League table is SVG-based rendering (not HTML table)
- [ ] FAIL: Cell width responsive to treatment count: 140px (≤4), 120px (≤6), 105px (≤8), 90px (>8)
- [ ] FAIL: Cell height is fixed at 52px
- [ ] FAIL: Diagonal cells: indigo (#6366f1) background at 0.15 opacity
- [ ] FAIL: Diagonal cells show treatment name truncated at 14 characters + P-score as `P = {val}`
- [ ] FAIL: Statistically significant cells (95% CI excludes 0): green (#22c55e) background at 0.08 opacity
- [ ] FAIL: Hover increases cell background opacity (0.18 for significant, 0.08 for non-significant)
- [ ] FAIL: Upper triangle cells show abbreviated comparison label (first 3 chars of each treatment)
- [ ] FAIL: Legend has 3 items: `Statistically significant (95% CI excludes 0)`, `Not significant`, `Diagonal (treatment + P-score)`
- [ ] FAIL: Reading guide text: `Read row vs column. Upper triangle: row treatment vs column treatment. Lower triangle: mirrored (reversed sign).`
#### NMA Forest Plot — SVG Rendering Details
- [ ] FAIL: NMA forest plot reference treatment selector label is `Reference treatment:`
- [ ] FAIL: Default reference treatment is the first treatment in the result array
