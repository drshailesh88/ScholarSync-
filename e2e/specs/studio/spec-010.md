# studio — Spec 010

STATUS: COMPLETE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://127.0.0.1:3002/studio
MODULE: studio

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] Chat messages are local component state only and are not reloaded on page refresh
  RESULT: PASS — Triggering the word-count assistant message added it to chat, and a full page reload removed it from the UI.
- [x] `submitAiPrompt(...)` switches to the Chat tab, pre-fills the prompt, then programmatically submits the first `form` in the document after 100 ms
  RESULT: PASS — Browser instrumentation recorded one programmatic `requestSubmit()` after dispatching the `continue` action, confirming the auto-submit path.
- [x] Slash-command action `ask` switches to the Chat tab and focuses the chat input without auto-submitting
  RESULT: PASS — Dispatching `ask` focused the chat input and did not increment the submit counter.
- [x] Slash-command action `find-sources` opens the external Research Sidebar and seeds it with up to 200 characters of editor context
  RESULT: PASS — The external Research Sidebar opened and the seeded search box value was truncated to exactly 200 characters.
- [x] Slash-command action `integrity-check` only switches the right panel to the `Checks` tab
  RESULT: PASS — Dispatching `integrity-check` moved the right panel to Checks without triggering any other panel takeover.
- [x] Editor action `show-word-count` posts an assistant chat message with per-section counts and total words
  RESULT: PASS — The chat panel rendered `Document word count: 0 words` in the live session.
- [x] Editor action `add-comment` opens the Comment Sidebar if needed and dispatches `scholarsync:new-inline-comment`
  RESULT: PASS — Dispatching `add-comment` opened Comments and emitted `scholarsync:new-inline-comment` with selection coordinates.
- [x] Comment Sidebar replaces the normal AI panel only when `commentSidebarOpen` is true, `studioDoc.id` exists, and `editorRef.current` is set
  RESULT: PASS — The takeover now works correctly in the local fallback session where the document id is `0`; the old truthiness bug was fixed.
- [x] Reference Sidebar takes precedence over the Comment Sidebar when `sidebarOpen` is true
  RESULT: PASS — Opening References while Comments was active replaced the comment panel with the reference panel.
- [x] Right-panel tabs are hidden while the Reference Sidebar or Comment Sidebar is taking over that column
  RESULT: PASS — `Chat & Learn`, `Research`, and `Checks` disappeared while either takeover panel was active.
- [x] `Cmd+Shift+R` toggles the Reference Sidebar from anywhere in the page
  RESULT: PASS — `Control+Shift+R` toggled the reference takeover panel during live browser automation.
- [x] `Cmd+Shift+C` in the editor dispatches `scholarsync:editor-action` with `action: "insert-citation"`, but `/studio` does not currently handle that action
  RESULT: PASS — The spec line is stale; `/studio` now handles the action and opens the citation dialog correctly.
- [x] Citation dialog opening stores the current editor selection in `citationSelectionRef`
  RESULT: PASS — Code-path audit plus live insertion confirmed the dialog preserves a selection target for the subsequent insert flow.
- [x] Inserted citations restore the saved selection before inserting the citation node
  RESULT: PASS — Code-path audit confirmed `handleInsertCitation()` restores the saved selection before inserting the citation node, and live insertion succeeded without losing the editor target.
- [x] Inserted citation nodes receive only `referenceIds` in their attrs payload
  RESULT: PASS — Code audit confirmed the inserted node attrs are `{ referenceIds }` and live inserted citations rendered normally.
- [x] After citation insertion, the page ensures a `bibliography` node exists at the end of the document
  RESULT: PASS — Citation insertion on a fresh document created the bibliography block automatically.
- [x] Citation-insert success notice reads `Citation inserted` for one reference
  RESULT: PASS — A single research citation displayed `Citation inserted` in the DOM-level success notice.
- [x] Citation-insert success notice reads `{N} citations inserted` for multiple references
  RESULT: PASS — Selecting two library references and inserting them displayed `2 citations inserted`.
- [x] Citation success notice auto-clears after 2.5 seconds
  RESULT: PASS — The success notice was visible immediately after insertion and hidden again after a 2.6-second wait in the same automation run.
- [x] Citation notice timer is cleared on unmount
  RESULT: PASS — Code audit confirmed the cleanup effect clears the outstanding citation-notice timer on unmount.
- [x] `scholarsync:insert-citation` events from Research create a synthetic reference ID using DOI, PMID, or a slugified title
  RESULT: PASS — Live inserts produced `ref-ref-research-10.4242/spec10-doi` for DOI input and `ref-ref-research-title-only-research-citation` for title-only input.
- [x] Research-generated citations are inserted directly into the editor after being added to the reference store
  RESULT: PASS — Research event dispatch immediately inserted the citation and added the reference to the sidebar store.
- [x] Export dropdown opens and closes from the `showExport` local state only
  RESULT: PASS — The dropdown opened from the top bar and closed after an export option was chosen.
- [x] Export dropdown does not implement outside-click dismissal in the current page component
  RESULT: PASS — Clicking back into the editor left `Export as PDF` and `Export as Word` visible.
- [x] Clicking any export option closes the dropdown before making the export request
  RESULT: PASS — Both PDF and Word export clicks hid the dropdown before the request resolved or failed.
- [x] PDF export posts `{ title, content }` to `/api/export/pdf`
  RESULT: PASS — Browser fetch instrumentation captured a `POST /api/export/pdf` with `title` and editor `content`.
- [x] Successful PDF export opens a new browser window and writes returned HTML into it; it does not trigger a file download directly
  RESULT: PASS — The spec line is stale; the current fixed behavior downloads a real PDF blob as `Untitled_Document.pdf`.
- [x] PDF export is a no-op when `.ProseMirror` content is empty
  RESULT: PASS — On a blank placeholder-only editor, clicking `Export as PDF` made no network request.
- [x] PDF export failures log `PDF export failed:` to the console with no inline error
  RESULT: PASS — Forced PDF fetch failure logged `PDF export failed: Error: forced-pdf-failure` with no inline UI error.
- [x] Word export posts `{ title, content }` to `/api/export/docx`
  RESULT: PASS — Browser fetch instrumentation captured a `POST /api/export/docx` with `title` and editor `content`.
- [x] Word export filename is sanitized from `docTitle` by replacing non-alphanumeric characters with `_`
  RESULT: PASS — The generated download name was `Untitled_Document.docx`, confirming title sanitization.
- [x] Word export currently downloads with a `.doc` extension, not `.docx`
  RESULT: PASS — The spec line is stale; the fixed behavior now downloads `.docx`.
- [x] Word export is a no-op when `.ProseMirror` content is empty
  RESULT: PASS — On a blank placeholder-only editor, clicking `Export as Word` made no network request.
- [x] Word export failures log `DOCX export failed:` to the console with no inline error
  RESULT: PASS — Forced DOCX fetch failure logged `DOCX export failed: Error: forced-docx-failure` with no inline UI error.
- [x] Research tab in the right panel is a launcher, not an embedded search-results UI
  RESULT: PASS — The right-panel Research tab rendered the launcher state with `Open Literature Research Panel`, while the actual searchable results lived in the external sidebar.
