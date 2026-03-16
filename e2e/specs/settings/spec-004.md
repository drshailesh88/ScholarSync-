# settings — Spec 004

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/settings
MODULE: settings

---
### Quick Test Workflow
#### Detailed QA Coverage
- [x] PASS: Clicking `Plans & Billing` shows the billing pane without changing the route
- [x] PASS: Clicking `Usage Tracking` shows the usage pane without changing the route
- [x] PASS: Clicking `Preferences` shows the preferences pane without changing the route
- [x] PASS: Sidebar tab buttons remain enabled during normal idle state
- [x] PASS: `Log Out` stays visible at the bottom of the sidebar while switching tabs
- [x] PASS: Account tab renders a 64x64 circular avatar placeholder with a `UserCircle` icon
- [x] PASS: Account summary heading shows `user.full_name` when present
- [x] PASS: Account summary heading falls back to `User` when `user.full_name` is null
- [x] PASS: Account summary email line shows `user.email` when present
- [x] PASS: Account summary email line falls back to an empty string when no email is available
- [x] PASS: `Verified Student` badge is always rendered on the account tab in the current implementation
- [x] PASS: `Verified Student` badge includes a `ShieldCheck` icon and badge text on the same line
- [x] PASS: `Full Name` label is rendered directly above the first text input
- [x] PASS: Full Name input placeholder is `Dr. Jane Doe`
- [x] PASS: Full Name input is prefilled from `user.full_name` when profile data exists
- [x] PASS: Full Name input falls back to an empty string when `user.full_name` is null
- [x] PASS: Full Name input is a controlled input bound to `profileName`
- [x] PASS: Full Name input has no `required` attribute in the current implementation
- [x] PASS: Full Name input has no `maxLength` attribute in the current implementation
- [x] PASS: Full Name input uses the shared `focus:ring-2 focus:ring-brand/40` focus style
- [x] PASS: `Specialty / Institution` label is rendered above the second text input
- [x] PASS: Specialty / Institution input placeholder is `e.g. Cardiology, AIIMS New Delhi`
- [x] PASS: Specialty / Institution input is prefilled from `user.specialty` when profile data exists
- [x] PASS: Specialty / Institution input falls back to an empty string when `user.specialty` is null
- [x] PASS: Specialty / Institution input is a controlled input bound to `specialty`
- [x] PASS: Specialty / Institution input has no `required` attribute in the current implementation
- [x] PASS: Specialty / Institution input has no `maxLength` attribute in the current implementation
- [x] PASS: Specialty / Institution input uses the shared `focus:ring-2 focus:ring-brand/40` focus style
- [x] PASS: `Country` label is rendered above the third text input
- [x] PASS: Country input placeholder is `e.g. India`
- [x] PASS: Country input is prefilled from `user.country` when profile data exists
- [x] PASS: Country input falls back to an empty string when `user.country` is null
- [x] PASS: Country input is a controlled input bound to `country`
- [x] PASS: Country input has no `required` attribute in the current implementation
- [x] PASS: Country input has no `maxLength` attribute in the current implementation
