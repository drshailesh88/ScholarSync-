# editor — Spec 010

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Link and Citation Interaction Details
- [x] PASS: Clicking outside the link popover closes it
- [x] PASS: LinkPopover `Edit link` button switches the popover into inline edit mode
- [x] PASS: Enter inside the link edit input confirms the updated URL
- [x] PASS: Escape inside the link edit input exits edit mode without closing the popover
- [x] PASS: Link edit input placeholder is `https://...`
- [x] PASS: Link edit input auto-focuses and selects the full URL when edit mode opens
- [x] PASS: LinkPopover `Open in new tab` uses `window.open(url, "_blank", "noopener,noreferrer")`
- [x] PASS: LinkPopover `Remove link` unsets the current link mark and closes the popover
- [x] PASS: `scholarsync:open-citation-dialog` window event opens the citation dialog on `/editor/[id]`
- [x] PASS: Inserting citations through the editor route always inserts a `citation` node first and checks for an existing bibliography second
- [x] PASS: When no bibliography node exists, the editor route appends one at the end of the document automatically after citation insertion
#### Comment Sidebar Detailed States
- [x] PASS: Comment sidebar opens inline inside `AcademicEditor` only when `commentSidebarOpen` is true and a `documentId` is available
- [x] PASS: Comment sidebar header title is `Comments`
- [x] PASS: Comment sidebar unresolved badge is hidden when there are zero unresolved threads
- [x] PASS: Comment filter bar exposes exactly three modes: `all`, `unresolved`, and `resolved`
- [x] PASS: Active comment filter chip uses brand-colored styling while inactive chips use muted styling
- [x] PASS: Empty state headline is `No comments yet`
- [x] PASS: Empty state helper text reads `Select text and click the comment button to start`
- [x] PASS: Bottom new-comment input placeholder is `Add a general comment about this document...`
- [x] PASS: Pressing Enter in the bottom new-comment input submits the comment when the field is non-empty
- [x] PASS: General document comments are stored without quoted text or selection ranges
- [x] PASS: Inline-comment pending state shows a `Commenting on selection` banner before the new comment is submitted
- [x] PASS: Inline-comment pending state shows the selected text in a truncated blockquote when quoted text exists
- [x] PASS: Pending inline-comment `Cancel` clears `pendingInlineComment`, closes the temporary composer state, and empties the input
- [x] PASS: Pending inline-comment `Add Comment` button is disabled until the comment text has non-whitespace content
- [x] PASS: Reply input placeholder is `Write a reply...`
- [x] PASS: Reply button is disabled until reply text has non-whitespace content
- [x] PASS: Pressing Enter in the reply input submits the reply when the field is non-empty
- [x] PASS: Clicking a quoted-text chip in a comment thread restores the text selection in the editor and scrolls it into view
- [x] PASS: Comment timestamps collapse to `Just now`, `Xm ago`, `Xh ago`, `Yesterday`, `Xd ago`, or a localized month/day string depending on age
- [x] PASS: Resolved top-level comments show a `Resolved` pill in the header row
- [x] PASS: Resolved comments and replies render with reduced opacity and line-through text treatment
- [x] PASS: Only top-level comments render `Resolve`/`Unresolve` and `Reply` actions
- [x] PASS: Owner-authored comments render a `Delete` action aligned to the far right
- [x] PASS: Resolving or unresolving a comment reloads the thread list from local storage immediately
