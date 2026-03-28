# Step 8: Annealing Self-Heal (if needed)

## AGENT: Local terminal with `claude --dangerously-skip-permissions`
## BRANCH: `verify/step-08-annealing-heal`
## ONLY RUN IF: Steps 4 or 5 found regressions

## BRANCH INSTRUCTIONS (DO THIS FIRST)

```bash
git checkout main
git pull origin main
git checkout -b verify/step-08-annealing-heal
```

## PROMPT

The multi-domain expansion has been merged but annealing or E2E tests found regressions. Your job is to fix them without breaking anything else. Follow TDD (red-green-refactor) for each fix.

Read:
- The output from Step 4 (annealing check) — which dimensions dropped
- The output from Step 5 (E2E tests) — which tests failed
- `docs/multi-domain/GRILL_DECISIONS.md` — design decisions to respect

### Rules

1. **Fix one thing at a time.** One failing test → one fix → verify → commit → next.
2. **Never modify the medicine path.** If a fix would change behavior for `domain=medicine` or `domain=undefined`, STOP and think again.
3. **Run targeted tests after each fix.** Don't wait until the end.
4. **Follow TDD:** Write a test that reproduces the regression FIRST, then fix it.
5. **Preserve the design decisions.** If a regression exists because of a design choice (e.g., medicine using hardcoded path), the fix must respect that choice.

### Common Regression Patterns to Watch For

1. **Type mismatch between PRs:** One PR added a field, another PR expected a different shape. Fix: align the types.
2. **Missing null check:** A function expects `domain` but gets `undefined` from a callsite that wasn't updated. Fix: add `?? "medicine"` fallback.
3. **Import path error:** A new file imports from the wrong path. Fix: correct the import.
4. **Enum mismatch:** New audience types (`lab_meeting`, `departmental_seminar`) added to TypeScript type but not to all consumers. Fix: ensure DB enum, TypeScript type, and all consumers agree.
5. **Test environment missing domain:** E2E tests don't set user domain, so `user.domain` is null and the wrong default kicks in. Fix: set domain in test setup.

### After All Fixes

```bash
# Verify everything passes
npx tsc --noEmit
npx vitest run src/lib/search/ src/lib/deep-research/ src/lib/rag/ src/lib/ai/ src/components/
node quality-score.mjs  # annealing score must be ≥ 95

# Append to annealing log
echo '{"timestamp":"'$(date -u +%Y-%m-%dT%H:%M:%S.000Z)'","composite":SCORE,"temperature":"TEMP","note":"post-multi-domain heal"}' >> annealing-log.jsonl
```

## COMMIT AND PR

```bash
git add -A
git commit -m "fix: heal annealing regressions from multi-domain expansion

- Fixed: [list each fix]
- Annealing score: [new score]
- Temperature: [FROZEN/COLD/etc]"

git push -u origin verify/step-08-annealing-heal
gh pr create --base main --title "fix: Heal multi-domain annealing regressions" --body "Post-build verification Step 8."
```
