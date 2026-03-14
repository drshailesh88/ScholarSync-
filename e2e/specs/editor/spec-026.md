# editor — Spec 026

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Comment Sidebar Local Storage and Threading
- [x] PASS: Comment-sidebar empty state title is `No comments yet`
- [x] PASS: Comment-sidebar empty-state helper reads `Select text and click the comment button to start`
- [x] PASS: Inline pending comment input placeholder is `Add a comment...`
- [x] PASS: Bottom new-comment input placeholder is `Add a general comment about this document...`
- [x] PASS: Reply input placeholder is `Write a reply...`
- [x] PASS: Pending inline comment input submits on `Enter` only when `Shift` is not held
- [x] PASS: Pending inline comment `Add` button is disabled when the trimmed input is empty
- [x] PASS: Top-level quoted-text buttons call `scrollToComment(...)` to reselect the original editor range
- [x] PASS: Top-level actions include `Resolve` or `Unresolve`, `Reply`, and `Delete`
- [x] PASS: Reply bubbles do not render their own resolve or reply controls
- [x] PASS: Delete controls appear only when `comment.userId === "local-user"`
#### Version History and Export Dialog Details
- [x] PASS: Version-history loading state is spinner-only with no text label
- [x] PASS: Version-history empty-state text is `No versions yet`
- [x] PASS: Manual version save prompt text is `Version name (e.g., 'Before methods rewrite'):`
- [x] PASS: Cancelling the version-name prompt inserts no manual version
- [x] PASS: Restore confirm text is `Restore this version? Your current content will be saved as a version first.`
- [x] PASS: Restore flow auto-saves the current first section before writing the selected version snapshot back
- [x] PASS: Version-history preview modal title is `Version Preview`
- [x] PASS: Version-history preview renders `JSON.stringify(content, null, 2)` inside a `<pre>`
- [x] PASS: Version badge `○` marks auto-saved versions
- [x] PASS: Version badge `●` marks manual versions
- [x] PASS: Version labels fall back to `Auto-save` when `autoSaved` is true and no custom name exists
- [x] PASS: Version labels fall back to `Manual save` when `autoSaved` is false and no custom name exists
- [x] PASS: Editor export dialog default format is `docx`
- [x] PASS: Editor export dialog defaults `doubleSpaced` to checked
- [x] PASS: Editor export dialog defaults `includePageNumbers` to checked
- [x] PASS: Editor export dialog format buttons are `DOCX` and `PDF`
- [x] PASS: Editor export dialog primary button label changes from `Export` to `Exporting...` while work is in progress
- [x] PASS: Editor export dialog DOCX filename strips non-alphanumeric and non-space characters before replacing spaces with underscores
- [x] PASS: Editor export dialog PDF path uses `window.print()` rather than generating a PDF blob
- [x] PASS: Export-dialog failures do not show an inline error message and only log `Export failed:` to the console
- [x] PASS: Studio `/api/export/pdf` route returns a binary PDF attachment, even though the Studio page currently treats the response as HTML text
- [x] PASS: Studio `/api/export/docx` route supports page-numbered DOCX output on the server, even though the Studio page exposes no page-number toggle
#### Studio Left Rail, Mode Controls, and Document Loading
- [x] PASS: Studio reads `projectId` from the initial query string and converts it with `Number(...)`
- [x] PASS: Studio initializes Learn mode only when the initial query string contains `mode=learn`

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Fixed the bottom general-comment placeholder in `src/components/editor/CommentSidebar.tsx` to match the spec.
  - Source verification covered `src/components/editor/CommentSidebar.tsx`, `src/components/editor/VersionHistory.tsx`, `src/components/export/ExportDialog.tsx`, `src/lib/actions/documents.ts`, `src/app/api/export/pdf/route.ts`, `src/app/api/export/docx/route.ts`, and `src/app/(app)/studio/page.tsx`.
  - Focused tests passed in `src/components/editor/__tests__/CommentSidebar.test.tsx`, `src/components/editor/__tests__/VersionHistory.test.tsx`, `src/components/export/__tests__/ExportDialog.test.tsx`, `src/lib/editor/__tests__/studio-hardening.test.ts`, and `src/app/api/export/pdf/__tests__/route.test.ts`.
  - Live browser verification on `/studio` confirmed the updated general-comment placeholder in the real comment sidebar.
-->
