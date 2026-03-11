# onboarding — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/onboarding
MODULE: onboarding

---
### Styling & Theming
#### Detailed QA Coverage
- [ ] Completion button text changes to `Setting up...` while `saving` is true
- [ ] Completion button remains rendered with the `ArrowRight` icon even while saving
- [ ] Completion button is disabled only while `saving` is true
- [ ] Clicking completion sets `saving` to `true` before any async work begins
- [ ] Completion payload sends `full_name` only when `name` is non-empty
- [ ] Completion payload sends `specialty` only when at least one specialty is selected
- [ ] Completion payload sends `bio` only when `institution` is non-empty
- [ ] Selected specialties are serialized as `selectedSpecialties.join(", ")`
- [ ] Institution is stored in the `bio` field in the current implementation
- [ ] Completion flow does not persist `selectedGoals`
- [ ] Completion flow calls `updateUserProfile()` before posting to `/api/onboarding/complete`
- [ ] Completion flow posts to `/api/onboarding/complete` with `method: "POST"` and no request body
- [ ] Successful completion redirects to `/dashboard`
- [ ] Failed completion logs `Onboarding save failed:` to the console
- [ ] Failed completion still redirects to `/dashboard`
- [ ] `saving` is reset to `false` in `finally`, even after navigation is triggered
- [ ] `POST /api/onboarding/complete` returns `{ success: true }` on success
- [ ] API route updates `users.onboarding_completed` to `true`
- [ ] API route updates `users.updated_at` to `new Date()`
- [ ] API route catches all thrown errors and returns `500 { error: "Failed to complete onboarding" }`
- [ ] API route logs `Onboarding complete error:` to the server console on failure
- [ ] Unauthenticated failures are caught by the generic `catch` and return `500`, not a dedicated `401` response in the current implementation
- [ ] API route exports only `POST`; unsupported methods rely on Next.js route handling rather than custom logic
- [ ] Loading skeleton wrapper uses the same `min-h-[calc(100vh-7rem)] flex items-center justify-center` outer layout as the page
- [ ] Loading skeleton container uses `w-full max-w-2xl mx-auto`
- [ ] Loading state renders exactly four progress skeleton bars using `Array.from({ length: 4 })`
- [ ] Error state delegates to `ErrorDisplay` with title `Onboarding unavailable`
- [ ] Error state message is `We couldn't load the onboarding flow. Please try again.`
- [ ] Error boundary passes both `error` and `reset` through to `ErrorDisplay`
- [ ] Route should be documented as `/onboarding`, not as the source file path
- [ ] Unauthenticated onboarding-complete requests currently surface as generic `500` failures, not a dedicated auth-specific response

### Codex Verification Pass Discoveries
#### App Shell & Auth Context
- [ ] `(app)/layout.tsx` authenticates onboarding with `getCurrentUserId()` and redirects failures to `/sign-in`
- [ ] Onboarding content is rendered inside `AppShell` `<main className="flex-1 overflow-y-auto p-6">`
- [ ] `AppHeader` and `CommandPalette` are mounted by `AppShell` during onboarding
- [ ] Desktop sidebar chrome is part of onboarding at `md+` breakpoints; mobile sidebar stays closed until opened
