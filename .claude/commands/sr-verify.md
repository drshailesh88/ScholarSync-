# SR Module — Verify Build

Verify the implementation of: $ARGUMENTS

1. Check TypeScript compiles: `npx tsc --noEmit 2>&1 | grep -i "error" | head -20`
2. Check the component renders (read the file, verify imports resolve)
3. Check the API route handles GET and POST (read the route file)
4. Check the tab appears in `[projectId]/page.tsx` WORKFLOW_TABS array
5. Check the store has any needed new state
6. Check the database schema has any needed new columns/tables
7. If migration SQL exists, verify it's syntactically valid

Report: PASS / FAIL with specific issues found.
