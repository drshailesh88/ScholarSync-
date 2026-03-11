# editor — Spec 034

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### tiptap-to-docx Converter Details
- [ ] `tiptapToDocx()` converter renders bibliography under section heading `"References"`
- [ ] `tiptapToDocx()` renders images as plain text: `"[Image: {alt || src || 'image'}]"`
- [ ] `tiptapToDocx()` renders bullet list items with Unicode bullet prefix `"\u2022 "` (•)
- [ ] `tiptapToDocx()` renders checked task items with `"\u2611"` (☑) and unchecked with `"\u2610"` (☐)
- [ ] `tiptapToDocx()` renders citation superscripts at 18 half-points (9pt font size)
#### Chat API Route Details
- [ ] Chat API Zod schema limits `messages` array to maximum 50 items
- [ ] Chat API applies rate limiting via `RATE_LIMITS.ai`
- [ ] Chat API selects `getGuideSystemPrompt()` only when `mode === "learn"` AND both `guideContext.documentType` and `guideContext.stage` exist
- [ ] Chat API selects `getDraftSystemPrompt()` only when `mode === "draft"` AND `draftContext.intensity` exists
- [ ] Chat API returns streaming response via `result.toTextStreamResponse()`
#### Reference Type System
- [ ] `Reference.type` accepts 9 values: `"article"`, `"book"`, `"chapter"`, `"website"`, `"guideline"`, `"conference"`, `"thesis"`, `"preprint"`, `"other"` — but the Manual Entry form only exposes 8 options (no `"other"`)
- [ ] `Reference` interface includes optional fields not surfaced in any UI: `pmcid`, `url`, `publisher`, `keywords`, `notes`, `tags`, `pdfUrl`
- [ ] `CSLItem` interface supports an open `[key: string]: unknown` index signature for arbitrary CSL-JSON fields
#### Guide Types Additional Details
- [ ] `GuideContext` interface includes optional fields not used in Studio UI: `targetJournal`, `studyType`, `completedChecklist`, `socraticRounds`
- [ ] `REPORTING_GUIDELINES` for `review_article` includes `"Narrative review best practices"` in addition to `"PRISMA"`
- [ ] `REPORTING_GUIDELINES` for `book_chapter`, `academic_draft`, and `letter` are all empty arrays (no reporting guidelines mapped)
#### Slash Command Shortcut Label vs Actual Shortcut Mismatch
- [ ] Slash menu heading commands display shortcut badges as `"Cmd+Opt+1"` through `"Cmd+Opt+4"` but the actual keyboard shortcuts registered in `AcademicKeyboardShortcuts` are `"Mod-Shift-1"` through `"Mod-Shift-4"`
- [ ] Slash command `Block Quote` has no shortcut badge displayed in the menu, although `Cmd+Shift+B` is registered via StarterKit
- [ ] Slash command `Divider` has no shortcut badge displayed in the menu, although `Cmd+Shift+Enter` is registered in keyboard shortcuts
- [ ] Slash command `Code Block` has no shortcut badge displayed in the menu
#### TopBar Implementation Details
- [ ] TopBar save status timestamp refreshes on a 30-second interval via `setInterval(..., 30000)`
- [ ] TopBar word count button has `title="Click for section breakdown"`
- [ ] TopBar section breakdown popover closes on `mousedown` outside event (not `click`)
- [ ] TopBar mode dropdown uses a `fixed inset-0 z-40` overlay as click-catcher behind the `z-50` dropdown
- [ ] TopBar reference badge button `title` is `"References"`, comment badge button `title` is `"Comments"`
#### Citation Dialog Identifier Detection
- [ ] Citation dialog detects DOI queries by checking if query starts with `"10."` or contains `"doi.org/"`
- [ ] Citation dialog detects PMID queries by checking if query is 1-8 digits only (regex pattern)
- [ ] Citation dialog identifier detection banner is a clickable full-width button reading `"Resolve DOI: {id}"` or `"Resolve PMID: {id}"`
- [ ] Citation dialog DOI/PMID resolution switches the active tab to `"doi"` before resolving
- [ ] Citation dialog DOI-tab error includes a secondary `"Try manual entry"` link that switches to manual tab
- [ ] Citation dialog DOI-tab error message for network failures is `"Network error. Please try again."`
- [ ] Citation dialog DOI-tab error message for resolution failures is `data.error || "Could not resolve identifier."`
#### Editor Page Pending Citation Notice
- [ ] Editor page pending citation notice with a paper title reads `Saved "{title}" to your library. Open Citation Dialog to cite it.`
- [ ] Editor page pending citation notice without a title reads `Paper saved to your library. Open Citation Dialog to cite it.`
- [ ] Editor page pending citation notice auto-dismisses after 5000ms (5 seconds), not 2500ms like Studio's citation notice
