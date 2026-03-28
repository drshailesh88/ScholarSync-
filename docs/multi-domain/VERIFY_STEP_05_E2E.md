# Step 5: Full E2E Journey Tests (139 tests)

## AGENT: Local terminal
## PREREQUISITE: Step 3 (DB migration) must be complete

## PROMPT

Run the complete Playwright E2E journey test suite. These 139 tests cover all user journeys across all 20 modules. They must all pass — any failure means the multi-domain work broke an existing flow.

```bash
# Make sure dev server is running
# npm run dev (in another terminal, or use the webServer config)

# Run full E2E suite
npx playwright test 2>&1 | tee /tmp/e2e-results.log

# Also run the QA spec suite
npx playwright test --config qa/playwright.config.ts 2>&1 | tee /tmp/qa-results.log
```

## EXPECTED OUTCOME
- 139/139 journey tests pass
- 376/376 QA specs pass
- Zero new failures

## IF TESTS FAIL
For each failure:
1. Is it a regression from multi-domain work, or a pre-existing flake?
2. Check if the failure is in a module we touched (search, deep research, RAG, guide, presentation, poster, feeds, onboarding, settings)
3. Check if the failure is related to domain config (missing default, wrong fallback, type error)

Report failures with: test name, module, error message, likely cause.

## IMPORTANT
DO NOT modify any code or tests. This is measurement only. Fixes go in Step 8.
