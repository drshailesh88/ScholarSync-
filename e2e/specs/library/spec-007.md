# library — Spec 007

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Citation loading state text reads `Formatting citations...`
- [ ] Citation formatting request is one batched `getAllCitationFormats(...)` call, not one request per tab click
- [ ] If citation formatting fails, the modal body shows `Failed to load citation formats`
- [ ] Primary copy button is disabled while citation formats are still unavailable
- [ ] Primary copy button label is `Copy Citation` for non-BibTeX tabs
- [ ] Primary copy button label changes to `Copy BibTeX` on the `BibTeX` tab
- [ ] Secondary `Copy In-Text` button is hidden entirely on the `BibTeX` tab
- [ ] Clicking the primary copy button writes the current full citation to the clipboard
- [ ] Clicking `Copy In-Text` writes the active style's `inText` citation to the clipboard
- [ ] After copying a full citation, the primary button label changes to `Copied!` for 2 seconds
- [ ] After copying an in-text citation, the secondary button label changes to `Copied!` for 2 seconds
- [ ] Closing and reopening the modal returns it to the `APA 7` tab instead of preserving the prior tab
- [ ] Clicking `Cite in Editor` stores `scholarsync_pending_citation` in `sessionStorage`
- [ ] Stored `scholarsync_pending_citation` payload contains only `paperId` and `title`
- [ ] Clicking `Cite in Editor` routes to `/editor/new`
- [ ] Library page does not itself verify citation insertion; editor-side consumption must be tested separately
- [ ] If the file chooser is cancelled and no file is selected, the upload handler returns early and the button stays in the `Upload PDF` state
- [ ] While upload is in progress, the sidebar button label changes from `Upload PDF` to `Uploading...`
- [ ] While upload is in progress, the upload button is disabled and uses reduced-opacity styling
- [ ] Upload step 1 posts the raw file to `/api/extract-pdf`
- [ ] If extracted metadata has no title, saved paper title falls back to the selected filename without the `.pdf` extension
- [ ] If extracted metadata has no author, saved paper uses an empty `authors` array
- [ ] Upload step 2 dynamically imports `savePaper` from `@/lib/actions/papers`
- [ ] Upload step 2 saves the new record with `source: "user_upload"`
- [ ] Upload step 3 posts the raw file to `/api/papers/{paperId}/pdf`
- [ ] If the storage-upload request returns a non-OK response, code logs `PDF upload to storage failed` but still refreshes the list and metadata
- [ ] Successful or failed uploads always clear the hidden file input value in `finally`, allowing the same filename to be selected again
- [ ] Upload flow does not show a progress bar, toast, inline success message, or inline error message in the current UI
- [ ] Upload failures are logged to the console as `PDF upload failed:`
- [ ] Clicking `View PDF` sets `viewingPaperId` and mounts `PDFViewer` with URL `/api/papers/{id}/pdf`
- [ ] Library usage of `PDFViewer` does not pass a `title` prop, so the toolbar title slot is absent even when the paper has a title
- [ ] PDF overlay renders with `role="dialog"` and `aria-modal="true"`
- [ ] Previous-page button is disabled on the first page
- [ ] Page counter shows `...` until the document finishes loading and page count is known
- [ ] Zoom percentage starts at `100%`
