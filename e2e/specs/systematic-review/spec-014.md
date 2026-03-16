# systematic-review — Spec 014

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Paper Import Panel — Detailed Behavior
- [x] PASS: When no generated strategy exists, the main query placeholder tells the user to generate one in the Search Strategy tab first
- [x] PASS: Database source buttons are multi-select toggles rather than radio buttons
- [x] PASS: Import button is disabled when no query string is available
- [x] PASS: Import button is disabled when no sources are selected
- [x] PASS: Import button label changes from `Import Papers` to `Importing...`
- [x] PASS: Successful import result card shows imported count, total found count, and duplicate count when duplicates were skipped
- [x] PASS: Import failure shows `Failed to import papers. Please try again.`
- [x] PASS: PDF upload drop zone changes border/background styling while upload is active
- [x] PASS: Upload drop zone copy reads `Drag & drop PDF files here, or browse`
- [x] PASS: Hidden browse input accepts `.pdf`
- [x] PASS: Non-PDF files in the selected/dropped list are skipped silently by the upload handler
- [x] PASS: Upload progress copy is exactly `Uploading...`
- [x] PASS: Upload helper text says PDFs are processed for full-text extraction and embedding
- [x] PASS: Project Papers panel only renders when `papers.length > 0`
- [x] PASS: Project Papers header includes a `Refresh` text button
- [x] PASS: `Refresh` label changes to `Refreshing...` while project papers reload
- [x] PASS: Clicking a paper title toggles its expanded metadata/abstract view
- [x] PASS: PDF badge renders only when `pdfStoragePath` exists
- [x] PASS: Screening-decision badge renders only when `screeningDecision` exists
- [x] PASS: Expanded paper view shows DOI link only when DOI exists
- [x] PASS: Expanded paper view shows PubMed link only when PMID exists
- [x] PASS: Expanded paper view shows `studyType` badge only when available
- [x] PASS: Expanded paper view shows `Level {evidenceLevel}` badge only when evidence level is available
#### Screening Panel — Criteria, Queue, Modes, and Shortcuts
- [x] PASS: Screening filter default is `unscreened`
- [x] PASS: Screening view mode default is `queue`
- [x] PASS: Blinded mode default is `false`
- [x] PASS: Criteria reset to a single empty inclusion row when the project has no saved criteria
- [x] PASS: Criteria also reset to a single empty inclusion row if criteria fetch fails, preventing cross-project leakage
- [x] PASS: Criteria section heading is `Screening Criteria`
- [x] PASS: Criteria help text states that three independent AI agents use majority consensus voting
- [x] PASS: Criterion type dropdown options are exactly `Inclusion` and `Exclusion`
- [x] PASS: Criterion description placeholder is `e.g., Randomized controlled trials only`
- [x] PASS: Remove-criterion button is hidden when only one criterion row remains
- [x] PASS: `Add Criterion` appends a new inclusion row
- [x] PASS: `Save Criteria` button label changes to `Saving...` while criteria POST is in flight
