# notebook — Spec 018

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### Upload and URL Ingestion Internals
- [x] PASS: URL temp ids use the exact format `url_${Date.now()}`
- [x] PASS: Each optimistic URL row starts with `name: url`, `size: "URL"`, `selected: true`, `status: "processing"`, and `originalUrl: url`
- [x] PASS: URL submission clears `urlValue` and hides the composer with `setShowUrlInput(false)` before awaiting `ingestUrl(url)`
- [x] PASS: Successful URL ingestion rewrites the temp row with `name: result.title`, `size: \`${result.wordCount.toLocaleString()} words\``, `paperId: result.paperId`, and `status: result.status`
- [x] PASS: URL-ingest failures keep the original URL as the row name and set the subtitle to `error.message` or fallback `Failed to load URL`
- [x] PASS: Ready URL rows prepend a parsed hostname only when `getHostnameLabel(file.originalUrl)` succeeds
- [x] PASS: `getHostnameLabel()` strips a leading `www.` from parsed hosts and returns `null` when `new URL(url)` throws
#### RAG Chat Internals
- [x] PASS: Chat routing switches to `/api/rag-chat` only when `selectedPaperIds.length > 0`; otherwise it posts to `/api/chat`
- [x] PASS: Notebook chat request bodies always include `messages` and `mode`, and include `paperIds` only when at least one selected paper id exists
- [x] PASS: Outbound notebook requests use a request-level `AbortController` that aborts after exactly `30_000ms`
- [x] PASS: Non-OK chat responses append an assistant error message with the exact text `Unable to connect to AI. Please check your AI provider API key configuration.`
- [x] PASS: `X-RAG-Sources` header parsing uses `JSON.parse(...)` inside a `try/catch`; parse failures are silently ignored
- [x] PASS: Parsed `X-RAG-Sources` data is copied into `currentSources`, and the cited-sources panel auto-opens only when `sources.length > 0`
- [x] PASS: `X-RAG-Coverage` header parsing also uses `JSON.parse(...)` inside a `try/catch`; malformed JSON leaves the previous UI path intact without an inline error
- [x] PASS: When `X-RAG-Coverage` is absent, the notebook explicitly clears coverage state with `setCoverageReport(null)`
- [x] PASS: Streaming starts only when `res.body?.getReader()` returns a reader; a missing body exits early after `setIsLoading(false)`
- [x] PASS: Each stream read races `reader.read()` against a second `30_000ms` timeout that rejects `new Error("Stream timeout")`
- [x] PASS: The per-read timeout clears its internal timer in both the read success and read failure paths via `readPromise.then(..., ...)`
- [x] PASS: Timeout detection treats both `AbortError` and `Error("Stream timeout")` as timeout-class failures
- [x] PASS: Timeout failures append `The response timed out. Please try again or ask a simpler question.`
- [x] PASS: Non-timeout failures append `Something went wrong. Please try again.`
- [x] PASS: Error cleanup cancels the active reader with `await reader.cancel().catch(() => {})`
#### Source Notes Panel Internals
- [x] PASS: Opening the Source Notes drawer sets `animateIn` on a zero-delay `window.setTimeout(..., 0)` tick; closing it resets `animateIn` to `false`
- [x] PASS: Source Notes stores the prior `document.body.style.overflow` value and restores it on cleanup after forcing `overflow = "hidden"`
- [x] PASS: Source Notes fetches notes only for rows where `file.paperId` exists and `file.status === "ready"`
- [x] PASS: When no ready paper ids exist, Source Notes resets to `paperNotes: []`, `loading: false`, and `error: null`
- [x] PASS: Batch-note load failures show the exact panel-level error `Failed to load paper notes.`
- [x] PASS: Escape-to-close is implemented with a `document.addEventListener("keydown", ...)` listener that is removed on cleanup
- [x] PASS: `Generate All` targets only `paperNotes.filter((note) => !note.overview)` rather than regenerating already summarized papers
- [x] PASS: `Generate All` processes missing overviews in sequential batches of exactly `3`
- [x] PASS: Each batch runs `Promise.all(batch.map((note) => handleGenerate(note.paperId)))` before moving to the next batch
- [x] PASS: Paper-note cards are sorted selected-first by mapping selected papers to sort weight `0` and unselected papers to `1`
- [x] PASS: Clicking a suggested `Ask about this paper` question calls `onSendMessage(question)` and then closes the drawer
- [x] PASS: Per-paper note-generation failures render inline red text using `generationErrors.get(paperId)`
#### Audio Overview Internals
- [x] PASS: Audio overview auto-generation is guarded by `hasTriggeredRef`, so automatic generation runs only once per panel mount even if options later change
