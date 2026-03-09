# Onboarding — Feature Doc Gaps

**Original doc:** `ONBOARDING_FEATURES_TESTING.md`
**Original checkbox count:** 142
**Features found in UI:** 176
**Features found in source code:** 219
**Missing from doc:** 77
**Completeness of original doc:** 64.8%

## Missing Features

### Detailed QA Coverage
- [ ] `step` defaults to `0`, `name` and `institution` default to empty strings, `selectedSpecialties` and `selectedGoals` default to empty arrays, and `saving` defaults to `false`
- [ ] `canNext` is derived from `step` and selection counts rather than stored independently
- [ ] Only one step panel is rendered at a time while progress bars and navigation remain mounted
- [ ] Step 0 inputs are controlled, unprefilled, and have no `required`, `maxLength`, or inline validation behavior
- [ ] Step 1 specialty buttons append/remove values from `selectedSpecialties` in click order and have no max selection count
- [ ] Step 2 goal buttons append/remove IDs from `selectedGoals`, but goals are not persisted in the completion payload
- [ ] Step 3 feature tour rows are numbered badges rendered from the `FEATURES` array, not semantic ordered-list items
- [ ] Back button stays mounted on every step, uses `disabled:opacity-0` on step 0, and preserves all prior input/selection state
- [ ] Continue button exists only on steps 0-2, is disabled solely via `canNext`, and does not add any loading treatment
- [ ] Completion button exists only on step 3, keeps the `ArrowRight` icon while saving, and changes only its text to `Setting up...`
- [ ] Completion payload sends `full_name`, `specialty`, and `bio` conditionally, with specialties serialized via `join(", ")`
- [ ] Completion posts to `/api/onboarding/complete` with no request body after `updateUserProfile()`
- [ ] Completion failures log `Onboarding save failed:` and still redirect to `/dashboard`
- [ ] API route catches all failures and returns generic `500 { error: "Failed to complete onboarding" }`
- [ ] Unauthenticated onboarding-complete failures do not produce a dedicated `401` response in the current implementation
- [ ] Loading and error boundary wrappers mirror the page layout rather than using a distinct shell

## Features in doc that DON'T EXIST in the app
- The page overview currently documents the route as the source file path instead of the actual route `/onboarding`.
- The onboarding completion API does not implement a custom unauthenticated response; auth failures fall into the generic `500` catch path.
- The completion payload does not persist selected goals anywhere, despite the onboarding flow collecting them in UI state.
