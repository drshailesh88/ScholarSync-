# editor — Spec 008

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Editor Header Inputs and Menus
- [x] Clicking the backdrop closes the document-type menu without changing the selected type
- [x] Document-type menu renders exactly four options in the current implementation
- [x] Document-type option labels are `Original Article`, `Case Report`, `Review Article`, and `Meta-Analysis`
- [x] The currently selected document-type option is styled with brand-colored text and medium font weight
- [x] Clicking a document-type option closes the dropdown immediately
- [x] Changing document type updates store state through `setDocumentType(type)`
- [x] The overflow `DotsThree` button is visible in the header
- [x] The overflow `DotsThree` button has no click handler or menu in the current page component
#### Editor Save, Notices, and Persistence Safety
- [x] Header save-status chip is always rendered on `/editor/[id]`, even before the first successful save
- [x] `saving` state shows a pulsing `CloudArrowUp` icon and the text `Saving...`
- [x] `saved` state shows a green `CheckCircle` icon and `Saved HH:MM`
- [x] `unsaved` state shows an amber `CloudArrowUp` icon and the text `Unsaved`
- [x] `error` state replaces the static label with a clickable `Retry save` button
- [x] `offline` state shows a red `WifiSlash` icon and the text `Offline`
- [x] `local` state shows a red `WifiSlash` icon and the text `Saved locally`
- [x] Error banner appears below the header only when the hook exposes a non-null `error`
- [x] Error banner text renders the raw hook error string without truncation logic
- [x] Error banner `Retry` button is shown only when `saveStatus === "error"`
- [x] Pending citation notice is initialized from `sessionStorage["scholarsync_pending_citation"]` on first client render
- [x] Pending citation notice removes the `scholarsync_pending_citation` sessionStorage key immediately after reading it
- [x] Pending citation notice uses the paper title when the stored JSON contains a non-empty `title`
- [x] Pending citation notice falls back to `Paper saved to your library. Open Citation Dialog to cite it.` when parsing fails or no title exists
- [x] Pending citation notice auto-dismisses after 5 seconds
- [x] Browser `beforeunload` protection is attached whenever editor save status is `unsaved` or `saving`
- [x] Browser `beforeunload` protection is removed again when the save status leaves `unsaved`/`saving`
- [x] Project references are cleared and reloaded whenever `dbDocumentId` or `projectId` changes
- [x] Failed project-reference preloads log `Failed to load project references:` to the console and do not show an inline UI error
#### AcademicEditor Shell and Top Bar Details
- [x] `AcademicEditor` mounts a fixed `TopBar` above the editor scroll region
- [x] Academic editor main content area uses `.academic-editor-wrapper` with a centered max width
- [x] Paragraph placeholder text is `Start writing, or type / for commands...`
- [x] Level-1 heading placeholder text is `Manuscript title...`
- [x] Level-2 through level-4 heading placeholder text is `Section heading...`
- [x] Academic editor supports only heading levels 1 through 4
- [x] Academic editor becomes non-editable when `mode === "viewing"` even if `readOnly` prop is false
- [x] `Cmd/Ctrl+S` prevents the browser save dialog and flushes the editor save callback immediately
