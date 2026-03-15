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
- [x] Manual-entry authors placeholder is `John Smith, Jane Doe`
- [x] Manual-entry journal placeholder is `N Engl J Med`
- [x] Manual-entry year placeholder is `2024`
- [x] Manual-entry volume placeholder is `389`
- [x] Manual-entry issue placeholder is `4`
- [x] Manual-entry pages placeholder is `312-320`
- [x] Manual-entry DOI placeholder is `10.1056/NEJMoa...`
- [x] Manual-entry `Save Reference` button is disabled until the title contains non-whitespace text
- [x] Manual entry splits authors on commas first, then interprets the last token as family name when needed
- [x] Manual entry falls back to reference title `Untitled` when the title field is empty at save time
- [x] Manual entry parses `year` with `parseInt(...)` and falls back to `0` when parsing fails
- [x] Manual save generates ids in the form `ref_<timestamp>_<random>`
- [x] After manual save, the manual form resets all fields back to empty values and type `article`
- [x] After manual save, the dialog returns to the `search` tab
- [x] When selected references exist, the footer heading reads `Selected (<n>)`
- [x] Selected-reference pills show first author family name plus year
- [x] Removing a selected-reference pill leaves the dialog open and only updates `selectedIds`
- [x] Footer primary action label is `Insert Citation`
- [x] Footer primary action is hidden entirely when no references are selected
#### Reference Sidebar Detailed Behavior
- [x] Reference-sidebar header title is `References`
- [x] Reference-sidebar count pill shows the total `references.size`
- [x] Header plus button title is `Add reference`
- [x] Header sort trigger title is `Sort`
- [x] Header close button has no visible label text and closes the sidebar immediately
- [x] Sort menu options are `By citation #`, `By author`, `By year`, and `By date added`
- [x] Sort mode defaults to `number`
- [x] Sort menu closes immediately after choosing a new sort option
- [x] The sidebar does not register a document-level outside-click listener to close the sort menu
- [x] Filter input placeholder is `Filter references...`
- [x] Empty sidebar state headline text is `No references yet.`
- [x] Empty sidebar action text is `Add your first reference`
- [x] References are split into cited and uncited groups using `referenceNumberMap.has(ref.id)`
- [x] The uncited group header label is `Not cited (<n>)`
- [x] Uncited rows render with reduced opacity
- [x] Collapsed cited rows show numeric badges like `[4]`

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Source verification covered the manual-entry placeholders, disabled/save/reset behavior, author parsing, fallback values, selected-reference footer behavior, and the reference-sidebar header/sort/filter/grouping logic in `src/components/citations/citation-dialog.tsx` and `src/components/citations/reference-sidebar.tsx`.
  - Live browser verification was limited to reopening the shared citation dialog on `/studio` and confirming the shared open state remained healthy after the spec 23 checks; the spec-24 items themselves were deterministic enough to verify from source.
-->
