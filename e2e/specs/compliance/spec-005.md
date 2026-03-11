# compliance — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Download Report
#### Report Contents
- [ ] Citation Audit section with issues list (if paid)
- [ ] Writing Quality section with metrics table and suggestions
- [ ] Footer with generation timestamp

### History Tab
- [ ] **History loaded on tab switch** — fetches `GET /api/integrity-check/history?limit=20`
- [ ] **Loading state** — CircleNotch spinner (24px brand), centered
- [ ] **Empty state** — "No integrity checks found. Run your first check to see history here."
#### Sparkline Trend
- [ ] Visible only when `>=2` history entries exist
- [ ] SVG polyline showing AI score trend over recent checks
- [ ] Dots at each data point (3px radius, brand fill)
- [ ] Label: "AI Score Trend (recent checks)"
- [ ] Data displayed in chronological order (reversed from API's desc order)

### IntegrityPanel Component (Studio Embed)
#### Results Layout
- [ ] **Header** — "Integrity Report" label + "Re-run" link (ArrowClockwise icon)
- [ ] **CircularGauge** — 90px, shows `humanScore`
- [ ] **Free tier notice** — amber banner with Lock icon: "Free tier -- AI detection only. Upgrade for plagiarism scanning and citation verification."
#### Locked Section State
- [ ] Shows Lock icon (14px) in header instead of summary
- [ ] Expanded content: Lock icon (14px) + "Available on paid plans" + "Upgrade to unlock" link
#### Collapsible Behavior
- [ ] CaretDown (10px) when expanded, CaretRight (10px) when collapsed
- [ ] Click header to toggle
- [ ] All four sections default to expanded

### DiffView Component
#### Synchronized Scrolling
- [ ] Uses `useRef` for left/right panels
- [ ] `isSyncing` guard prevents infinite scroll loops
- [ ] Scroll sync uses `requestAnimationFrame`
#### Sentence-Level Rendering
- [ ] When `aiAnalysis.sentences` array exists and is non-empty, renders sentence-by-sentence
- [ ] Each sentence gets background based on paragraph's `humanProbability`
- [ ] Gaps between sentences (non-analyzed text) rendered plain
- [ ] Plagiarism overlap check: `sentenceText.includes(m.excerpt) || m.excerpt.includes(sentenceText)`
#### Paragraph-Level Rendering (fallback)
- [ ] Used when no sentence breakdown available
- [ ] Plagiarism highlights applied via `applyPlagiarismHighlights` — finds excerpt substrings and wraps in highlighted spans
- [ ] Ranges sorted by start position, non-overlapping

### Realtime Integrity Hook
#### Behavior
- [ ] Returns `{ score: number | null, loading: boolean, error: string | null }`
- [ ] Calls `POST /api/integrity-check` with `mode: "ai_detection"`
- [ ] Extracts `aiDetection.humanScore` from response
- [ ] Cancels in-flight requests via `AbortController` when new check starts
- [ ] Ignores `AbortError` (not treated as error)
- [ ] Cleans up on unmount (aborts controller, clears timer)
