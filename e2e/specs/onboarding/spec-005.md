# onboarding — Spec 005

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
- [ ] Continue gating on step 1 depends only on `selectedSpecialties.length > 0`
- [ ] Step 1 has no maximum specialty count
- [ ] Goal cards are rendered from the `GOALS` constant array in source order
- [ ] Each goal card is a full-width button with icon block, text block, and optional right-aligned check icon
- [ ] Clicking an unselected goal appends its `id` to `selectedGoals`
- [ ] Clicking a selected goal removes its `id` from `selectedGoals`
- [ ] Selected goal cards change both card border/background and icon-container styling
- [ ] Unselected goal cards use `bg-surface-raised/50 border-border`
- [ ] Goal card icons remain visible in both selected and unselected states
- [ ] Continue gating on step 2 depends only on `selectedGoals.length > 0`
- [ ] Step 2 has no maximum goal count
- [ ] `selectedGoals` are not included in the completion payload in the current implementation
- [ ] Feature tour items are rendered from the `FEATURES` constant array in source order
- [ ] Each feature row uses a numbered badge with `i + 1`, not a semantic ordered list element
- [ ] Number badges use `w-8 h-8 rounded-lg bg-brand/10 text-brand`
- [ ] Feature rows use `bg-surface-raised/50 border border-border-subtle`
- [ ] Feature tour has no selection state, hover state, or expandable content
- [ ] Back button is always present in the DOM across all steps
- [ ] Back button is disabled only when `step === 0`
- [ ] Disabled Back button uses `disabled:opacity-0` but still occupies layout space
- [ ] Clicking Back uses `setStep((s) => Math.max(0, s - 1))`
- [ ] Back navigation never decrements below `0`
- [ ] Back navigation preserves previously entered name and institution values
- [ ] Back navigation preserves previously selected specialties
- [ ] Back navigation preserves previously selected goals
- [ ] Continue button is rendered only while `step < totalSteps - 1`
- [ ] Clicking Continue uses `setStep((s) => s + 1)`
- [ ] Continue has no additional guard in the click handler beyond the disabled state
- [ ] Step 0 Continue remains enabled with both inputs empty
- [ ] Step 1 Continue is disabled whenever `selectedSpecialties.length === 0`
- [ ] Step 2 Continue is disabled whenever `selectedGoals.length === 0`
- [ ] Disabled Continue uses `disabled:opacity-50`
- [ ] Continue button does not show a loading spinner or progress text on any step
- [ ] Final-step button is rendered only when `step === totalSteps - 1`
- [ ] Completion button text is `Start Using ScholarSync` while idle
