# Step 1: Full TypeScript + Lint Check

## AGENT: Local terminal (no branch needed — read-only)

## PROMPT

Run a full TypeScript and ESLint check on the entire codebase. We just merged 8 PRs from multiple agents and need to verify there are no type conflicts, missing imports, or lint violations.

```bash
# Step 1: Full TypeScript check
npx tsc --noEmit 2>&1 | tee /tmp/tsc-check.log
echo "Exit code: $?"

# Step 2: Count errors if any
grep -c "error TS" /tmp/tsc-check.log || echo "0 errors"

# Step 3: ESLint on all modified directories
npx eslint src/lib/search/domains/ src/lib/ai/ src/lib/deep-research/ src/lib/rag/ src/components/research/ src/components/feeds/ src/components/presentation/ src/app/api/search/ src/app/api/deep-research/ src/app/api/feeds/ src/data/ --max-warnings 0 2>&1 | tee /tmp/eslint-check.log

# Step 4: Run all domain-related tests
npx vitest run src/lib/search/domains/__tests__/ src/lib/search/__tests__/ src/lib/deep-research/__tests__/ src/lib/rag/__tests__/ src/lib/ai/__tests__/ src/components/presentation/__tests__/ src/components/feeds/__tests__/ src/lib/actions/__tests__/domain-onboarding.test.ts 2>&1 | tee /tmp/test-check.log
```

## EXPECTED OUTCOME
- 0 TypeScript errors
- 0 ESLint errors
- All domain-related tests pass

## IF ERRORS FOUND
List every error. For each, determine:
1. Which issue's PR introduced it
2. Whether it's a type mismatch between two PRs' changes
3. The minimal fix

DO NOT fix anything — just report. Fixes go in Step 8.
