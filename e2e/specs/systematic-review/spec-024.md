# systematic-review — Spec 024

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### GRADE Panel
- [x] PASS: Expanded-domain downgrade text switches to `(-N levels)` for larger downgrades
- [x] PASS: Export CSV route adds the attachment filename `grade-summary-{projectId}.csv`
#### Manuscript Panel
- [x] PASS: Manuscript panel initializes with all 5 section slots set to `null`
- [x] PASS: Active section defaults to `introduction` rather than `abstract`
- [x] PASS: Section order in the left rail is `Abstract`, `Introduction`, `Methods`, `Results`, and `Discussion`
- [x] PASS: Custom-instructions label is `Custom Instructions (optional)`
- [x] PASS: Custom-instructions placeholder is `e.g., Focus on clinical implications, use APA style, emphasize heterogeneity...`
- [x] PASS: `Generate All Sections` is disabled while any single-section generation is in progress
- [x] PASS: `Generate All Sections` is disabled while an all-sections run is already in progress
- [x] PASS: All-sections loading label is exactly `Generating all sections...`
- [x] PASS: `Export Markdown`, `Download DOCX`, and `Open in Studio` are hidden until at least one section has content
- [x] PASS: Markdown export filename is `manuscript-draft.md`
- [x] PASS: DOCX export filename is `manuscript-draft.docx`
- [x] PASS: DOCX export sends fixed title text `Systematic Review Manuscript Draft` to the API instead of using the project title
- [x] PASS: DOCX button label changes to `Exporting...` while the export request is in flight
- [x] PASS: Left-rail progress text format is `{generated} / 5 sections generated`
- [x] PASS: Section rows show an empty outlined circle before content exists
- [x] PASS: Section rows show a green success icon after content exists
- [x] PASS: Section rows show a spinner for only the section currently generating
- [x] PASS: Section action button label is `Generate` before the section has content
- [x] PASS: Section action button label becomes `Regenerate` after content exists
- [x] PASS: Section-level loading helper text says `This may take 15-30 seconds`
- [x] PASS: Empty-content placeholder headline is `No content generated yet`
- [x] PASS: Empty-content helper text says `Click "Generate" to create this section using your project data`
- [x] PASS: Copy button success state changes label text from `Copy` to `Copied`
- [x] PASS: Copy success state automatically clears after 2 seconds
- [x] PASS: Edit mode uses a monospaced textarea and local-only save behavior
- [x] PASS: Edit toolbar button label toggles between `Edit` and `Save`
- [x] PASS: `Save Changes` updates local section content in memory and does not persist back to the server
- [x] PASS: `Generate All Sections` runs in the hard-coded order `introduction`, `methods`, `results`, `discussion`, `abstract`
- [x] PASS: Abstract generation is the only section that passes `existingSections` context to the manuscript API
- [x] PASS: Footer note explicitly says `[PLACEHOLDER]` markers require manual input and instructs the user to continue editing in Studio for the full editor
#### Snowballing Panel
- [x] PASS: Snowballing panel defaults to `seeds` view on first render
- [x] PASS: Direction toggle defaults to `both`
- [x] PASS: Depth toggle defaults to `1`
