# compliance — Spec 012

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Quick Test Workflows
#### Behavior Corrections (Pass 2)
- [x] PASS: Humanize loading copy reads `Humanizing...`, and failed humanize requests stay silent in the UI
- [x] PASS: Successful humanize output starts with `Humanized Version:` and renders one green change chip per `changes[]` entry
- [x] PASS: Paraphrase requests post `{"text": text, "sourceTitle": sourceTitle, "sourceDoi": sourceDoi}` from the page layer
- [x] PASS: Paraphrase loading copy reads `Paraphrasing...`, and failed paraphrase requests stay silent in the UI
- [x] PASS: Citation Audit is omitted when `result.citationAudit` is missing, truncates to `issues.slice(0, 8)`, and only shows `Ref: ...` when `issue.reference` exists
- [x] PASS: `Add Citation` uses `navigator.clipboard.writeText(...)`, and `Copied!` feedback resets after `2000` ms
- [x] PASS: History fetches `/api/integrity-check/history?limit=20`, and the sparkline renders only when there are at least `2` entries using `h.aiScore ?? 50`
- [x] PASS: History AI scores use orange text only above `50`, plagiarism scores use red text only above `15`, and the empty state reads `No integrity checks found. Run your first check to see history here.`
- [x] PASS: Writing Quality always renders the `Passive Voice`, `Avg Words/Sentence`, and `Grade` metric cards; numeric sentence-length and readability values use `toFixed(1)`
- [x] PASS: Writing suggestions stay hidden when `result.writingQuality.suggestions.length === 0`
- [x] PASS: Download Report posts the current `result`, the page `inputText` as the `text` field, and the optional `documentTitle`; the downloaded filename is `integrity-report-YYYY-MM-DD.md`
- [x] PASS: Download Report failures are silent and do not render a toast or inline error
- [x] PASS: `DiffView` scroll sync uses a `requestAnimationFrame` release guard, plagiarism highlights require an exact matched excerpt in the paragraph text, citation `Warning` icons use severity colors, and the legend reads `AI (high)`, `AI (med)`, `Plagiarism`
- [x] PASS: `Check New Text` clears `result`, `paragraphs`, `copyleaksResult`, `copyleaksScanId`, `copyleaksAvailable`, `humanizeResults`, and `paraphraseResults`, but preserves `inputText`, `sourceMode`, `pageTab`, `viewMode`, and `copiedCitation`
#### Behavior Corrections (Pass 3)
- [x] PASS: **CORRECTION**: Codex Pass 2 incorrectly stated `loading.tsx` and `error.tsx` do not exist. Both files exist at `src/app/(app)/compliance/loading.tsx` and `src/app/(app)/compliance/error.tsx`. The Pass 1 checks for these files (lines 924-926) are CORRECT.
- [x] PASS: **CORRECTION**: `Add Citation` format is NOT `"{Title} ({Year}). DOI: {doi}"` with static parts. The actual template is `` `${match.source.title}${match.source.year ? ` (${match.source.year})` : ""}${match.source.doi ? `. DOI: ${match.source.doi}` : ""}` `` — year and DOI are both conditional, and there are no surrounding quotes in the copied string.
#### CircularGauge Component (`src/components/ui/circular-gauge.tsx`)
- [x] PASS: Color thresholds: value `>= 80` → `#22c55e` (green), `>= 60` → `#eab308` (yellow), `>= 40` → `#f97316` (orange), `< 40` → `#ef4444` (red)
- [x] PASS: Default `size` prop is `140`; compliance page passes `110`, IntegrityPanel passes `90`
- [x] PASS: `strokeWidth` hardcoded to `10`; radius calculated as `(size - strokeWidth) / 2`
- [x] PASS: Arc fill offset computed as `circumference - (value / 100) * circumference` where `circumference = 2 * Math.PI * radius`
- [x] PASS: SVG element has `className="-rotate-90"` so the arc starts from 12 o'clock position
- [x] PASS: Active arc has `strokeLinecap="round"` for rounded cap ends
- [x] PASS: Active arc has `className="transition-all duration-1000"` for animated fill on value change
- [x] PASS: Background track circle uses `stroke="var(--surface-raised)"` and `fill="none"`
- [x] PASS: Center value text styled `text-2xl font-bold text-ink`
- [x] PASS: Label text below gauge styled `text-sm font-medium text-ink-muted`
#### ProgressBar Component (`src/components/ui/progress-bar.tsx`)
- [x] PASS: `showText` prop defaults to `true`; compliance page passes `showText={false}` for paragraph and Copyleaks bars
- [x] PASS: Fill percentage is capped at 100: `Math.min((value / max) * 100, 100)`
- [x] PASS: Handles unlimited mode when `max < 0` — renders 30% fill width and appends `" (Unlimited)"` to the text label
- [x] PASS: Default bar color is `var(--brand)` when no `color` prop is provided
- [x] PASS: Fill element has `className="transition-all duration-500"` for animated width changes
- [x] PASS: Track element: `h-2 rounded-full bg-surface-raised overflow-hidden`
- [x] PASS: Fill element: `h-full rounded-full` with inline `backgroundColor` and `width` styles
#### API Route — `/api/integrity-check` (main route, additional details)
- [x] PASS: `contentChecked` persisted to DB is truncated to first 5000 characters: `parsed.data.text.slice(0, 5000)`
- [x] PASS: `checkType` persisted as `"both"` when `result.plagiarism` exists, `"ai_detection"` otherwise
