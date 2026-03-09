# Analysis — Feature Doc Gaps

**Original doc:** `ANALYSIS_FEATURES_TESTING.md`
**Original checkbox count:** 82
**Features found in UI:** 94
**Features found in source code:** 99
**Missing from doc:** 17
**Completeness of original doc:** 82.8%

## Missing Features

### Document Workflow
- [ ] First available project is auto-selected on initial page load in document mode
- [ ] Active document title is shown inline beside the project selector after a document loads
- [ ] Document-mode textarea is read-only while showing the loaded project document text
- [ ] Clicking outside the project dropdown closes the project menu
- [ ] Empty document state shows a FileText illustration with guidance to write in Studio first or switch to paste mode

### Validation and Inline Errors
- [ ] Manual submission with fewer than 50 characters shows the inline message "Please enter at least 50 characters of text to analyze."
- [ ] API validation failures surface the returned inline error text under the textarea (for example, "Invalid request")
- [ ] Network failures surface the inline message "Failed to connect. Check your API key."

### Instant Metrics Panel
- [ ] Instant writing analysis appears after a 500ms debounce once text is present
- [ ] Instant readability badge uses the local analysis labels from the live UI (`Easy`, `Standard`, `Difficult`, `Very Difficult`)
- [ ] Client issue summaries show a `+N more issues` footer when more than 10 issues are detected

### Results Mode
- [ ] Results mode keeps the word, sentence, and paragraph summary cards above the right-side tabs
- [ ] "Analyze New Text" resets the result view, clears stored paragraphs, and returns the right-side panel to the Issues tab
- [ ] Issues tab shows a positive empty state message when no AI suggestions are returned: "No issues detected. Your writing looks great!"
- [ ] Local issue cards in results mode are grouped under a dedicated "Writing Issues (write-good)" section beneath AI suggestions
- [ ] Results-mode write-good issues show a `+N more issues` footer when more than 15 issues are available
- [ ] Paragraph Breakdown in Detailed Metrics renders only when paragraph-level AI analysis entries are returned

## Features in doc that DON'T EXIST in the app
- Instant readability labels are not `Excellent`, `Good`, `Needs Improvement`, and `Poor` in the live panel; the current UI shows `Easy`, `Standard`, `Difficult`, and `Very Difficult`.
- Results-mode write-good cards do not render per-issue suggestion text; they currently show the issue type and reason only.
- Plagiarism indicator cards do not show separate source metadata in the UI; the live card renders severity, excerpt, and concern text.
- Project fetch failures do not currently display an explicit fallback-to-paste error message in the page UI.
