Read program.md and annealing-log.jsonl. Run quality-score.mjs.

This is the COMPONENT UNIT TEST session.

UNTESTED COMPONENT MODULES (13 with zero tests):
- src/components/deep-research/
- src/components/feeds/
- src/components/integrity/
- src/components/latex-editor/
- src/components/layout/
- src/components/notebook/ (only 2 tests exist)
- src/components/pdf-viewer/
- src/components/research/
- src/components/systematic-review/

FOR EACH COMPONENT MODULE:
1. List all components in the directory
2. For each exported component, write a test that:
   a. Renders without crashing (basic render test)
   b. Tests key props and their effects
   c. Tests user interactions (clicks, input, etc.)
   d. Tests error states (error boundaries, missing data)
   e. Tests loading states
3. Put tests in src/components/<module>/__tests__/<Component>.test.tsx
4. Run: npx vitest run src/components/<module>

Follow existing patterns in src/components/editor/__tests__/ and src/components/slides/.
Branch: hardening/session-13
