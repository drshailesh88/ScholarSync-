# editor — Spec 010

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Link and Citation Interaction Details
- [ ] Clicking outside the link popover closes it
- [ ] LinkPopover `Edit link` button switches the popover into inline edit mode
- [ ] Enter inside the link edit input confirms the updated URL
- [ ] Escape inside the link edit input exits edit mode without closing the popover
- [ ] Link edit input placeholder is `https://...`
- [ ] Link edit input auto-focuses and selects the full URL when edit mode opens
- [ ] LinkPopover `Open in new tab` uses `window.open(url, "_blank", "noopener,noreferrer")`
- [ ] LinkPopover `Remove link` unsets the current link mark and closes the popover
- [ ] `scholarsync:open-citation-dialog` window event opens the citation dialog on `/editor/[id]`
- [ ] Inserting citations through the editor route always inserts a `citation` node first and checks for an existing bibliography second
- [ ] When no bibliography node exists, the editor route appends one at the end of the document automatically after citation insertion
#### Comment Sidebar Detailed States
- [ ] Comment sidebar opens inline inside `AcademicEditor` only when `commentSidebarOpen` is true and a `documentId` is available
- [ ] Comment sidebar header title is `Comments`
- [ ] Comment sidebar unresolved badge is hidden when there are zero unresolved threads
- [ ] Comment filter bar exposes exactly three modes: `all`, `unresolved`, and `resolved`
- [ ] Active comment filter chip uses brand-colored styling while inactive chips use muted styling
- [ ] Empty state headline is `No comments yet`
- [ ] Empty state helper text reads `Select text and click the comment button to start`
- [ ] Bottom new-comment input placeholder is `Add a comment...`
- [ ] Pressing Enter in the bottom new-comment input submits the comment when the field is non-empty
- [ ] General document comments are stored without quoted text or selection ranges
- [ ] Inline-comment pending state shows a `Commenting on selection` banner before the new comment is submitted
- [ ] Inline-comment pending state shows the selected text in a truncated blockquote when quoted text exists
- [ ] Pending inline-comment `Cancel` clears `pendingInlineComment`, closes the temporary composer state, and empties the input
- [ ] Pending inline-comment `Add Comment` button is disabled until the comment text has non-whitespace content
- [ ] Reply input placeholder is `Write a reply...`
- [ ] Reply button is disabled until reply text has non-whitespace content
- [ ] Pressing Enter in the reply input submits the reply when the field is non-empty
- [ ] Clicking a quoted-text chip in a comment thread restores the text selection in the editor and scrolls it into view
- [ ] Comment timestamps collapse to `Just now`, `Xm ago`, `Xh ago`, `Yesterday`, `Xd ago`, or a localized month/day string depending on age
- [ ] Resolved top-level comments show a `Resolved` pill in the header row
- [ ] Resolved comments and replies render with reduced opacity and line-through text treatment
- [ ] Only top-level comments render `Resolve`/`Unresolve` and `Reply` actions
- [ ] Owner-authored comments render a `Delete` action aligned to the far right
- [ ] Resolving or unresolving a comment reloads the thread list from local storage immediately
