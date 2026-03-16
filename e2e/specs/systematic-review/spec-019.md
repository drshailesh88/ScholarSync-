# systematic-review — Spec 019

STATUS: PARTIAL
TESTED: 35/35
PASS: 0
FAIL: 35
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Unified Risk of Bias Panel
- [ ] FAIL: Status cell shows `Pending` when no result exists for the assigned tool
- [ ] FAIL: Dashboard-level error banner includes a `Dismiss` button rather than auto-clearing
- [ ] FAIL: CSV export filename is `rob-summary-project-{projectId}.csv`
- [ ] FAIL: CSV header row is `Paper ID,Title,Year,Detected Study Type,Assigned Tool,Assessment Status,Overall Judgment`
- [ ] FAIL: Entering a specific tool panel replaces the dashboard with that tool component instead of opening a modal or drawer
- [ ] FAIL: Tool sub-view back button label is exactly `Back to Unified Dashboard`
- [ ] FAIL: Returning from a tool-specific sub-view refreshes all saved results before re-rendering the dashboard
- [ ] FAIL: robvis summary section title is `Risk of Bias Summary (robvis-style)`
- [ ] FAIL: robvis summary helper text says stacked bars are grouped by tool and overall judgment
- [ ] FAIL: Percentage labels inside robvis bars only render for segments larger than roughly 12% of the bar
#### Data Extraction Panel
- [ ] FAIL: Default extraction schema starts with 5 fields: `sample_size`, `intervention`, `primary_outcome`, `effect_size`, and `follow_up`
- [ ] FAIL: Default `sample_size` description is `Total number of participants`
- [ ] FAIL: Default `intervention` description is `Intervention used`
- [ ] FAIL: Default `primary_outcome` description is `Primary outcome measured`
- [ ] FAIL: Default `effect_size` description is `Main effect size reported`
- [ ] FAIL: Default `follow_up` description is `Follow-up duration`
- [ ] FAIL: Full-text extraction checkbox is checked by default on initial render
- [ ] FAIL: Full-text extraction label is exactly `Use full-text PDF chunks`
- [ ] FAIL: Schema column headers are `Field Name`, `Description / Prompt`, `Type`, and an unlabeled actions column
- [ ] FAIL: Field-name placeholder is `field_name`
- [ ] FAIL: Description placeholder is `What the AI should look for`
- [ ] FAIL: Type selector options are `Text`, `Number`, `Boolean`, and `Category`
- [ ] FAIL: `Add Field` appends a new blank text-type row instead of duplicating the previous row
- [ ] FAIL: Remove-field button is hidden when only one schema row remains
- [ ] FAIL: Schema validation error message is `All schema fields must have a name and description.`
- [ ] FAIL: Included-papers section title is `Included Papers`
- [ ] FAIL: Papers list refresh button uses tooltip text `Refresh papers`
- [ ] FAIL: Extract-all button is hidden when the included-paper list is empty
- [ ] FAIL: Extract-all button label uses the raw paper count in the form `Extract All (N)`
- [ ] FAIL: Extract-all button is disabled when the schema is invalid
- [ ] FAIL: Extract-all button is disabled while a batch extraction is already running
- [ ] FAIL: Extract-all in-flight label is `Extracting ({done}/{total})` when batch progress is known
- [ ] FAIL: Loading state copy for the paper list is exactly `Loading papers...`
- [ ] FAIL: Empty papers state headline is `No included papers found.`
- [ ] FAIL: Empty papers helper text says `Screen and include papers first, then return here to extract data.`
