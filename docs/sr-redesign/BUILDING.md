# SR Redesign: Building Prompt

> Copy this entire prompt to Claude Code when you’re ready to implement a sprint.

-----

## PROMPT START

You are helping redesign the Systematic Review module for ScholarSync. You are in **BUILDING MODE**.

### Your Task

1. Read the project documentation
1. Pick the next task from SPRINT_PLAN.md
1. Implement it
1. Run tests
1. If tests pass, commit and move to next task
1. If tests fail, iterate until they pass

### Files to Read First (Every Session)

```
/docs/sr-redesign/CONTEXT.md      # Vision, constraints, brand principles
/docs/sr-redesign/ARCHITECTURE.md # Current state documentation  
/docs/sr-redesign/UX_SPEC.md      # Target state specifications
/docs/sr-redesign/SPRINT_PLAN.md  # Current sprint tracking - find your task here
```

### Building Process

1. **Read Context**: Always start by reading CONTEXT.md
1. **Find Task**: Check SPRINT_PLAN.md for the current sprint’s TODO items
1. **Understand Spec**: Read relevant section of UX_SPEC.md
1. **Implement**: Write the code
1. **Test**: Run tests to verify
1. **Commit**: If passing, commit with clear message
1. **Update Plan**: Mark task as done in SPRINT_PLAN.md
1. **Loop**: Pick next task

### Key Architecture Facts

```
# SR Module Entry Points
/src/app/(app)/systematic-review/page.tsx           # Hub/dashboard
/src/app/(app)/systematic-review/[projectId]/page.tsx  # Workflow page

# Components
/src/components/systematic-review/                  # All panel components

# State
/src/stores/systematic-review-store.ts              # Zustand store

# Real-time
/src/lib/liveblocks/sr-config.ts                    # Liveblocks config

# API Routes
/src/app/api/systematic-review/                     # 36 API directories

# Styling
/src/app/globals.css                                # Global styles + tokens
```

### Do NOT Break

- **API Routes**: Do not modify anything in `/src/app/api/systematic-review/`
- **Store Shape**: Do not change the interface of `systematic-review-store.ts`
- **Liveblocks**: Do not modify room IDs or event types
- **Existing Tests**: All tests in `e2e/` and `qa/generated/` must still pass

### Design Tokens to Use

```css
/* Typography */
font-family: var(--font-sans-family);    /* DM Sans - UI */
font-family: var(--font-serif-family);   /* Source Serif 4 - content */

/* Colors (from landing page) */
--primary-purple: #6D28D9;
--dark-purple: #1E1145;
--text-main: #241013;
--bg-main: rgb(242, 240, 235);
--bg-card: rgb(233, 229, 221);

/* Spacing */
padding: 24px;  /* p-6 minimum */
max-width: 900px;  /* content areas */

/* Transitions */
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Testing Commands

```bash
# Run all E2E tests
npx playwright test

# Run SR-specific tests
npx playwright test e2e/journeys/systematic-review

# Run QA tests
npx playwright test qa/generated/systematic-review

# Run specific test file
npx playwright test e2e/journeys/systematic-review-pipeline.spec.ts
```

### Commit Message Format

```
feat(sr): [brief description]

- [Specific change 1]
- [Specific change 2]

Sprint: [Sprint number]
Task: [Task from SPRINT_PLAN.md]
```

### If You Get Stuck

1. Re-read CONTEXT.md — the answer might be there
1. Check if you’re violating a constraint
1. Look at how Studio/Editor does similar things
1. Note the blocker in SPRINT_PLAN.md and stop

### Ralph Loop Reminder

You are operating in a Ralph loop:

- Progress lives in files and git, not in your context
- Each session starts fresh — always read the docs first
- Commit frequently so progress persists
- If context fills up, exit cleanly and next session picks up

## PROMPT END

-----

## Usage

1. Open Claude Code
1. Navigate to the ScholarSync repo
1. Paste this entire prompt
1. Optionally add: “Start with Sprint X, Task Y”
1. Claude Code will read docs, implement, test, commit

### Example Session Starts

**Start fresh sprint:**

```
[Paste BUILDING.md prompt]
Start with Sprint 1. Read the docs and begin implementation.
```

**Continue mid-sprint:**

```
[Paste BUILDING.md prompt]
Continue Sprint 2. Check SPRINT_PLAN.md for the next TODO item.
```

**Specific task:**

```
[Paste BUILDING.md prompt]
Sprint 2, Task: "Add keyboard shortcuts (I, E, M, ←, →)"
```

-----

*This prompt is for implementation. Use PLANNING.md to plan first.*