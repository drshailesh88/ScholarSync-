# compliance — Spec 011

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
- [x] PASS: History sparkline plots `aiScore ?? 50` for each reversed history entry
- [x] PASS: History row word count falls back to `? words` when `wordCount` is null
- [x] PASS: History engine pill renders only when `h.engine` is truthy
- [x] PASS: History AI score uses orange text above 50 and green text otherwise
- [x] PASS: History plagiarism score uses red text above 15 and green text otherwise
- [x] PASS: Route-level `loading.tsx` renders a back-button skeleton, title skeleton, one large content skeleton, and a footer row with word-count/button skeletons
- [x] PASS: Route-level error boundary title reads `Integrity check unavailable`
- [x] PASS: Route-level error boundary message reads `We couldn't load the compliance tools. Please try again.`
#### Actual Current Behavior Corrections
- [x] PASS: Switching source mode to `Paste Text` does not clear the current text; it keeps whatever was already loaded into `inputText`
- [x] PASS: Realtime integrity scoring uses the human-score percentage from the AI detector, not a separate AI-risk metric
- [x] PASS: Realtime integrity errors are currently silent in the page UI
- [x] PASS: `Check New Text` is a partial reset and does not restore the source-mode selection to `From Document`
- [x] PASS: Copyleaks scan failures other than `503` do not show a dedicated error state in the current implementation
- [x] PASS: History entries are read-only summaries; the current page does not let the user reopen or diff a historical report
#### Behavior Corrections (Pass 2)
- [x] PASS: Realtime integrity waits exactly `2000` ms after the last eligible edit before firing a check
- [x] PASS: Realtime integrity does not run until the pasted text reaches at least `100` characters
- [x] PASS: After the first realtime check, subsequent checks require an absolute text-length delta of at least `10` characters
- [x] PASS: Realtime integrity posts `{"text": textToCheck, "mode": "ai_detection"}` to `/api/integrity-check`
- [x] PASS: The realtime hook aborts the previous in-flight request with `AbortController` before starting a newer check
- [x] PASS: Realtime score is stored in the hook-local `score` state from `result.aiDetection?.humanScore`
- [x] PASS: Disabling `Live` mid-flight does not abort an already-started realtime request; the score may still update if that request resolves
- [x] PASS: Full-check paragraph display is frozen from `inputText.split(/\n\n+/).filter((p) => p.trim().length > 0)` before the network request completes
- [x] PASS: Full integrity checks post `{"text": inputText, "mode": "full"}` to `/api/integrity-check`
- [x] PASS: The main integrity check uses a `30000` ms abort timeout
- [x] PASS: Non-OK full-check responses surface `data.error` when present, otherwise fall back to `Integrity check failed. Please try again.`
- [x] PASS: Full-check timeout errors render `The check took too long. Please try again with shorter text.`
- [x] PASS: Full-check network failures render `Failed to connect to the analysis service. Please try again.`
- [x] PASS: Copyleaks scan submission posts `{"action": "scan", "text": inputText}` to `/api/copyleaks`
- [x] PASS: A Copyleaks `503` response sets `copyleaksAvailable` to `false`, clears loading, and does not keep a `scanId`
- [x] PASS: Copyleaks polling runs once immediately after a scan starts, then every `5000` ms
- [x] PASS: Copyleaks polling stops and clears its interval when status becomes `"completed"` or `"error"`
- [x] PASS: Copyleaks completed state with zero sources renders `No matching sources found.`
- [x] PASS: Copyleaks source-title links are truncated with `truncate max-w-[70%]`
- [x] PASS: Copyleaks `"error"` status has no dedicated rendered error message; the section falls back to the idle button branch
- [x] PASS: Humanize actions render only for paragraphs where `humanProbability < 40`
