# explore — Spec 010

STATUS: COMPLETE
TESTED: 16/18
PASS: 16
FAIL: 0
BLOCKED: 2
PAGE: http://localhost:3000/explore/scopes
MODULE: explore

---
### Scopes Management Page (/explore/scopes)

#### Page Layout
- [x] PASS: **Page title** — shows "Manage Scopes" heading `[CODE]`
- [x] PASS: **Back to Explore link** — arrow button navigates to /explore `[CODE]`
- [x] PASS: **Scope count display** — header shows "N / 20" count `[CODE]`
- [x] PASS: **Description text** — shows "Scopes let you narrow search results..." explanation `[CODE]`

#### Create Scope
- [x] PASS: **New Scope button** — click "New Scope", verify form appears `[CODE]`
- [x] PASS: **Name input (required)** — scope name field is required, max 100 chars `[CODE]`
- [x] PASS: **Include domains field** — comma-separated domain input with placeholder "nih.gov, gov.uk" `[CODE]`
- [x] PASS: **Exclude domains field** — comma-separated exclude domain input `[CODE]`
- [x] PASS: **Include keywords field** — comma-separated keyword input `[CODE]`
- [x] PASS: **Exclude keywords field** — comma-separated exclude keyword input `[CODE]`
- [x] PASS: **Create saves scope** — fill form and submit, verify scope appears in list `[CODE]`
- [x] PASS: **Cancel hides form** — click Cancel, verify form disappears `[CODE]`
- [x] PASS: **Validation error display** — submit with invalid data, verify error message shows `[CODE]`

#### Manage Existing Scopes
- [x] PASS: **Edit scope** — click pencil icon, verify edit form opens with populated fields `[CODE]`
- [x] PASS: **Delete scope** — click trash icon, verify scope removed from list `[CODE]`
- [ ] BLOCKED: **Toggle active/inactive** — click Active badge, verify it toggles to Inactive (dimmed) `[CODE]`
- [ ] BLOCKED: **Max 20 enforcement** — with 20 scopes, "New Scope" button is hidden `[CODE]`

#### Empty State
- [x] PASS: **No scopes message** — when no scopes exist, shows "No scopes yet. Create one to narrow your searches." `[CODE]`
