# settings — Spec 002

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/settings
MODULE: settings

---
### Preferences Tab
#### Editor Font Size
- [ ] **Default value** — "16"
#### Default Citation Format
- [ ] **Label** — "Default Citation Format"
- [ ] **Dropdown options**:
- [ ] **Default value** — "apa7"
#### Preferred Language
- [ ] **Label** — "Preferred Language"
- [ ] **Dropdown options**:
- [ ] **Default value** — "en"
#### Save Preferences
- [ ] **Save button** — text "Save Preferences"
- [ ] **Saving state** — button text changes to "Saving...", button disabled
- [ ] **Success message** — "Preferences saved successfully." in green (`emerald-500`), auto-dismisses after 3 seconds
- [ ] **Error message** — "Failed to save preferences. Please try again." in red (`red-500`), auto-dismisses after 3 seconds

### Billing API & Payment Flow
#### POST `/api/billing/create-order`
- [ ] **Rate limiting** — uses `RATE_LIMITS.analysis`
- [ ] **Auth failure path** — auth errors from `getCurrentUserId()` fall through the generic catch and return 500 with `"Failed to create payment order"`
#### GET `/api/billing/subscription`
- [ ] **Null subscription** — returns `null` for subscription if none exists
- [ ] **Null usage** — returns `null` for usage if user not found

### Webhook Handling
#### POST `/api/billing/webhook`
- [ ] **Invalid signature** — returns 401
- [ ] **Unknown event** — returns 200 (acknowledged but no action)

### Server Actions
#### `getUser()`
- [ ] Returns current user data including all profile fields
- [ ] Returns `null` if user not found in DB
- [ ] Uses `getCurrentUserId()` from Clerk auth
#### `updateUserProfile(data)`
- [ ] Updates only provided fields (partial update)
- [ ] Sets `updated_at` timestamp on save
- [ ] Accepts: `full_name`, `specialty`, `country`, `bio`, `research_interests`, `preferred_language`, `default_citation_style`, `orcid_id`
#### `getUserUsageStats()`
- [ ] Returns: `tokens_used`, `tokens_limit`, `searches_used`, `plagiarism_checks`, `exports_used`, `plan`
- [ ] Maps from DB column names to response fields
#### `getSubscription()`
- [ ] Returns subscription record for current user or `null`
#### `createSubscription(data)`
- [ ] Creates or updates subscription record
- [ ] Also updates user plan field when inserting a new subscription record
- [ ] Sets status to "active", period start to now, period end to now + 30 days
#### `cancelSubscription()`
- [ ] Sets subscription status to "cancelled"
- [ ] Sets user plan to "free"

### Loading & Error States
#### Loading State (`loading.tsx`)
- [ ] **Skeleton layout** — renders animated skeleton placeholders for each section
- [ ] **Skeleton component** — uses `animate-pulse` with `bg-surface-raised`
- [ ] Skeletons mirror the layout of the actual settings page
#### Error State (`error.tsx`)
- [ ] **Title** — "Settings unavailable"
