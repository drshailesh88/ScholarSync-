# editor — Spec 038

STATUS: PENDING
TESTED: 0/13
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Document Outline Header and Styling Details
- [ ] Heading item base padding uses inline style `paddingLeft: ${12 + indent}px` — 12px base plus level-dependent indent
- [ ] Word count per heading visibility uses `opacity-0 group-hover:opacity-100 transition-opacity` CSS opacity transition (not conditional rendering)
- [ ] Total word count in footer uses `wordCount.toLocaleString()` for thousands-separator formatting
#### TopBar SaveStatusIndicator vs Editor Page Header Save Icons
- [ ] TopBar `SaveStatusIndicator` saved state uses `Check` icon (size 12) — the editor page header bar uses `CheckCircle` icon (size 14) for the same state
- [ ] TopBar saving state uses `CloudArrowUp` (size 12) with `text-brand animate-pulse` — the editor page header uses `CloudArrowUp` (size 14) with `animate-pulse text-ink-muted` (muted color, not brand)
- [ ] TopBar `SaveStatusIndicator` default case (unknown state) returns `null` — it does not render any indicator for unrecognized states
#### Behavior Corrections (Pass 4)
- [ ] CORRECTION: Existing doc section 15 states Document Outline is "Editor page only" — `TiptapEditor` (`tiptap-editor.tsx:338`) also renders `DocumentOutline`, making it available on both `/editor/[id]` and `/studio`
- [ ] CORRECTION: Existing doc section 9 describes the Floating Selection Toolbar implicitly as an editor-page-only feature — `TiptapEditor` (`tiptap-editor.tsx:336`) also renders `SelectionToolbar` on `/studio`
- [ ] CORRECTION: Existing doc section 10 describes LinkPopover as "Editor page only" — `TiptapEditor` (`tiptap-editor.tsx:337`) renders `LinkPopover` on `/studio` as well
- [ ] CORRECTION: Existing doc section 14 describes FootnoteSection implicitly as editor-page-only — `TiptapEditor` (`tiptap-editor.tsx:342`) also renders `FootnoteSection` on `/studio`
- [ ] CORRECTION: Existing doc line 1491 states bottom new-comment input placeholder is `"Add a general comment about this document..."` — a Pass 3 correction already flagged this as `"Add a comment..."`, but line 1908 then re-states it as `"Add a comment..."` while the Pass 2 doc at line 1491 remains uncorrected
#### Components Referenced But Not Rendered (Pass 4)
- [ ] `toolbar.tsx` `ToolbarProps` interface defines only `{ editor: Editor | null }` but the actual `ToolbarExtendedProps` adds `onOpenCitationDialog`, `onToggleReferenceSidebar`, and `referenceCount` — the narrow `ToolbarProps` interface is dead code
- [ ] `editor-config.ts` `EDITOR_SHORTCUTS.clearFormatting` defines `"Mod-\\"` but no extension registers this shortcut — confirmed still unwired in Pass 4
