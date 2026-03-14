# notebook — Spec 015

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### Chat Send, Streaming, and Error Handling Details
- [ ] Stream read timeouts are handled separately from initial request failures using a per-read 30 second timeout race
- [ ] Stream timeouts append the assistant message `The response timed out. Please try again or ask a simpler question.`
- [ ] Non-timeout runtime failures append the assistant message `Something went wrong. Please try again.`
- [ ] Request cleanup always clears the outer timeout and flips `isLoading` false in `finally`
#### RAG Headers, Coverage, and Follow-Up Suggestion Details
- [ ] Notebook reads cited source metadata from the `X-RAG-Sources` response header
- [ ] Parsing valid `X-RAG-Sources` sets both `currentSources` and `showSourcesPanel`
- [ ] Invalid `X-RAG-Sources` JSON is ignored without UI error
- [ ] Notebook reads coverage data from the `X-RAG-Coverage` response header
- [ ] Missing coverage headers explicitly clear any prior coverage report
- [ ] Coverage badge renders only when `coverageReport.totalPapers > 1`
- [ ] Coverage badge uses green styling only for `coverageRatio === 1`
- [ ] Coverage badge uses amber styling for ratios `>= 0.5` and red styling below that threshold
- [ ] Coverage badge truncates unused-paper titles at the first colon when present, otherwise at 30 characters
- [ ] Follow-up suggestions are requested only when the assistant response has at least 100 trimmed characters
- [ ] Follow-up suggestion requests include `responseText`, `sourceTitles`, `userQuery`, and current notebook `mode`
- [ ] Stale follow-up suggestion responses are dropped by comparing `suggestionRequestIdRef`
- [ ] Follow-up suggestion chips render only for the latest assistant message whose id matches `suggestionsForMessageId`
- [ ] Learn-mode suggestion chips switch to amber-tinted styling while research-mode chips use neutral surface styling
#### Message Rendering, Copy, and Feedback Details
- [ ] Chat log container uses both `role="log"` and `aria-live="polite"`
- [ ] Assistant citations render only when the message role is `assistant` and the message has a non-empty `sources` array
- [ ] Citation chips show a `FilePdf` icon plus a shortened paper title and optional page label
- [ ] Clicking a citation chip stores its source index in `highlightedSource`
- [ ] Citation-chip tooltip includes page number and section type when present
- [ ] Copy action strips bracketed citation markers like `[1]` before writing to the clipboard
- [ ] Copy action also collapses repeated spaces before copying
- [ ] Copy success shows a green check icon for 2 seconds only on the copied message row
- [ ] Feedback actions allow toggle-off behavior by clicking the already-selected rating again
- [ ] Helpful state uses green tint with `ThumbsUp` `weight="fill"`
- [ ] Unhelpful state uses red tint with `ThumbsDown` `weight="fill"`
- [ ] Feedback submission is attempted only when the message id can be parsed into a positive numeric database id
- [ ] Failed feedback submissions do not roll back local UI state; they only log to the console
#### Source Citations Panel and PDF Jump Behavior
- [ ] Sources-cited toggle label is `Sources cited (N)`
- [ ] Sources panel uses `currentSources.length`, so duplicate chunk references can increase the displayed count
- [ ] Highlighted source rows use a brand border/background state tied to `highlightedSource === src.sourceIndex`
- [ ] Clicking a citation to a URL-backed source opens the original URL in a new tab instead of the PDF viewer
