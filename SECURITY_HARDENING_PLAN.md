# Security Hardening Plan — ScholarSync

**Date:** 2026-02-28
**Scope:** Findings beyond the initial security audit (SECURITY_AUDIT.md, 2026-02-16)
**Method:** Deep codebase analysis across auth, data exposure, input surfaces, and infrastructure

---

## P0 — Critical (Fix Before Production)

### 1. Liveblocks Room Authorization Bypass

**File:** `src/app/api/liveblocks-auth/route.ts:72-73`

**Problem:** Any authenticated user can request FULL_ACCESS to ANY Liveblocks room by passing an arbitrary `room` value in the request body. No ownership or collaborator check exists.

```typescript
// CURRENT — no validation
const { room } = await req.json();
session.allow(room, session.FULL_ACCESS);
```

**Impact:** Any authenticated user can edit any presentation (`presentation:{deckId}`) or any systematic review project (`sr-project-{projectId}`).

**Fix:** Parse the room ID to extract the resource type and ID. Verify the authenticated user is the owner or a collaborator of that resource before granting access.

---

### 2. Liveblocks Webhook Not Signature-Verified

**File:** `src/app/api/liveblocks-webhook/route.ts:17-23`

**Problem:** The webhook endpoint accepts any POST request without verifying the `Liveblocks-Signature` header. An attacker can send forged `storageUpdated` events to corrupt slide data via `updateSlide()`.

**Fix:** Validate the webhook signature using `@liveblocks/node` `WebhookHandler` or manual HMAC-SHA256 verification against `LIVEBLOCKS_SECRET_KEY`, similar to the Razorpay webhook implementation.

---

### 3. Clerk Webhook Not Signature-Verified

**File:** `src/app/api/webhooks/clerk/route.ts:7-8`

**Problem:** Comment says "In production, verify webhook signature with svix" but it's not implemented. Attacker can spoof `user.created`/`user.updated`/`user.deleted` events to create fake accounts or inject malicious user data.

**Fix:** Install `svix` package and verify the `Svix-Id`, `Svix-Timestamp`, and `Svix-Signature` headers using `CLERK_WEBHOOK_SECRET`.

---

### 4. Unauthenticated Live Session SSE Stream

**File:** `src/app/api/live-session/[sessionId]/stream/route.ts:24`

**Problem:** The SSE endpoint takes a `sessionId` from the URL with zero authentication. Anyone who knows or guesses a session ID can stream real-time Q&A questions, polls, audience counts, and presentation state.

**Fix:** Either require authentication (Clerk session cookie) or implement a short-lived access token issued when a user joins via the join code. Add rate limiting.

---

### 5. Share Passwords Stored in Plaintext

**File:** `src/lib/actions/share.ts:155`, `src/lib/db/schema/editor.ts`

**Problem:** Share passwords are stored as plain text in the database and compared with `===` (timing-vulnerable). A database breach exposes all share passwords.

**Fix:**
- Hash passwords with `bcrypt` (or `argon2`) before storing.
- Use `crypto.timingSafeEqual()` for comparison (after hashing).
- Add rate limiting on `verifySharePassword()` to prevent brute-force.

---

### 6. SSRF via PDF URL Redirects

**Files:**
- `src/app/api/papers/[id]/pdf/route.ts:71-74` — `NextResponse.redirect(paper.pdf_url)` and `NextResponse.redirect(paper.open_access_url)`
- `src/lib/actions/pdf-pipeline.ts:51` — fetches `paper.pdf_url` directly
- `src/lib/deep-research/full-text-extractor.ts:79` — fetches arbitrary `fullTextUrl`

**Problem:** PDF URLs originate from external APIs (PubMed, Semantic Scholar, Unpaywall). If an attacker poisons a paper record or an API returns a malicious URL, the server will fetch internal resources.

**Fix:** Create a URL validator utility that:
- Allows only `https://` scheme
- Blocks private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 127.0.0.0/8, 169.254.0.0/16)
- Blocks `metadata.google.internal` and cloud metadata endpoints
- Optionally whitelist known OA providers (unpaywall.org, ncbi.nlm.nih.gov, semanticscholar.org, europepmc.org)

---

## P1 — High (Fix in Next Sprint)

### 7. Comments Authorization Without Deck Ownership

**File:** `src/lib/actions/comments.ts`

**Problem:**
- `resolveComment()` (line 156) and `unresolveComment()` (line 172) check auth but not deck ownership — any user can resolve/unresolve comments on any deck
- `getComments()` (line 79) returns all comments for a deckId without verifying access

**Fix:** Add deck ownership or collaborator check before all comment operations. Verify the authenticated user owns the deck or has appropriate permission.

---

### 8. DEV_USER_ID Leak to Production

**File:** `src/lib/auth.ts:10,53,60,84`

**Problem:** `DEV_USER_ID = "dev_user_001"` is exported and used as a fallback when Clerk token verification fails in development. If `NODE_ENV` is misconfigured (empty, "staging", etc.) or Clerk keys are misconfigured in production, all unauthenticated requests silently authenticate as `dev_user_001`.

