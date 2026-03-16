# Analysis — Claude Code Pass 2 Verification Report

**Total assertions reviewed:** 88
**Verified Correct:** 84
**Hallucinated / Inaccurate:** 2
**Partially Correct:** 2
**Accuracy rate:** 95.5%

## Hallucinated / Inaccurate
- [line 803] "Free plan users get AI detection only; plagiarism, citation audit, and self-plagiarism engines are skipped" — WRONG because `runIntegrityCheck()` still runs `runSelfPlagiarismCheck()` whenever `userId` is present and `mode` is `"full"` or `"plagiarism"`, regardless of plan.
- [line 869] "Loading skeleton renders exactly 4 `Skeleton` elements..." — WRONG because `src/app/(app)/analysis/loading.tsx` renders 5 `Skeleton` components: back button, title, textarea, word-count placeholder, and button placeholder.

## Partially Correct
- [line 804] "Response includes `tier` field (\"free\" or \"paid\"), `checkedAt` ISO timestamp, and optional `selfPlagiarism` and `citationAudit` fields" — MOSTLY RIGHT but `citationAudit` is always returned and nullable; only `selfPlagiarism` is optional.
- [line 832] "Binoculars score is mapped to human probability: `(score / threshold - 0.5) * 100`, clamped to 0-100" — MOSTLY RIGHT but the implementation also wraps the clamped value in `Math.round()`.

## Behavior Corrections
1. Readability labels: verified. `src/lib/writing-analysis.ts` returns `"Easy"` for `score >= 60`, `"Standard"` for `score >= 40`, `"Difficult"` for `score >= 20`, and `"Very Difficult"` otherwise.
2. Rate limit status: verified. `src/lib/rate-limit.ts` returns `429`, not `503`, in both Upstash and in-memory paths.
3. Reset button text: verified. `src/app/(app)/analysis/page.tsx` renders `&larr; Analyze New Text`.
4. Hedging phrase count: verified. `HEDGING_PHRASES` contains exactly 35 entries.
5. Page/API shape mismatch: verified. The page expects flat top-level `humanScore`, `aiScore`, `paragraphAnalysis`, and `plagiarismIndicators`, while the API returns nested `aiDetection` and `plagiarism` objects via `IntegrityCheckResult`.
6. Unused documented modules: verified. `/analysis` does not import `useRealtimeIntegrity`, `analyzeText()`, or `runWritingAnalysis()`.

## Key Technical Claims
- Writing suggestions engine: verified.
  - `avgSentenceLength > 28` → `Your average sentence length is high. Consider breaking long sentences for readability.`
  - `sentenceLengthStdDev < 3` → `Your sentence lengths are very uniform — this is a common AI writing pattern. Vary your sentence structure.`
  - `passiveVoicePercent > 30` → `${Math.round(s.passiveVoicePercent)}% of sentences use passive voice. Consider using more active voice.`
  - `typeTokenRatio < 0.35 && typeTokenRatio > 0` → `Vocabulary diversity is low. Use more varied word choices to strengthen your writing.`
  - `hedgingPhraseCount > 5` → `Found ${s.hedgingPhraseCount} hedging phrases (e.g. "It is important to note"). These are common in AI-generated text — consider being more direct.`
  - `readabilityGrade > 16` → `Readability grade is above 16 (postgraduate level). Consider simplifying for broader accessibility.`
- API error messages: verified.
  - `401` → `{ error: "Not authenticated" }`
  - `400` → `{ error: "Invalid request", details: ... }`
  - `429` → `{ error: "Rate limit exceeded. Please try again later." }`
  - `503` (AI not configured) → `{ error: "AI service is not configured." }`
  - `503` (AI detection failure) → `{ error: "AI detection service is unavailable. Please try again later." }`
  - `500` → `{ error: "Failed to analyze text" }`
- Metric formatting: verified.
  - `fleschReadingEase`: integer, clamped `0-100`
  - `fleschKincaidGrade`: 1 decimal
  - `gunningFogIndex`: 1 decimal
  - `automatedReadabilityIndex`: 1 decimal
  - `colemanLiauIndex`: 1 decimal
  - `vocabularyDiversity`: 2 decimals
  - `avgSyllablesPerWord`: 2 decimals
  - `avgWordsPerSentence`: 1 decimal
  - `avgSentenceLength`: 1 decimal and identical to `avgWordsPerSentence`
- CircularGauge: verified. Color thresholds are `>=80` green, `>=60` yellow, `>=40` orange, else red; page uses `size={110}` for instant mode and `size={120}` for results mode; component stroke width is `10`, active arc uses `strokeLinecap="round"`, and animation class is `transition-all duration-1000`.
- AI detection implementation details: verified. Hedging phrases = `35`, paragraph batch size = `4`, `overallRisk` derives from `humanScore` (`>=70 low`, `>=40 medium`, else `high`).
- Plagiarism engine: verified. Severity thresholds are `0.4 / 0.2`, minimum reported Jaccard is `0.08`, and scholarly lookups abort after `12000ms`.
- Helper components: verified.
  - `ToneBadge` exists and renders label left, colored badge right.
  - `IssueBadge` exists and renders numeric count plus label with four color maps.
  - `MetricBar` exists and renders a capped width bar using `Math.min((value / max) * 100, 100)`.

## Whole-Doc Cleanup
- Removed the old library readability-label hallucination (`Excellent/Good/Needs Improvement/Poor`) and replaced it with the actual `Easy/Standard/Difficult/Very Difficult` thresholds.
- Corrected all rate-limit references from `503` to `429`.
- Corrected the reset-button text to `← Analyze New Text`.
- Removed the fake analyze-button spinner claim; `CircleNotch` is used only in the document-loading state.
- Removed `/analysis` feature claims for `useRealtimeIntegrity`, `runWritingAnalysis()`, and `analyzeText()`, which are not in the page import tree.
- Corrected icon usage notes for `FileText` and `CircleNotch`.
- Added a documented integration-risk note for the current page/API response-shape mismatch.
