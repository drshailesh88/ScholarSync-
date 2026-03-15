# library — Spec 007

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Citation loading state text reads `Formatting citations...`
- [x] PASS: Citation formatting request is one batched `getAllCitationFormats(...)` call, not one request per tab click
- [x] PASS: If citation formatting fails, the modal body shows `Failed to load citation formats`
- [x] PASS: Primary copy button is disabled while citation formats are still unavailable
- [x] PASS: Primary copy button label is `Copy Citation` for non-BibTeX tabs
- [x] PASS: Primary copy button label changes to `Copy BibTeX` on the `BibTeX` tab
- [x] PASS: Secondary `Copy In-Text` button is hidden entirely on the `BibTeX` tab
- [x] PASS: Clicking the primary copy button writes the current full citation to the clipboard
- [x] PASS: Clicking `Copy In-Text` writes the active style's `inText` citation to the clipboard
- [x] PASS: After copying a full citation, the primary button label changes to `Copied!` for 2 seconds
- [x] PASS: After copying an in-text citation, the secondary button label changes to `Copied!` for 2 seconds
- [x] PASS: Closing and reopening the modal returns it to the `APA 7` tab instead of preserving the prior tab
- [x] PASS: Clicking `Cite in Editor` stores `scholarsync_pending_citation` in `sessionStorage`
- [x] PASS: Stored `scholarsync_pending_citation` payload contains only `paperId` and `title`
- [x] PASS: Clicking `Cite in Editor` routes to `/editor/new`
- [x] PASS: Library page does not itself verify citation insertion; editor-side consumption must be tested separately
- [x] PASS: If the file chooser is cancelled and no file is selected, the upload handler returns early and the button stays in the `Upload PDF` state
- [x] PASS: While upload is in progress, the sidebar button label changes from `Upload PDF` to `Uploading...`
- [x] PASS: While upload is in progress, the upload button is disabled and uses reduced-opacity styling
- [x] PASS: Upload step 1 posts the raw file to `/api/extract-pdf`
- [x] PASS: If extracted metadata has no title, saved paper title falls back to the selected filename without the `.pdf` extension
- [x] PASS: If extracted metadata has no author, saved paper uses an empty `authors` array
- [x] PASS: Upload step 2 dynamically imports `savePaper` from `@/lib/actions/papers`
- [x] PASS: Upload step 2 saves the new record with `source: "user_upload"`
- [x] PASS: Upload step 3 posts the raw file to `/api/papers/{paperId}/pdf`
- [x] PASS: If the storage-upload request returns a non-OK response, code logs `PDF upload to storage failed` but still refreshes the list and metadata
- [x] PASS: Successful or failed uploads always clear the hidden file input value in `finally`, allowing the same filename to be selected again
- [x] PASS: Upload flow does not show a progress bar, toast, inline success message, or inline error message in the current UI
- [x] PASS: Upload failures are logged to the console as `PDF upload failed:`
- [x] PASS: Clicking `View PDF` sets `viewingPaperId` and mounts `PDFViewer` with URL `/api/papers/{id}/pdf`
- [x] PASS: Library usage of `PDFViewer` does not pass a `title` prop, so the toolbar title slot is absent even when the paper has a title
- [x] PASS: PDF overlay renders with `role="dialog"` and `aria-modal="true"`
- [x] PASS: Previous-page button is disabled on the first page
- [x] PASS: Page counter shows `...` until the document finishes loading and page count is known
- [x] PASS: Zoom percentage starts at `100%`
