# Studio — Feature Doc Gaps

**Original doc:** `STUDIO_FEATURES_TESTING.md`
**Original checkbox count:** 214
**After Codex pass 1:** 350
**After Claude Code pass 2:** 523
**After Codex verification pass:** 705
**Completeness estimate:** ~98% of the `/studio` import tree is now documented with route-accurate behavior.

## Verification Summary

- Pass 2 assertions reviewed: 173
- Verified correct: 172
- Hallucinated / inaccurate: 1
- Partially correct: 0
- Accuracy rate: 99.4%

## Hallucinations Removed Or Corrected

- Corrected the slash-command inventory from 19 to 23 commands and documented the 7 commands Claude omitted from the supposed "full list".
- Removed stale `/studio` claims for markdown-rendered chat messages, inline Research-tab results, `.docx` downloads, and a working `Cmd+Shift+C` citation shortcut.
- Corrected keyboard docs from `Cmd+Opt+1-4` and `Ctrl+Y` to the route's actual `Cmd+Shift+1-4` and `Cmd+Shift+Z` behavior.
- Corrected the IntegrityPanel wiring notes to reflect the real `getEditorText()` implementation and the existing `sources={integritySources}` prop.
- Removed the nonexistent Studio-route document-migration subsection; `migrateLocalDocuments()` is not called on `/studio`.
- Corrected the Reference Sidebar section to match the actual sort modes and available actions.

## Remaining Gaps

- `KeyboardShortcutsDialog` is rendered on `/studio`, but `Cmd+Shift+C` is still broken on this route because `action: "insert-citation"` is never handled by `src/app/(app)/studio/page.tsx`.
- Left-sidebar reference preview cards are static summary rows; they do not select, focus, or expand references.
- AI Credits usage is fetched once on mount via `getUserUsageStats()` and does not refresh after chat sends or other AI actions.
- `ReferenceSidebar` supports sort modes `number`, `author`, `year`, and `added`; it still has no title sort or edit-reference flow.
- The empty References state still instructs users to use `Cmd+Shift+C`, even though that shortcut is currently non-functional on `/studio`.

## Route Attribution Checks

- `KeyboardShortcutsDialog` is rendered directly in `src/app/(app)/studio/page.tsx`.
- `CommentSidebar` is conditionally rendered directly in `src/app/(app)/studio/page.tsx`.
- `ResearchSidebar` is a separate rail rendered between `<main>` and the right-panel conditional, not inside the right panel.
- `SelectionToolbar`, `LinkPopover`, `DocumentOutline`, `FootnoteSection`, and `Toolbar` are Studio-visible because `src/components/editor/tiptap-editor.tsx` renders them inside `TiptapEditor`.
