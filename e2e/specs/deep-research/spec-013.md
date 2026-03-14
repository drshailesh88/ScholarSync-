# deep-research — Spec 013

STATUS: PARTIAL
TESTED: 35/35
PASS: 13
FAIL: 22
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Quick Test Workflows
#### API Routes Called by the Page
- [x] PASS: Execute-route `progress` SSE payloads contain `stage` and `message`, but no numeric `progress`.
- [x] PASS: Execute-route `report` SSE payload nests the final report under `report` and includes `markdownReport`, `topic`, `mode`, `summary`, `keyFindings`, `gaps`, `contradictions`, `totalSources`, `searchRounds`, `citationTraversalPapers`, `extractedDataCount`, `durationMs`, `perspectives`, `perspectiveSections`, and `sources`.
- [ ] FAIL: `GET /api/deep-research/sessions` reads from `deepResearchSessions`, orders by `completedAt DESC`, applies `.limit(20)`, and returns `{ sessions: [...] }`.
- [ ] FAIL: `GET /api/deep-research/sessions/{id}` filters by both session ID and `userId`, returns `400 {"error":"Invalid session ID"}` for bad IDs, `404 {"error":"Session not found"}` for missing or unowned rows, and success payload `{ id, topic, mode, markdownReport, sources, keyFindings, gaps, papersFound, completedAt }`.
- [x] PASS: `POST /api/deep-research/save` inserts into `deepResearchSessions` with `userId`, `originalQuery`, `finalReport`, `keyFindings`, `gapsIdentified`, `researchPlan: { mode, sources }`, `status: "completed"`, `papersFound`, `papersRead`, and `completedAt`, then returns `{ id, success: true }`.
- [x] PASS: `POST /api/deep-research/open-in-studio` requires both `topic` and `markdownReport`; otherwise it returns `400 {"error":"Topic and markdownReport are required"}`.
- [ ] FAIL: `POST /api/deep-research/open-in-studio` best-effort inserts a matching `deepResearchSessions` row before creating Studio records; failures in that insert are logged and do not stop Studio creation.
- [ ] FAIL: `POST /api/deep-research/open-in-studio` inserts a `projects` row with `project_type: "literature_review"` and `status: "drafting"`, inserts a `synthesisDocuments` row with `document_type: "review_article"`, inserts one `synthesisSections` row titled `Research Report`, and returns `{ projectId, documentId, redirectUrl }`.
- [x] PASS: `POST /api/export/pdf` is the only route in this flow that uses Zod and rate limiting.
- [x] PASS: `POST /api/export/pdf` requires auth and returns `401 {"error":"Authentication required"}` when auth fails.
- [x] PASS: `POST /api/export/pdf` rate-limits the caller with `checkRateLimit(userId, "export", RATE_LIMITS.export)`, where `RATE_LIMITS.export` is `30` requests per `3600` seconds.
- [x] PASS: `POST /api/export/pdf` returns `429 {"error":"Rate limit exceeded. Please try again later."}` with header `X-RateLimit-Remaining` when the rate limit is exceeded.
- [x] PASS: `POST /api/export/pdf` validates the request with `z.object({ title: z.string().max(500).optional(), content: z.string().max(500000), citations: z.array(z.string()).max(1000).optional() })`.
- [x] PASS: `POST /api/export/pdf` returns `400 {"error":"Invalid request data"}` on Zod validation failure, `400 {"error":"Content is required"}` when `content` is an empty string, a binary PDF on success, and `500 {"error":"Export failed"}` on unexpected failure.
#### Backend Engine and Library Behavior
- [ ] FAIL: `validateTopic()` returns `{ valid: false, error: "Topic must be at least 5 characters long" }` when `topic.trim().length < 5`.
- [ ] FAIL: `validateTopic()` returns `{ valid: false, error: "Topic must be 500 characters or fewer" }` when `topic.trim().length > 500`.
- [ ] FAIL: Engine `buildConfig()` uses `quick = { depth: 1, breadth: 2, maxSources: 15, perSourceLimit: 10 }`.
- [ ] FAIL: Engine `buildConfig()` uses `standard = { depth: 2, breadth: 3, maxSources: 30, perSourceLimit: 15 }`.
- [ ] FAIL: Engine `buildConfig()` uses `deep = { depth: 3, breadth: 5, maxSources: 60, perSourceLimit: 20 }`.
- [ ] FAIL: Engine `buildConfig()` uses `exhaustive = { depth: 4, breadth: 7, maxSources: 100, perSourceLimit: 25 }`.
- [ ] FAIL: Engine search always fans out across PubMed, Semantic Scholar, and OpenAlex in `searchAllSources()`; there is no user-selectable source filter in the route UI.
- [ ] FAIL: Round-1 search batches three queries at a time and sleeps for exactly 500 ms between batches.
- [x] PASS: Citation traversal batches three seed papers at a time, calls Semantic Scholar `citations` and `references` endpoints with a 15-second timeout each, and sleeps for exactly 500 ms between batches.
- [ ] FAIL: Citation traversal seeds the graph with the top 5 papers in quick mode and the top 10 papers in all other modes.
- [ ] FAIL: Round-2 follow-up search only runs when `config.depth >= 2`.
- [ ] FAIL: Round-3 follow-up search only runs when `config.depth >= 3`.
- [ ] FAIL: Unpaywall lookup only checks the first 100 DOI-bearing papers.
- [x] PASS: Full-text extraction only targets open-access papers with `fullTextUrl` and `isOpenAccess`, and it picks the top 5 papers in quick mode, 10 in standard mode, and 20 in deep or exhaustive mode.
- [ ] FAIL: Full-text extraction aborts each PDF fetch after exactly `15000` ms.
- [ ] FAIL: Full-text extraction rejects PDFs larger than 20 MB before or after download.
- [ ] FAIL: Extracted full text is truncated to `15000` characters after section extraction.
- [x] PASS: Full-text extraction failure returns `null` for that paper and increments the `failed` count; it does not fall back to the abstract.
- [ ] FAIL: Data extraction batches five papers at a time and sleeps for exactly 200 ms between batches.
- [ ] FAIL: Data extraction limits papers to 10 in quick mode, 20 in standard mode, and 40 in deep or exhaustive mode.
- [ ] FAIL: Synthesis uses four passes: per-perspective sections, executive summary/introduction, tables and analysis, then critique-and-revision.
