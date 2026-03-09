# Analysis — Feature Doc Gaps

**Original doc:** `ANALYSIS_FEATURES_TESTING.md`
**Original checkbox count:** 82
**Features found in UI:** 146
**Features found in source code:** 187
**Missing from doc:** 105
**Completeness of original doc:** 43.9%

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

### Detailed QA Coverage
- [ ] `sourceMode` defaults to `document` on first render and `docLoading` begins as `true`
- [ ] `listProjectsForAnalysis()` runs on mount and auto-selects the first returned project
- [ ] `getActiveDocumentForAnalysis(selectedProjectId)` reruns when the selected project changes
- [ ] Document fetch failures clear both `activeDoc` and `inputText`
- [ ] Back control is a `Link` to `/studio`, not a button with imperative routing
- [ ] Results mode replaces the toggle group with a three-item legend
- [ ] `Paste Text` has no icon in the current implementation while `From Document` includes `FileText`
- [ ] Switching from document mode to paste mode keeps the current `inputText` instead of clearing it
- [ ] Switching back to document mode refetches and can overwrite pasted text
- [ ] Project selector row renders only when document mode has at least one project
- [ ] Project dropdown uses `Select project` as a fallback trigger label
- [ ] Currently selected project rows use brand-highlighted styling inside the dropdown
- [ ] Clicking outside the project dropdown closes it via a document `mousedown` listener
- [ ] Document loading state replaces the textarea with `CircleNotch` plus `Loading document...`
- [ ] Empty-document state replaces the textarea with a `FileText` icon and guidance copy
- [ ] Document-mode textarea is `readOnly`; paste-mode textarea is editable
- [ ] Textarea uses `font-serif`, `resize-none`, and `focus:ring-brand/40`
- [ ] Word count is derived from `effectiveText.split(/\\s+/).filter(Boolean).length`
- [ ] Empty or whitespace-only text clears `clientIssues` and `clientMetrics`
- [ ] Inline errors render directly below the textarea in red text
- [ ] Forced short-text submission sets `Please enter at least 50 characters of text to analyze.`
- [ ] Non-OK API responses use `data.error || "Writing analysis failed"` for inline error text
- [ ] Network exceptions set `Failed to connect. Check your API key.`
- [ ] Analyze button stays disabled when trimmed text length is below 50
- [ ] Loading state changes button text to `Analyzing...` but keeps the `Sparkle` icon instead of swapping to a spinner
- [ ] Request body is serialized as `{ text: inputText, mode: "full" }`
- [ ] Paragraphs are precomputed with `/\\n\\n+/` before the fetch call
- [ ] Instant metrics panel is hidden until `clientMetrics` exists and trimmed text is non-empty
- [ ] Instant analysis is debounced by 500ms
- [ ] Instant gauge size is `110`; results gauge size is `120`
- [ ] Instant readability labels are `Easy`, `Standard`, `Difficult`, and `Very Difficult`
- [ ] Instant issues list caps at 10 rows before showing `+N more issues`
- [ ] Results summary cards stay above the tabs when `clientMetrics` exists
- [ ] `Analyze New Text` resets `result`, `paragraphs`, and `activeTab`
- [ ] Paragraphs without server analysis default to `100` human probability
- [ ] Flags render as `Flags: {comma-separated values}` only when flags exist
- [ ] Empty suggestions show `No issues detected. Your writing looks great!`
- [ ] Results write-good issue cards cap at 15 rows before `+N more issues`
- [ ] Results write-good issue cards display type plus reason, but no suggestion text
- [ ] Plagiarism cards render only severity, excerpt, and concern
- [ ] Detailed Metrics always renders `Readability`, `Writing Quality`, and `AI Detection`
- [ ] `Weasel Words`, `Adverbs`, and `Complex Sentences` metric bars render only when `clientMetrics` exists
- [ ] Paragraph Breakdown renders only when `result.paragraphAnalysis.length > 0`
- [ ] `MetricBar` widths are clamped to 100%
- [ ] Results gauge labels use `Excellent`, `Good`, `Needs Improvement`, and `Poor`, separate from instant gauge labels

## Features in doc that DON'T EXIST in the app
- Instant readability labels are not `Excellent`, `Good`, `Needs Improvement`, and `Poor` in the live panel; the current UI shows `Easy`, `Standard`, `Difficult`, and `Very Difficult`.
- Results-mode write-good cards do not render per-issue suggestion text; they currently show the issue type and reason only.
- Plagiarism indicator cards do not show separate source metadata in the UI; the live card renders severity, excerpt, and concern text.
- Project fetch failures do not currently display an explicit fallback-to-paste error message in the page UI.
- The generated checklist says loading swaps the Analyze button to a `CircleNotch` spinner icon, but the current button keeps the `Sparkle` icon and changes only the label text.
- The generated checklist says clicking `Paste Text` shows an empty textarea, but the current component preserves the existing `inputText` when switching modes.
