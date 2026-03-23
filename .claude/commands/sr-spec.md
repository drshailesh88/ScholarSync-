# SR Module — Create GitHub Issue Spec

Create a vertical-slice GitHub issue for: $ARGUMENTS

Rules:
1. Read `PENDING-SR.md` for the gap description
2. Read the relevant library file in `src/lib/systematic-review/`
3. Read the relevant existing component if one exists in `src/components/systematic-review/`
4. Read `src/app/(app)/systematic-review/[projectId]/page.tsx` for current wiring

The spec MUST be a vertical slice:
- Database change (if needed) + API route + Frontend component + Wiring into page
- Every checkbox must be testable by a human in a browser
- Reference parent: "Part of SR Module Completion (see PENDING-SR.md)"

Format:
## What to Build
[Description]

## Files to Touch
- [ ] `path/to/file` — what to change

## Acceptance Criteria
- [ ] [Specific, browser-testable criterion]
- [ ] [Another criterion]

## Blocking / Blocked By
[Issue numbers]

Create via: gh issue create --title "SR: [title]" --labels "systematic-review,spec" --body-file /tmp/sr-spec.md
