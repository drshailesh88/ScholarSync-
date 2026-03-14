# notebook — Spec 014

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### File Row Defaults and Actions
- [ ] Retry-embedding sets status back to `processing` before calling `/api/embed`
- [ ] Source-row remove action deletes the row from local state immediately and has no confirmation dialog
- [ ] Source-row checkbox toggles only local `selected` state until the next message send or audio/share action syncs selections to the conversation
#### Extraction Card and Fact Extraction Details
- [ ] Extraction card hides itself entirely when no extraction fields contain truthy values, replacing the body with `No structured data could be extracted.`
- [ ] Extraction header label is `Structured Extraction`
- [ ] Verified extractions show a `ShieldCheck` icon and the text `Verified`
- [ ] Unverified extractions show a `Verify` button instead of a badge
- [ ] Extraction evidence level is displayed as `Level X` when `evidence_level` exists
- [ ] `key_findings` custom extraction is rendered in its own border-top section
- [ ] `limitations` custom extraction is rendered in its own border-top section
- [ ] Extract-facts buttons only appear for rows with `paperId` and `status === "ready"`
- [ ] Extract-facts buttons are replaced by a green `CheckCircle` view button once extraction exists
- [ ] While extraction is in progress for a paper, the action slot shows only a spinning loader and not the extract button
- [ ] Successful fact extraction automatically expands the corresponding inline extraction card
- [ ] Successful fact extraction flips the file row's `isExtracted` flag to true
- [ ] Verify-extraction success mutates only the in-memory extraction map by setting `human_verified: true`
- [ ] Extract-facts and verify failures are console-only and do not show per-row inline error banners
#### Chat Header and Overlay Trigger Details
- [ ] Chat header title is `Notebook Chat` in research mode and `Learn Mode` in learn mode
- [ ] Learn-mode badge text is `Socratic tutoring`
- [ ] `View Source Notes` button always remains enabled, even when no sources are selected
- [ ] Clicking `View Source Notes` closes the PDF viewer and share dialog before opening the notes drawer
- [ ] Audio Overview button is disabled when no selected rows have `paperId`
- [ ] Clicking Audio Overview closes the PDF viewer, source notes, and share dialog before attempting generation
- [ ] Share button is disabled until a conversation id exists
- [ ] Clicking Share closes the PDF viewer and source notes before opening the share dialog
#### Chat Send, Streaming, and Error Handling Details
- [ ] Sending any message increments `suggestionRequestIdRef` before the request to invalidate stale follow-up suggestions
- [ ] Sending a message clears prior follow-up suggestions, coverage report, and suggestion-loading state before appending the new user message
- [ ] New user message ids use the format `msg_${Date.now()}`
- [ ] When no sources are selected, the notebook uses `/api/chat`; when at least one selected paper id exists, it uses `/api/rag-chat`
- [ ] Conversation creation mode is `learn` in learn mode and `notebook` in research mode
- [ ] Existing conversations update stored `paper_ids` on every send via `updateConversationPaperIds(...)`
- [ ] User messages are persisted with `addMessage(...)` in a fire-and-forget call that does not block streaming
- [ ] Notebook requests abort after 30 seconds via `AbortController`
- [ ] Assistant connection failures append the fixed assistant error `Unable to connect to AI. Please check your AI provider API key configuration.`
- [ ] Missing response bodies stop loading silently without adding a second error bubble
