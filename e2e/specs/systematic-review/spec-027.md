# systematic-review — Spec 027

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Activity Feed — Sidebar Rendering Details
- [x] PASS: Maximum activity entries retained in memory is 50 (oldest trimmed on overflow)
- [x] PASS: Entries are prepended (newest first) to the activity feed array
- [x] PASS: `decision-made` entry: include = emerald-500, exclude = red-400, maybe = amber-400
- [x] PASS: `decision-made` text format: `{userName} screened Paper #{paperId} as {decision}`
- [x] PASS: `decision-made` shows paperTitle as truncated secondary line when available
- [x] PASS: `extraction-complete` icon is Table (weight fill) in blue-400
- [x] PASS: `extraction-complete` text format: `{userName} completed data extraction for Paper #{paperId}`
- [x] PASS: `rob2-assessed` icon is ShieldCheck (weight fill) in purple-400
- [x] PASS: `rob2-assessed` text shows `Overall risk: {overallRisk}` as secondary line
- [x] PASS: `stage-advanced` icon is ArrowFatUp (weight fill) in brand color
- [x] PASS: `stage-advanced` text shows `{fromStage}` → `{toStage}` with CaretRight separator, toStage in brand color
- [x] PASS: `papers-imported` icon is DownloadSimple (weight fill) in teal-400
- [x] PASS: `papers-imported` text format: `{userName} imported {count} papers from {source}`
- [x] PASS: Time formatting: `just now` (< 5s), `{N}s ago`, `{N}m ago`, `{N}h ago`, `{N}d ago`
- [x] PASS: Each entry is wrapped in a GlassPanel with `!rounded-xl` override
- [x] PASS: Unknown event types render `null` (no fallback entry)
#### Forest Plot — SVG Rendering Details
- [x] PASS: Forest plot is pure SVG rendering (no charting library dependency)
- [x] PASS: Column headers are `Study`, `{effectType} (95% CI)`, and `Weight`
- [x] PASS: Study labels truncated at 28 characters with `...` suffix
- [x] PASS: Effect size rendered as indigo (#6366f1) filled square, size proportional to weight (3-10px range)
- [x] PASS: CI whisker end caps only render when the CI bound is within the visible x-axis range
- [x] PASS: Alternating row backgrounds: even rows get 0.03 opacity fill
- [x] PASS: Null line is dashed (strokeDasharray 4,4) at 0.4 opacity
- [x] PASS: Null line label shows `1` for OR/RR effect types, `0` for MD/SMD/RD
- [x] PASS: OR and RR values displayed via `Math.exp()` transformation; MD/SMD/RD displayed raw
- [x] PASS: Pooled effect row labeled `Pooled` in bold text
- [x] PASS: Pooled effect diamond fill color is #dc2626 (red) at 0.85 opacity
- [x] PASS: Separator line above pooled row at 0.2 opacity
- [x] PASS: Prediction interval row renders only when `predictionInterval` prop is provided
- [x] PASS: Prediction interval label is italic text `Prediction interval` at 0.55 opacity
- [x] PASS: Prediction interval diamond is outline-only (no fill), dashed stroke (4,3), red (#dc2626)
- [x] PASS: Footer axis labels: `Favours control` (left 25%) and `Favours treatment` (right 75%)
- [x] PASS: Heterogeneity footer format: `Heterogeneity: I² = {val}%, τ² = {val}, p = {val}`
- [x] PASS: Heterogeneity p-value formatted as `<0.001` when below 0.001
- [x] PASS: Weight column values displayed as `{val}%` with 1 decimal place
