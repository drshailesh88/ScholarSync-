# editor — Spec 016

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Editor Route Persistence, Offline Queue, and Retry Logic
- [ ] A non-numeric editor route id throws `Invalid document ID`
- [ ] A missing numeric document throws `Document not found`
- [ ] DB load failures fall back to `localStorage["scholarsync_doc_<urlDocumentId>"]`
- [ ] Local fallback restores `content` from the parsed local payload
- [ ] Local fallback also restores `title` from the parsed local payload when present
- [ ] Local fallback sets the visible error banner text to `Loaded from local storage. Database unavailable. Changes will be saved locally.`
- [ ] Local fallback clears `projectId` and `sectionId` to `null`
- [ ] If both DB load and local fallback fail, the hook sets `Failed to load document. Please refresh the page.`
- [ ] Editor-route autosave versions run every 10 minutes only when `dbDocumentId`, `sectionId`, and `content` all exist
- [ ] Browser `online` events trigger queued-save replay through `processQueue(...)`
- [ ] Offline-queue replay marks the editor route as `saved` only after at least one queued save succeeds
- [ ] Browser `offline` events set the route save state to `offline` unless the current state is already `saving`, `unsaved`, or `local`
- [ ] Editor-route `handleEditorUpdate` sets in-memory content immediately before the debounced save executes
- [ ] Editor-route debounced persistence delay is fixed at 2000 ms in the hook
- [ ] When no DB document exists, editor-route autosave writes only to localStorage and never calls the DB save action
- [ ] Local-only save payload includes `content`, `plainText`, `wordCount`, `title`, `documentType`, and `timestamp`
- [ ] Successful DB saves still back up the latest editor payload to `localStorage["scholarsync_doc_<urlDocumentId>"]`
- [ ] DB save retries use exponential backoff with up to 3 retries, 1000 ms initial delay, 10000 ms max delay, and 0-500 ms jitter
- [ ] Save retry attempts keep the visible route state at `saving`
- [ ] When a DB save fails while offline, the hook enqueues exactly one latest save per document in `scholarsync_save_queue`
- [ ] Offline queue entries replace prior queued saves for the same document instead of accumulating duplicates
- [ ] Offline save fallback sets route save state to `local`
- [ ] Offline save fallback sets the banner text to `Saved locally. Changes will sync when you're back online.`
- [ ] Non-offline save failures set route save state to `error`
- [ ] Non-offline save failures set the banner text to `Failed to save. Please check your connection.`
- [ ] `setTitle(...)` updates the DB title immediately when `dbDocumentId` exists
- [ ] Title-update failures are intentionally silent in the UI and only log to the console
- [ ] `setTitle(...)` also updates the matching localStorage payload title when local data exists
- [ ] `retrySave()` sends the current editor JSON back through `saveDocumentContent(...)`
- [ ] `retrySave()` currently retries with `plain_text_content: ""` and `word_count: 0` rather than recomputing those values
- [ ] Successful `retrySave()` clears `loadedFromLocalStorage` back to `false`
#### AcademicEditor, TopBar, and Floating Tooling
- [ ] `AcademicEditor` enables editing only when `readOnly` is false and editor store mode is not `viewing`
- [ ] Academic editor `StarterKit` heading levels are limited to `1`, `2`, `3`, and `4`
- [ ] Academic editor paragraph placeholder reads `Start writing, or type / for commands...`
- [ ] Academic editor H1 placeholder reads `Manuscript title...`
