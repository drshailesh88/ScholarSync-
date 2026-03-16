# studio — Spec 010

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Chat messages are local component state only and are not reloaded on page refresh
- [x] PASS: `submitAiPrompt(...)` switches to the Chat tab, pre-fills the prompt, then programmatically submits the first `form` in the document after 100 ms
- [x] PASS: Slash-command action `ask` switches to the Chat tab and focuses the chat input without auto-submitting
- [x] PASS: Slash-command action `find-sources` opens the external Research Sidebar and seeds it with up to 200 characters of editor context
- [x] PASS: Slash-command action `integrity-check` only switches the right panel to the `Checks` tab
- [x] PASS: Editor action `show-word-count` posts an assistant chat message with per-section counts and total words
- [x] PASS: Editor action `add-comment` opens the Comment Sidebar if needed and dispatches `scholarsync:new-inline-comment`
- [x] PASS: Comment Sidebar replaces the normal AI panel only when `commentSidebarOpen` is true, `studioDoc.id` exists, and `editorRef.current` is set
- [x] PASS: Reference Sidebar takes precedence over the Comment Sidebar when `sidebarOpen` is true
- [x] PASS: Right-panel tabs are hidden while the Reference Sidebar or Comment Sidebar is taking over that column
- [x] PASS: `Cmd+Shift+R` toggles the Reference Sidebar from anywhere in the page
- [x] PASS: `Cmd+Shift+C` in the editor dispatches `scholarsync:editor-action` with `action: "insert-citation"`, but `/studio` does not currently handle that action
- [x] PASS: Citation dialog opening stores the current editor selection in `citationSelectionRef`
- [x] PASS: Inserted citations restore the saved selection before inserting the citation node
- [x] PASS: Inserted citation nodes receive only `referenceIds` in their attrs payload
- [x] PASS: After citation insertion, the page ensures a `bibliography` node exists at the end of the document
- [x] PASS: Citation-insert success notice reads `Citation inserted` for one reference
- [x] PASS: Citation-insert success notice reads `{N} citations inserted` for multiple references
- [x] PASS: Citation success notice auto-clears after 2.5 seconds
- [x] PASS: Citation notice timer is cleared on unmount
- [x] PASS: `scholarsync:insert-citation` events from Research create a synthetic reference ID using DOI, PMID, or a slugified title
- [x] PASS: Research-generated citations are inserted directly into the editor after being added to the reference store
- [x] PASS: Export dropdown opens and closes from the `showExport` local state only
- [x] PASS: Export dropdown does not implement outside-click dismissal in the current page component
- [x] PASS: Clicking any export option closes the dropdown before making the export request
- [x] PASS: PDF export posts `{ title, content }` to `/api/export/pdf`
- [x] PASS: Successful PDF export opens a new browser window and writes returned HTML into it; it does not trigger a file download directly
- [x] PASS: PDF export is a no-op when `.ProseMirror` content is empty
- [x] PASS: PDF export failures log `PDF export failed:` to the console with no inline error
- [x] PASS: Word export posts `{ title, content }` to `/api/export/docx`
- [x] PASS: Word export filename is sanitized from `docTitle` by replacing non-alphanumeric characters with `_`
- [x] PASS: Word export currently downloads with a `.doc` extension, not `.docx`
- [x] PASS: Word export is a no-op when `.ProseMirror` content is empty
- [x] PASS: Word export failures log `DOCX export failed:` to the console with no inline error
- [x] PASS: Research tab in the right panel is a launcher, not an embedded search-results UI
