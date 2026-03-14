# analysis — Spec 009

STATUS: PARTIAL
TESTED: 35/35
PASS: 31
FAIL: 4
BLOCKED: 0
PAGE: http://localhost:3001/analysis
MODULE: analysis

---
### Quick Test Workflows
#### `src/lib/integrity/plagiarism-engine.ts` — Severity Thresholds
- [x] PASS: Scholarly API searches have a 12-second abort timeout (~line 547)
- [x] PASS: Paragraph excerpts in plagiarism results are truncated to 120 characters with "..." suffix (~line 540-541)
#### `src/components/ui/circular-gauge.tsx` — Implementation Details
- [x] PASS: Gauge SVG stroke width is 10 pixels (~line 26)
- [x] PASS: Gauge SVG is rotated with `-rotate-90` class so arc starts at 12 o'clock position (~line 38)
- [x] PASS: Active arc uses `strokeLinecap="round"` for rounded ends (~line 55)
- [x] PASS: Arc fill animates with `transition-all duration-1000` (~line 58)
- [x] PASS: Gauge color hex values: green `#22c55e` (>= 80), yellow `#eab308` (>= 60), orange `#f97316` (>= 40), red `#ef4444` (< 40) (~line 12-17)
- [x] PASS: Center value text uses `text-2xl font-bold text-ink` (~line 62)
- [x] PASS: Label text below gauge uses `text-sm font-medium text-ink-muted` (~line 65)
#### `src/components/ui/tabs.tsx` — Tabs Component Details
- [x] PASS: Active tab button style: `bg-surface-raised text-ink border border-border-subtle` (~line 36)
- [x] PASS: Inactive tab button style: `text-ink-muted hover:text-ink hover:bg-surface-raised/50` (~line 37)
- [x] PASS: Active tab count badge: `bg-brand/10 text-brand` (~line 48)
- [x] PASS: Inactive tab count badge: `bg-surface-raised text-ink-muted` (~line 49)
- [x] PASS: Count badge is rendered only when `tab.count !== undefined` (~line 41)
#### `src/components/ui/error-display.tsx` — Error Page Details
- [x] PASS: Error page reports errors to Sentry via `Sentry.captureException(error)` in a `useEffect` (~line 23-27)
- [ ] FAIL: Error page displays a `WarningCircle` icon (size 32) inside a red-tinted rounded container (~line 35-36)
- [ ] FAIL: Retry button text is "Try Again" with an `ArrowCounterClockwise` icon (size 16) (~line 43-46)
#### `src/app/(app)/analysis/loading.tsx` — Loading Skeleton Structure
- [ ] FAIL: Loading skeleton renders exactly 4 `Skeleton` elements: back-button placeholder (h-8 w-8 rounded-lg), title placeholder (h-6 w-40), textarea placeholder (flex-1 rounded-2xl), and a footer row with word-count placeholder (h-4 w-20) plus button placeholder (h-12 w-40 rounded-xl) (~lines 6-15)
- [x] PASS: Loading skeleton mirrors the page layout height: `h-[calc(100vh-7rem)]` (~line 5)
#### `src/app/(app)/analysis/page.tsx` — Additional UI Details
- [x] PASS: Page container uses `h-[calc(100vh-7rem)]` for viewport height minus header (~line 203)
- [ ] FAIL: Analyze button uses `rounded-xl px-6 py-3` — not rounded-lg (~line 344)
- [x] PASS: Legend swatches in results mode use `w-3 h-3 rounded` with both `bg-{color}-500/30` AND `border border-{color}-500` (~lines 245-255)
- [x] PASS: Results-mode reset button text is `← Analyze New Text` (using `&larr;` HTML entity), not "Back to Analyze New Text" (~line 464)
- [x] PASS: Results-mode reset button is styled as text link: `text-xs text-brand hover:text-brand-hover font-medium` (~line 462)
- [x] PASS: Results gauge value comes from `result.writingQuality.readabilityGrade` (API's Flesch-Kincaid grade), while instant gauge value comes from `clientMetrics.fleschReadingEase` (~line 500 vs ~line 360)
- [x] PASS: Results-mode Writing Quality `Passive Voice` MetricBar uses dynamic max: `Math.max(value, 10)` (~line 679)
- [x] PASS: Results-mode `Weasel Words` and `Adverbs` MetricBars use dynamic max: `Math.max(value, 10)` (~lines 688, 693)
- [x] PASS: Results-mode `Complex Sentences` MetricBar uses dynamic max: `Math.max(value, 5)` (~line 699)
- [x] PASS: Results-mode Readability Grade MetricBar has max of `100` (~line 642)
- [x] PASS: Results-mode Overall Risk is capitalized from raw value: `result.overallRisk.charAt(0).toUpperCase() + result.overallRisk.slice(1)` — displays "Low", "Medium", or "High" (~line 723)
- [x] PASS: Paragraph breakdown score pills use `px-2 py-0.5 rounded-full text-xs font-medium` with three color tiers matching the left-panel highlighting thresholds (~lines 741-748)
- [x] PASS: Plagiarism indicator cards include a `Sparkle` icon before the severity label, using the severity color (~line 615-616)
- [x] PASS: Plagiarism indicator concern line is plain text: `text-xs text-ink-muted` (~line 623)
- [x] PASS: Issues tab count in input mode (before results) shows `clientIssues.length` when clientIssues > 0, or `undefined` (hidden) when no issues (~line 147)
- [x] PASS: `ToneBadge` helper renders label left / colored badge right with three color options: emerald → `bg-emerald-500/10 text-emerald-500`, yellow → `bg-yellow-500/10 text-yellow-500`, red → `bg-red-500/10 text-red-500` (~lines 785-795)
