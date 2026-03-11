# research — Spec 008

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Unified Search API Internals
- [ ] `/api/search/unified` treats query augmentation as enabled unless the request explicitly sends `augment=false`
- [ ] `/api/search/unified` only attempts AI query augmentation when `augment !== "false"` and the raw query length is greater than `20`
- [ ] Query-augmentation failures fall back silently to the raw user query without surfacing an error in the response
- [ ] `augmentQuery()` aborts its AI call after exactly `5000ms`
- [ ] `augmentQuery()` asks for three source-specific query strings plus optional `yearStart`, `yearEnd`, and `publicationTypes` suggestions
- [ ] Unified-search source fan-out computes `neededPerSource` as `Math.min((page + 1) * perPage, 100)`
- [ ] Unified-search PubMed fan-out always requests `page: 0` and uses `maxResults: neededPerSource`
- [ ] Unified-search Semantic Scholar fan-out always requests `offset: 0` and uses `limit: neededPerSource`
- [ ] Unified-search OpenAlex fan-out always requests `page: 1` and uses `limit: neededPerSource`
- [ ] Unified-search ClinicalTrials fan-out requests only `limit: perPage`, not `neededPerSource`
- [ ] Each source fan-out call is wrapped in `withTimeout(..., 4500)` with per-source timeout strings like `PubMed timed out after 4500ms`
- [ ] Unified search uses `Promise.allSettled(...)` so one degraded source does not abort the whole response
- [ ] Unified search logs per-source degradation warnings instead of surfacing source-specific failures to the page
- [ ] When all four source result sets are empty in development mode, unified search attempts fixture-based fallback results from `src/lib/search/__tests__/ralph-search/cache`
- [ ] Development fallback is completely disabled when `NODE_ENV !== "development"`
- [ ] Development fallback ignores fixtures whose normalized query-match score is below `0.55`
- [ ] Reciprocal-rank fusion uses `k = 60` when combining source lists
- [ ] Duplicate papers merged during reciprocal-rank fusion accumulate `rrfScore` contributions from every matched source
- [ ] Reciprocal-rank fusion appends the new source name into `sources[]` only if that source is not already listed on the merged paper
- [ ] Cohere reranking is skipped entirely when `COHERE_API_KEY` is missing
- [ ] Cohere reranking is skipped entirely when the fused results array is empty
- [ ] Cohere reranking posts to `https://api.cohere.com/v2/rerank` with model `rerank-v3.5`
- [ ] Cohere reranking truncates `top_n` to `Math.min(results.length, 50)` when no explicit `topN` is passed
- [ ] Cohere reranking falls back to the original fused order when the Cohere request throws
- [ ] Unified search infers a missing `evidenceLevel` only when a result already has `studyType` but no evidence grade
- [ ] Unified search enriches each result with `journalQuartile` and `journalImpactProxy` only when `lookupJournalQuality(journal)` returns a match
- [ ] Study-type filtering is applied after rank fusion and reranking, not at the per-source adapter level
- [ ] Open-access filtering is applied after rank fusion and reranking by checking `r.isOpenAccess`
- [ ] Sort mode `citations` orders results by `(citationCount || 0)` descending
- [ ] Sort mode `year` orders results by `(year || 0)` descending
- [ ] Sort mode `evidence` orders results by evidence map `I=1`, `II=2`, `III=3`, `IV=4`, `V=5`
- [ ] Results with missing or unrecognized evidence level are treated as Level V during backend evidence sorting
- [ ] Unified search still contains a backend-only `impact` sort branch even though the current `/research` page never sends `sort=impact`
- [ ] Unified-search pagination slices the filtered array with `start = page * perPage` and `end = start + perPage`
- [ ] Unified-search `hasMore` becomes `true` only when `start + perPage < total`
