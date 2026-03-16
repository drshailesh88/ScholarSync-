# notebook — Spec 013

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### Conversation History Details
- [x] PASS: New conversation action clears `conversationIdRef` back to `null`
- [x] PASS: New conversation action also clears follow-up suggestions, coverage report, PDF viewer, source notes, share dialog, and audio overview state
- [x] PASS: Loading a conversation restores assistant `retrieved_chunks` into the in-memory `sources` field for citation replay
- [x] PASS: Loading a conversation clears all overlay/feature state before restoring the newly loaded conversation state
- [x] PASS: Loading a conversation restores the sources panel from the last assistant message with sources, not from every message
- [x] PASS: Loading a conversation applies stored `paper_ids` by toggling each file row's `selected` flag
- [x] PASS: Loading a conversation sets learn mode only when `convo.mode === "learn"`; all other modes fall back to research
- [x] PASS: Failed conversation loads log `Failed to load conversation:` to the console and do not render inline UI feedback
#### Upload and URL Ingestion Details
- [x] PASS: File-upload temp ids use the format `upload_${Date.now()}_${Math.random()}`
- [x] PASS: Uploaded files are appended one-by-one before extraction begins, so earlier files stay visible while later files process
- [x] PASS: Upload rows show formatted byte size first, then swap to page-count text after `/api/extract-pdf` succeeds
- [x] PASS: Upload extraction failure changes only the status to `error` and leaves the existing size label unchanged
- [x] PASS: Uploaded paper titles fall back to the filename with `.pdf` stripped when extracted metadata has no title
- [x] PASS: Uploaded paper authors fall back to an empty array when extracted metadata has no author
- [x] PASS: Raw PDF storage failure logs `PDF storage failed:` to the console and does not block the remaining extraction/embed flow
- [x] PASS: Docling extraction returning zero chunks marks the file `embed_failed` and skips the embedding request
- [x] PASS: Embedding failure reads and logs the response text before marking the file `embed_failed`
- [x] PASS: Upload catch-all failures mark only the affected file row `error`
- [x] PASS: File input is reset to an empty value after the upload loop finishes so the same file can be picked again
- [x] PASS: URL temp ids use the format `url_${Date.now()}`
- [x] PASS: URL rows are added as selected processing rows before `ingestUrl()` returns
- [x] PASS: URL rows use `size: "URL"` before the ingest result arrives
- [x] PASS: URL submission clears the input value and hides the URL composer immediately before awaiting the server action
- [x] PASS: Successful URL ingestion replaces the temporary row name with `result.title`
- [x] PASS: Successful URL ingestion formats word count with `toLocaleString()` before adding `words`
- [x] PASS: URL-ingest failures leave the original URL string as the row title and place the error message into the size field
#### File Row Defaults and Actions
- [x] PASS: Sidebar source rows use a shared hover group so extraction/remove actions are hidden until hover
- [x] PASS: URL-backed sources use the `Globe` icon even when they originated from the library rather than from the URL composer in the current session
- [x] PASS: Processing icons animate with `animate-pulse` for both uploaded files and URL rows
- [x] PASS: Error and embed-failed rows both use red icon styling
- [x] PASS: URL rows in ready state show `hostname · size` when the original URL parses successfully
- [x] PASS: URL rows in ready state fall back to `size` alone when hostname parsing fails
- [x] PASS: `embed_failed` rows show the literal subtitle `Embedding failed`, not the original size text
- [x] PASS: Retry-embedding action appears only when `status === "embed_failed"` and `paperId` exists
- [x] PASS: Retry-embedding action text is exactly `Click to retry`
