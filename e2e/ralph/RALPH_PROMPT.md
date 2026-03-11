# Ralph Loop — Test & Fix Prompt

You are testing ScholarSync features via browser automation. Your job: find the next untested spec, test every checkbox, fix failures, and commit.

## SETUP

1. Dev server: http://localhost:3001
2. Use agent-browser to interact with the app as a real user
3. If you cannot access the app (auth wall, error), STOP and report — do NOT create bypasses

## FIND NEXT SPEC

Run this to find the next PENDING spec file:

```bash
grep -rl "STATUS: PENDING" e2e/specs/*/spec-*.md | head -1
```

If no PENDING specs remain, check for specs with failures:

```bash
grep -rl "FAIL:" e2e/specs/*/spec-*.md | head -1
```

If nothing left, output "ALL SPECS COMPLETE" and exit.

## READ THE SPEC

1. Read the spec file header: MODULE, PAGE, TESTED counts
2. Read every `- [ ]` checkbox — these are your test items
3. Navigate to the PAGE url in agent-browser

## TEST EACH ITEM

For each unchecked `- [ ]` item:

1. **Read** the test description carefully
2. **Perform** the action in the browser (click, type, navigate, observe)
3. **Observe** what actually happens
4. **Record** the result by replacing the checkbox:

### Result Format

- `- [x] PASS: {what you observed}` — Feature works as described
- `- [!] FAIL: expected {X}, got {Y}` — Feature broken or wrong
- `- [b] BLOCKED: {reason}` — Cannot test (needs data, auth, etc.)
- `- [s] SKIP: {reason}` — Not testable via browser (DB field, server-only)

## FIX FAILURES (RALPH LOOP CORE)

When you find a FAIL:

1. **Investigate**: Read the relevant source file. Is the button handler missing? Is the API route broken? Is the component not rendering?
2. **Categorize**:
   - **Code bug** (missing handler, wrong route, broken API) → Fix the code, re-test, mark PASS
   - **Spec inaccuracy** (app works differently than spec says, but behavior is reasonable) → Update the spec description, mark PASS with note
   - **Missing feature** (component/route doesn't exist yet) → Mark BLOCKED with details
3. **Fix**: Make the minimal code change to fix the issue. Do NOT:
   - Add new dependencies without checking existing ones
   - Create auth bypasses or security holes
   - Refactor unrelated code
   - Over-engineer the fix
4. **Re-test**: After fixing, verify in the browser that the feature now works
5. **Commit the fix**: `git add <changed-files> && git commit -m "fix(<module>): <what was fixed>"`

## UPDATE SPEC HEADER

After testing all items, update the spec file header:

```
STATUS: COMPLETE (or PARTIAL if items remain)
TESTED: {tested}/{total}
PASS: {count}
FAIL: {count}
BLOCKED: {count}
```

## COMMIT RESULTS

```bash
git add e2e/specs/<module>/spec-<num>.md
git commit -m "test(<module>): spec-<num> — {pass}P/{fail}F/{blocked}B"
```

## UPDATE MANIFEST

After completing a spec, update the module's MANIFEST.md with new counts.

```bash
git add e2e/specs/<module>/MANIFEST.md
git commit -m "test(<module>): update manifest"
```

## EXIT

After completing ONE spec file (all items tested), exit cleanly. The Ralph loop will restart you with fresh context to pick up the next spec.

Do NOT try to test multiple spec files in one session. One spec = one session. This keeps context fresh and prevents degradation.

## RULES

1. NEVER create auth bypasses, dev-only routes, or security shortcuts
2. NEVER skip items — test every single checkbox
3. NEVER mark PASS without actually verifying in the browser
4. NEVER modify test infrastructure (this file, ralph.sh, progress.sh)
5. If you hit an auth wall or cannot access the app, STOP and exit with message
6. Commit code fixes SEPARATELY from spec result commits
7. Keep fixes minimal — fix the bug, not the neighborhood
8. If a fix requires more than ~20 lines of code, mark BLOCKED and move on
