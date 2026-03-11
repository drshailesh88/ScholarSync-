# onboarding — Spec 007

STATUS: PENDING
TESTED: 0/32
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/onboarding
MODULE: onboarding

---
### Codex Verification Pass Discoveries
#### Error Display Internals
- [ ] `error.tsx` has its own `"use client"` directive
- [ ] `ErrorDisplay` calls `Sentry.captureException(error)` in `useEffect`
- [ ] Error retry button text is `Try Again`
- [ ] Error retry button uses `bg-brand text-white rounded-xl hover:bg-brand-hover transition-colors`
- [ ] `ErrorDisplay` only renders the retry button when `onRetry` is provided
- [ ] Error icon wrapper uses `w-16 h-16 rounded-2xl bg-red-500/10 text-red-500`
#### Goal Selection Details
- [ ] Goal-card check icon uses `weight="bold"`
- [ ] Goal icon container uses `w-10 h-10 rounded-lg` with conditional background styling
- [ ] Selected goal icon container changes to `bg-brand/10 text-brand`; unselected uses `bg-surface-raised text-ink-muted`
- [ ] Goal cards use `text-left` so label and description alignment stay left-aligned
#### Completion Flow Internals
- [ ] `handleComplete` is wrapped in `useCallback` with deps `[name, institution, selectedSpecialties, router]`
- [ ] `selectedGoals` is excluded from the dependency array because `handleComplete` does not reference it
- [ ] Successful completion writes `updated_at` twice: once in `updateUserProfile` and once in `/api/onboarding/complete`
- [ ] HTTP error responses from `/api/onboarding/complete` do not enter the client `catch` unless `fetch()` itself throws
- [ ] `updateUserProfile` accepts 8 optional profile fields, but onboarding sends only `full_name`, `specialty`, and `bio`
- [ ] `updateUserProfile` builds a sparse payload and only sets columns whose values are not `undefined`
#### Step Transitions & Persistence
- [ ] Step panels swap via conditional rendering with no animation wrapper around the content
- [ ] Progress bar state changes animate via `transition-all`
- [ ] Wizard progress and form state reset on page refresh
- [ ] Onboarding state is `useState` only; there is no `localStorage`, `sessionStorage`, or mount-time restore
#### Button & Input Styling
- [ ] Continue and Complete buttons both use `hover:bg-brand-hover transition-colors`
- [ ] Complete button uses `disabled:opacity-50` while saving
- [ ] Back button uses `hover:text-ink transition-colors`
- [ ] Loading navigation skeletons include `rounded-xl`
- [ ] Welcome-step inputs use `rounded-xl`, distinct from the card's `rounded-2xl`
- [ ] Welcome-step inputs use `px-4 py-3 bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40`
- [ ] Welcome-step labels use `block text-xs font-medium text-ink-muted mb-1.5`
#### Skeleton Component Internals
- [ ] `Skeleton` base classes are `animate-pulse rounded-lg bg-surface-raised`
- [ ] Loading placeholders use Tailwind `animate-pulse`, not a shimmer gradient
#### Auth Edge Cases
- [ ] In production without valid Clerk keys, `getCurrentUserId()` throws a configuration error instead of an auth error
- [ ] In development, a missing session falls back to `DEV_USER_ID = "dev_user_001"`
#### Naming Inconsistency
- [ ] Feature tour constants use `title` / `desc`, while goal constants use `label` / `description`
