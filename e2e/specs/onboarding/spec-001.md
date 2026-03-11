# onboarding — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/onboarding
MODULE: onboarding

---
### Page Overview
- [ ] Page renders without errors
- [ ] Page is client-rendered (`"use client"` directive)

### Step 0 — Welcome
- [ ] Sparkle icon renders at 32px
- [ ] Heading text matches exactly: "Welcome to ScholarSync"
- [ ] Description text matches exactly
- [ ] "Your Name" input is present with placeholder "Dr. Rahul Sharma"
- [ ] "Institution" input is present with placeholder "AIIMS New Delhi"
- [ ] Name input accepts free text
- [ ] Institution input accepts free text
- [ ] Glass panel container with rounded-2xl is applied
- [ ] Content is centered
- [ ] Continue button is always enabled (no validation required on step 0)
- [ ] User can proceed even with both fields empty
- [ ] User can proceed with only name filled
- [ ] User can proceed with only institution filled
- [ ] User can proceed with both fields filled

### Step 1 — Specialties
#### Specialties List
- [ ] Heading text matches: "Your Research Interests"
- [ ] Description text matches exactly
- [ ] All 21 specialties are rendered
- [ ] Each specialty listed above is present with correct label text
- [ ] Clicking a specialty toggles it to selected state
- [ ] Selected specialty shows `bg-brand/10 text-brand border-brand/30` styling
- [ ] Selected specialty shows Check icon at 14px
- [ ] Unselected specialty shows `bg-surface-raised text-ink-muted border-border` styling
- [ ] Unselected specialty does not show Check icon
- [ ] Clicking a selected specialty deselects it
- [ ] Multiple specialties can be selected simultaneously
- [ ] Continue button is disabled when 0 specialties are selected
- [ ] Continue button is enabled when 1 or more specialties are selected
- [ ] Selecting all 21 specialties works correctly
- [ ] Toggling between selected and unselected updates visual state immediately

### Step 2 — Goals
#### Goals List
- [ ] Heading text matches: "What do you want to do?"
- [ ] Description text matches exactly
- [ ] All 5 goals are rendered
- [ ] "Write Research Papers" goal has PenNib icon (20px), correct label and description
