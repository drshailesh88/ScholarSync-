# ScholarSync Self-Annealing System
## program.md — Master Agent Instructions (v2)

> ScholarSync has full documentation: module specs, feature testing docs, and user journey maps.
> This system reads those docs and uses them to generate exhaustive, spec-driven tests.
> The goal: when the human starts manual testing, there is almost nothing left to find.

---

## Philosophy

Big tech teams don't ship better apps because they have more people.
They ship better apps because they have **systematic coverage** — every layer
of the stack is tested, every edge case is documented, every failure mode is handled.

This system replicates that discipline through five sequential hardening phases:

| Phase | Name | What It Does | Temperature |
|-------|------|-------------|-------------|
| 1 | **Foundation** | Test infra, TypeScript strict, linting, basic structure | HOT |
| 2 | **Spec-Driven Testing** | Read specs + docs, generate tests for every documented feature | WARM |
| 3 | **Resilience** | Error handling, network failures, race conditions, edge cases | COOL |
| 4 | **Security & Access** | Auth, input validation, XSS, CSRF, data exposure | COLD |
| 5 | **Polish & Convergence** | Accessibility, performance, UX edge cases, final hardening | FROZEN |

**You do NOT loop randomly.** You complete each phase before moving to the next.
Within each phase, you loop on dimensions until they pass the gate score.

---

## Directory Convention

ScholarSync is a Next.js 16 App Router application. Here is the actual layout:

```
ScholarSync/
  docs/
    MASTER_REGISTRY.md              # Master module registry — read this FIRST
    USER_JOURNEYS.md                # All documented user journeys
    LIBRARY_MAP.md                  # Library/dependency map
    audits/                         # Historical audit reports
    plans/                          # Planning documents
    reports/                        # Generated reports
    research/                       # Research documents

  # Feature testing docs (root-level, one per module):
  DASHBOARD_FEATURES_TESTING.md
  ONBOARDING_FEATURES_TESTING.md
  SETTINGS_FEATURES_TESTING.md
  PROJECTS_FEATURES_TESTING.md
  LIBRARY_FEATURES_TESTING.md
  EDITOR_FEATURES_TESTING.md
  STUDIO_FEATURES_TESTING.md
  RESEARCH_FEATURES_TESTING.md
  LATEX_EDITOR_FEATURES_TESTING.md
  NOTEBOOK_FEATURES_TESTING.md
  COMPLIANCE_FEATURES_TESTING.md
  ANALYSIS_FEATURES_TESTING.md
  DEEP_RESEARCH_FEATURES_TESTING.md
  FEEDS_FEATURES_TESTING.md
  SLIDES_FEATURES_TESTING.md
  SLIDES_AI_GAMMA_FEATURES_TESTING.md
  PRESENTATION_FEATURES_TESTING.md
  ILLUSTRATE_FEATURES_TESTING.md
  POSTER_FEATURES_TESTING.md
  SYSTEMATIC_REVIEW_FEATURES_TESTING.md

  src/                              # Next.js 16 App Router source
    app/                            # Route groups and pages
    components/                     # React components
    lib/                            # Libraries, actions, utilities
    hooks/                          # Custom React hooks

  e2e/
    specs/                          # 376 specs across 20 modules, 12,804 checkpoints
      dashboard/spec-001.md ... spec-009.md
      onboarding/spec-001.md ... spec-007.md
      settings/spec-001.md ... spec-009.md
      projects/spec-001.md ... spec-009.md
      library/spec-001.md ... spec-011.md
      editor/spec-001.md ... spec-038.md
      studio/spec-001.md ... spec-017.md
      research/spec-001.md ... spec-018.md
      latex/spec-001.md ... spec-017.md
      notebook/spec-001.md ... spec-025.md
      compliance/spec-001.md ... spec-016.md
      analysis/spec-001.md ... spec-010.md
      deep-research/spec-001.md ... spec-015.md
      feeds/spec-001.md ... spec-019.md
      slides/spec-001.md ... spec-024.md
      slides-ai/spec-001.md ... spec-021.md
      presentation/spec-001.md ... spec-027.md
      illustrate/spec-001.md ... spec-037.md
      poster/spec-001.md ... spec-015.md
      systematic-review/spec-001.md ... spec-032.md

  qa/                               # QA pipeline (the engine)
    controller.ts                   # Pipeline controller — picks specs, runs tests
    spec-to-playwright.ts           # Generates Playwright tests from spec markdown
    playwright.config.ts            # QA-specific Playwright config (port 3001)
    queue.jsonl                     # SOURCE OF TRUTH — all 376 specs with status
    module-assertions/              # Real assertion logic per module
      dashboard.ts
      onboarding.ts
      settings.ts
      projects.ts
      library.ts
      editor.ts                     # (exists for completed modules)
    generated/                      # Auto-generated Playwright test files
      dashboard/
      editor/
      library/
      onboarding/
      projects/
      settings/
    artifacts/                      # Proof artifacts (screenshots, traces)
```

