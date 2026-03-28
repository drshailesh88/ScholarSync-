---
description: Break a PRD into independently-grabbable GitHub issues using tracer-bullet vertical slices. Use when user has a PRD and wants to create implementation tickets.
---

# PRD to Issues

You will break down a PRD into implementable GitHub issues.

## Process

1. **Read the PRD** from the GitHub issue
2. **Identify vertical slices** - each issue should cut through ALL layers:
   - Schema/data model changes
   - Backend logic / API routes
   - Frontend UI changes
   - Tests
3. **Order by dependency** - find the "tracer bullet" (the first slice that proves the architecture works end-to-end)
4. **Classify each issue** as:
   - **AFK**: Agent can complete this autonomously
   - **HITL**: Human-in-the-loop required (design decisions, UX review, etc.)
5. **Quiz the user** - present breakdown showing Title, Type (HITL/AFK), Blocked by, User stories covered. Iterate until approved.
6. **Create issues** using the `gh` CLI in dependency order

## Issue Template

```markdown
## Parent PRD: #[number]

## What to Build
_Clear description of what this issue delivers. Describe the behavior, not the code._

## Acceptance Criteria
- [ ] ...
- [ ] ...

## Blocked By
_List any issues that must be completed before this one_
- #[number] (reason)

## User Stories Addressed
_From the parent PRD:_
- Story #X
- Story #Y
```

## Rules

- Each issue must be a vertical slice (touches all layers needed for that behavior)
- The first issue should be the "tracer bullet" - the thinnest possible end-to-end slice
- Issues should NOT be horizontal slabs ("all database work", "all API work", "all UI work")
- Every issue must have clear acceptance criteria
- Issues must declare blocking relationships
- Prefer fewer, larger issues over many tiny ones
- Each issue should be independently demoable when complete
