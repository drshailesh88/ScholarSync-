# editor — Spec 021

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Custom Keyboard Shortcuts and Extension Configuration
- [x] Academic keyboard shortcut `Mod-Shift-,` toggles subscript
- [x] Academic keyboard shortcut `Mod-Shift-F` opens `window.prompt("Footnote text:")`
- [x] Leaving the keyboard-shortcut footnote prompt empty inserts no footnote node
- [x] Academic keyboard shortcut `Mod-/` dispatches `scholarsync:editor-action` with `toggle-comment-sidebar`
- [x] Academic keyboard shortcut `Mod-Shift-C` dispatches `scholarsync:editor-action` with `insert-citation`
- [x] Academic keyboard shortcut `Mod-Shift-R` dispatches `scholarsync:editor-action` with `toggle-reference-sidebar`
- [x] Academic keyboard shortcut `Mod-Shift-Enter` inserts a horizontal rule
- [x] Academic keyboard shortcuts `Mod-Shift-1` through `Mod-Shift-4` toggle heading levels 1 through 4
- [x] Studio `TiptapEditor` supports heading levels `1` through `6`
- [x] Studio `TiptapEditor` placeholder text is `Start typing or press '/' for AI commands...`
- [x] Studio `TiptapEditor` uses `Table.configure({ resizable: true })`
- [x] Studio `TiptapEditor` allows base64 image insertion through `Image.configure({ allowBase64: true })`
- [x] Studio `TiptapEditor` enables autolink and link-on-paste behavior through the Link extension
- [x] Studio `TiptapEditor` enables nested task items
- [x] Studio `TiptapEditor` mounts the same custom `SlashCommandsExtension`, `OutlinePlugin`, `Footnote`, `CitationNode`, `BibliographyNode`, and citation-numbering plugin as the route editor
- [x] Neither `AcademicEditor` nor Studio `TiptapEditor` registers a custom math node or math extension in the current source tree
- [x] Neither `AcademicEditor` nor Studio `TiptapEditor` registers a track-changes extension in the current source tree
#### Footnotes, Outline Plugin, Citation Nodes, and Bibliography
- [x] Footnote nodes are inline atomic nodes and cannot be edited directly in the document body
- [x] New footnote ids are generated in the form `fn_<timestamp>_<random>`
- [x] New footnote numbers are assigned as existing footnote count plus one
- [x] Removing a footnote command deletes the matching node by `id`
- [x] Footnote renumbering runs in a ProseMirror plugin `appendTransaction(...)`
- [x] Footnote renumbering updates every footnote node whose stored `number` no longer matches document order
- [x] Footnote marker HTML renders as a `<sup>` containing the footnote number
- [x] Hovering a footnote marker waits 300 ms before showing the tooltip editor
- [x] Footnote tooltip title reads `Footnote <number>`
- [x] Footnote tooltip textarea saves on blur rather than on every keystroke
- [x] Footnote tooltip delete button title is `Remove footnote`
- [x] `FootnoteSection` does not render at all when the editor has zero footnotes
- [x] `FootnoteSection` heading label is exactly `Footnotes`
- [x] `FootnoteSection` sorts footnotes by numeric order before rendering
- [x] Clicking a footnote row in `FootnoteSection` focuses the editor and moves selection to that footnote node position
- [x] Outline plugin rebuilds the outline on every heading change with a 100 ms debounce
- [x] Outline plugin still rebuilds section word counts on non-heading content changes using the standard 500 ms debounce
- [x] Citation nodes are inline atomic nodes with `referenceIds` defaulting to an empty array

<!-- Notes:
  - First pass completed on 2026-03-12.
  - Real issue found and fixed: `Mod-Shift-C` now routes through the shared `scholarsync:editor-action` contract with `action: "insert-citation"` instead of being handled by a divergent citation shortcut path.
  - Live browser verification covered subscript, footnote prompt/empty no-op, comment/reference sidebar dispatches, citation dispatch, horizontal rule insertion, heading shortcuts, footnote-section visibility/sorting/focus, and Studio placeholder behavior.
  - Source verification covered heading levels 1-6, resizable tables, base64 images, autolink/link-on-paste, nested task items, shared extension/plugin mounting, absence of math and track-changes extensions, footnote node behavior, tooltip timing, blur-save semantics, outline debounce behavior, and citation-node defaults.
-->
