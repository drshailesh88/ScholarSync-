# editor — Spec 011

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Comment Sidebar Detailed States
- [x] PASS: Deleting a comment reloads the thread list from local storage immediately
#### Reference Sidebar Detailed States
- [x] PASS: Reference sidebar renders only when its `open` prop is true
- [x] PASS: Reference sidebar header title is `References`
- [x] PASS: Reference sidebar header count pill shows the total `references.size`
- [x] PASS: Reference sidebar header `Plus` button delegates to `onOpenCitationDialog`
- [x] PASS: Reference sidebar sort button opens a dropdown with four sort modes
- [x] PASS: Sort menu options are `By citation #`, `By author`, `By year`, and `By date added`
- [x] PASS: Selecting a sort mode closes the sort menu immediately
- [x] PASS: Reference filter input placeholder is `Filter references...`
- [x] PASS: Empty sidebar state headline is `No references yet.`
- [x] PASS: Empty sidebar state CTA label is `Add your first reference`
- [x] PASS: References are partitioned into cited and uncited groups based on `referenceNumberMap`
- [x] PASS: Uncited section heading reads `Not cited (N)` with a warning icon
- [x] PASS: Cited rows show numeric labels like `[1]`
- [x] PASS: Uncited rows show `[--]` instead of a citation number
- [x] PASS: Expanded reference rows show full metadata for Title, Authors, Journal, Year, DOI, PMID, and optional Abstract
- [x] PASS: Expanded reference rows render DOI and PMID values as outbound links when present
- [x] PASS: Expanded reference rows expose an `Open DOI` action only when a DOI exists
- [x] PASS: Expanded reference rows expose a `Copy DOI` action only when a DOI exists
- [x] PASS: `Copy DOI` copies the full `https://doi.org/...` URL to the clipboard rather than only the DOI token
- [x] PASS: `Remove` action is protected by a `window.confirm("Remove this reference from the sidebar?")` prompt
- [x] PASS: Cancelling the browser confirm leaves the reference untouched
- [x] PASS: Confirming removal deletes the reference from store and collapses its detail view if it was expanded
- [x] PASS: Dispatching `scholarsync:scroll-to-reference` expands the target row and scrolls it into view after a short timeout
#### Version History and Restore Details
- [x] PASS: `Version History` button is disabled while the editor route is still loading
- [x] PASS: `Version History` button is also disabled when there is no `editorContent`
- [x] PASS: Opening Version History renders a right-side fixed panel rather than a modal dialog
- [x] PASS: Version History panel header title is `Version History`
- [x] PASS: Version History includes a full-width `Save Current Version` button at the top
- [x] PASS: Clicking `Save Current Version` opens a browser `prompt` asking for a version name
- [x] PASS: Empty or cancelled prompt submission aborts manual version creation
- [x] PASS: Version History initial loading state shows only a centered spinner in the panel body
- [x] PASS: Version History empty state text is `No versions yet`
- [x] PASS: Auto-saved versions display `Auto-save` when no explicit name exists
- [x] PASS: Manual versions display `Manual save` when no explicit name exists
