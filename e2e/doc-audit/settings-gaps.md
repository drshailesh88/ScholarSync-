# Settings — Feature Doc Gaps

**Original doc:** `SETTINGS_FEATURES_TESTING.md`
**Original checkbox count:** 87
**After Codex pass 1:** 243
**After Claude Code pass 2:** 297 (54 new checks, 6 behavior corrections)
**After Codex verification:** 297 documented checks, with 53/54 Pass 2 additions verified and 1 clarified

## Audit History

| Pass | Agent | Checks Added | Corrections | Total |
|------|-------|-------------|-------------|-------|
| Original | Claude Code | 87 | — | 87 |
| Pass 1 | Codex | 156 | 0 | 243 |
| Pass 2 | Claude Code | 54 | 6 | 297 |

## Codex Verification Summary

- Reviewed all 54 checkboxes under `Re-Audit Discoveries (Claude Code Pass 2)`.
- Result: 53 verified correct, 0 hallucinated, 1 partially correct.
- The only partial claim was the broad statement that `displayPlan = user?.plan || "free"` makes all billing and usage displays free-tier. In reality, plan-derived UI falls back to free, but token quota and usage counters still render from `getUserUsageStats()`.
- Cleaned stale assertions in `SETTINGS_FEATURES_TESTING.md` for:
  - `create-order` auth failures returning 500, not 401
  - verify-payment / `createSubscription()` user-plan sync being insert-only, not unconditional
  - webhook invalid-signature responses returning 401, not 400
  - skeleton using `animate-pulse`, not `animation-pulse`
  - the settings-page `Log Out` button being rendered without a handler
  - the ErrorDisplay action label being `Try Again`
- High-priority product issue confirmed: `src/app/(app)/settings/page.tsx` renders a plain `Log Out` button with no `onClick` handler and no Clerk wrapper.

## Pass 2 Summary

### New discoveries by area:
- Log Out button: no onClick handler, hover styling (2 checks)
- Save flow message clearing and console logging (5 checks)
- Plan fallback to "free" (1 check)
- Sidebar hover styling (2 checks)
- Account vs preferences label styling difference (2 checks)
- Research interest chip styling and button types (3 checks)
- Save button disabled styling (3 checks)
- Content pane layout (2 checks)
- Usage summary number formatting inconsistencies (5 checks)
- ProgressBar component details (4 checks)
- ThemeToggle SSR placeholder and mount detection (3 checks)
- DataTable component details (3 checks)
- ErrorDisplay corrections (2 checks)
- Skeleton class correction (1 check)
- Loading skeleton dimensions (6 checks)
- Billing server action edge cases (2 checks)
- API route details: verify-payment, webhook, create-order (7 checks)

### Behavior corrections (Pass 2):
1. Skeleton class: `animation-pulse` → `animate-pulse`
2. Error retry button: "Retry" → `Try Again`
3. Webhook signature error status: 400 → **401**
4. Log Out button: described as functional → **has no onClick handler**
5. create-order auth error: described as 401 → **returns 500**
6. createSubscription user plan update: unconditional → **only on new record creation**

## Features in doc that DON'T EXIST in the app
- The `Log Out` button is rendered without a click handler — clicking it does nothing.
- `Manage Plan`, `Update`, and invoice `Download` buttons are present in the UI but not wired to billing flows.
- Invoice dates render in en-IN locale as `1 Feb 2026` / `1 Jan 2026` / `1 Dec 2025`, not zero-padded `MMM DD, YYYY`.
- Saving preferences does not persist editor font size, and font-size state does not reload on refresh.
