# editor — Spec 017

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### AcademicEditor, TopBar, and Floating Tooling
- [x] Academic editor non-H1 heading placeholder reads `Section heading...`
- [x] Academic editor root `EditorContent` class includes `prose prose-lg`
- [x] Academic editor root enables browser spellcheck via `spellcheck="true"`
- [x] `Cmd/Ctrl+S` inside `AcademicEditor` calls the route `flushSave()` path and prevents the browser default
- [x] Initial editor-content hydration only runs when the current editor text is still blank
- [x] Initial outline bootstrapping waits 300 ms after mount before scanning headings
- [x] Initial outline bootstrapping clears the outline store when the document has fewer than two headings
- [x] `AcademicEditor` recalculates and stores comment counts whenever `documentId` changes
- [x] `AcademicEditor` syncs the top-bar reference badge count from the `referenceCount` prop
- [x] `scholarsync:editor-action` with `add-comment` opens the comment sidebar first if it is closed
- [x] `scholarsync:editor-action` with `add-comment` always dispatches `scholarsync:new-inline-comment` after opening the sidebar
- [x] `scholarsync:editor-action` with `toggle-comment-sidebar` toggles the sidebar without changing the selection
- [x] `scholarsync:editor-action` with `insert-citation` forwards directly to `onOpenCitationDialog`
- [x] `scholarsync:editor-action` with `toggle-reference-sidebar` forwards directly to `onToggleReferenceSidebar`
- [x] TopBar undo button title is exactly `Undo`
- [x] TopBar redo button title is exactly `Redo`
- [x] TopBar undo button is disabled when `editor.can().undo()` is false
- [x] TopBar redo button is disabled when `editor.can().redo()` is false
- [x] TopBar mode dropdown options are exactly `Editing` and `Viewing`
- [x] TopBar mode option `Editing` description reads `Direct changes to document`
- [x] TopBar mode option `Viewing` description reads `Read-only, no edits`
- [x] Switching TopBar mode to `Viewing` calls `editor.setEditable(false)`
- [x] Switching TopBar mode back to `Editing` calls `editor.setEditable(true)`
- [x] TopBar mode dropdown uses a fixed fullscreen click-catcher to dismiss
- [x] TopBar word-count button title reads `Click for section breakdown`
- [x] TopBar section-breakdown popover closes on outside mouse down
- [x] TopBar saved state renders only `saved`, `saving`, `unsaved`, and `offline`; it has no dedicated `error` or `local` branch
- [x] TopBar keyboard-help button title is `Keyboard shortcuts (Cmd+/)`
#### Selection Toolbar and Link Popover
- [x] SelectionToolbar renders only when the current selection is non-empty
- [x] Clearing the text selection hides the floating toolbar entirely
- [x] Clearing the text selection also closes the style dropdown and highlight palette
- [x] SelectionToolbar positions itself using `coordsAtPos(selection.from)`
- [x] SelectionToolbar delays blur-close by 150 ms to allow button interactions inside the toolbar
- [x] Style dropdown current label resolves in priority order `Heading 4`, `Heading 3`, `Heading 2`, `Heading 1`, then `Normal text`
- [x] Style dropdown button minimum width is 90 px
