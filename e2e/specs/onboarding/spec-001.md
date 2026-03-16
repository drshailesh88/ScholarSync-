# onboarding — Spec 001

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/onboarding
MODULE: onboarding

---
### Page Overview
- [x] PASS: Page renders without errors
- [x] PASS: Page is client-rendered (`"use client"` directive)

### Step 0 — Welcome
- [x] PASS: Sparkle icon renders at 32px
- [x] PASS: Heading text matches exactly: "Welcome to ScholarSync"
- [x] PASS: Description text matches exactly
- [x] PASS: "Your Name" input is present with placeholder "Dr. Rahul Sharma"
- [x] PASS: "Institution" input is present with placeholder "AIIMS New Delhi"
- [x] PASS: Name input accepts free text
- [x] PASS: Institution input accepts free text
- [x] PASS: Glass panel container with rounded-2xl is applied
- [x] PASS: Content is centered
- [x] PASS: Continue button is always enabled (no validation required on step 0)
- [x] PASS: User can proceed even with both fields empty
- [x] PASS: User can proceed with only name filled
- [x] PASS: User can proceed with only institution filled
- [x] PASS: User can proceed with both fields filled

### Step 1 — Specialties
#### Specialties List
- [x] PASS: Heading text matches: "Your Research Interests"
- [x] PASS: Description text matches exactly
- [x] PASS: All 21 specialties are rendered
- [x] PASS: Each specialty listed above is present with correct label text
- [x] PASS: Clicking a specialty toggles it to selected state
- [x] PASS: Selected specialty shows `bg-brand/10 text-brand border-brand/30` styling
- [x] PASS: Selected specialty shows Check icon at 14px
- [x] PASS: Unselected specialty shows `bg-surface-raised text-ink-muted border-border` styling
- [x] PASS: Unselected specialty does not show Check icon
- [x] PASS: Clicking a selected specialty deselects it
- [x] PASS: Multiple specialties can be selected simultaneously
- [x] PASS: Continue button is disabled when 0 specialties are selected
- [x] PASS: Continue button is enabled when 1 or more specialties are selected
- [x] PASS: Selecting all 21 specialties works correctly
- [x] PASS: Toggling between selected and unselected updates visual state immediately

### Step 2 — Goals
#### Goals List
- [x] PASS: Heading text matches: "What do you want to do?"
- [x] PASS: Description text matches exactly
- [x] PASS: All 5 goals are rendered
- [x] PASS: "Write Research Papers" goal has PenNib icon (20px), correct label and description
