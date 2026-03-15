# studio — Spec 010

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Chat messages are local component state only and are not reloaded on page refresh
- [ ] `submitAiPrompt(...)` switches to the Chat tab, pre-fills the prompt, then programmatically submits the first `form` in the document after 100 ms
- [ ] Slash-command action `ask` switches to the Chat tab and focuses the chat input without auto-submitting
- [ ] Slash-command action `find-sources` opens the external Research Sidebar and seeds it with up to 200 characters of editor context
- [ ] Slash-command action `integrity-check` only switches the right panel to the `Checks` tab
- [ ] Editor action `show-word-count` posts an assistant chat message with per-section counts and total words
- [ ] Editor action `add-comment` opens the Comment Sidebar if needed and dispatches `scholarsync:new-inline-comment`
- [ ] Comment Sidebar replaces the normal AI panel only when `commentSidebarOpen` is true, `studioDoc.id` exists, and `editorRef.current` is set
- [ ] Reference Sidebar takes precedence over the Comment Sidebar when `sidebarOpen` is true
- [ ] Right-panel tabs are hidden while the Reference Sidebar or Comment Sidebar is taking over that column
- [ ] `Cmd+Shift+R` toggles the Reference Sidebar from anywhere in the page
- [ ] `Cmd+Shift+C` in the editor dispatches `scholarsync:editor-action` with `action: "insert-citation"`, but `/studio` does not currently handle that action
- [ ] Citation dialog opening stores the current editor selection in `citationSelectionRef`
- [ ] Inserted citations restore the saved selection before inserting the citation node
- [ ] Inserted citation nodes receive only `referenceIds` in their attrs payload
- [ ] After citation insertion, the page ensures a `bibliography` node exists at the end of the document
- [ ] Citation-insert success notice reads `Citation inserted` for one reference
- [ ] Citation-insert success notice reads `{N} citations inserted` for multiple references
- [ ] Citation success notice auto-clears after 2.5 seconds
- [ ] Citation notice timer is cleared on unmount
- [ ] `scholarsync:insert-citation` events from Research create a synthetic reference ID using DOI, PMID, or a slugified title
- [ ] Research-generated citations are inserted directly into the editor after being added to the reference store
- [ ] Export dropdown opens and closes from the `showExport` local state only
- [ ] Export dropdown does not implement outside-click dismissal in the current page component
- [ ] Clicking any export option closes the dropdown before making the export request
- [ ] PDF export posts `{ title, content }` to `/api/export/pdf`
- [ ] Successful PDF export opens a new browser window and writes returned HTML into it; it does not trigger a file download directly
- [ ] PDF export is a no-op when `.ProseMirror` content is empty
- [ ] PDF export failures log `PDF export failed:` to the console with no inline error
- [ ] Word export posts `{ title, content }` to `/api/export/docx`
- [ ] Word export filename is sanitized from `docTitle` by replacing non-alphanumeric characters with `_`
- [ ] Word export currently downloads with a `.doc` extension, not `.docx`
- [ ] Word export is a no-op when `.ProseMirror` content is empty
- [ ] Word export failures log `DOCX export failed:` to the console with no inline error
- [ ] Research tab in the right panel is a launcher, not an embedded search-results UI
