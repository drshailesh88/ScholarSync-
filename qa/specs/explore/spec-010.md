# explore — Spec 010

STATUS: PENDING
TESTED: 0/18
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/explore/scopes
MODULE: explore

---
### Scopes Management Page (/explore/scopes)

#### Page Layout
- [ ] **Page title** — shows "Manage Scopes" heading `[CODE]`
- [ ] **Back to Explore link** — arrow button navigates to /explore `[CODE]`
- [ ] **Scope count display** — header shows "N / 20" count `[CODE]`
- [ ] **Description text** — shows "Scopes let you narrow search results..." explanation `[CODE]`

#### Create Scope
- [ ] **New Scope button** — click "New Scope", verify form appears `[CODE]`
- [ ] **Name input (required)** — scope name field is required, max 100 chars `[CODE]`
- [ ] **Include domains field** — comma-separated domain input with placeholder "nih.gov, gov.uk" `[CODE]`
- [ ] **Exclude domains field** — comma-separated exclude domain input `[CODE]`
- [ ] **Include keywords field** — comma-separated keyword input `[CODE]`
- [ ] **Exclude keywords field** — comma-separated exclude keyword input `[CODE]`
- [ ] **Create saves scope** — fill form and submit, verify scope appears in list `[CODE]`
- [ ] **Cancel hides form** — click Cancel, verify form disappears `[CODE]`
- [ ] **Validation error display** — submit with invalid data, verify error message shows `[CODE]`

#### Manage Existing Scopes
- [ ] **Edit scope** — click pencil icon, verify edit form opens with populated fields `[CODE]`
- [ ] **Delete scope** — click trash icon, verify scope removed from list `[CODE]`
- [ ] **Toggle active/inactive** — click Active badge, verify it toggles to Inactive (dimmed) `[CODE]`
- [ ] **Max 20 enforcement** — with 20 scopes, "New Scope" button is hidden `[CODE]`

#### Empty State
- [ ] **No scopes message** — when no scopes exist, shows "No scopes yet. Create one to narrow your searches." `[CODE]`
