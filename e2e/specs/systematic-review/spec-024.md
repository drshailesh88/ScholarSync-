# systematic-review — Spec 024

STATUS: PARTIAL
TESTED: 35/35
PASS: 0
FAIL: 35
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### GRADE Panel
- [ ] FAIL: Expanded-domain downgrade text switches to `(-N levels)` for larger downgrades
- [ ] FAIL: Export CSV route adds the attachment filename `grade-summary-{projectId}.csv`
#### Manuscript Panel
- [ ] FAIL: Manuscript panel initializes with all 5 section slots set to `null`
- [ ] FAIL: Active section defaults to `introduction` rather than `abstract`
- [ ] FAIL: Section order in the left rail is `Abstract`, `Introduction`, `Methods`, `Results`, and `Discussion`
- [ ] FAIL: Custom-instructions label is `Custom Instructions (optional)`
- [ ] FAIL: Custom-instructions placeholder is `e.g., Focus on clinical implications, use APA style, emphasize heterogeneity...`
- [ ] FAIL: `Generate All Sections` is disabled while any single-section generation is in progress
- [ ] FAIL: `Generate All Sections` is disabled while an all-sections run is already in progress
- [ ] FAIL: All-sections loading label is exactly `Generating all sections...`
- [ ] FAIL: `Export Markdown`, `Download DOCX`, and `Open in Studio` are hidden until at least one section has content
- [ ] FAIL: Markdown export filename is `manuscript-draft.md`
- [ ] FAIL: DOCX export filename is `manuscript-draft.docx`
- [ ] FAIL: DOCX export sends fixed title text `Systematic Review Manuscript Draft` to the API instead of using the project title
- [ ] FAIL: DOCX button label changes to `Exporting...` while the export request is in flight
- [ ] FAIL: Left-rail progress text format is `{generated} / 5 sections generated`
- [ ] FAIL: Section rows show an empty outlined circle before content exists
- [ ] FAIL: Section rows show a green success icon after content exists
- [ ] FAIL: Section rows show a spinner for only the section currently generating
- [ ] FAIL: Section action button label is `Generate` before the section has content
- [ ] FAIL: Section action button label becomes `Regenerate` after content exists
- [ ] FAIL: Section-level loading helper text says `This may take 15-30 seconds`
- [ ] FAIL: Empty-content placeholder headline is `No content generated yet`
- [ ] FAIL: Empty-content helper text says `Click "Generate" to create this section using your project data`
- [ ] FAIL: Copy button success state changes label text from `Copy` to `Copied`
- [ ] FAIL: Copy success state automatically clears after 2 seconds
- [ ] FAIL: Edit mode uses a monospaced textarea and local-only save behavior
- [ ] FAIL: Edit toolbar button label toggles between `Edit` and `Save`
- [ ] FAIL: `Save Changes` updates local section content in memory and does not persist back to the server
- [ ] FAIL: `Generate All Sections` runs in the hard-coded order `introduction`, `methods`, `results`, `discussion`, `abstract`
- [ ] FAIL: Abstract generation is the only section that passes `existingSections` context to the manuscript API
- [ ] FAIL: Footer note explicitly says `[PLACEHOLDER]` markers require manual input and instructs the user to continue editing in Studio for the full editor
#### Snowballing Panel
- [ ] FAIL: Snowballing panel defaults to `seeds` view on first render
- [ ] FAIL: Direction toggle defaults to `both`
- [ ] FAIL: Depth toggle defaults to `1`
