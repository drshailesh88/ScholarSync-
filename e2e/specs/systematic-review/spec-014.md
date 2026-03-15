# systematic-review — Spec 014

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Paper Import Panel — Detailed Behavior
- [ ] When no generated strategy exists, the main query placeholder tells the user to generate one in the Search Strategy tab first
- [ ] Database source buttons are multi-select toggles rather than radio buttons
- [ ] Import button is disabled when no query string is available
- [ ] Import button is disabled when no sources are selected
- [ ] Import button label changes from `Import Papers` to `Importing...`
- [ ] Successful import result card shows imported count, total found count, and duplicate count when duplicates were skipped
- [ ] Import failure shows `Failed to import papers. Please try again.`
- [ ] PDF upload drop zone changes border/background styling while upload is active
- [ ] Upload drop zone copy reads `Drag & drop PDF files here, or browse`
- [ ] Hidden browse input accepts `.pdf`
- [ ] Non-PDF files in the selected/dropped list are skipped silently by the upload handler
- [ ] Upload progress copy is exactly `Uploading...`
- [ ] Upload helper text says PDFs are processed for full-text extraction and embedding
- [ ] Project Papers panel only renders when `papers.length > 0`
- [ ] Project Papers header includes a `Refresh` text button
- [ ] `Refresh` label changes to `Refreshing...` while project papers reload
- [ ] Clicking a paper title toggles its expanded metadata/abstract view
- [ ] PDF badge renders only when `pdfStoragePath` exists
- [ ] Screening-decision badge renders only when `screeningDecision` exists
- [ ] Expanded paper view shows DOI link only when DOI exists
- [ ] Expanded paper view shows PubMed link only when PMID exists
- [ ] Expanded paper view shows `studyType` badge only when available
- [ ] Expanded paper view shows `Level {evidenceLevel}` badge only when evidence level is available
#### Screening Panel — Criteria, Queue, Modes, and Shortcuts
- [ ] Screening filter default is `unscreened`
- [ ] Screening view mode default is `queue`
- [ ] Blinded mode default is `false`
- [ ] Criteria reset to a single empty inclusion row when the project has no saved criteria
- [ ] Criteria also reset to a single empty inclusion row if criteria fetch fails, preventing cross-project leakage
- [ ] Criteria section heading is `Screening Criteria`
- [ ] Criteria help text states that three independent AI agents use majority consensus voting
- [ ] Criterion type dropdown options are exactly `Inclusion` and `Exclusion`
- [ ] Criterion description placeholder is `e.g., Randomized controlled trials only`
- [ ] Remove-criterion button is hidden when only one criterion row remains
- [ ] `Add Criterion` appends a new inclusion row
- [ ] `Save Criteria` button label changes to `Saving...` while criteria POST is in flight
