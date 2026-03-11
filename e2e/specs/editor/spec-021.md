# editor — Spec 021

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Custom Keyboard Shortcuts and Extension Configuration
- [ ] Academic keyboard shortcut `Mod-Shift-,` toggles subscript
- [ ] Academic keyboard shortcut `Mod-Shift-F` opens `window.prompt("Footnote text:")`
- [ ] Leaving the keyboard-shortcut footnote prompt empty inserts no footnote node
- [ ] Academic keyboard shortcut `Mod-/` dispatches `scholarsync:editor-action` with `toggle-comment-sidebar`
- [ ] Academic keyboard shortcut `Mod-Shift-C` dispatches `scholarsync:editor-action` with `insert-citation`
- [ ] Academic keyboard shortcut `Mod-Shift-R` dispatches `scholarsync:editor-action` with `toggle-reference-sidebar`
- [ ] Academic keyboard shortcut `Mod-Shift-Enter` inserts a horizontal rule
- [ ] Academic keyboard shortcuts `Mod-Shift-1` through `Mod-Shift-4` toggle heading levels 1 through 4
- [ ] Studio `TiptapEditor` supports heading levels `1` through `6`
- [ ] Studio `TiptapEditor` placeholder text is `Start typing or press '/' for AI commands...`
- [ ] Studio `TiptapEditor` uses `Table.configure({ resizable: true })`
- [ ] Studio `TiptapEditor` allows base64 image insertion through `Image.configure({ allowBase64: true })`
- [ ] Studio `TiptapEditor` enables autolink and link-on-paste behavior through the Link extension
- [ ] Studio `TiptapEditor` enables nested task items
- [ ] Studio `TiptapEditor` mounts the same custom `SlashCommandsExtension`, `OutlinePlugin`, `Footnote`, `CitationNode`, `BibliographyNode`, and citation-numbering plugin as the route editor
- [ ] Neither `AcademicEditor` nor Studio `TiptapEditor` registers a custom math node or math extension in the current source tree
- [ ] Neither `AcademicEditor` nor Studio `TiptapEditor` registers a track-changes extension in the current source tree
#### Footnotes, Outline Plugin, Citation Nodes, and Bibliography
- [ ] Footnote nodes are inline atomic nodes and cannot be edited directly in the document body
- [ ] New footnote ids are generated in the form `fn_<timestamp>_<random>`
- [ ] New footnote numbers are assigned as existing footnote count plus one
- [ ] Removing a footnote command deletes the matching node by `id`
- [ ] Footnote renumbering runs in a ProseMirror plugin `appendTransaction(...)`
- [ ] Footnote renumbering updates every footnote node whose stored `number` no longer matches document order
- [ ] Footnote marker HTML renders as a `<sup>` containing the footnote number
- [ ] Hovering a footnote marker waits 300 ms before showing the tooltip editor
- [ ] Footnote tooltip title reads `Footnote <number>`
- [ ] Footnote tooltip textarea saves on blur rather than on every keystroke
- [ ] Footnote tooltip delete button title is `Remove footnote`
- [ ] `FootnoteSection` does not render at all when the editor has zero footnotes
- [ ] `FootnoteSection` heading label is exactly `Footnotes`
- [ ] `FootnoteSection` sorts footnotes by numeric order before rendering
- [ ] Clicking a footnote row in `FootnoteSection` focuses the editor and moves selection to that footnote node position
- [ ] Outline plugin rebuilds the outline on every heading change with a 100 ms debounce
- [ ] Outline plugin still rebuilds section word counts on non-heading content changes using the standard 500 ms debounce
- [ ] Citation nodes are inline atomic nodes with `referenceIds` defaulting to an empty array
