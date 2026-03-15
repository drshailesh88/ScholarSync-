# editor — Spec 024

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Citation Dialog: Library, DOI/PMID, and Manual Entry
- [x] PASS: Manual-entry authors placeholder is `John Smith, Jane Doe`
- [x] PASS: Manual-entry journal placeholder is `N Engl J Med`
- [x] PASS: Manual-entry year placeholder is `2024`
- [x] PASS: Manual-entry volume placeholder is `389`
- [x] PASS: Manual-entry issue placeholder is `4`
- [x] PASS: Manual-entry pages placeholder is `312-320`
- [x] PASS: Manual-entry DOI placeholder is `10.1056/NEJMoa...`
- [x] PASS: Manual-entry `Save Reference` button is disabled until the title contains non-whitespace text
- [x] PASS: Manual entry splits authors on commas first, then interprets the last token as family name when needed
- [x] PASS: Manual entry falls back to reference title `Untitled` when the title field is empty at save time
- [x] PASS: Manual entry parses `year` with `parseInt(...)` and falls back to `0` when parsing fails
- [x] PASS: Manual save generates ids in the form `ref_<timestamp>_<random>`
- [x] PASS: After manual save, the manual form resets all fields back to empty values and type `article`
- [x] PASS: After manual save, the dialog returns to the `search` tab
- [x] PASS: When selected references exist, the footer heading reads `Selected (<n>)`
- [x] PASS: Selected-reference pills show first author family name plus year
- [x] PASS: Removing a selected-reference pill leaves the dialog open and only updates `selectedIds`
- [x] PASS: Footer primary action label is `Insert Citation`
- [x] PASS: Footer primary action is hidden entirely when no references are selected
#### Reference Sidebar Detailed Behavior
- [x] PASS: Reference-sidebar header title is `References`
- [x] PASS: Reference-sidebar count pill shows the total `references.size`
- [x] PASS: Header plus button title is `Add reference`
- [x] PASS: Header sort trigger title is `Sort`
- [x] PASS: Header close button has no visible label text and closes the sidebar immediately
- [x] PASS: Sort menu options are `By citation #`, `By author`, `By year`, and `By date added`
- [x] PASS: Sort mode defaults to `number`
- [x] PASS: Sort menu closes immediately after choosing a new sort option
- [x] PASS: The sidebar does not register a document-level outside-click listener to close the sort menu
- [x] PASS: Filter input placeholder is `Filter references...`
- [x] PASS: Empty sidebar state headline text is `No references yet.`
- [x] PASS: Empty sidebar action text is `Add your first reference`
- [x] PASS: References are split into cited and uncited groups using `referenceNumberMap.has(ref.id)`
- [x] PASS: The uncited group header label is `Not cited (<n>)`
- [x] PASS: Uncited rows render with reduced opacity
- [x] PASS: Collapsed cited rows show numeric badges like `[4]`

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Source verification covered the manual-entry placeholders, disabled/save/reset behavior, author parsing, fallback values, selected-reference footer behavior, and the reference-sidebar header/sort/filter/grouping logic in `src/components/citations/citation-dialog.tsx` and `src/components/citations/reference-sidebar.tsx`.
  - Live browser verification was limited to reopening the shared citation dialog on `/studio` and confirming the shared open state remained healthy after the spec 23 checks; the spec-24 items themselves were deterministic enough to verify from source.
-->
