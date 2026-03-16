# compliance — Spec 005

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Download Report
#### Report Contents
- [x] PASS: Citation Audit section with issues list (if paid)
- [x] PASS: Writing Quality section with metrics table and suggestions
- [x] PASS: Footer with generation timestamp

### History Tab
- [x] PASS: **History loaded on tab switch** — fetches `GET /api/integrity-check/history?limit=20`
- [x] PASS: **Loading state** — CircleNotch spinner (24px brand), centered
- [x] PASS: **Empty state** — "No integrity checks found. Run your first check to see history here."
#### Sparkline Trend
- [x] PASS: Visible only when `>=2` history entries exist
- [x] PASS: SVG polyline showing AI score trend over recent checks
- [x] PASS: Dots at each data point (3px radius, brand fill)
- [x] PASS: Label: "AI Score Trend (recent checks)"
- [x] PASS: Data displayed in chronological order (reversed from API's desc order)

### IntegrityPanel Component (Studio Embed)
#### Results Layout
- [x] PASS: **Header** — "Integrity Report" label + "Re-run" link (ArrowClockwise icon)
- [x] PASS: **CircularGauge** — 90px, shows `humanScore`
- [x] PASS: **Free tier notice** — amber banner with Lock icon: "Free tier -- AI detection only. Upgrade for plagiarism scanning and citation verification."
#### Locked Section State
- [x] PASS: Shows Lock icon (14px) in header instead of summary
- [x] PASS: Expanded content: Lock icon (14px) + "Available on paid plans" + "Upgrade to unlock" link
#### Collapsible Behavior
- [x] PASS: CaretDown (10px) when expanded, CaretRight (10px) when collapsed
- [x] PASS: Click header to toggle
- [x] PASS: All four sections default to expanded

### DiffView Component
#### Synchronized Scrolling
- [x] PASS: Uses `useRef` for left/right panels
- [x] PASS: `isSyncing` guard prevents infinite scroll loops
- [x] PASS: Scroll sync uses `requestAnimationFrame`
#### Sentence-Level Rendering
- [x] PASS: When `aiAnalysis.sentences` array exists and is non-empty, renders sentence-by-sentence
- [x] PASS: Each sentence gets background based on paragraph's `humanProbability`
- [x] PASS: Gaps between sentences (non-analyzed text) rendered plain
- [x] PASS: Plagiarism overlap check: `sentenceText.includes(m.excerpt) || m.excerpt.includes(sentenceText)`
#### Paragraph-Level Rendering (fallback)
- [x] PASS: Used when no sentence breakdown available
- [x] PASS: Plagiarism highlights applied via `applyPlagiarismHighlights` — finds excerpt substrings and wraps in highlighted spans
- [x] PASS: Ranges sorted by start position, non-overlapping

### Realtime Integrity Hook
#### Behavior
- [x] PASS: Returns `{ score: number | null, loading: boolean, error: string | null }`
- [x] PASS: Calls `POST /api/integrity-check` with `mode: "ai_detection"`
- [x] PASS: Extracts `aiDetection.humanScore` from response
- [x] PASS: Cancels in-flight requests via `AbortController` when new check starts
- [x] PASS: Ignores `AbortError` (not treated as error)
- [x] PASS: Cleans up on unmount (aborts controller, clears timer)
