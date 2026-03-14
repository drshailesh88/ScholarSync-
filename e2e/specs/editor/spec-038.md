# editor — Spec 038

STATUS: DONE
TESTED: 13/13
PASS: 13
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Document Outline Header and Styling Details
- [x] Heading item base padding uses inline style `paddingLeft: ${12 + indent}px` — 12px base plus level-dependent indent
- [x] Word count per heading visibility uses `opacity-0 group-hover:opacity-100 transition-opacity` CSS opacity transition (not conditional rendering)
- [x] Total word count in footer uses `wordCount.toLocaleString()` for thousands-separator formatting
#### TopBar SaveStatusIndicator vs Editor Page Header Save Icons
- [x] TopBar `SaveStatusIndicator` saved state uses `Check` icon (size 12) — the editor page header bar uses `CheckCircle` icon (size 14) for the same state
- [x] TopBar saving state uses `CloudArrowUp` (size 12) with `text-brand animate-pulse` — the editor page header uses `CloudArrowUp` (size 14) with `animate-pulse text-ink-muted` (muted color, not brand)
- [x] TopBar `SaveStatusIndicator` default case (unknown state) returns `null` — it does not render any indicator for unrecognized states
#### Behavior Corrections (Pass 4)
- [x] CORRECTION: Existing doc section 15 states Document Outline is "Editor page only" — `TiptapEditor` (`tiptap-editor.tsx:338`) also renders `DocumentOutline`, making it available on both `/editor/[id]` and `/studio`
- [x] CORRECTION: Existing doc section 9 describes the Floating Selection Toolbar implicitly as an editor-page-only feature — `TiptapEditor` (`tiptap-editor.tsx:336`) also renders `SelectionToolbar` on `/studio`
- [x] CORRECTION: Existing doc section 10 describes LinkPopover as "Editor page only" — `TiptapEditor` (`tiptap-editor.tsx:337`) renders `LinkPopover` on `/studio` as well
- [x] CORRECTION: Existing doc section 14 describes FootnoteSection implicitly as editor-page-only — `TiptapEditor` (`tiptap-editor.tsx:342`) also renders `FootnoteSection` on `/studio`
- [x] CORRECTION: Existing doc line 1491 states bottom new-comment input placeholder is `"Add a general comment about this document..."` — a Pass 3 correction already flagged this as `"Add a comment..."`, but line 1908 then re-states it as `"Add a comment..."` while the Pass 2 doc at line 1491 remains uncorrected
#### Components Referenced But Not Rendered (Pass 4)
- [x] `toolbar.tsx` now uses a single `ToolbarProps` interface that includes `editor`, `onOpenCitationDialog`, `onToggleReferenceSidebar`, and `referenceCount`; the dead narrow prop interface was removed
- [x] `editor-config.ts` `EDITOR_SHORTCUTS.clearFormatting` defines `"Mod-\\"`, and `AcademicKeyboardShortcuts` now registers that shortcut to clear marks and reset nodes

---
Notes:
- Source audit confirmed the outline/footer styling details in `src/components/editor/DocumentOutline.tsx`, the `TopBar` save-indicator differences in `src/components/editor/TopBar.tsx`, and the shared `/studio` overlay render path in `src/components/editor/tiptap-editor.tsx`.
- Product cleanup in this pass: wired the advertised `Mod-\\` clear-formatting shortcut in `src/components/editor/extensions/keyboard-shortcuts.ts` and removed the dead split toolbar prop interface in `src/components/editor/toolbar.tsx`.
- Verification: `npx vitest run src/components/editor/__tests__/TopBar.test.tsx src/components/editor/__tests__/DocumentOutline.test.tsx src/components/editor/extensions/__tests__/keyboard-shortcuts.test.ts src/components/editor/__tests__/toolbar.test.tsx src/components/editor/__tests__/tiptap-editor.test.tsx src/lib/editor/__tests__/feature-ralph-editor.test.ts`
