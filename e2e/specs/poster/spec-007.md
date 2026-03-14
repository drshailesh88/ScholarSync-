# poster — Spec 007

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Error Handling & Edge Cases
#### Detailed QA Coverage
- [ ] Completed step circles replace the step number with a `Check` icon
- [ ] Step 0 opens with `From Text` selected by default
- [ ] Step 0 renders the six `SourceSelector` cards in a responsive `2 / 3 / 6` column grid depending on viewport width
- [ ] Step 0 renders `From Deep Research` as a separate full-width card below the main source grid
- [ ] `Next` on Step 0 is disabled on first load because `rawText` is empty
- [ ] Step 0 `Next` uses disabled styling `bg-surface-raised text-ink-muted cursor-not-allowed` when requirements are not met
- [ ] Switching between source cards changes selection styling immediately without changing the current step
- [ ] Step 0 selection styling uses `border-brand bg-brand/5` for the active source card
- [ ] `From Papers` shows a `Paper IDs` text input with helper text `(comma-separated)`
- [ ] `Paper IDs` input accepts comma-separated values and filters out tokens that parse to `NaN`
- [ ] `Paper IDs` helper copy reads `Enter the IDs of papers from your library to generate slides from`
- [ ] `From Papers` enables `Next` only when at least one parsed numeric ID is present
- [ ] `From Document` shows a numeric `Document ID` input only while that source is selected
- [ ] Clearing the `Document ID` field stores `null` and disables `Next` again
- [ ] `From Document` helper copy reads `Enter the ID of a synthesis document to generate slides from`
- [ ] `From Text` shows a multiline `Content` textarea with placeholder `Paste your research content, abstract, or notes here...`
- [ ] `From Text` shows a live character count beneath the textarea
- [ ] `From Text` requires trimmed content length greater than 50 characters before `Next` becomes enabled
- [ ] Fifty trimmed characters keep `Next` disabled because the gate is strictly `> 50`
- [ ] Fifty-one trimmed characters enable `Next` when `From Text` is active
- [ ] `From Deep Research` shows a numeric `Deep Research session ID` input only while that source is selected
- [ ] `From Deep Research` enables `Next` only when a session ID is present
- [ ] `Import Deck` shows a single `Choose .pptx file` button rather than a drag-and-drop zone
- [ ] `Choose .pptx file` opens a hidden file input restricted to `.pptx` MIME/type values
- [ ] Uploading a non-`.pptx` file shows the inline error `Please upload a .pptx file`
- [ ] Uploading a password-protected deck shows the inline error `Password-protected files are not supported`
- [ ] Generic deck-parse failures show `Could not read this file. Is it a valid PowerPoint presentation?`
- [ ] While a deck is being parsed, the upload button swaps `UploadSimple` for a spinning `CircleNotch` and label `Parsing presentation...`
- [ ] Successful deck import copies `parsed.sourceText` into the wizard `rawText` state
- [ ] Successful deck import copies the imported deck title into `Poster Title` only when the title field is still blank
- [ ] Successful deck import shows imported title, slide count, source filename, and optional theme name in a summary card
- [ ] Imported deck preview lists at most the first six slide previews even when the deck contains more slides
- [ ] Imported deck preview shows `Showing 6 of N imported slide previews.` when additional slides exist
- [ ] Imported deck warnings show only the first warning plus `(+N more)` when multiple warnings are returned
- [ ] Clearing an imported deck removes both the parsed deck object and the copied `rawText`
