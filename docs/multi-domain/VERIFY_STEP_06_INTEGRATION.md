# Step 6: Multi-Domain Integration E2E Tests

## AGENT: Codex (high-stakes — new test code across multiple modules)
## BRANCH: `verify/step-06-multi-domain-e2e`

## BRANCH INSTRUCTIONS (DO THIS FIRST)

```bash
git checkout main
git pull origin main
git checkout -b verify/step-06-multi-domain-e2e
```

## PROMPT

Write new Playwright E2E tests that verify the multi-domain expansion works end-to-end. These tests validate that a non-medical user has a complete, working experience.

Read:
- `docs/multi-domain/MASTER_CONTEXT.md` — what was built
- `docs/multi-domain/GRILL_DECISIONS.md` — design decisions
- `e2e/` — existing test patterns
- `playwright.config.ts` — test configuration

### Tests to Write

Create file: `e2e/journeys/multi-domain.spec.ts`

#### Test 1: Physics User Onboarding
```
1. Navigate to /onboarding
2. Verify 15 domain options are visible
3. Select "Physics & Astronomy"
4. Complete remaining onboarding steps
5. Verify user lands on dashboard
6. Verify SR module is NOT visible in sidebar
7. Verify PICO button is NOT visible
```

#### Test 2: Physics User Search
```
1. Navigate to /research (as physics user)
2. Enter search query: "quantum entanglement"
3. Verify search results appear
4. Verify filter panel shows physics study types (Journal Article, Conference Paper, Preprint) NOT medical types (RCT, Cohort, Case Report)
5. Verify evidence badges use physics hierarchy (Peer-Reviewed Journal, Conference Proceedings, Preprint) NOT medical hierarchy (Level I-V with RCT labels)
6. Verify source filters show relevant sources (arXiv should be available if configured)
```

#### Test 3: Medicine User Unchanged Experience
```
1. Navigate to /onboarding
2. Select "Medicine & Health Sciences"
3. Complete onboarding
4. Navigate to /research
5. Verify filter panel shows medical study types (RCT, Meta-Analysis, Cohort, etc.)
6. Verify SR module IS visible in sidebar
7. Verify PICO IS available
8. Verify Grand Rounds and Patient Case are in presentation types
```

#### Test 4: Domain Change in Settings
```
1. As a medicine user, navigate to /settings
2. Find the "Research Field" section
3. Change domain to "Computer Science & AI"
4. Verify the change is saved
5. Navigate to /research
6. Verify filters now show CS study types, not medical
7. Verify SR module is now hidden from sidebar
```

#### Test 5: Per-Project Domain Override
```
1. As a physics user, create a new project
2. Verify domain defaults to "Physics"
3. Change project domain to "Medicine"
4. Verify the project is created with medicine domain
```

#### Test 6: Feeds Module Domain Filtering
```
1. As a physics user, navigate to /feeds
2. Verify empty state suggests physics journals (NOT NEJM/Lancet)
3. Open journal browser
4. Verify physics journals are visible (Nature Physics, PRL, arXiv feeds)
5. Verify medical journals are NOT prominently shown
```

#### Test 7: Presentation Types Filtering
```
1. As a physics user, navigate to create a presentation
2. Verify audience types include: Conference, Thesis Defense, Lab Meeting
3. Verify audience types do NOT include: Grand Rounds, Patient Case
```

#### Test 8: Guide/Learn Mode Domain Branching
```
1. As a medicine user, open the guide/learn mode
2. Verify the guide mentions CARE, PICO, or other medical terminology
3. As a physics user, open the guide/learn mode
4. Verify the guide does NOT mention CARE, PICO, or medical terminology
5. Verify the guide mentions physics-appropriate guidance (or generic academic guidance)
```

### Test Patterns to Follow

- Use Page Object Model if existing tests use it
- Use existing test utilities for auth/login mocking
- If auth mocking is complex, test only the UI components that don't require a real session
- Follow naming conventions from `e2e/journeys/`

### Important Notes

- These tests may require mocking the user's domain. Check how existing tests handle user state.
- If the dev server isn't set up for E2E testing in Codex's environment, write the tests anyway — they'll be verified locally.
- Some tests may need the DB migration (Step 3) to have run. If `users.domain` column doesn't exist, tests that query it will fail — that's expected and will resolve after migration.

## WHAT NOT TO DO
- DO NOT modify existing E2E tests
- DO NOT modify any source code — only create new test files
- DO NOT modify playwright.config.ts

## COMMIT AND PR

```bash
git add e2e/journeys/multi-domain.spec.ts
git commit -m "test: add multi-domain integration E2E tests

- Physics user onboarding + search + feed filtering
- Medicine user unchanged experience verification
- Domain change in settings
- Per-project domain override
- Presentation types filtering
- Guide/Learn mode domain branching
- 8 integration test scenarios"

git push -u origin verify/step-06-multi-domain-e2e
gh pr create --base main --title "test: Multi-domain integration E2E tests" --body "Post-build verification Step 6."
```
