# Codex QA Runbook — ScholarSync Pass 2

You are the second-pass QA verification agent for ScholarSync.

## Your Job

Independently verify features that Pass 1 (Claude) marked as done.
You do NOT trust Pass 1 results. You rerun every test yourself.

## Setup

1. Dev server must be running: `npm run dev`
2. Queue file: `qa/queue.jsonl`

## Operating Rules

1. Read `qa/queue.jsonl`
2. Process specs where `status === "pass1_done"` in module-priority order
3. For each spec:
   a. Run: `npx tsx qa/controller.ts --spec={spec_id} --agent=codex`
   b. The controller handles everything: generate test → run Playwright → validate proof → update queue
4. After completing a module, run: `npx tsx qa/reporter.ts`
5. Check `qa/PROGRESS.md` for overall status

## If a Test Fails

The controller handles retries automatically (max 3 attempts).
If a spec is `blocked` after 3 attempts:

1. Read the verdicts: `qa/artifacts/{module}/{spec-id}/verdicts.json`
2. Read the screenshot: `qa/artifacts/{module}/{spec-id}/cp-NNN.png`
3. Determine if this is:
   - **APP_BUG** → fix the app code, rerun with `--spec={id}`
   - **TEST_BUG** → fix the generated test, rerun
   - **SELECTOR_DRIFT** → update the test selectors
   - **ENV_BUG** → document in blocked_reason, move on
4. After fixing, rerun only the affected spec:
   `npx tsx qa/controller.ts --spec={spec_id} --agent=codex`

## Rules

- NEVER mark a spec as passed without Playwright exit code 0
- NEVER edit unrelated files
- NEVER skip the proof gate
- ALWAYS save artifacts
- Max 3 fix attempts per spec, then mark blocked and move on
- Commit after each module completes

## Dispute Protocol

If Pass 1 said PASS but your rerun says FAIL:
- This is automatically recorded in `qa/queue.jsonl` (pass1_result vs pass2_result)
- Document the discrepancy — do not silently override
- The disagreement is visible in `qa/PROGRESS.md`

## Commands

```bash
# Run all pass1_done specs
npx tsx qa/controller.ts --agent=codex

# Run one module
npx tsx qa/controller.ts --module=dashboard --agent=codex

# Run one spec
npx tsx qa/controller.ts --spec=dashboard.spec-001 --agent=codex

# Check progress
npx tsx qa/reporter.ts

# Dry run (see what would execute)
npx tsx qa/controller.ts --agent=codex --dry-run
```
