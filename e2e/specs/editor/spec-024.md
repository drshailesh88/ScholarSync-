# editor — Spec 024

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Citation Dialog: Library, DOI/PMID, and Manual Entry
- [ ] Manual-entry authors placeholder is `John Smith, Jane Doe`
- [ ] Manual-entry journal placeholder is `N Engl J Med`
- [ ] Manual-entry year placeholder is `2024`
- [ ] Manual-entry volume placeholder is `389`
- [ ] Manual-entry issue placeholder is `4`
- [ ] Manual-entry pages placeholder is `312-320`
- [ ] Manual-entry DOI placeholder is `10.1056/NEJMoa...`
- [ ] Manual-entry `Save Reference` button is disabled until the title contains non-whitespace text
- [ ] Manual entry splits authors on commas first, then interprets the last token as family name when needed
- [ ] Manual entry falls back to reference title `Untitled` when the title field is empty at save time
- [ ] Manual entry parses `year` with `parseInt(...)` and falls back to `0` when parsing fails
- [ ] Manual save generates ids in the form `ref_<timestamp>_<random>`
- [ ] After manual save, the manual form resets all fields back to empty values and type `article`
- [ ] After manual save, the dialog returns to the `search` tab
- [ ] When selected references exist, the footer heading reads `Selected (<n>)`
- [ ] Selected-reference pills show first author family name plus year
- [ ] Removing a selected-reference pill leaves the dialog open and only updates `selectedIds`
- [ ] Footer primary action label is `Insert Citation`
- [ ] Footer primary action is hidden entirely when no references are selected
#### Reference Sidebar Detailed Behavior
- [ ] Reference-sidebar header title is `References`
- [ ] Reference-sidebar count pill shows the total `references.size`
- [ ] Header plus button title is `Add reference`
- [ ] Header sort trigger title is `Sort`
- [ ] Header close button has no visible label text and closes the sidebar immediately
- [ ] Sort menu options are `By citation #`, `By author`, `By year`, and `By date added`
- [ ] Sort mode defaults to `number`
- [ ] Sort menu closes immediately after choosing a new sort option
- [ ] The sidebar does not register a document-level outside-click listener to close the sort menu
- [ ] Filter input placeholder is `Filter references...`
- [ ] Empty sidebar state headline text is `No references yet.`
- [ ] Empty sidebar action text is `Add your first reference`
- [ ] References are split into cited and uncited groups using `referenceNumberMap.has(ref.id)`
- [ ] The uncited group header label is `Not cited (<n>)`
- [ ] Uncited rows render with reduced opacity
- [ ] Collapsed cited rows show numeric badges like `[4]`
