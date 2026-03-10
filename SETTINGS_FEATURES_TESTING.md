# ScholarSync Settings Page — Complete Feature Inventory & Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the Settings page (`/settings`).
> **Generated**: March 2026

---

## Table of Contents

1. [Page Overview](#1-page-overview)
2. [Sidebar Navigation](#2-sidebar-navigation)
3. [My Account Tab](#3-my-account-tab)
4. [Plans & Billing Tab](#4-plans--billing-tab)
5. [Usage Tracking Tab](#5-usage-tracking-tab)
6. [Preferences Tab](#6-preferences-tab)
7. [Billing API & Payment Flow](#7-billing-api--payment-flow)
8. [Webhook Handling](#8-webhook-handling)
9. [Server Actions](#9-server-actions)
10. [Loading & Error States](#10-loading--error-states)
11. [Quick Test Workflow](#11-quick-test-workflow)

---

## 1. Page Overview

| Property | Value |
|----------|-------|
| **Route** | `/settings` |
| **Page file** | `src/app/(app)/settings/page.tsx` |
| **Loading file** | `src/app/(app)/settings/loading.tsx` |
| **Error file** | `src/app/(app)/settings/error.tsx` |
| **Auth** | Requires authenticated user (Clerk) |
| **Data fetching** | `getUser()` and `getUserUsageStats()` server actions on mount |

The page is a single component with four tabs, controlled by `activeTab` state (default: `"account"`).

---

## 2. Sidebar Navigation

The left sidebar contains tab navigation and a logout button.

### Tab Buttons

| Key | Label | Icon (Phosphor) | Test |
|-----|-------|-----------------|------|
| `account` | My Account | `UserCircle` (18px) | [ ] Click navigates to account tab |
| `billing` | Plans & Billing | `CreditCard` (18px) | [ ] Click navigates to billing tab |
| `usage` | Usage Tracking | `ChartBar` (18px) | [ ] Click navigates to usage tab |
| `preferences` | Preferences | `Gear` (18px) | [ ] Click navigates to preferences tab |

- [ ] **Active tab styling** — active tab has `bg-surface-raised` background with `border-border-subtle` border
- [ ] **Sidebar title** — "Settings" text at top
- [ ] **Log Out button** — red text (`text-red-500`), `SignOut` icon (18px), positioned at bottom of sidebar

---

## 3. My Account Tab

### User Display Section

- [ ] **User avatar** — `UserCircle` icon (48px) as placeholder
- [ ] **Full Name** — displays user's full name
- [ ] **Email** — displays user's email
- [ ] **Verified Student badge** — green badge (`emerald-500`) with `ShieldCheck` icon (12px), text "Verified Student"

### Profile Form Fields

| Field | Type | Placeholder | Test |
|-------|------|-------------|------|
| **Full Name** | `text` input | "Dr. Jane Doe" | [ ] Type name, verify state updates |
| **Specialty / Institution** | `text` input | "e.g. Cardiology, AIIMS New Delhi" | [ ] Type specialty |
| **Country** | `text` input | "e.g. India" | [ ] Type country |
| **Bio** | `textarea` (3 rows) | "A short bio about your research background..." | [ ] Type bio text |
| **ORCID iD** | `text` input | "0000-0002-1825-0097" | [ ] Type ORCID |

- [ ] **ORCID helper text** — "Your unique researcher identifier from orcid.org" below the input

### Research Interests (Chip Input)

- [ ] **Input placeholder** — "Type an interest and press Enter"
- [ ] **Add button** — `Plus` icon (16px) button next to input
- [ ] **Add via Enter key** — pressing Enter adds the typed interest as a chip
- [ ] **Add via button click** — clicking the plus button adds the interest
- [ ] **Interest chips** — each displays as inline chip with text and `X` remove button (12px)
- [ ] **Remove chip** — clicking X removes the interest from the list
- [ ] **Empty input rejected** — blank/whitespace-only input is not added

### Save Profile

- [ ] **Save button** — text "Save Changes"
- [ ] **Saving state** — button text changes to "Saving...", button disabled
- [ ] **Success message** — "Profile saved successfully." in green (`emerald-500`), auto-dismisses after 3 seconds
- [ ] **Error message** — "Failed to save profile. Please try again." in red (`red-500`), auto-dismisses after 3 seconds
- [ ] **Calls `updateUserProfile()`** — sends all profile fields to server action

---

## 4. Plans & Billing Tab

### Current Plan Section

- [ ] **Plan name** — displayed capitalized (Free, Basic, Pro)
- [ ] **Pricing display**:
  - Free plan: "Free"
  - Basic plan: "₹1,000/month"
  - Pro plan: "₹2,500/month"
- [ ] **Token quota text** — "Token quota: {limit} tokens/month"
- [ ] **Status badge** — "ACTIVE" with green background (`emerald-500`)
- [ ] **Manage Plan button** — border style button

### Payment Method Section

- [ ] **Card icon** — credit card visual display
- [ ] **Card details** — "Visa •••• •••• •••• 4242"
- [ ] **Platform badge** — "Razorpay Secure"
- [ ] **Update button** — small, border style

### Invoice History Table

Uses the `DataTable` component with the following columns:

| Column | Content | Test |
|--------|---------|------|
| **Date** | Formatted as "MMM DD, YYYY" (en-IN locale) | [ ] Verify date format |
| **Description** | Invoice description text | [ ] Verify description text |
| **Amount** | Formatted as "₹{amount}" (en-IN locale) | [ ] Verify currency format |
| **Actions** | Download button with `DownloadSimple` icon (14px) | [ ] Click download button |

#### Mock Invoice Data

| ID | Date | Description | Amount |
|----|------|-------------|--------|
| inv_01 | 2026-02-01 | Basic Plan — February 2026 | ₹1,000 |
| inv_02 | 2026-01-01 | Basic Plan — January 2026 | ₹1,000 |
| inv_03 | 2025-12-01 | Basic Plan — December 2025 | ₹1,000 |

---

## 5. Usage Tracking Tab

### Progress Bars

Three `ProgressBar` components showing usage metrics:

| Metric | Color | Max Value | Special Behavior | Test |
|--------|-------|-----------|------------------|------|
| **AI Tokens** | `var(--brand)` | Plan-based (10,000 default for free) | Shows "{used} / {max}" | [ ] Verify bar fill and numbers |
| **Deep Searches** | `#0ea5e9` (sky blue) | -1 (unlimited) | Shows 30% fill + "(Unlimited)" text | [ ] Verify unlimited display |
| **Plagiarism Checks** | `#f59e0b` (amber) | Plan-based (3/10/50) | Shows "{used} / {max}" | [ ] Verify plan-appropriate limit |

- [ ] **Deep Searches helper text** — "Fair use policy applies for unlimited searches"

#### Plagiarism Check Limits by Plan

| Plan | Limit |
|------|-------|
| Free | 3 |
| Basic | 10 |
| Pro | 50 |

### Usage Summary Grid (2×2)

| Metric | Display Format | Test |
|--------|---------------|------|
| **Tokens Used** | "{used} of {limit}" | [ ] Verify numbers match |
| **Searches** | "{used} this month" | [ ] Verify count |
| **Plagiarism Checks** | "{used} of {limit}" | [ ] Verify numbers match |
| **Exports** | "{used} this month" | [ ] Verify count |

---

## 6. Preferences Tab

### Theme Toggle

Uses the `ThemeToggle` component (from `src/components/ui/theme-toggle.tsx`):

| Option | Label | Icon (Phosphor) | Active Style | Test |
|--------|-------|-----------------|-------------|------|
| Light | "Daylight" | `Sun` (14px, weight: fill when active) | Solid background | [ ] Click to switch to light mode |
| Dark | "Night" | `Moon` (14px, weight: fill when active) | Solid background | [ ] Click to switch to dark mode |

- [ ] **Uses next-themes** — `useTheme()` hook for theme switching
- [ ] **Idle button** — shows regular icon and `text-ink-muted`
- [ ] **Rounded pill shape** — buttons arranged in a pill with gap and padding

### Editor Font Size

- [ ] **Label** — "Editor Font Size"
- [ ] **Dropdown options**:
  - 14px
  - 16px (Default)
  - 18px
  - 20px
- [ ] **Default value** — "16"

### Default Citation Format

- [ ] **Label** — "Default Citation Format"
- [ ] **Dropdown options**:

| Value | Display Label | Test |
|-------|--------------|------|
| `apa7` | APA 7th Edition | [ ] Select and verify |
| `mla9` | MLA 9th Edition | [ ] Select and verify |
| `chicago` | Chicago 17th | [ ] Select and verify |
| `vancouver` | Vancouver | [ ] Select and verify |

- [ ] **Default value** — "apa7"

### Preferred Language

- [ ] **Label** — "Preferred Language"
- [ ] **Dropdown options**:

| Value | Language |
|-------|---------|
| `en` | English |
| `hi` | Hindi |
| `es` | Spanish |
| `fr` | French |
| `de` | German |
| `pt` | Portuguese |
| `zh` | Chinese |
| `ja` | Japanese |
| `ko` | Korean |

- [ ] **Default value** — "en"

### Save Preferences

- [ ] **Save button** — text "Save Preferences"
- [ ] **Saving state** — button text changes to "Saving...", button disabled
- [ ] **Success message** — "Preferences saved successfully." in green (`emerald-500`), auto-dismisses after 3 seconds
- [ ] **Error message** — "Failed to save preferences. Please try again." in red (`red-500`), auto-dismisses after 3 seconds

---

## 7. Billing API & Payment Flow

### POST `/api/billing/create-order`

Creates a Razorpay payment order for plan upgrade.

**Request:**
```json
{ "plan": "basic" | "pro" }
```

**Success Response (200):**
```json
{
  "orderId": "order_xxx",
  "amount": 100000,
  "currency": "INR",
  "keyId": "rzp_xxx"
}
```

**Error Responses:**

| Status | Message | Test |
|--------|---------|------|
| 503 | "Payment gateway not configured" | [ ] When Razorpay keys missing |
| 400 | "Invalid plan. Must be 'basic' or 'pro'" | [ ] With invalid plan value |
| 500 | "Failed to create payment order" | [ ] On Razorpay API failure |

- [ ] **Rate limiting** — uses `RATE_LIMITS.analysis`
- [ ] **Auth required** — returns 401 if not authenticated

### POST `/api/billing/verify-payment`

Verifies Razorpay payment signature and activates subscription.

**Request:**
```json
{
  "orderId": "order_xxx",
  "paymentId": "pay_xxx",
  "signature": "hmac_signature",
  "plan": "basic" | "pro"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "subscription": {
    "plan": "basic",
    "status": "active",
    "currentPeriodEnd": "2026-04-08T00:00:00.000Z"
  }
}
```

**Error Responses:**

| Status | Message | Test |
|--------|---------|------|
| 400 | Missing required fields | [ ] Omit orderId/paymentId/signature/plan |
| 400 | "Invalid plan" | [ ] With invalid plan value |
| 400 | Invalid payment signature | [ ] With wrong signature |
| 500 | "Payment verification failed" | [ ] On server error |

**Process:**
1. Validates all required fields present
2. Calls `verifyPaymentSignature()` (HMAC SHA256)
3. Creates/updates subscription in DB
4. Updates user plan field
5. Sets subscription period: now → 30 days from now

### GET `/api/billing/subscription`

Returns current subscription and usage data.

**Response (200):**
```json
{
  "subscription": {
    "plan": "basic",
    "status": "active",
    "currentPeriodStart": "2026-03-09T00:00:00.000Z",
    "currentPeriodEnd": "2026-04-08T00:00:00.000Z"
  },
  "usage": {
    "tokensUsed": 1245,
    "tokensLimit": 10000,
    "searchesUsed": 12,
    "plagiarismChecks": 2,
    "exportsUsed": 5,
    "plan": "basic"
  }
}
```

- [ ] **Null subscription** — returns `null` for subscription if none exists
- [ ] **Null usage** — returns `null` for usage if user not found

---

## 8. Webhook Handling

### POST `/api/billing/webhook`

Handles Razorpay webhook events.

**Verification:**
- Uses `x-razorpay-signature` header
- HMAC SHA256 with `RAZORPAY_WEBHOOK_SECRET`
- Timing-safe comparison for security

**Events Handled:**

| Event | Action | Test |
|-------|--------|------|
| `payment.captured` | No action (already handled by verify-payment) | [ ] Verify 200 returned |
| `subscription.cancelled` | Sets subscription status to "cancelled", user plan to "free" | [ ] Verify plan downgrade |
| `subscription.halted` | Same as cancelled | [ ] Verify plan downgrade |

- [ ] **Invalid signature** — returns 400
- [ ] **Unknown event** — returns 200 (acknowledged but no action)

---

## 9. Server Actions

### `getUser()`

**File:** `src/lib/actions/user.ts`

- [ ] Returns current user data including all profile fields
- [ ] Returns `null` if user not found in DB
- [ ] Uses `getCurrentUserId()` from Clerk auth

### `updateUserProfile(data)`

**File:** `src/lib/actions/user.ts`

- [ ] Updates only provided fields (partial update)
- [ ] Sets `updated_at` timestamp on save
- [ ] Accepts: `full_name`, `specialty`, `country`, `bio`, `research_interests`, `preferred_language`, `default_citation_style`, `orcid_id`

### `getUserUsageStats()`

**File:** `src/lib/actions/user.ts`

- [ ] Returns: `tokens_used`, `tokens_limit`, `searches_used`, `plagiarism_checks`, `exports_used`, `plan`
- [ ] Maps from DB column names to response fields

### `getSubscription()`

**File:** `src/lib/actions/billing.ts`

- [ ] Returns subscription record for current user or `null`

### `createSubscription(data)`

**File:** `src/lib/actions/billing.ts`

- [ ] Creates or updates subscription record
- [ ] Also updates user plan field
- [ ] Sets status to "active", period start to now, period end to now + 30 days

### `cancelSubscription()`

**File:** `src/lib/actions/billing.ts`

- [ ] Sets subscription status to "cancelled"
- [ ] Sets user plan to "free"

---

## 10. Loading & Error States

### Loading State (`loading.tsx`)

- [ ] **Skeleton layout** — renders animated skeleton placeholders for each section
- [ ] **Skeleton component** — uses `animation-pulse` with `bg-surface-raised`
- [ ] Skeletons mirror the layout of the actual settings page

### Error State (`error.tsx`)

Uses the `ErrorDisplay` component:

- [ ] **Title** — "Settings unavailable"
- [ ] **Message** — "We couldn't load your settings. Please try again."
- [ ] **Warning icon** — `WarningCircle` (32px) in red
- [ ] **Retry button** — with `ArrowCounterClockwise` icon (16px)
- [ ] **Sentry capture** — error is captured to Sentry if error prop provided

### Page Loading State

- [ ] **Loading flag** — `loading` state is `true` during initial data fetch
- [ ] Fetches both `getUser()` and `getUserUsageStats()` on mount
- [ ] Populates all form fields from fetched user data once loaded

---

## 11. Quick Test Workflow

### Account Settings Flow
1. [ ] Navigate to `/settings` — verify "My Account" tab is active by default
2. [ ] Verify user display section shows name, email, and verified badge
3. [ ] Edit Full Name — type new name
4. [ ] Edit Specialty — type new specialty
5. [ ] Add a Research Interest — type text, press Enter, verify chip appears
6. [ ] Remove a Research Interest — click X on chip, verify it's removed
7. [ ] Enter ORCID iD — verify helper text visible
8. [ ] Click "Save Changes" — verify "Saving..." state, then "Profile saved successfully." message
9. [ ] Refresh page — verify saved data persists

### Billing Flow
1. [ ] Click "Plans & Billing" tab
2. [ ] Verify current plan name, price, token quota, and "ACTIVE" badge
3. [ ] Verify payment method section shows card details
4. [ ] Verify invoice history table with 3 mock invoices
5. [ ] Click download button on an invoice row

### Usage Tracking Flow
1. [ ] Click "Usage Tracking" tab
2. [ ] Verify AI Tokens progress bar with correct fill and numbers
3. [ ] Verify Deep Searches shows "(Unlimited)" with 30% fill
4. [ ] Verify Plagiarism Checks shows plan-appropriate limit (3/10/50)
5. [ ] Verify "Fair use policy applies for unlimited searches" helper text
6. [ ] Verify 2×2 summary grid matches progress bar data

### Preferences Flow
1. [ ] Click "Preferences" tab
2. [ ] Toggle theme to "Night" — verify dark mode activates
3. [ ] Toggle theme to "Daylight" — verify light mode activates
4. [ ] Change Editor Font Size to 20px
5. [ ] Change Citation Format to "Vancouver"
6. [ ] Change Language to "Hindi"
7. [ ] Click "Save Preferences" — verify "Saving..." state, then "Preferences saved successfully." message
8. [ ] Refresh page — verify preferences persisted

### Navigation & Logout
1. [ ] Click each tab — verify correct content displays
2. [ ] Verify active tab highlighting (bg-surface-raised)
3. [ ] Click "Log Out" button — verify sign out behavior

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI and source code but were
> missing from the original document generated by Claude Code.

### Page State and Navigation
- [ ] Initial client-side data load shows a centered "Loading settings..." message before tab content renders
- [ ] Only one tab panel is rendered at a time based on `activeTab`; switching sidebar tabs swaps the main content area in place
- [ ] Account header falls back to the display name `User` and a blank email when user data is missing

### Account Tab
- [ ] Research interest chips reject duplicate values in addition to blank values
- [ ] Successfully adding a research interest chip clears the chip input
- [ ] Successful profile saves update the visible account header values from the returned server response

### Billing Tab
- [ ] Current plan heading is derived from the user plan and rendered as `{Plan} Plan` (for example, `Free Plan`)
- [ ] Invoice history uses a blank actions-column header and renders a text `Download` button in every invoice row

### Usage Tab
- [ ] Usage summary section includes the heading "This Month at a Glance"
- [ ] Usage widgets fall back to `0` usage and a `10,000` token limit when usage stats are unavailable

### Preferences Tab
- [ ] Preferences save only persists `preferred_language` and `default_citation_style`
- [ ] Editor font size is a local page-state control defaulting to `16`, separate from the saved preference payload
- [ ] Preferences includes a second `ThemeToggle` inside the tab in addition to the app-shell theme toggle

### Detailed QA Coverage

#### Initial Fetch and Default State
- [ ] `activeTab` defaults to `account` on first client render
- [ ] `fontSize` defaults to `"16"` on first client render
- [ ] Initial page state keeps `loading` true until both `getUser()` and `getUserUsageStats()` finish
- [ ] While `loading` is true, the page shows the centered text `Loading settings...`
- [ ] Initial data load calls `getUser()` and `getUserUsageStats()` in parallel with `Promise.all`
- [ ] If the initial fetch throws, the page logs `Failed to fetch user data:` to the console
- [ ] If the initial fetch throws, the page still exits loading state and renders the settings UI with fallback values
- [ ] Fetched `full_name` hydrates both the account summary heading and the Full Name input
- [ ] Fetched `preferred_language` hydrates the Preferred Language select
- [ ] Fetched `default_citation_style` hydrates the Default Citation Format select
- [ ] Fetched `research_interests` only hydrate into chips when the value is an array of strings
- [ ] Missing usage data falls back to `0` usage counts and a `10,000` token limit

#### Sidebar Navigation
- [ ] Sidebar title `Settings` is rendered above the tab buttons
- [ ] `My Account` is the active sidebar button on first render
- [ ] Clicking `My Account` shows the `My Account` content pane without changing the route
- [ ] Clicking `Plans & Billing` shows the billing pane without changing the route
- [ ] Clicking `Usage Tracking` shows the usage pane without changing the route
- [ ] Clicking `Preferences` shows the preferences pane without changing the route
- [ ] Sidebar tab buttons remain enabled during normal idle state
- [ ] `Log Out` stays visible at the bottom of the sidebar while switching tabs

#### Account Summary Card
- [ ] Account tab renders a 64x64 circular avatar placeholder with a `UserCircle` icon
- [ ] Account summary heading shows `user.full_name` when present
- [ ] Account summary heading falls back to `User` when `user.full_name` is null
- [ ] Account summary email line shows `user.email` when present
- [ ] Account summary email line falls back to an empty string when no email is available
- [ ] `Verified Student` badge is always rendered on the account tab in the current implementation
- [ ] `Verified Student` badge includes a `ShieldCheck` icon and badge text on the same line

#### Full Name Input
- [ ] `Full Name` label is rendered directly above the first text input
- [ ] Full Name input placeholder is `Dr. Jane Doe`
- [ ] Full Name input is prefilled from `user.full_name` when profile data exists
- [ ] Full Name input falls back to an empty string when `user.full_name` is null
- [ ] Full Name input is a controlled input bound to `profileName`
- [ ] Full Name input has no `required` attribute in the current implementation
- [ ] Full Name input has no `maxLength` attribute in the current implementation
- [ ] Full Name input uses the shared `focus:ring-2 focus:ring-brand/40` focus style

#### Specialty / Institution Input
- [ ] `Specialty / Institution` label is rendered above the second text input
- [ ] Specialty / Institution input placeholder is `e.g. Cardiology, AIIMS New Delhi`
- [ ] Specialty / Institution input is prefilled from `user.specialty` when profile data exists
- [ ] Specialty / Institution input falls back to an empty string when `user.specialty` is null
- [ ] Specialty / Institution input is a controlled input bound to `specialty`
- [ ] Specialty / Institution input has no `required` attribute in the current implementation
- [ ] Specialty / Institution input has no `maxLength` attribute in the current implementation
- [ ] Specialty / Institution input uses the shared `focus:ring-2 focus:ring-brand/40` focus style

#### Country Input
- [ ] `Country` label is rendered above the third text input
- [ ] Country input placeholder is `e.g. India`
- [ ] Country input is prefilled from `user.country` when profile data exists
- [ ] Country input falls back to an empty string when `user.country` is null
- [ ] Country input is a controlled input bound to `country`
- [ ] Country input has no `required` attribute in the current implementation
- [ ] Country input has no `maxLength` attribute in the current implementation
- [ ] Country input uses the shared `focus:ring-2 focus:ring-brand/40` focus style

#### Bio Textarea
- [ ] `Bio` label is rendered above the textarea
- [ ] Bio textarea placeholder is `A short bio about your research background...`
- [ ] Bio textarea is prefilled from `user.bio` when profile data exists
- [ ] Bio textarea falls back to an empty string when `user.bio` is null
- [ ] Bio textarea uses `rows={3}`
- [ ] Bio textarea is a controlled field bound to `bio`
- [ ] Bio textarea is `resize-none` in the current implementation
- [ ] Bio textarea uses the shared `focus:ring-2 focus:ring-brand/40` focus style

#### Research Interests Chip Input
- [ ] `Research Interests` label is rendered above the chip area and entry controls
- [ ] Existing research interests render as chips before the add-interest input
- [ ] Each existing chip renders the interest text plus an `X` remove button
- [ ] Add-interest input placeholder is `Type an interest and press Enter`
- [ ] Add-interest control row contains one text input and one icon-only `Plus` button
- [ ] Pressing `Enter` inside the interest input prevents default form submission
- [ ] Pressing `Enter` with a non-empty value adds a new chip immediately in local state
- [ ] Clicking the `Plus` button with a non-empty value adds a new chip immediately in local state
- [ ] Interest values are trimmed before duplicate/blank checks run
- [ ] Blank or whitespace-only interest values are ignored
- [ ] Duplicate interest values are ignored
- [ ] Adding a new interest clears the interest input back to an empty string
- [ ] Removing a chip updates the chip row immediately without waiting for a save
- [ ] Chip changes are not persisted until `Save Changes` is clicked

#### ORCID Input
- [ ] `ORCID iD` label is rendered above the ORCID text input
- [ ] ORCID input placeholder is `0000-0002-1825-0097`
- [ ] ORCID input is prefilled from `user.orcid_id` when profile data exists
- [ ] ORCID input falls back to an empty string when `user.orcid_id` is null
- [ ] ORCID input helper text reads `Your unique researcher identifier from orcid.org`
- [ ] ORCID input is a controlled input bound to `orcidId`
- [ ] ORCID input has no `required` attribute in the current implementation
- [ ] ORCID input uses the shared `focus:ring-2 focus:ring-brand/40` focus style

#### Save Changes Button and Messaging
- [ ] `Save Changes` button is rendered only on the `My Account` tab
- [ ] `Save Changes` is enabled on initial render even when no fields have changed
- [ ] `Save Changes` is disabled only while `saving` is true
- [ ] While saving, the button label changes from `Save Changes` to `Saving...`
- [ ] While saving, the button shows text-only loading feedback with no spinner icon
- [ ] Successful profile saves render the inline message `Profile saved successfully.` next to the button
- [ ] Failed profile saves render the inline message `Failed to save profile. Please try again.` next to the button
- [ ] Save success/error feedback is inline text, not a toast or modal
- [ ] Save messages auto-clear after 3 seconds through `showSaveMessage`
- [ ] Profile save payload includes `full_name`, `specialty`, `country`, `bio`, `research_interests`, and `orcid_id`
- [ ] Profile save payload does not include `email`, `plan`, `preferred_language`, or `default_citation_style`
- [ ] Successful profile saves update the local `user` state so the account summary reflects returned values
- [ ] Failed profile saves leave the current form field values intact for retry

#### Billing Tab Details
- [ ] Billing tab main heading reads `Plans & Billing`
- [ ] Current plan heading is rendered as `{Capitalized plan} Plan`
- [ ] Free plan pricing renders as the standalone text `Free`
- [ ] Basic plan pricing renders `₹1,000` with `/month` in muted text
- [ ] Pro plan pricing renders `₹2,500` with `/month` in muted text
- [ ] Token quota text uses `toLocaleString("en-IN")` formatting for the numeric limit
- [ ] `ACTIVE` badge is always shown in the current plan card
- [ ] `Manage Plan` button has no disabled or loading state in the current page component
- [ ] Payment Method section always shows the hard-coded card text `Visa •••• •••• •••• 4242`
- [ ] `Razorpay Secure` helper text is rendered under the card details
- [ ] `Update` button has no disabled or loading state in the current page component
- [ ] Invoice History heading renders directly above the `DataTable`
- [ ] Invoice table actions header cell is intentionally blank
- [ ] Every invoice row renders a `Download` button with a `DownloadSimple` icon and text label
- [ ] Invoice table container uses horizontal overflow handling and a rounded bordered wrapper

#### Usage Tracking Details
- [ ] Usage tab main heading reads `Usage Tracking`
- [ ] AI Tokens progress row shows the label on the left and `{used} / {max}` text on the right
- [ ] AI Tokens progress fill uses `var(--brand)` as its bar color
- [ ] Finite progress bars clamp their fill width to 100% maximum
- [ ] Deep Searches row shows `{value} (Unlimited)` instead of `{value} / {max}`
- [ ] Deep Searches fill width is fixed to 30% when `max < 0`
- [ ] Deep Searches helper text reads `Fair use policy applies for unlimited searches`
- [ ] Plagiarism Checks progress fill uses `#f59e0b`
- [ ] `This Month at a Glance` heading renders above the 2x2 usage summary grid
- [ ] Summary cards render label text, a bold primary value, and a smaller helper line as separate rows
- [ ] `Exports` summary falls back to `0` when `usageStats?.exports_used` is nullish
- [ ] Plagiarism limit is derived from `plan` as `3` for free, `10` for basic, and `50` for pro

#### Theme Toggle Details
- [ ] Preferences tab renders a local `Theme` section label above the page-level `ThemeToggle`
- [ ] Before client mount, `ThemeToggle` renders a placeholder pill instead of real buttons
- [ ] Theme toggle contains exactly two buttons: `Daylight` and `Night`
- [ ] Clicking `Daylight` calls `setTheme("light")`
- [ ] Clicking `Night` calls `setTheme("dark")`
- [ ] When `Daylight` is active, the Daylight button uses `bg-surface text-ink shadow-sm`
- [ ] When `Night` is active, the Night button uses `bg-surface text-ink shadow-sm`
- [ ] Inactive theme buttons use `text-ink-muted` styling
- [ ] Active theme icons switch to `weight="fill"` and inactive icons use `weight="regular"`
- [ ] Clicking `Daylight` sets the `<html>` class list to the light theme state and stores `theme=light` in localStorage
- [ ] Clicking `Night` sets the `<html>` class list to the dark theme state and stores `theme=dark` in localStorage
- [ ] Theme changes apply immediately and do not require clicking `Save Preferences`
- [ ] Theme choice persists after a page refresh through `next-themes` storage

#### Preferences Selects and Save Flow
- [ ] `Editor Font Size` label is rendered above the first preferences select
- [ ] Editor Font Size select options are exactly `14px`, `16px (Default)`, `18px`, and `20px`
- [ ] Editor Font Size select defaults to `16`
- [ ] Changing Editor Font Size updates only the local `fontSize` state in this page component
- [ ] Editor Font Size is not included in the `handleSavePreferences` payload
- [ ] `Default Citation Format` select initializes from `user.default_citation_style` or falls back to `apa7`
- [ ] Citation Format options are `APA 7th Edition`, `MLA 9th Edition`, `Chicago 17th`, and `Vancouver`
- [ ] `Preferred Language` select initializes from `user.preferred_language` or falls back to `en`
- [ ] Preferred Language options are `English`, `Hindi`, `Spanish`, `French`, `German`, `Portuguese`, `Chinese`, `Japanese`, and `Korean`
- [ ] `Save Preferences` is enabled on initial render even when no select value has changed
- [ ] `Save Preferences` is disabled only while `savingPrefs` is true
- [ ] While saving preferences, the button label changes from `Save Preferences` to `Saving...`
- [ ] Preferences save uses text-only loading feedback with no spinner icon
- [ ] Successful preferences saves render the inline message `Preferences saved successfully.` next to the button
- [ ] Failed preferences saves render the inline message `Failed to save preferences. Please try again.` next to the button
- [ ] Preferences success/error feedback auto-clears after 3 seconds through `showSaveMessage`
- [ ] Preferences save payload includes only `preferred_language` and `default_citation_style`
- [ ] Successful preferences saves update the local `user` state for `preferred_language` and `default_citation_style`
- [ ] Saved citation-format and language values persist after a page refresh

## Database Schema Reference

### Users Table (relevant fields)

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `plan` | enum: free, basic, pro, institutional | "free" | Current subscription plan |
| `tokens_used_this_month` | integer | 0 | AI token usage |
| `tokens_limit` | integer | 10,000 | Monthly token cap |
| `searches_used_this_month` | integer | 0 | Search count |
| `plagiarism_checks_used` | integer | 0 | Plagiarism check count |
| `exports_used_this_month` | integer | 0 | Export count |
| `preferred_language` | text | "en" | Language preference |
| `default_citation_style` | text | "apa7" | Citation format |
| `orcid_id` | text | null | ORCID identifier |

### Subscriptions Table

| Column | Type | Notes |
|--------|------|-------|
| `plan` | enum: free, basic, pro | Subscription plan |
| `status` | enum: active, cancelled, past_due, trialing | Current status |
| `razorpay_subscription_id` | text | Razorpay reference |
| `current_period_start` | timestamp | Billing period start |
| `current_period_end` | timestamp | Billing period end |

### Razorpay Configuration

| Env Variable | Purpose |
|-------------|---------|
| `RAZORPAY_KEY_ID` | Public API key |
| `RAZORPAY_KEY_SECRET` | Secret API key |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook signature verification |

**Plan Prices (in paise):**

| Plan | Amount | Display |
|------|--------|---------|
| Free | 0 | "Free" |
| Basic | 100,000 | "₹1,000/month" |
| Pro | 200,000 | "₹2,000/month" |

> **Note**: Settings page displays Pro as "₹2,500/month" while Razorpay config has 200,000 paise (₹2,000). This discrepancy should be verified.

---

## Re-Audit Discoveries (Claude Code Pass 2)

> **Method**: Read every file in the import tree from `src/app/(app)/settings/page.tsx` line by line.
> Cross-referenced each finding against all 243 existing checks. Only genuinely new discoveries below.

### Log Out Button (page.tsx:270–273)

- [ ] Log Out button has NO `onClick` handler — clicking it performs no action in the current implementation
- [ ] Log Out button hover state shows `bg-red-500/10` translucent red background

### Save Flow — Message Clearing (page.tsx:147, 184)

- [ ] `handleSaveProfile` clears `saveMessage` to null before starting the save request, removing any prior success/error feedback
- [ ] `handleSavePreferences` clears `prefsSaveMessage` to null before starting the preferences save request
- [ ] Profile save failure logs `Failed to save profile:` with the error to `console.error` (page.tsx:174)
- [ ] Preferences save failure logs `Failed to save preferences:` with the error to `console.error` (page.tsx:204)
- [ ] Both profile and preferences saves call the same `updateUserProfile` server action with different field subsets

### Plan Fallback (page.tsx:234)

- [ ] When `user.plan` is null or undefined, `displayPlan` defaults to `"free"` — all billing and usage displays show free-tier values

### Sidebar Tab Hover (page.tsx:261)

- [ ] Inactive sidebar tab buttons show `hover:bg-surface-raised/50` translucent background on hover
- [ ] Inactive sidebar tab buttons transition text from `text-ink-muted` to `text-ink` on hover

### Account vs Preferences Label Styling (page.tsx:301, 551, 556)

- [ ] Account tab form labels use `text-xs font-medium text-ink-muted mb-1.5` styling (12px, muted)
- [ ] Preferences tab section labels use `text-sm font-medium text-ink` styling (14px, full ink color)

### Research Interest Chip Styling (page.tsx:354)

- [ ] Research interest chips use `bg-brand/10 text-brand` color scheme (brand-tinted background with brand text)
- [ ] Plus button for adding interests has explicit `type="button"` attribute to prevent form submission
- [ ] Chip remove (X) buttons have explicit `type="button"` attribute to prevent form submission

### Save Button Disabled Styling (page.tsx:409)

- [ ] Save Changes button renders with `disabled:opacity-50` when `saving` is true
- [ ] Save Changes button uses `rounded-xl` border radius (not `rounded-lg`)
- [ ] Save Preferences button uses identical `disabled:opacity-50` and `rounded-xl` styling (page.tsx:607)

### Content Pane Layout (page.tsx:277, 280)

- [ ] Content pane uses `overflow-y-auto` allowing vertical scroll when tab content exceeds viewport height
- [ ] Each tab content area is constrained to `max-w-2xl` (672px maximum width)

### Usage Summary Number Formatting (page.tsx:521–537)

- [ ] Tokens Used summary card formats both value and limit with `toLocaleString("en-IN")` (Indian English locale)
- [ ] Searches summary card displays the raw `searchesUsed` number without any locale formatting
- [ ] Plagiarism Checks summary card displays the raw `plagiarismChecks` number without any locale formatting
- [ ] Exports summary card displays the raw `usageStats?.exports_used ?? 0` number without any locale formatting
- [ ] Plagiarism limit in summary helper text (`of {plagiarismLimit}`) is a raw number without `toLocaleString`

### ProgressBar Component (progress-bar.tsx:29–30)

- [ ] ProgressBar formats values with `value.toLocaleString()` using browser default locale (no explicit locale argument)
- [ ] ProgressBar formats max with `max.toLocaleString()` using browser default locale (no explicit locale argument)
- [ ] ProgressBar fill bar uses `transition-all duration-500` for a 500ms animated transition
- [ ] When `max` is exactly 0, ProgressBar fill percentage is 0% (guarded by `max > 0` check)

### ThemeToggle SSR Placeholder (theme-toggle.tsx:16–17)

- [ ] ThemeToggle SSR placeholder has exact dimensions `h-9 w-[156px]` (36px height × 156px width)
- [ ] ThemeToggle uses `useSyncExternalStore` with a server snapshot of `false` to detect client mount
- [ ] Inactive theme buttons have `hover:text-ink` hover transition to full ink color

### DataTable Component (data-table.tsx:31, 43–45)

- [ ] DataTable header cells use `text-left` alignment
- [ ] DataTable rows without an `onRowClick` prop do not receive `cursor-pointer` or hover styling
- [ ] DataTable `Description` column renders via the default `String(item[col.key] ?? "")` path (no custom render function)

### ErrorDisplay Component (error-display.tsx:35, 44)

- [ ] ErrorDisplay retry button label text is `Try Again` (not "Retry")
- [ ] ErrorDisplay `WarningCircle` icon sits inside a `w-16 h-16 rounded-2xl bg-red-500/10` container (not bare icon)

### Skeleton Component (skeleton.tsx:6)

- [ ] Skeleton base CSS class is `animate-pulse` (Tailwind standard), not `animation-pulse`

### Loading Skeleton Dimensions (loading.tsx:7–21)

- [ ] Sidebar title skeleton has dimensions `h-5 w-16` with `mb-4 mx-3` spacing
- [ ] Sidebar renders exactly 4 tab skeleton placeholders, each `h-10 w-full rounded-lg`
- [ ] Content avatar skeleton is `h-16 w-16 rounded-full`
- [ ] Content area includes exactly two `h-10 w-full rounded-lg` input skeletons
- [ ] Content button skeleton is `h-10 w-32 rounded-xl`
- [ ] Content heading skeleton is `h-7 w-40`

### Billing Server Actions (billing.ts:36–49, 75–81)

- [ ] `createSubscription` only updates the `users.plan` field when creating a NEW subscription record — updating an existing subscription does NOT sync `users.plan`
- [ ] `cancelSubscription` only targets subscriptions with `status: "active"` — non-active subscriptions are unaffected and the function returns null

### API Route: verify-payment (verify-payment/route.ts:13–14)

- [ ] `verify-payment` route applies rate limiting using `RATE_LIMITS.analysis` (same limiter as `create-order`)
- [ ] `verify-payment` exact error for missing fields is `"Missing required fields: orderId, paymentId, signature, plan"`

### API Route: webhook (webhook/route.ts:10–11, 17, 39, 74, 77)

- [ ] Webhook returns 503 with `"Webhook not configured"` when `RAZORPAY_WEBHOOK_SECRET` env var is not set
- [ ] Webhook returns 401 with `"Missing signature"` when `x-razorpay-signature` header is absent
- [ ] Webhook returns 401 with `"Invalid signature"` when signature verification fails (not 400 as previously documented)
- [ ] Webhook success response body is `{ received: true }` (not empty 200)
- [ ] Webhook server error returns 500 with `"Webhook processing failed"`

### API Route: create-order Auth (create-order/route.ts:37–43)

- [ ] `create-order` auth failure (from `getCurrentUserId()` throwing) is caught by the generic catch block and returns 500 with `"Failed to create payment order"` — not a dedicated 401 response

---

### Behavior Corrections (Pass 2)

| # | Location | Doc Says | Actual Source |
|---|----------|----------|---------------|
| 1 | §10 line 421 | Skeleton uses `animation-pulse` | Actual class is `animate-pulse` (skeleton.tsx:6) |
| 2 | §10 line 431 | "Retry button" | Button label text is `Try Again` (error-display.tsx:44) |
| 3 | §8 line 362 | "Invalid signature — returns 400" | Webhook returns **401** for both missing and invalid signatures (webhook/route.ts:17, 39) |
| 4 | §11 line 483 | "Click 'Log Out' button — verify sign out behavior" | Log Out button has **no onClick handler** — clicking does nothing (page.tsx:270–273) |
| 5 | §7 line 271 | "Auth required — returns 401 if not authenticated" | Auth errors are caught by generic catch → returns **500** with "Failed to create payment order" (create-order/route.ts:37–43) |
| 6 | §9 line 403 | `createSubscription` "Also updates user plan field" | Only updates `users.plan` when **creating** a new record, not when updating existing (billing.ts:36–49 vs 52–71) |

### Components Referenced But Not Rendered

None — all components documented in the existing doc are part of the import chain from `/settings`.

### Existing "Actual Current Behavior Corrections" Verification

The Codex audit section (lines 486–695) is accurate. All assertions were verified against source. No corrections needed in that section.
