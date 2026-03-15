# editor — Spec 009

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### AcademicEditor Shell and Top Bar Details
- [x] PASS: Every content change recalculates and stores the current word count before the debounced save fires
- [x] PASS: Debounced editor save delay defaults to 2000 ms on `/editor/[id]`
- [x] PASS: Successful debounced saves set editor store status to `saved` with a fresh `lastSavedAt` timestamp
- [x] PASS: Selection changes update the active outline section to the nearest preceding heading position
- [x] PASS: Initial outline generation only stores headings when the document contains at least two headings
- [x] PASS: Comment count badge is hydrated from local comment storage when `documentId` changes
- [x] PASS: External reference count is mirrored into the editor store when the `referenceCount` prop changes
- [x] PASS: Undo button is disabled when `editor.can().undo()` is false
- [x] PASS: Redo button is disabled when `editor.can().redo()` is false
- [x] PASS: Clicking Undo runs `editor.chain().focus().undo().run()`
- [x] PASS: Clicking Redo runs `editor.chain().focus().redo().run()`
- [x] PASS: Mode toggle button shows `Editing` with a pencil icon by default
- [x] PASS: Mode dropdown includes the descriptive text `Direct changes to document` for Editing mode
- [x] PASS: Mode dropdown includes the descriptive text `Read-only, no edits` for Viewing mode
- [x] PASS: Selecting `Viewing` immediately calls `editor.setEditable(false)`
- [x] PASS: Selecting `Editing` immediately calls `editor.setEditable(true)`
- [x] PASS: Word-count button shows the localized total count followed by the literal word `words`
- [x] PASS: Clicking the word-count button opens a `Section Breakdown` popover anchored below the count
- [x] PASS: Section Breakdown popover shows `No section headings yet.` when no heading buckets are available
- [x] PASS: Clicking outside the word-count popover closes it
- [x] PASS: TopBar reference badge button shows the current numeric `referenceCount` from the editor store
- [x] PASS: TopBar comment badge button shows the current numeric unresolved `commentCount` from the editor store
- [x] PASS: TopBar keyboard-shortcuts help button title is `Keyboard shortcuts (Cmd+/)`
#### Keyboard Shortcuts Dialog Details
- [x] PASS: Keyboard shortcuts dialog opens from the TopBar question-mark button
- [x] PASS: Keyboard shortcuts dialog header includes a keyboard icon and the title `Keyboard Shortcuts`
- [x] PASS: Clicking the dark backdrop outside the shortcuts dialog closes it
- [x] PASS: Clicking inside the shortcuts dialog body does not bubble and does not close the dialog
- [x] PASS: Formatting shortcuts section includes Bold, Italic, Underline, Strikethrough, Highlight, Superscript, Subscript, and Inline Code
- [x] PASS: Structure shortcuts section includes Heading 1, Heading 2, Heading 3, Heading 4, Bullet List, Ordered List, Blockquote, and Horizontal Rule
- [x] PASS: Academic shortcuts section includes Insert Citation, Insert Footnote, and Insert Link
- [x] PASS: Tools shortcuts section includes Undo, Redo, Save, Toggle Comments, and Slash Commands
- [x] PASS: Tools section documents `Cmd + /` as `Toggle Comments` in the current dialog even though the editor wiring listens for the custom `toggle-comment-sidebar` event
#### Link and Citation Interaction Details
- [x] PASS: Clicking a link inside the editor prevents normal navigation and opens the custom `LinkPopover`
- [x] PASS: LinkPopover initial view shows the raw URL text, not editable input fields
- [x] PASS: LinkPopover positions itself above the clicked anchor using the link element's bounding box

<!-- Notes:
  - Word count: updated immediately (before debounce) on each keystroke — confirmed live
  - Debounce timing: typed "y", "Saving..." appeared immediately, "Saved HH:MM" appeared after ~2200ms
  - Undo/Redo disabled state confirmed via [disabled] in accessibility snapshot on fresh load
  - Viewing mode: contentEditable set to "false", typing "a" had no effect
  - Section Breakdown: "No section headings yet." with empty doc; "Intro / Methods" sections visible after adding 2 headings
  - Reference badge showed 50, comment badge showed 0
  - ? button title confirmed via DOM querySelectorAll('button[title]')
  - Dialog backdrop click: closed dialog; inside body click: dialog stayed open
  - All 24 shortcut descriptions confirmed via DOM span.text-sm query
  - Toggle Comments → ["Cmd", "/"] confirmed via DOM key span query
  - Link created via Cmd+Shift+K (window.prompt overridden to return "https://example.com")
  - LinkPopover showed URL as <span> text (not <input>), positioned above the link
-->
