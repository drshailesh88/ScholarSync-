# notebook — Spec 015

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### Chat Send, Streaming, and Error Handling Details
- [x] PASS: Stream read timeouts are handled separately from initial request failures using a per-read 30 second timeout race
- [x] PASS: Stream timeouts append the assistant message `The response timed out. Please try again or ask a simpler question.`
- [x] PASS: Non-timeout runtime failures append the assistant message `Something went wrong. Please try again.`
- [x] PASS: Request cleanup always clears the outer timeout and flips `isLoading` false in `finally`
#### RAG Headers, Coverage, and Follow-Up Suggestion Details
- [x] PASS: Notebook reads cited source metadata from the `X-RAG-Sources` response header
- [x] PASS: Parsing valid `X-RAG-Sources` sets both `currentSources` and `showSourcesPanel`
- [x] PASS: Invalid `X-RAG-Sources` JSON is ignored without UI error
- [x] PASS: Notebook reads coverage data from the `X-RAG-Coverage` response header
- [x] PASS: Missing coverage headers explicitly clear any prior coverage report
- [x] PASS: Coverage badge renders only when `coverageReport.totalPapers > 1`
- [x] PASS: Coverage badge uses green styling only for `coverageRatio === 1`
- [x] PASS: Coverage badge uses amber styling for ratios `>= 0.5` and red styling below that threshold
- [x] PASS: Coverage badge truncates unused-paper titles at the first colon when present, otherwise at 30 characters
- [x] PASS: Follow-up suggestions are requested only when the assistant response has at least 100 trimmed characters
- [x] PASS: Follow-up suggestion requests include `responseText`, `sourceTitles`, `userQuery`, and current notebook `mode`
- [x] PASS: Stale follow-up suggestion responses are dropped by comparing `suggestionRequestIdRef`
- [x] PASS: Follow-up suggestion chips render only for the latest assistant message whose id matches `suggestionsForMessageId`
- [x] PASS: Learn-mode suggestion chips switch to amber-tinted styling while research-mode chips use neutral surface styling
#### Message Rendering, Copy, and Feedback Details
- [x] PASS: Chat log container uses both `role="log"` and `aria-live="polite"`
- [x] PASS: Assistant citations render only when the message role is `assistant` and the message has a non-empty `sources` array
- [x] PASS: Citation chips show a `FilePdf` icon plus a shortened paper title and optional page label
- [x] PASS: Clicking a citation chip stores its source index in `highlightedSource`
- [x] PASS: Citation-chip tooltip includes page number and section type when present
- [x] PASS: Copy action strips bracketed citation markers like `[1]` before writing to the clipboard
- [x] PASS: Copy action also collapses repeated spaces before copying
- [x] PASS: Copy success shows a green check icon for 2 seconds only on the copied message row
- [x] PASS: Feedback actions allow toggle-off behavior by clicking the already-selected rating again
- [x] PASS: Helpful state uses green tint with `ThumbsUp` `weight="fill"`
- [x] PASS: Unhelpful state uses red tint with `ThumbsDown` `weight="fill"`
- [x] PASS: Feedback submission is attempted only when the message id can be parsed into a positive numeric database id
- [x] PASS: Failed feedback submissions do not roll back local UI state; they only log to the console
#### Source Citations Panel and PDF Jump Behavior
- [x] PASS: Sources-cited toggle label is `Sources cited (N)`
- [x] PASS: Sources panel uses `currentSources.length`, so duplicate chunk references can increase the displayed count
- [x] PASS: Highlighted source rows use a brand border/background state tied to `highlightedSource === src.sourceIndex`
- [x] PASS: Clicking a citation to a URL-backed source opens the original URL in a new tab instead of the PDF viewer
