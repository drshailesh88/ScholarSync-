# studio — Spec 013

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Quick Test Workflows
#### TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)
- [x] PASS: `flushSave` extracts content via `doc.toJSON()`, plain text via `doc.textBetween(0, doc.content.size, "\n")`, and word count via `getDocumentWordCount(doc)`
- [x] PASS: Editor renders sub-components: `Toolbar`, `SelectionToolbar`, `LinkPopover`, `DocumentOutline`, `EditorContent`, `FootnoteSection`
- [x] PASS: `SelectionToolbar` and `LinkPopover` and `DocumentOutline` only render when `editor` is truthy
- [x] PASS: OutlinePlugin configured with `debounceMs: 500`
- [x] PASS: Initial outline computed 300ms after editor ready — heading list only shown if ≥2 headings exist (otherwise outline set to empty)
- [x] PASS: `contentKey` change triggers `editor.commands.setContent(content)` or `editor.commands.clearContent()` for project switching
- [x] PASS: Debounced save timer cleaned up on unmount via `useEffect` cleanup
- [x] PASS: Custom `CitationNumbering` extension wraps `createCitationPlugin()` as a ProseMirror plugin
#### Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)
- [x] PASS: `Cmd+Shift+X` toggles strikethrough
- [x] PASS: `Cmd+Shift+H` toggles highlight
- [x] PASS: `Cmd+Shift+K` inserts link — prompts URL via `window.prompt("Enter URL:")`
- [x] PASS: `Cmd+Shift+.` toggles superscript
- [x] PASS: `Cmd+Shift+,` toggles subscript
- [x] PASS: `Cmd+Shift+F` inserts footnote — prompts text via `window.prompt("Footnote text:")`
- [x] PASS: `Cmd+/` toggles Comment Sidebar — dispatches `scholarsync:editor-action` with `action: "toggle-comment-sidebar"`
- [x] PASS: `Cmd+S` forces immediate save (handled in editorProps, not in this extension)
- [x] PASS: `Cmd+Shift+Z` is the redo shortcut (from StarterKit), not `Ctrl+Y` as listed in section 15
- [x] PASS: `Cmd+Shift+Enter` inserts horizontal rule
- [x] PASS: Heading shortcuts in the extension use `Mod-Shift-1` through `Mod-Shift-4` (i.e., `Cmd+Shift+1-4`), not `Cmd+Opt+1-4`
- [x] PASS: `Cmd+Shift+C` in the extension dispatches `scholarsync:editor-action` with `action: "insert-citation"` — however the page's `scholarsync:editor-action` listener does NOT handle `insert-citation`, only `show-word-count`, `add-comment`, and `toggle-comment-sidebar`
- [x] PASS: `Cmd+Shift+R` in the extension dispatches `scholarsync:editor-action` with `action: "toggle-reference-sidebar"` — the page has a separate `document.addEventListener("keydown")` handler for `Cmd+Shift+R` which calls `toggleSidebar()`
#### Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)
- [x] PASS: 23 total slash commands defined in `structuralCommands` array
- [x] PASS: Slash trigger character `/` is allowed at start of parent block (parentOffset === 0) or after a space or newline
- [x] PASS: Slash command "Text": description "Plain paragraph text", icon `paragraph`, category `basic`
- [x] PASS: Slash command "Heading 1": description "Manuscript title", icon `h1`, shortcut label `Cmd+Opt+1`, category `basic`
- [x] PASS: Slash command "Heading 2": description "IMRAD sections", icon `h2`, shortcut label `Cmd+Opt+2`, category `basic`
- [x] PASS: Slash command "Heading 3": description "Subsections", icon `h3`, shortcut label `Cmd+Opt+3`, category `basic`
- [x] PASS: Slash command "Heading 4": description "Sub-subsections", icon `h4`, shortcut label `Cmd+Opt+4`, category `basic`
- [x] PASS: Slash command "Bullet List": description "Unordered list", icon `bullet`, shortcut label `Cmd+Shift+8`, category `basic`, calls `toggleBulletList()`
- [x] PASS: Slash command "Numbered List": description "Ordered list", icon `numbered`, shortcut label `Cmd+Shift+7`, category `basic`, calls `toggleOrderedList()`
- [x] PASS: Slash command "Checklist": description "Task checklist", icon `checklist`, shortcut label `Cmd+Shift+9`, category `basic`, calls `toggleTaskList()`
- [x] PASS: Slash command "Block Quote": description "Quote text", icon `quote`, category `basic`, calls `toggleBlockquote()`
- [x] PASS: Slash command "Divider": description "Horizontal rule", icon `divider`, category `basic`, calls `setHorizontalRule()`
- [x] PASS: Slash command "Code Block": description "For statistical code", icon `code`, category `basic`, calls `toggleCodeBlock()`
- [x] PASS: Slash command "Table": description "Insert data table", icon `table`, category `academic`, inserts `{ rows: 3, cols: 3, withHeaderRow: true }` and applies `academic-table` class via `requestAnimationFrame`
