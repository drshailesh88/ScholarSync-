# notebook — Spec 014

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### File Row Defaults and Actions
- [x] PASS: Retry-embedding sets status back to `processing` before calling `/api/embed`
- [x] PASS: Source-row remove action deletes the row from local state immediately and has no confirmation dialog
- [x] PASS: Source-row checkbox toggles only local `selected` state until the next message send or audio/share action syncs selections to the conversation
#### Extraction Card and Fact Extraction Details
- [x] PASS: Extraction card hides itself entirely when no extraction fields contain truthy values, replacing the body with `No structured data could be extracted.`
- [x] PASS: Extraction header label is `Structured Extraction`
- [x] PASS: Verified extractions show a `ShieldCheck` icon and the text `Verified`
- [x] PASS: Unverified extractions show a `Verify` button instead of a badge
- [x] PASS: Extraction evidence level is displayed as `Level X` when `evidence_level` exists
- [x] PASS: `key_findings` custom extraction is rendered in its own border-top section
- [x] PASS: `limitations` custom extraction is rendered in its own border-top section
- [x] PASS: Extract-facts buttons only appear for rows with `paperId` and `status === "ready"`
- [x] PASS: Extract-facts buttons are replaced by a green `CheckCircle` view button once extraction exists
- [x] PASS: While extraction is in progress for a paper, the action slot shows only a spinning loader and not the extract button
- [x] PASS: Successful fact extraction automatically expands the corresponding inline extraction card
- [x] PASS: Successful fact extraction flips the file row's `isExtracted` flag to true
- [x] PASS: Verify-extraction success mutates only the in-memory extraction map by setting `human_verified: true`
- [x] PASS: Extract-facts and verify failures are console-only and do not show per-row inline error banners
#### Chat Header and Overlay Trigger Details
- [x] PASS: Chat header title is `Notebook Chat` in research mode and `Learn Mode` in learn mode
- [x] PASS: Learn-mode badge text is `Socratic tutoring`
- [x] PASS: `View Source Notes` button always remains enabled, even when no sources are selected
- [x] PASS: Clicking `View Source Notes` closes the PDF viewer and share dialog before opening the notes drawer
- [x] PASS: Audio Overview button is disabled when no selected rows have `paperId`
- [x] PASS: Clicking Audio Overview closes the PDF viewer, source notes, and share dialog before attempting generation
- [x] PASS: Share button is disabled until a conversation id exists
- [x] PASS: Clicking Share closes the PDF viewer and source notes before opening the share dialog
#### Chat Send, Streaming, and Error Handling Details
- [x] PASS: Sending any message increments `suggestionRequestIdRef` before the request to invalidate stale follow-up suggestions
- [x] PASS: Sending a message clears prior follow-up suggestions, coverage report, and suggestion-loading state before appending the new user message
- [x] PASS: New user message ids use the format `msg_${Date.now()}`
- [x] PASS: When no sources are selected, the notebook uses `/api/chat`; when at least one selected paper id exists, it uses `/api/rag-chat`
- [x] PASS: Conversation creation mode is `learn` in learn mode and `notebook` in research mode
- [x] PASS: Existing conversations update stored `paper_ids` on every send via `updateConversationPaperIds(...)`
- [x] PASS: User messages are persisted with `addMessage(...)` in a fire-and-forget call that does not block streaming
- [x] PASS: Notebook requests abort after 30 seconds via `AbortController`
- [x] PASS: Assistant connection failures append the fixed assistant error `Unable to connect to AI. Please check your AI provider API key configuration.`
- [x] PASS: Missing response bodies stop loading silently without adding a second error bubble
