# systematic-review — Spec 013

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Workflow Tabs and Presence — Actual Current Behavior
- [ ] Collaborator tooltip prefixes tab text with `Viewing:`
- [ ] Collaborator tooltip shows `Paper #{currentPaperId}` when current-paper presence is set
- [ ] Presence count badge displays `collaborators.length + 1`, including the current user
- [ ] Offline compact state shows `Offline` only when status is disconnected and there are no collaborators
- [ ] Presence widget still shows a WiFiHigh icon with amber text when not fully connected but collaborators exist
- [ ] `CollaboratorPresence` tab label map does not include a friendly label for `nma`, so unknown tab keys fall back to the raw key text
#### Search Strategy Panel — Detailed Defaults and Results
- [ ] Search Strategy panel heading is `PICO Framework`
- [ ] Search panel copy states the AI generates a PubMed search strategy with MeSH terms and Boolean operators
- [ ] Population field is required and marked with a red asterisk
- [ ] Intervention field is required and marked with a red asterisk
- [ ] Comparison field is optional and has no red asterisk
- [ ] Outcome field is required and marked with a red asterisk
- [ ] Population placeholder is `e.g., Adults with type 2 diabetes`
- [ ] Intervention placeholder is `e.g., Metformin monotherapy`
- [ ] Comparison placeholder is `e.g., Sulfonylurea monotherapy`
- [ ] Outcome placeholder is `e.g., HbA1c reduction at 12 months`
- [ ] Generate Search Strategy button is disabled until population, intervention, and outcome are all non-empty
- [ ] Generate Search Strategy button clears the previous generated strategy before starting a new request
- [ ] Search-strategy generation failure shows `Failed to generate search strategy. Please try again.`
- [ ] Search-strategy panel does not maintain its own in-flight generation flag; the button spinner logic is tied to initial review-config loading state instead
- [ ] Generated-strategy heading is `Generated Search Strategy`
- [ ] Estimated PubMed results banner only renders when `estimatedResults` is defined
- [ ] Estimated PubMed results are formatted with `toLocaleString()`
- [ ] Each PICO block shows its `picoElement` label in title case/capitalized style
- [ ] MeSH terms render with `[MeSH]` suffix chips
- [ ] Full search string appears in a `pre` block under `Complete PubMed Search String`
- [ ] Copy button copies only `strategy.fullSearchString`
- [ ] Suggested Filters section only renders when the array is non-empty
- [ ] CTA button label is `Import Papers Using This Strategy`
- [ ] CTA button switches the shared workflow store active tab to `import`
#### Paper Import Panel — Detailed Behavior
- [ ] Selected import sources default to `["pubmed"]`
- [ ] Max results default is `100`
- [ ] Generated-strategy query banner reads `Using generated PICO search strategy`
- [ ] Generated-strategy banner displays `?` when estimated-result count is unavailable
- [ ] When a generated strategy exists, the visible input is an override field with placeholder `Or override with custom search string...`
