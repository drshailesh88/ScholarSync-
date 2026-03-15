# systematic-review — Spec 028

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Funnel Plot — Recharts Rendering Details
- [ ] Funnel plot uses Recharts ScatterChart (not custom SVG)
- [ ] Chart height is fixed at 350px in a ResponsiveContainer
- [ ] X-axis label is the full effect type name: `Odds Ratio`, `Risk Ratio`, `Std. Mean Difference`, `Mean Difference`, or `Risk Difference`
- [ ] Y-axis label is `SE`, reversed axis (0 at top)
- [ ] Real studies rendered as filled indigo (#6366f1) circles (radius 4)
- [ ] Imputed studies rendered as hollow amber (#f59e0b) circles with 1.5px stroke
- [ ] Pooled effect vertical reference line: dashed indigo (#6366f1) at 1.5px width
- [ ] Custom tooltip shows study name, effect value (3 decimal places), SE (3 decimal places)
- [ ] Tooltip shows `Imputed (trim-and-fill)` in amber text for imputed studies
- [ ] Egger's test result displays below the chart: `Egger's test: intercept = {val}, p = {val}`
- [ ] Egger's test shows `(significant asymmetry detected)` in amber font-medium when p < 0.05
#### Network Plot — SVG Rendering Details
- [ ] Network plot supports two layout algorithms: `circular` (default) and `force-directed` (via `forceLayout` prop)
- [ ] Force-directed layout runs 120 iterations with spring-charge model (Coulomb repulsion + Hooke attraction)
- [ ] 12-color palette for nodes: indigo, pink, teal, amber, violet, emerald, orange, cyan, red, lime, purple, sky
- [ ] Default SVG dimensions are 600×500
- [ ] Node hover highlights connected nodes and edges; dims unconnected to 0.15 opacity
- [ ] Hovered node gets white stroke (2.5px) instead of self-color stroke
- [ ] Edge weight labels only shown when weight > 1
- [ ] Node labels truncated at 18 characters with `...` suffix
- [ ] Node size range: 12px to 36px, proportional to sample size ratio
- [ ] Edge thickness range: 1.5px to ~6.5px, proportional to weight ratio
- [ ] Legend text: `Node size = total sample size | Edge thickness = number of studies`
- [ ] Glass background rect at 0.02 opacity with 12px border radius
#### League Table — SVG Rendering Details
- [ ] League table is SVG-based rendering (not HTML table)
- [ ] Cell width responsive to treatment count: 140px (≤4), 120px (≤6), 105px (≤8), 90px (>8)
- [ ] Cell height is fixed at 52px
- [ ] Diagonal cells: indigo (#6366f1) background at 0.15 opacity
- [ ] Diagonal cells show treatment name truncated at 14 characters + P-score as `P = {val}`
- [ ] Statistically significant cells (95% CI excludes 0): green (#22c55e) background at 0.08 opacity
- [ ] Hover increases cell background opacity (0.18 for significant, 0.08 for non-significant)
- [ ] Upper triangle cells show abbreviated comparison label (first 3 chars of each treatment)
- [ ] Legend has 3 items: `Statistically significant (95% CI excludes 0)`, `Not significant`, `Diagonal (treatment + P-score)`
- [ ] Reading guide text: `Read row vs column. Upper triangle: row treatment vs column treatment. Lower triangle: mirrored (reversed sign).`
#### NMA Forest Plot — SVG Rendering Details
- [ ] NMA forest plot reference treatment selector label is `Reference treatment:`
- [ ] Default reference treatment is the first treatment in the result array
