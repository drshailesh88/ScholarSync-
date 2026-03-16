# Settings — Claude Code Pass 2 Verification Report

**Total assertions reviewed:** 54
**Verified Correct:** 53
**Hallucinated / Inaccurate:** 0
**Partially Correct:** 1
**Accuracy rate:** 98.1%

## Hallucinated / Inaccurate

None.

## Partially Correct

- [line 763] "When `user.plan` is null or undefined, `displayPlan` defaults to `\"free\"` — all billing and usage displays show free-tier values" — MOSTLY RIGHT but only plan-derived UI uses `displayPlan`. Token quota and usage counters still come from `usageStats` via `tokensLimit`, `tokensUsed`, `searchesUsed`, `plagiarismChecks`, and `exports_used` in `src/app/(app)/settings/page.tsx:234-243`.

## Behavior Corrections

1. Verified. Skeleton base class is `animate-pulse` in `src/components/ui/skeleton.tsx:6`, not `animation-pulse`.
2. Verified with nuance. The rendered button text is `Try Again` in `src/components/ui/error-display.tsx:42-46`. The earlier doc wording was generic ("Retry button"), not an exact wrong label string.
3. Verified. `src/app/api/billing/webhook/route.ts:38-39` returns `401` with `{ error: "Invalid signature" }`, not `400`.
4. Verified. `src/app/(app)/settings/page.tsx:270-273` renders a plain `<button>` for `Log Out` with no `onClick` handler and no Clerk `<SignOutButton>` wrapper. This is a real UI bug if settings-page sign-out is expected before launch.
5. Verified. `src/app/api/billing/create-order/route.ts:15-18,37-42` has no dedicated unauthorized response; auth failures from `getCurrentUserId()` fall into the generic catch and return `500` with `{ error: "Failed to create payment order" }`.
6. Verified. `src/lib/actions/billing.ts:34-49,52-69` updates `users.plan` only on insert, not when an existing subscription row is updated.

## Other Key Claims

1. Save flow message clearing: `showSaveMessage()` clears after exactly `3000` ms in `src/app/(app)/settings/page.tsx:102-105`. Both save handlers also clear the old message immediately before the request starts at `page.tsx:147` and `page.tsx:184`.
2. Console error logging: initial settings fetch logs only to `console.error` with no UI error state (`page.tsx:135-138`). Profile and preferences save failures both log to `console.error` and show inline UI messages (`page.tsx:173-176`, `202-205`). Billing API routes log server-side errors to `console.error` and return JSON errors (`create-order/route.ts:37-42`, `verify-payment/route.ts:56-60`, `webhook/route.ts:75-77`).
3. Plan fallback to `free`: exact logic is `const displayPlan = user?.plan || "free"` in `page.tsx:234`. That fallback affects the plan title/price and `plagiarismLimit`, but not `tokensLimit` or the usage counters.
4. Label sizing differences: account labels use `block text-xs font-medium text-ink-muted mb-1.5` (`page.tsx:301`, `313`, `325`, `337`, `349`, `393`). Preferences labels use `block text-sm font-medium text-ink ...`; the Theme label uses `mb-3` (`page.tsx:551`) while the select labels use `mb-1.5` (`page.tsx:556`, `570`, `584`).
5. ProgressBar locale behavior: `ProgressBar` uses `value.toLocaleString()` and `max.toLocaleString()` with no explicit locale in `src/components/ui/progress-bar.tsx:25-26`. The settings page mixes that with explicit `toLocaleString("en-IN")` in billing and the tokens summary (`page.tsx:452`, `521-522`).
6. Usage summary formatting inconsistencies: Tokens use `en-IN` formatting for both used and limit (`page.tsx:521-522`). Searches, plagiarism checks, exports, and the plagiarism helper limit render raw numbers (`page.tsx:526`, `531-532`, `536`).
7. Billing action edge cases: `Manage Plan`, `Update`, and invoice `Download` buttons are rendered without handlers in `page.tsx:454-456`, `472-474`, and `46-49`. `cancelSubscription()` only mutates rows where `status = "active"` and otherwise returns `null` (`src/lib/actions/billing.ts:76-91`).
8. Webhook error response details: missing secret returns `503` with `{ error: "Webhook not configured" }` (`webhook/route.ts:9-12`); missing signature returns `401` with `{ error: "Missing signature" }` (`15-18`); invalid signature returns `401` with `{ error: "Invalid signature" }` (`38-39`); success returns `{ received: true }` (`74`); server failure returns `500` with `{ error: "Webhook processing failed" }` (`75-77`).

## Accumulated Doc Cleanup

- Corrected stale claims in `SETTINGS_FEATURES_TESTING.md` for create-order auth behavior, verify-payment subscription sync wording, webhook invalid-signature status, `createSubscription()` plan sync wording, skeleton class name, retry button label, and logout behavior.
- Kept the Pass 2 additions intact except for clarifying the over-broad `displayPlan` fallback statement.
- Updated `e2e/doc-audit/settings-gaps.md` to record the verification result: 53 verified, 0 hallucinated, 1 partial.
