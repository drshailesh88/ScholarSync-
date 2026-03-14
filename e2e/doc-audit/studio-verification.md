# Studio — Claude Code Pass 2 Verification Report

**Total assertions reviewed:** 173
**Verified Correct:** 172
**Hallucinated / Inaccurate:** 1
**Partially Correct:** 0
**Accuracy rate:** 99.4%

## Hallucinated / Inaccurate

- [original line 864] "19 total slash commands defined in `structuralCommands` array" — WRONG because `src/components/editor/extensions/slash-commands.ts` defines 23 commands, not 19. Claude's "full list" also omitted `Heading 1`, `Heading 2`, `Heading 3`, `Bullet List`, `Numbered List`, `Block Quote`, and `Divider`.

## Partially Correct

- None.

## Codex Verification Pass Discoveries

- `Cmd+Shift+C` is still broken on `/studio`. `src/components/editor/extensions/keyboard-shortcuts.ts` dispatches `scholarsync:editor-action` with `action: "insert-citation"`, but `src/app/(app)/studio/page.tsx` never handles that action.
- Left-sidebar reference preview cards are static summaries only; they do not select or focus references.
- AI Credits usage is loaded once on mount via `getUserUsageStats()` and does not live-refresh after chat or other AI actions.
- `ReferenceSidebar` does not support title sorting or in-place editing. The implemented sort modes are `number`, `author`, `year`, and `added`.
- `/studio` does not call `migrateLocalDocuments()` on mount. That migration code is wired in `src/app/(app)/dashboard/dashboard-client.tsx`, not the Studio route.
