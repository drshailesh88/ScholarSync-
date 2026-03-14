# editor — Spec 034

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### tiptap-to-docx Converter Details
- [x] `tiptapToDocx()` converter renders bibliography under section heading `"References"`
- [x] `tiptapToDocx()` renders images as plain text: `"[Image: {alt || src || 'image'}]"`
- [x] `tiptapToDocx()` renders bullet list items with Unicode bullet prefix `"\u2022 "` (•)
- [x] `tiptapToDocx()` renders checked task items with `"\u2611"` (☑) and unchecked with `"\u2610"` (☐)
- [x] `tiptapToDocx()` renders citation superscripts at 18 half-points (9pt font size)
#### Chat API Route Details
- [x] Chat API Zod schema limits `messages` array to maximum 50 items
- [x] Chat API applies rate limiting via `RATE_LIMITS.ai`
- [x] Chat API selects `getGuideSystemPrompt()` only when `mode === "learn"` AND both `guideContext.documentType` and `guideContext.stage` exist
- [x] Chat API selects `getDraftSystemPrompt()` only when `mode === "draft"` AND `draftContext.intensity` exists
- [x] Chat API returns streaming response via `result.toTextStreamResponse()`
#### Reference Type System
- [x] `Reference.type` accepts 9 values: `"article"`, `"book"`, `"chapter"`, `"website"`, `"guideline"`, `"conference"`, `"thesis"`, `"preprint"`, `"other"` — and the Manual Entry form now exposes all 9 options including `"other"`
- [x] `Reference` interface includes optional fields not surfaced in any UI: `pmcid`, `url`, `publisher`, `keywords`, `notes`, `tags`, `pdfUrl`
- [x] `CSLItem` interface supports an open `[key: string]: unknown` index signature for arbitrary CSL-JSON fields
#### Guide Types Additional Details
- [x] `GuideContext` interface includes optional fields not used in Studio UI: `targetJournal`, `studyType`, `completedChecklist`, `socraticRounds`
- [x] `REPORTING_GUIDELINES` for `review_article` includes `"Narrative review best practices"` in addition to `"PRISMA"`
- [x] `REPORTING_GUIDELINES` for `book_chapter`, `academic_draft`, and `letter` are all empty arrays (no reporting guidelines mapped)
#### Slash Command Shortcut Label vs Actual Shortcut Mismatch
- [x] Slash menu heading commands display shortcut badges as `"Cmd+Shift+1"` through `"Cmd+Shift+4"`, matching the registered `Mod-Shift-1` through `Mod-Shift-4` keyboard shortcuts
- [x] Slash command `Block Quote` displays a `"Cmd+Shift+B"` shortcut badge in the menu
- [x] Slash command `Divider` displays a `"Cmd+Shift+Enter"` shortcut badge in the menu
- [x] Slash command `Code Block` displays a `"Cmd+Opt+C"` shortcut badge in the menu
#### TopBar Implementation Details
- [x] TopBar save status timestamp refreshes on a 30-second interval via `setInterval(..., 30000)`
- [x] TopBar word count button has `title="Click for section breakdown"`
- [x] TopBar section breakdown popover closes on `mousedown` outside event (not `click`)
- [x] TopBar mode dropdown uses a `fixed inset-0 z-40` overlay as click-catcher behind the `z-50` dropdown
- [x] TopBar reference badge button `title` is `"References"`, comment badge button `title` is `"Comments"`
#### Citation Dialog Identifier Detection
- [x] Citation dialog detects DOI queries by checking if query starts with `"10."` or contains `"doi.org/"`
- [x] Citation dialog detects PMID queries by checking if query is 1-8 digits only (regex pattern)
- [x] Citation dialog identifier detection banner is a clickable full-width button reading `"Resolve DOI: {id}"` or `"Resolve PMID: {id}"`
- [x] Citation dialog DOI/PMID resolution switches the active tab to `"doi"` before resolving
- [x] Citation dialog DOI-tab error includes a secondary `"Try manual entry"` link that switches to manual tab
- [x] Citation dialog DOI-tab error message for network failures is `"Network error. Please try again."`
- [x] Citation dialog DOI-tab error message for resolution failures is `data.error || "Could not resolve identifier."`
#### Editor Page Pending Citation Notice
- [x] Editor page pending citation notice with a paper title reads `Saved "{title}" to your library. Open Citation Dialog to cite it.`
- [x] Editor page pending citation notice without a title reads `Paper saved to your library. Open Citation Dialog to cite it.`
- [x] Editor page pending citation notice auto-dismisses after 5000ms (5 seconds), not 2500ms like Studio's citation notice

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Source verification covered `src/components/export/tiptap-to-docx.ts`, `src/app/api/chat/route.ts`, `src/types/citation.ts`, `src/types/guide.ts`, `src/components/editor/extensions/slash-commands.ts`, `src/components/editor/extensions/keyboard-shortcuts.ts`, `src/components/editor/TopBar.tsx`, `src/components/citations/citation-dialog.tsx`, `src/lib/editor/pending-citation-notice.ts`, and `src/app/(app)/editor/[id]/page.tsx`.
  - Fixed two product mismatches: slash-menu shortcut badges now match the registered keyboard shortcuts in `src/components/editor/extensions/slash-commands.ts`, and the manual citation type picker in `src/components/citations/citation-dialog.tsx` now exposes the `"other"` option already supported by `Reference.type`.
  - Focused tests passed in `src/components/editor/extensions/__tests__/slash-commands.test.ts`, `src/components/citations/__tests__/citation-dialog.test.tsx`, `src/app/api/chat/__tests__/route.test.ts`, `src/lib/editor/__tests__/studio-hardening.test.ts`, and `src/lib/editor/__tests__/pending-citation-notice.test.ts` (44 tests total).
-->
