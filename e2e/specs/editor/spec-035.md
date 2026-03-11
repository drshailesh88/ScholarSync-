# editor — Spec 035

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Studio Citation Notice vs Editor Citation Notice
- [ ] Studio citation insertion notice text is `"Citation inserted"` (singular) or `"{N} citations inserted"` (plural)
- [ ] Studio citation notice auto-clears after 2500ms (2.5 seconds)
- [ ] Editor page has NO citation insertion notice — it has only a pending-from-library notice (5 seconds)
#### Comment Sidebar Input Variants
- [ ] Bottom new-comment input placeholder is `"Add a comment..."` in the actual source code
- [ ] Bottom new-comment input submits on `Enter` key (when not Shift+Enter)
- [ ] Reply input submits on `Enter` key (when not Shift+Enter)
- [ ] Comment sidebar unresolved badge uses `bg-amber-500/15 text-amber-500` amber styling with `text-[10px]` font size
#### Behavior Corrections (Pass 3)
- [ ] CORRECTION: Existing doc line 1491 states bottom new-comment input placeholder is `"Add a general comment about this document..."` — actual source code uses `"Add a comment..."` (shorter text)
- [ ] CORRECTION: Existing doc section 19 says save status indicators show "pulsing cloud icon" for saving — the editor page actually uses `CloudArrowUp` with `animate-pulse` class, while Studio uses `CircleNotch` with `animate-spin` (spinning, not pulsing)
- [ ] CORRECTION: Existing doc section 19 says Studio idle state shows "green check + Saved HH:MM" — Studio idle state actually uses `Check` icon (not `CloudCheck`), and the icon style matches `text-emerald-500` green
- [ ] CORRECTION: Slash menu heading shortcut badges show `Cmd+Opt+N` in the UI, but the actual registered shortcuts are `Cmd+Shift+N` — the doc should note this UI/behavior mismatch
#### Components Referenced But Not Rendered
- [ ] `template-picker.tsx` exists in `src/components/editor/` but is NOT imported by either editor or studio page files — the template picker is not rendered on these routes
- [ ] `EDITOR_SHORTCUTS`, `EDITOR_FONTS`, and `TYPOGRAPHY` constants from `editor-config.ts` are NOT imported by either `AcademicEditor` or `TiptapEditor` — these config values exist but are not consumed by the editor components
- [ ] `DiffView.tsx` exists in `src/components/integrity/` but is NOT imported by `IntegrityPanel.tsx` — the diff view component is not rendered within the integrity check flow
#### Verification Corrections
- [ ] Global `CommandPalette` is mounted by `AppShell` on `/editor/[id]` and `/studio`, and `Cmd/Ctrl+K` toggles it even though `EDITOR_SHORTCUTS.commandBar` is not imported by the editor components
- [ ] DocumentOutline heading click scrolls the resolved DOM node into view and then sets the text selection to `pos + 1`
- [ ] FootnoteSection row click focuses the editor, sets text selection to the footnote node position, and calls `scrollIntoView()`
- [ ] Research store `clearSearch()` preserves `hasSearchedBefore` while clearing query, filters, results, current page, plan, summary, scroll position, and selected paper state
- [ ] ResearchSidebar library badge hard-caps at literal `99` when the library count exceeds 99
- [ ] `Toolbar` from `src/components/editor/toolbar.tsx` is actually rendered by `TiptapEditor` on `/studio`
#### Command Palette
- [ ] Global command palette input placeholder is `Type a command or search...`
- [ ] Global command palette closes on backdrop click
- [ ] Global command palette closes on `Escape`
- [ ] Global command palette navigation commands include `Dashboard`, `Studio`, `Literature Search`, `Notebook`, `Library`, `Archive`, `Compliance`, `Presentation`, and `Settings`
- [ ] Global command palette action commands include `Toggle Theme` and `New Project`
#### Lifecycle And Cleanup
- [ ] CommentSidebar registers `scholarsync:new-inline-comment` on mount and removes that window listener on unmount
- [ ] `useStudioDocument` clears its debounced title-save timer on unmount
- [ ] Studio citation insertion flow clears any existing dismissal timer before starting a new 2500 ms timer, so rapid successive citation inserts restart the countdown instead of stacking multiple timers
#### Studio Toolbar Component (`src/components/editor/toolbar.tsx`)
- [ ] Studio `Toolbar` renders 8 formatting buttons in order: Heading 1 (`TextHOne`), Heading 2 (`TextHTwo`), Heading 3 (`TextHThree`), Bold (`TextB`), Italic (`TextItalic`), Bullet List (`ListBullets`), Ordered List (`ListNumbers`), Blockquote (`Quotes`)
- [ ] Studio `Toolbar` formatting button icons use size `18`
- [ ] Studio `Toolbar` "Cite" button uses `BookOpen` icon (size 16) with title `"Insert Citation (Cmd+Shift+C)"`
- [ ] Studio `Toolbar` "Cite" label text `"Cite"` is hidden below `sm` breakpoint via `hidden sm:inline` class
- [ ] Studio `Toolbar` "Cite" button only renders when `onOpenCitationDialog` prop is provided
- [ ] Studio `Toolbar` "References" button uses `Books` icon (size 16) with title `"Toggle Reference Sidebar (Cmd+Shift+R)"`
- [ ] Studio `Toolbar` reference count badge renders only when `referenceCount > 0`
