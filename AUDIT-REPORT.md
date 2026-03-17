# Audit Report

Date: 2026-03-16
Auditor stance: adversarial, independent, no trust in the scorer.

## Initial scorer output

Independent `node quality-score.mjs` before fixes:

| Dimension | Score |
| --- | ---: |
| TypeScript Strict | 96.56 |
| Lint Cleanliness | 100 |
| Error Boundaries | 100 |
| API Route Hardening | 100 |
| Spec Pass Rate | 49.47 |
| Checkpoint Pass Rate | 49.74 |
| Module Coverage | 65 |
| Assertion Module Coverage | 100 |
| Unit Pass Rate | 99.87 |
| Network Resilience | 100 |
| Empty/Boundary States | 100 |
| Error Message Quality | 98.41 |
| State Consistency | 100 |
| Auth Security | 100 |
| Input Validation | 99.53 |
| Dependency Security | 100 |
| Accessibility | 100 |
| Composite | 85.76 |

## Dimension verdicts

| Dimension | Verdict | Evidence |
| --- | --- | --- |
| TypeScript Strict | REAL | `npx tsc --noEmit 2>&1 | grep "error TS" | wc -l` returned `0` for `src/`. Non-test `any` usage is still high: `177`. |
| Lint Cleanliness | REAL | `npx eslint . --ext .ts,.tsx` finished with `0` errors and `0` warnings. |
| Error Boundaries | PARTIALLY GAMED | Score is based on file presence (`page.tsx` / `error.tsx` / `loading.tsx`), not runtime behavior. |
| API Route Hardening | PARTIALLY GAMED | Claimed `100` was inflated by comment-only `validate/schema/zod` keywords in route files. After replacing comment bait with executable validation or removing fake auth comments, score dropped to `99.11`. |
| Spec Pass Rate | PARTIALLY GAMED | This measures `qa/queue.jsonl` status fields, not executed specs. It is bookkeeping, not proof. |
| Checkpoint Pass Rate | PARTIALLY GAMED | Same issue: queue metadata, not live test execution. |
| Module Coverage | PARTIALLY GAMED | Based on queue module status, not real behavioral coverage. |
| Assertion Module Coverage | PARTIALLY GAMED | Scorer only checks whether a module-named assertion file exists. `qa/module-assertions/slides-ai.ts` is real and its referenced files exist, but the dimension itself is shallow. |
| Unit Pass Rate | PARTIALLY GAMED | It is real when run cleanly, but the claimed number was unstable/stale. Independent clean sequential run: `passed: 6046 failed: 0 total: 6048`, which is `99.97`, not the claimed `99.95`. |
| Network Resilience | PARTIALLY GAMED | Scorer is grep-based (`retry`, `timeout`, `offline`, etc.), so keywords can overstate behavior. |
| Empty/Boundary States | PARTIALLY GAMED | Scorer is grep-based on text like `empty`, `no results`, `.length === 0`. |
| Error Message Quality | PARTIALLY GAMED | Score is produced by string matching, not user-level review. |
| State Consistency | PARTIALLY GAMED | Score is produced by presence of `useSearchParams`, `loading`, `optimistic`, not by invariant checks. |
| Auth Security | PARTIALLY GAMED | `src/middleware.ts` correctly re-exports `proxy`, and `src/proxy.ts` contains real Clerk middleware, but `/api(.*)` is explicitly public in `isPublicRoute`. Route-level auth is doing most of the work. The scorer still gives `100` for a very weak reason. |
| Input Validation | PARTIALLY GAMED | Better than auth, but still mostly regex-driven (`zod`, `safeParse`, `schema`, `validate`). |
| Dependency Security | PARTIALLY GAMED | Scorer trusts `npm audit --json`; if audit execution fails or is degraded, it can default to an empty vulnerability set and still score `100`. |
| Accessibility | REAL | Full-repo lint and the scorer’s own checks stayed clean. The user-provided `grep` command for `alt=` is flawed, but the scorer’s missing-alt/missing-label checks still returned `100`. |

## Comment-only keyword routes found

These routes were receiving hardening/auth credit from comments instead of executable code:

Validation keyword only in comments:
- `src/app/api/seed/route.ts`
- `src/app/api/sentry-test/route.ts`
- `src/app/api/health/route.ts`
- `src/app/api/deep-research/execute/route.ts`
- `src/app/api/search/unpaywall/route.ts`
- `src/app/api/feeds/discover/route.ts`
- `src/app/api/feeds/articles/journals/route.ts`
- `src/app/api/illustration/icons/route.ts`
- `src/app/api/liveblocks-webhook/route.ts`
- `src/app/api/billing/subscription/route.ts`
- `src/app/api/cron/fetch-feeds/route.ts`
- `src/app/api/cron/check-alerts/route.ts`

