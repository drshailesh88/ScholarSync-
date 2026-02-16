# ScholarSync Production Readiness Review

**Date:** 2026-02-16
**Reviewer:** Automated audit + manual verification
**Scope:** Error handling, performance, accessibility, logging, database, Docker, documentation

---

## 1. Error Handling

### Page-Level Error/Loading Boundaries

| Page | error.tsx | loading.tsx |
|------|-----------|-------------|
| /dashboard | PASS | PASS |
| /projects | PASS | PASS |
| /library | PASS | PASS |
| /research | PASS | PASS |
| /studio | PASS | PASS |
| /notebook | PASS | PASS |
| /analysis | PASS | PASS |
| /compliance | PASS | PASS |
| /presentation | PASS | PASS |
| /settings | PASS | PASS |
| /onboarding | **FIXED** (added) | **FIXED** (added) |

All 11 app pages now have `error.tsx` (using shared `ErrorDisplay` component with retry) and `loading.tsx` (using skeleton UI).

### API Route Status Codes

| Pattern | Status |
|---------|--------|
| 400 for bad input (missing fields, invalid plan) | PASS — all routes validate and return 400 |
| 401 for unauthenticated requests | PASS — `getCurrentUserId()` throws, caught by error handler returning 401/500 |
| 503 for unconfigured services (AI, Razorpay) | PASS — checked before processing |
| 500 for server errors (generic safe message) | PASS — `api-utils.ts` logs details server-side, returns safe messages |
| Stack traces never leaked to clients | PASS |

### Unhandled Promise Rejections

| Check | Status |
|-------|--------|
| `.then()` without `.catch()` | PASS — 23 `.then()` calls found, all are either dynamic imports (safe) or inside try/catch blocks |
| `await` without `try/catch` in API routes | PASS — all API handlers wrapped in try/catch |
| `await` without `try/catch` in server actions | PASS — all server actions have error handling |

---

## 2. Performance

### N+1 Queries

| Location | Issue | Severity | Status |
|----------|-------|----------|--------|
| `src/lib/actions/embeddings.ts:34-47` | Individual UPDATE per chunk embedding inside loop | MEDIUM | KNOWN — batch size limits mitigate impact |
| `src/lib/actions/extraction.ts:207-217` | Sequential AI extraction per paper | LOW | KNOWN — intentional rate control for AI API |
| `src/lib/actions/documents.ts:142-154` | 7 individual INSERTs for default sections | LOW | KNOWN — only 7 iterations, one-time per document creation |

**Note:** No critical N+1 patterns found. The embeddings loop processes in batches of 50 and is bounded. The extraction loop is intentionally sequential for AI rate limiting.

### Image Optimization

| Check | Status |
|-------|--------|
| No native `<img>` tags in components | PASS |
| `next/image` used for all content images | PASS — 3 instances in presentation components, all with `alt` text |
| Phosphor icons used for UI icons (not images) | PASS |

### Bundle Size (Next.js Build)

| Metric | Value | Status |
|--------|-------|--------|
| Build completes successfully | Yes | PASS |
| Static pages | 10 | PASS |
| Dynamic pages (server-rendered) | 44 | PASS |
| API routes | 38 | PASS |

---

## 3. Accessibility

| Check | Status | Notes |
|-------|--------|-------|
| Interactive elements keyboard accessible | PASS | Buttons and links use native HTML elements |
| Images have alt text | PASS | All `<Image>` components have `alt` props |
| Form inputs have labels | PASS | Onboarding, settings, research forms have `<label>` elements |
| Color contrast (WCAG AA) | PARTIAL | Dark theme uses high-contrast text (`text-ink` on dark backgrounds). Manual audit with browser DevTools recommended before launch |
| Focus indicators | PASS | `focus:ring-2 focus:ring-brand/40` used on inputs |
| ARIA attributes | PARTIAL | Basic ARIA present, comprehensive screen reader testing recommended |

---

## 4. Logging & Monitoring

### Structured Logger (`src/lib/logger.ts`)

| Check | Status |
|-------|--------|
| Structured format (timestamp, level, message, metadata) | PASS |
| JSON-serializable log entries | PASS |
| Request ID tracking (`withRequestId()`) | PASS |
| Error logging with stack traces | PASS — `logger.error()` extracts `error.message` + `error.stack` |
| Log levels (info, warn, error) | PASS |

### Sensitive Data in Logs

| Check | Status |
|-------|--------|
| No API keys logged | PASS |
| No passwords logged | PASS |
| No tokens logged | PASS |
| No user PII logged | PASS |
| Error messages use safe generic text for clients | PASS |

### Instrumentation (`src/instrumentation.ts`)

| Check | Status |
|-------|--------|
| Runs at server startup | PASS |
| Validates environment variables | PASS |
| Throws in production for missing required vars | PASS |
| Warns in development | PASS |

---

## 5. Database

### Schema Overview

- **71 tables** defined across 6 schema files (core, editor, billing, systematic, institutional, platform)
- **70+ indexes** defined for query optimization
- **All queries via Drizzle ORM** — no raw SQL (parameterized by default)

