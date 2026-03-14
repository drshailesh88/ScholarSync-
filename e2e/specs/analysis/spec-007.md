# analysis — Spec 007

STATUS: PARTIAL
TESTED: 35/35
PASS: 27
FAIL: 8
BLOCKED: 0
PAGE: http://localhost:3001/analysis
MODULE: analysis

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Results write-good issue cards show uppercase type labels
- [x] PASS: Results write-good issue cards display the issue reason text only
- [x] PASS: Plagiarism Indicators section renders only when `result.plagiarismIndicators.length > 0`
- [x] PASS: High-severity plagiarism cards use red text/background styling
- [x] PASS: Medium-severity plagiarism cards use yellow text/background styling
- [x] PASS: Low-severity plagiarism cards use muted text on `bg-surface-raised`
- [x] PASS: Plagiarism cards display uppercase `{SEVERITY} Risk` labels, an italic excerpt, and a concern line
- [x] PASS: Detailed Metrics tab renders `Readability`, `Writing Quality`, and `AI Detection` sections every time metrics view is active
- [x] PASS: Readability section always shows `Readability Grade`
- [x] PASS: Results readability section adds `Flesch-Kincaid Grade`, `Gunning Fog Index`, and `Flesch Reading Ease` only when `clientMetrics` exists
- [x] PASS: Results `Avg Sentence Length` row comes from `result.writingQuality.averageSentenceLength`
- [x] PASS: Writing Quality `Passive Voice` falls back to `result.writingQuality.passiveVoiceCount` when `clientMetrics` is unavailable
- [x] PASS: Writing Quality `Weasel Words`, `Adverbs`, and `Complex Sentences` rows render only when `clientMetrics` exists
- [x] PASS: AI Detection section renders `Human Score`, `AI Score`, and `Overall Risk` as `ToneBadge` rows
- [x] PASS: Human Score uses emerald for >= 70, yellow for 40-69, and red below 40
- [x] PASS: AI Score uses emerald for <= 30, yellow for 31-60, and red above 60
- [x] PASS: Overall Risk uses `low -> emerald`, `medium -> yellow`, and `high -> red`
- [x] PASS: Paragraph Breakdown section renders only when `result.paragraphAnalysis.length > 0`
- [x] PASS: Paragraph Breakdown rows display `Paragraph {n}` on the left and `{humanProbability}% human` on the right
- [x] PASS: `MetricBar` caps bar fill width at 100% with `Math.min((value / max) * 100, 100)`
- [x] PASS: `MetricBar` appends suffix text such as ` words`, ` instances`, or ` sentences` in the value label when provided
- [x] PASS: `IssueBadge` color map is `yellow`, `orange`, `blue`, and `red`
- [x] PASS: `CircularGauge` color thresholds are green >= 80, yellow >= 60, orange >= 40, and red below 40
- [x] PASS: Results gauge readability label uses `Excellent`, `Good`, `Needs Improvement`, and `Poor`
- [ ] FAIL: Instant gauge readability label uses the `analyzeWriting()` labels, not the results-gauge labels
#### `src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)
- [ ] FAIL: When `stats.avgSentenceLength > 28`, the API returns the suggestion: "Your average sentence length is high. Consider breaking long sentences for readability." (~line 129)
- [ ] FAIL: When `stats.sentenceLengthStdDev < 3`, the API returns: "Your sentence lengths are very uniform — this is a common AI writing pattern. Vary your sentence structure." (~line 133)
- [ ] FAIL: When `stats.passiveVoicePercent > 30`, the API returns: "{N}% of sentences use passive voice. Consider using more active voice." where N is `Math.round(passiveVoicePercent)` (~line 139)
- [x] PASS: When `stats.typeTokenRatio < 0.35` and `> 0`, the API returns: "Vocabulary diversity is low. Use more varied word choices to strengthen your writing." (~line 144)
- [ ] FAIL: When `stats.hedgingPhraseCount > 5`, the API returns: "Found {N} hedging phrases (e.g. \"It is important to note\"). These are common in AI-generated text — consider being more direct." (~line 149)
- [ ] FAIL: When `stats.readabilityGrade > 16`, the API returns: "Readability grade is above 16 (postgraduate level). Consider simplifying for broader accessibility." (~line 154)
- [ ] FAIL: When none of the above conditions fire, the suggestions array is empty and the Issues tab shows the "No issues detected" message (~line 124-159)
#### `src/app/api/integrity-check/route.ts` — Error Responses (exact text)
- [x] PASS: 401 response body is `{ error: "Not authenticated" }` (~line 47)
- [ ] FAIL: 400 response body is `{ error: "Invalid request", details: <fieldErrors> }` where details come from Zod validation (~line 72)
- [x] PASS: 503 when AI is not configured returns `{ error: "AI service is not configured." }` (~line 62)
