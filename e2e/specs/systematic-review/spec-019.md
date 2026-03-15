# systematic-review — Spec 019

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Unified Risk of Bias Panel
- [ ] Status cell shows `Pending` when no result exists for the assigned tool
- [ ] Dashboard-level error banner includes a `Dismiss` button rather than auto-clearing
- [ ] CSV export filename is `rob-summary-project-{projectId}.csv`
- [ ] CSV header row is `Paper ID,Title,Year,Detected Study Type,Assigned Tool,Assessment Status,Overall Judgment`
- [ ] Entering a specific tool panel replaces the dashboard with that tool component instead of opening a modal or drawer
- [ ] Tool sub-view back button label is exactly `Back to Unified Dashboard`
- [ ] Returning from a tool-specific sub-view refreshes all saved results before re-rendering the dashboard
- [ ] robvis summary section title is `Risk of Bias Summary (robvis-style)`
- [ ] robvis summary helper text says stacked bars are grouped by tool and overall judgment
- [ ] Percentage labels inside robvis bars only render for segments larger than roughly 12% of the bar
#### Data Extraction Panel
- [ ] Default extraction schema starts with 5 fields: `sample_size`, `intervention`, `primary_outcome`, `effect_size`, and `follow_up`
- [ ] Default `sample_size` description is `Total number of participants`
- [ ] Default `intervention` description is `Intervention used`
- [ ] Default `primary_outcome` description is `Primary outcome measured`
- [ ] Default `effect_size` description is `Main effect size reported`
- [ ] Default `follow_up` description is `Follow-up duration`
- [ ] Full-text extraction checkbox is checked by default on initial render
- [ ] Full-text extraction label is exactly `Use full-text PDF chunks`
- [ ] Schema column headers are `Field Name`, `Description / Prompt`, `Type`, and an unlabeled actions column
- [ ] Field-name placeholder is `field_name`
- [ ] Description placeholder is `What the AI should look for`
- [ ] Type selector options are `Text`, `Number`, `Boolean`, and `Category`
- [ ] `Add Field` appends a new blank text-type row instead of duplicating the previous row
- [ ] Remove-field button is hidden when only one schema row remains
- [ ] Schema validation error message is `All schema fields must have a name and description.`
- [ ] Included-papers section title is `Included Papers`
- [ ] Papers list refresh button uses tooltip text `Refresh papers`
- [ ] Extract-all button is hidden when the included-paper list is empty
- [ ] Extract-all button label uses the raw paper count in the form `Extract All (N)`
- [ ] Extract-all button is disabled when the schema is invalid
- [ ] Extract-all button is disabled while a batch extraction is already running
- [ ] Extract-all in-flight label is `Extracting ({done}/{total})` when batch progress is known
- [ ] Loading state copy for the paper list is exactly `Loading papers...`
- [ ] Empty papers state headline is `No included papers found.`
- [ ] Empty papers helper text says `Screen and include papers first, then return here to extract data.`
