# notebook — Spec 011

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Starter Suggestions (Empty State)
#### Suggestion Chip Behavior
- [ ] **Style** — rounded-full, brand/10 background, brand text
- [ ] **Hover** — brand/20 background
- [ ] **Click** — sends suggestion text as message via `sendMessage(s)`
- [ ] **Centered layout** — flex-wrap, gap-2, justify-center
#### Empty State Container
- [ ] **GlassPanel wrapper** — p-6, text-center
- [ ] **Mode-specific heading text**
- [ ] **Mode-specific subtitle text**

### Error Handling & Edge Cases
#### Chat Errors
- [ ] **API connection error** — shows inline error message in chat
- [ ] **Timeout** — 30-second request abort, 30-second per-chunk stream timeout
- [ ] **Timeout message** — "The response timed out. Please try again or ask a simpler question."
- [ ] **Generic error** — "Something went wrong. Please try again."
- [ ] **Stream cleanup** — reader cancelled, loading state cleared
#### Conversation Errors
- [ ] **Load failure** — console error logged, UI unaffected
- [ ] **Create failure** — caught in sendMessage try/catch
- [ ] **Paper ID update failure** — fire-and-forget (caught silently)
- [ ] **Message persist failure** — fire-and-forget (caught silently)
#### Source Upload Errors
- [ ] **Extract PDF failure** — file marked as "error"
- [ ] **Save paper failure** — file marked as "error"
- [ ] **Docling zero chunks** — file marked as "embed_failed"
- [ ] **Embedding failure** — file marked as "embed_failed" with retry option
#### Extraction Errors
- [ ] **Fact extraction failure** — error logged, spinner removed
- [ ] **Verify extraction failure** — error logged
#### Audio Overview Errors
- [ ] **No papers selected** — error: "Select at least one paper..."
- [ ] **No conversation** — error: "Select papers and start a notebook conversation first."
- [ ] **Generation failure** — shows error message with retry button
- [ ] **Playback failure** — "Playback failed. Please try again."
- [ ] **Audio element error** — "Unable to play generated audio."
#### Suggestion Errors
- [ ] **Generation failure** — suggestions silently cleared (empty array)
- [ ] **Stale request** — cancelled if new message sent before completion

### Accessibility
- [ ] **ARIA tablist** — mode toggle has `role="tablist"` with `aria-selected` on buttons
- [ ] **Chat log** — `role="log"` with `aria-live="polite"` on messages container
- [ ] **Chat input** — `aria-label="Chat message input"`
- [ ] **Send button** — `aria-label="Send message"`
- [ ] **Upload button** — `aria-label="Upload files"`
- [ ] **Audio overview button** — `aria-label="Audio Overview"`
