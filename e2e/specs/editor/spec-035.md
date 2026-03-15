# editor — Spec 035

STATUS: PARTIAL
TESTED: 35/35
PASS: 32
FAIL: 3
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Studio Citation Notice vs Editor Citation Notice
- [x] PASS: Studio citation insertion notice text is `"Citation inserted"` (singular) or `"{N} citations inserted"` (plural)
- [x] PASS: Studio citation notice auto-clears after 2500ms (2.5 seconds)
- [x] PASS: Editor page has NO citation insertion notice — it has only a pending-from-library notice (5 seconds)
#### Comment Sidebar Input Variants
- [x] PASS: Bottom new-comment input placeholder is `"Add a general comment about this document..."` in the actual source code
- [x] PASS: Bottom new-comment input submits on `Enter` key (when not Shift+Enter)
- [x] PASS: Reply input submits on `Enter` key (when not Shift+Enter)
- [x] PASS: Comment sidebar unresolved badge uses `bg-amber-500/15 text-amber-500` amber styling with `text-[10px]` font size
#### Behavior Corrections (Pass 3)
- [x] PASS: CORRECTION: Any older doc note claiming the bottom new-comment input uses `"Add a comment..."` is stale — the current source code uses `"Add a general comment about this document..."`
- [x] PASS: CORRECTION: Existing doc section 19 says save status indicators show "pulsing cloud icon" for saving — the editor page actually uses `CloudArrowUp` with `animate-pulse` class, while Studio uses `CircleNotch` with `animate-spin` (spinning, not pulsing)
- [x] PASS: CORRECTION: Existing doc section 19 says Studio idle state shows "green check + Saved HH:MM" — Studio idle state actually uses `Check` icon (not `CloudCheck`), and the icon style matches `text-emerald-500` green
- [x] PASS: CORRECTION: Slash menu heading shortcut badges are now aligned with the registered shortcuts and display `Cmd+Shift+N`, not `Cmd+Opt+N`
#### Components Referenced But Not Rendered
- [x] PASS: `template-picker.tsx` exists in `src/components/editor/` but is NOT imported by either editor or studio page files — the template picker is not rendered on these routes
- [x] PASS: `EDITOR_SHORTCUTS`, `EDITOR_FONTS`, and `TYPOGRAPHY` constants from `editor-config.ts` are NOT imported by either `AcademicEditor` or `TiptapEditor` — these config values exist but are not consumed by the editor components
- [x] PASS: `DiffView.tsx` exists in `src/components/integrity/` but is NOT imported by `IntegrityPanel.tsx` — the diff view component is not rendered within the integrity check flow
#### Verification Corrections
- [x] PASS: Global `CommandPalette` is mounted by `AppShell` on `/editor/[id]` and `/studio`, and `Cmd/Ctrl+K` toggles it even though `EDITOR_SHORTCUTS.commandBar` is not imported by the editor components
- [x] PASS: DocumentOutline heading click scrolls the resolved DOM node into view and then sets the text selection to `pos + 1`
- [x] PASS: FootnoteSection row click focuses the editor, sets text selection to the footnote node position, and calls `scrollIntoView()`
- [x] PASS: Research store `clearSearch()` preserves `hasSearchedBefore` while clearing query, filters, results, current page, plan, summary, scroll position, and selected paper state
- [x] PASS: ResearchSidebar library badge hard-caps at literal `99` when the library count exceeds 99
- [x] PASS: `Toolbar` from `src/components/editor/toolbar.tsx` is actually rendered by `TiptapEditor` on `/studio`
#### Command Palette
- [ ] FAIL: Global command palette input placeholder is `Type a command or search...`
- [x] PASS: Global command palette closes on backdrop click
- [ ] FAIL: Global command palette closes on `Escape`
- [ ] FAIL: Global command palette navigation commands include `Dashboard`, `Studio`, `Literature Search`, `Notebook`, `Library`, `Archive`, `Compliance`, `Presentation`, and `Settings`
- [x] PASS: Global command palette action commands include `Toggle Theme` and `New Project`
#### Lifecycle And Cleanup
- [x] PASS: CommentSidebar registers `scholarsync:new-inline-comment` on mount and removes that window listener on unmount
- [x] PASS: `useStudioDocument` clears its debounced title-save timer on unmount
- [x] PASS: Studio citation insertion flow clears any existing dismissal timer before starting a new 2500 ms timer, so rapid successive citation inserts restart the countdown instead of stacking multiple timers
#### Studio Toolbar Component (`src/components/editor/toolbar.tsx`)
- [x] PASS: Studio `Toolbar` renders 8 formatting buttons in order: Heading 1 (`TextHOne`), Heading 2 (`TextHTwo`), Heading 3 (`TextHThree`), Bold (`TextB`), Italic (`TextItalic`), Bullet List (`ListBullets`), Ordered List (`ListNumbers`), Blockquote (`Quotes`)
- [x] PASS: Studio `Toolbar` formatting button icons use size `18`
- [x] PASS: Studio `Toolbar` "Cite" button uses `BookOpen` icon (size 16) with title `"Insert Citation (Cmd+Shift+C)"`
- [x] PASS: Studio `Toolbar` "Cite" label text `"Cite"` is hidden below `sm` breakpoint via `hidden sm:inline` class
- [x] PASS: Studio `Toolbar` "Cite" button only renders when `onOpenCitationDialog` prop is provided
- [x] PASS: Studio `Toolbar` "References" button uses `Books` icon (size 16) with title `"Toggle Reference Sidebar (Cmd+Shift+R)"`
- [x] PASS: Studio `Toolbar` reference count badge renders only when `referenceCount > 0`

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Source verification covered `src/app/(app)/studio/page.tsx`, `src/app/(app)/editor/[id]/page.tsx`, `src/components/editor/CommentSidebar.tsx`, `src/components/editor/toolbar.tsx`, `src/components/editor/tiptap-editor.tsx`, `src/components/editor/DocumentOutline.tsx`, `src/components/editor/FootnoteSection.tsx`, `src/components/layout/app-shell.tsx`, `src/components/ui/command-palette.tsx`, `src/stores/research-store.ts`, `src/components/research/ResearchSidebar.tsx`, `src/components/studio/SaveIndicator.tsx`, `src/components/editor/TopBar.tsx`, `src/hooks/use-studio-document.ts`, `src/components/editor/template-picker.tsx`, `src/lib/editor/editor-config.ts`, and `src/components/integrity/IntegrityPanel.tsx`.
  - No product-code fix was required in this pass. The main adjustments were spec corrections for stale notes left behind after the earlier comment-placeholder and slash-shortcut fixes.
  - Focused tests passed in `src/components/editor/__tests__/CommentSidebar.test.tsx`, `src/components/ui/__tests__/command-palette.test.tsx`, `src/stores/__tests__/research-store.test.ts`, `src/hooks/__tests__/use-studio-document.test.tsx`, `src/lib/editor/__tests__/pending-citation-notice.test.ts`, and `src/lib/editor/__tests__/feature-ralph-editor.test.ts` (136 tests total).
-->
