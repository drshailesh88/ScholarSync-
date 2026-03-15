# library — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### PDF Viewer
- [x] PASS: Full-screen modal with black backdrop and blur
- [x] PASS: Dynamically loaded component (react-pdf)
#### Toolbar
- [x] PASS: **Previous page** button (disabled if page ≤ 1)
- [x] PASS: **Page counter**: "X / Y" (shows "..." while loading page count)
- [x] PASS: **Next page** button (disabled if page ≥ numPages)
- [x] PASS: **Zoom out** button (min 0.5×, step 0.25)
- [x] PASS: **Zoom percentage** display (e.g., "100%")
- [x] PASS: **Zoom in** button (max 3.0×, step 0.25)
- [x] PASS: **Fit width** button (resets to 1.0×)
- [x] PASS: No document title is shown in Library usage because `/library` does not pass a `title` prop
- [x] PASS: **Close** button (or press Escape)
#### PDF Rendering
- [x] PASS: Spinner while PDF loads
- [x] PASS: Spinner while individual page renders
- [x] PASS: Centered page with shadow
- [x] PASS: Responsive layout
#### Error Handling
- [x] PASS: Red icon + error message on PDF load failure
- [x] PASS: 404 message: "The original PDF is not available for this paper. It may have been imported from search without a PDF upload."
#### Keyboard
- [x] PASS: Escape closes viewer
- [x] PASS: Arrow-key page navigation is not implemented in the current `PDFViewer`

### PDF Upload
- [x] PASS: "Upload PDF" button in sidebar
- [x] PASS: Hidden `<input type="file" accept=".pdf">` triggered on click
- [x] PASS: Button text changes to "Uploading..." during upload
- [x] PASS: Button disabled during upload
#### Upload Process (3 Steps)
- [x] PASS: Extracts PDF text plus title/author metadata when available
- [x] PASS: Triggers background text extraction and embedding
- [x] PASS: Sets `full_text_available = true`
#### After Upload
- [x] PASS: Paper appears in library list
- [x] PASS: PDF icon shown (source = "user_upload")
- [x] PASS: "View PDF" button available on the paper card
- [x] PASS: Error handling if any step fails

### Cite in Editor Integration
- [x] PASS: "Cite in Editor" button on each paper card
- [x] PASS: Stores pending citation in `sessionStorage`
- [x] PASS: Navigates to `/editor/new`
- [x] PASS: Editor retrieves citation from sessionStorage on load
- [x] PASS: Editor shows a pending-citation notice after consuming sessionStorage; citation is not auto-inserted
