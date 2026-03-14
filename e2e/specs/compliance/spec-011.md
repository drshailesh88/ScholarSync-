# compliance — Spec 011

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
- [ ] History sparkline plots `aiScore ?? 50` for each reversed history entry
- [ ] History row word count falls back to `? words` when `wordCount` is null
- [ ] History engine pill renders only when `h.engine` is truthy
- [ ] History AI score uses orange text above 50 and green text otherwise
- [ ] History plagiarism score uses red text above 15 and green text otherwise
- [ ] Route-level `loading.tsx` renders a back-button skeleton, title skeleton, one large content skeleton, and a footer row with word-count/button skeletons
- [ ] Route-level error boundary title reads `Integrity check unavailable`
- [ ] Route-level error boundary message reads `We couldn't load the compliance tools. Please try again.`
#### Actual Current Behavior Corrections
- [ ] Switching source mode to `Paste Text` does not clear the current text; it keeps whatever was already loaded into `inputText`
- [ ] Realtime integrity scoring uses the human-score percentage from the AI detector, not a separate AI-risk metric
- [ ] Realtime integrity errors are currently silent in the page UI
- [ ] `Check New Text` is a partial reset and does not restore the source-mode selection to `From Document`
- [ ] Copyleaks scan failures other than `503` do not show a dedicated error state in the current implementation
- [ ] History entries are read-only summaries; the current page does not let the user reopen or diff a historical report
#### Behavior Corrections (Pass 2)
- [ ] Realtime integrity waits exactly `2000` ms after the last eligible edit before firing a check
- [ ] Realtime integrity does not run until the pasted text reaches at least `100` characters
- [ ] After the first realtime check, subsequent checks require an absolute text-length delta of at least `10` characters
- [ ] Realtime integrity posts `{"text": textToCheck, "mode": "ai_detection"}` to `/api/integrity-check`
- [ ] The realtime hook aborts the previous in-flight request with `AbortController` before starting a newer check
- [ ] Realtime score is stored in the hook-local `score` state from `result.aiDetection?.humanScore`
- [ ] Disabling `Live` mid-flight does not abort an already-started realtime request; the score may still update if that request resolves
- [ ] Full-check paragraph display is frozen from `inputText.split(/\n\n+/).filter((p) => p.trim().length > 0)` before the network request completes
- [ ] Full integrity checks post `{"text": inputText, "mode": "full"}` to `/api/integrity-check`
- [ ] The main integrity check uses a `30000` ms abort timeout
- [ ] Non-OK full-check responses surface `data.error` when present, otherwise fall back to `Integrity check failed. Please try again.`
- [ ] Full-check timeout errors render `The check took too long. Please try again with shorter text.`
- [ ] Full-check network failures render `Failed to connect to the analysis service. Please try again.`
- [ ] Copyleaks scan submission posts `{"action": "scan", "text": inputText}` to `/api/copyleaks`
- [ ] A Copyleaks `503` response sets `copyleaksAvailable` to `false`, clears loading, and does not keep a `scanId`
- [ ] Copyleaks polling runs once immediately after a scan starts, then every `5000` ms
- [ ] Copyleaks polling stops and clears its interval when status becomes `"completed"` or `"error"`
- [ ] Copyleaks completed state with zero sources renders `No matching sources found.`
- [ ] Copyleaks source-title links are truncated with `truncate max-w-[70%]`
- [ ] Copyleaks `"error"` status has no dedicated rendered error message; the section falls back to the idle button branch
- [ ] Humanize actions render only for paragraphs where `humanProbability < 40`
