# GAP-007: Studio — Selection-Based Formatting Is Unreliable

## Problem
Selection-based formatting for existing text was unreliable in Studio. In QA, `Ctrl+A` + `Ctrl+B` and a toolbar Bold click did not format the selected existing text in the normal interaction path.

## Evidence
- Quality Assessment Module 1
- Screenshot: `e2e/quality-assessment/studio/02-after-interactions.png`
- Score impact: D1 = 3/5, D4 = 2/5

## Root Cause (Investigate)
- Keyboard shortcut handling in [keyboard-shortcuts.ts](/Users/shaileshsingh/ScholarSync/src/components/editor/extensions/keyboard-shortcuts.ts)
- Toolbar command execution in [toolbar.tsx](/Users/shaileshsingh/ScholarSync/src/components/editor/toolbar.tsx) and [TopBar.tsx](/Users/shaileshsingh/ScholarSync/src/components/editor/TopBar.tsx)
- Editor selection state handling in [tiptap-editor.tsx](/Users/shaileshsingh/ScholarSync/src/components/editor/tiptap-editor.tsx)

## Acceptance Criteria
- AC-1: `Ctrl+B` toggles bold on an existing selected range.
- AC-2: Clicking the Bold toolbar button formats the currently selected text.
- AC-3: Toolbar active state updates in sync with the applied format.
- AC-4: The selection/cursor position remains stable after formatting.

## Files Likely Involved
- [keyboard-shortcuts.ts](/Users/shaileshsingh/ScholarSync/src/components/editor/extensions/keyboard-shortcuts.ts)
- [toolbar.tsx](/Users/shaileshsingh/ScholarSync/src/components/editor/toolbar.tsx)
- [TopBar.tsx](/Users/shaileshsingh/ScholarSync/src/components/editor/TopBar.tsx)
- [tiptap-editor.tsx](/Users/shaileshsingh/ScholarSync/src/components/editor/tiptap-editor.tsx)

## Effort Estimate
Small (S)

## Verification
```bash
agent-browser --session qa open http://127.0.0.1:3000/studio
# Type text, select existing text, apply Bold via keyboard and toolbar
# Expect both paths to format the selected range immediately
```

