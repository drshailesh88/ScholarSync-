# editor — Spec 026

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Comment Sidebar Local Storage and Threading
- [ ] Comment-sidebar empty state title is `No comments yet`
- [ ] Comment-sidebar empty-state helper reads `Select text and click the comment button to start`
- [ ] Inline pending comment input placeholder is `Add a comment...`
- [ ] Bottom new-comment input placeholder is `Add a general comment about this document...`
- [ ] Reply input placeholder is `Write a reply...`
- [ ] Pending inline comment input submits on `Enter` only when `Shift` is not held
- [ ] Pending inline comment `Add` button is disabled when the trimmed input is empty
- [ ] Top-level quoted-text buttons call `scrollToComment(...)` to reselect the original editor range
- [ ] Top-level actions include `Resolve` or `Unresolve`, `Reply`, and `Delete`
- [ ] Reply bubbles do not render their own resolve or reply controls
- [ ] Delete controls appear only when `comment.userId === "local-user"`
#### Version History and Export Dialog Details
- [ ] Version-history loading state is spinner-only with no text label
- [ ] Version-history empty-state text is `No versions yet`
- [ ] Manual version save prompt text is `Version name (e.g., 'Before methods rewrite'):`
- [ ] Cancelling the version-name prompt inserts no manual version
- [ ] Restore confirm text is `Restore this version? Your current content will be saved as a version first.`
- [ ] Restore flow auto-saves the current first section before writing the selected version snapshot back
- [ ] Version-history preview modal title is `Version Preview`
- [ ] Version-history preview renders `JSON.stringify(content, null, 2)` inside a `<pre>`
- [ ] Version badge `○` marks auto-saved versions
- [ ] Version badge `●` marks manual versions
- [ ] Version labels fall back to `Auto-save` when `autoSaved` is true and no custom name exists
- [ ] Version labels fall back to `Manual save` when `autoSaved` is false and no custom name exists
- [ ] Editor export dialog default format is `docx`
- [ ] Editor export dialog defaults `doubleSpaced` to checked
- [ ] Editor export dialog defaults `includePageNumbers` to checked
- [ ] Editor export dialog format buttons are `DOCX` and `PDF`
- [ ] Editor export dialog primary button label changes from `Export` to `Exporting...` while work is in progress
- [ ] Editor export dialog DOCX filename strips non-alphanumeric and non-space characters before replacing spaces with underscores
- [ ] Editor export dialog PDF path uses `window.print()` rather than generating a PDF blob
- [ ] Export-dialog failures do not show an inline error message and only log `Export failed:` to the console
- [ ] Studio `/api/export/pdf` route returns a binary PDF attachment, even though the Studio page currently treats the response as HTML text
- [ ] Studio `/api/export/docx` route supports page-numbered DOCX output on the server, even though the Studio page exposes no page-number toggle
#### Studio Left Rail, Mode Controls, and Document Loading
- [ ] Studio reads `projectId` from the initial query string and converts it with `Number(...)`
- [ ] Studio initializes Learn mode only when the initial query string contains `mode=learn`
