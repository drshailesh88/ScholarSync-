# compliance — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Realtime Integrity Hook
#### Behavior
- [ ] Skips check if text unchanged by less than `MIN_CHANGE_LENGTH` characters (except first check)

### API Endpoints
#### POST `/api/integrity-check`
- [ ] Returns 401 if not authenticated
- [ ] Rate limited (20/hr via `RATE_LIMITS.analysis`)
- [ ] Returns 503 if AI not configured
- [ ] Returns 400 with validation errors on bad input
- [ ] Persists results to `integrityChecks` DB table (non-fatal if DB save fails)
- [ ] Plan gating: free users get AI detection only; paid users get all engines
#### GET `/api/integrity-check/history`
- [ ] Returns `{ checks: [...], total: number }`
- [ ] Ordered by `createdAt` descending
- [ ] Each check includes: id, createdAt, aiScore, plagiarismScore, wordCount, engine, checkType, projectId
#### POST `/api/integrity-check/humanize`
- [ ] Returns `{ rewritten: string, changes: string[] }`
- [ ] Uses small model (Claude Haiku) with structured output
- [ ] System prompt instructs to vary sentence lengths, reduce hedging, use active voice, preserve citations
#### POST `/api/integrity-check/paraphrase`
- [ ] Returns `{ paraphrased: string, citationSuggestion: string }`
- [ ] Uses small model (Claude Haiku) with structured output
- [ ] System prompt: rewrite to reduce plagiarism similarity while maintaining integrity
#### POST `/api/integrity-check/report`
- [ ] Returns `text/markdown` with `Content-Disposition: attachment`
- [ ] Filename: `integrity-report-YYYY-MM-DD.md`
#### POST `/api/integrity-check/batch`
- [ ] Max 5MB per file
- [ ] Max 30 files per batch
- [ ] Allowed types: PDF, DOCX (by MIME type or extension)
- [ ] Empty files rejected
- [ ] Creates batch record, processes files in background
- [ ] Returns `{ batchId, fileCount, status: "processing" }`
- [ ] 60-second timeout per file (extraction + check)
- [ ] Failed files saved with error message (e.g., scanned PDF)
- [ ] GET endpoint: fetch batch status by `?id=` query param
#### POST `/api/copyleaks`
- [ ] Returns 503 if `COPYLEAKS_EMAIL` or `COPYLEAKS_API_KEY` not configured
- [ ] Rate limited via `RATE_LIMITS.analysis`

### Engine Internals
#### Orchestrator (`src/lib/integrity/index.ts`)
- [ ] Engines run in parallel via `Promise.all`
- [ ] Each engine has `.catch()` fallback returning safe defaults (non-fatal)
#### AI Detection Engine
- [ ] **LLM-heuristic** — free tier, always runs
- [ ] **Binoculars** — paid tier only, runs on Replicate GPU
- [ ] **Blend** — 60% heuristic / 40% Binoculars when both available
- [ ] Computes `TextStatistics`: avgSentenceLength, sentenceLengthStdDev, typeTokenRatio, passiveVoicePercent, readabilityGrade, hedgingPhraseCount, formulaicTransitionDensity, paragraphLengthStdDev, repetitiveSentenceOpeningRatio, markdownHeadingCount
