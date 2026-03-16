# studio — Spec 012

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Quick Test Workflows
#### Page Architecture (`src/app/(app)/studio/page.tsx`)
- [x] PASS: PDF export silently returns when `/api/export/pdf` responds non-OK (no error UI, no console log on non-OK)
- [x] PASS: Word export silently returns when `/api/export/docx` responds non-OK (no error UI, no console log on non-OK)
- [x] PASS: Word export creates a temporary `<a>` element, appends it to `document.body`, triggers `.click()`, removes the element, and revokes the object URL
- [x] PASS: `getEditorContent()` reads HTML from `document.querySelector(".ProseMirror")?.innerHTML` — returns empty string if no `.ProseMirror` element exists
- [x] PASS: Content-change save does NOT transition through `unsaved` — goes directly from current status to `saving` when debounce fires (only title changes go through `unsaved`)
#### Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)
- [x] PASS: Question mark (`?`) button in the status bar (between save indicator and export dropdown) opens `KeyboardShortcutsDialog`
- [x] PASS: Question button styled: `w-8 h-8 rounded-lg text-ink-muted hover:text-ink bg-surface-raised hover:bg-surface-raised/80 border border-border`
- [x] PASS: Dialog renders as fixed full-screen overlay with `bg-black/50` backdrop at `z-50`
- [x] PASS: Clicking the backdrop overlay dismisses the dialog (`onClick={onClose}` on wrapper)
- [x] PASS: Dialog content stops propagation (`e.stopPropagation()`) to prevent backdrop dismiss when clicking inside
- [x] PASS: Dialog header: `Keyboard` icon (20px, `text-brand`) + title text `Keyboard Shortcuts` (text-lg font-semibold)
- [x] PASS: Dialog close button: `X` icon (20px) in top-right of header
- [x] PASS: Dialog max width: `max-w-2xl`, max height: `max-h-[80vh]`, overflow hidden on outer, scrollable content area
- [x] PASS: Dialog has 4 shortcut categories displayed in order: `Formatting`, `Structure`, `Academic`, `Tools`
- [x] PASS: "Formatting" category lists 8 shortcuts: Bold `Cmd+B`, Italic `Cmd+I`, Underline `Cmd+U`, Strikethrough `Cmd+Shift+X`, Highlight `Cmd+Shift+H`, Superscript `Cmd+Shift+.`, Subscript `Cmd+Shift+,`, Inline Code `Cmd+E`
- [x] PASS: "Structure" category lists 8 shortcuts: Heading 1–4 `Cmd+Shift+1-4`, Bullet List `Cmd+Shift+8`, Ordered List `Cmd+Shift+7`, Blockquote `Cmd+Shift+B`, Horizontal Rule `Cmd+Shift+Enter`
- [x] PASS: "Academic" category lists 3 shortcuts: Insert Citation `Cmd+Shift+C`, Insert Footnote `Cmd+Shift+F`, Insert Link `Cmd+Shift+K`
- [x] PASS: "Tools" category lists 5 shortcuts: Undo `Cmd+Z`, Redo `Cmd+Shift+Z`, Save `Cmd+S`, Toggle Comments `Cmd+/`, Slash Commands `/`
- [x] PASS: Shortcuts displayed in 2-column grid (`grid-cols-2 gap-2`) within each category
- [x] PASS: Each shortcut row shows description text on left and key pills on right (`px-1.5 py-0.5 text-xs font-medium text-ink-muted bg-surface border border-border rounded`)
- [x] PASS: Category headers styled as uppercase tracking-wider text-xs font-semibold text-ink-muted
#### TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)
- [x] PASS: StarterKit configured with `heading: { levels: [1, 2, 3, 4, 5, 6] }` — supports 6 heading levels, not 4
- [x] PASS: Highlight extension configured with `multicolor: true`
- [x] PASS: TextAlign extension configured for types `["heading", "paragraph"]`
- [x] PASS: TextStyle, Color, and FontFamily extensions loaded — enabling inline color and font changes
- [x] PASS: Link extension configured: `openOnClick: false`, `autolink: true`, `linkOnPaste: true`
- [x] PASS: Table extension configured: `resizable: true`, HTMLAttributes class `academic-table`
- [x] PASS: Image extension configured: `inline: false`, `allowBase64: true`
- [x] PASS: TaskItem extension configured: `nested: true` — supports nested task lists
- [x] PASS: Placeholder text reads `Start typing or press '/' for AI commands...`
- [x] PASS: CharacterCount and Typography extensions loaded
- [x] PASS: `immediatelyRender: false` set on `useEditor` — prevents server-side rendering mismatch
- [x] PASS: Editor editorProps attributes class: `academic-editor-content max-w-none focus:outline-none min-h-[calc(100vh-12rem)] px-6 py-4`
- [x] PASS: Editor `spellcheck` attribute set to `"true"`
- [x] PASS: `Cmd+S` key handler in editorProps calls `flushSave(view.state.doc)` — saves immediately bypassing debounce timer
