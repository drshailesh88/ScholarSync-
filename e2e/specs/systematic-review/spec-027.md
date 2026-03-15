# systematic-review — Spec 027

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Activity Feed — Sidebar Rendering Details
- [ ] Maximum activity entries retained in memory is 50 (oldest trimmed on overflow)
- [ ] Entries are prepended (newest first) to the activity feed array
- [ ] `decision-made` entry: include = emerald-500, exclude = red-400, maybe = amber-400
- [ ] `decision-made` text format: `{userName} screened Paper #{paperId} as {decision}`
- [ ] `decision-made` shows paperTitle as truncated secondary line when available
- [ ] `extraction-complete` icon is Table (weight fill) in blue-400
- [ ] `extraction-complete` text format: `{userName} completed data extraction for Paper #{paperId}`
- [ ] `rob2-assessed` icon is ShieldCheck (weight fill) in purple-400
- [ ] `rob2-assessed` text shows `Overall risk: {overallRisk}` as secondary line
- [ ] `stage-advanced` icon is ArrowFatUp (weight fill) in brand color
- [ ] `stage-advanced` text shows `{fromStage}` → `{toStage}` with CaretRight separator, toStage in brand color
- [ ] `papers-imported` icon is DownloadSimple (weight fill) in teal-400
- [ ] `papers-imported` text format: `{userName} imported {count} papers from {source}`
- [ ] Time formatting: `just now` (< 5s), `{N}s ago`, `{N}m ago`, `{N}h ago`, `{N}d ago`
- [ ] Each entry is wrapped in a GlassPanel with `!rounded-xl` override
- [ ] Unknown event types render `null` (no fallback entry)
#### Forest Plot — SVG Rendering Details
- [ ] Forest plot is pure SVG rendering (no charting library dependency)
- [ ] Column headers are `Study`, `{effectType} (95% CI)`, and `Weight`
- [ ] Study labels truncated at 28 characters with `...` suffix
- [ ] Effect size rendered as indigo (#6366f1) filled square, size proportional to weight (3-10px range)
- [ ] CI whisker end caps only render when the CI bound is within the visible x-axis range
- [ ] Alternating row backgrounds: even rows get 0.03 opacity fill
- [ ] Null line is dashed (strokeDasharray 4,4) at 0.4 opacity
- [ ] Null line label shows `1` for OR/RR effect types, `0` for MD/SMD/RD
- [ ] OR and RR values displayed via `Math.exp()` transformation; MD/SMD/RD displayed raw
- [ ] Pooled effect row labeled `Pooled` in bold text
- [ ] Pooled effect diamond fill color is #dc2626 (red) at 0.85 opacity
- [ ] Separator line above pooled row at 0.2 opacity
- [ ] Prediction interval row renders only when `predictionInterval` prop is provided
- [ ] Prediction interval label is italic text `Prediction interval` at 0.55 opacity
- [ ] Prediction interval diamond is outline-only (no fill), dashed stroke (4,3), red (#dc2626)
- [ ] Footer axis labels: `Favours control` (left 25%) and `Favours treatment` (right 75%)
- [ ] Heterogeneity footer format: `Heterogeneity: I² = {val}%, τ² = {val}, p = {val}`
- [ ] Heterogeneity p-value formatted as `<0.001` when below 0.001
- [ ] Weight column values displayed as `{val}%` with 1 decimal place
