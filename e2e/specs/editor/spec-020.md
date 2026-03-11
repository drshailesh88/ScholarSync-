# editor — Spec 020

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Slash Commands: Academic Inserts
- [ ] Slash command `Table` inserts a `3 x 3` table
- [ ] Slash command `Table` inserts the table with `withHeaderRow: true`
- [ ] Slash command `Table` runs a `requestAnimationFrame(...)` post-pass to add class `academic-table` to the rendered table element
- [ ] Slash command `Image` description is `Insert an image`
- [ ] Slash command `Image` creates a hidden file input rather than opening a URL prompt
- [ ] Slash command `Image` accepts `image/*` files only
- [ ] Cancelling the slash image file picker removes the temporary input and inserts nothing
- [ ] Selecting an image reads the file through `FileReader.readAsDataURL(...)`
- [ ] Slash image insertion inserts a base64 image into the editor
- [ ] Slash command `Abstract` inserts a heading `Abstract`
- [ ] Slash command `Abstract` inserts four following paragraph starters `Background:`, `Methods:`, `Results:`, and `Conclusion:`
- [ ] Slash command `Abstract` bolds each structured heading label inside the inserted paragraphs
- [ ] Slash command `Figure Caption` auto-counts existing `Figure N` paragraphs before inserting the next caption number
- [ ] Slash command `Figure Caption` inserts bold prefix `Figure <n>. `
- [ ] Slash command `Figure Caption` default trailing text is `Caption text here`
- [ ] Slash command `Table Caption` auto-counts existing `Table N` paragraphs before inserting the next caption number
- [ ] Slash command `Table Caption` inserts bold prefix `Table <n>. `
- [ ] Slash command `Table Caption` default trailing text is `Caption text here`
- [ ] Slash command `Footnote` opens `prompt("Enter footnote text:")`
- [ ] Cancelling the footnote prompt inserts no footnote node
- [ ] Slash command `Cite` description is `Insert a citation from your library`
- [ ] Slash command `Cite` shortcut label is `Cmd+Shift+C`
- [ ] Slash command `Cite` opens the citation dialog via `scholarsync:open-citation-dialog`
#### Slash Commands: AI Actions and Tool Actions
- [ ] Slash command `Continue Writing` dispatches `scholarsync:ai-action` with `action: "continue"`
- [ ] Slash command `Continue Writing` sends the full editor plain text as `detail.context`
- [ ] Slash command `Outline Section` dispatches `scholarsync:ai-action` with `action: "outline-section"`
- [ ] Slash command `Check Guidelines` dispatches `scholarsync:ai-action` with `action: "check-guidelines"`
- [ ] Slash command `Ask AI` dispatches `scholarsync:ai-action` with `action: "ask"` and no insertion side effect
- [ ] Slash command `Word Count` dispatches `scholarsync:editor-action` with `action: "show-word-count"`
- [ ] Executing a slash command always deletes the typed slash trigger range before running the command
#### Custom Keyboard Shortcuts and Extension Configuration
- [ ] Academic keyboard shortcut `Mod-Shift-X` toggles strikethrough
- [ ] Academic keyboard shortcut `Mod-Shift-H` toggles highlight
- [ ] Academic keyboard shortcut `Mod-Shift-K` opens `window.prompt("Enter URL:")`
- [ ] Leaving the keyboard-shortcut link prompt empty does not set a link
- [ ] Academic keyboard shortcut `Mod-Shift-.` toggles superscript
