# systematic-review — Spec 014

STATUS: PARTIAL
TESTED: 35/35
PASS: 7
FAIL: 28
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Paper Import Panel — Detailed Behavior
- [ ] FAIL: When no generated strategy exists, the main query placeholder tells the user to generate one in the Search Strategy tab first
- [x] PASS: Database source buttons are multi-select toggles rather than radio buttons
- [ ] FAIL: Import button is disabled when no query string is available
- [ ] FAIL: Import button is disabled when no sources are selected
- [x] PASS: Import button label changes from `Import Papers` to `Importing...`
- [ ] FAIL: Successful import result card shows imported count, total found count, and duplicate count when duplicates were skipped
- [x] PASS: Import failure shows `Failed to import papers. Please try again.`
- [ ] FAIL: PDF upload drop zone changes border/background styling while upload is active
- [ ] FAIL: Upload drop zone copy reads `Drag & drop PDF files here, or browse`
- [ ] FAIL: Hidden browse input accepts `.pdf`
- [ ] FAIL: Non-PDF files in the selected/dropped list are skipped silently by the upload handler
- [x] PASS: Upload progress copy is exactly `Uploading...`
- [ ] FAIL: Upload helper text says PDFs are processed for full-text extraction and embedding
- [ ] FAIL: Project Papers panel only renders when `papers.length > 0`
- [ ] FAIL: Project Papers header includes a `Refresh` text button
- [x] PASS: `Refresh` label changes to `Refreshing...` while project papers reload
- [ ] FAIL: Clicking a paper title toggles its expanded metadata/abstract view
- [x] PASS: PDF badge renders only when `pdfStoragePath` exists
- [x] PASS: Screening-decision badge renders only when `screeningDecision` exists
- [ ] FAIL: Expanded paper view shows DOI link only when DOI exists
- [ ] FAIL: Expanded paper view shows PubMed link only when PMID exists
- [ ] FAIL: Expanded paper view shows `studyType` badge only when available
- [ ] FAIL: Expanded paper view shows `Level {evidenceLevel}` badge only when evidence level is available
#### Screening Panel — Criteria, Queue, Modes, and Shortcuts
- [ ] FAIL: Screening filter default is `unscreened`
- [ ] FAIL: Screening view mode default is `queue`
- [ ] FAIL: Blinded mode default is `false`
- [ ] FAIL: Criteria reset to a single empty inclusion row when the project has no saved criteria
- [ ] FAIL: Criteria also reset to a single empty inclusion row if criteria fetch fails, preventing cross-project leakage
- [ ] FAIL: Criteria section heading is `Screening Criteria`
- [ ] FAIL: Criteria help text states that three independent AI agents use majority consensus voting
- [ ] FAIL: Criterion type dropdown options are exactly `Inclusion` and `Exclusion`
- [ ] FAIL: Criterion description placeholder is `e.g., Randomized controlled trials only`
- [ ] FAIL: Remove-criterion button is hidden when only one criterion row remains
- [ ] FAIL: `Add Criterion` appends a new inclusion row
- [ ] FAIL: `Save Criteria` button label changes to `Saving...` while criteria POST is in flight
