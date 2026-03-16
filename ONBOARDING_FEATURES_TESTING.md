# Onboarding Features Testing

## Table of Contents

1. [Page Overview](#1-page-overview)
2. [Step 0 — Welcome](#2-step-0--welcome)
3. [Step 1 — Specialties](#3-step-1--specialties)
4. [Step 2 — Goals](#4-step-2--goals)
5. [Step 3 — Feature Tour](#5-step-3--feature-tour)
6. [Navigation Controls](#6-navigation-controls)
7. [Progress Indicator](#7-progress-indicator)
8. [Completion Flow (handleComplete)](#8-completion-flow-handlecomplete)
9. [API — POST /api/onboarding/complete](#9-api--post-apionboardingcomplete)
10. [Database Fields](#10-database-fields)
11. [Loading State (loading.tsx)](#11-loading-state-loadingtsx)
12. [Error State (error.tsx)](#12-error-state-errortsx)
13. [Icons](#13-icons)
14. [Styling & Theming](#14-styling--theming)
15. [Codex Verification Pass Discoveries](#15-codex-verification-pass-discoveries)

---

## 1. Page Overview

| Property | Value |
|---|---|
| Route | `/onboarding` |
| Source file | `src/app/(app)/onboarding/page.tsx` |
| Directive | `"use client"` |
| State variables | `step` (0-3), `name`, `institution`, `selectedSpecialties` (string[]), `selectedGoals` (string[]), `saving` |
| Derived values / constants | `totalSteps` (`4`), `canNext` |

- [ ] Page renders without errors
- [ ] Page is client-rendered (`"use client"` directive)

---

## 2. Step 0 — Welcome

| Element | Expected |
|---|---|
| Icon | Sparkle, 32px |
| Heading | "Welcome to ScholarSync" |
| Description | "Your AI-powered academic writing companion. Let's set things up so we can personalize your experience." |
| Input 1 label | "Your Name" |
| Input 1 placeholder | "Dr. Rahul Sharma" |
| Input 2 label | "Institution" |
| Input 2 placeholder | "AIIMS New Delhi" |
| Container | Glass panel, rounded-2xl, centered |

- [ ] Sparkle icon renders at 32px
- [ ] Heading text matches exactly: "Welcome to ScholarSync"
- [ ] Description text matches exactly
- [ ] "Your Name" input is present with placeholder "Dr. Rahul Sharma"
- [ ] "Institution" input is present with placeholder "AIIMS New Delhi"
- [ ] Name input accepts free text
- [ ] Institution input accepts free text
- [ ] Glass panel container with rounded-2xl is applied
- [ ] Content is centered
- [ ] Continue button is always enabled (no validation required on step 0)
- [ ] User can proceed even with both fields empty
- [ ] User can proceed with only name filled
- [ ] User can proceed with only institution filled
- [ ] User can proceed with both fields filled

---

## 3. Step 1 — Specialties

| Element | Expected |
|---|---|
| Heading | "Your Research Interests" |
| Description | "Select your specialties so we can personalize search results and suggestions." |
| Minimum selection | 1 |
| Total specialties | 21 |
| Selected style | `bg-brand/10 text-brand border-brand/30` + Check icon (14px) |
| Unselected style | `bg-surface-raised text-ink-muted border-border` |

### 3.1 Specialties List

| # | Specialty |
|---|---|
| 1 | Internal Medicine |
| 2 | Surgery |
| 3 | Pediatrics |
| 4 | Obstetrics & Gynecology |
| 5 | Orthopedics |
| 6 | Radiology |
| 7 | Pathology |
| 8 | Pharmacology |
| 9 | Microbiology |
| 10 | Anatomy |
| 11 | Physiology |
| 12 | Biochemistry |
| 13 | Community Medicine |
| 14 | Forensic Medicine |
| 15 | Dermatology |
| 16 | Psychiatry |
| 17 | Ophthalmology |
| 18 | ENT |
| 19 | Anesthesiology |
| 20 | Emergency Medicine |
| 21 | Other |

- [ ] Heading text matches: "Your Research Interests"
- [ ] Description text matches exactly
- [ ] All 21 specialties are rendered
- [ ] Each specialty listed above is present with correct label text
- [ ] Clicking a specialty toggles it to selected state
- [ ] Selected specialty shows `bg-brand/10 text-brand border-brand/30` styling
- [ ] Selected specialty shows Check icon at 14px
- [ ] Unselected specialty shows `bg-surface-raised text-ink-muted border-border` styling
- [ ] Unselected specialty does not show Check icon
- [ ] Clicking a selected specialty deselects it
- [ ] Multiple specialties can be selected simultaneously
- [ ] Continue button is disabled when 0 specialties are selected
- [ ] Continue button is enabled when 1 or more specialties are selected
- [ ] Selecting all 21 specialties works correctly
- [ ] Toggling between selected and unselected updates visual state immediately

---

## 4. Step 2 — Goals

| Element | Expected |
|---|---|
| Heading | "What do you want to do?" |
| Description | "Select all that apply. This helps us prioritize features for you." |
| Minimum selection | 1 |
| Total goals | 5 |
| Selected style | `bg-brand/5 border-brand/30` + Check icon (18px) on right |

### 4.1 Goals List

| # | ID | Label | Icon | Description |
|---|---|---|---|---|
| 1 | `write` | Write Research Papers | PenNib (20px) | Draft and polish manuscripts for publication |
| 2 | `search` | Search Literature | GlobeHemisphereWest (20px) | Find and organize relevant papers |
| 3 | `check` | Check Plagiarism & AI | ShieldCheck (20px) | Ensure originality before submission |
| 4 | `present` | Create Presentations | Presentation (20px) | Generate slides from your research |
| 5 | `learn` | Learn Research Methods | BookOpen (20px) | Socratic AI tutor for methodology |

- [ ] Heading text matches: "What do you want to do?"
- [ ] Description text matches exactly
- [ ] All 5 goals are rendered
- [ ] "Write Research Papers" goal has PenNib icon (20px), correct label and description
- [ ] "Search Literature" goal has GlobeHemisphereWest icon (20px), correct label and description
- [ ] "Check Plagiarism & AI" goal has ShieldCheck icon (20px), correct label and description
- [ ] "Create Presentations" goal has Presentation icon (20px), correct label and description
- [ ] "Learn Research Methods" goal has BookOpen icon (20px), correct label and description
- [ ] Each goal card shows icon + label + description
- [ ] Clicking a goal toggles it to selected state
- [ ] Selected goal shows `bg-brand/5 border-brand/30` styling
- [ ] Selected goal shows Check icon (18px) on the right side
- [ ] Clicking a selected goal deselects it
- [ ] Multiple goals can be selected simultaneously
- [ ] Continue button is disabled when 0 goals are selected
- [ ] Continue button is enabled when 1 or more goals are selected
- [ ] Selecting all 5 goals works correctly

---

## 5. Step 3 — Feature Tour

| Element | Expected |
|---|---|
| Heading | "Here's what you can do" |
| Description | "ScholarSync has everything you need to research, write, and publish." |
| Validation | None (always can proceed) |

### 5.1 Features List

| # | Feature Name | Description |
|---|---|---|
| 1 | Literature Search | Search 282M+ papers across PubMed, Semantic Scholar, and OpenAlex |
| 2 | The Studio | AI-powered editor with Learn Mode and Draft Mode |
| 3 | Citation Manager | Auto-format citations in 10,000+ styles |
| 4 | Final Checks | Plagiarism detection and AI content analysis |
| 5 | Slides Generator | Turn your paper into a presentation in minutes |

- [ ] Heading text matches: "Here's what you can do"
- [ ] Description text matches exactly
- [ ] 5 feature rows are rendered from the `FEATURES` array with numbered badges
- [ ] Feature 1: "Literature Search" with description "Search 282M+ papers across PubMed, Semantic Scholar, and OpenAlex"
- [ ] Feature 2: "The Studio" with description "AI-powered editor with Learn Mode and Draft Mode"
- [ ] Feature 3: "Citation Manager" with description "Auto-format citations in 10,000+ styles"
- [ ] Feature 4: "Final Checks" with description "Plagiarism detection and AI content analysis"
- [ ] Feature 5: "Slides Generator" with description "Turn your paper into a presentation in minutes"
- [ ] Features are numbered 1-5
- [ ] Complete button is always enabled (no validation required)

---

## 6. Navigation Controls

### 6.1 Back Button

| Property | Expected |
|---|---|
| Label | "Back" |
| Icon | ArrowLeft (16px) |
| Disabled on | Step 0 |
| Disabled style | `opacity-0` |

- [ ] Back button shows "Back" text with ArrowLeft icon (16px)
- [ ] Back button is disabled on step 0
- [ ] Back button has `opacity-0` when disabled (hidden but present in DOM)
- [ ] Back button is enabled on steps 1, 2, 3
- [ ] Clicking Back on step 1 navigates to step 0
- [ ] Clicking Back on step 2 navigates to step 1
- [ ] Clicking Back on step 3 navigates to step 2
- [ ] Selections are preserved when navigating back and forward

### 6.2 Continue Button (Steps 0-2)

| Property | Expected |
|---|---|
| Label | "Continue" |
| Icon | ArrowRight (16px) |
| Style | `bg-brand text-white` |
| Disabled style | `opacity-50` |
| Disabled when | `canNext` is false |

- [ ] Continue button shows "Continue" text with ArrowRight icon (16px)
- [ ] Continue button uses `bg-brand text-white` styling
- [ ] Continue button is disabled with `opacity-50` when canNext is false
- [ ] On step 0: Continue is always enabled
- [ ] On step 1: Continue is disabled when no specialties selected
- [ ] On step 1: Continue is enabled when >= 1 specialty selected
- [ ] On step 2: Continue is disabled when no goals selected
- [ ] On step 2: Continue is enabled when >= 1 goal selected
- [ ] Clicking Continue on step 0 navigates to step 1
- [ ] Clicking Continue on step 1 navigates to step 2
- [ ] Clicking Continue on step 2 navigates to step 3

### 6.3 Complete Button (Step 3)

| Property | Expected |
|---|---|
| Default label | "Start Using ScholarSync" |
| Saving label | "Setting up..." |
| Icon | ArrowRight |
| Style | `bg-brand text-white` |

- [ ] Complete button shows "Start Using ScholarSync" with ArrowRight icon
- [ ] Complete button uses `bg-brand text-white` styling
- [ ] Clicking Complete triggers handleComplete flow
- [ ] While saving, button text changes to "Setting up..."
- [ ] Button is not clickable while saving

---

## 7. Progress Indicator

| Property | Expected |
|---|---|
| Total bars | 4 |
| Completed style | `bg-brand` |
| Future style | `bg-surface-raised` |
| Bar height | `h-1` |
| Bar shape | `rounded-full` |

- [ ] 4 horizontal bars are rendered
- [ ] Bars are arranged horizontally
- [ ] On step 0: first bar is `bg-brand`, remaining 3 are `bg-surface-raised`
- [ ] On step 1: first 2 bars are `bg-brand`, remaining 2 are `bg-surface-raised`
- [ ] On step 2: first 3 bars are `bg-brand`, remaining 1 is `bg-surface-raised`
- [ ] On step 3: all 4 bars are `bg-brand`
- [ ] Each bar has `h-1 rounded-full` styling
- [ ] Progress updates immediately when step changes

---

## 8. Completion Flow (handleComplete)

| Step | Action |
|---|---|
| 1 | `updateUserProfile({ full_name: name \|\| undefined, specialty: selectedSpecialties.join(", ") \|\| undefined, bio: institution \|\| undefined })` |
| 2 | `POST /api/onboarding/complete` |
| 3 | `router.push("/dashboard")` |
| On error | `console.error` + still redirect to `/dashboard` |

- [ ] Clicking "Start Using ScholarSync" sets saving=true
- [ ] Empty name and institution are handled gracefully

---

## 9. API — POST /api/onboarding/complete

| Property | Expected |
|---|---|
| Method | POST |
| Auth | Required via `getCurrentUserId()` |
| Success response | `{ success: true }` |
| Error response | `500 { error: "Failed to complete onboarding" }` for any thrown error, including auth failures |
| DB update | `users.onboarding_completed = true, updated_at = now()` |

- [ ] Repeated calls keep `onboarding_completed = true` but are not fully idempotent because `updated_at` changes on every call

---

## 10. Database Fields

| Field | Type | Default | Notes |
|---|---|---|---|
| `users.onboarding_completed` | boolean | `false` | Set to true on completion |
| `users.full_name` | string | — | From "Your Name" input |
| `users.specialty` | string | — | Comma-separated list of selected specialties |
| `users.bio` | string | — | Institution value stored here |

- [ ] `onboarding_completed` defaults to `false` for new users
- [ ] `full_name` is saved from the name input field
- [ ] `specialty` stores multiple specialties as a comma-separated string (e.g., "Surgery, Radiology, ENT")
- [ ] `bio` stores the institution value (not an actual bio)
- [ ] All fields persist correctly after page reload

---

## 11. Loading State (loading.tsx)

| Element | Expected |
|---|---|
| Progress bar skeletons | 4 bars, `h-1 rounded-full` |
| Content skeleton | `h-80 rounded-2xl` |
| Navigation skeletons | `h-10 w-20 rounded-xl` (back) + `h-12 w-36 rounded-xl` (continue) |

---

## 12. Error State (error.tsx)

| Element | Expected |
|---|---|
| Component | ErrorDisplay |
| Title | "Onboarding unavailable" |
| Message | "We couldn't load the onboarding flow. Please try again." |
| Icon | WarningCircle (32px) inside a tinted `bg-red-500/10 text-red-500` container |
| Retry icon | ArrowCounterClockwise (16px) |

- [ ] Retry button is present with ArrowCounterClockwise icon (16px)
- [ ] Clicking retry button attempts to reload the onboarding flow
- [ ] Error boundary catches rendering errors correctly

---

## 13. Icons

| Icon | Size | Used In |
|---|---|---|
| Sparkle | 32px | Step 0 heading |
| PenNib | 20px | "Write Research Papers" goal |
| GlobeHemisphereWest | 20px | "Search Literature" goal |
| ShieldCheck | 20px | "Check Plagiarism & AI" goal |
| Presentation | 20px | "Create Presentations" goal |
| BookOpen | 20px | "Learn Research Methods" goal |
| Check | 14px | Selected specialty indicator |
| Check | 18px | Selected goal indicator (right-aligned) |
| ArrowLeft | 16px | Back button |
| ArrowRight | 16px | Continue / Complete button |
| WarningCircle | 32px | Error state |
| ArrowCounterClockwise | 16px | Retry button |

- [ ] All icons render at their specified sizes
- [ ] Icons are from the correct icon library (Phosphor Icons)
- [ ] Check icon uses 14px in specialties and 18px in goals
- [ ] Icons are visually aligned with their accompanying text

---

## 14. Styling & Theming

| Token | Usage |
|---|---|
| `glass-panel` | Main content container |
| `rounded-2xl` | Container border radius |
| `p-8` | Container padding |
| `text-ink` | Primary text color |
| `text-ink-muted` | Secondary / description text |
| `bg-brand` | Primary action buttons, active progress bars |
| `bg-brand/10` | Selected specialty background |
| `bg-brand/5` | Selected goal background |
| `border-brand/30` | Selected item border |
| `border-border` | Default item border |
| `bg-surface-raised` | Unselected items, inactive progress bars |
| `focus:ring-2 focus:ring-brand/40` | Input focus ring |

- [ ] Main container uses `glass-panel rounded-2xl p-8`
- [ ] Primary text uses `text-ink`
- [ ] Muted/description text uses `text-ink-muted`
- [ ] Brand color is applied consistently across buttons and active states
- [ ] Input fields show `focus:ring-2 focus:ring-brand/40` on focus
- [ ] Selected specialty uses `bg-brand/10 text-brand border-brand/30`
- [ ] Selected goal uses `bg-brand/5 border-brand/30`
- [ ] Unselected items use `bg-surface-raised text-ink-muted border-border`
- [ ] Page is responsive and centered

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI and source code but were
> missing from the original document generated by Claude Code.

### Detailed QA Coverage

#### Initial State and Step Control
- [ ] `step` defaults to `0`
- [ ] `name` defaults to an empty string
- [ ] `institution` defaults to an empty string
- [ ] `selectedSpecialties` defaults to an empty array
- [ ] `selectedGoals` defaults to an empty array
- [ ] `saving` defaults to `false`
- [ ] `totalSteps` is hard-coded to `4`
- [ ] `canNext` is derived from `step` and current selections rather than stored independently
- [ ] Only one step panel is rendered at a time based on the current `step`
- [ ] Progress bars and navigation controls remain mounted while step content swaps

#### Step 0 Inputs
- [ ] Step 0 panel uses `text-center` at the card level while the form row itself switches back to `text-left`
- [ ] Welcome icon is wrapped in a 64x64 rounded square with `bg-brand/10 text-brand`
- [ ] Name input is a controlled input bound to `name`
- [ ] Institution input is a controlled input bound to `institution`
- [ ] Name input has no `required`, `maxLength`, or trimming behavior in the current implementation
- [ ] Institution input has no `required`, `maxLength`, or trimming behavior in the current implementation
- [ ] Neither welcome-step input is prefilled from saved profile data
- [ ] Step 0 has no inline validation, helper text, or error message area

#### Step 1 Specialty Selection
- [ ] Specialty choices are rendered from the `SPECIALTIES` constant array in source order
- [ ] Each specialty is rendered as a button, not a checkbox input
- [ ] Clicking an unselected specialty appends it to `selectedSpecialties`
- [ ] Clicking a selected specialty removes it from `selectedSpecialties`
- [ ] Specialty selection order follows click order because new selections append to the array
- [ ] Selected specialty buttons show an inline `Check` icon before the label text
- [ ] Selected specialty buttons keep the text and icon on one line with `inline mr-1`
- [ ] Unselected specialty buttons gain `hover:text-ink hover:border-border`
- [ ] Continue gating on step 1 depends only on `selectedSpecialties.length > 0`
- [ ] Step 1 has no maximum specialty count

#### Step 2 Goal Selection
- [ ] Goal cards are rendered from the `GOALS` constant array in source order
- [ ] Each goal card is a full-width button with icon block, text block, and optional right-aligned check icon
- [ ] Clicking an unselected goal appends its `id` to `selectedGoals`
- [ ] Clicking a selected goal removes its `id` from `selectedGoals`
- [ ] Selected goal cards change both card border/background and icon-container styling
- [ ] Unselected goal cards use `bg-surface-raised/50 border-border`
- [ ] Goal card icons remain visible in both selected and unselected states
- [ ] Continue gating on step 2 depends only on `selectedGoals.length > 0`
- [ ] Step 2 has no maximum goal count
- [ ] `selectedGoals` are not included in the completion payload in the current implementation

#### Step 3 Feature Tour
- [ ] Feature tour items are rendered from the `FEATURES` constant array in source order
- [ ] Each feature row uses a numbered badge with `i + 1`, not a semantic ordered list element
- [ ] Number badges use `w-8 h-8 rounded-lg bg-brand/10 text-brand`
- [ ] Feature rows use `bg-surface-raised/50 border border-border-subtle`
- [ ] Feature tour has no selection state, hover state, or expandable content

#### Back Button Behavior
- [ ] Back button is always present in the DOM across all steps
- [ ] Back button is disabled only when `step === 0`
- [ ] Disabled Back button uses `disabled:opacity-0` but still occupies layout space
- [ ] Clicking Back uses `setStep((s) => Math.max(0, s - 1))`
- [ ] Back navigation never decrements below `0`
- [ ] Back navigation preserves previously entered name and institution values
- [ ] Back navigation preserves previously selected specialties
- [ ] Back navigation preserves previously selected goals

#### Continue Button Behavior
- [ ] Continue button is rendered only while `step < totalSteps - 1`
- [ ] Clicking Continue uses `setStep((s) => s + 1)`
- [ ] Continue has no additional guard in the click handler beyond the disabled state
- [ ] Step 0 Continue remains enabled with both inputs empty
- [ ] Step 1 Continue is disabled whenever `selectedSpecialties.length === 0`
- [ ] Step 2 Continue is disabled whenever `selectedGoals.length === 0`
- [ ] Disabled Continue uses `disabled:opacity-50`
- [ ] Continue button does not show a loading spinner or progress text on any step

#### Completion Button and Save Flow
- [ ] Final-step button is rendered only when `step === totalSteps - 1`
- [ ] Completion button text is `Start Using ScholarSync` while idle
- [ ] Completion button text changes to `Setting up...` while `saving` is true
- [ ] Completion button remains rendered with the `ArrowRight` icon even while saving
- [ ] Completion button is disabled only while `saving` is true
- [ ] Clicking completion sets `saving` to `true` before any async work begins
- [ ] Completion payload sends `full_name` only when `name` is non-empty
- [ ] Completion payload sends `specialty` only when at least one specialty is selected
- [ ] Completion payload sends `bio` only when `institution` is non-empty
- [ ] Selected specialties are serialized as `selectedSpecialties.join(", ")`
- [ ] Institution is stored in the `bio` field in the current implementation
- [ ] Completion flow does not persist `selectedGoals`
- [ ] Completion flow calls `updateUserProfile()` before posting to `/api/onboarding/complete`
- [ ] Completion flow posts to `/api/onboarding/complete` with `method: "POST"` and no request body
- [ ] Successful completion redirects to `/dashboard`
- [ ] Failed completion logs `Onboarding save failed:` to the console
- [ ] Failed completion still redirects to `/dashboard`
- [ ] `saving` is reset to `false` in `finally`, even after navigation is triggered

#### API and Error Semantics
- [ ] `POST /api/onboarding/complete` returns `{ success: true }` on success
- [ ] API route updates `users.onboarding_completed` to `true`
- [ ] API route updates `users.updated_at` to `new Date()`
- [ ] API route catches all thrown errors and returns `500 { error: "Failed to complete onboarding" }`
- [ ] API route logs `Onboarding complete error:` to the server console on failure
- [ ] Unauthenticated failures are caught by the generic `catch` and return `500`, not a dedicated `401` response in the current implementation
- [ ] API route exports only `POST`; unsupported methods rely on Next.js route handling rather than custom logic

#### Loading and Error Boundaries
- [ ] Loading skeleton wrapper uses the same `min-h-[calc(100vh-7rem)] flex items-center justify-center` outer layout as the page
- [ ] Loading skeleton container uses `w-full max-w-2xl mx-auto`
- [ ] Loading state renders exactly four progress skeleton bars using `Array.from({ length: 4 })`
- [ ] Error state delegates to `ErrorDisplay` with title `Onboarding unavailable`
- [ ] Error state message is `We couldn't load the onboarding flow. Please try again.`
- [ ] Error boundary passes both `error` and `reset` through to `ErrorDisplay`

#### Doc Corrections
- [ ] Route should be documented as `/onboarding`, not as the source file path
- [ ] Unauthenticated onboarding-complete requests currently surface as generic `500` failures, not a dedicated auth-specific response

---

## 15. Codex Verification Pass Discoveries

> Source-verified against `page.tsx`, `route.ts`, `loading.tsx`, `error.tsx`,
> `error-display.tsx`, `user.ts`, `auth.ts`, `skeleton.tsx`, `app-shell.tsx`,
> and `(app)/layout.tsx`.

### App Shell & Auth Context
- [ ] `(app)/layout.tsx` authenticates onboarding with `getCurrentUserId()` and redirects failures to `/sign-in`
- [ ] Onboarding content is rendered inside `AppShell` `<main className="flex-1 overflow-y-auto p-6">`
- [ ] `AppHeader` and `CommandPalette` are mounted by `AppShell` during onboarding
- [ ] Desktop sidebar chrome is part of onboarding at `md+` breakpoints; mobile sidebar stays closed until opened

### Error Display Internals
- [ ] `error.tsx` has its own `"use client"` directive
- [ ] `ErrorDisplay` calls `Sentry.captureException(error)` in `useEffect`
- [ ] Error retry button text is `Try Again`
- [ ] Error retry button uses `bg-brand text-white rounded-xl hover:bg-brand-hover transition-colors`
- [ ] `ErrorDisplay` only renders the retry button when `onRetry` is provided
- [ ] Error icon wrapper uses `w-16 h-16 rounded-2xl bg-red-500/10 text-red-500`

### Goal Selection Details
- [ ] Goal-card check icon uses `weight="bold"`
- [ ] Goal icon container uses `w-10 h-10 rounded-lg` with conditional background styling
- [ ] Selected goal icon container changes to `bg-brand/10 text-brand`; unselected uses `bg-surface-raised text-ink-muted`
- [ ] Goal cards use `text-left` so label and description alignment stay left-aligned

### Completion Flow Internals
- [ ] `handleComplete` is wrapped in `useCallback` with deps `[name, institution, selectedSpecialties, router]`
- [ ] `selectedGoals` is excluded from the dependency array because `handleComplete` does not reference it
- [ ] Successful completion writes `updated_at` twice: once in `updateUserProfile` and once in `/api/onboarding/complete`
- [ ] HTTP error responses from `/api/onboarding/complete` do not enter the client `catch` unless `fetch()` itself throws
- [ ] `updateUserProfile` accepts 8 optional profile fields, but onboarding sends only `full_name`, `specialty`, and `bio`
- [ ] `updateUserProfile` builds a sparse payload and only sets columns whose values are not `undefined`

### Step Transitions & Persistence
- [ ] Step panels swap via conditional rendering with no animation wrapper around the content
- [ ] Progress bar state changes animate via `transition-all`
- [ ] Wizard progress and form state reset on page refresh
- [ ] Onboarding state is `useState` only; there is no `localStorage`, `sessionStorage`, or mount-time restore

### Button & Input Styling
- [ ] Continue and Complete buttons both use `hover:bg-brand-hover transition-colors`
- [ ] Complete button uses `disabled:opacity-50` while saving
- [ ] Back button uses `hover:text-ink transition-colors`
- [ ] Loading navigation skeletons include `rounded-xl`
- [ ] Welcome-step inputs use `rounded-xl`, distinct from the card's `rounded-2xl`
- [ ] Welcome-step inputs use `px-4 py-3 bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40`
- [ ] Welcome-step labels use `block text-xs font-medium text-ink-muted mb-1.5`

### Skeleton Component Internals
- [ ] `Skeleton` base classes are `animate-pulse rounded-lg bg-surface-raised`
- [ ] Loading placeholders use Tailwind `animate-pulse`, not a shimmer gradient

### Auth Edge Cases
- [ ] In production without valid Clerk keys, `getCurrentUserId()` throws a configuration error instead of an auth error
- [ ] In development, a missing session falls back to `DEV_USER_ID = "dev_user_001"`

### Naming Inconsistency
- [ ] Feature tour constants use `title` / `desc`, while goal constants use `label` / `description`
