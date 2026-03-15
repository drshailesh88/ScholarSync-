# notebook — Spec 004

STATUS: PARTIAL
TESTED: 35/35
PASS: 34
FAIL: 1
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Message Streaming & RAG
#### RAG vs Non-RAG Routing
- [x] PASS: **Without selected papers** — sends to `/api/chat` (general chat)
- [x] PASS: **Mode parameter** — `"notebook"` for research, `"learn"` for learn mode
#### Conversation Persistence
- [x] PASS: **First message** — creates conversation via `createConversation()` with mode, title (first 80 chars), and paper_ids
- [x] PASS: **Subsequent messages** — updates paper_ids if selection changed
- [x] PASS: **User messages** — persisted via `addMessage()` (fire-and-forget)
- [x] PASS: **Assistant messages** — persisted with `retrieved_chunks` for citation replay
#### Streaming
- [x] PASS: Response streams via `ReadableStream` reader
- [x] PASS: Text decoded incrementally with `TextDecoder`
- [x] PASS: Message content updated in real-time as chunks arrive
- [x] PASS: **30-second request timeout** — via AbortController
- [x] PASS: **30-second per-chunk stream timeout** — via Promise.race with timeout
#### Source Metadata
- [x] PASS: **X-RAG-Sources header** — parsed to extract source metadata
- [x] PASS: Sources set as current sources for panel display
- [x] PASS: Sources panel auto-opens when sources are present
#### Coverage Report
- [x] PASS: **X-RAG-Coverage header** — parsed to extract coverage data
- [x] PASS: Coverage report cleared on each new message send
#### Error Handling
- [x] PASS: **API error** — "Unable to connect to AI. Please check your AI provider API key configuration."
- [x] PASS: **Request timeout (AbortError)** — "The response timed out. Please try again or ask a simpler question."
- [x] PASS: **Stream timeout** — same timeout message as request timeout
- [ ] FAIL: **Generic error** — "Something went wrong. Please try again."
- [x] PASS: Stream reader cancelled on timeout/error

### Citation System (In-Chat)
#### Citation Rendering
- [x] PASS: **Pattern** — `[N]` markers in assistant text parsed and rendered as interactive badges
- [x] PASS: **Badge style** — brand/10 background, brand/20 border, brand text, rounded-md
- [x] PASS: **Badge content** — FilePdf icon + short title + page number (if available)
- [x] PASS: **Short title logic** — truncates at first colon (if within 40 chars) or at 28 chars with "..."
- [x] PASS: **Page label** — shows `, p.N` when page number is available
- [x] PASS: **Tooltip** — full paper title, page number, section type on hover
#### Citation Click Behavior
- [x] PASS: **Highlights source** — sets `highlightedSource` index
- [x] PASS: **Web source** — opens original URL in new tab (`_blank`, `noopener,noreferrer`)
- [x] PASS: **PDF source** — opens PDF viewer at cited page number
- [x] PASS: **Closes other overlays** — source notes and share dialog closed on click
- [x] PASS: **Missing source** — gracefully renders raw `[N]` text if source not found

### Source Coverage Report
- [x] PASS: **Visibility** — only shown when `totalPapers > 1`
- [x] PASS: **Badge format** — "Sources used: N/M" with optional unused paper list
- [x] PASS: **Color coding**:
