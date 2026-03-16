Read qa/annealing/HANDOFF.md for full context.
git checkout hardening/session-1 && git pull origin hardening/session-1

DO NOT modify quality-score.mjs or any scorer files.
DO NOT modify qa/module-assertions/ files or qa/queue.jsonl.
DO NOT re-run the E2E spec pipeline (sessions 1-10 work). That is done.

YOUR ONLY JOB: Write and run real Playwright E2E user journey tests.

Read docs/USER_JOURNEY_DOCUMENTATION.md completely — it documents 25 module journeys
and cross-module flows across the entire app. This is your source of truth.

IMPORTANT CONTEXT:
- Dev server runs on port 3001 (not 3000)
- Auth bypass: set cookie __playwright=true in test beforeEach (dev mode only)
- No real database — pages may show empty states, that's OK
- Test that routes load, navigation works, and cross-module flows connect
- Use @playwright/test (NOT vitest)

Create directory: e2e/journeys/

=== JOURNEY 1: Search -> Save -> Synthesize -> Write ===
File: e2e/journeys/search-to-write.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Section 5 (Literature Search) + Section 6 (Notebook) + Section 4 (Studio)
Flow:
  1. Go to /research
  2. Verify search input renders, enter a query
  3. Verify results area appears (even if empty due to no API keys)
  4. Navigate to /notebook
  5. Verify notebook interface loads (chat input, source panel)
  6. Navigate to /studio
  7. Verify editor loads (TipTap editor area, toolbar, sidebar tabs)
  8. Verify the full navigation chain works without errors

=== JOURNEY 2: Deep Research -> Library -> Presentation ===
File: e2e/journeys/research-to-presentation.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Section 7 (Deep Research) + Section 8 (Library) + Section 10 (Presentation)
Flow:
  1. Go to /deep-research
  2. Verify topic input and mode selector render
  3. Navigate to /library
  4. Verify library page loads (papers list or empty state)
  5. Navigate to /presentation/new
  6. Verify presentation wizard loads (source selector, template picker)
  7. Verify cross-module navigation is seamless

=== JOURNEY 3: Draft Quality Gate Before Submission ===
File: e2e/journeys/quality-gate.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Section 4 (Studio) + Section 16 (Compliance)
Flow:
  1. Go to /studio
  2. Verify editor loads, type some text if possible
  3. Navigate to /compliance
  4. Verify compliance checks interface loads (plagiarism, AI detection panels)
  5. Navigate to /analysis
  6. Verify writing analysis page loads
  7. Test the "write -> check -> review" cycle navigates cleanly

=== JOURNEY 4: Systematic Review Publication Pipeline ===
File: e2e/journeys/systematic-review-pipeline.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Section 12 (Systematic Review)
Flow:
  1. Go to /systematic-review
  2. Verify project list or empty state renders
  3. Check that "New Review" or project creation UI is accessible
  4. Verify sub-panels exist: Protocol, Search Strategy, Screening, Extraction
  5. Verify PRISMA, RoB, Meta-Analysis, GRADE panels are accessible
  6. Test navigation between review stages

=== JOURNEY 5: AI Presentation from Research ===
File: e2e/journeys/ai-presentation.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Section 9 (Slides) + Section 10 (Presentation)
Flow:
  1. Go to /slides/new
  2. Verify deck creation wizard loads (topic, audience, theme inputs)
  3. Navigate to /presentation/new
  4. Verify AI presentation wizard loads (source selector, template picker)
  5. Compare both paths — slides (manual) vs presentation (AI-powered)

=== JOURNEY 6: LaTeX Paper Writing (NEW — not in original plan) ===
File: e2e/journeys/latex-writing.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Section 11 (LaTeX Editor)
Flow:
  1. Go to /latex/new
  2. Verify template picker and compiler choice render
  3. Verify editor workspace loads (file tree, source editor, preview pane)
  4. Check toolbar actions are present (compile, AI tools, comments)
  5. Verify the LaTeX-specific UI (syntax highlighting, diagnostics panel)

=== JOURNEY 7: PDF Chat & Notebook (NEW — user's key question) ===
File: e2e/journeys/pdf-notebook.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Section 6 (Notebook)
Flow:
  1. Go to /notebook
  2. Verify chat interface renders (message input, mode selector)
  3. Check that source attachment UI exists (upload, URL, library import)
  4. Verify structured extraction cards area exists
  5. Check audio overview panel is accessible
  6. Verify share dialog is accessible

=== JOURNEY 8: Scientific Illustration (NEW — covers illustrate module) ===
File: e2e/journeys/illustration.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Section 13 (Illustration)
Flow:
  1. Go to /illustrate
  2. Verify welcome page with mode selection (Agent vs Editor)
  3. Navigate to agent mode — verify template gallery, prompt input, chat
  4. Navigate to editor mode — verify canvas, toolbar, layers panel, properties
  5. Check export dialog is accessible

=== JOURNEY 9: Module Entry Points (all 20 modules) ===
File: e2e/journeys/module-entries.spec.ts
Test EVERY module route loads without crashing:
  /dashboard, /onboarding, /settings, /projects, /library,
  /studio, /research, /deep-research, /notebook, /latex/new,
  /compliance, /analysis, /feeds, /slides, /slides/new,
  /presentation/new, /illustrate, /poster/new, /systematic-review

For each:
  1. Navigate to the route
  2. Verify page loads (no blank screen, no uncaught error)
  3. Verify key UI element is visible (heading, main panel, or empty state)
  4. Verify sidebar navigation is present

=== HOW TO WRITE EACH TEST ===

```typescript
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.addCookies([{
    name: '__playwright',
    value: 'true',
    domain: 'localhost',
    path: '/',
  }]);
});

test('Journey: Search to Write', async ({ page }) => {
  // Step 1: Start at research
  await page.goto('http://localhost:3001/research');
  await expect(page.locator('body')).not.toContainText('Application error');
  // ... continue with specific assertions
});
```

=== EXECUTION ===

For each journey file:
1. Write the test
2. Run: npx playwright test e2e/journeys/<file>.spec.ts --reporter=list
3. If it fails, fix the test (not the app code — unless it's a real bug)
4. Commit when passing

After all journeys pass:
1. Run: node quality-score.mjs
2. Log results to annealing-log.jsonl
3. Commit everything
4. Push: git push origin hardening/session-1

Go.
