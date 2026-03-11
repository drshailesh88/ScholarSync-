# settings — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/settings
MODULE: settings

---
### Quick Test Workflow
#### Detailed QA Coverage
- [ ] Clicking `Plans & Billing` shows the billing pane without changing the route
- [ ] Clicking `Usage Tracking` shows the usage pane without changing the route
- [ ] Clicking `Preferences` shows the preferences pane without changing the route
- [ ] Sidebar tab buttons remain enabled during normal idle state
- [ ] `Log Out` stays visible at the bottom of the sidebar while switching tabs
- [ ] Account tab renders a 64x64 circular avatar placeholder with a `UserCircle` icon
- [ ] Account summary heading shows `user.full_name` when present
- [ ] Account summary heading falls back to `User` when `user.full_name` is null
- [ ] Account summary email line shows `user.email` when present
- [ ] Account summary email line falls back to an empty string when no email is available
- [ ] `Verified Student` badge is always rendered on the account tab in the current implementation
- [ ] `Verified Student` badge includes a `ShieldCheck` icon and badge text on the same line
- [ ] `Full Name` label is rendered directly above the first text input
- [ ] Full Name input placeholder is `Dr. Jane Doe`
- [ ] Full Name input is prefilled from `user.full_name` when profile data exists
- [ ] Full Name input falls back to an empty string when `user.full_name` is null
- [ ] Full Name input is a controlled input bound to `profileName`
- [ ] Full Name input has no `required` attribute in the current implementation
- [ ] Full Name input has no `maxLength` attribute in the current implementation
- [ ] Full Name input uses the shared `focus:ring-2 focus:ring-brand/40` focus style
- [ ] `Specialty / Institution` label is rendered above the second text input
- [ ] Specialty / Institution input placeholder is `e.g. Cardiology, AIIMS New Delhi`
- [ ] Specialty / Institution input is prefilled from `user.specialty` when profile data exists
- [ ] Specialty / Institution input falls back to an empty string when `user.specialty` is null
- [ ] Specialty / Institution input is a controlled input bound to `specialty`
- [ ] Specialty / Institution input has no `required` attribute in the current implementation
- [ ] Specialty / Institution input has no `maxLength` attribute in the current implementation
- [ ] Specialty / Institution input uses the shared `focus:ring-2 focus:ring-brand/40` focus style
- [ ] `Country` label is rendered above the third text input
- [ ] Country input placeholder is `e.g. India`
- [ ] Country input is prefilled from `user.country` when profile data exists
- [ ] Country input falls back to an empty string when `user.country` is null
- [ ] Country input is a controlled input bound to `country`
- [ ] Country input has no `required` attribute in the current implementation
- [ ] Country input has no `maxLength` attribute in the current implementation
