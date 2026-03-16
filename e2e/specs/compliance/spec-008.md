# compliance — Spec 008

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Project-list load failures are silent and leave the selector hidden when no projects are available
- [x] PASS: Project dropdown button falls back to `Select project` when no project is selected
- [x] PASS: Project dropdown is rendered only in document mode and only when `projects.length > 0`
- [x] PASS: Clicking a project option updates `selectedProjectId` and immediately closes the dropdown
- [x] PASS: Outside-click handling for the project dropdown uses a `mousedown` listener on `document`
- [x] PASS: Switching into document mode clears the page-level `error` state before fetching the active document
- [x] PASS: Document fetch runs only while `sourceMode === "document"`
- [x] PASS: Successful document fetch sets both `activeDoc` and `inputText = activeDoc.plainText`
- [x] PASS: Failed document fetch clears `activeDoc` and `inputText` without showing a user-facing fetch error
- [x] PASS: Switching from document mode to paste mode does not clear `inputText`; the currently loaded document text remains available for editing
- [x] PASS: Document-mode textarea is explicitly `readOnly`
- [x] PASS: Paste-mode textarea is editable and uses the same shared `inputText` state as document mode
- [x] PASS: Textarea placeholder switches between the document-mode and paste-mode helper copy based on `sourceMode`
- [x] PASS: Word count is always shown beneath the textarea, including document mode
- [x] PASS: Document-mode word-count row appends `from {documentTitle}` when `activeDoc` exists
- [x] PASS: Word count is calculated from `inputText.split(/\\s+/).filter(Boolean).length`
- [x] PASS: Realtime `Live` toggle is rendered only in paste mode before a full result exists
- [x] PASS: Realtime toggle score pill is shown only when realtime is enabled and `realtimeResult.score` is non-null
- [x] PASS: Realtime toggle color coding uses `>60` green, `>40` amber, and `<=40` orange
- [x] PASS: Realtime hook waits 2 seconds after typing before firing
- [x] PASS: Realtime hook does not run until text length reaches at least 100 characters
- [x] PASS: Realtime hook skips reruns when the new text length differs by fewer than 10 characters from the last checked text
- [x] PASS: Realtime hook posts `{ mode: "ai_detection" }` to `/api/integrity-check`
- [x] PASS: Realtime hook aborts any in-flight request before starting a new one
- [x] PASS: Realtime hook stores `aiDetection.humanScore` as the displayed percentage
- [x] PASS: Realtime hook errors are not surfaced anywhere in the page UI
- [x] PASS: Disabling Live hides the score display but does not explicitly clear the last computed realtime score from hook state
- [x] PASS: `Run Integrity Check` button is disabled whenever `loading` is true or trimmed text length is under 50 characters
- [x] PASS: Clicking `Run Integrity Check` with fewer than 50 characters sets the exact error `Please enter at least 50 characters of text to analyze.`
- [x] PASS: Starting a full check clears the previous page-level error
- [x] PASS: Full checks split `inputText` into `paragraphs` using blank-line boundaries before sending the request
- [x] PASS: Full-check request posts `{ text: inputText, mode: "full" }` to `/api/integrity-check`
- [x] PASS: Full-check timeout aborts after 30 seconds
- [x] PASS: Non-OK full-check responses surface `data.error` when present before falling back to `Integrity check failed. Please try again.`
- [x] PASS: Timeout errors surface `The check took too long. Please try again with shorter text.`
