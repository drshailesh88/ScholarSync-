# onboarding — Spec 005

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
- [x] PASS: Continue gating on step 1 depends only on `selectedSpecialties.length > 0`
- [x] PASS: Step 1 has no maximum specialty count
- [x] PASS: Goal cards are rendered from the `GOALS` constant array in source order
- [x] PASS: Each goal card is a full-width button with icon block, text block, and optional right-aligned check icon
- [x] PASS: Clicking an unselected goal appends its `id` to `selectedGoals`
- [x] PASS: Clicking a selected goal removes its `id` from `selectedGoals`
- [x] PASS: Selected goal cards change both card border/background and icon-container styling
- [x] PASS: Unselected goal cards use `bg-surface-raised/50 border-border`
- [x] PASS: Goal card icons remain visible in both selected and unselected states
- [x] PASS: Continue gating on step 2 depends only on `selectedGoals.length > 0`
- [x] PASS: Step 2 has no maximum goal count
- [x] PASS: `selectedGoals` are not included in the completion payload in the current implementation
- [x] PASS: Feature tour items are rendered from the `FEATURES` constant array in source order
- [x] PASS: Each feature row uses a numbered badge with `i + 1`, not a semantic ordered list element
- [x] PASS: Number badges use `w-8 h-8 rounded-lg bg-brand/10 text-brand`
- [x] PASS: Feature rows use `bg-surface-raised/50 border border-border-subtle`
- [x] PASS: Feature tour has no selection state, hover state, or expandable content
- [x] PASS: Back button is always present in the DOM across all steps
- [x] PASS: Back button is disabled only when `step === 0`
- [x] PASS: Disabled Back button uses `disabled:opacity-0` but still occupies layout space
- [x] PASS: Clicking Back uses `setStep((s) => Math.max(0, s - 1))`
- [x] PASS: Back navigation never decrements below `0`
- [x] PASS: Back navigation preserves previously entered name and institution values
- [x] PASS: Back navigation preserves previously selected specialties
- [x] PASS: Back navigation preserves previously selected goals
- [x] PASS: Continue button is rendered only while `step < totalSteps - 1`
- [x] PASS: Clicking Continue uses `setStep((s) => s + 1)`
- [x] PASS: Continue has no additional guard in the click handler beyond the disabled state
- [x] PASS: Step 0 Continue remains enabled with both inputs empty
- [x] PASS: Step 1 Continue is disabled whenever `selectedSpecialties.length === 0`
- [x] PASS: Step 2 Continue is disabled whenever `selectedGoals.length === 0`
- [x] PASS: Disabled Continue uses `disabled:opacity-50`
- [x] PASS: Continue button does not show a loading spinner or progress text on any step
- [x] PASS: Final-step button is rendered only when `step === totalSteps - 1`
- [x] PASS: Completion button text is `Start Using ScholarSync` while idle
