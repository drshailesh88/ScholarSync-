# compliance — Spec 006

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Realtime Integrity Hook
#### Behavior
- [x] PASS: Skips check if text unchanged by less than `MIN_CHANGE_LENGTH` characters (except first check)

### API Endpoints
#### POST `/api/integrity-check`
- [x] PASS: Returns 401 if not authenticated
- [x] PASS: Rate limited (20/hr via `RATE_LIMITS.analysis`)
- [x] PASS: Returns 503 if AI not configured
- [x] PASS: Returns 400 with validation errors on bad input
- [x] PASS: Persists results to `integrityChecks` DB table (non-fatal if DB save fails)
- [x] PASS: Plan gating: free users get AI detection only; paid users get all engines
#### GET `/api/integrity-check/history`
- [x] PASS: Returns `{ checks: [...], total: number }`
- [x] PASS: Ordered by `createdAt` descending
- [x] PASS: Each check includes: id, createdAt, aiScore, plagiarismScore, wordCount, engine, checkType, projectId
#### POST `/api/integrity-check/humanize`
- [x] PASS: Returns `{ rewritten: string, changes: string[] }`
- [x] PASS: Uses small model (Claude Haiku) with structured output
- [x] PASS: System prompt instructs to vary sentence lengths, reduce hedging, use active voice, preserve citations
#### POST `/api/integrity-check/paraphrase`
- [x] PASS: Returns `{ paraphrased: string, citationSuggestion: string }`
- [x] PASS: Uses small model (Claude Haiku) with structured output
- [x] PASS: System prompt: rewrite to reduce plagiarism similarity while maintaining integrity
#### POST `/api/integrity-check/report`
- [x] PASS: Returns `text/markdown` with `Content-Disposition: attachment`
- [x] PASS: Filename: `integrity-report-YYYY-MM-DD.md`
#### POST `/api/integrity-check/batch`
- [x] PASS: Max 5MB per file
- [x] PASS: Max 30 files per batch
- [x] PASS: Allowed types: PDF, DOCX (by MIME type or extension)
- [x] PASS: Empty files rejected
- [x] PASS: Creates batch record, processes files in background
- [x] PASS: Returns `{ batchId, fileCount, status: "processing" }`
- [x] PASS: 60-second timeout per file (extraction + check)
- [x] PASS: Failed files saved with error message (e.g., scanned PDF)
- [x] PASS: GET endpoint: fetch batch status by `?id=` query param
#### POST `/api/copyleaks`
- [x] PASS: Returns 503 if `COPYLEAKS_EMAIL` or `COPYLEAKS_API_KEY` not configured
- [x] PASS: Rate limited via `RATE_LIMITS.analysis`

### Engine Internals
#### Orchestrator (`src/lib/integrity/index.ts`)
- [x] PASS: Engines run in parallel via `Promise.all`
- [x] PASS: Each engine has `.catch()` fallback returning safe defaults (non-fatal)
#### AI Detection Engine
- [x] PASS: **LLM-heuristic** — free tier, always runs
- [x] PASS: **Binoculars** — paid tier only, runs on Replicate GPU
- [x] PASS: **Blend** — 60% heuristic / 40% Binoculars when both available
- [x] PASS: Computes `TextStatistics`: avgSentenceLength, sentenceLengthStdDev, typeTokenRatio, passiveVoicePercent, readabilityGrade, hedgingPhraseCount, formulaicTransitionDensity, paragraphLengthStdDev, repetitiveSentenceOpeningRatio, markdownHeadingCount
