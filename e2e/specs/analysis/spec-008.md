# analysis — Spec 008

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/analysis
MODULE: analysis

---
### Quick Test Workflows
#### `src/app/api/integrity-check/route.ts` — Error Responses (exact text)
- [ ] 503 when AI detection throws returns `{ error: "AI detection service is unavailable. Please try again later." }` (~line 102)
- [ ] 500 catch-all returns `{ error: "Failed to analyze text" }` (~line 159)
- [ ] Rate limit exceeded returns status **429** (not 503) with `{ error: "Rate limit exceeded. Please try again later." }` and `X-RateLimit-Remaining` header (`src/lib/rate-limit.ts` ~line 77)
- [ ] Rate limit key format is `{userId}:integrity-check` using `RATE_LIMITS.analysis` config (`src/lib/rate-limit.ts` ~line 56, route ~line 53)
- [ ] API checks `isAIConfigured()` before processing and returns 503 if false (~line 59)
- [ ] API persists results to `integrityChecks` database table after every successful check (~line 120)
- [ ] Database persistence failure is non-fatal — results are still returned to the client (~line 148-150)
- [ ] `contentChecked` field in DB is truncated to first 5000 characters of submitted text (~line 125)
- [ ] Zod `sources` schema validates an array of objects with optional fields: `title`, `doi`, `pmid`, `authors` (string array), `year` (number) (~line 23-31)
#### `src/lib/integrity/index.ts` — Tier Gating and Response Shape
- [ ] Paid plans are `["basic", "pro", "institutional"]` — the `PAID_PLANS` set at ~line 22
- [ ] Free plan users get AI detection only; plagiarism, citation audit, and self-plagiarism engines are skipped (~lines 37-40)
- [ ] Response includes `tier` field ("free" or "paid"), `checkedAt` ISO timestamp, and optional `selfPlagiarism` and `citationAudit` fields (~line 104-120)
- [ ] `writingQuality.passiveVoiceCount` in the API response is derived from `(passiveVoicePercent / 100) * sentenceCount`, not from write-good (~line 111-113)
- [ ] `writingQuality.readabilityGrade` in the API response comes from the AI detection engine's Flesch-Kincaid grade, not from the client-side `fleschReadingEase` (~line 116)
#### `src/lib/writing-analysis.ts` — Metric Formatting Precision
- [ ] `fleschReadingEase` is clamped to 0-100 range and rounded to integer with `Math.round()` (~line 170-178)
- [ ] `fleschKincaidGrade` is clamped to >= 0 and rounded to 1 decimal place: `Math.round(rawGrade * 10) / 10` (~line 183-186)
- [ ] `gunningFogIndex` is clamped to >= 0 and rounded to 1 decimal place: `Math.round(... * 10) / 10` (~line 191-196)
- [ ] `automatedReadabilityIndex` is clamped to >= 0 and rounded to 1 decimal: `Math.round(... * 10) / 10` (~line 259-262)
- [ ] `colemanLiauIndex` is clamped to >= 0 and rounded to 1 decimal: `Math.round(... * 10) / 10` (~line 268-271)
- [ ] `vocabularyDiversity` is a type-token ratio rounded to 2 decimal places: `Math.round(... * 100) / 100` (~line 275)
- [ ] `avgSyllablesPerWord` is rounded to 2 decimal places: `Math.round(... * 100) / 100` (~line 292)
- [ ] `avgWordsPerSentence` and `avgSentenceLength` are identical values, both `Math.round(avgWordsPerSentence * 10) / 10` (~line 282-283)
- [ ] `complexWordPercentage` is rounded to 1 decimal: `Math.round(... * 1000) / 10` (~line 290)
#### `src/lib/writing-analysis.ts` — Issue Generation Details
- [ ] `classifyReason()` maps write-good reasons: "passive voice" → type `passive` / severity `warning`; "weasel" → type `weasel` / severity `warning`; "adverb" → type `adverb` / severity `info`; all others → type `readability` / severity `info` (~line 94-112)
- [ ] Complex sentence issues have reason `"This sentence has {N} words. Consider breaking it up for clarity."` and suggestion `"Break this into shorter sentences for better readability."` (~line 241-248)
- [ ] `isComplexWord()` requires 3+ syllables AND excludes words ending in "ed", "es", or "ing" (~line 118-127)
#### `src/lib/integrity/ai-detection.ts` — Detection Engine Details
- [ ] `HEDGING_PHRASES` array contains exactly 35 hedging phrases (~line 144-182)
- [ ] `PARAGRAPH_BATCH_SIZE` for LLM analysis is 4 paragraphs per batch (~line 185)
- [ ] `overallRisk` derivation: humanScore >= 70 → "low", >= 40 → "medium", < 40 → "high" (~line 1090-1097)
- [ ] `aiScore` is computed as `100 - humanScore` after clamping (~line 1088)
- [ ] Binoculars score is mapped to human probability: `(score / threshold - 0.5) * 100`, clamped to 0-100 (~line 64-69)
- [ ] Combined paid-tier score: 60% Binoculars + 40% LLM-heuristic, rounded (~line 1075-1077)
- [ ] `computeTextStatistics` rounds `avgSentenceLength` to 2 decimal places, `typeTokenRatio` to 3 decimal places, `formulaicTransitionDensity` to 3 decimal places (~line 421-431)
#### `src/lib/integrity/plagiarism-engine.ts` — Severity Thresholds
- [ ] Plagiarism severity: Jaccard similarity >= 0.4 → "high", >= 0.2 → "medium", < 0.2 → "low" (~line 500-504)
- [ ] Plagiarism matches below 0.08 Jaccard similarity are not reported (~line 599)
