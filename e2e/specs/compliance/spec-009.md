# compliance — Spec 009

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Non-timeout fetch failures surface `Failed to connect to the analysis service. Please try again.`
- [x] PASS: Successful full checks populate `result` and switch the page into results mode without clearing `inputText`
- [x] PASS: Results mode always shows the Inline/Split toggle and Download Report button in the top-right header
- [x] PASS: `Check New Text` resets `result`, `paragraphs`, `copyleaksResult`, `copyleaksScanId`, `copyleaksAvailable`, `humanizeResults`, and `paraphraseResults`
- [x] PASS: `Check New Text` does not clear `inputText`, `sourceMode`, `pageTab`, `viewMode`, or `copiedCitation`
- [x] PASS: Inline results header shows the `Binoculars` badge only when `result.aiDetection.engine === "binoculars"`
- [x] PASS: Inline results header shows the active document title only when `activeDoc` exists
- [x] PASS: Paragraph card background and left-border styling are driven by AI probability thresholds derived from `100 - humanProbability`
- [x] PASS: Paragraphs without sentence-level analysis render the raw paragraph text with paragraph-level highlighting only
- [x] PASS: Paragraphs with sentence-level analysis apply the same paragraph-level `humanProbability` tooltip to every sentence span
- [x] PASS: Sentence-level highlight titles read `Human probability: {N}%`
- [x] PASS: Flag text renders only when `analysis.flags.length > 0`
- [x] PASS: Humanized output block renders only after a successful humanize request for that paragraph index
- [x] PASS: Humanized output block title reads `Humanized Version:`
- [x] PASS: Humanized change tags render one chip per `changes[]` entry
- [x] PASS: Humanize button appears only for paragraphs with `humanProbability < 40`
- [x] PASS: While humanize is in flight for a paragraph, the button shows a spinner plus `Humanizing...`
- [x] PASS: After a successful humanize call, the button label changes to `✓ Humanized`
- [x] PASS: Humanize failures fail silently and leave no inline error message
- [x] PASS: Split view uses the shared `DiffView` component with the frozen `paragraphs` array from the last check
- [x] PASS: `DiffView` synchronizes left/right scroll positions using a request-animation-frame guard
- [x] PASS: `DiffView` plagiarism highlights are applied only when the exact matched excerpt is found within the rendered paragraph text
- [x] PASS: `DiffView` citation issues render as inline `Warning` icons with severity-based colors
- [x] PASS: `DiffView` right-column legend always shows `AI (high)`, `AI (med)`, and `Plagiarism`
- [x] PASS: AI Content Detection header shows `Binoculars + LLM` only for the binoculars engine and `LLM Heuristic` otherwise
- [x] PASS: Circular gauge value is `result.aiDetection.humanScore`
- [x] PASS: Circular gauge label is derived from `overallRisk` as `Low Risk`, `Moderate Risk`, or `High Risk`
- [x] PASS: Score summary always shows `Human: {X}%` on the left and `AI: {X}%` on the right
- [x] PASS: Paragraph cards in the AI panel are ordered by `result.aiDetection.paragraphs`
- [x] PASS: Paragraph probability text uses orange below 40, amber below 70, and emerald at 70 or above
- [x] PASS: Progress-bar colors mirror the same paragraph probability thresholds
- [x] PASS: Plagiarism section shows an upgrade prompt when `result.plagiarism` is absent
- [x] PASS: Built-in plagiarism summary badge color uses red above 30, amber above 15, and green at 15 or below
- [x] PASS: Built-in plagiarism `No concerns` state includes the `sourcesScanned` count in the success sentence
- [x] PASS: Each plagiarism match card shows excerpt, source title, optional source year, optional DOI link, and two actions
