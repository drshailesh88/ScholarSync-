# research — Spec 007

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] AI synthesis panel auto-renders after a successful search with at least one result
- [ ] AI synthesis panel heading reads `Answer from top {paperCount} papers`
- [ ] AI synthesis panel limits its citation/reference map to the first 5 results
- [ ] AI synthesis request posts to `/api/research/synthesize` with `reportType: "quick_summary"` and `mode: "generate"`
- [ ] AI synthesis reruns only when the query/results fingerprint changes
- [ ] Starting a new synthesis resets `synthesis`, `failed`, and `expanded` before streaming begins
- [ ] AI synthesis panel returns `null` when synthesis failed or there is no text and no active stream
- [ ] Initial synthesis state hydrates from `initialSynthesis` restored out of session storage
- [ ] Streaming-without-text state shows four pulsing placeholder lines inside the synthesis card
- [ ] Citation markers like `[1]` are transformed into clickable inline citation buttons
- [ ] Clicking an inline synthesis citation scrolls to `#paper-result-{index}` and adds a temporary ring highlight for 2 seconds
- [ ] Free-plan users get a gradient blur overlay plus `Full AI analysis available on Pro`
- [ ] Free-plan upgrade link points to `/settings`
- [ ] `Read More` / `Show Less` toggle is available only for non-free plans when the synthesis content overflows and streaming has finished
- [ ] Route-level `loading.tsx` renders a title skeleton, one large search-bar skeleton, and three `SkeletonCard` placeholders
- [ ] Route-level error boundary title reads `Research unavailable`
- [ ] Route-level error boundary message reads `We couldn't load the research page. Please try again.`
#### Actual Current Behavior Corrections
- [ ] The live `/research` route does not currently render the checkbox-driven results table from `ResultsTable.tsx`
- [ ] The live `/research` route does not currently render per-row selection checkboxes or a `Select all` header checkbox
- [ ] The live `/research` route does not currently render the `Build Evidence Table` action bar from the newer research component stack
- [ ] The live `/research` route does not currently render the `PaperDetailPanel` flow described in the original document
- [ ] The live `/research` route does not currently render the `VerificationBadge`-based result-row layout from `ResultRow.tsx`
- [ ] The live `/research` route does not currently render a separate `Insert Citation` action; it exposes `Save & Cite` instead
- [ ] The live `/research` route does not currently use a `Load more results...` button; it uses paginated Previous/Next controls
- [ ] The live `/research` route does not currently expose the `SearchInput`, `ResearchPlan`, `EvidenceTable`, `SynthesisDialog`, or `Paper Chat` tabs documented for the alternate search stack
- [ ] The live search backend uses 4.5-second per-source timeouts in `/api/search/unified`, not the 8-second timeout claimed in the original doc
- [ ] The live search backend fans out to four sources including OpenAlex and ClinicalTrials.gov, not just PubMed and Semantic Scholar
#### Unified Search API Internals
- [ ] `/api/search/unified` rejects unauthenticated requests with `Authentication required`
- [ ] `/api/search/unified` applies `checkRateLimit(userId, "search", RATE_LIMITS.search)` before parsing query params
- [ ] `/api/search/unified` returns HTTP 400 with `Query parameter 'q' is required` when `q` is missing
- [ ] `/api/search/unified` returns HTTP 400 with `Query parameter 'q' must not exceed 500 characters` when `q.length > 500`
- [ ] `/api/search/unified` defaults `page` to `0` when the query param is absent
- [ ] `/api/search/unified` defaults `perPage` to `20` when the query param is absent
- [ ] `/api/search/unified` caps `perPage` at `100` even if a larger value is requested
- [ ] `/api/search/unified` defaults `sort` to `relevance` when the query param is absent
