# editor — Spec 020

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Slash Commands: Academic Inserts
- [x] Slash command `Table` inserts a `3 x 3` table
- [x] Slash command `Table` inserts the table with `withHeaderRow: true`
- [x] Slash command `Table` runs a `requestAnimationFrame(...)` post-pass to add class `academic-table` to the rendered table element
- [x] Slash command `Image` description is `Insert an image`
- [x] Slash command `Image` creates a hidden file input rather than opening a URL prompt
- [x] Slash command `Image` accepts `image/*` files only
- [x] Cancelling the slash image file picker removes the temporary input and inserts nothing
- [x] Selecting an image reads the file through `FileReader.readAsDataURL(...)`
- [x] Slash image insertion inserts a base64 image into the editor
- [x] Slash command `Abstract` inserts a heading `Abstract`
- [x] Slash command `Abstract` inserts four following paragraph starters `Background:`, `Methods:`, `Results:`, and `Conclusion:`
- [x] Slash command `Abstract` bolds each structured heading label inside the inserted paragraphs
- [x] Slash command `Figure Caption` auto-counts existing `Figure N` paragraphs before inserting the next caption number
- [x] Slash command `Figure Caption` inserts bold prefix `Figure <n>. `
- [x] Slash command `Figure Caption` default trailing text is `Caption text here`
- [x] Slash command `Table Caption` auto-counts existing `Table N` paragraphs before inserting the next caption number
- [x] Slash command `Table Caption` inserts bold prefix `Table <n>. `
- [x] Slash command `Table Caption` default trailing text is `Caption text here`
- [x] Slash command `Footnote` opens `prompt("Enter footnote text:")`
- [x] Cancelling the footnote prompt inserts no footnote node
- [x] Slash command `Cite` description is `Insert a citation from your library`
- [x] Slash command `Cite` shortcut label is `Cmd+Shift+C`
- [x] Slash command `Cite` opens the citation dialog via the shared `scholarsync:editor-action` contract with `action: "insert-citation"`
#### Slash Commands: AI Actions and Tool Actions
- [x] Slash command `Continue Writing` dispatches `scholarsync:ai-action` with `action: "continue"`
- [x] Slash command `Continue Writing` sends the full editor plain text as `detail.context`
- [x] Slash command `Outline Section` dispatches `scholarsync:ai-action` with `action: "outline-section"`
- [x] Slash command `Check Guidelines` dispatches `scholarsync:ai-action` with `action: "check-guidelines"`
- [x] Slash command `Ask AI` dispatches `scholarsync:ai-action` with `action: "ask"` and no insertion side effect
- [x] Slash command `Word Count` dispatches `scholarsync:editor-action` with `action: "show-word-count"`
- [x] Executing a slash command always deletes the typed slash trigger range before running the command
#### Custom Keyboard Shortcuts and Extension Configuration
- [x] Academic keyboard shortcut `Mod-Shift-X` toggles strikethrough
- [x] Academic keyboard shortcut `Mod-Shift-H` toggles highlight
- [x] Academic keyboard shortcut `Mod-Shift-K` opens `window.prompt("Enter URL:")`
- [x] Leaving the keyboard-shortcut link prompt empty does not set a link
- [x] Academic keyboard shortcut `Mod-Shift-.` toggles superscript
