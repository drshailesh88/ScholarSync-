# notebook — Spec 020

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### Conversation History Internals
- [ ] File rows without `paperId` are forced to `selected: false` when stored `paper_ids` are restored
- [ ] Conversation-mode restoration uses strict learn-mode detection: `convo.mode === "learn"` maps to learn, everything else maps to research
- [ ] Loading an existing conversation closes the history dropdown via `setShowHistory(false)`
#### Follow-Up Suggestion Internals
- [ ] Server-side follow-up generation returns `[]` immediately when `responseText.length < 100`
- [ ] Client-side follow-up generation also gates on `assistantMsg.content.trim().length >= 100`
- [ ] Sending a new message increments `suggestionRequestIdRef.current` before any network work starts
- [ ] Suggestion generation records the owning assistant message with `setSuggestionsForMessageId(assistantMsg.id)`
- [ ] `.then(...)`, `.catch(...)`, and `.finally(...)` all reject stale suggestion results by comparing against the captured `suggestionRequestId`
- [ ] Follow-up chips render only when `msg.id === suggestionsForMessageId`, the message is the last assistant message, and `!isLoading`
- [ ] Learn-mode follow-up chips use amber classes while research-mode chips use neutral surface classes
- [ ] Previous follow-up requests are not actually aborted; stale completions are ignored via `suggestionRequestIdRef`
#### Chat Message Rendering Internals
- [ ] The main message list uses `role="log"` with `aria-live="polite"` and `aria-label="Chat messages"`
- [ ] Interactive citation pills render a `FilePdf` icon with `size={10}` and `weight="bold"`
- [ ] Citation short-title logic prefers text before the first colon only when that colon appears within the first 40 characters
- [ ] Colon-less long titles are shortened to 28 characters plus the single-character ellipsis `…`
- [ ] Copy-to-clipboard removes bracketed citation markers with `/\\[\\d+\\]/g` and collapses repeated spaces with `/\\s{2,}/g`
- [ ] Copy success resets `copiedMessageId` after exactly `2000ms`
- [ ] Re-clicking an already selected feedback thumb toggles that rating back off by sending `null`
- [ ] Helpful feedback uses green styling plus `weight="fill"` on `ThumbsUp`
- [ ] Unhelpful feedback uses red styling plus `weight="fill"` on `ThumbsDown`
- [ ] Feedback persistence runs only when `parseInt(messageId.replace("msg_", ""), 10)` yields a numeric id greater than `0`
#### Extraction Card Internals
- [ ] ExtractionCard does not return `null` when no fields are truthy; it renders the muted fallback text `No structured data could be extracted.`
- [ ] Extraction header text is exactly `Structured Extraction`
- [ ] Human-verified extractions show a green `ShieldCheck` badge labeled `Verified`
- [ ] Unverified extractions show a `Verify` button instead of a badge
- [ ] Evidence level rows render as `Level ${extraction.evidence_level}` when an evidence level exists
- [ ] `custom_extractions.key_findings` and `custom_extractions.limitations` each render in their own bordered section
- [ ] While a paper is being extracted, the file-row action slot shows only a spinning `CircleNotch` and no clickable extract button
#### Behavior Corrections (Pass 2)
- [ ] Section 14 says previous follow-up suggestion requests are "cancelled" — the live notebook does not abort them; it only ignores stale completions via `suggestionRequestIdRef`
- [ ] Section 25 claims the close controls include `aria-label="Close audio overview"` — the audio panel close button currently has `title="Close audio overview"` but no `aria-label`
- [ ] The file picker accepts `.pdf`, `.txt`, and `.md`, but `handleFileUpload()` routes every uploaded file through `/api/extract-pdf` and `extractUploadedPdf()`; there is no separate text/markdown ingestion branch in `page.tsx`
#### Components Referenced But Not Rendered
- [ ] None — every file under `src/components/notebook` is imported by `/notebook`, `/share/notebook/[token]`, or another rendered notebook component
#### `/api/rag-chat/route.ts` — RAG Chat API Internals
- [ ] Request body validated by Zod: `messages` array min(1) max(50), each with `role` enum `["user","assistant","system"]` and `content` string max(50000)
- [ ] `paperIds` validated as optional array of numbers max(50); `mode` optional string; `ragConfig` optional record
- [ ] Authentication failure returns `{ error: "Authentication required." }` with status 401
