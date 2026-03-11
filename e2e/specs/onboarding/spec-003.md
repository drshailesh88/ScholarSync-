# onboarding — Spec 003

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/onboarding
MODULE: onboarding

---
### Navigation Controls
#### Continue Button (Steps 0-2)
- [ ] On step 1: Continue is disabled when no specialties selected
- [ ] On step 1: Continue is enabled when >= 1 specialty selected
- [ ] On step 2: Continue is disabled when no goals selected
- [ ] On step 2: Continue is enabled when >= 1 goal selected
- [ ] Clicking Continue on step 0 navigates to step 1
- [ ] Clicking Continue on step 1 navigates to step 2
- [ ] Clicking Continue on step 2 navigates to step 3
#### Complete Button (Step 3)
- [ ] Complete button shows "Start Using ScholarSync" with ArrowRight icon
- [ ] Complete button uses `bg-brand text-white` styling
- [ ] Clicking Complete triggers handleComplete flow
- [ ] While saving, button text changes to "Setting up..."
- [ ] Button is not clickable while saving

### Progress Indicator
- [ ] 4 horizontal bars are rendered
- [ ] Bars are arranged horizontally
- [ ] On step 0: first bar is `bg-brand`, remaining 3 are `bg-surface-raised`
- [ ] On step 1: first 2 bars are `bg-brand`, remaining 2 are `bg-surface-raised`
- [ ] On step 2: first 3 bars are `bg-brand`, remaining 1 is `bg-surface-raised`
- [ ] On step 3: all 4 bars are `bg-brand`
- [ ] Each bar has `h-1 rounded-full` styling
- [ ] Progress updates immediately when step changes

### Completion Flow (handleComplete)
- [ ] Clicking "Start Using ScholarSync" sets saving=true
- [ ] Empty name and institution are handled gracefully

### API — POST /api/onboarding/complete
- [ ] Repeated calls keep `onboarding_completed = true` but are not fully idempotent because `updated_at` changes on every call

### Database Fields
- [ ] `onboarding_completed` defaults to `false` for new users
- [ ] `full_name` is saved from the name input field
- [ ] `specialty` stores multiple specialties as a comma-separated string (e.g., "Surgery, Radiology, ENT")
- [ ] `bio` stores the institution value (not an actual bio)
- [ ] All fields persist correctly after page reload

### Error State (error.tsx)
- [ ] Retry button is present with ArrowCounterClockwise icon (16px)
- [ ] Clicking retry button attempts to reload the onboarding flow
- [ ] Error boundary catches rendering errors correctly

### Icons
- [ ] All icons render at their specified sizes
- [ ] Icons are from the correct icon library (Phosphor Icons)
- [ ] Check icon uses 14px in specialties and 18px in goals
- [ ] Icons are visually aligned with their accompanying text