**First action in every session:** read the key documentation files.

```bash
# 1. Read the master registry
cat docs/MASTER_REGISTRY.md

# 2. Read the user journeys
cat docs/USER_JOURNEYS.md

# 3. Read feature testing docs for the module you're working on
cat <MODULE>_FEATURES_TESTING.md

# 4. Read the spec files for that module
for f in e2e/specs/<module>/spec-*.md; do echo "=== $f ==="; cat "$f"; echo; done

# 5. Read the queue to understand current status
cat qa/queue.jsonl | python3 -c "import sys,json; [print(json.loads(l)['id'], json.loads(l)['status']) for l in sys.stdin]"
```

If docs are in a different location, search for them. They MUST be read before
any test is written. **Documentation-driven testing is the core of this system.**

---

## Module Registry — 20 Modules (376 specs, 12,804 checkpoints)

### Completed Modules (module-assertions written, pass2 done)

| Module | Specs | Status | Assertion File |
|--------|-------|--------|----------------|
| dashboard | 9 | DONE | `qa/module-assertions/dashboard.ts` |
| onboarding | 7 | DONE | `qa/module-assertions/onboarding.ts` |
| settings | 9 | DONE | `qa/module-assertions/settings.ts` |
| projects | 9 | DONE | `qa/module-assertions/projects.ts` |
| library | 11 | DONE | `qa/module-assertions/library.ts` |

### Remaining Modules (need module-assertions written)

| Module | Specs | Assertion File Needed |
|--------|-------|-----------------------|
| editor | 38 | `qa/module-assertions/editor.ts` |
| studio | 17 | `qa/module-assertions/studio.ts` |
| research | 18 | `qa/module-assertions/research.ts` |
| latex | 17 | `qa/module-assertions/latex.ts` |
| notebook | 25 | `qa/module-assertions/notebook.ts` |
| compliance | 16 | `qa/module-assertions/compliance.ts` |
| analysis | 10 | `qa/module-assertions/analysis.ts` |
| deep-research | 15 | `qa/module-assertions/deep-research.ts` |
| feeds | 19 | `qa/module-assertions/feeds.ts` |
| slides | 24 | `qa/module-assertions/slides.ts` |
| slides-ai | 21 | `qa/module-assertions/slides-ai.ts` |
| presentation | 27 | `qa/module-assertions/presentation.ts` |
| illustrate | 37 | `qa/module-assertions/illustrate.ts` |
| poster | 15 | `qa/module-assertions/poster.ts` |
| systematic-review | 32 | `qa/module-assertions/systematic-review.ts` |

**The bottleneck is writing module assertion files for new modules.**

To write a new module assertion file:
1. Read an existing one: `qa/module-assertions/library.ts` or `editor.ts`
2. Read the module's feature testing doc: `<MODULE>_FEATURES_TESTING.md`
3. Read ALL specs for that module: `e2e/specs/<module>/spec-*.md`
4. Write the assertion file following the exact same pattern as existing ones

---

## Phase 0: Setup (Already Done for ScholarSync)

### 0.1 — Read Everything

```bash
# Understand the project structure
find src/ -type f -name "*.ts" -o -name "*.tsx" | head -80
cat package.json
cat tsconfig.json
cat next.config.* 2>/dev/null

# Understand the routing structure
find src/app -name "page.tsx" -o -name "layout.tsx" -o -name "route.ts" | sort

# Understand components
find src/components -type f 2>/dev/null | sort

# Understand hooks, utilities, services
find src/lib src/hooks src/utils src/services -type f 2>/dev/null | sort

# Understand types/interfaces
find src/types src/@types -type f 2>/dev/null | sort
```

### 0.2 — Test Infrastructure (Already Installed)

ScholarSync already has:
- **Vitest** — unit and integration testing
- **Playwright** — E2E testing via the QA pipeline
- **axe-core/playwright** — accessibility testing
- **ESLint** — static analysis
- **TypeScript strict** — type checking

No need to install packages. The QA pipeline is fully operational.

### 0.3 — QA Pipeline Structure (Already Built)

The QA pipeline is the centerpiece. It works like this:

```
queue.jsonl (376 specs)
    |
    v
controller.ts (picks next pending spec)
    |
    v
spec-to-playwright.ts (reads spec markdown, generates Playwright test)
    |
    v
module-assertions/<module>.ts (provides real assertion logic)
    |
    v
Playwright runs the generated test
    |
    v
Results parsed, queue.jsonl updated, spec markdown annotated
```

**Running the pipeline:**

```bash
# Run full queue
npx tsx qa/controller.ts

# Run one module
npx tsx qa/controller.ts --module=<module>

# Run one spec
npx tsx qa/controller.ts --spec=<module>.spec-NNN

# Dry run
npx tsx qa/controller.ts --dry-run
```

### 0.4 — Baseline Measurement

```bash
node quality-score.mjs
```

Record the baseline. This is generation 0.

---

## Phase 1: Foundation (Gate Score: 70+ on all structural dimensions)

**Goal:** Get the codebase into a state where meaningful testing is possible.

### 1.1 — TypeScript Strict Mode

```bash
# Enable strict mode
# In tsconfig.json, set:
# "strict": true,
# "noUncheckedIndexedAccess": true,
# "noImplicitReturns": true,
# "noFallthroughCasesInSwitch": true,
# "forceConsistentCasingInFileNames": true

npx tsc --noEmit --strict 2>&1 | head -100
```

**Fix strategy:**
- Fix type errors file by file, starting with shared utilities and types
- Replace `any` with proper types — prioritize: API routes > hooks > utils > components
- Create proper interfaces for all API request/response shapes
- Create proper interfaces for all database/state shapes
- Add return types to all exported functions
- Do NOT use `@ts-ignore` or `as any` — these are banned

### 1.2 — Lint Configuration

Create a comprehensive ESLint config if one doesn't exist:

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jsx-a11y/recommended",
    "plugin:security/recommended-legacy"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/strict-boolean-expressions": "warn",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "react-hooks/exhaustive-deps": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "security/detect-object-injection": "warn",
    "security/detect-non-literal-regexp": "warn"
  }
}
```

### 1.3 — Error Boundaries

Every route group in `src/app/` needs:
- `error.tsx` — catches runtime errors, shows recovery UI
- `loading.tsx` — shows loading state
- `not-found.tsx` — at the app root at minimum

```bash
# Find all route groups missing error.tsx
find src/app -name "page.tsx" -exec dirname {} \; | sort -u | while read dir; do
  if [ ! -f "$dir/error.tsx" ]; then
    echo "MISSING error.tsx: $dir"
  fi
done

# Find all route groups missing loading.tsx
find src/app -name "page.tsx" -exec dirname {} \; | sort -u | while read dir; do
  if [ ! -f "$dir/loading.tsx" ]; then
    echo "MISSING loading.tsx: $dir"
  fi
done
```

**Create error.tsx for every route that's missing one.** Not a generic one — each
should show context-appropriate error messages.

### 1.4 — API Route Hardening

EVERY API route (`src/app/api/**/route.ts`) must have:

```
- try/catch wrapping every handler
- Input validation (zod, yup, or manual — zod preferred)
- Proper HTTP status codes (400, 401, 403, 404, 500 — not just 200/500)
- Consistent error response shape: { error: string, code?: string, details?: unknown }
- Authentication check (if route is protected)
- Rate limiting awareness (headers or middleware)
- Request size limits
- No raw error messages leaked to client (no stack traces in production)
```

```bash
# Audit all API routes
find src/app/api -name "route.ts" | while read f; do
  echo "=== $f ==="
  echo -n "  try/catch: "; grep -c "try" "$f" 2>/dev/null || echo "0"
  echo -n "  validation: "; grep -c "parse\|validate\|schema" "$f" 2>/dev/null || echo "0"
  echo -n "  auth check: "; grep -c "auth\|session\|token" "$f" 2>/dev/null || echo "0"
