# research — Spec 008

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Unified Search API Internals
- [x] PASS: `/api/search/unified` treats query augmentation as enabled unless the request explicitly sends `augment=false`
- [x] PASS: `/api/search/unified` only attempts AI query augmentation when `augment !== "false"` and the raw query length is greater than `20`
- [x] PASS: Query-augmentation failures fall back silently to the raw user query without surfacing an error in the response
- [x] PASS: `augmentQuery()` aborts its AI call after exactly `5000ms`
- [x] PASS: `augmentQuery()` asks for three source-specific query strings plus optional `yearStart`, `yearEnd`, and `publicationTypes` suggestions
- [x] PASS: Unified-search source fan-out computes `neededPerSource` as `Math.min((page + 1) * perPage, 100)`
- [x] PASS: Unified-search PubMed fan-out always requests `page: 0` and uses `maxResults: neededPerSource`
- [x] PASS: Unified-search Semantic Scholar fan-out always requests `offset: 0` and uses `limit: neededPerSource`
- [x] PASS: Unified-search OpenAlex fan-out always requests `page: 1` and uses `limit: neededPerSource`
- [x] PASS: Unified-search ClinicalTrials fan-out requests only `limit: perPage`, not `neededPerSource`
- [x] PASS: Each source fan-out call is wrapped in `withTimeout(..., 4500)` with per-source timeout strings like `PubMed timed out after 4500ms`
- [x] PASS: Unified search uses `Promise.allSettled(...)` so one degraded source does not abort the whole response
- [x] PASS: Unified search logs per-source degradation warnings instead of surfacing source-specific failures to the page
- [x] PASS: When all four source result sets are empty in development mode, unified search attempts fixture-based fallback results from `src/lib/search/__tests__/ralph-search/cache`
- [x] PASS: Development fallback is completely disabled when `NODE_ENV !== "development"`
- [x] PASS: Development fallback ignores fixtures whose normalized query-match score is below `0.55`
- [x] PASS: Reciprocal-rank fusion uses `k = 60` when combining source lists
- [x] PASS: Duplicate papers merged during reciprocal-rank fusion accumulate `rrfScore` contributions from every matched source
- [x] PASS: Reciprocal-rank fusion appends the new source name into `sources[]` only if that source is not already listed on the merged paper
- [x] PASS: Cohere reranking is skipped entirely when `COHERE_API_KEY` is missing
- [x] PASS: Cohere reranking is skipped entirely when the fused results array is empty
- [x] PASS: Cohere reranking posts to `https://api.cohere.com/v2/rerank` with model `rerank-v3.5`
- [x] PASS: Cohere reranking truncates `top_n` to `Math.min(results.length, 50)` when no explicit `topN` is passed
- [x] PASS: Cohere reranking falls back to the original fused order when the Cohere request throws
- [x] PASS: Unified search infers a missing `evidenceLevel` only when a result already has `studyType` but no evidence grade
- [x] PASS: Unified search enriches each result with `journalQuartile` and `journalImpactProxy` only when `lookupJournalQuality(journal)` returns a match
- [x] PASS: Study-type filtering is applied after rank fusion and reranking, not at the per-source adapter level
- [x] PASS: Open-access filtering is applied after rank fusion and reranking by checking `r.isOpenAccess`
- [x] PASS: Sort mode `citations` orders results by `(citationCount || 0)` descending
- [x] PASS: Sort mode `year` orders results by `(year || 0)` descending
- [x] PASS: Sort mode `evidence` orders results by evidence map `I=1`, `II=2`, `III=3`, `IV=4`, `V=5`
- [x] PASS: Results with missing or unrecognized evidence level are treated as Level V during backend evidence sorting
- [x] PASS: Unified search still contains a backend-only `impact` sort branch even though the current `/research` page never sends `sort=impact`
- [x] PASS: Unified-search pagination slices the filtered array with `start = page * perPage` and `end = start + perPage`
- [x] PASS: Unified-search `hasMore` becomes `true` only when `start + perPage < total`
