# Onboarding — Claude Code Pass 2 Verification Report

**Total assertions reviewed:** 36
**Verified Correct:** 34
**Hallucinated / Inaccurate:** 0
**Partially Correct:** 2
**Accuracy rate:** 94.4% exact-match

## Hallucinated / Inaccurate
None.

## Partially Correct
- [line 556] "Onboarding page renders inside `AppShell` — sidebar, header, and command palette are all present" — MOSTLY RIGHT because onboarding is wrapped by `AppShell`, but the desktop sidebar is breakpoint-dependent and `CommandPalette` renders `null` until opened.
- [line 577] "`selectedGoals` is deliberately excluded from `useCallback` deps — confirms it is unused in the callback" — MOSTLY RIGHT because `selectedGoals` is excluded and unused, but "deliberately" is not provable from source. No stale-closure bug exists because the callback never reads `selectedGoals`.

## Behavior Corrections
1. `totalSteps` is a constant, not state: `const totalSteps = 4` in `src/app/(app)/onboarding/page.tsx:93`.
2. `handleComplete` uses `full_name: name || undefined`, `specialty: selectedSpecialties.join(", ") || undefined`, and `bio: institution || undefined` in `src/app/(app)/onboarding/page.tsx:110-114`, so empty strings are omitted from `updateUserProfile`.
3. Step 3 features are wrapped in `<div className="space-y-3">` containing `<div>` rows with numbered `<span>` badges, not an `<ol>` (`src/app/(app)/onboarding/page.tsx:261-275`).
4. Repeated completion calls do not create duplicate rows; they re-update the same `users` row. The flow is not fully idempotent because `/api/onboarding/complete` rewrites `updated_at` on every call (`src/app/api/onboarding/complete/route.ts:11-14`), and `updateUserProfile` also writes `updated_at` (`src/lib/actions/user.ts:55-69`).
5. `loading.tsx` navigation skeletons are `h-10 w-20 rounded-xl` and `h-12 w-36 rounded-xl` (`src/app/(app)/onboarding/loading.tsx:13-15`). The base `Skeleton` component also contributes `animate-pulse rounded-lg bg-surface-raised` (`src/components/ui/skeleton.tsx:3-8`).
6. The error icon sits inside `w-16 h-16 rounded-2xl bg-red-500/10 ... text-red-500` in `src/components/ui/error-display.tsx:35-36`.

## Suspected Hallucinations
1. `totalSteps` misclassification: the existing doc listed `totalSteps` as a state variable, but code shows `const totalSteps = 4` (`src/app/(app)/onboarding/page.tsx:93`). This was wrong and has been corrected.
2. Completion payload contradiction: the original section 8 table omitted the `|| undefined` guards, while the Codex "Additional Features" description of a sparse payload was accurate. The simplified original version was wrong and has been removed.
3. "Idempotent" claim: partially false. Repeat calls succeed without duplicate records, but `updated_at` changes every time in both `updateUserProfile` and the API route. The doc now states that the endpoint is not fully idempotent.
4. Theme check: no onboarding code checks or persists a theme preference. The only theme-related UI in the onboarding shell is the shared `ThemeToggle` in `src/components/layout/app-header.tsx:31-33`, so the old theme-token assertion was unverifiable from source and has been removed.

## Architectural Claims
1. AppShell claim: true with nuance. `(app)/layout.tsx` wraps onboarding in `AppShell` (`src/app/(app)/layout.tsx:16`), and `AppShell` renders `AppHeader`, desktop `AppSidebar`, and the `CommandPalette` component (`src/components/layout/app-shell.tsx:12-19`). The command palette dialog is closed by default, and the sidebar is only visibly rendered at `md+` breakpoints.
2. Already-onboarded guard: confirmed absent. `src/app/(app)/onboarding/page.tsx` has no `onboarding_completed` redirect, `(app)/layout.tsx` only authenticates, and there is no `middleware.ts` in the repository root.
3. `useCallback` deps: confirmed. `handleComplete` uses `[name, institution, selectedSpecialties, router]` (`src/app/(app)/onboarding/page.tsx:124`). Excluding `selectedGoals` causes no current bug because the callback never reads it; it only confirms goals are dropped from persisted completion data.
4. `updated_at` written twice: confirmed. `updateUserProfile` seeds every payload with `updated_at: new Date()` (`src/lib/actions/user.ts:56`), then `/api/onboarding/complete` sets `updated_at: new Date()` again (`src/app/api/onboarding/complete/route.ts:13`).
5. HTTP 500 catch behavior: confirmed. `await fetch("/api/onboarding/complete", { method: "POST" })` in `handleComplete` does not inspect `response.ok` (`src/app/(app)/onboarding/page.tsx:116`), so a resolved 500 still falls through to `router.push("/dashboard")`.
6. No progress persistence: confirmed. The onboarding wizard uses only local `useState` (`src/app/(app)/onboarding/page.tsx:86-91`) and has no `localStorage`, `sessionStorage`, or mount-time restore logic.
7. Step transitions: confirmed. Step panels use `step === N && (...)` conditional rendering with no animation wrapper (`src/app/(app)/onboarding/page.tsx:149-278`); only the progress bars animate via `transition-all` (`src/app/(app)/onboarding/page.tsx:141`).
8. Duplicate-pair sample: confirmed. At least these five pairs were true duplicates before cleanup:
   - Original §1 line 31 vs Additional Features lines 432-437: state defaults
   - Original §1 line 32 vs Additional Features line 438: `totalSteps`
   - Original §8 line 288 vs Additional Features line 514: specialties serialized with `join(", ")`
   - Original §8 line 290 vs Additional Features line 517: profile update happens before POST
   - Original §9 line 309 vs Additional Features line 525: success response `{ success: true }`

## Cleanup Result
- `ONBOARDING_FEATURES_TESTING.md` was corrected for the stale payload, route, idempotency, and error-icon details.
- 23 direct duplicates between the original sections and Codex additions were removed by keeping the more specific checks.
- 4 stale or unverifiable assertions were corrected or removed.
- Final checkbox count after cleanup: 242.
