# settings — Spec 009

STATUS: DONE
TESTED: 17/17
PASS: 17
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/settings
MODULE: settings

---
### Quick Test Workflow
#### Skeleton Component (skeleton.tsx:6)
- [x] PASS: Skeleton base CSS class is `animate-pulse` (Tailwind standard), not `animation-pulse`
#### Loading Skeleton Dimensions (loading.tsx:7–21)
- [x] PASS: Sidebar title skeleton has dimensions `h-5 w-16` with `mb-4 mx-3` spacing
- [x] PASS: Sidebar renders exactly 4 tab skeleton placeholders, each `h-10 w-full rounded-lg`
- [x] PASS: Content avatar skeleton is `h-16 w-16 rounded-full`
- [x] PASS: Content area includes exactly two `h-10 w-full rounded-lg` input skeletons
- [x] PASS: Content button skeleton is `h-10 w-32 rounded-xl`
- [x] PASS: Content heading skeleton is `h-7 w-40`
#### Billing Server Actions (billing.ts:36–49, 75–81)
- [x] PASS: `createSubscription` only updates the `users.plan` field when creating a NEW subscription record — updating an existing subscription does NOT sync `users.plan`
- [x] PASS: `cancelSubscription` only targets subscriptions with `status: "active"` — non-active subscriptions are unaffected and the function returns null
#### API Route: verify-payment (verify-payment/route.ts:13–14)
- [x] PASS: `verify-payment` route applies rate limiting using `RATE_LIMITS.analysis` (same limiter as `create-order`)
- [x] PASS: `verify-payment` exact error for missing fields is `"Missing required fields: orderId, paymentId, signature, plan"`
#### API Route: webhook (webhook/route.ts:10–11, 17, 39, 74, 77)
- [x] PASS: Webhook returns 503 with `"Webhook not configured"` when `RAZORPAY_WEBHOOK_SECRET` env var is not set
- [x] PASS: Webhook returns 401 with `"Missing signature"` when `x-razorpay-signature` header is absent
- [x] PASS: Webhook returns 401 with `"Invalid signature"` when signature verification fails (not 400 as previously documented)
- [x] PASS: Webhook success response body is `{ received: true }` (not empty 200)
- [x] PASS: Webhook server error returns 500 with `"Webhook processing failed"`
#### API Route: create-order Auth (create-order/route.ts:37–43)
- [x] PASS: `create-order` auth failure (from `getCurrentUserId()` throwing) is caught by the generic catch block and returns 500 with `"Failed to create payment order"` — not a dedicated 401 response
