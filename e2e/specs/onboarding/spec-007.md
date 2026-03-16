# onboarding — Spec 007

STATUS: DONE
TESTED: 32/32
PASS: 32
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/onboarding
MODULE: onboarding

---
### Codex Verification Pass Discoveries
#### Error Display Internals
- [x] PASS: `error.tsx` has its own `"use client"` directive
- [x] PASS: `ErrorDisplay` calls `Sentry.captureException(error)` in `useEffect`
- [x] PASS: Error retry button text is `Try Again`
- [x] PASS: Error retry button uses `bg-brand text-white rounded-xl hover:bg-brand-hover transition-colors`
- [x] PASS: `ErrorDisplay` only renders the retry button when `onRetry` is provided
- [x] PASS: Error icon wrapper uses `w-16 h-16 rounded-2xl bg-red-500/10 text-red-500`
#### Goal Selection Details
- [x] PASS: Goal-card check icon uses `weight="bold"`
- [x] PASS: Goal icon container uses `w-10 h-10 rounded-lg` with conditional background styling
- [x] PASS: Selected goal icon container changes to `bg-brand/10 text-brand`; unselected uses `bg-surface-raised text-ink-muted`
- [x] PASS: Goal cards use `text-left` so label and description alignment stay left-aligned
#### Completion Flow Internals
- [x] PASS: `handleComplete` is wrapped in `useCallback` with deps `[name, institution, selectedSpecialties, router]`
- [x] PASS: `selectedGoals` is excluded from the dependency array because `handleComplete` does not reference it
- [x] PASS: Successful completion writes `updated_at` twice: once in `updateUserProfile` and once in `/api/onboarding/complete`
- [x] PASS: HTTP error responses from `/api/onboarding/complete` do not enter the client `catch` unless `fetch()` itself throws
- [x] PASS: `updateUserProfile` accepts 8 optional profile fields, but onboarding sends only `full_name`, `specialty`, and `bio`
- [x] PASS: `updateUserProfile` builds a sparse payload and only sets columns whose values are not `undefined`
#### Step Transitions & Persistence
- [x] PASS: Step panels swap via conditional rendering with no animation wrapper around the content
- [x] PASS: Progress bar state changes animate via `transition-all`
- [x] PASS: Wizard progress and form state reset on page refresh
- [x] PASS: Onboarding state is `useState` only; there is no `localStorage`, `sessionStorage`, or mount-time restore
#### Button & Input Styling
- [x] PASS: Continue and Complete buttons both use `hover:bg-brand-hover transition-colors`
- [x] PASS: Complete button uses `disabled:opacity-50` while saving
- [x] PASS: Back button uses `hover:text-ink transition-colors`
- [x] PASS: Loading navigation skeletons include `rounded-xl`
- [x] PASS: Welcome-step inputs use `rounded-xl`, distinct from the card's `rounded-2xl`
- [x] PASS: Welcome-step inputs use `px-4 py-3 bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40`
- [x] PASS: Welcome-step labels use `block text-xs font-medium text-ink-muted mb-1.5`
#### Skeleton Component Internals
- [x] PASS: `Skeleton` base classes are `animate-pulse rounded-lg bg-surface-raised`
- [x] PASS: Loading placeholders use Tailwind `animate-pulse`, not a shimmer gradient
#### Auth Edge Cases
- [x] PASS: In production without valid Clerk keys, `getCurrentUserId()` throws a configuration error instead of an auth error
- [x] PASS: In development, a missing session falls back to `DEV_USER_ID = "dev_user_001"`
#### Naming Inconsistency
- [x] PASS: Feature tour constants use `title` / `desc`, while goal constants use `label` / `description`
