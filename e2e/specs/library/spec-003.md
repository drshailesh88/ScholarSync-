# library — Spec 003

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### PDF Viewer
- [ ] Full-screen modal with black backdrop and blur
- [ ] Dynamically loaded component (react-pdf)
#### Toolbar
- [ ] **Previous page** button (disabled if page ≤ 1)
- [ ] **Page counter**: "X / Y" (shows "..." while loading page count)
- [ ] **Next page** button (disabled if page ≥ numPages)
- [ ] **Zoom out** button (min 0.5×, step 0.25)
- [ ] **Zoom percentage** display (e.g., "100%")
- [ ] **Zoom in** button (max 3.0×, step 0.25)
- [ ] **Fit width** button (resets to 1.0×)
- [ ] No document title is shown in Library usage because `/library` does not pass a `title` prop
- [ ] **Close** button (or press Escape)
#### PDF Rendering
- [ ] Spinner while PDF loads
- [ ] Spinner while individual page renders
- [ ] Centered page with shadow
- [ ] Responsive layout
#### Error Handling
- [ ] Red icon + error message on PDF load failure
- [ ] 404 message: "The original PDF is not available for this paper. It may have been imported from search without a PDF upload."
#### Keyboard
- [ ] Escape closes viewer
- [ ] Arrow-key page navigation is not implemented in the current `PDFViewer`

### PDF Upload
- [ ] "Upload PDF" button in sidebar
- [ ] Hidden `<input type="file" accept=".pdf">` triggered on click
- [ ] Button text changes to "Uploading..." during upload
- [ ] Button disabled during upload
#### Upload Process (3 Steps)
- [ ] Extracts PDF text plus title/author metadata when available
- [ ] Triggers background text extraction and embedding
- [ ] Sets `full_text_available = true`
#### After Upload
- [ ] Paper appears in library list
- [ ] PDF icon shown (source = "user_upload")
- [ ] "View PDF" button available on the paper card
- [ ] Error handling if any step fails

### Cite in Editor Integration
- [ ] "Cite in Editor" button on each paper card
- [ ] Stores pending citation in `sessionStorage`
- [ ] Navigates to `/editor/new`
- [ ] Editor retrieves citation from sessionStorage on load
- [ ] Editor shows a pending-citation notice after consuming sessionStorage; citation is not auto-inserted
