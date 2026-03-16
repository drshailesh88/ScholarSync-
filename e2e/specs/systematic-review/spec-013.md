# systematic-review — Spec 013

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Workflow Tabs and Presence — Actual Current Behavior
- [x] PASS: Collaborator tooltip prefixes tab text with `Viewing:`
- [x] PASS: Collaborator tooltip shows `Paper #{currentPaperId}` when current-paper presence is set
- [x] PASS: Presence count badge displays `collaborators.length + 1`, including the current user
- [x] PASS: Offline compact state shows `Offline` only when status is disconnected and there are no collaborators
- [x] PASS: Presence widget still shows a WiFiHigh icon with amber text when not fully connected but collaborators exist
- [x] PASS: `CollaboratorPresence` tab label map does not include a friendly label for `nma`, so unknown tab keys fall back to the raw key text
#### Search Strategy Panel — Detailed Defaults and Results
- [x] PASS: Search Strategy panel heading is `PICO Framework`
- [x] PASS: Search panel copy states the AI generates a PubMed search strategy with MeSH terms and Boolean operators
- [x] PASS: Population field is required and marked with a red asterisk
- [x] PASS: Intervention field is required and marked with a red asterisk
- [x] PASS: Comparison field is optional and has no red asterisk
- [x] PASS: Outcome field is required and marked with a red asterisk
- [x] PASS: Population placeholder is `e.g., Adults with type 2 diabetes`
- [x] PASS: Intervention placeholder is `e.g., Metformin monotherapy`
- [x] PASS: Comparison placeholder is `e.g., Sulfonylurea monotherapy`
- [x] PASS: Outcome placeholder is `e.g., HbA1c reduction at 12 months`
- [x] PASS: Generate Search Strategy button is disabled until population, intervention, and outcome are all non-empty
- [x] PASS: Generate Search Strategy button clears the previous generated strategy before starting a new request
- [x] PASS: Search-strategy generation failure shows `Failed to generate search strategy. Please try again.`
- [x] PASS: Search-strategy panel does not maintain its own in-flight generation flag; the button spinner logic is tied to initial review-config loading state instead
- [x] PASS: Generated-strategy heading is `Generated Search Strategy`
- [x] PASS: Estimated PubMed results banner only renders when `estimatedResults` is defined
- [x] PASS: Estimated PubMed results are formatted with `toLocaleString()`
- [x] PASS: Each PICO block shows its `picoElement` label in title case/capitalized style
- [x] PASS: MeSH terms render with `[MeSH]` suffix chips
- [x] PASS: Full search string appears in a `pre` block under `Complete PubMed Search String`
- [x] PASS: Copy button copies only `strategy.fullSearchString`
- [x] PASS: Suggested Filters section only renders when the array is non-empty
- [x] PASS: CTA button label is `Import Papers Using This Strategy`
- [x] PASS: CTA button switches the shared workflow store active tab to `import`
#### Paper Import Panel — Detailed Behavior
- [x] PASS: Selected import sources default to `["pubmed"]`
- [x] PASS: Max results default is `100`
- [x] PASS: Generated-strategy query banner reads `Using generated PICO search strategy`
- [x] PASS: Generated-strategy banner displays `?` when estimated-result count is unavailable
- [x] PASS: When a generated strategy exists, the visible input is an override field with placeholder `Or override with custom search string...`