Auth keyword only in comments:
- `src/app/api/sentry-test/route.ts`
- `src/app/api/health/route.ts`
- `src/app/api/illustration/icons/route.ts`
- `src/app/api/liveblocks-webhook/route.ts`
- `src/app/api/webhooks/clerk/route.ts`
- `src/app/api/billing/webhook/route.ts`

## Fixes applied

Routes changed to replace comment-only signals with executable behavior:

- Added real validation helpers or schemas to:
  - `src/app/api/seed/route.ts`
  - `src/app/api/sentry-test/route.ts`
  - `src/app/api/health/route.ts`
  - `src/app/api/deep-research/execute/route.ts`
  - `src/app/api/search/unpaywall/route.ts`
  - `src/app/api/feeds/discover/route.ts`
  - `src/app/api/feeds/articles/journals/route.ts`
  - `src/app/api/illustration/icons/route.ts`
  - `src/app/api/liveblocks-webhook/route.ts`
  - `src/app/api/billing/subscription/route.ts`
  - `src/app/api/cron/fetch-feeds/route.ts`
  - `src/app/api/cron/check-alerts/route.ts`
- Removed misleading comment-only auth bait from:
  - `src/app/api/sentry-test/route.ts`
  - `src/app/api/health/route.ts`
  - `src/app/api/illustration/icons/route.ts`
  - `src/app/api/webhooks/clerk/route.ts`
  - `src/app/api/billing/webhook/route.ts`
  - `src/app/api/liveblocks-webhook/route.ts`

I did **not** add `getCurrentUserId()` to endpoints that are intentionally public or webhook-driven just to satisfy the scorer. That would be a worse form of gaming.

## Routes still lacking real validation/auth despite the old `100`

These are the routes that still do not deserve blanket auth credit:

- `src/app/api/health/route.ts`
  - Public health check by design.
  - Should not be counted as an authenticated route.
- `src/app/api/sentry-test/route.ts`
  - Public failure-injection route by design.
  - Should not be counted as an authenticated route.
- `src/app/api/illustration/icons/route.ts`
  - Public static asset route by design.
  - Should not be counted as an authenticated route.
- `src/app/api/liveblocks-webhook/route.ts`
  - Has payload validation now, but still lacks real webhook signature verification.
- `src/app/api/webhooks/clerk/route.ts`
  - Has payload validation now, but still lacks real Clerk/Svix signature verification.

## Middleware / proxy audit

- `src/middleware.ts` is a real re-export:
  - `export { proxy as middleware, config } from "./proxy";`
- `src/proxy.ts` contains real Clerk middleware and security headers.
- Important weakness:
  - `isPublicRoute` includes `"/api(.*)"`.
  - That means API routes are **not** globally protected by middleware.
  - Any claim that middleware alone gives API auth security is overstated.

## Assertion module check

- `qa/module-assertions/slides-ai.ts` contains real assertions, not empty stubs.
- All referenced `src/...` paths extracted from that file existed at audit time.
- The file is real.
- The dimension is still shallow because the scorer only asks whether module-named assertion files exist.

## Post-fix scorer output

`node quality-score.mjs` after route fixes:

| Dimension | Score |
| --- | ---: |
| TypeScript Strict | 96.56 |
| Lint Cleanliness | 100 |
| Error Boundaries | 100 |
| API Route Hardening | 99.11 |
| Spec Pass Rate | 49.47 |
| Checkpoint Pass Rate | 49.74 |
| Module Coverage | 65 |
| Assertion Module Coverage | 100 |
| Unit Pass Rate | 99.97 |
| Network Resilience | 100 |
| Empty/Boundary States | 100 |
| Error Message Quality | 98.41 |
| State Consistency | 100 |
| Auth Security | 100 |
| Input Validation | 99.54 |
| Dependency Security | 100 |
| Accessibility | 100 |
| Composite | 85.70 |

## End-to-end verification after fixes

Clean sequential re-run results:

- `npx vitest run --reporter=json` => `passed: 6046 failed: 0 total: 6048`
- `npx tsc --noEmit` => passed
- `npx eslint . --ext .ts,.tsx` => passed

## Recommended next fixes

- Implement real webhook signature verification in:
  - `src/app/api/liveblocks-webhook/route.ts`
  - `src/app/api/webhooks/clerk/route.ts`
- Tighten `scoreAuthSecurity`, `scoreApiHardening`, `scoreAssertionModuleCoverage`, and the queue-based phase-2 metrics so they measure behavior rather than comments, file names, or JSONL status.
- Stop treating public endpoints as evidence of route auth.
- Decide whether skipped tests should count against `Unit Pass Rate`; the scorer currently treats `6046/6048` as `99.97`.
