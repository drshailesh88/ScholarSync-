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
- [x] Deleting a comment reloads the thread list from local storage immediately
#### Reference Sidebar Detailed States
- [x] Reference sidebar renders only when its `open` prop is true
- [x] Reference sidebar header title is `References`
- [x] Reference sidebar header count pill shows the total `references.size`
- [x] Reference sidebar header `Plus` button delegates to `onOpenCitationDialog`
- [x] Reference sidebar sort button opens a dropdown with four sort modes
- [x] Sort menu options are `By citation #`, `By author`, `By year`, and `By date added`
- [x] Selecting a sort mode closes the sort menu immediately
- [x] Reference filter input placeholder is `Filter references...`
- [x] Empty sidebar state headline is `No references yet.`
- [x] Empty sidebar state CTA label is `Add your first reference`
- [x] References are partitioned into cited and uncited groups based on `referenceNumberMap`
- [x] Uncited section heading reads `Not cited (N)` with a warning icon
- [x] Cited rows show numeric labels like `[1]`
- [x] Uncited rows show `[--]` instead of a citation number
- [x] Expanded reference rows show full metadata for Title, Authors, Journal, Year, DOI, PMID, and optional Abstract
- [x] Expanded reference rows render DOI and PMID values as outbound links when present
- [x] Expanded reference rows expose an `Open DOI` action only when a DOI exists
- [x] Expanded reference rows expose a `Copy DOI` action only when a DOI exists
- [x] `Copy DOI` copies the full `https://doi.org/...` URL to the clipboard rather than only the DOI token
- [x] `Remove` action is protected by a `window.confirm("Remove this reference from the sidebar?")` prompt
- [x] Cancelling the browser confirm leaves the reference untouched
- [x] Confirming removal deletes the reference from store and collapses its detail view if it was expanded
- [x] Dispatching `scholarsync:scroll-to-reference` expands the target row and scrolls it into view after a short timeout
#### Version History and Restore Details
- [x] `Version History` button is disabled while the editor route is still loading
- [x] `Version History` button is also disabled when there is no `editorContent`
- [x] Opening Version History renders a right-side fixed panel rather than a modal dialog
- [x] Version History panel header title is `Version History`
- [x] Version History includes a full-width `Save Current Version` button at the top
- [x] Clicking `Save Current Version` opens a browser `prompt` asking for a version name
- [x] Empty or cancelled prompt submission aborts manual version creation
- [x] Version History initial loading state shows only a centered spinner in the panel body
- [x] Version History empty state text is `No versions yet`
- [x] Auto-saved versions display `Auto-save` when no explicit name exists
- [x] Manual versions display `Manual save` when no explicit name exists
