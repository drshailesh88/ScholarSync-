# systematic-review — Spec 029

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### NMA Forest Plot — SVG Rendering Details
- [ ] Comparisons sortable by `effect` (default) or `pscore`
- [ ] Statistically significant comparisons marked with `*` asterisk (bold, 0.6 opacity)
- [ ] Treatment labels truncated at 24 characters
- [ ] Point estimates rendered as diamond shapes (not squares)
- [ ] Significant rows: 0.9 fill opacity; non-significant: 0.5 fill opacity
- [ ] Reference treatment row at bottom: labeled `{ref} (reference)`, red (#dc2626) diamond at null line
- [ ] Reference treatment shows `0.00 (reference)` in stats column
- [ ] P-score column in rightmost position with `P-score` sub-header
- [ ] Column headers: `Treatment`, `Effect vs {ref} (95% CI)`, `Estimate [95% CI]`
- [ ] Footer model info: `Random-effects NMA (tau² = {val})` or `Fixed-effect NMA` followed by `| * = statistically significant`
- [ ] Axis labels: `Favours {selectedRef}` (left) / `Favours treatment` (right)
#### Screening PDF Viewer — Full Component Details
- [ ] PDF viewer renders as full-screen fixed overlay (z-50 with `bg-black/60 backdrop-blur-sm`)
- [ ] Split pane layout: 70% left (PDF/abstract viewer), 30% right (controls)
- [ ] Stage toggle buttons: `Title/Abstract` (TextAlignLeft icon) and `Full Text` (FileText icon)
- [ ] Full Text toggle disabled with `opacity-30 cursor-not-allowed` when no PDF exists
- [ ] Default stage is `full-text` when paper has pdfUrl or pdfStoragePath, otherwise `title-abstract`
- [ ] PDF page navigation: CaretLeft/CaretRight buttons with aria-labels `Previous page` / `Next page`
- [ ] Page display format: `{pageNumber} / {numPages}` or `...` while PDF loading
- [ ] Zoom controls: MagnifyingGlassMinus/Plus with aria-labels, range 0.5x to 3.0x in 0.25 steps
- [ ] Fit-width button uses ArrowsOutSimple icon with aria-label `Fit width`, resets to 1.0x
- [ ] Zoom percentage display: `{Math.round(scale * 100)}%`
- [ ] PDF loading state: spinner with `Loading PDF...` text
- [ ] No-PDF state: FileText icon + `No PDF available` + clickable `View title/abstract instead` link
- [ ] PDF error state: red X in circle + `Failed to load PDF` + error message text
- [ ] Close button: X icon (size 18) with aria-label `Close screening viewer`
- [ ] Paper title shown in toolbar truncated to `max-w-md`
- [ ] Title/Abstract view: paper title as h1 bold, authors, journal/year, DOI link, PubMed link
- [ ] Abstract rendered in GlassPanel with TextAlignLeft icon + heading `Abstract`
- [ ] No-abstract state: `No abstract available for this paper.`
- [ ] `Open Full-Text PDF` button visible in title-abstract view only when PDF exists
- [ ] AI highlight overlays on PDF for relevant chunks: active chunk pulses in brand color (auto-clears after 3 seconds)
- [ ] Passive chunk highlights: `bg-yellow-400/15` with yellow left border
- [ ] Right panel heading: `Screening Decision`
- [ ] Current decision badge shows icon + `Currently: {decision}` with color-coded background
- [ ] Decision buttons: `Include` (CheckCircle, emerald), `Exclude` (XCircle, red), `Uncertain` (Warning, amber)