done
```

### Phase 1 Gate Check

```
TypeScript strict compiles with 0 errors     -> REQUIRED
ESLint errors = 0 (warnings OK for now)       -> REQUIRED
Every page has error.tsx                       -> REQUIRED
Every API route has try/catch + validation     -> REQUIRED
```

Do not proceed to Phase 2 until all four are met.

---

## Phase 2: Spec-Driven Testing (Gate: All module-assertions written, 80%+ pass rate)

**This is where ScholarSync's QA pipeline shines.**

### 2.1 — The QA Pipeline (How It Works)

ScholarSync has a **spec-driven QA pipeline** that is fundamentally different from
writing tests by hand. The pipeline:

1. Reads structured spec markdown files from `e2e/specs/{module}/spec-NNN.md`
2. Each spec contains numbered checkpoints (e.g., `CP-001: Verify sidebar renders`)
3. `spec-to-playwright.ts` converts the spec into a Playwright test
4. Module assertion files (`qa/module-assertions/<module>.ts`) provide the REAL assertion logic
5. The controller (`qa/controller.ts`) orchestrates the entire loop
6. Results are written back to `qa/queue.jsonl`

**The bottleneck is writing module assertion files.** Each module needs one.

### 2.2 — Writing Module Assertion Files

This is the primary work of Phase 2. For each of the 15 remaining modules:

1. **Read the existing pattern** — study `qa/module-assertions/library.ts` thoroughly
2. **Read the feature testing doc** — e.g., `EDITOR_FEATURES_TESTING.md`
3. **Read every spec** — e.g., all 38 files in `e2e/specs/editor/`
4. **Write the assertion file** — `qa/module-assertions/<module>.ts`
5. **Run the pipeline** — `npx tsx qa/controller.ts --module=<module>`
6. **Fix failures** — iterate until pass rate is acceptable

**Order of attack (by priority and complexity):**

| Priority | Module | Specs | Rationale |
|----------|--------|-------|-----------|
| 1 | editor | 38 | Core feature, most specs |
| 2 | studio | 17 | Key workflow |
| 3 | research | 18 | Core feature |
| 4 | latex | 17 | Core feature |
| 5 | notebook | 25 | High spec count |
| 6 | compliance | 16 | Critical for users |
| 7 | analysis | 10 | Lower spec count |
| 8 | deep-research | 15 | Depends on research |
| 9 | feeds | 19 | Independent module |
| 10 | slides | 24 | Presentation cluster |
| 11 | slides-ai | 21 | Depends on slides |
| 12 | presentation | 27 | Depends on slides |
| 13 | illustrate | 37 | Highest spec count |
| 14 | poster | 15 | Lower priority |
| 15 | systematic-review | 32 | Complex, high spec count |

### 2.3 — Unit Test Generation Per Module

For each module, write tests that verify **every documented behavior**.

**Critical rule: test BEHAVIOR, not implementation.**

```typescript
// BAD — tests implementation
it('calls setUser with the response', () => {
  expect(mockSetUser).toHaveBeenCalledWith(userData);
});

