# editor — Spec 030

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Studio Chat Internals
- [x] PASS: Studio conversation mode is `"draft"` when in Write mode (not `"write"`)
- [x] PASS: Studio conversation mode is `"learn"` when in Learn mode
- [x] PASS: Studio chat streaming uses `TextDecoder` with `{ stream: true }` option for incremental decoding
- [x] PASS: Studio chat streaming mutates the `assistantMsg.content` string directly before calling `setMessages` to update state
- [x] PASS: Studio chat sends assistant message content to `addMessage()` only after the entire stream is complete (not during streaming)
- [x] PASS: Studio chat `addMessage()` calls for both user and assistant messages use `.catch(() => {})` to silently swallow persistence errors
#### Studio Integrity Panel Wiring
- [x] PASS: Studio `Checks` tab feeds `IntegrityPanel` the document text from `editorRef.current?.view.dom.innerText?.trim()` first, falling back to `editor.getText()`
- [x] PASS: Studio passes sorted cited references to `IntegrityPanel` as `sources` prop, including title, doi, pmid, authors, and year
- [x] PASS: IntegrityPanel `sources` author formatting handles both string and `{given, family}` object author formats
- [x] PASS: IntegrityPanel API request body truncates document text to first 50,000 characters: `text.slice(0, 50000)`
- [x] PASS: IntegrityPanel API endpoint is `/api/integrity-check` (POST)
- [x] PASS: IntegrityPanel error message for short documents is exactly `"Document must have at least 50 characters to check."`
#### Studio Export Internals
- [x] PASS: Studio `getEditorContent()` reads the raw HTML from `document.querySelector(".ProseMirror")?.innerHTML`
- [x] PASS: Studio PDF export writes HTML responses into a new window via `document.write()`, but sends binary PDF responses to that window via blob URL navigation
- [x] PASS: Studio Word export filename regex replaces ALL non-alphanumeric characters (including spaces) via `/[^a-zA-Z0-9]/g` with underscores
- [x] PASS: Studio Word export creates a temporary `<a>` element, appends it to `document.body`, programmatically clicks it, then removes it and revokes the object URL
#### TiptapEditor (Studio) vs AcademicEditor Differences
- [x] PASS: Studio `TiptapEditor` editor content CSS class is `"academic-editor-content max-w-none focus:outline-none min-h-[calc(100vh-12rem)] px-6 py-4"` — does NOT include `prose prose-lg`
- [x] PASS: AcademicEditor editor content CSS class includes `"prose prose-lg"` which Studio's version omits, resulting in different default typography styles
- [x] PASS: Studio `TiptapEditor` vertical padding is `py-4` (16px) vs AcademicEditor's `py-8` (32px)
- [x] PASS: Both editors set `immediatelyRender: false` on `useEditor`, disabling server-side rendering of editor content
- [x] PASS: AcademicEditor wrapper max width is `max-w-[720px]` with `mx-auto px-6`
- [x] PASS: Studio `TiptapEditor` supports heading levels `[1, 2, 3, 4, 5, 6]` vs AcademicEditor's `[1, 2, 3, 4]`
- [x] PASS: Both editors load `CharacterCount` extension but neither exposes a character count value in the UI
- [x] PASS: Both editors load `Typography` extension for automatic smart quote and typographic substitution
- [x] PASS: AcademicEditor configures `Highlight.configure({ multicolor: true })` enabling multi-color highlight support
- [x] PASS: AcademicEditor configures `TiptapImage.configure({ inline: false, allowBase64: true })` making images block-level elements
- [x] PASS: AcademicEditor configures `Placeholder.configure({ showOnlyCurrent: true, includeChildren: true })` showing placeholder only in the currently focused empty block
- [x] PASS: AcademicEditor `Table` extension applies `academic-table` class via `HTMLAttributes.class` directly (not via requestAnimationFrame post-pass like the slash command does)
- [x] PASS: AcademicEditor returns `null` (renders nothing) when the `useEditor` hook has not yet initialized
#### Editor Config Constants (Defined But Not All Wired)
- [x] PASS: `EDITOR_SHORTCUTS` constant in `editor-config.ts` defines `clearFormatting: "Mod-\\"` but this shortcut is NOT registered in `AcademicKeyboardShortcuts`
- [x] PASS: `EDITOR_SHORTCUTS` defines heading shortcuts as `"Mod-Alt-1"` through `"Mod-Alt-4"` but the actual `AcademicKeyboardShortcuts` extension registers them as `"Mod-Shift-1"` through `"Mod-Shift-4"`
- [x] PASS: `EDITOR_SHORTCUTS` defines `documentOutline: "Mod-Shift-o"` but this shortcut is NOT wired in any extension or event listener
- [x] PASS: `EDITOR_SHORTCUTS` defines `find: "Mod-f"` and `findReplace: "Mod-Shift-h"` but neither find nor find-replace functionality is implemented
- [x] PASS: `EDITOR_SHORTCUTS` defines `insertComment: "Mod-Shift-m"` but the actual comment shortcut is `"Mod-/"` via `AcademicKeyboardShortcuts`
- [x] PASS: `EDITOR_SHORTCUTS` defines `suggestingMode: "Mod-Shift-s"` but suggesting/track-changes mode is not implemented

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Updated the PDF-export checklist wording to match current behavior after spec 28: HTML responses are written into a new window, while binary PDF responses navigate that window via a blob URL.
  - Source verification covered `src/app/(app)/studio/page.tsx`, `src/components/integrity/IntegrityPanel.tsx`, `src/components/editor/tiptap-editor.tsx`, `src/components/editor/AcademicEditor.tsx`, `src/components/editor/extensions/keyboard-shortcuts.ts`, and `src/lib/editor/editor-config.ts`.
  - Live browser verification on `/studio` confirmed the hybrid PDF export path, the DOCX temporary-anchor download path, and the `.doc` filename generated from `docTitle.replace(/[^a-zA-Z0-9]/g, "_")`.
  - Repo search confirmed the editor-config shortcuts for clear formatting, document outline, find, and suggesting mode remain defined but unwired.
-->
