# onboarding — Spec 006

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/onboarding
MODULE: onboarding

---
### Styling & Theming
#### Detailed QA Coverage
- [x] PASS: Completion button text changes to `Setting up...` while `saving` is true
- [x] PASS: Completion button remains rendered with the `ArrowRight` icon even while saving
- [x] PASS: Completion button is disabled only while `saving` is true
- [x] PASS: Clicking completion sets `saving` to `true` before any async work begins
- [x] PASS: Completion payload sends `full_name` only when `name` is non-empty
- [x] PASS: Completion payload sends `specialty` only when at least one specialty is selected
- [x] PASS: Completion payload sends `bio` only when `institution` is non-empty
- [x] PASS: Selected specialties are serialized as `selectedSpecialties.join(", ")`
- [x] PASS: Institution is stored in the `bio` field in the current implementation
- [x] PASS: Completion flow does not persist `selectedGoals`
- [x] PASS: Completion flow calls `updateUserProfile()` before posting to `/api/onboarding/complete`
- [x] PASS: Completion flow posts to `/api/onboarding/complete` with `method: "POST"` and no request body
- [x] PASS: Successful completion redirects to `/dashboard`
- [x] PASS: Failed completion logs `Onboarding save failed:` to the console
- [x] PASS: Failed completion still redirects to `/dashboard`
- [x] PASS: `saving` is reset to `false` in `finally`, even after navigation is triggered
- [x] PASS: `POST /api/onboarding/complete` returns `{ success: true }` on success
- [x] PASS: API route updates `users.onboarding_completed` to `true`
- [x] PASS: API route updates `users.updated_at` to `new Date()`
- [x] PASS: API route catches all thrown errors and returns `500 { error: "Failed to complete onboarding" }`
- [x] PASS: API route logs `Onboarding complete error:` to the server console on failure
- [x] PASS: Unauthenticated failures are caught by the generic `catch` and return `500`, not a dedicated `401` response in the current implementation
- [x] PASS: API route exports only `POST`; unsupported methods rely on Next.js route handling rather than custom logic
- [x] PASS: Loading skeleton wrapper uses the same `min-h-[calc(100vh-7rem)] flex items-center justify-center` outer layout as the page
- [x] PASS: Loading skeleton container uses `w-full max-w-2xl mx-auto`
- [x] PASS: Loading state renders exactly four progress skeleton bars using `Array.from({ length: 4 })`
- [x] PASS: Error state delegates to `ErrorDisplay` with title `Onboarding unavailable`
- [x] PASS: Error state message is `We couldn't load the onboarding flow. Please try again.`
- [x] PASS: Error boundary passes both `error` and `reset` through to `ErrorDisplay`
- [x] PASS: Route should be documented as `/onboarding`, not as the source file path
- [x] PASS: Unauthenticated onboarding-complete requests currently surface as generic `500` failures, not a dedicated auth-specific response

### Codex Verification Pass Discoveries
#### App Shell & Auth Context
- [x] PASS: `(app)/layout.tsx` authenticates onboarding with `getCurrentUserId()` and redirects failures to `/sign-in`
- [x] PASS: Onboarding content is rendered inside `AppShell` `<main className="flex-1 overflow-y-auto p-6">`
- [x] PASS: `AppHeader` and `CommandPalette` are mounted by `AppShell` during onboarding
- [x] PASS: Desktop sidebar chrome is part of onboarding at `md+` breakpoints; mobile sidebar stays closed until opened