// GOOD — tests behavior the user/doc describes
it('shows the user name in the header after login', async () => {
  render(<Header />);
  await login('test@example.com', 'password');
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

**Testing priorities per module type:**

| Module Type | Priority Tests |
|-------------|---------------|
| Auth | Every auth flow, token handling, role checks, session edge cases |
| API routes | Every endpoint x every input variant x every error state |
| Data display | Loading, empty, error, single item, many items, pagination |
| Forms | Every field validation, submission, server errors, optimistic UI |
| Navigation | Route guards, redirects, deep links, back button |
| State management | Initial state, transitions, persistence, hydration |

### 2.4 — E2E Tests From User Journey Docs

Read `docs/USER_JOURNEYS.md` and create E2E tests for each documented journey.

For EACH journey:

1. Read the journey doc completely
2. Create an E2E test that follows the EXACT steps documented
3. Test the happy path AND every documented failure path
4. Add accessibility checks at each step

```typescript
// e2e/journeys/signup-to-first-use.spec.ts
// Generated from: docs/USER_JOURNEYS.md

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Journey: Signup to First Use', () => {

  test('happy path — complete signup and reach dashboard', async ({ page }) => {
    // Step 1: Land on homepage (from doc)
    await page.goto('/');
    await expect(page).toHaveTitle(/ScholarSync/i);

    // Accessibility check at each major screen
    let a11y = await new AxeBuilder({ page }).analyze();
    expect(a11y.violations.filter(v => v.impact === 'critical')).toHaveLength(0);

    // Continue following documented steps...
  });
});
```

### 2.5 — Form Exhaustive Testing

For EVERY form in the app, test ALL of these:

```
FORM TESTING MATRIX (apply to every form):

Submission:
  - Valid data -> success response -> correct redirect/feedback
  - Submit with all optional fields empty
  - Submit with all optional fields filled
  - Double-click submit button -> only one request sent
  - Submit while previous request is pending -> handled gracefully
  - Server returns 400 -> field-level errors shown
  - Server returns 500 -> generic error message shown
  - Network timeout -> timeout message shown
  - Network offline -> offline message shown

Per-field validation (for EACH field):
  - Empty/missing (if required)
  - Minimum length boundary (min - 1, min, min + 1)
  - Maximum length boundary (max - 1, max, max + 1)
  - Invalid format (wrong email, wrong phone, wrong date, etc.)
  - Special characters: <script>, ', ", \, /, null bytes
  - Unicode: emoji, RTL text, CJK characters, diacritics
  - Whitespace: leading, trailing, only spaces
  - Copy-paste with hidden characters

UX:
  - Tab order follows visual order
  - Enter key submits form
  - Error messages are associated with fields (aria-describedby)
  - Focus moves to first error after failed submission
  - Form preserves input after failed submission (no data loss)
  - Confirmation before navigating away with unsaved changes
  - Disabled state during submission (no re-submit)
  - Loading indicator during submission
```

### Phase 2 Gate Check

```
Module-assertion files written for all 20 modules       -> REQUIRED
Every documented feature has at least one test           -> REQUIRED
Every documented user journey has an E2E test            -> REQUIRED
All unit tests pass                                      -> REQUIRED
All E2E happy paths pass                                 -> REQUIRED
Every form passes the form testing matrix                -> REQUIRED
queue.jsonl shows >= 80% pass rate across all modules    -> REQUIRED
```

---

## Phase 3: Resilience (Gate: App handles every failure gracefully)

### 3.1 — Network Failure Testing

```typescript
// Test every data-fetching component/page under network conditions:

test.describe('Network Resilience', () => {

  test('API timeout -> shows timeout message + retry button', async ({ page }) => {
    await page.route('**/api/**', route => route.abort('timedout'));
    await page.goto('/dashboard');
    await expect(page.getByText(/timed out|try again/i)).toBeVisible();
    // Retry should work
    await page.unroute('**/api/**');
    await page.getByRole('button', { name: /retry|try again/i }).click();
    await expect(page.getByText(/timed out/i)).not.toBeVisible();
  });

  test('API 500 -> shows error state + retry button', async ({ page }) => {
    await page.route('**/api/**', route =>
      route.fulfill({ status: 500, body: JSON.stringify({ error: 'Internal error' }) })
    );
    await page.goto('/dashboard');
    await expect(page.getByText(/something went wrong|error/i)).toBeVisible();
  });

  test('Slow API (3s) -> shows loading state, then data', async ({ page }) => {
    await page.route('**/api/**', async route => {
      await new Promise(r => setTimeout(r, 3000));
      await route.continue();
    });
    await page.goto('/dashboard');
    await expect(page.getByText(/loading/i)).toBeVisible();
    await expect(page.getByText(/loading/i)).not.toBeVisible({ timeout: 10000 });
  });

  test('Partial API failure -> working sections render, failed sections show error', async ({ page }) => {
    await page.route('**/api/widgets**', route =>
      route.fulfill({ status: 500 })
    );
    await page.goto('/dashboard');
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByText(/couldn't load/i)).toBeVisible();
  });

  test('Lost connection mid-action -> queues or warns user', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('button', { name: /save/i }).click();
    await page.context().setOffline(true);
    await expect(page.getByText(/offline|connection/i)).toBeVisible();
    await page.context().setOffline(false);
  });
});
```

### 3.2 — Empty State & Boundary Testing

For EVERY data-displaying component:

```
EMPTY & BOUNDARY MATRIX:

  - Zero items -> shows empty state (not blank, not error)
  - Exactly 1 item -> renders correctly (singular labels, no "items")
  - Typical count (10-50 items) -> renders correctly
  - Large count (1000+ items) -> virtualized or paginated, doesn't freeze
  - Item with missing optional fields -> renders without crashing
  - Item with very long text -> truncates or wraps, doesn't overflow
  - Item with very short text (1 char) -> renders correctly
  - Item with special characters in all text fields
  - Item with null/undefined values -> handled with defaults
  - Data arrives out of order -> renders correctly
  - Stale data (from cache) + fresh data (from API) -> resolves correctly
```

### 3.3 — Race Condition Testing

```typescript
// Common race conditions in ScholarSync:

describe('Race Conditions', () => {
  // User navigates away before data loads
  it('unmount during fetch does not cause state update on unmounted component', () => { ... });

  // User triggers two actions rapidly
  it('rapid filter changes only apply the latest filter', async () => { ... });

  // User submits form, then navigates away
  it('navigation during save either completes save or warns user', async () => { ... });

  // Optimistic update + server rejection
  it('reverts optimistic update when server rejects', async () => { ... });

  // Two tabs open, same user
  it('actions in tab 1 are reflected when tab 2 refocuses', async () => { ... });

  // Token expires mid-session
  it('expired token during action triggers refresh and retries', async () => { ... });
});
```

### 3.4 — State Consistency Testing

```
STATE MATRIX (for every piece of state):

  - Initial state is correct on first load
  - State persists correctly across page navigation (if it should)
  - State clears correctly on logout
  - State hydrates correctly from server (SSR/SSG)
  - State is consistent between URL params and UI
  - Browser back/forward preserves expected state
  - Deep link (direct URL) produces correct state
  - Refresh (F5) preserves expected state
  - Multiple rapid state changes resolve correctly
```

### 3.5 — Error Message Quality Audit

For EVERY error the app can show:

```
ERROR MESSAGE MATRIX:

  - Message is user-friendly (no technical jargon, no stack traces)
  - Message tells the user what happened
  - Message tells the user what to do next (retry, contact support, etc.)
  - Message is associated with the correct field/section
  - Message is accessible (announced by screen readers)
  - Error state has a recovery path (retry button, link to support, etc.)
  - Error doesn't expose internal information (no file paths, SQL, etc.)
```

### Phase 3 Gate Check

```
App never shows blank/white screen on any failure       -> REQUIRED
Every API failure shows a user-friendly message          -> REQUIRED
Every component handles empty/null/undefined data        -> REQUIRED
No console.error in browser during any E2E test          -> REQUIRED
All network failure E2E tests pass                       -> REQUIRED
All race condition tests pass                            -> REQUIRED
State is consistent after: refresh, back, deep link      -> REQUIRED
```

---

## Phase 4: Security & Access Control (Gate: Zero high/critical findings)

### 4.1 — Authentication Testing

```
AUTH TEST MATRIX:

  - Every protected page redirects to login when unauthenticated
  - Every protected API route returns 401 when no token
  - Every protected API route returns 401 with expired token
  - Every protected API route returns 401 with malformed token
  - Every protected API route returns 403 when user lacks permission
  - Token is not exposed in URL params
  - Token is httpOnly, secure, sameSite cookie (if cookie-based)
  - Logout clears all auth state (cookies, localStorage, memory)
  - Session timeout after inactivity -> redirect to login
  - Login from a new device/browser works correctly
  - Cannot access other users' data by changing IDs in URL
```

**How to test every protected route automatically:**

```bash
# Find all API routes
find src/app/api -name "route.ts" | while read f; do
  echo "Route: $f"
  grep -oP 'export async function (GET|POST|PUT|PATCH|DELETE)' "$f"
done
```

```typescript
// Generate auth tests for all API routes
import { test, expect } from '@playwright/test';

const PROTECTED_ROUTES = [
  { method: 'GET', path: '/api/dashboard' },
  { method: 'GET', path: '/api/users/me' },
  { method: 'POST', path: '/api/resources' },
  // ... auto-generate from route discovery
];

for (const route of PROTECTED_ROUTES) {
  test(`${route.method} ${route.path} returns 401 without auth`, async ({ request }) => {
    const response = await request[route.method.toLowerCase()](route.path);
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body).not.toHaveProperty('data'); // No data leak
  });
}
```

### 4.2 — Input Validation & Injection Testing

For EVERY API endpoint that accepts user input:

```
INPUT SECURITY MATRIX:

  - SQL injection: ' OR 1=1 --, '; DROP TABLE users; --
  - XSS: <script>alert('xss')</script>, <img onerror="alert('xss')">
  - NoSQL injection: {"$gt": ""}, {"$ne": null}
  - Path traversal: ../../../etc/passwd, ..%2F..%2F..%2Fetc%2Fpasswd
  - Command injection: ; ls, | cat /etc/passwd, $(whoami)
  - Oversized payload: 10MB JSON body
  - Wrong content type: sending form data when JSON expected
  - Missing required fields: every combination
  - Extra unexpected fields: should be stripped or rejected
  - Type coercion: string where number expected, array where string expected
  - Null bytes: field%00value
  - Unicode bypass attempts
```

### 4.3 — Authorization (IDOR) Testing

```
AUTHORIZATION MATRIX:

For EVERY resource endpoint (GET/PUT/DELETE /api/resources/:id):
  - User A cannot read User B's resource
  - User A cannot update User B's resource
  - User A cannot delete User B's resource
  - Non-admin cannot access admin endpoints
  - Deactivated user cannot access any endpoint
  - Resource IDs are not sequential/guessable (or access is properly checked)
  - Changing resource ID in URL returns 403 (not 404 — don't leak existence)
```

### 4.4 — Data Exposure Audit

```bash
# Check for sensitive data in client-side code
grep -rn "password\|secret\|private_key\|api_key" --include="*.tsx" src/ | grep -v ".test."

# Check for process.env without NEXT_PUBLIC_ in client components
grep -rn "process\.env\." --include="*.tsx" src/ | grep -v "NEXT_PUBLIC"

# Check for console.log that might leak data
grep -rn "console\.log" --include="*.ts" --include="*.tsx" src/ | grep -v ".test.\|.spec."

# Check API responses don't include sensitive fields
grep -rn "password\|hash\|salt\|internal" --include="route.ts" src/app/api/
```

### 4.5 — Dependency Security

```bash
# Full audit
npm audit

# Check for known vulnerable packages
npx better-npm-audit audit

# Check for outdated packages with known issues
npm outdated
```

### Phase 4 Gate Check

```
Every protected route returns 401 without auth           -> REQUIRED
Every API input is validated (no raw req.body usage)      -> REQUIRED
Zero SQL/NoSQL/XSS injection vectors                      -> REQUIRED
No IDOR vulnerabilities (cross-user data access)          -> REQUIRED
No sensitive data in client-side code                     -> REQUIRED
npm audit shows 0 critical, 0 high vulnerabilities        -> REQUIRED
No console.log in production code (use proper logger)     -> REQUIRED
```

---

## Phase 5: Polish & Convergence (Gate: Composite > 95)

### 5.1 — Accessibility Comprehensive Audit

```
ACCESSIBILITY MATRIX (WCAG 2.1 AA):

Keyboard:
  - Every interactive element reachable via Tab
  - Tab order matches visual order
  - Focus indicator visible on all elements
  - No keyboard traps (can Tab out of every modal/dropdown)
  - Escape closes modals/dropdowns
  - Arrow keys work in menus, tabs, radio groups
  - Enter/Space activates buttons and links

Screen Readers:
  - Every image has alt text (meaningful or decorative)
  - Every form input has a label
  - Every error message has aria-describedby linking to the field
  - Dynamic content changes announced via aria-live
  - Modals trap focus and are announced
  - Page titles change on navigation
  - Headings form a logical hierarchy (no skipped levels)
  - Tables have headers (th) and scope attributes
  - Icons have aria-label or are hidden with aria-hidden

Visual:
  - Text contrast ratio >= 4.5:1 (AA) for normal text
  - Text contrast ratio >= 3:1 for large text
  - Non-text contrast ratio >= 3:1 for UI components
  - Content works at 200% zoom
  - Content works with system font size increased
  - No information conveyed by color alone
```

Run axe-core on EVERY page:

```typescript
// e2e/accessibility/full-audit.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = [
  '/dashboard',
  '/library',
  '/editor',
  '/studio',
  '/research',
  '/settings',
  '/settings/profile',
  '/notebooks',
  '/compliance',
  '/analysis',
  '/feeds',
  '/slides',
  '/presentation',
  '/illustrate',
  '/poster',
  // ... every page in the app
];

for (const pagePath of PAGES) {
  test(`Accessibility: ${pagePath}`, async ({ page }) => {
    await page.goto(pagePath);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    for (const v of results.violations) {
      console.log(`[${v.impact}] ${v.id}: ${v.description}`);
      for (const node of v.nodes) {
        console.log(`  -> ${node.target}`);
      }
    }

    expect(results.violations.filter(v =>
      v.impact === 'critical' || v.impact === 'serious'
    )).toHaveLength(0);
  });
}
```

### 5.2 — Performance Basics

```
PERFORMANCE MATRIX:

  - No component renders > 50 items without virtualization
  - All images use next/image with width/height
  - All dynamic imports use next/dynamic for heavy components
  - No synchronous heavy computation in render path
  - API calls are debounced/throttled where appropriate (search, filters)
  - Lists use stable keys (not array index)
  - Memoization on expensive computations (useMemo)
  - Callback stability for child components (useCallback)
  - No unnecessary re-renders (React DevTools Profiler equivalent tests)
```

### 5.3 — UX Edge Cases

```
UX POLISH MATRIX:

  - Every button has a loading state during async operations
  - Every destructive action has a confirmation dialog
  - Long text truncates with ellipsis and tooltip/expand
  - Empty states have helpful messages and CTAs
  - 404 page exists and is helpful
  - Maintenance/offline page exists
  - Breadcrumbs (if present) work correctly
  - Favicon and page titles are correct on every page
  - Meta tags (og:title, og:description) are set for shareable pages
  - Print styles work (if applicable)
  - Browser zoom (67% to 200%) doesn't break layout
  - Timestamps show in user's timezone
  - Numbers are formatted correctly (commas, decimals, currencies)
  - Pluralization is correct ("1 item" vs "2 items")
```

### 5.4 — Final Sweep: Code Quality

```bash
# Dead code
npx ts-prune 2>/dev/null | grep -v "used in module"

# Unused dependencies
npx depcheck 2>/dev/null

# Bundle size check
npx next build 2>&1 | grep -A 20 "Route\|Size"

# Environment variables documented
grep -roh "process.env.\w*\|NEXT_PUBLIC_\w*" --include="*.ts" --include="*.tsx" src/ | sort -u
```

### Phase 5 Gate Check

```
axe-core: 0 critical, 0 serious violations on all pages  -> REQUIRED
All keyboard navigation works                             -> REQUIRED
No dead code or unused dependencies                       -> REQUIRED
All UX edge cases handled                                 -> REQUIRED
Bundle size is reasonable (no accidental large imports)    -> REQUIRED
Composite score > 95                                      -> REQUIRED
3 consecutive cycles with no improvement                  -> CONVERGENCE
```

---

## Known Issues (ScholarSync-Specific)

These are known routing and infrastructure quirks that affect test generation:

### Route Issues

1. **`/studio/[id]` returns 404** — only `/studio` (without an ID param) works.
   Tests that navigate to `/studio/some-id` will fail. Use `/studio` as the base URL.

2. **`/editor` without `[id]` is not a valid route** — the editor requires a document ID.
   `spec-to-playwright.ts` falls back to `/dashboard` when it cannot resolve the editor route.
   Tests for editor must navigate from dashboard to an actual document.

### Auth Bypass (Dev Mode Only)

3. **`__playwright` cookie** — In dev mode, setting the `__playwright` cookie bypasses
   authentication. This is set in `beforeEach` hooks in generated tests.
   ```typescript
   await context.addCookies([{
     name: '__playwright',
     value: 'true',
     domain: 'localhost',
     path: '/',
   }]);
   ```

### Dev Server

4. **QA dev server runs on port 3001** — The QA Playwright config (`qa/playwright.config.ts`)
   points to `http://localhost:3001`. The main app dev server may run on 3000.
   Always start the dev server on port 3001 for QA runs:
   ```bash
   PORT=3001 npm run dev
   ```

---

## The Measurement Loop

After every change, run:

```bash
node quality-score.mjs
```

**Decision logic:**

```
IF composite_after > composite_before:
  git add -A
  git commit -m "anneal(phase-N/dim): score OLD -> NEW | description"
  log(kept)

ELIF composite_after == composite_before AND new tests added:
  git add -A
  git commit -m "anneal(phase-N/dim): +N tests, score unchanged | description"
  log(kept — new coverage)

ELSE:
  git checkout -- .
  git clean -fd
  log(reverted — reason)
```

---

## Session Management

### Starting a New Session

```
Read program.md completely.
Read annealing-log.jsonl — understand all previous work.
Run: git log --oneline -30
Run: node quality-score.mjs
Determine current phase from the log and scores.
Resume from where the last session stopped.
```

### During a Session

- Focus on ONE dimension at a time
- Complete the current phase's checklist items systematically
- Don't skip ahead to a later phase
- Commit after every successful fix
- Log after every cycle (success or revert)

### Ending a Session

```
1. Ensure clean git state (no uncommitted changes)
2. Run final: node quality-score.mjs
3. Append session summary to annealing-log.jsonl:
   {
     "type": "session_summary",
     "session": N,
     "phase": "current phase",
     "starting_composite": X,
     "ending_composite": Y,
     "commits": N,
     "reverts": N,
     "next_priorities": ["...", "...", "..."],
     "blockers": ["anything that needs human input"]
   }
4. Note any blockers that need human decision
```

---

## Escalation to Human

The agent should flag these for the human to handle during manual testing:

```
NEEDS HUMAN:
- Business logic correctness (agent doesn't know your domain rules)
- Visual design accuracy (agent can't see the rendered app)
- Third-party integration testing (real Stripe, real OAuth, real email)
- Performance testing under real data volumes
- Mobile device testing (touch, gestures, viewport)
- Multi-user concurrent testing (real collaboration scenarios)
- Cross-browser visual testing
- Data migration correctness
- Deployment pipeline verification
- Academic citation accuracy (domain-specific validation)
- LaTeX compilation correctness with real documents
- PDF export fidelity
```

Everything else — the agent should handle it all.

---

## Anti-Patterns — Things You Must NOT Do

1. **Don't write snapshot tests** — they break on every change and catch nothing useful
2. **Don't test implementation details** — test behavior the user/doc describes
3. **Don't use `@ts-ignore` or `as any`** — fix the types properly
4. **Don't suppress ESLint with disable comments** — fix the code
5. **Don't skip failing tests** — fix the code or fix the test
6. **Don't mock everything** — mock network boundaries, test logic directly
7. **Don't write tests that pass when the feature is broken** — test the actual assertion
8. **Don't change business logic** — you're hardening, not building features
9. **Don't over-abstract test utilities** — tests should be readable by someone new
10. **Don't add dependencies carelessly** — every dep is a security surface
11. **Don't write E2E tests for unit-testable things** — E2E is expensive, use the right layer
12. **Don't refactor first** — test first, then refactor with test safety net
