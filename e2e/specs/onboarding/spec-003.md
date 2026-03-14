# onboarding — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/onboarding
MODULE: onboarding

---
### Navigation Controls
#### Continue Button (Steps 0-2)
- [x] PASS: On step 1: Continue is disabled when no specialties selected
- [x] PASS: On step 1: Continue is enabled when >= 1 specialty selected
- [x] PASS: On step 2: Continue is disabled when no goals selected
- [x] PASS: On step 2: Continue is enabled when >= 1 goal selected
- [x] PASS: Clicking Continue on step 0 navigates to step 1
- [x] PASS: Clicking Continue on step 1 navigates to step 2
- [x] PASS: Clicking Continue on step 2 navigates to step 3
#### Complete Button (Step 3)
- [x] PASS: Complete button shows "Start Using ScholarSync" with ArrowRight icon
- [x] PASS: Complete button uses `bg-brand text-white` styling
- [x] PASS: Clicking Complete triggers handleComplete flow
- [x] PASS: While saving, button text changes to "Setting up..."
- [x] PASS: Button is not clickable while saving

### Progress Indicator
- [x] PASS: 4 horizontal bars are rendered
- [x] PASS: Bars are arranged horizontally
- [x] PASS: On step 0: first bar is `bg-brand`, remaining 3 are `bg-surface-raised`
- [x] PASS: On step 1: first 2 bars are `bg-brand`, remaining 2 are `bg-surface-raised`
- [x] PASS: On step 2: first 3 bars are `bg-brand`, remaining 1 is `bg-surface-raised`
- [x] PASS: On step 3: all 4 bars are `bg-brand`
- [x] PASS: Each bar has `h-1 rounded-full` styling
- [x] PASS: Progress updates immediately when step changes

### Completion Flow (handleComplete)
- [x] PASS: Clicking "Start Using ScholarSync" sets saving=true
- [x] PASS: Empty name and institution are handled gracefully

### API — POST /api/onboarding/complete
- [x] PASS: Repeated calls keep `onboarding_completed = true` but are not fully idempotent because `updated_at` changes on every call

### Database Fields
- [x] PASS: `onboarding_completed` defaults to `false` for new users
- [x] PASS: `full_name` is saved from the name input field
- [x] PASS: `specialty` stores multiple specialties as a comma-separated string (e.g., "Surgery, Radiology, ENT")
- [x] PASS: `bio` stores the institution value (not an actual bio)
- [x] PASS: All fields persist correctly after page reload

### Error State (error.tsx)
- [x] PASS: Retry button is present with ArrowCounterClockwise icon (16px)
- [x] PASS: Clicking retry button attempts to reload the onboarding flow
- [x] PASS: Error boundary catches rendering errors correctly

### Icons
- [x] PASS: All icons render at their specified sizes
- [x] PASS: Icons are from the correct icon library (Phosphor Icons)
- [x] PASS: Check icon uses 14px in specialties and 18px in goals
- [x] PASS: Icons are visually aligned with their accompanying text
