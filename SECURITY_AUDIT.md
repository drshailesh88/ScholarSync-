# ScholarSync Security Audit Report

**Date:** 2026-02-16
**Scope:** Full codebase audit (54 API routes, auth, billing, file handling, headers)
**Platform:** Medical research platform with payment processing

---

## 1. Dependency Vulnerabilities

| Finding | Severity | Status |
|---------|----------|--------|
| esbuild <=0.24.2 (dev-server request forwarding) | MODERATE | Dev-only, via drizzle-kit. Not exploitable in production. |

**Details:** 4 moderate vulnerabilities, all in `esbuild` dependency chain through `drizzle-kit` (dev tool only). The vulnerability allows any website to send requests to the esbuild dev server — irrelevant in production since esbuild doesn't run there.

**Action:** No fix needed. `npm audit fix --force` would downgrade drizzle-kit to a breaking version.

---

## 2. Hardcoded Secrets Scan

| Finding | Severity | Status |
|---------|----------|--------|
| No real secrets in source code | N/A | PASS |
| Git history shows `sk-ant-placeholder` (not a real key) | N/A | PASS |
| `api_key` in PubMed/CrossRef URLs are NCBI E-utility keys (public) | LOW | PASS |
| Test files use fake keys (`"sk-test"`, `"test-key"`) | N/A | PASS |

**Git history check:** `git log --all -p | grep "sk-ant-"` only shows `sk-ant-placeholder` references — no real API keys ever committed.

---

## 3. Environment Variable Validation

| Check | Status |
|-------|--------|
| `DATABASE_URL` required always | PASS |
| `CLERK_SECRET_KEY` required in production | PASS |
| `RAZORPAY_KEY_*` required in production | FIXED (added) |
| No NEXT_PUBLIC_ prefix on secrets | PASS |
| No fallback values for production secrets | PASS |
| AI key warning (non-blocking) | PASS |

**Fix applied:** Added `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `RAZORPAY_WEBHOOK_SECRET` to production-required env vars in `src/lib/env.ts`.

---

## 4. Authentication & Authorization

| Check | Status |
|-------|--------|
| Middleware protects all /(app)/ routes | PASS |
| Middleware protects all /api/ routes (except public) | PASS |
| Public routes: `/`, `/sign-in`, `/sign-up`, `/api/webhooks`, `/api/health` | PASS |
| DEV_USER_ID bypass only in `NODE_ENV === "development"` | PASS |
| Production without Clerk keys returns 503 (not silent bypass) | PASS |
| Webhook routes verify signatures | PASS |

**Note:** Middleware provides first-layer auth. Individual API routes also call `getCurrentUserId()` for user-scoped data. The DEV_USER_ID fallback is properly gated behind `isDev` check.

---

## 5. API Route Security

### Input Validation

| Category | Count | Status |
|----------|-------|--------|
| Routes with Zod validation | 17 | PASS |
| Routes with manual validation | 19 | MEDIUM (acceptable, all validate required fields) |
| Routes with no validation | 0 | PASS |

**Note:** All routes validate required fields. 17 use formal Zod schemas, others use manual `if (!field)` checks. Manual validation is acceptable but Zod is recommended for future routes.

### SQL Injection Protection

| Check | Status |
|-------|--------|
| Raw SQL (`sql\``, `.execute()`) usage | None found |
| All queries via Drizzle ORM (parameterized) | PASS |

### Rate Limiting

| Category | Count | Status |
|----------|-------|--------|
| Routes with rate limiting before audit | 22 | PASS |
| Routes missing rate limiting (fixed) | 15 | FIXED |

**Fix applied:** Added `getCurrentUserId()` + `checkRateLimit()` to:
- All 12 research routes (17 handlers total)
- `/api/billing/create-order` (POST)
- `/api/billing/verify-payment` (POST)
- `/api/precision-edit` (POST)

### Error Handling

| Check | Status |
|-------|--------|
| Raw error messages leaked to clients | None found |
| Stack traces in responses | None found |
| `api-utils.ts` logs details server-side, returns safe messages | PASS |

---

## 6. Payment Security (Razorpay)

| Check | Severity | Status |
|-------|----------|--------|
| Webhook signature verification | N/A | PASS |
| Timing-safe signature comparison | CRITICAL | FIXED |
| Server-side pricing (PLAN_PRICES) | N/A | PASS |
| No client-side amount manipulation | N/A | PASS |
| Plan validation in verify-payment | HIGH | FIXED |
| Auth on billing routes | HIGH | FIXED |
| Rate limiting on billing routes | HIGH | FIXED |
| Billing env vars required in production | MEDIUM | FIXED |

