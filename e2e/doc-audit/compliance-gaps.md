# Compliance — Feature Doc Gaps

**Original doc:** `COMPLIANCE_FEATURES_TESTING.md`
**Original checkbox count:** 235
**Features found in UI:** 301
**Features found in source code:** 357
**Missing from doc:** 122
**Completeness of original doc:** 65.8%

## Missing Features

### Detailed QA Coverage
- [ ] Default-state coverage for `sourceMode`, `pageTab`, `viewMode`, realtime mode, and the hidden/visible transitions between input mode and results mode
- [ ] Source-mode switching behavior, especially the fact that document text persists when switching into paste mode
- [ ] Silent failure behavior for project loading, document loading, realtime checks, humanize/paraphrase calls, Copyleaks polling, and report download
- [ ] Realtime-integrity thresholds and gating rules for minimum length, minimum delta, debounce timing, and hidden score state
- [ ] Exact reset behavior for `Check New Text`, including which states reset and which states intentionally remain untouched
- [ ] Inline-view sentence-highlighting details, humanize output rendering, and the paragraph-index keyed result caches
- [ ] DiffView scroll-sync and exact plagiarism/citation-issue highlight behavior
- [ ] Built-in plagiarism action specifics for clipboard citation text, 2-second copied feedback, and paraphrase payload contents
- [ ] Copyleaks scan lifecycle, including `503` configuration handling, immediate poll + 5-second polling cadence, and fallback behavior for `error` status
- [ ] History-tab sparkline conditions, score-color thresholds, and the fact that history entries are summary rows only
- [ ] Route-level loading and error boundary copy

## Features in doc that DON'T EXIST in the app
- Switching to `Paste Text` does not clear the current text in the live implementation.
- Realtime integrity errors are not shown anywhere in the page UI.
- `Check New Text` does not fully reset the page to its initial source-mode state.
- Copyleaks scan failures other than `503` do not show a dedicated error message in the current UI.
- Copyleaks `error` status does not have its own rendered error state; the section falls back toward the idle action path.
- History entries are not reopenable reports in the current implementation; they are read-only summaries.
