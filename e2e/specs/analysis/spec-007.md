# analysis — Spec 007

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/analysis
MODULE: analysis

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Results write-good issue cards show uppercase type labels
- [ ] Results write-good issue cards display the issue reason text only
- [ ] Plagiarism Indicators section renders only when `result.plagiarismIndicators.length > 0`
- [ ] High-severity plagiarism cards use red text/background styling
- [ ] Medium-severity plagiarism cards use yellow text/background styling
- [ ] Low-severity plagiarism cards use muted text on `bg-surface-raised`
- [ ] Plagiarism cards display uppercase `{SEVERITY} Risk` labels, an italic excerpt, and a concern line
- [ ] Detailed Metrics tab renders `Readability`, `Writing Quality`, and `AI Detection` sections every time metrics view is active
- [ ] Readability section always shows `Readability Grade`
- [ ] Results readability section adds `Flesch-Kincaid Grade`, `Gunning Fog Index`, and `Flesch Reading Ease` only when `clientMetrics` exists
- [ ] Results `Avg Sentence Length` row comes from `result.writingQuality.averageSentenceLength`
- [ ] Writing Quality `Passive Voice` falls back to `result.writingQuality.passiveVoiceCount` when `clientMetrics` is unavailable
- [ ] Writing Quality `Weasel Words`, `Adverbs`, and `Complex Sentences` rows render only when `clientMetrics` exists
- [ ] AI Detection section renders `Human Score`, `AI Score`, and `Overall Risk` as `ToneBadge` rows
- [ ] Human Score uses emerald for >= 70, yellow for 40-69, and red below 40
- [ ] AI Score uses emerald for <= 30, yellow for 31-60, and red above 60
- [ ] Overall Risk uses `low -> emerald`, `medium -> yellow`, and `high -> red`
- [ ] Paragraph Breakdown section renders only when `result.paragraphAnalysis.length > 0`
- [ ] Paragraph Breakdown rows display `Paragraph {n}` on the left and `{humanProbability}% human` on the right
- [ ] `MetricBar` caps bar fill width at 100% with `Math.min((value / max) * 100, 100)`
- [ ] `MetricBar` appends suffix text such as ` words`, ` instances`, or ` sentences` in the value label when provided
- [ ] `IssueBadge` color map is `yellow`, `orange`, `blue`, and `red`
- [ ] `CircularGauge` color thresholds are green >= 80, yellow >= 60, orange >= 40, and red below 40
- [ ] Results gauge readability label uses `Excellent`, `Good`, `Needs Improvement`, and `Poor`
- [ ] Instant gauge readability label uses the `analyzeWriting()` labels, not the results-gauge labels
#### `src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)
- [ ] When `stats.avgSentenceLength > 28`, the API returns the suggestion: "Your average sentence length is high. Consider breaking long sentences for readability." (~line 129)
- [ ] When `stats.sentenceLengthStdDev < 3`, the API returns: "Your sentence lengths are very uniform — this is a common AI writing pattern. Vary your sentence structure." (~line 133)
- [ ] When `stats.passiveVoicePercent > 30`, the API returns: "{N}% of sentences use passive voice. Consider using more active voice." where N is `Math.round(passiveVoicePercent)` (~line 139)
- [ ] When `stats.typeTokenRatio < 0.35` and `> 0`, the API returns: "Vocabulary diversity is low. Use more varied word choices to strengthen your writing." (~line 144)
- [ ] When `stats.hedgingPhraseCount > 5`, the API returns: "Found {N} hedging phrases (e.g. \"It is important to note\"). These are common in AI-generated text — consider being more direct." (~line 149)
- [ ] When `stats.readabilityGrade > 16`, the API returns: "Readability grade is above 16 (postgraduate level). Consider simplifying for broader accessibility." (~line 154)
- [ ] When none of the above conditions fire, the suggestions array is empty and the Issues tab shows the "No issues detected" message (~line 124-159)
#### `src/app/api/integrity-check/route.ts` — Error Responses (exact text)
- [ ] 401 response body is `{ error: "Not authenticated" }` (~line 47)
- [ ] 400 response body is `{ error: "Invalid request", details: <fieldErrors> }` where details come from Zod validation (~line 72)
- [ ] 503 when AI is not configured returns `{ error: "AI service is not configured." }` (~line 62)