### Index Coverage

| Category | Status |
|----------|--------|
| Primary keys | PASS — all tables have primary keys |
| Core table userId indexes | PASS — projects, conversations, search_queries, datasets, etc. |
| Core foreign key indexes | PASS — project_papers, paper_chunks, synthesis_*, messages, etc. |

**Missing indexes (non-critical, low-traffic tables):**

| Table | Column | Impact |
|-------|--------|--------|
| subscriptions | userId | LOW — small table, few queries |
| feedback | userId, messageId | LOW — write-heavy, rarely queried |
| documentComments | userId | LOW — scoped by document first |
| documentShares | sharedWithUserId | LOW — small result sets |
| orcidLinks | userId | LOW — 1:1 relationship |
| userProfilesPublic | userId | LOW — 1:1 relationship |

**Recommendation:** Add indexes to `subscriptions.userId` and `documentShares.sharedWithUserId` before scaling beyond 10K users.

### Connection Pooling

| Check | Status |
|-------|--------|
| Singleton database instance | PASS — lazy-init Proxy pattern |
| Connection reuse across requests | PASS |
| Explicit pool size configuration | NOT SET — relies on postgres-js defaults (10 connections) |

**Recommendation:** Add explicit pool configuration for production:
```typescript
const client = postgres(process.env.DATABASE_URL, {
  max: 20,
  idle_timeout: 20,
  connect_timeout: 10,
});
```

### Migrations

| Check | Status |
|-------|--------|
| Drizzle Kit configured | PASS |
| Schema push available (`npx drizzle-kit push`) | PASS |
| Migration generation available (`npx drizzle-kit generate`) | PASS |

---

## 6. Docker

| Check | Value | Status |
|-------|-------|--------|
| Build succeeds | Yes | PASS |
| Image size | 82.7 MB | PASS (well under 500 MB target) |
| Base image | node:22-alpine | PASS |
| Multi-stage build | Yes (deps → builder → runner) | PASS |
| Non-root user | Yes (nextjs:nodejs) | PASS |
| Standalone output | Yes | PASS |
| Health check endpoint | `/api/health` available | PASS |

---

## 7. Documentation

| Document | Status |
|----------|--------|
| README.md — How to run locally | **FIXED** (rewritten with step-by-step guide) |
| README.md — Required environment variables | **FIXED** (full table added) |
| README.md — How to run tests | **FIXED** (unit, coverage, e2e commands) |
| README.md — How to deploy | **FIXED** (Docker + env vars + CI/CD overview) |
| SECURITY_AUDIT.md | PASS — comprehensive audit report |
| BRANCH_PROTECTION.md | PASS — branch protection setup guide |

---

## Summary

### Fixed in This Review

1. Added `error.tsx` and `loading.tsx` for `/onboarding` page
2. Rewrote `README.md` with local setup, env vars, tests, Docker, and deployment sections

### What Passes

| Category | Verdict |
|----------|---------|
| Error handling (boundaries + API codes) | PASS |
| Unhandled promise rejections | PASS |
| Image optimization (next/image) | PASS |
| Structured logging | PASS |
| No sensitive data in logs | PASS |
| SQL injection protection | PASS |
| Docker build (82.7 MB) | PASS |
| CI/CD pipeline (6 jobs) | PASS |
| Security audit (see SECURITY_AUDIT.md) | PASS |

### What Needs Work Before Launch

| Item | Priority | Effort |
|------|----------|--------|
| Add `Content-Security-Policy` header | HIGH | 2-4 hours |
| Configure Upstash Redis for production rate limiting (currently in-memory) | HIGH | 2-3 hours |
| Add explicit DB connection pool config (`max: 20`) | MEDIUM | 15 minutes |
| Add missing DB indexes (subscriptions.userId, documentShares.sharedWithUserId) | MEDIUM | 30 minutes |
| WCAG AA color contrast audit with browser DevTools | MEDIUM | 2-3 hours |
| Screen reader testing (ARIA completeness) | MEDIUM | 4-6 hours |
| Set `CORS_ALLOWED_ORIGINS` to production domain | MEDIUM | 5 minutes |
| Add PDF magic bytes validation (defense-in-depth) | LOW | 1 hour |
| Batch embeddings UPDATE (N+1 in embeddings.ts) | LOW | 1-2 hours |
| Add Zod validation to remaining 19 manually-validated API routes | LOW | 3-4 hours |

### Recommended Timeline

| Milestone | Items | Target |
|-----------|-------|--------|
| **Pre-launch (must-have)** | CSP header, Redis rate limiter, CORS config, DB pool config | 1 day |
| **Launch week** | Missing indexes, color contrast audit, screen reader testing | 2-3 days |
| **Post-launch (iteration)** | Zod migration, PDF magic bytes, embeddings batching | 1-2 weeks |

---

**Overall Verdict: Ready for staging deployment. 3 high-priority items remain before production launch.**
