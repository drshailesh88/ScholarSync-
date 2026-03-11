# research — Spec 011

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### AI Synthesis Panel Internals
- [ ] AI synthesis does not rerun when only non-title metadata changes on the same top 5 papers because the fingerprint only tracks query text and titles
- [ ] AI synthesis request body includes only `title`, `authors`, `year`, `journal`, `abstract`, `pmid`, `doi`, and `studyType` for the top 5 papers
- [ ] AI synthesis sends an empty string for `abstract` when a result has no abstract
- [ ] AI synthesis aborts any previous streaming request before starting a new one
- [ ] AI synthesis marks the panel as failed and hides it when `/api/research/synthesize` returns a non-OK response or no response body
- [ ] AI synthesis treats `AbortError` as a silent cancellation and does not mark the panel as failed
- [ ] AI synthesis `useEffect` cleanup aborts the in-flight synthesis request on unmount or dependency change
- [ ] Citation parsing uses the exact regex `/\\[(\\d+)\\]/g`
- [ ] Citation markers that do not map to one of the top 5 results remain literal bracket text in the rendered synthesis body
- [ ] Citation labels are built from the last token of the first author string plus optional ` et al.` and the year
- [ ] A paper with no authors in the top 5 citation map renders the fallback label prefix `Unknown`
- [ ] Inline synthesis citation buttons set a `title` attribute of `Scroll to: {paper title}`
- [ ] Clicking a synthesis citation applies `ring-2 ring-brand/50` to the target result card and removes those classes after exactly `2000ms`
- [ ] Overflow detection uses `contentRef.current.scrollHeight > 96` after render and falls back to `synthesis.length > 400` before the ref is measured
- [ ] Read-more clamping uses `max-h-24 overflow-hidden`
- [ ] Free-plan overlay is not shown while the synthesis is still streaming and `synthesis` is empty
- [ ] Free-plan users never receive the `Read More` / `Show Less` toggle even when the synthesis overflows
- [ ] The current AI synthesis panel has no retry button, error copy, or recovery CTA after a failed synthesis request
- [ ] `/api/research/synthesize` requires authentication through `getCurrentUserId()`
- [ ] `/api/research/synthesize` rate-limits with key `"research"` and `RATE_LIMITS.ai`
- [ ] `/api/research/synthesize` returns HTTP 400 with `Missing required field: papers` when `papers` is absent or not an array
- [ ] `/api/research/synthesize` returns HTTP 503 with `AI not configured` when no model is available
- [ ] `mode === "plan"` uses `getSmallModel()` with temperature `0.3`
- [ ] `mode !== "plan"` uses `getModel()` with temperature `0.4`
- [ ] Plan-mode fenced JSON is stripped with `/```(?:json)?\\s*([\\s\\S]*?)```/` before parsing
- [ ] Invalid plan-mode JSON falls back to `{ sections: [], estimatedWordCount: 0 }`
- [ ] `buildSynthesisPrompt()` uses default word targets of `250` for `quick_summary`, `800` for `literature_review`, and `500` for `evidence_summary`
- [ ] `buildSynthesisPrompt()` uses the fallback instruction `Generate a literature synthesis.` when `reportType === "custom"` and `customInstructions` is missing
- [ ] `buildPaperContext()` truncates author display to the first 3 authors plus optional ` et al.`
- [ ] `buildPaperContext()` substitutes `Unknown`, `N/A`, and `No abstract available` fallback strings when paper fields are missing
#### Save, Cite, History, And Result Edge Cases
- [ ] `saveSearchQuery()` stores `queryType` as `"user"` by default when the caller does not provide one
- [ ] `saveSearchQuery()` stores `source` as `"all"` by default when the caller does not provide one
- [ ] `saveSearchQuery()` stores `augmentedQueries`, `filtersApplied`, and `parentQueryId` as `null` when the caller omits them
- [ ] `getRecentSearches()` first selects up to 20 history rows, then de-duplicates on lowercase `original_query`, then returns only the 5 most recent unique queries
- [ ] `getRecentSearches()` returns rows shaped as `{ query, resultCount, searchedAt }`
