# notebook — Spec 020

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### Conversation History Internals
- [x] PASS: File rows without `paperId` are forced to `selected: false` when stored `paper_ids` are restored
- [x] PASS: Conversation-mode restoration uses strict learn-mode detection: `convo.mode === "learn"` maps to learn, everything else maps to research
- [x] PASS: Loading an existing conversation closes the history dropdown via `setShowHistory(false)`
#### Follow-Up Suggestion Internals
- [x] PASS: Server-side follow-up generation returns `[]` immediately when `responseText.length < 100`
- [x] PASS: Client-side follow-up generation also gates on `assistantMsg.content.trim().length >= 100`
- [x] PASS: Sending a new message increments `suggestionRequestIdRef.current` before any network work starts
- [x] PASS: Suggestion generation records the owning assistant message with `setSuggestionsForMessageId(assistantMsg.id)`
- [x] PASS: `.then(...)`, `.catch(...)`, and `.finally(...)` all reject stale suggestion results by comparing against the captured `suggestionRequestId`
- [x] PASS: Follow-up chips render only when `msg.id === suggestionsForMessageId`, the message is the last assistant message, and `!isLoading`
- [x] PASS: Learn-mode follow-up chips use amber classes while research-mode chips use neutral surface classes
- [x] PASS: Previous follow-up requests are not actually aborted; stale completions are ignored via `suggestionRequestIdRef`
#### Chat Message Rendering Internals
- [x] PASS: The main message list uses `role="log"` with `aria-live="polite"` and `aria-label="Chat messages"`
- [x] PASS: Interactive citation pills render a `FilePdf` icon with `size={10}` and `weight="bold"`
- [x] PASS: Citation short-title logic prefers text before the first colon only when that colon appears within the first 40 characters
- [x] PASS: Colon-less long titles are shortened to 28 characters plus the single-character ellipsis `…`
- [x] PASS: Copy-to-clipboard removes bracketed citation markers with `/\\[\\d+\\]/g` and collapses repeated spaces with `/\\s{2,}/g`
- [x] PASS: Copy success resets `copiedMessageId` after exactly `2000ms`
- [x] PASS: Re-clicking an already selected feedback thumb toggles that rating back off by sending `null`
- [x] PASS: Helpful feedback uses green styling plus `weight="fill"` on `ThumbsUp`
- [x] PASS: Unhelpful feedback uses red styling plus `weight="fill"` on `ThumbsDown`
- [x] PASS: Feedback persistence runs only when `parseInt(messageId.replace("msg_", ""), 10)` yields a numeric id greater than `0`
#### Extraction Card Internals
- [x] PASS: ExtractionCard does not return `null` when no fields are truthy; it renders the muted fallback text `No structured data could be extracted.`
- [x] PASS: Extraction header text is exactly `Structured Extraction`
- [x] PASS: Human-verified extractions show a green `ShieldCheck` badge labeled `Verified`
- [x] PASS: Unverified extractions show a `Verify` button instead of a badge
- [x] PASS: Evidence level rows render as `Level ${extraction.evidence_level}` when an evidence level exists
- [x] PASS: `custom_extractions.key_findings` and `custom_extractions.limitations` each render in their own bordered section
- [x] PASS: While a paper is being extracted, the file-row action slot shows only a spinning `CircleNotch` and no clickable extract button
#### Behavior Corrections (Pass 2)
- [x] PASS: Section 14 says previous follow-up suggestion requests are "cancelled" — the live notebook does not abort them; it only ignores stale completions via `suggestionRequestIdRef`
- [x] PASS: Section 25 claims the close controls include `aria-label="Close audio overview"` — the audio panel close button currently has `title="Close audio overview"` but no `aria-label`
- [x] PASS: The file picker accepts `.pdf`, `.txt`, and `.md`, but `handleFileUpload()` routes every uploaded file through `/api/extract-pdf` and `extractUploadedPdf()`; there is no separate text/markdown ingestion branch in `page.tsx`
#### Components Referenced But Not Rendered
- [x] PASS: None — every file under `src/components/notebook` is imported by `/notebook`, `/share/notebook/[token]`, or another rendered notebook component
#### `/api/rag-chat/route.ts` — RAG Chat API Internals
- [x] PASS: Request body validated by Zod: `messages` array min(1) max(50), each with `role` enum `["user","assistant","system"]` and `content` string max(50000)
- [x] PASS: `paperIds` validated as optional array of numbers max(50); `mode` optional string; `ragConfig` optional record
- [x] PASS: Authentication failure returns `{ error: "Authentication required." }` with status 401
