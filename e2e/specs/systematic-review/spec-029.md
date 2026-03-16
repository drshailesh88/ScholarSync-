# systematic-review — Spec 029

STATUS: PARTIAL
TESTED: 35/35
PASS: 0
FAIL: 35
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### NMA Forest Plot — SVG Rendering Details
- [ ] FAIL: Comparisons sortable by `effect` (default) or `pscore`
- [ ] FAIL: Statistically significant comparisons marked with `*` asterisk (bold, 0.6 opacity)
- [ ] FAIL: Treatment labels truncated at 24 characters
- [ ] FAIL: Point estimates rendered as diamond shapes (not squares)
- [ ] FAIL: Significant rows: 0.9 fill opacity; non-significant: 0.5 fill opacity
- [ ] FAIL: Reference treatment row at bottom: labeled `{ref} (reference)`, red (#dc2626) diamond at null line
- [ ] FAIL: Reference treatment shows `0.00 (reference)` in stats column
- [ ] FAIL: P-score column in rightmost position with `P-score` sub-header
- [ ] FAIL: Column headers: `Treatment`, `Effect vs {ref} (95% CI)`, `Estimate [95% CI]`
- [ ] FAIL: Footer model info: `Random-effects NMA (tau² = {val})` or `Fixed-effect NMA` followed by `| * = statistically significant`
- [ ] FAIL: Axis labels: `Favours {selectedRef}` (left) / `Favours treatment` (right)
#### Screening PDF Viewer — Full Component Details
- [ ] FAIL: PDF viewer renders as full-screen fixed overlay (z-50 with `bg-black/60 backdrop-blur-sm`)
- [ ] FAIL: Split pane layout: 70% left (PDF/abstract viewer), 30% right (controls)
- [ ] FAIL: Stage toggle buttons: `Title/Abstract` (TextAlignLeft icon) and `Full Text` (FileText icon)
- [ ] FAIL: Full Text toggle disabled with `opacity-30 cursor-not-allowed` when no PDF exists
- [ ] FAIL: Default stage is `full-text` when paper has pdfUrl or pdfStoragePath, otherwise `title-abstract`
- [ ] FAIL: PDF page navigation: CaretLeft/CaretRight buttons with aria-labels `Previous page` / `Next page`
- [ ] FAIL: Page display format: `{pageNumber} / {numPages}` or `...` while PDF loading
- [ ] FAIL: Zoom controls: MagnifyingGlassMinus/Plus with aria-labels, range 0.5x to 3.0x in 0.25 steps
- [ ] FAIL: Fit-width button uses ArrowsOutSimple icon with aria-label `Fit width`, resets to 1.0x
- [ ] FAIL: Zoom percentage display: `{Math.round(scale * 100)}%`
- [ ] FAIL: PDF loading state: spinner with `Loading PDF...` text
- [ ] FAIL: No-PDF state: FileText icon + `No PDF available` + clickable `View title/abstract instead` link
- [ ] FAIL: PDF error state: red X in circle + `Failed to load PDF` + error message text
- [ ] FAIL: Close button: X icon (size 18) with aria-label `Close screening viewer`
- [ ] FAIL: Paper title shown in toolbar truncated to `max-w-md`
- [ ] FAIL: Title/Abstract view: paper title as h1 bold, authors, journal/year, DOI link, PubMed link
- [ ] FAIL: Abstract rendered in GlassPanel with TextAlignLeft icon + heading `Abstract`
- [ ] FAIL: No-abstract state: `No abstract available for this paper.`
- [ ] FAIL: `Open Full-Text PDF` button visible in title-abstract view only when PDF exists
- [ ] FAIL: AI highlight overlays on PDF for relevant chunks: active chunk pulses in brand color (auto-clears after 3 seconds)
- [ ] FAIL: Passive chunk highlights: `bg-yellow-400/15` with yellow left border
- [ ] FAIL: Right panel heading: `Screening Decision`
- [ ] FAIL: Current decision badge shows icon + `Currently: {decision}` with color-coded background
- [ ] FAIL: Decision buttons: `Include` (CheckCircle, emerald), `Exclude` (XCircle, red), `Uncertain` (Warning, amber)
