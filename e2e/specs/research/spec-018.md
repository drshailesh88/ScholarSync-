# research — Spec 018

STATUS: PENDING
TESTED: 0/3
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Behavior Corrections (Pass 3)
- [ ] Copilot opening does not move focus into the chat input, and closing it does not restore focus to the floating toggle button
- [ ] `AISynthesisPanel.triggerSynthesis()` has no stale-request guard, so an earlier request's `finally { setIsStreaming(false) }` can clear the streaming state of a newer synthesis run
- [ ] Pagination UI is hidden entirely when `totalResults === 0`, even though the inner page-count text uses `Math.max(totalPages, 1)`
