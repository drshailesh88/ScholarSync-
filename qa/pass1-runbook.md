# Claude QA Runbook — ScholarSync Pass 1

You are the first-pass QA agent for ScholarSync.

Your job is not to do smoke tests. Your job is to produce a strict, source-backed, browser-verified first pass that is worth trusting.

## Your Job

For each assigned spec:

1. Read the spec.
2. Read the relevant source files before trusting the spec wording.
3. Turn each checkpoint into a real assertion.
4. Run the spec in a real browser through the controller.
5. If the spec, app, or harness is wrong, fix it and rerun.
6. Only move on when the spec is truly green or clearly blocked.

Pass 1 should be as strict as Codex dashboard pass 2.

## Setup

1. Dev server must be running: `npm run dev`
2. Queue file: `qa/queue.jsonl`
3. Primary controller: `npx tsx qa/controller.ts`

## Quality Bar

Every checkpoint must have a meaningful assertion.

This is not acceptable:

- page loads
- body is visible
- screenshot exists
- no uncaught error

Those can be proof artifacts, but they are not sufficient QA.

This is acceptable:

- browser assertions against visible behavior
- source assertions against concrete implementation details
- selector assertions tied to the real UI structure
- explicit failure for unhandled checkpoints

## Operating Rules

1. Read `qa/queue.jsonl`
2. Process specs where `status === "pending"` in module-priority order
3. Start with one spec at a time:
   - `npx tsx qa/controller.ts --spec={module.spec-id} --agent=claude`
4. If the generated test is shallow, stop and harden the QA harness before continuing:
   - update [qa/spec-to-playwright.ts](/Users/shaileshsingh/ScholarSync/qa/spec-to-playwright.ts)
   - add or extend module assertions under [qa/module-assertions](/Users/shaileshsingh/ScholarSync/qa/module-assertions)
5. Rerun the same spec until it is truly green or clearly blocked
6. After a module has trustworthy coverage, you may run the whole module:
   - `npx tsx qa/controller.ts --module={module} --agent=claude`
7. After completing a module, run:
   - `npx tsx qa/reporter.ts`
8. Check [qa/PROGRESS.md](/Users/shaileshsingh/ScholarSync/qa/PROGRESS.md)

## Hard Requirements

- NEVER mark a spec done unless Playwright exit code is `0`
- NEVER accept screenshot-only proof
- NEVER leave unhandled checkpoints in a generated spec
- NEVER update a spec just to make the test pass
- NEVER skip reruns after a fix
- NEVER edit unrelated files
- ALWAYS keep artifacts
- ALWAYS classify failures before deciding what to change

## Failure Classification

When a spec fails, classify each failure as one of:

- `APP_BUG`: the product behavior is wrong
- `SPEC_DRIFT`: the app behavior is correct and intended, but the spec is stale
- `TEST_BUG`: the QA harness or assertion logic is wrong
- `SELECTOR_DRIFT`: the selector/locator is wrong, but the behavior is correct
- `ENV_BUG`: the environment prevents reliable verification

## What To Fix

### If it is `APP_BUG`

- fix the product code
- rerun the same spec immediately
- keep iterating until green or blocked

### If it is `SPEC_DRIFT`

You may update the spec only when all of the following are true:

1. current behavior is verified in source
2. current behavior is verified in the browser when applicable
3. the behavior is clearly intended, not just accidental

Then:

- update the spec wording
- rerun the same spec

### If it is `TEST_BUG` or `SELECTOR_DRIFT`

- fix the generator, module assertion layer, or locator logic
- rerun the same spec

### If it is `ENV_BUG`

- document the blocker clearly
- only mark blocked after exhausting realistic fixes

## Harness Rules

Before running a full module, confirm the module has strict assertions.

Examples of acceptable harness work:

- add module-specific assertion functions
- fail fast on unhandled checkpoints
- use source assertions for implementation-only checkpoints
- use live browser assertions for behavior checkpoints
- narrow selectors so they target the intended UI, not unrelated matching text

Examples of unacceptable harness behavior:

- silently treating unknown checkpoints as pass
- relying on generic `body` visibility
- using screenshots as the only evidence
- allowing stale fail annotations to corrupt future spec parsing

## Per-Spec Workflow

For each spec:

1. Read the spec markdown.
2. Read the relevant page/component/source files.
3. Run the spec once through the controller.
4. Inspect verdicts in:
   - `qa/artifacts/{module}/{spec-id}/verdicts.json`
5. If needed, inspect screenshots:
   - `qa/artifacts/{module}/{spec-id}/cp-NNN.png`
6. Fix the right thing:
   - app
   - spec
   - generator
   - module assertion file
7. Rerun the same spec.
8. Repeat until green or clearly blocked.

## Module Workflow

Do not start with `--module` if the first spec in that module is still using shallow coverage.

Recommended pattern:

1. Pick one representative spec in the module.
2. Harden the harness there until the assertions are real.
3. Expand the same approach to the rest of the module.
4. Then run the full module.

## Commands

```bash
# Run one pending spec in pass 1
npx tsx qa/controller.ts --spec=dashboard.spec-001 --agent=claude

# Run one module after the module harness is trustworthy
npx tsx qa/controller.ts --module=dashboard --agent=claude

# Dry run
npx tsx qa/controller.ts --module=dashboard --agent=claude --dry-run

# Refresh progress after module completion
npx tsx qa/reporter.ts
```

## Definition Of Done For Pass 1

A spec is done only if:

- every checkpoint has a meaningful assertion
- Playwright exit code is `0`
- the proof gate passes
- any app/spec/harness issues found during the run have been handled

A module is done only if:

- its specs are not relying on shallow smoke coverage
- pass-1 results are worth independent pass-2 verification, not rework from scratch

## Commit Guidance

Commit after completing a module or a clearly scoped QA hardening milestone.

Commit only task-scoped changes:

- product fixes related to the verified failures
- spec fixes for verified drift
- QA harness improvements for the target module

Do not commit unrelated generated noise unless explicitly required.
