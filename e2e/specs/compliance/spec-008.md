# compliance — Spec 008

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Project-list load failures are silent and leave the selector hidden when no projects are available
- [ ] Project dropdown button falls back to `Select project` when no project is selected
- [ ] Project dropdown is rendered only in document mode and only when `projects.length > 0`
- [ ] Clicking a project option updates `selectedProjectId` and immediately closes the dropdown
- [ ] Outside-click handling for the project dropdown uses a `mousedown` listener on `document`
- [ ] Switching into document mode clears the page-level `error` state before fetching the active document
- [ ] Document fetch runs only while `sourceMode === "document"`
- [ ] Successful document fetch sets both `activeDoc` and `inputText = activeDoc.plainText`
- [ ] Failed document fetch clears `activeDoc` and `inputText` without showing a user-facing fetch error
- [ ] Switching from document mode to paste mode does not clear `inputText`; the currently loaded document text remains available for editing
- [ ] Document-mode textarea is explicitly `readOnly`
- [ ] Paste-mode textarea is editable and uses the same shared `inputText` state as document mode
- [ ] Textarea placeholder switches between the document-mode and paste-mode helper copy based on `sourceMode`
- [ ] Word count is always shown beneath the textarea, including document mode
- [ ] Document-mode word-count row appends `from {documentTitle}` when `activeDoc` exists
- [ ] Word count is calculated from `inputText.split(/\\s+/).filter(Boolean).length`
- [ ] Realtime `Live` toggle is rendered only in paste mode before a full result exists
- [ ] Realtime toggle score pill is shown only when realtime is enabled and `realtimeResult.score` is non-null
- [ ] Realtime toggle color coding uses `>60` green, `>40` amber, and `<=40` orange
- [ ] Realtime hook waits 2 seconds after typing before firing
- [ ] Realtime hook does not run until text length reaches at least 100 characters
- [ ] Realtime hook skips reruns when the new text length differs by fewer than 10 characters from the last checked text
- [ ] Realtime hook posts `{ mode: "ai_detection" }` to `/api/integrity-check`
- [ ] Realtime hook aborts any in-flight request before starting a new one
- [ ] Realtime hook stores `aiDetection.humanScore` as the displayed percentage
- [ ] Realtime hook errors are not surfaced anywhere in the page UI
- [ ] Disabling Live hides the score display but does not explicitly clear the last computed realtime score from hook state
- [ ] `Run Integrity Check` button is disabled whenever `loading` is true or trimmed text length is under 50 characters
- [ ] Clicking `Run Integrity Check` with fewer than 50 characters sets the exact error `Please enter at least 50 characters of text to analyze.`
- [ ] Starting a full check clears the previous page-level error
- [ ] Full checks split `inputText` into `paragraphs` using blank-line boundaries before sending the request
- [ ] Full-check request posts `{ text: inputText, mode: "full" }` to `/api/integrity-check`
- [ ] Full-check timeout aborts after 30 seconds
- [ ] Non-OK full-check responses surface `data.error` when present before falling back to `Integrity check failed. Please try again.`
- [ ] Timeout errors surface `The check took too long. Please try again with shorter text.`
