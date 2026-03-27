# SR Redesign: Handoff to Claude Code

> This document contains the exact instructions to give Claude Code.

-----

## Step 1: Initial Setup (One Time)

### Open Claude Code and run this:

```
Read the SR redesign documentation at /docs/sr-redesign/ 

There are 5 key files:
1. CONTEXT.md - Project vision, constraints, brand principles
2. ARCHITECTURE.md - Current state of the SR module
3. UX_SPEC.md - Target UX specifications
4. SPRINT_PLAN.md - Sprint tracking (GSD style)
5. prompts/PLANNING.md and prompts/BUILDING.md - Your operating instructions

Read all of them now and confirm you understand:
- The founder's vision (not a ghostwriter, not a clone of Covidence)
- The brand constraints (fonts, colors, spacing from Studio)
- The current architecture (what not to break)
- The target UX (what we're building toward)
- The sprint plan (what to work on)

After reading, summarize what you understand and confirm you're ready.
```

-----

## Step 2: Run Planning (Before Each Sprint)

### To plan what needs to be done:

```
Read /docs/sr-redesign/prompts/PLANNING.md and follow its instructions.

You are in PLANNING MODE. Read all the docs, analyze the current state, and output a prioritized TODO list for the current sprint. Do NOT implement anything yet.
```

-----

## Step 3: Run Building (To Execute Sprint)

### To start implementing:

```
Read /docs/sr-redesign/prompts/BUILDING.md and follow its instructions.

You are in BUILDING MODE. Read the docs, find the next task in SPRINT_PLAN.md, implement it, test it, commit it, and update the sprint plan. Loop until the sprint is complete or you run out of context.
```

-----

## Step 4: Continue After Break

### When starting a new Claude Code session:

```
Read /docs/sr-redesign/SPRINT_PLAN.md to see where we left off.

Then read /docs/sr-redesign/prompts/BUILDING.md and continue from the next TODO task.

Remember: progress lives in git and files, not in context. Always read the docs fresh.
```

-----

## Quick Reference Commands

### “Plan the next sprint”

```
Read /docs/sr-redesign/prompts/PLANNING.md and execute planning mode.
```

### “Start Sprint 1”

```
Read /docs/sr-redesign/prompts/BUILDING.md.
Start Sprint 1: Phase Navigation. Begin with the first TODO task.
```

### “Continue where we left off”

```
Read /docs/sr-redesign/SPRINT_PLAN.md.
Find the first ⬜ TODO in the current sprint.
Read /docs/sr-redesign/prompts/BUILDING.md and implement that task.
```

### “Run tests”

```
Run the Playwright E2E tests for the systematic review module:
npx playwright test e2e/journeys/systematic-review
```

### “Check if I broke anything”

```
Run all existing SR tests:
npx playwright test e2e/journeys/systematic-review
npx playwright test qa/generated/systematic-review

Report any failures.
```

### “Commit progress”

```
Commit with message format:
feat(sr): [description]

Sprint: [X]
Task: [task name]
```

-----

## Reporting Back to Project Manager (Claude.ai)

After each Claude Code session, come back here and tell me:

1. **What sprint/task you worked on**
1. **What got done** (tasks completed)
1. **What broke** (if anything)
1. **What’s blocked** (if anything)
1. **What’s next** (from the sprint plan)

I’ll help you course-correct and prepare the next instructions.

-----

## Emergency: Something Broke

If Claude Code breaks something:

```
STOP. Do not try to fix randomly.

1. Run: git status
2. Run: git diff
3. If tests are failing, run: npx playwright test [specific test file]
4. Report back to me (Claude.ai) with:
   - What you were trying to do
   - What error appeared
   - The git diff output
   
I'll help you fix it.
```

-----

## File Locations Reference

```
/docs/sr-redesign/
├── CONTEXT.md           # Vision, constraints (READ FIRST)
├── ARCHITECTURE.md      # Current state
├── UX_SPEC.md           # Target state
├── SPRINT_PLAN.md       # Task tracking
├── HANDOFF.md           # This file
└── prompts/
    ├── PLANNING.md      # Planning prompt
    └── BUILDING.md      # Building prompt

/src/app/(app)/systematic-review/          # SR pages
/src/components/systematic-review/          # SR components
/src/stores/systematic-review-store.ts      # State
/src/app/api/systematic-review/             # API (DON'T TOUCH)
```

-----

*You are ready to start. Good luck!*