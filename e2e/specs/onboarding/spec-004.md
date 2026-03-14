# onboarding — Spec 004

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/onboarding
MODULE: onboarding

---
### Styling & Theming
- [x] PASS: Main container uses `glass-panel rounded-2xl p-8`
- [x] PASS: Primary text uses `text-ink`
- [x] PASS: Muted/description text uses `text-ink-muted`
- [x] PASS: Brand color is applied consistently across buttons and active states
- [x] PASS: Input fields show `focus:ring-2 focus:ring-brand/40` on focus
- [x] PASS: Selected specialty uses `bg-brand/10 text-brand border-brand/30`
- [x] PASS: Selected goal uses `bg-brand/5 border-brand/30`
- [x] PASS: Unselected items use `bg-surface-raised text-ink-muted border-border`
- [x] PASS: Page is responsive and centered
#### Detailed QA Coverage
- [x] PASS: `step` defaults to `0`
- [x] PASS: `name` defaults to an empty string
- [x] PASS: `institution` defaults to an empty string
- [x] PASS: `selectedSpecialties` defaults to an empty array
- [x] PASS: `selectedGoals` defaults to an empty array
- [x] PASS: `saving` defaults to `false`
- [x] PASS: `totalSteps` is hard-coded to `4`
- [x] PASS: `canNext` is derived from `step` and current selections rather than stored independently
- [x] PASS: Only one step panel is rendered at a time based on the current `step`
- [x] PASS: Progress bars and navigation controls remain mounted while step content swaps
- [x] PASS: Step 0 panel uses `text-center` at the card level while the form row itself switches back to `text-left`
- [x] PASS: Welcome icon is wrapped in a 64x64 rounded square with `bg-brand/10 text-brand`
- [x] PASS: Name input is a controlled input bound to `name`
- [x] PASS: Institution input is a controlled input bound to `institution`
- [x] PASS: Name input has no `required`, `maxLength`, or trimming behavior in the current implementation
- [x] PASS: Institution input has no `required`, `maxLength`, or trimming behavior in the current implementation
- [x] PASS: Neither welcome-step input is prefilled from saved profile data
- [x] PASS: Step 0 has no inline validation, helper text, or error message area
- [x] PASS: Specialty choices are rendered from the `SPECIALTIES` constant array in source order
- [x] PASS: Each specialty is rendered as a button, not a checkbox input
- [x] PASS: Clicking an unselected specialty appends it to `selectedSpecialties`
- [x] PASS: Clicking a selected specialty removes it from `selectedSpecialties`
- [x] PASS: Specialty selection order follows click order because new selections append to the array
- [x] PASS: Selected specialty buttons show an inline `Check` icon before the label text
- [x] PASS: Selected specialty buttons keep the text and icon on one line with `inline mr-1`
- [x] PASS: Unselected specialty buttons gain `hover:text-ink hover:border-border`