**Fixes applied:**
- `verifyPaymentSignature()` now uses `crypto.timingSafeEqual()` instead of `===`
- Webhook route signature check also uses `crypto.timingSafeEqual()`
- `verify-payment` route now validates plan against `PLAN_PRICES` whitelist
- `verify-payment` route now requires authentication (was importing but not using `getCurrentUserId`)
- Both billing mutation routes now have rate limiting

---

## 7. File Upload Security

| Check | Status |
|-------|--------|
| PDF upload size limit (20MB basic, 50MB advanced) | PASS |
| MIME type check (`application/pdf`) | PASS |
| Filename extension check (`.pdf`) | PASS |
| No path traversal (in-memory processing via File API) | PASS |
| Files not stored in public directory | PASS |
| Magic bytes validation | LOW (not checked, relies on MIME type) |

---

## 8. XSS Prevention

| Check | Status |
|-------|--------|
| No `dangerouslySetInnerHTML` in components | PASS |
| Tiptap stores content as JSON (not raw HTML) | PASS |
| API responses return JSON (no raw HTML) | PASS |
| React auto-escapes rendered content | PASS |
| DOCX export safely parses inline HTML with tag whitelist | PASS |

---

## 9. CSRF Protection

| Check | Status |
|-------|--------|
| Next.js Server Actions have built-in CSRF (not disabled) | PASS |
| API routes use auth tokens (not cookies alone) | PASS |
| No custom CSRF bypass | PASS |

---

## 10. Security Headers

| Header | Status |
|--------|--------|
| `X-Content-Type-Options: nosniff` | FIXED (added) |
| `X-Frame-Options: DENY` | FIXED (added) |
| `X-XSS-Protection: 1; mode=block` | FIXED (added) |
| `Referrer-Policy: strict-origin-when-cross-origin` | FIXED (added) |
| `Permissions-Policy: camera=(), microphone=(), geolocation=()` | FIXED (added) |
| `Strict-Transport-Security` (production only) | FIXED (added) |
| `Content-Security-Policy` | NOT SET (recommend adding before production) |

**Fix applied:** Added all security headers via `next.config.ts` `headers()` function. HSTS only applies in production.

---

## 11. CORS

| Check | Severity | Status |
|-------|----------|--------|
| Multi-origin CORS bug (only first origin used) | MEDIUM | FIXED |
| Dev allows `*` (OK for development) | LOW | PASS |
| Production requires `CORS_ALLOWED_ORIGINS` env var | N/A | PASS |

**Fix applied:** `addCorsHeaders()` in `api-utils.ts` now validates the request `Origin` header against the full allowed origins list, instead of always using the first entry.

---

## Summary of Fixes Applied

### CRITICAL
1. Timing-safe comparison for Razorpay payment signature verification (`src/lib/billing/razorpay.ts`)
2. Timing-safe comparison for Razorpay webhook signature verification (`src/app/api/billing/webhook/route.ts`)

### HIGH
3. Added authentication to 14 unprotected API routes (12 research + billing verify-payment + precision-edit)
4. Added rate limiting to 15 unprotected API routes
5. Added plan validation whitelist to `verify-payment` route
6. Added billing env vars to production-required validation

### MEDIUM
7. Added security headers (X-Frame-Options, X-Content-Type-Options, HSTS, etc.) to `next.config.ts`
8. Fixed CORS multi-origin bug in `api-utils.ts`

---

## Recommendations for Production Deployment

### Before Launch
1. Add `Content-Security-Policy` header with appropriate directives
2. Set `CORS_ALLOWED_ORIGINS` to your production domain(s)
3. Configure Upstash Redis for production rate limiting (currently in-memory)
4. Replace Bearer token auth in `/api/migrate-pdfs` with admin role check
5. Add Zod validation to remaining 19 routes using manual validation

### Ongoing
1. Run `npm audit` in CI pipeline
2. Enable Dependabot or similar for dependency updates
3. Rotate API keys periodically
4. Monitor rate limit hit rates for abuse detection
5. Add PDF magic bytes validation for defense-in-depth
6. Consider adding request logging/audit trail for billing operations

---

**All 335 unit tests pass after fixes. Zero TypeScript compilation errors.**
