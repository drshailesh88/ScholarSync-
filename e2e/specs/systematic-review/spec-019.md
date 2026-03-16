# systematic-review — Spec 019

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Unified Risk of Bias Panel
- [x] PASS: Status cell shows `Pending` when no result exists for the assigned tool
- [x] PASS: Dashboard-level error banner includes a `Dismiss` button rather than auto-clearing
- [x] PASS: CSV export filename is `rob-summary-project-{projectId}.csv`
- [x] PASS: CSV header row is `Paper ID,Title,Year,Detected Study Type,Assigned Tool,Assessment Status,Overall Judgment`
- [x] PASS: Entering a specific tool panel replaces the dashboard with that tool component instead of opening a modal or drawer
- [x] PASS: Tool sub-view back button label is exactly `Back to Unified Dashboard`
- [x] PASS: Returning from a tool-specific sub-view refreshes all saved results before re-rendering the dashboard
- [x] PASS: robvis summary section title is `Risk of Bias Summary (robvis-style)`
- [x] PASS: robvis summary helper text says stacked bars are grouped by tool and overall judgment
- [x] PASS: Percentage labels inside robvis bars only render for segments larger than roughly 12% of the bar
#### Data Extraction Panel
- [x] PASS: Default extraction schema starts with 5 fields: `sample_size`, `intervention`, `primary_outcome`, `effect_size`, and `follow_up`
- [x] PASS: Default `sample_size` description is `Total number of participants`
- [x] PASS: Default `intervention` description is `Intervention used`
- [x] PASS: Default `primary_outcome` description is `Primary outcome measured`
- [x] PASS: Default `effect_size` description is `Main effect size reported`
- [x] PASS: Default `follow_up` description is `Follow-up duration`
- [x] PASS: Full-text extraction checkbox is checked by default on initial render
- [x] PASS: Full-text extraction label is exactly `Use full-text PDF chunks`
- [x] PASS: Schema column headers are `Field Name`, `Description / Prompt`, `Type`, and an unlabeled actions column
- [x] PASS: Field-name placeholder is `field_name`
- [x] PASS: Description placeholder is `What the AI should look for`
- [x] PASS: Type selector options are `Text`, `Number`, `Boolean`, and `Category`
- [x] PASS: `Add Field` appends a new blank text-type row instead of duplicating the previous row
- [x] PASS: Remove-field button is hidden when only one schema row remains
- [x] PASS: Schema validation error message is `All schema fields must have a name and description.`
- [x] PASS: Included-papers section title is `Included Papers`
- [x] PASS: Papers list refresh button uses tooltip text `Refresh papers`
- [x] PASS: Extract-all button is hidden when the included-paper list is empty
- [x] PASS: Extract-all button label uses the raw paper count in the form `Extract All (N)`
- [x] PASS: Extract-all button is disabled when the schema is invalid
- [x] PASS: Extract-all button is disabled while a batch extraction is already running
- [x] PASS: Extract-all in-flight label is `Extracting ({done}/{total})` when batch progress is known
- [x] PASS: Loading state copy for the paper list is exactly `Loading papers...`
- [x] PASS: Empty papers state headline is `No included papers found.`
- [x] PASS: Empty papers helper text says `Screen and include papers first, then return here to extract data.`
