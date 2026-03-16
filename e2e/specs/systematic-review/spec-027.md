# systematic-review — Spec 027

STATUS: PARTIAL
TESTED: 35/35
PASS: 0
FAIL: 35
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Activity Feed — Sidebar Rendering Details
- [ ] FAIL: Maximum activity entries retained in memory is 50 (oldest trimmed on overflow)
- [ ] FAIL: Entries are prepended (newest first) to the activity feed array
- [ ] FAIL: `decision-made` entry: include = emerald-500, exclude = red-400, maybe = amber-400
- [ ] FAIL: `decision-made` text format: `{userName} screened Paper #{paperId} as {decision}`
- [ ] FAIL: `decision-made` shows paperTitle as truncated secondary line when available
- [ ] FAIL: `extraction-complete` icon is Table (weight fill) in blue-400
- [ ] FAIL: `extraction-complete` text format: `{userName} completed data extraction for Paper #{paperId}`
- [ ] FAIL: `rob2-assessed` icon is ShieldCheck (weight fill) in purple-400
- [ ] FAIL: `rob2-assessed` text shows `Overall risk: {overallRisk}` as secondary line
- [ ] FAIL: `stage-advanced` icon is ArrowFatUp (weight fill) in brand color
- [ ] FAIL: `stage-advanced` text shows `{fromStage}` → `{toStage}` with CaretRight separator, toStage in brand color
- [ ] FAIL: `papers-imported` icon is DownloadSimple (weight fill) in teal-400
- [ ] FAIL: `papers-imported` text format: `{userName} imported {count} papers from {source}`
- [ ] FAIL: Time formatting: `just now` (< 5s), `{N}s ago`, `{N}m ago`, `{N}h ago`, `{N}d ago`
- [ ] FAIL: Each entry is wrapped in a GlassPanel with `!rounded-xl` override
- [ ] FAIL: Unknown event types render `null` (no fallback entry)
#### Forest Plot — SVG Rendering Details
- [ ] FAIL: Forest plot is pure SVG rendering (no charting library dependency)
- [ ] FAIL: Column headers are `Study`, `{effectType} (95% CI)`, and `Weight`
- [ ] FAIL: Study labels truncated at 28 characters with `...` suffix
- [ ] FAIL: Effect size rendered as indigo (#6366f1) filled square, size proportional to weight (3-10px range)
- [ ] FAIL: CI whisker end caps only render when the CI bound is within the visible x-axis range
- [ ] FAIL: Alternating row backgrounds: even rows get 0.03 opacity fill
- [ ] FAIL: Null line is dashed (strokeDasharray 4,4) at 0.4 opacity
- [ ] FAIL: Null line label shows `1` for OR/RR effect types, `0` for MD/SMD/RD
- [ ] FAIL: OR and RR values displayed via `Math.exp()` transformation; MD/SMD/RD displayed raw
- [ ] FAIL: Pooled effect row labeled `Pooled` in bold text
- [ ] FAIL: Pooled effect diamond fill color is #dc2626 (red) at 0.85 opacity
- [ ] FAIL: Separator line above pooled row at 0.2 opacity
- [ ] FAIL: Prediction interval row renders only when `predictionInterval` prop is provided
- [ ] FAIL: Prediction interval label is italic text `Prediction interval` at 0.55 opacity
- [ ] FAIL: Prediction interval diamond is outline-only (no fill), dashed stroke (4,3), red (#dc2626)
- [ ] FAIL: Footer axis labels: `Favours control` (left 25%) and `Favours treatment` (right 75%)
- [ ] FAIL: Heterogeneity footer format: `Heterogeneity: I² = {val}%, τ² = {val}, p = {val}`
- [ ] FAIL: Heterogeneity p-value formatted as `<0.001` when below 0.001
- [ ] FAIL: Weight column values displayed as `{val}%` with 1 decimal place
