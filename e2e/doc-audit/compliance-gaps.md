# Compliance — Feature Doc Gaps

**Original doc:** `COMPLIANCE_FEATURES_TESTING.md`
**Original checkbox count:** 235
**Features found in UI:** 325
**Features found in source code:** 392
**Missing from doc:** 157
**Completeness of original doc:** 59.9%

## Missing Features

### Detailed QA Coverage
- [ ] Realtime-integrity hook specifics: exact `2000` ms debounce, `100`-char minimum, `10`-char minimum delta, `POST { text, mode: "ai_detection" }`, `AbortController` cancellation behavior, hook-local score storage, and the fact that disabling Live mid-flight does not cancel the active request
- [ ] Full integrity-check flow details: paragraph splitting on blank-line boundaries, `POST { text, mode: "full" }`, `30000` ms timeout, and the exact timeout/network/fallback error strings
- [ ] Copyleaks lifecycle details: `POST { action: "scan", text }`, `503` handling via `copyleaksAvailable = false`, immediate poll plus `5000` ms interval polling, `"completed"` / `"error"` stop conditions, zero-source completed copy, and source-title truncation width
- [ ] Humanize/paraphrase specifics: `<40` human-probability gating, exact `Humanizing...` / `Paraphrasing...` loading labels, silent-failure behavior, `Humanized Version:` output label, change chips, and paraphrase payload contents
- [ ] Citation Audit truncation and clipboard details: section omission when missing, `slice(0, 8)` issue cap, conditional `Ref: ...` rendering, `navigator.clipboard.writeText(...)`, and `Copied!` feedback timing
- [ ] History-tab implementation details: `/api/integrity-check/history?limit=20`, sparkline only with `2+` entries, `aiScore ?? 50` plotting fallback, color thresholds, and the exact empty-state copy
- [ ] Writing Quality rendering rules: the three metric cards always render, sentence-length/readability values use `toFixed(1)`, and suggestions stay hidden when the list is empty
- [ ] Download Report specifics: request body contents, filename format `integrity-report-YYYY-MM-DD.md`, and silent-failure behavior
- [ ] `DiffView` implementation details: request-animation-frame scroll guard, exact-excerpt plagiarism highlighting, severity-colored citation `Warning` icons, and the fixed right-column legend labels
- [ ] Exact `Check New Text` reset surface, including the states that clear versus the states intentionally preserved

## Features in doc that DON'T EXIST in the app
- Switching to `Paste Text` does not clear the current text in the live implementation.
- Realtime integrity errors are not shown anywhere in the page UI.
- `Check New Text` does not fully reset the page to its initial source-mode state.
- Copyleaks scan failures other than `503` do not show a dedicated error message in the current UI.
- Copyleaks `error` status does not have its own rendered error state; the section falls back toward the idle action path.
- History entries are not reopenable reports in the current implementation; they are read-only summaries.
- The `/compliance` route does not have a `loading.tsx`; the Pass 1 loading-skeleton bullets described a non-existent component.
- The `/compliance` route does not have an `error.tsx`; the Pass 1 error-boundary copy bullets described a non-existent component.
