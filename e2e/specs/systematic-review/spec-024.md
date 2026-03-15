# systematic-review — Spec 024

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### GRADE Panel
- [ ] Expanded-domain downgrade text switches to `(-N levels)` for larger downgrades
- [ ] Export CSV route adds the attachment filename `grade-summary-{projectId}.csv`
#### Manuscript Panel
- [ ] Manuscript panel initializes with all 5 section slots set to `null`
- [ ] Active section defaults to `introduction` rather than `abstract`
- [ ] Section order in the left rail is `Abstract`, `Introduction`, `Methods`, `Results`, and `Discussion`
- [ ] Custom-instructions label is `Custom Instructions (optional)`
- [ ] Custom-instructions placeholder is `e.g., Focus on clinical implications, use APA style, emphasize heterogeneity...`
- [ ] `Generate All Sections` is disabled while any single-section generation is in progress
- [ ] `Generate All Sections` is disabled while an all-sections run is already in progress
- [ ] All-sections loading label is exactly `Generating all sections...`
- [ ] `Export Markdown`, `Download DOCX`, and `Open in Studio` are hidden until at least one section has content
- [ ] Markdown export filename is `manuscript-draft.md`
- [ ] DOCX export filename is `manuscript-draft.docx`
- [ ] DOCX export sends fixed title text `Systematic Review Manuscript Draft` to the API instead of using the project title
- [ ] DOCX button label changes to `Exporting...` while the export request is in flight
- [ ] Left-rail progress text format is `{generated} / 5 sections generated`
- [ ] Section rows show an empty outlined circle before content exists
- [ ] Section rows show a green success icon after content exists
- [ ] Section rows show a spinner for only the section currently generating
- [ ] Section action button label is `Generate` before the section has content
- [ ] Section action button label becomes `Regenerate` after content exists
- [ ] Section-level loading helper text says `This may take 15-30 seconds`
- [ ] Empty-content placeholder headline is `No content generated yet`
- [ ] Empty-content helper text says `Click "Generate" to create this section using your project data`
- [ ] Copy button success state changes label text from `Copy` to `Copied`
- [ ] Copy success state automatically clears after 2 seconds
- [ ] Edit mode uses a monospaced textarea and local-only save behavior
- [ ] Edit toolbar button label toggles between `Edit` and `Save`
- [ ] `Save Changes` updates local section content in memory and does not persist back to the server
- [ ] `Generate All Sections` runs in the hard-coded order `introduction`, `methods`, `results`, `discussion`, `abstract`
- [ ] Abstract generation is the only section that passes `existingSections` context to the manuscript API
- [ ] Footer note explicitly says `[PLACEHOLDER]` markers require manual input and instructs the user to continue editing in Studio for the full editor
#### Snowballing Panel
- [ ] Snowballing panel defaults to `seeds` view on first render
- [ ] Direction toggle defaults to `both`
- [ ] Depth toggle defaults to `1`
