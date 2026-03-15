# analysis — Spec 006

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/analysis
MODULE: analysis

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Instant gauge size is `110`
- [x] PASS: Instant gauge center displays the numeric `fleschReadingEase` score
- [x] PASS: Instant gauge label comes from `clientMetrics.readabilityLabel`
- [x] PASS: Instant readability labels in the current implementation are `Easy`, `Standard`, `Difficult`, and `Very Difficult`
- [x] PASS: Counts grid renders `Words`, `Sentences`, and `Paragraphs` summary cards
- [x] PASS: Readability section renders four `MetricBar` rows
- [x] PASS: Writing Quality section renders four `IssueBadge` tiles
- [x] PASS: Instant issues section header shows `Issues ({clientIssues.length})`
- [x] PASS: Instant issues list renders at most 10 items before collapsing to a `+N more issues` footer
- [x] PASS: Warning-severity instant issues use yellow styling
- [x] PASS: Non-warning instant issues use blue styling
- [x] PASS: Successful analysis hides the source toggle and displays the three-color legend
- [x] PASS: Results left panel wraps the analyzed text in a `glass-panel rounded-2xl p-8` container
- [x] PASS: Results left panel header contains the `Analyze New Text` reset button on the left
- [x] PASS: Results left panel header shows `activeDoc.documentTitle` on the right when a document-backed analysis is open
- [x] PASS: Clicking `Analyze New Text` sets `result` back to `null`
- [x] PASS: Clicking `Analyze New Text` clears `paragraphs`
- [x] PASS: Clicking `Analyze New Text` resets `activeTab` back to `issues`
- [x] PASS: Results right panel width is `w-96`
- [x] PASS: Results right panel gauge size is `120`
- [x] PASS: Results right panel keeps the Words, Sentences, and Paragraphs summary cards above the tabs when `clientMetrics` exists
- [x] PASS: Each paragraph is rendered from the precomputed `paragraphs` array, not by splitting the server response
- [x] PASS: Paragraphs with no matching `paragraphAnalysis` entry default to `100` human probability
- [x] PASS: Paragraphs under 40% human use red background and left border styling
- [x] PASS: Paragraphs between 40% and 70% human use yellow background and left border styling
- [x] PASS: Paragraphs above 70% human use emerald background and left border styling
- [x] PASS: Paragraph flags render as `Flags: {comma-separated flags}` below the paragraph when flags exist
- [x] PASS: Paragraph flag text is omitted entirely when no flags are present
- [x] PASS: Results tab list is driven by `analysisTabs`
- [x] PASS: Issues-tab count badge uses `result.writingQuality.suggestions.length` once results exist
- [x] PASS: When `writingQuality.suggestions.length === 0`, the issues tab shows `No issues detected. Your writing looks great!`
- [x] PASS: AI suggestion cards use `bg-purple-500/10`
- [x] PASS: AI suggestion cards include a purple `Sparkle` icon and a `Suggestion {n}` label
- [x] PASS: Local write-good issues render in a dedicated `Writing Issues (write-good)` section below AI suggestions
- [x] PASS: Results write-good issues render at most 15 cards before a `+N more issues` footer
