# editor — Spec 009

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### AcademicEditor Shell and Top Bar Details
- [ ] Every content change recalculates and stores the current word count before the debounced save fires
- [ ] Debounced editor save delay defaults to 2000 ms on `/editor/[id]`
- [ ] Successful debounced saves set editor store status to `saved` with a fresh `lastSavedAt` timestamp
- [ ] Selection changes update the active outline section to the nearest preceding heading position
- [ ] Initial outline generation only stores headings when the document contains at least two headings
- [ ] Comment count badge is hydrated from local comment storage when `documentId` changes
- [ ] External reference count is mirrored into the editor store when the `referenceCount` prop changes
- [ ] Undo button is disabled when `editor.can().undo()` is false
- [ ] Redo button is disabled when `editor.can().redo()` is false
- [ ] Clicking Undo runs `editor.chain().focus().undo().run()`
- [ ] Clicking Redo runs `editor.chain().focus().redo().run()`
- [ ] Mode toggle button shows `Editing` with a pencil icon by default
- [ ] Mode dropdown includes the descriptive text `Direct changes to document` for Editing mode
- [ ] Mode dropdown includes the descriptive text `Read-only, no edits` for Viewing mode
- [ ] Selecting `Viewing` immediately calls `editor.setEditable(false)`
- [ ] Selecting `Editing` immediately calls `editor.setEditable(true)`
- [ ] Word-count button shows the localized total count followed by the literal word `words`
- [ ] Clicking the word-count button opens a `Section Breakdown` popover anchored below the count
- [ ] Section Breakdown popover shows `No section headings yet.` when no heading buckets are available
- [ ] Clicking outside the word-count popover closes it
- [ ] TopBar reference badge button shows the current numeric `referenceCount` from the editor store
- [ ] TopBar comment badge button shows the current numeric unresolved `commentCount` from the editor store
- [ ] TopBar keyboard-shortcuts help button title is `Keyboard shortcuts (Cmd+/)`
#### Keyboard Shortcuts Dialog Details
- [ ] Keyboard shortcuts dialog opens from the TopBar question-mark button
- [ ] Keyboard shortcuts dialog header includes a keyboard icon and the title `Keyboard Shortcuts`
- [ ] Clicking the dark backdrop outside the shortcuts dialog closes it
- [ ] Clicking inside the shortcuts dialog body does not bubble and does not close the dialog
- [ ] Formatting shortcuts section includes Bold, Italic, Underline, Strikethrough, Highlight, Superscript, Subscript, and Inline Code
- [ ] Structure shortcuts section includes Heading 1, Heading 2, Heading 3, Heading 4, Bullet List, Ordered List, Blockquote, and Horizontal Rule
- [ ] Academic shortcuts section includes Insert Citation, Insert Footnote, and Insert Link
- [ ] Tools shortcuts section includes Undo, Redo, Save, Toggle Comments, and Slash Commands
- [ ] Tools section documents `Cmd + /` as `Toggle Comments` in the current dialog even though the editor wiring listens for the custom `toggle-comment-sidebar` event
#### Link and Citation Interaction Details
- [ ] Clicking a link inside the editor prevents normal navigation and opens the custom `LinkPopover`
- [ ] LinkPopover initial view shows the raw URL text, not editable input fields
- [ ] LinkPopover positions itself above the clicked anchor using the link element's bounding box
