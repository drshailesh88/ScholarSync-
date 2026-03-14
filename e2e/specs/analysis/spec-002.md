# analysis — Spec 002

STATUS: COMPLETE
TESTED: 35/35
PASS: 33
FAIL: 0
BLOCKED: 2
PAGE: http://localhost:3001/analysis
MODULE: analysis

---
### Results Mode — Issues Tab (Right Side)
#### Tab Header
- [x] PASS: **Active tab** — Tabs component applies `bg-surface-raised text-ink border border-border-subtle` to the active tab key, verified in src/components/ui/tabs.tsx:35-36
#### API Suggestions
- [x] PASS: **Styling** — suggestions rendered with `bg-purple-500/10` class and Sparkle icon (size=14, text-purple-500), verified in page.tsx:558-560
- [x] PASS: **Label** — each suggestion labeled `Suggestion {i + 1}` via template literal, verified in page.tsx:562
- [x] PASS: **Content** — displays AI-generated improvement suggestions from `result.writingQuality.suggestions` array, verified in page.tsx:565
#### Writing Issues (from write-good)
- [x] PASS: **Max 15 issues** — `clientIssues.slice(0, 15)` limits display to 15, with "+N more issues" overflow text, verified in page.tsx:578,606-609
- [x] PASS: **Color coding by type** — passive=yellow-500/10, weasel=orange-500/10, complex=red-500/10, adverb/readability=blue-500/10, verified in page.tsx:579-586
- [x] PASS: **Issue details** — shows reason and suggestion (if available). Fixed: added conditional suggestion rendering below reason text. Verified in page.tsx:602-605
#### Plagiarism Indicators
- [x] PASS: **Severity badges** — displays `{severity.toUpperCase()} Risk` for each match (e.g. "HIGH Risk"), with color-coded backgrounds. Verified in page.tsx:643
- [x] PASS: **Match details** — shows excerpt in italics with quotes and source information (title, authors, year). Fixed: mapped PlagiarismMatch.source fields into concern string. Verified in page.tsx:646-649

### Results Mode — Detailed Metrics Tab (Right Side)
#### 4. Paragraph Breakdown
- [x] PASS: **Per-paragraph scores** — renders each paragraph with `{p.humanProbability}% human` badge via paragraphAnalysis array, verified in page.tsx:758-776
- [x] PASS: **Color-coded** — uses same thresholds: <40% = red-500/10, 40-70% = yellow-500/10, >70% = emerald-500/10, matching left panel's getParagraphBg(), verified in page.tsx:765-770

### Writing Analysis Library
#### Library Dependencies
- [x] PASS: **write-good** — imported as `writeGood` from "write-good" on line 1, used for passive voice, weasel word, adverb detection via classifyReason(). Verified in src/lib/writing-analysis.ts:1,205-228
- [x] PASS: **Complex sentence detection** — sentences with more than 35 words flagged: `if (sentenceWordCount > 35)` pushes a "complex" type issue. Verified in src/lib/writing-analysis.ts:237
- [x] PASS: **Multiple readability formulas** — all 5 implemented: Flesch Reading Ease (line 170), Flesch-Kincaid Grade (line 182), Gunning Fog Index (line 191), Automated Readability Index (line 259), Coleman-Liau Index (line 268). Verified in src/lib/writing-analysis.ts

### API — POST /api/integrity-check
#### Rate Limiting
- [x] PASS: **Limit** — 20 requests per hour per user: `RATE_LIMITS.analysis = { limit: 20, windowSeconds: 3600 }`. Verified in src/lib/rate-limit.ts:117
- [x] PASS: **Exceeded** — returns 429 status via `checkRateLimit()` which returns `NextResponse.json({ error: "Rate limit exceeded..." }, { status: 429 })`. Verified in src/lib/rate-limit.ts:80,97

