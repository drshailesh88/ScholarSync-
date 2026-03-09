# GAP-003: LaTeX — New Paper Creation Crashes Before Workspace Opens

## Problem
Creating a new LaTeX paper from `/latex/new` drops into a critical error boundary instead of opening the editor workspace. The surfaced error text includes `Config merge conflict for field override`.

## Evidence
- Quality Assessment Module 4
- Screenshot: `e2e/quality-assessment/latex/03-editor.png`
- Score impact: D3 = 1/5, D4 = 1/5, D7 = 1/5

## Root Cause (Investigate)
- Template/config merge path in [page.tsx](/Users/shaileshsingh/ScholarSync/src/app/(app)/latex/new/page.tsx)
- Template validation under [template-validator.ts](/Users/shaileshsingh/ScholarSync/src/lib/latex/template-validator.ts)
- Editor project bootstrap in [page.tsx](/Users/shaileshsingh/ScholarSync/src/app/(app)/latex/[projectId]/page.tsx)

## Acceptance Criteria
- AC-1: Creating a paper from at least `Blank Document` and `JAMA` opens the LaTeX workspace successfully.
- AC-2: No critical error boundary appears during project creation.
- AC-3: If a template config is invalid, the user gets a specific actionable message instead of a crash.
- AC-4: The editor workspace is reachable in under 5 seconds after clicking create.

## Files Likely Involved
- [page.tsx](/Users/shaileshsingh/ScholarSync/src/app/(app)/latex/new/page.tsx)
- [template-validator.ts](/Users/shaileshsingh/ScholarSync/src/lib/latex/template-validator.ts)
- [page.tsx](/Users/shaileshsingh/ScholarSync/src/app/(app)/latex/[projectId]/page.tsx)

## Effort Estimate
Medium (M)

## Verification
```bash
agent-browser --session qa open http://127.0.0.1:3000/latex/new
# Create paper from JAMA or Blank Document
# Expect workspace, source editor, and preview to open without error boundary
```

