# editor — Spec 033

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Research Store Persistence and Defaults
- [ ] Research store default `chatScope` is `"library"`
- [ ] Research store `generateId()` format: `"${Date.now()}_${Math.random().toString(36).slice(2, 9)}"`
- [ ] Research store `setSidebarWidth()` clamps input to minimum 320 and maximum 520 pixels
#### ResearchSidebar UI Details
- [ ] ResearchSidebar collapsed state shows a `Books` icon button with tooltip `"Open Research Sidebar (Cmd+Shift+L)"`
- [ ] ResearchSidebar close button title is `"Close (Cmd+Shift+L)"`
- [ ] ResearchSidebar expanded header text is `"Literature Research"`
- [ ] ResearchSidebar resize handle has `z-10` positioning
- [ ] ResearchSidebar tabs in expanded mode are: `"Search"`, `"Library"`, `"Chat"`
#### Offline Queue and Save Retry Details
- [ ] Offline queue localStorage key is `"scholarsync_save_queue"`
- [ ] Offline queue `enqueueSave()` replaces any existing queued save for the same `documentId` (deduplication)
- [ ] Offline queue save IDs are formatted as `"{documentId}-{Date.now()}"`
- [ ] Offline queue `processQueue()` processes saves sorted by `timestamp` ascending (oldest first)
- [ ] Offline queue `processQueue()` returns `{ processed: number; failed: number }` counts
- [ ] Save retry `withRetry()` adds random jitter of 0-500ms (`Math.random() * 500`) on top of exponential backoff
- [ ] Save retry total attempts is `maxRetries + 1` (default: 4 total attempts, not 3)
#### Word Counter Details
- [ ] `countWords()` splits text on `/\s+/` and filters empty strings, counting only non-empty tokens
- [ ] `countSectionWords()` returns keys in format `"{heading text}__{position}"` (double underscore separator)
- [ ] `countSectionWords()` only counts `node.isTextblock` nodes that are NOT headings themselves
#### Editor-route SaveStatus vs Store SaveStatus Mismatch
- [ ] Editor store `SaveStatus.state` type is `"saved" | "saving" | "unsaved" | "offline"` (4 values)
- [ ] `useEditorDocument` hook defines its own `SaveStatus` as `"saved" | "saving" | "unsaved" | "error" | "offline" | "local"` (6 values)
- [ ] `useStudioDocument` hook defines `SaveStatus` as `"idle" | "unsaved" | "saving" | "saved" | "error"` (5 values, includes `"idle"` but not `"offline"` or `"local"`)
- [ ] TopBar save indicator only handles `saved`, `saving`, `unsaved`, and `offline` states — the `error` and `local` states from the hook are rendered by the editor page header bar, not by TopBar
#### Export API Route Internals
- [ ] DOCX export API route validates: `title` max 500 chars, `content` max 500,000 chars, `citations` array max 1,000 items
- [ ] PDF export API route uses the same validation schema as DOCX
- [ ] DOCX export API uses `docx` library (server-side) with Times New Roman font throughout
- [ ] PDF export API uses `pdf-lib` library with embedded TimesRoman, TimesRomanBold, and TimesRomanBoldItalic fonts
- [ ] PDF export API page size is US Letter (612 x 792 points) with 72-point (1-inch) margins on all sides
- [ ] PDF export API line spacing is 24 points (double-spaced) with first-line paragraph indent of 36 points
- [ ] DOCX export API line spacing is 480 twips (double-spaced) with hanging indent of 720 twips for references
- [ ] DOCX export uses page header with document title in italics at 10pt and page number in footer
- [ ] Both export APIs apply rate limiting via `RATE_LIMITS.export`
- [ ] Both export APIs return `{ error: "Authentication required" }` with 401 for unauthenticated requests
- [ ] Both export APIs return `{ error: "Content is required" }` with 400 when content is empty
- [ ] Both export APIs return `{ error: "Export failed" }` with 500 for unhandled server errors
#### tiptap-to-docx Converter Details
- [ ] `tiptapToDocx()` converter renders footnotes under a section heading `"Notes"` (not `"Footnotes"`)
