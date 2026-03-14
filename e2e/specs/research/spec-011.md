# research — Spec 011

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### AI Synthesis Panel Internals
- [x] PASS: AI synthesis does not rerun when only non-title metadata changes on the same top 5 papers because the fingerprint only tracks query text and titles
- [x] PASS: AI synthesis request body includes only `title`, `authors`, `year`, `journal`, `abstract`, `pmid`, `doi`, and `studyType` for the top 5 papers
- [x] PASS: AI synthesis sends an empty string for `abstract` when a result has no abstract
- [x] PASS: AI synthesis aborts any previous streaming request before starting a new one
- [x] PASS: AI synthesis marks the panel as failed and hides it when `/api/research/synthesize` returns a non-OK response or no response body
- [x] PASS: AI synthesis treats `AbortError` as a silent cancellation and does not mark the panel as failed
- [x] PASS: AI synthesis `useEffect` cleanup aborts the in-flight synthesis request on unmount or dependency change
- [x] PASS: Citation parsing uses the exact regex `/\\[(\\d+)\\]/g`
- [x] PASS: Citation markers that do not map to one of the top 5 results remain literal bracket text in the rendered synthesis body
- [x] PASS: Citation labels are built from the last token of the first author string plus optional ` et al.` and the year
- [x] PASS: A paper with no authors in the top 5 citation map renders the fallback label prefix `Unknown`
- [x] PASS: Inline synthesis citation buttons set a `title` attribute of `Scroll to: {paper title}`
- [x] PASS: Clicking a synthesis citation applies `ring-2 ring-brand/50` to the target result card and removes those classes after exactly `2000ms`
- [x] PASS: Overflow detection uses `contentRef.current.scrollHeight > 96` after render and falls back to `synthesis.length > 400` before the ref is measured
- [x] PASS: Read-more clamping uses `max-h-24 overflow-hidden`
- [x] PASS: Free-plan overlay is not shown while the synthesis is still streaming and `synthesis` is empty
- [x] PASS: Free-plan users never receive the `Read More` / `Show Less` toggle even when the synthesis overflows
- [x] PASS: The current AI synthesis panel has no retry button, error copy, or recovery CTA after a failed synthesis request
- [x] PASS: `/api/research/synthesize` requires authentication through `getCurrentUserId()`
- [x] PASS: `/api/research/synthesize` rate-limits with key `"research"` and `RATE_LIMITS.ai`
- [x] PASS: `/api/research/synthesize` returns HTTP 400 with `Missing required field: papers` when `papers` is absent or not an array
- [x] PASS: `/api/research/synthesize` returns HTTP 503 with `AI not configured` when no model is available
- [x] PASS: `mode === "plan"` uses `getSmallModel()` with temperature `0.3`
- [x] PASS: `mode !== "plan"` uses `getModel()` with temperature `0.4`
- [x] PASS: Plan-mode fenced JSON is stripped with `/```(?:json)?\\s*([\\s\\S]*?)```/` before parsing
- [x] PASS: Invalid plan-mode JSON falls back to `{ sections: [], estimatedWordCount: 0 }`
- [x] PASS: `buildSynthesisPrompt()` uses default word targets of `250` for `quick_summary`, `800` for `literature_review`, and `500` for `evidence_summary`
- [x] PASS: `buildSynthesisPrompt()` uses the fallback instruction `Generate a literature synthesis.` when `reportType === "custom"` and `customInstructions` is missing
- [x] PASS: `buildPaperContext()` truncates author display to the first 3 authors plus optional ` et al.`
- [x] PASS: `buildPaperContext()` substitutes `Unknown`, `N/A`, and `No abstract available` fallback strings when paper fields are missing
#### Save, Cite, History, And Result Edge Cases
- [x] PASS: `saveSearchQuery()` stores `queryType` as `"user"` by default when the caller does not provide one
- [x] PASS: `saveSearchQuery()` stores `source` as `"all"` by default when the caller does not provide one
- [x] PASS: `saveSearchQuery()` stores `augmentedQueries`, `filtersApplied`, and `parentQueryId` as `null` when the caller omits them
- [x] PASS: `getRecentSearches()` first selects up to 20 history rows, then de-duplicates on lowercase `original_query`, then returns only the 5 most recent unique queries
- [x] PASS: `getRecentSearches()` returns rows shaped as `{ query, resultCount, searchedAt }`
