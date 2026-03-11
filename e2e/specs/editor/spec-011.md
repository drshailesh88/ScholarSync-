# editor — Spec 011

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Comment Sidebar Detailed States
- [ ] Deleting a comment reloads the thread list from local storage immediately
#### Reference Sidebar Detailed States
- [ ] Reference sidebar renders only when its `open` prop is true
- [ ] Reference sidebar header title is `References`
- [ ] Reference sidebar header count pill shows the total `references.size`
- [ ] Reference sidebar header `Plus` button delegates to `onOpenCitationDialog`
- [ ] Reference sidebar sort button opens a dropdown with four sort modes
- [ ] Sort menu options are `By citation #`, `By author`, `By year`, and `By date added`
- [ ] Selecting a sort mode closes the sort menu immediately
- [ ] Reference filter input placeholder is `Filter references...`
- [ ] Empty sidebar state headline is `No references yet.`
- [ ] Empty sidebar state CTA label is `Add your first reference`
- [ ] References are partitioned into cited and uncited groups based on `referenceNumberMap`
- [ ] Uncited section heading reads `Not cited (N)` with a warning icon
- [ ] Cited rows show numeric labels like `[1]`
- [ ] Uncited rows show `[--]` instead of a citation number
- [ ] Expanded reference rows show full metadata for Title, Authors, Journal, Year, DOI, PMID, and optional Abstract
- [ ] Expanded reference rows render DOI and PMID values as outbound links when present
- [ ] Expanded reference rows expose an `Open DOI` action only when a DOI exists
- [ ] Expanded reference rows expose a `Copy DOI` action only when a DOI exists
- [ ] `Copy DOI` copies the full `https://doi.org/...` URL to the clipboard rather than only the DOI token
- [ ] `Remove` action is protected by a `window.confirm("Remove this reference from the sidebar?")` prompt
- [ ] Cancelling the browser confirm leaves the reference untouched
- [ ] Confirming removal deletes the reference from store and collapses its detail view if it was expanded
- [ ] Dispatching `scholarsync:scroll-to-reference` expands the target row and scrolls it into view after a short timeout
#### Version History and Restore Details
- [ ] `Version History` button is disabled while the editor route is still loading
- [ ] `Version History` button is also disabled when there is no `editorContent`
- [ ] Opening Version History renders a right-side fixed panel rather than a modal dialog
- [ ] Version History panel header title is `Version History`
- [ ] Version History includes a full-width `Save Current Version` button at the top
- [ ] Clicking `Save Current Version` opens a browser `prompt` asking for a version name
- [ ] Empty or cancelled prompt submission aborts manual version creation
- [ ] Version History initial loading state shows only a centered spinner in the panel body
- [ ] Version History empty state text is `No versions yet`
- [ ] Auto-saved versions display `Auto-save` when no explicit name exists
- [ ] Manual versions display `Manual save` when no explicit name exists
