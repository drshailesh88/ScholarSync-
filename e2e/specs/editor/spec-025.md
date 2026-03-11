# editor — Spec 025

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Reference Sidebar Detailed Behavior
- [ ] Collapsed uncited rows show placeholder badge `[--]`
- [ ] Collapsed rows truncate titles/authors to two lines at most
- [ ] Collapsed rows show `Cited: P<n>` chips only when `citationLocations` data is provided
- [ ] Expanded metadata panel always includes labeled `Title:` and `Authors:` rows
- [ ] Expanded metadata panel shows `Journal:` row only when journal data exists
- [ ] Expanded metadata panel shows `Year:` row only when year data exists
- [ ] Expanded metadata panel shows clickable DOI link only when DOI exists
- [ ] Expanded metadata panel shows clickable PubMed link only when PMID exists
- [ ] Expanded metadata panel wraps abstracts inside a collapsed `<details>` element labeled `Abstract`
- [ ] Expanded action button `Open DOI` appears only when DOI exists
- [ ] Expanded action button `Copy DOI` appears only when DOI exists
- [ ] `Copy DOI` writes `https://doi.org/<doi>` to `navigator.clipboard`
- [ ] Expanded action button `Remove` is right-aligned with `ml-auto`
- [ ] Clicking `Remove` prompts `Remove this reference from the sidebar?`
- [ ] Confirmed sidebar removal deletes the reference from the Zustand reference map immediately
- [ ] Deleting the currently expanded reference collapses it by clearing `expandedId`
- [ ] `scholarsync:scroll-to-reference` expands the target reference before scrolling it into view
- [ ] Scroll-to-reference uses `scrollIntoView({ behavior: "smooth", block: "center" })`
- [ ] The current ReferenceSidebar does not expose any citation-style switching control in its rendered UI
#### Comment Sidebar Local Storage and Threading
- [ ] Comment-sidebar local storage prefix is `scholarsync_comments_`
- [ ] Comment ids are generated in the form `cmt_<timestamp>_<random>`
- [ ] Comment-sidebar reads local comment threads on initial mount
- [ ] Comment-sidebar re-reads local comment threads after each add, reply, resolve, unresolve, or delete action
- [ ] Local comment threads sort unresolved top-level comments before resolved top-level comments
- [ ] Within the same resolved/unresolved group, top-level threads sort newest first by `createdAt`
- [ ] Replies inside a thread sort oldest first by `createdAt`
- [ ] New local comments always use `userId: "local-user"`
- [ ] New local comments default `userName` to `You` when no custom `userName` is supplied
- [ ] New local comments default `isResolved` to `false`
- [ ] Pending inline-comment adds preserve `textRangeStart`, `textRangeEnd`, and `quotedText`
- [ ] General document comments save `textRangeStart`, `textRangeEnd`, and `quotedText` as `null`
- [ ] Reply comments save `parentCommentId` pointing to the parent top-level comment
- [ ] Deleting a top-level comment also deletes all of its replies from local storage
- [ ] Comment count helper counts top-level threads only, not replies
- [ ] Comment count helper unresolved total counts only unresolved top-level threads