**Fix:**
- Remove the `export` of `DEV_USER_ID` — it should never be importable by other modules
- Add an explicit `process.env.NODE_ENV === "production"` guard that always throws if auth fails, regardless of `isDev`
- Consider a startup check: if `NODE_ENV !== "development"` and Clerk keys are missing, refuse to start

---

### 9. Debug/Test Endpoints Accessible in Production

**Files:**
- `src/app/api/sentry-test/route.ts` — always throws an error (Sentry integration test)
- `src/app/api/seed/route.ts` — seeds the database, gated by `NODE_ENV === "production"` runtime check

**Problem:** `sentry-test` has no environment gate. `seed` relies on runtime `NODE_ENV` check which can be bypassed if env is misconfigured.

**Fix:**
- Delete `sentry-test` route or gate it behind `NODE_ENV === "development"`
- For `seed`, add a second guard (e.g., require an admin secret header) or remove from production builds entirely

---

### 10. Inconsistent Authorization Across Systematic Review Routes

**Files:** Multiple routes in `src/app/api/systematic-review/`

**Problem:** Some routes use `verifyProjectAccess()` (which includes collaborators), while most only check `projects.user_id === userId` (owner-only). This breaks the collaboration model — invited collaborators can't use most SR features.

**Affected routes (owner-only check):** `/prospero`, `/grade`, `/manuscript`, `/prisma-checklist`, `/nma`, `/config`, `/export-references`, `/upload`, and more.

**Routes with correct check:** `/screening-queue`, `/audit`

**Fix:** Standardize all SR routes to use `verifyProjectAccess(projectId, userId)` which checks both ownership and collaborator role.

---

### 11. Over-Fetching with Blanket `.select()`

**Files:** 28+ files across `src/app/api/systematic-review/`, `src/lib/actions/share.ts`, `src/lib/systematic-review/collaboration.ts`

**Problem:** Many database queries use `.select()` without explicit column selection, returning entire rows including internal metadata, timestamps, and fields not needed by the client.

**Fix:** Audit all `.select()` calls and replace with explicit column selection: `.select({ id: table.id, title: table.title, ... })`. Prioritize routes that return data to clients, especially shared/public endpoints.

---

### 12. Middleware Treats All /api Routes as Public

**File:** `src/middleware.ts:16`

**Problem:** The regex `/^\/api(\/.*)?$/` marks ALL API routes as public in middleware. Authentication is enforced per-route via `getCurrentUserId()`. If any new route is added without an auth check, it's silently exposed.

**Fix:** Invert the pattern — make API routes protected by default in middleware, and explicitly whitelist only the truly public ones (`/api/webhooks/*`, `/api/live-session/*/stream`, `/api/health`). Alternatively, add a lint rule or test that verifies every API route calls `getCurrentUserId()`.

---

## P2 — Medium (Address Within 2 Sprints)

### 13. Email Enumeration via Error Messages

**File:** `src/lib/systematic-review/collaboration.ts:72`, `src/app/api/systematic-review/collaborators/route.ts:117-119`

**Problem:** Error message `"No user found with email: ${email}"` is returned to the client (status 422). Attacker can probe for registered email addresses.

**Fix:** Return a generic message like `"Invitation sent"` or `"If this user exists, they will receive an invitation"` regardless of whether the email is found.

---

### 14. Docling Microservice Hardening

**Files:** `services/docling/Dockerfile`, `services/docling/app.py`

**Problems:**
- Runs as root (no `USER` directive in Dockerfile)
- CORS allows all origins (`allow_origins=["*"]`)
- No authentication on endpoints
- No rate limiting

**Fix:**
- Add a non-root user to the Dockerfile
- Restrict CORS to the main application domain
- Add API key authentication (check a shared secret header)
- Add rate limiting via `slowapi` or similar
- Ensure the service is only accessible from the application's VPC/network (not publicly exposed)

---

### 15. Sentry PII Scrubbing

**Files:** `sentry.server.config.ts`, `sentry.client.config.ts`

**Problem:** No explicit PII scrubbing configured. Error reports may contain email addresses, user IDs, or sensitive data from request URLs or error messages.

