# compliance — Spec 014

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Quick Test Workflows
#### API Route — `/api/copyleaks` (additional details)
- [ ] Copyleaks `results` action without `scanId` returns 400 with `"scanId is required for results action"`
- [ ] Copyleaks `text` field validated as `z.string().min(50).max(50000).optional()` — required only for `scan` action at the application level
- [ ] Copyleaks 500 error body: `{ error: "Copyleaks request failed" }`
#### Orchestrator (`src/lib/integrity/index.ts`) — Writing Suggestion Exact Texts
- [ ] `PAID_PLANS` defined as `new Set(["basic", "pro", "institutional"])` — `"free"` plan is the only non-paid plan
- [ ] Self-plagiarism runs for any authenticated user regardless of plan, gated only by `!!input.userId` (not plan-based)
- [ ] Mode routing: `"ai_detection"` → AI detection only; `"plagiarism"` → plagiarism (paid) + self-plag (any user); `"citation_audit"` → citation audit (paid only); `"full"` → all applicable engines
- [ ] `writingQuality.passiveVoiceCount` is computed from stats as `Math.round((passiveVoicePercent / 100) * (text.split(/[.!?]+/).length - 1))`
- [ ] `writingQuality.averageSentenceLength` is directly `ai.stats.avgSentenceLength` (not recomputed)
- [ ] `writingQuality.readabilityGrade` is directly `ai.stats.readabilityGrade` (not recomputed)
- [ ] `checkedAt` is generated server-side as `new Date().toISOString()`, not passed from the client
- [ ] Default AI result (when AI detection is skipped) has all 10 stats fields zeroed and engine set to `"llm-heuristic"`
- [ ] Exact writing suggestion for `avgSentenceLength > 28`: `"Your average sentence length is high. Consider breaking long sentences for readability."`
- [ ] Exact suggestion for `sentenceLengthStdDev < 3`: `"Your sentence lengths are very uniform — this is a common AI writing pattern. Vary your sentence structure."`
- [ ] Exact suggestion for `passiveVoicePercent > 30`: `"{N}% of sentences use passive voice. Consider using more active voice."` where `{N}` is `Math.round(passiveVoicePercent)`
- [ ] Exact suggestion for `typeTokenRatio < 0.35 && typeTokenRatio > 0`: `"Vocabulary diversity is low. Use more varied word choices to strengthen your writing."` — note: `typeTokenRatio === 0` does NOT trigger the suggestion
- [ ] Exact suggestion for `hedgingPhraseCount > 5`: `"Found {N} hedging phrases (e.g. "It is important to note"). These are common in AI-generated text — consider being more direct."`
- [ ] Exact suggestion for `readabilityGrade > 16`: `"Readability grade is above 16 (postgraduate level). Consider simplifying for broader accessibility."`
#### DiffView Component — Additional Details (`src/components/integrity/DiffView.tsx`)
- [ ] `renderSentenceLevel` sorts sentences by `startOffset` (ascending) before iterating
- [ ] Gaps before the first sentence are rendered as plain `<span key={`gap-${cursor}`}>` elements
- [ ] Trailing text after the last sentence is rendered as `<span key={`tail-${cursor}`}>`
- [ ] Citation issue Warning icons have `title={issue.message}` attribute as tooltip text
- [ ] `applyPlagiarismHighlights` sorts ranges by `.start` ascending before rendering; overlapping ranges are not merged
#### IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)
- [ ] IntegrityPanel truncates editor text to 50000 chars before sending: `text.slice(0, 50000)`
- [ ] IntegrityPanel error for short text: exact message `"Document must have at least 50 characters to check."`
- [ ] IntegrityPanel idle description: exact text `"Detect AI content, check plagiarism against scholarly literature, and verify citations."`
- [ ] IntegrityPanel does NOT pass `mode` field in its API request body — server defaults to `"full"`
- [ ] IntegrityPanel AI Detection section shows 4 `StatCard` components: "Avg. Sentence" (`avgSentenceLength.toFixed(1) + " words"`), "Burstiness" (`sentenceLengthStdDev.toFixed(1)`), "Vocabulary" (`(typeTokenRatio * 100).toFixed(0) + "%"`), "Hedging Phrases" (count as string)
- [ ] IntegrityPanel "Flagged Paragraphs" section header is uppercase, shows only paragraphs where `flags.length > 0`, truncated to first 5
- [ ] IntegrityPanel flagged paragraph format: `¶{paragraphIndex+1}: "{excerpt}"` with `humanProbability` color (>=70 emerald-500, >=40 amber-500, <40 red-400), each flag as bullet `• {flag}`, suggestion prefixed `→ {suggestion}`
- [ ] IntegrityPanel plagiarism no-match message: CheckCircle icon + `"No significant matches found"` (differs from main page's `"No plagiarism concerns detected across {N} sources."`)
- [ ] IntegrityPanel plagiarism matches truncated to first 5 via `.slice(0, 5)` (main page shows all matches)
- [ ] IntegrityPanel plagiarism match shows `LinkSimple` icon (10px) inline before source title (main page does not)
- [ ] IntegrityPanel Citation section uses severity-specific icons: `XCircle` (12px, red-400) for errors, `Warning` (12px, amber-500) for warnings, `CheckCircle` (12px, blue-400) for info — differs from main page's colored dots
- [ ] IntegrityPanel shows "Verified References" subsection when `verifiedReferences.length > 0`: up to 10 refs, each with `CheckCircle` (verified/emerald) or `XCircle` (not/red-400) + `[{index}] {title}` — this subsection does not exist on the main compliance page
- [ ] IntegrityPanel Writing Quality labels differ from main page: "Readability" (not "Readability Level"), "Avg Sentence" (not "Avg Words/Sentence"), "Passive Voice" shows `"{N} instances"` (main page shows just the count)
