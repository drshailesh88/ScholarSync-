# settings — Spec 001

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/settings
MODULE: settings

---
### Sidebar Navigation
#### Tab Buttons
- [x] PASS: **Active tab styling** — active tab has `bg-surface-raised` background with `border-border-subtle` border
- [x] PASS: **Sidebar title** — "Settings" text at top
- [x] PASS: **Log Out button** — red text (`text-red-500`), `SignOut` icon (18px), positioned at bottom of sidebar

### My Account Tab
#### User Display Section
- [x] PASS: **User avatar** — `UserCircle` icon (48px) as placeholder
- [x] PASS: **Full Name** — displays user's full name
- [x] PASS: **Email** — displays user's email
- [x] PASS: **Verified Student badge** — green badge (`emerald-500`) with `ShieldCheck` icon (12px), text "Verified Student"
#### Profile Form Fields
- [x] PASS: **ORCID helper text** — "Your unique researcher identifier from orcid.org" below the input
#### Research Interests (Chip Input)
- [x] PASS: **Input placeholder** — "Type an interest and press Enter"
- [x] PASS: **Add button** — `Plus` icon (16px) button next to input
- [x] PASS: **Add via Enter key** — pressing Enter adds the typed interest as a chip
- [x] PASS: **Add via button click** — clicking the plus button adds the interest
- [x] PASS: **Interest chips** — each displays as inline chip with text and `X` remove button (12px)
- [x] PASS: **Remove chip** — clicking X removes the interest from the list
- [x] PASS: **Empty input rejected** — blank/whitespace-only input is not added
#### Save Profile
- [x] PASS: **Save button** — text "Save Changes"
- [x] PASS: **Saving state** — button text changes to "Saving...", button disabled
- [x] PASS: **Success message** — "Profile saved successfully." in green (`emerald-500`), auto-dismisses after 3 seconds
- [x] PASS: **Error message** — "Failed to save profile. Please try again." in red (`red-500`), auto-dismisses after 3 seconds
- [x] PASS: **Calls `updateUserProfile()`** — sends all profile fields to server action

### Plans & Billing Tab
#### Current Plan Section
- [x] PASS: **Plan name** — displayed capitalized (Free, Basic, Pro)
- [x] PASS: **Pricing display**:
- [x] PASS: **Token quota text** — "Token quota: {limit} tokens/month"
- [x] PASS: **Status badge** — "ACTIVE" with green background (`emerald-500`)
- [x] PASS: **Manage Plan button** — border style button
#### Payment Method Section
- [x] PASS: **Card icon** — credit card visual display
- [x] PASS: **Card details** — "Visa •••• •••• •••• 4242"
- [x] PASS: **Platform badge** — "Razorpay Secure"
- [x] PASS: **Update button** — small, border style

### Usage Tracking Tab
#### Progress Bars
- [x] PASS: **Deep Searches helper text** — "Fair use policy applies for unlimited searches"

### Preferences Tab
#### Theme Toggle
- [x] PASS: **Uses next-themes** — `useTheme()` hook for theme switching
- [x] PASS: **Idle button** — shows regular icon and `text-ink-muted`
- [x] PASS: **Rounded pill shape** — buttons arranged in a pill with gap and padding
#### Editor Font Size
- [x] PASS: **Label** — "Editor Font Size"
- [x] PASS: **Dropdown options**:
