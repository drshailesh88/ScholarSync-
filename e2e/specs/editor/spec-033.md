# editor — Spec 033

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Research Store Persistence and Defaults
- [x] PASS: Research store default `chatScope` is `"library"`
- [x] PASS: Research store `generateId()` format: `"${Date.now()}_${Math.random().toString(36).slice(2, 9)}"`
- [x] PASS: Research store `setSidebarWidth()` clamps input to minimum 320 and maximum 520 pixels
#### ResearchSidebar UI Details
- [x] PASS: ResearchSidebar collapsed state shows a `Books` icon button with tooltip `"Open Research Sidebar (Cmd+Shift+L)"`
- [x] PASS: ResearchSidebar close button title is `"Close (Cmd+Shift+L)"`
- [x] PASS: ResearchSidebar expanded header text is `"Literature Research"`
- [x] PASS: ResearchSidebar resize handle has `z-10` positioning
- [x] PASS: ResearchSidebar tabs in expanded mode are: `"Search"`, `"Library"`, `"Chat"`
#### Offline Queue and Save Retry Details
- [x] PASS: Offline queue localStorage key is `"scholarsync_save_queue"`
- [x] PASS: Offline queue `enqueueSave()` replaces any existing queued save for the same `documentId` (deduplication)
- [x] PASS: Offline queue save IDs are formatted as `"{documentId}-{Date.now()}"`
- [x] PASS: Offline queue `processQueue()` processes saves sorted by `timestamp` ascending (oldest first)
- [x] PASS: Offline queue `processQueue()` returns `{ processed: number; failed: number }` counts
- [x] PASS: Save retry `withRetry()` adds random jitter of 0-500ms (`Math.random() * 500`) on top of exponential backoff
- [x] PASS: Save retry total attempts is `maxRetries + 1` (default: 4 total attempts, not 3)
#### Word Counter Details
- [x] PASS: `countWords()` splits text on `/\s+/` and filters empty strings, counting only non-empty tokens
- [x] PASS: `countSectionWords()` returns keys in format `"{heading text}__{position}"` (double underscore separator)
- [x] PASS: `countSectionWords()` only counts `node.isTextblock` nodes that are NOT headings themselves
#### Editor-route SaveStatus vs Store SaveStatus Mismatch
- [x] PASS: Editor store `SaveStatus.state` type is `"saved" | "saving" | "unsaved" | "offline"` (4 values)
- [x] PASS: `useEditorDocument` hook defines its own `SaveStatus` as `"saved" | "saving" | "unsaved" | "error" | "offline" | "local"` (6 values)
- [x] PASS: `useStudioDocument` hook defines `SaveStatus` as `"idle" | "unsaved" | "saving" | "saved" | "error"` (5 values, includes `"idle"` but not `"offline"` or `"local"`)
- [x] PASS: TopBar save indicator only handles `saved`, `saving`, `unsaved`, and `offline` states — the `error` and `local` states from the hook are rendered by the editor page header bar, not by TopBar
#### Export API Route Internals
- [x] PASS: DOCX export API route validates: `title` max 500 chars, `content` max 500,000 chars, `citations` array max 1,000 items
- [x] PASS: PDF export API route uses the same validation schema as DOCX
- [x] PASS: DOCX export API uses `docx` library (server-side) with Times New Roman font throughout
- [x] PASS: PDF export API uses `pdf-lib` library with embedded TimesRoman, TimesRomanBold, and TimesRomanBoldItalic fonts
- [x] PASS: PDF export API page size is US Letter (612 x 792 points) with 72-point (1-inch) margins on all sides
- [x] PASS: PDF export API line spacing is 24 points (double-spaced) with first-line paragraph indent of 36 points
- [x] PASS: DOCX export API line spacing is 480 twips (double-spaced) with hanging indent of 720 twips for references
- [x] PASS: DOCX export uses page header with document title in italics at 10pt and page number in footer
- [x] PASS: Both export APIs apply rate limiting via `RATE_LIMITS.export`
- [x] PASS: Both export APIs return `{ error: "Authentication required" }` with 401 for unauthenticated requests
- [x] PASS: Both export APIs return `{ error: "Content is required" }` with 400 when content is empty
- [x] PASS: Both export APIs return `{ error: "Export failed" }` with 500 for unhandled server errors
#### tiptap-to-docx Converter Details
- [x] PASS: `tiptapToDocx()` converter renders footnotes under a section heading `"Notes"` (not `"Footnotes"`)

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Source verification covered `src/stores/research-store.ts`, `src/components/research/ResearchSidebar.tsx`, `src/lib/editor/offline-queue.ts`, `src/lib/editor/save-retry.ts`, `src/lib/editor/word-counter.ts`, `src/stores/editor-store.ts`, `src/hooks/use-editor-document.ts`, `src/hooks/use-studio-document.ts`, `src/components/editor/TopBar.tsx`, `src/app/api/export/docx/route.ts`, `src/app/api/export/pdf/route.ts`, `src/components/export/tiptap-to-docx.ts`, and `src/lib/rate-limit.ts`.
  - Fixed one product mismatch in `src/app/api/export/pdf/route.ts` by removing the deprecated `preview` schema field and HTML preview branch so the PDF route now matches the DOCX export contract; added focused coverage in `src/app/api/export/pdf/__tests__/route.test.ts`.
  - Focused tests passed in `src/app/api/export/pdf/__tests__/route.test.ts`, `src/lib/editor/__tests__/document-persistence.test.ts`, `src/lib/editor/__tests__/studio-hardening.test.ts`, and `src/lib/citations/__tests__/citation-pipeline.test.ts` (80 tests total).
-->
