# compliance — Spec 009

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Non-timeout fetch failures surface `Failed to connect to the analysis service. Please try again.`
- [ ] Successful full checks populate `result` and switch the page into results mode without clearing `inputText`
- [ ] Results mode always shows the Inline/Split toggle and Download Report button in the top-right header
- [ ] `Check New Text` resets `result`, `paragraphs`, `copyleaksResult`, `copyleaksScanId`, `copyleaksAvailable`, `humanizeResults`, and `paraphraseResults`
- [ ] `Check New Text` does not clear `inputText`, `sourceMode`, `pageTab`, `viewMode`, or `copiedCitation`
- [ ] Inline results header shows the `Binoculars` badge only when `result.aiDetection.engine === "binoculars"`
- [ ] Inline results header shows the active document title only when `activeDoc` exists
- [ ] Paragraph card background and left-border styling are driven by AI probability thresholds derived from `100 - humanProbability`
- [ ] Paragraphs without sentence-level analysis render the raw paragraph text with paragraph-level highlighting only
- [ ] Paragraphs with sentence-level analysis apply the same paragraph-level `humanProbability` tooltip to every sentence span
- [ ] Sentence-level highlight titles read `Human probability: {N}%`
- [ ] Flag text renders only when `analysis.flags.length > 0`
- [ ] Humanized output block renders only after a successful humanize request for that paragraph index
- [ ] Humanized output block title reads `Humanized Version:`
- [ ] Humanized change tags render one chip per `changes[]` entry
- [ ] Humanize button appears only for paragraphs with `humanProbability < 40`
- [ ] While humanize is in flight for a paragraph, the button shows a spinner plus `Humanizing...`
- [ ] After a successful humanize call, the button label changes to `✓ Humanized`
- [ ] Humanize failures fail silently and leave no inline error message
- [ ] Split view uses the shared `DiffView` component with the frozen `paragraphs` array from the last check
- [ ] `DiffView` synchronizes left/right scroll positions using a request-animation-frame guard
- [ ] `DiffView` plagiarism highlights are applied only when the exact matched excerpt is found within the rendered paragraph text
- [ ] `DiffView` citation issues render as inline `Warning` icons with severity-based colors
- [ ] `DiffView` right-column legend always shows `AI (high)`, `AI (med)`, and `Plagiarism`
- [ ] AI Content Detection header shows `Binoculars + LLM` only for the binoculars engine and `LLM Heuristic` otherwise
- [ ] Circular gauge value is `result.aiDetection.humanScore`
- [ ] Circular gauge label is derived from `overallRisk` as `Low Risk`, `Moderate Risk`, or `High Risk`
- [ ] Score summary always shows `Human: {X}%` on the left and `AI: {X}%` on the right
- [ ] Paragraph cards in the AI panel are ordered by `result.aiDetection.paragraphs`
- [ ] Paragraph probability text uses orange below 40, amber below 70, and emerald at 70 or above
- [ ] Progress-bar colors mirror the same paragraph probability thresholds
- [ ] Plagiarism section shows an upgrade prompt when `result.plagiarism` is absent
- [ ] Built-in plagiarism summary badge color uses red above 30, amber above 15, and green at 15 or below
- [ ] Built-in plagiarism `No concerns` state includes the `sourcesScanned` count in the success sentence
- [ ] Each plagiarism match card shows excerpt, source title, optional source year, optional DOI link, and two actions
