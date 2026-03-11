# onboarding — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/onboarding
MODULE: onboarding

---
### Styling & Theming
- [ ] Main container uses `glass-panel rounded-2xl p-8`
- [ ] Primary text uses `text-ink`
- [ ] Muted/description text uses `text-ink-muted`
- [ ] Brand color is applied consistently across buttons and active states
- [ ] Input fields show `focus:ring-2 focus:ring-brand/40` on focus
- [ ] Selected specialty uses `bg-brand/10 text-brand border-brand/30`
- [ ] Selected goal uses `bg-brand/5 border-brand/30`
- [ ] Unselected items use `bg-surface-raised text-ink-muted border-border`
- [ ] Page is responsive and centered
#### Detailed QA Coverage
- [ ] `step` defaults to `0`
- [ ] `name` defaults to an empty string
- [ ] `institution` defaults to an empty string
- [ ] `selectedSpecialties` defaults to an empty array
- [ ] `selectedGoals` defaults to an empty array
- [ ] `saving` defaults to `false`
- [ ] `totalSteps` is hard-coded to `4`
- [ ] `canNext` is derived from `step` and current selections rather than stored independently
- [ ] Only one step panel is rendered at a time based on the current `step`
- [ ] Progress bars and navigation controls remain mounted while step content swaps
- [ ] Step 0 panel uses `text-center` at the card level while the form row itself switches back to `text-left`
- [ ] Welcome icon is wrapped in a 64x64 rounded square with `bg-brand/10 text-brand`
- [ ] Name input is a controlled input bound to `name`
- [ ] Institution input is a controlled input bound to `institution`
- [ ] Name input has no `required`, `maxLength`, or trimming behavior in the current implementation
- [ ] Institution input has no `required`, `maxLength`, or trimming behavior in the current implementation
- [ ] Neither welcome-step input is prefilled from saved profile data
- [ ] Step 0 has no inline validation, helper text, or error message area
- [ ] Specialty choices are rendered from the `SPECIALTIES` constant array in source order
- [ ] Each specialty is rendered as a button, not a checkbox input
- [ ] Clicking an unselected specialty appends it to `selectedSpecialties`
- [ ] Clicking a selected specialty removes it from `selectedSpecialties`
- [ ] Specialty selection order follows click order because new selections append to the array
- [ ] Selected specialty buttons show an inline `Check` icon before the label text
- [ ] Selected specialty buttons keep the text and icon on one line with `inline mr-1`
- [ ] Unselected specialty buttons gain `hover:text-ink hover:border-border`