**Fix:** Add a `beforeSend` hook that strips email patterns, tokens, and sensitive query parameters. Enable `sendDefaultPii: false` (verify it's not set to `true`). Review session replay configuration to ensure form inputs are masked.

---

### 16. GitHub Actions Pin to Commit SHA

**File:** `.github/workflows/ci.yml`

**Problem:** Actions are pinned to major version tags (`@v4`) not commit SHAs. A compromised upstream action could inject malicious code into CI.

**Fix:** Pin all third-party actions to full commit SHA:
```yaml
# Before
- uses: actions/checkout@v4
# After
- uses: actions/checkout@<full-sha>
```
Add Dependabot for GitHub Actions to get notified of updates.

---

### 17. Share Password Brute-Force Protection

**File:** `src/lib/actions/share.ts:144-156`

**Problem:** `verifySharePassword()` is a server action callable without authentication and without rate limiting. An attacker can brute-force weak share passwords.

**Fix:**
- Add rate limiting per IP or per share token (e.g., 5 attempts per minute)
- Add exponential backoff or account lockout after repeated failures
- Consider adding a minimum password length requirement when setting share passwords

---

### 18. Bibliography HTML Injection

**File:** `src/components/editor/extensions/bibliography-view.tsx:53-54`

**Problem:** `entry.html` from citation-js is rendered via `dangerouslySetInnerHTML` without sanitization. If citation-js produces malicious HTML from crafted bibliography data (author names, titles from external APIs), XSS is possible.

**Fix:** Sanitize the HTML output from citation-js using a library like `DOMPurify` (server-side: `isomorphic-dompurify`) before rendering. Apply this to all `dangerouslySetInnerHTML` usages that render external data.

---

### 19. Docling Response Schema Validation

**File:** `src/app/api/extract-pdf-advanced/route.ts:117`

**Problem:** The response from the Docling microservice is passed through to the client without schema validation. If Docling is compromised, attacker-controlled markdown/HTML reaches the client.

**Fix:** Define a Zod schema for the expected Docling response shape and validate before returning. Strip or escape any unexpected fields.

---

### 20. PostHog URL Parameter PII

**File:** `src/components/providers/posthog-provider.tsx:29`

**Problem:** Page view events include full URLs with query parameters. URLs may contain user IDs, project IDs, search queries, or paper titles that constitute PII or sensitive research data.

**Fix:** Strip or hash sensitive URL parameters before sending to PostHog. Define a sanitization function that removes known sensitive params.

---

### 21. No Rate Limiting on Public Endpoints

**Files:**
- `src/app/api/live-session/[sessionId]/stream/route.ts`
- `src/app/api/analytics/track-view/route.ts`
- Live session question submission, upvoting, polling

**Problem:** Public-facing endpoints (no auth required) have no rate limiting. The 6-character join code (26^6 = ~309M combinations) could be brute-forced.

**Fix:** Add IP-based rate limiting to all public endpoints. For join codes, add exponential backoff after failed attempts. Consider longer join codes or alphanumeric codes.

---

## P3 — Low (Backlog / Defense-in-Depth)

### 22. Docker Read-Only Filesystem

**File:** `Dockerfile`

Add `readOnlyRootFilesystem: true` in Kubernetes security context. Mount writable volumes only where needed (`/tmp`, `.next/cache`).

---

### 23. CSP Tightening — Remove `unsafe-inline` / `unsafe-eval`

**File:** `next.config.ts:6-7`

Current CSP allows `'unsafe-inline'` and `'unsafe-eval'` for scripts. Work toward nonce-based CSP to eliminate these. This is a larger effort requiring changes to how Razorpay, Clerk, and other third-party scripts are loaded.

---

### 24. PDF Magic Bytes Validation

**File:** `src/app/api/systematic-review/upload/route.ts`

Currently validates MIME type and extension only. Add a check for PDF magic bytes (`%PDF-`) as defense-in-depth against spoofed content types.

---

### 25. Dependabot Configuration

Create `.github/dependabot.yml` to enable automated dependency update PRs for both npm packages and GitHub Actions.

---

### 26. LaTeX Preview ReDoS Mitigation

**File:** `src/components/latex-editor/preview-panel.tsx:115`

Display math regex `[\s\S]*?` and inline patterns with `.+?` could backtrack on pathological input. Consider adding input length limits or using a proper parser instead of regex for LaTeX-to-HTML conversion.

---

### 27. Session Invalidation / Forced Logout

**File:** `src/lib/auth.ts`

No server-side session revocation exists. Stolen session cookies remain valid until Clerk's token TTL expires. Consider implementing a token denylist in Redis or using Clerk's session revocation API for immediate logout.

---

### 28. Audit Logging for Sensitive Operations

Add structured audit logs for:
- Billing operations (order creation, payment verification)
- Share permission changes
- Collaborator additions/removals
- Document deletion
- Admin/migration endpoint usage

Store in a separate, append-only audit table or ship to an external logging service.

---

### 29. GCS Bucket Policy Verification

**File:** `src/lib/storage/gcs.ts`

Verify the GCS bucket has:
- No `allUsers` or `allAuthenticatedUsers` IAM bindings
- Uniform bucket-level access enabled
- Signed URLs are the only access path for papers

---

### 30. Lockfile Integrity Check in CI

Add a step to CI that verifies `package-lock.json` integrity and that `npm ci` is used (not `npm install`) to prevent dependency confusion attacks.

---

## Summary by Priority

| Priority | Count | Key Themes |
|----------|-------|------------|
| **P0 — Critical** | 6 | Liveblocks authz bypass, webhook forgery, SSRF, plaintext passwords, unauthenticated streaming |
| **P1 — High** | 6 | Comment authz, DEV_USER_ID leak, debug endpoints, inconsistent SR access, over-fetching, middleware gap |
| **P2 — Medium** | 9 | Email enumeration, Docling hardening, PII scrubbing, action pinning, brute-force, HTML injection |
| **P3 — Low** | 9 | Docker FS, CSP nonces, magic bytes, Dependabot, ReDoS, audit logging, session revocation |

---

**Total: 30 hardening items identified beyond the initial audit.**
