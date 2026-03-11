# studio — Spec 013

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Quick Test Workflows
#### TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)
- [ ] `flushSave` extracts content via `doc.toJSON()`, plain text via `doc.textBetween(0, doc.content.size, "\n")`, and word count via `getDocumentWordCount(doc)`
- [ ] Editor renders sub-components: `Toolbar`, `SelectionToolbar`, `LinkPopover`, `DocumentOutline`, `EditorContent`, `FootnoteSection`
- [ ] `SelectionToolbar` and `LinkPopover` and `DocumentOutline` only render when `editor` is truthy
- [ ] OutlinePlugin configured with `debounceMs: 500`
- [ ] Initial outline computed 300ms after editor ready — heading list only shown if ≥2 headings exist (otherwise outline set to empty)
- [ ] `contentKey` change triggers `editor.commands.setContent(content)` or `editor.commands.clearContent()` for project switching
- [ ] Debounced save timer cleaned up on unmount via `useEffect` cleanup
- [ ] Custom `CitationNumbering` extension wraps `createCitationPlugin()` as a ProseMirror plugin
#### Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)
- [ ] `Cmd+Shift+X` toggles strikethrough
- [ ] `Cmd+Shift+H` toggles highlight
- [ ] `Cmd+Shift+K` inserts link — prompts URL via `window.prompt("Enter URL:")`
- [ ] `Cmd+Shift+.` toggles superscript
- [ ] `Cmd+Shift+,` toggles subscript
- [ ] `Cmd+Shift+F` inserts footnote — prompts text via `window.prompt("Footnote text:")`
- [ ] `Cmd+/` toggles Comment Sidebar — dispatches `scholarsync:editor-action` with `action: "toggle-comment-sidebar"`
- [ ] `Cmd+S` forces immediate save (handled in editorProps, not in this extension)
- [ ] `Cmd+Shift+Z` is the redo shortcut (from StarterKit), not `Ctrl+Y` as listed in section 15
- [ ] `Cmd+Shift+Enter` inserts horizontal rule
- [ ] Heading shortcuts in the extension use `Mod-Shift-1` through `Mod-Shift-4` (i.e., `Cmd+Shift+1-4`), not `Cmd+Opt+1-4`
- [ ] `Cmd+Shift+C` in the extension dispatches `scholarsync:editor-action` with `action: "insert-citation"` — however the page's `scholarsync:editor-action` listener does NOT handle `insert-citation`, only `show-word-count`, `add-comment`, and `toggle-comment-sidebar`
- [ ] `Cmd+Shift+R` in the extension dispatches `scholarsync:editor-action` with `action: "toggle-reference-sidebar"` — the page has a separate `document.addEventListener("keydown")` handler for `Cmd+Shift+R` which calls `toggleSidebar()`
#### Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)
- [ ] 23 total slash commands defined in `structuralCommands` array
- [ ] Slash trigger character `/` is allowed at start of parent block (parentOffset === 0) or after a space or newline
- [ ] Slash command "Text": description "Plain paragraph text", icon `paragraph`, category `basic`
- [ ] Slash command "Heading 1": description "Manuscript title", icon `h1`, shortcut label `Cmd+Opt+1`, category `basic`
- [ ] Slash command "Heading 2": description "IMRAD sections", icon `h2`, shortcut label `Cmd+Opt+2`, category `basic`
- [ ] Slash command "Heading 3": description "Subsections", icon `h3`, shortcut label `Cmd+Opt+3`, category `basic`
- [ ] Slash command "Heading 4": description "Sub-subsections", icon `h4`, shortcut label `Cmd+Opt+4`, category `basic`
- [ ] Slash command "Bullet List": description "Unordered list", icon `bullet`, shortcut label `Cmd+Shift+8`, category `basic`, calls `toggleBulletList()`
- [ ] Slash command "Numbered List": description "Ordered list", icon `numbered`, shortcut label `Cmd+Shift+7`, category `basic`, calls `toggleOrderedList()`
- [ ] Slash command "Checklist": description "Task checklist", icon `checklist`, shortcut label `Cmd+Shift+9`, category `basic`, calls `toggleTaskList()`
- [ ] Slash command "Block Quote": description "Quote text", icon `quote`, category `basic`, calls `toggleBlockquote()`
- [ ] Slash command "Divider": description "Horizontal rule", icon `divider`, category `basic`, calls `setHorizontalRule()`
- [ ] Slash command "Code Block": description "For statistical code", icon `code`, category `basic`, calls `toggleCodeBlock()`
- [ ] Slash command "Table": description "Insert data table", icon `table`, category `academic`, inserts `{ rows: 3, cols: 3, withHeaderRow: true }` and applies `academic-table` class via `requestAnimationFrame`
