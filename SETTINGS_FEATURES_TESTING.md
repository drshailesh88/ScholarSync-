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