### AI Detection Engine
#### Binoculars Model
- [x] PASS: **Model** — `const BINOCULARS_MODEL = "drshailesh88/binoculars-ai-detection" as const;` Verified in src/lib/integrity/ai-detection.ts:26
- [x] PASS: **Threshold** — `const BINOCULARS_FPR_THRESHOLD = 0.8536432310785527;` Verified in src/lib/integrity/ai-detection.ts:27
- [x] PASS: **Weighting** — `binocularsResult.humanScore * 0.6 + llmResult.humanScore * 0.4` = 60% Binoculars, 40% LLM. Verified in src/lib/integrity/ai-detection.ts:1076
#### Hedging Phrases
- [x] PASS: **Count** — exactly 35 hedging phrases in the HEDGING_PHRASES array (lines 144-182), verified by programmatic count
- [x] PASS: **Detection** — `computeTextStatistics()` counts hedging phrases and reports in `stats.hedgingPhraseCount`, used in AI detection prompt and writing suggestions. Verified in src/lib/integrity/ai-detection.ts

### Plagiarism Engine
- [x] PASS: **Paid feature only** — `const runPlagiarism = isPaid && (mode === "full" || mode === "plagiarism")` where `isPaid = PAID_PLANS.has(input.plan)` and PAID_PLANS = Set(["basic", "pro", "institutional"]). Verified in src/lib/integrity/index.ts:33,38
- [x] PASS: **Similarity score** — `similarityScore` (0-100) computed via `computeOverallScore()` from paragraph-level Jaccard similarities. Verified in src/lib/integrity/plagiarism-engine.ts:630-633
- [x] PASS: **Source matching** — queries Crossref API and Semantic Scholar API in parallel to identify potential source documents. Verified in src/lib/integrity/plagiarism-engine.ts:553-558
- [x] PASS: **Severity levels** — high (>=0.4), medium (>=0.2), low (<0.2) via `classifySeverity()`. Verified in src/lib/integrity/plagiarism-engine.ts:500-503
- [x] PASS: **Match excerpts** — each match includes `excerpt` (paragraph text truncated to 120 chars) and `source` object with title, authors, doi, url, year. Verified in src/lib/integrity/plagiarism-engine.ts:540-541,606-620

### Loading & Error States
#### Loading State (`loading.tsx`)
- [x] PASS: **Skeleton loaders** — uses `<Skeleton>` components for header icon (h-8 w-8), title (h-6 w-40), main content area (flex-1), and footer button (h-12 w-40). Verified in src/app/(app)/analysis/loading.tsx:1-17
- [b] BLOCKED: **Smooth appearance** — no layout shift assessment requires browser rendering; loading.tsx uses same `flex flex-col h-[calc(100vh-7rem)]` layout as page.tsx suggesting no shift, but visual verification blocked by auth wall
#### Error State (`error.tsx`)
- [x] PASS: **Title** — `title="Analysis unavailable"` passed to ErrorDisplay component. Verified in src/app/(app)/analysis/error.tsx:8
- [x] PASS: **Message** — `message="We couldn't load the writing analysis tool. Please try again."` Verified in src/app/(app)/analysis/error.tsx:9
- [x] PASS: **Retry option** — `onRetry={reset}` passes Next.js error boundary reset function to ErrorDisplay. Verified in src/app/(app)/analysis/error.tsx:11

### Error Handling & Edge Cases
#### Input Validation
- [x] PASS: **Empty text** — analyze button `disabled={loading || effectiveText.trim().length < 50}`, empty text = length 0 < 50 = disabled. No API call made. Verified in page.tsx:366
- [x] PASS: **Text < 50 characters** — same disabled check: `trim().length < 50` disables button with `disabled:opacity-50` visual indication. Verified in page.tsx:366-367
- [b] BLOCKED: **Text > 50,000 characters** — API schema validates `.max(50000)` returning 400, but verifying the actual HTTP response requires authenticated API access. Code verified in src/app/api/integrity-check/route.ts:16,70-78
- [x] PASS: **Only whitespace** — `effectiveText.split(/\s+/).filter(Boolean).length` shows 0 words; `trim().length` is 0 so button disabled. Verified in page.tsx:362,366
