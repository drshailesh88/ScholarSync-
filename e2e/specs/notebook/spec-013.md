# notebook — Spec 013

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### Conversation History Details
- [ ] New conversation action clears `conversationIdRef` back to `null`
- [ ] New conversation action also clears follow-up suggestions, coverage report, PDF viewer, source notes, share dialog, and audio overview state
- [ ] Loading a conversation restores assistant `retrieved_chunks` into the in-memory `sources` field for citation replay
- [ ] Loading a conversation clears all overlay/feature state before restoring the newly loaded conversation state
- [ ] Loading a conversation restores the sources panel from the last assistant message with sources, not from every message
- [ ] Loading a conversation applies stored `paper_ids` by toggling each file row's `selected` flag
- [ ] Loading a conversation sets learn mode only when `convo.mode === "learn"`; all other modes fall back to research
- [ ] Failed conversation loads log `Failed to load conversation:` to the console and do not render inline UI feedback
#### Upload and URL Ingestion Details
- [ ] File-upload temp ids use the format `upload_${Date.now()}_${Math.random()}`
- [ ] Uploaded files are appended one-by-one before extraction begins, so earlier files stay visible while later files process
- [ ] Upload rows show formatted byte size first, then swap to page-count text after `/api/extract-pdf` succeeds
- [ ] Upload extraction failure changes only the status to `error` and leaves the existing size label unchanged
- [ ] Uploaded paper titles fall back to the filename with `.pdf` stripped when extracted metadata has no title
- [ ] Uploaded paper authors fall back to an empty array when extracted metadata has no author
- [ ] Raw PDF storage failure logs `PDF storage failed:` to the console and does not block the remaining extraction/embed flow
- [ ] Docling extraction returning zero chunks marks the file `embed_failed` and skips the embedding request
- [ ] Embedding failure reads and logs the response text before marking the file `embed_failed`
- [ ] Upload catch-all failures mark only the affected file row `error`
- [ ] File input is reset to an empty value after the upload loop finishes so the same file can be picked again
- [ ] URL temp ids use the format `url_${Date.now()}`
- [ ] URL rows are added as selected processing rows before `ingestUrl()` returns
- [ ] URL rows use `size: "URL"` before the ingest result arrives
- [ ] URL submission clears the input value and hides the URL composer immediately before awaiting the server action
- [ ] Successful URL ingestion replaces the temporary row name with `result.title`
- [ ] Successful URL ingestion formats word count with `toLocaleString()` before adding `words`
- [ ] URL-ingest failures leave the original URL string as the row title and place the error message into the size field
#### File Row Defaults and Actions
- [ ] Sidebar source rows use a shared hover group so extraction/remove actions are hidden until hover
- [ ] URL-backed sources use the `Globe` icon even when they originated from the library rather than from the URL composer in the current session
- [ ] Processing icons animate with `animate-pulse` for both uploaded files and URL rows
- [ ] Error and embed-failed rows both use red icon styling
- [ ] URL rows in ready state show `hostname · size` when the original URL parses successfully
- [ ] URL rows in ready state fall back to `size` alone when hostname parsing fails
- [ ] `embed_failed` rows show the literal subtitle `Embedding failed`, not the original size text
- [ ] Retry-embedding action appears only when `status === "embed_failed"` and `paperId` exists
- [ ] Retry-embedding action text is exactly `Click to retry`
