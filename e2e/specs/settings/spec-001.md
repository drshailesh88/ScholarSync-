# settings — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/settings
MODULE: settings

---
### Sidebar Navigation
#### Tab Buttons
- [ ] **Active tab styling** — active tab has `bg-surface-raised` background with `border-border-subtle` border
- [ ] **Sidebar title** — "Settings" text at top
- [ ] **Log Out button** — red text (`text-red-500`), `SignOut` icon (18px), positioned at bottom of sidebar

### My Account Tab
#### User Display Section
- [ ] **User avatar** — `UserCircle` icon (48px) as placeholder
- [ ] **Full Name** — displays user's full name
- [ ] **Email** — displays user's email
- [ ] **Verified Student badge** — green badge (`emerald-500`) with `ShieldCheck` icon (12px), text "Verified Student"
#### Profile Form Fields
- [ ] **ORCID helper text** — "Your unique researcher identifier from orcid.org" below the input
#### Research Interests (Chip Input)
- [ ] **Input placeholder** — "Type an interest and press Enter"
- [ ] **Add button** — `Plus` icon (16px) button next to input
- [ ] **Add via Enter key** — pressing Enter adds the typed interest as a chip
- [ ] **Add via button click** — clicking the plus button adds the interest
- [ ] **Interest chips** — each displays as inline chip with text and `X` remove button (12px)
- [ ] **Remove chip** — clicking X removes the interest from the list
- [ ] **Empty input rejected** — blank/whitespace-only input is not added
#### Save Profile
- [ ] **Save button** — text "Save Changes"
- [ ] **Saving state** — button text changes to "Saving...", button disabled
- [ ] **Success message** — "Profile saved successfully." in green (`emerald-500`), auto-dismisses after 3 seconds
- [ ] **Error message** — "Failed to save profile. Please try again." in red (`red-500`), auto-dismisses after 3 seconds
- [ ] **Calls `updateUserProfile()`** — sends all profile fields to server action

### Plans & Billing Tab
#### Current Plan Section
- [ ] **Plan name** — displayed capitalized (Free, Basic, Pro)
- [ ] **Pricing display**:
- [ ] **Token quota text** — "Token quota: {limit} tokens/month"
- [ ] **Status badge** — "ACTIVE" with green background (`emerald-500`)
- [ ] **Manage Plan button** — border style button
#### Payment Method Section
- [ ] **Card icon** — credit card visual display
- [ ] **Card details** — "Visa •••• •••• •••• 4242"
- [ ] **Platform badge** — "Razorpay Secure"
- [ ] **Update button** — small, border style

### Usage Tracking Tab
#### Progress Bars
- [ ] **Deep Searches helper text** — "Fair use policy applies for unlimited searches"

### Preferences Tab
#### Theme Toggle
- [ ] **Uses next-themes** — `useTheme()` hook for theme switching
- [ ] **Idle button** — shows regular icon and `text-ink-muted`
- [ ] **Rounded pill shape** — buttons arranged in a pill with gap and padding
#### Editor Font Size
- [ ] **Label** — "Editor Font Size"
- [ ] **Dropdown options**:
