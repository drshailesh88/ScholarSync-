# editor — Spec 030

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Studio Chat Internals
- [ ] Studio conversation mode is `"draft"` when in Write mode (not `"write"`)
- [ ] Studio conversation mode is `"learn"` when in Learn mode
- [ ] Studio chat streaming uses `TextDecoder` with `{ stream: true }` option for incremental decoding
- [ ] Studio chat streaming mutates the `assistantMsg.content` string directly before calling `setMessages` to update state
- [ ] Studio chat sends assistant message content to `addMessage()` only after the entire stream is complete (not during streaming)
- [ ] Studio chat `addMessage()` calls for both user and assistant messages use `.catch(() => {})` to silently swallow persistence errors
#### Studio Integrity Panel Wiring
- [ ] Studio `Checks` tab feeds `IntegrityPanel` the document text from `editorRef.current?.view.dom.innerText?.trim()` first, falling back to `editor.getText()`
- [ ] Studio passes sorted cited references to `IntegrityPanel` as `sources` prop, including title, doi, pmid, authors, and year
- [ ] IntegrityPanel `sources` author formatting handles both string and `{given, family}` object author formats
- [ ] IntegrityPanel API request body truncates document text to first 50,000 characters: `text.slice(0, 50000)`
- [ ] IntegrityPanel API endpoint is `/api/integrity-check` (POST)
- [ ] IntegrityPanel error message for short documents is exactly `"Document must have at least 50 characters to check."`
#### Studio Export Internals
- [ ] Studio `getEditorContent()` reads the raw HTML from `document.querySelector(".ProseMirror")?.innerHTML`
- [ ] Studio PDF export response is read as `.text()` and written into a new window via `document.write()`, not as a binary PDF blob
- [ ] Studio Word export filename regex replaces ALL non-alphanumeric characters (including spaces) via `/[^a-zA-Z0-9]/g` with underscores
- [ ] Studio Word export creates a temporary `<a>` element, appends it to `document.body`, programmatically clicks it, then removes it and revokes the object URL
#### TiptapEditor (Studio) vs AcademicEditor Differences
- [ ] Studio `TiptapEditor` editor content CSS class is `"academic-editor-content max-w-none focus:outline-none min-h-[calc(100vh-12rem)] px-6 py-4"` — does NOT include `prose prose-lg`
- [ ] AcademicEditor editor content CSS class includes `"prose prose-lg"` which Studio's version omits, resulting in different default typography styles
- [ ] Studio `TiptapEditor` vertical padding is `py-4` (16px) vs AcademicEditor's `py-8` (32px)
- [ ] Both editors set `immediatelyRender: false` on `useEditor`, disabling server-side rendering of editor content
- [ ] AcademicEditor wrapper max width is `max-w-[720px]` with `mx-auto px-6`
- [ ] Studio `TiptapEditor` supports heading levels `[1, 2, 3, 4, 5, 6]` vs AcademicEditor's `[1, 2, 3, 4]`
- [ ] Both editors load `CharacterCount` extension but neither exposes a character count value in the UI
- [ ] Both editors load `Typography` extension for automatic smart quote and typographic substitution
- [ ] AcademicEditor configures `Highlight.configure({ multicolor: true })` enabling multi-color highlight support
- [ ] AcademicEditor configures `TiptapImage.configure({ inline: false, allowBase64: true })` making images block-level elements
- [ ] AcademicEditor configures `Placeholder.configure({ showOnlyCurrent: true, includeChildren: true })` showing placeholder only in the currently focused empty block
- [ ] AcademicEditor `Table` extension applies `academic-table` class via `HTMLAttributes.class` directly (not via requestAnimationFrame post-pass like the slash command does)
- [ ] AcademicEditor returns `null` (renders nothing) when the `useEditor` hook has not yet initialized
#### Editor Config Constants (Defined But Not All Wired)
- [ ] `EDITOR_SHORTCUTS` constant in `editor-config.ts` defines `clearFormatting: "Mod-\\"` but this shortcut is NOT registered in `AcademicKeyboardShortcuts`
- [ ] `EDITOR_SHORTCUTS` defines heading shortcuts as `"Mod-Alt-1"` through `"Mod-Alt-4"` but the actual `AcademicKeyboardShortcuts` extension registers them as `"Mod-Shift-1"` through `"Mod-Shift-4"`
- [ ] `EDITOR_SHORTCUTS` defines `documentOutline: "Mod-Shift-o"` but this shortcut is NOT wired in any extension or event listener
- [ ] `EDITOR_SHORTCUTS` defines `find: "Mod-f"` and `findReplace: "Mod-Shift-h"` but neither find nor find-replace functionality is implemented
- [ ] `EDITOR_SHORTCUTS` defines `insertComment: "Mod-Shift-m"` but the actual comment shortcut is `"Mod-/"` via `AcademicKeyboardShortcuts`
- [ ] `EDITOR_SHORTCUTS` defines `suggestingMode: "Mod-Shift-s"` but suggesting/track-changes mode is not implemented
