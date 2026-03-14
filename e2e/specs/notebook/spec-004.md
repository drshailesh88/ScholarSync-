# notebook — Spec 004

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Message Streaming & RAG
#### RAG vs Non-RAG Routing
- [ ] **Without selected papers** — sends to `/api/chat` (general chat)
- [ ] **Mode parameter** — `"notebook"` for research, `"learn"` for learn mode
#### Conversation Persistence
- [ ] **First message** — creates conversation via `createConversation()` with mode, title (first 80 chars), and paper_ids
- [ ] **Subsequent messages** — updates paper_ids if selection changed
- [ ] **User messages** — persisted via `addMessage()` (fire-and-forget)
- [ ] **Assistant messages** — persisted with `retrieved_chunks` for citation replay
#### Streaming
- [ ] Response streams via `ReadableStream` reader
- [ ] Text decoded incrementally with `TextDecoder`
- [ ] Message content updated in real-time as chunks arrive
- [ ] **30-second request timeout** — via AbortController
- [ ] **30-second per-chunk stream timeout** — via Promise.race with timeout
#### Source Metadata
- [ ] **X-RAG-Sources header** — parsed to extract source metadata
- [ ] Sources set as current sources for panel display
- [ ] Sources panel auto-opens when sources are present
#### Coverage Report
- [ ] **X-RAG-Coverage header** — parsed to extract coverage data
- [ ] Coverage report cleared on each new message send
#### Error Handling
- [ ] **API error** — "Unable to connect to AI. Please check your AI provider API key configuration."
- [ ] **Request timeout (AbortError)** — "The response timed out. Please try again or ask a simpler question."
- [ ] **Stream timeout** — same timeout message as request timeout
- [ ] **Generic error** — "Something went wrong. Please try again."
- [ ] Stream reader cancelled on timeout/error

### Citation System (In-Chat)
#### Citation Rendering
- [ ] **Pattern** — `[N]` markers in assistant text parsed and rendered as interactive badges
- [ ] **Badge style** — brand/10 background, brand/20 border, brand text, rounded-md
- [ ] **Badge content** — FilePdf icon + short title + page number (if available)
- [ ] **Short title logic** — truncates at first colon (if within 40 chars) or at 28 chars with "..."
- [ ] **Page label** — shows `, p.N` when page number is available
- [ ] **Tooltip** — full paper title, page number, section type on hover
#### Citation Click Behavior
- [ ] **Highlights source** — sets `highlightedSource` index
- [ ] **Web source** — opens original URL in new tab (`_blank`, `noopener,noreferrer`)
- [ ] **PDF source** — opens PDF viewer at cited page number
- [ ] **Closes other overlays** — source notes and share dialog closed on click
- [ ] **Missing source** — gracefully renders raw `[N]` text if source not found

### Source Coverage Report
- [ ] **Visibility** — only shown when `totalPapers > 1`
- [ ] **Badge format** — "Sources used: N/M" with optional unused paper list
- [ ] **Color coding**:
