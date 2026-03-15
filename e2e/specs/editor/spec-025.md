# editor — Spec 025

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Reference Sidebar Detailed Behavior
- [x] PASS: Collapsed uncited rows show placeholder badge `[--]`
- [x] PASS: Collapsed rows truncate titles/authors to two lines at most
- [x] PASS: Collapsed rows show `Cited: P<n>` chips only when `citationLocations` data is provided
- [x] PASS: Expanded metadata panel always includes labeled `Title:` and `Authors:` rows
- [x] PASS: Expanded metadata panel shows `Journal:` row only when journal data exists
- [x] PASS: Expanded metadata panel shows `Year:` row only when year data exists
- [x] PASS: Expanded metadata panel shows clickable DOI link only when DOI exists
- [x] PASS: Expanded metadata panel shows clickable PubMed link only when PMID exists
- [x] PASS: Expanded metadata panel wraps abstracts inside a collapsed `<details>` element labeled `Abstract`
- [x] PASS: Expanded action button `Open DOI` appears only when DOI exists
- [x] PASS: Expanded action button `Copy DOI` appears only when DOI exists
- [x] PASS: `Copy DOI` writes `https://doi.org/<doi>` to `navigator.clipboard`
- [x] PASS: Expanded action button `Remove` is right-aligned with `ml-auto`
- [x] PASS: Clicking `Remove` prompts `Remove this reference from the sidebar?`
- [x] PASS: Confirmed sidebar removal deletes the reference from the Zustand reference map immediately
- [x] PASS: Deleting the currently expanded reference collapses it by clearing `expandedId`
- [x] PASS: `scholarsync:scroll-to-reference` expands the target reference before scrolling it into view
- [x] PASS: Scroll-to-reference uses `scrollIntoView({ behavior: "smooth", block: "center" })`
- [x] PASS: The current ReferenceSidebar does not expose any citation-style switching control in its rendered UI
#### Comment Sidebar Local Storage and Threading
- [x] PASS: Comment-sidebar local storage prefix is `scholarsync_comments_`
- [x] PASS: Comment ids are generated in the form `cmt_<timestamp>_<random>`
- [x] PASS: Comment-sidebar reads local comment threads on initial mount
- [x] PASS: Comment-sidebar re-reads local comment threads after each add, reply, resolve, unresolve, or delete action
- [x] PASS: Local comment threads sort unresolved top-level comments before resolved top-level comments
- [x] PASS: Within the same resolved/unresolved group, top-level threads sort newest first by `createdAt`
- [x] PASS: Replies inside a thread sort oldest first by `createdAt`
- [x] PASS: New local comments always use `userId: "local-user"`
- [x] PASS: New local comments default `userName` to `You` when no custom `userName` is supplied
- [x] PASS: New local comments default `isResolved` to `false`
- [x] PASS: Pending inline-comment adds preserve `textRangeStart`, `textRangeEnd`, and `quotedText`
- [x] PASS: General document comments save `textRangeStart`, `textRangeEnd`, and `quotedText` as `null`
- [x] PASS: Reply comments save `parentCommentId` pointing to the parent top-level comment
- [x] PASS: Deleting a top-level comment also deletes all of its replies from local storage
- [x] PASS: Comment count helper counts top-level threads only, not replies
- [x] PASS: Comment count helper unresolved total counts only unresolved top-level threads

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Source verification covered the sidebar row rendering/metadata/actions in `src/components/citations/reference-sidebar.tsx`, the comment-sidebar reload/mount flow in `src/components/editor/CommentSidebar.tsx`, and the local thread storage/sorting/counting rules in `src/lib/editor/document-comments-local.ts`.
  - Focused tests passed in `src/components/citations/__tests__/reference-sidebar.test.tsx` and `src/lib/editor/__tests__/studio-hardening.test.ts`.
-->
