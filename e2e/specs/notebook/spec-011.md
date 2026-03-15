# notebook — Spec 011

STATUS: PARTIAL
TESTED: 35/35
PASS: 34
FAIL: 1
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Starter Suggestions (Empty State)
#### Suggestion Chip Behavior
- [x] PASS: **Style** — rounded-full, brand/10 background, brand text
- [x] PASS: **Hover** — brand/20 background
- [x] PASS: **Click** — sends suggestion text as message via `sendMessage(s)`
- [x] PASS: **Centered layout** — flex-wrap, gap-2, justify-center
#### Empty State Container
- [x] PASS: **GlassPanel wrapper** — p-6, text-center
- [x] PASS: **Mode-specific heading text**
- [x] PASS: **Mode-specific subtitle text**

### Error Handling & Edge Cases
#### Chat Errors
- [x] PASS: **API connection error** — shows inline error message in chat
- [x] PASS: **Timeout** — 30-second request abort, 30-second per-chunk stream timeout
- [x] PASS: **Timeout message** — "The response timed out. Please try again or ask a simpler question."
- [ ] FAIL: **Generic error** — "Something went wrong. Please try again."
- [x] PASS: **Stream cleanup** — reader cancelled, loading state cleared
#### Conversation Errors
- [x] PASS: **Load failure** — console error logged, UI unaffected
- [x] PASS: **Create failure** — caught in sendMessage try/catch
- [x] PASS: **Paper ID update failure** — fire-and-forget (caught silently)
- [x] PASS: **Message persist failure** — fire-and-forget (caught silently)
#### Source Upload Errors
- [x] PASS: **Extract PDF failure** — file marked as "error"
- [x] PASS: **Save paper failure** — file marked as "error"
- [x] PASS: **Docling zero chunks** — file marked as "embed_failed"
- [x] PASS: **Embedding failure** — file marked as "embed_failed" with retry option
#### Extraction Errors
- [x] PASS: **Fact extraction failure** — error logged, spinner removed
- [x] PASS: **Verify extraction failure** — error logged
#### Audio Overview Errors
- [x] PASS: **No papers selected** — error: "Select at least one paper..."
- [x] PASS: **No conversation** — error: "Select papers and start a notebook conversation first."
- [x] PASS: **Generation failure** — shows error message with retry button
- [x] PASS: **Playback failure** — "Playback failed. Please try again."
- [x] PASS: **Audio element error** — "Unable to play generated audio."
#### Suggestion Errors
- [x] PASS: **Generation failure** — suggestions silently cleared (empty array)
- [x] PASS: **Stale request** — cancelled if new message sent before completion

### Accessibility
- [x] PASS: **ARIA tablist** — mode toggle has `role="tablist"` with `aria-selected` on buttons
- [x] PASS: **Chat log** — `role="log"` with `aria-live="polite"` on messages container
- [x] PASS: **Chat input** — `aria-label="Chat message input"`
- [x] PASS: **Send button** — `aria-label="Send message"`
- [x] PASS: **Upload button** — `aria-label="Upload files"`
- [x] PASS: **Audio overview button** — `aria-label="Audio Overview"`
