Read program.md and annealing-log.jsonl. Run quality-score.mjs.

This is the API ROUTE TESTING session.
Currently only 8/180+ API routes have tests. We need coverage for ALL.

STEP 1: Discover all API routes
Run: find src/app/api -name "route.ts" | sort

STEP 2: For each route, write tests in src/app/api/<route>/__tests__/route.test.ts

FOR EACH API ROUTE:
1. Read the route handler
2. Write tests for:
   a. Happy path (valid input → expected response)
   b. 401 (no auth — verify getServerSession/auth() is checked)
   c. 400 (missing/invalid input — verify validation)
   d. 500 handling (mock internal error → proper error response)
   e. Input validation edge cases
3. Run: npx vitest run src/app/api/<route>

PRIORITY ORDER:
1. Billing routes (money-critical): create-order, verify-payment, subscription, webhook
2. Auth routes: onboarding/complete, webhooks/clerk, liveblocks-auth
3. Data mutation routes (POST/PUT/DELETE)
4. Data read routes (GET)

Use MSW or direct handler invocation for mocking.
Branch: hardening/session-12
