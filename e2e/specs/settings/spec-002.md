# settings — Spec 002

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/settings
MODULE: settings

---
### Preferences Tab
#### Editor Font Size
- [x] PASS: **Default value** — "16"
#### Default Citation Format
- [x] PASS: **Label** — "Default Citation Format"
- [x] PASS: **Dropdown options**:
- [x] PASS: **Default value** — "apa7"
#### Preferred Language
- [x] PASS: **Label** — "Preferred Language"
- [x] PASS: **Dropdown options**:
- [x] PASS: **Default value** — "en"
#### Save Preferences
- [x] PASS: **Save button** — text "Save Preferences"
- [x] PASS: **Saving state** — button text changes to "Saving...", button disabled
- [x] PASS: **Success message** — "Preferences saved successfully." in green (`emerald-500`), auto-dismisses after 3 seconds
- [x] PASS: **Error message** — "Failed to save preferences. Please try again." in red (`red-500`), auto-dismisses after 3 seconds

### Billing API & Payment Flow
#### POST `/api/billing/create-order`
- [x] PASS: **Rate limiting** — uses `RATE_LIMITS.analysis`
- [x] PASS: **Auth failure path** — auth errors from `getCurrentUserId()` fall through the generic catch and return 500 with `"Failed to create payment order"`
#### GET `/api/billing/subscription`
- [x] PASS: **Null subscription** — returns `null` for subscription if none exists
- [x] PASS: **Null usage** — returns `null` for usage if user not found

### Webhook Handling
#### POST `/api/billing/webhook`
- [x] PASS: **Invalid signature** — returns 401
- [x] PASS: **Unknown event** — returns 200 (acknowledged but no action)

### Server Actions
#### `getUser()`
- [x] PASS: Returns current user data including all profile fields
- [x] PASS: Returns `null` if user not found in DB
- [x] PASS: Uses `getCurrentUserId()` from Clerk auth
#### `updateUserProfile(data)`
- [x] PASS: Updates only provided fields (partial update)
- [x] PASS: Sets `updated_at` timestamp on save
- [x] PASS: Accepts: `full_name`, `specialty`, `country`, `bio`, `research_interests`, `preferred_language`, `default_citation_style`, `orcid_id`
#### `getUserUsageStats()`
- [x] PASS: Returns: `tokens_used`, `tokens_limit`, `searches_used`, `plagiarism_checks`, `exports_used`, `plan`
- [x] PASS: Maps from DB column names to response fields
#### `getSubscription()`
- [x] PASS: Returns subscription record for current user or `null`
#### `createSubscription(data)`
- [x] PASS: Creates or updates subscription record
- [x] PASS: Also updates user plan field when inserting a new subscription record
- [x] PASS: Sets status to "active", period start to now, period end to now + 30 days
#### `cancelSubscription()`
- [x] PASS: Sets subscription status to "cancelled"
- [x] PASS: Sets user plan to "free"

### Loading & Error States
#### Loading State (`loading.tsx`)
- [x] PASS: **Skeleton layout** — renders animated skeleton placeholders for each section
- [x] PASS: **Skeleton component** — uses `animate-pulse` with `bg-surface-raised`
- [x] PASS: Skeletons mirror the layout of the actual settings page
#### Error State (`error.tsx`)
- [x] PASS: **Title** — "Settings unavailable"
