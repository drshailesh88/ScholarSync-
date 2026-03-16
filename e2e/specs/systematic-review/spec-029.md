# systematic-review — Spec 029

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### NMA Forest Plot — SVG Rendering Details
- [x] PASS: Comparisons sortable by `effect` (default) or `pscore`
- [x] PASS: Statistically significant comparisons marked with `*` asterisk (bold, 0.6 opacity)
- [x] PASS: Treatment labels truncated at 24 characters
- [x] PASS: Point estimates rendered as diamond shapes (not squares)
- [x] PASS: Significant rows: 0.9 fill opacity; non-significant: 0.5 fill opacity
- [x] PASS: Reference treatment row at bottom: labeled `{ref} (reference)`, red (#dc2626) diamond at null line
- [x] PASS: Reference treatment shows `0.00 (reference)` in stats column
- [x] PASS: P-score column in rightmost position with `P-score` sub-header
- [x] PASS: Column headers: `Treatment`, `Effect vs {ref} (95% CI)`, `Estimate [95% CI]`
- [x] PASS: Footer model info: `Random-effects NMA (tau² = {val})` or `Fixed-effect NMA` followed by `| * = statistically significant`
- [x] PASS: Axis labels: `Favours {selectedRef}` (left) / `Favours treatment` (right)
#### Screening PDF Viewer — Full Component Details
- [x] PASS: PDF viewer renders as full-screen fixed overlay (z-50 with `bg-black/60 backdrop-blur-sm`)
- [x] PASS: Split pane layout: 70% left (PDF/abstract viewer), 30% right (controls)
- [x] PASS: Stage toggle buttons: `Title/Abstract` (TextAlignLeft icon) and `Full Text` (FileText icon)
- [x] PASS: Full Text toggle disabled with `opacity-30 cursor-not-allowed` when no PDF exists
- [x] PASS: Default stage is `full-text` when paper has pdfUrl or pdfStoragePath, otherwise `title-abstract`
- [x] PASS: PDF page navigation: CaretLeft/CaretRight buttons with aria-labels `Previous page` / `Next page`
- [x] PASS: Page display format: `{pageNumber} / {numPages}` or `...` while PDF loading
- [x] PASS: Zoom controls: MagnifyingGlassMinus/Plus with aria-labels, range 0.5x to 3.0x in 0.25 steps
- [x] PASS: Fit-width button uses ArrowsOutSimple icon with aria-label `Fit width`, resets to 1.0x
- [x] PASS: Zoom percentage display: `{Math.round(scale * 100)}%`
- [x] PASS: PDF loading state: spinner with `Loading PDF...` text
- [x] PASS: No-PDF state: FileText icon + `No PDF available` + clickable `View title/abstract instead` link
- [x] PASS: PDF error state: red X in circle + `Failed to load PDF` + error message text
- [x] PASS: Close button: X icon (size 18) with aria-label `Close screening viewer`
- [x] PASS: Paper title shown in toolbar truncated to `max-w-md`
- [x] PASS: Title/Abstract view: paper title as h1 bold, authors, journal/year, DOI link, PubMed link
- [x] PASS: Abstract rendered in GlassPanel with TextAlignLeft icon + heading `Abstract`
- [x] PASS: No-abstract state: `No abstract available for this paper.`
- [x] PASS: `Open Full-Text PDF` button visible in title-abstract view only when PDF exists
- [x] PASS: AI highlight overlays on PDF for relevant chunks: active chunk pulses in brand color (auto-clears after 3 seconds)
- [x] PASS: Passive chunk highlights: `bg-yellow-400/15` with yellow left border
- [x] PASS: Right panel heading: `Screening Decision`
- [x] PASS: Current decision badge shows icon + `Currently: {decision}` with color-coded background
- [x] PASS: Decision buttons: `Include` (CheckCircle, emerald), `Exclude` (XCircle, red), `Uncertain` (Warning, amber)
