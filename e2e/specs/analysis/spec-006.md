# analysis — Spec 006

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
- [ ] Instant gauge size is `110`
- [ ] Instant gauge center displays the numeric `fleschReadingEase` score
- [ ] Instant gauge label comes from `clientMetrics.readabilityLabel`
- [ ] Instant readability labels in the current implementation are `Easy`, `Standard`, `Difficult`, and `Very Difficult`
- [ ] Counts grid renders `Words`, `Sentences`, and `Paragraphs` summary cards
- [ ] Readability section renders four `MetricBar` rows
- [ ] Writing Quality section renders four `IssueBadge` tiles
- [ ] Instant issues section header shows `Issues ({clientIssues.length})`
- [ ] Instant issues list renders at most 10 items before collapsing to a `+N more issues` footer
- [ ] Warning-severity instant issues use yellow styling
- [ ] Non-warning instant issues use blue styling
- [ ] Successful analysis hides the source toggle and displays the three-color legend
- [ ] Results left panel wraps the analyzed text in a `glass-panel rounded-2xl p-8` container
- [ ] Results left panel header contains the `Analyze New Text` reset button on the left
- [ ] Results left panel header shows `activeDoc.documentTitle` on the right when a document-backed analysis is open
- [ ] Clicking `Analyze New Text` sets `result` back to `null`
- [ ] Clicking `Analyze New Text` clears `paragraphs`
- [ ] Clicking `Analyze New Text` resets `activeTab` back to `issues`
- [ ] Results right panel width is `w-96`
- [ ] Results right panel gauge size is `120`
- [ ] Results right panel keeps the Words, Sentences, and Paragraphs summary cards above the tabs when `clientMetrics` exists
- [ ] Each paragraph is rendered from the precomputed `paragraphs` array, not by splitting the server response
- [ ] Paragraphs with no matching `paragraphAnalysis` entry default to `100` human probability
- [ ] Paragraphs under 40% human use red background and left border styling
- [ ] Paragraphs between 40% and 70% human use yellow background and left border styling
- [ ] Paragraphs above 70% human use emerald background and left border styling
- [ ] Paragraph flags render as `Flags: {comma-separated flags}` below the paragraph when flags exist
- [ ] Paragraph flag text is omitted entirely when no flags are present
- [ ] Results tab list is driven by `analysisTabs`
- [ ] Issues-tab count badge uses `result.writingQuality.suggestions.length` once results exist
- [ ] When `writingQuality.suggestions.length === 0`, the issues tab shows `No issues detected. Your writing looks great!`
- [ ] AI suggestion cards use `bg-purple-500/10`
- [ ] AI suggestion cards include a purple `Sparkle` icon and a `Suggestion {n}` label
- [ ] Local write-good issues render in a dedicated `Writing Issues (write-good)` section below AI suggestions
- [ ] Results write-good issues render at most 15 cards before a `+N more issues` footer
