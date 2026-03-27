# systematic-review — Spec 028

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Funnel Plot — Recharts Rendering Details
- [x] PASS: Funnel plot uses Recharts ScatterChart (not custom SVG)
- [x] PASS: Chart height is fixed at 350px in a ResponsiveContainer
- [x] PASS: X-axis label is the full effect type name: `Odds Ratio`, `Risk Ratio`, `Std. Mean Difference`, `Mean Difference`, or `Risk Difference`
- [x] PASS: Y-axis label is `SE`, reversed axis (0 at top)
- [x] PASS: Real studies rendered as filled indigo (#6366f1) circles (radius 4)
- [x] PASS: Imputed studies rendered as hollow amber (#f59e0b) circles with 1.5px stroke
- [x] PASS: Pooled effect vertical reference line: dashed indigo (#6366f1) at 1.5px width
- [x] PASS: Custom tooltip shows study name, effect value (3 decimal places), SE (3 decimal places)
- [x] PASS: Tooltip shows `Imputed (trim-and-fill)` in amber text for imputed studies
- [x] PASS: Egger's test result displays below the chart: `Egger's test: intercept = {val}, p = {val}`
- [x] PASS: Egger's test shows `(significant asymmetry detected)` in amber font-medium when p < 0.05
#### Network Plot — SVG Rendering Details
- [x] PASS: Network plot supports two layout algorithms: `circular` (default) and `force-directed` (via `forceLayout` prop)
- [x] PASS: Force-directed layout runs 120 iterations with spring-charge model (Coulomb repulsion + Hooke attraction)
- [x] PASS: 12-color palette for nodes: indigo, pink, teal, amber, violet, emerald, orange, cyan, red, lime, purple, sky
- [x] PASS: Default SVG dimensions are 600×500
- [x] PASS: Node hover highlights connected nodes and edges; dims unconnected to 0.15 opacity
- [x] PASS: Hovered node gets white stroke (2.5px) instead of self-color stroke
- [x] PASS: Edge weight labels only shown when weight > 1
- [x] PASS: Node labels truncated at 18 characters with `...` suffix
- [x] PASS: Node size range: 12px to 36px, proportional to sample size ratio
- [x] PASS: Edge thickness range: 1.5px to ~6.5px, proportional to weight ratio
- [x] PASS: Legend text: `Node size = total sample size | Edge thickness = number of studies`
- [x] PASS: Glass background rect at 0.02 opacity with 12px border radius
#### League Table — SVG Rendering Details
- [x] PASS: League table is SVG-based rendering (not HTML table)
- [x] PASS: Cell width responsive to treatment count: 140px (≤4), 120px (≤6), 105px (≤8), 90px (>8)
- [x] PASS: Cell height is fixed at 52px
- [x] PASS: Diagonal cells: indigo (#6366f1) background at 0.15 opacity
- [x] PASS: Diagonal cells show treatment name truncated at 14 characters + P-score as `P = {val}`
- [x] PASS: Statistically significant cells (95% CI excludes 0): green (#22c55e) background at 0.08 opacity
- [x] PASS: Hover increases cell background opacity (0.18 for significant, 0.08 for non-significant)
- [x] PASS: Upper triangle cells show abbreviated comparison label (first 3 chars of each treatment)
- [x] PASS: Legend has 3 items: `Statistically significant (95% CI excludes 0)`, `Not significant`, `Diagonal (treatment + P-score)`
- [x] PASS: Reading guide text: `Read row vs column. Upper triangle: row treatment vs column treatment. Lower triangle: mirrored (reversed sign).`
#### NMA Forest Plot — SVG Rendering Details
- [x] PASS: NMA forest plot reference treatment selector label is `Reference treatment:`
- [x] PASS: Default reference treatment is the first treatment in the result array
