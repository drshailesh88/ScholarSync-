# Dashboard — Feature Doc Gaps

**Original doc:** `DASHBOARD_FEATURES_TESTING.md`
**Original checkbox count:** 131
**After Codex Pass 1:** 213
**After Claude Code Pass 2:** 278
**New checks added (Pass 2):** 65
**After Codex Verification Pass:** 278
**Hallucinations removed in verification:** 5

## Audit History

| Pass | Agent | Checks Added | Total | Focus |
|------|-------|-------------|-------|-------|
| Initial | Claude Code | 131 | 131 | Core feature inventory |
| Pass 1 | Codex | +82 | 213 | Detailed QA coverage |
| Pass 2 | Claude Code | +65 | 278 | Deep source read — icon sizes, edge cases, ThemeToggle, loading gaps, Sentry, query filters |
| Verification | Codex | +0 | 278 | Verified all 65 Pass 2 checks and removed 5 stale assertions from earlier sections |

## Verification Pass

- Verified every checkbox in `Re-Audit Discoveries (Claude Code Pass 2)`: 65 of 65 correct, 0 hallucinated, 0 partial.
- Confirmed all highlighted corrections: ThemeToggle segmented pill + SSR placeholder, zero-arg migration no-op, no migration deduplication, `Sentry.captureException(error)`, missing command-palette routes, incomplete loading skeleton, `w-64` sidebar, `backdrop-blur-sm`, and stat icon sizing.
- No additional high-signal source gaps remained after the verification sweep.
- Cleaned 5 stale assertions from earlier sections:
  - command palette lists all major features
  - no layout shift during loading
  - raw error details shown in UI
  - migration reads from `localStorage`
  - already-migrated documents are not re-migrated

## Pass 2 — Key Discoveries

### Major Findings
1. **ThemeToggle is a segmented pill** with "Daylight"/"Night" labeled buttons and SSR placeholder — NOT a simple icon toggle as previously described
2. **Loading skeleton is incomplete** — covers only 2 of 5 dashboard sections (action cards + manuscripts), missing stats/searches/activity
3. **ErrorDisplay reports to Sentry** via `Sentry.captureException(error)` — not documented previously
4. **Migration is a no-op on dashboard mount** — called with zero args, always early-returns 0
5. **Command palette omits 4 sidebar items** — Deep Research, LaTeX Editor, Journal Feed, Systematic Review are sidebar-only

### Behavior Corrections (Pass 2)
1. `migrateLocalDocuments()` is a server action that does NOT read localStorage — the dashboard calls it with no arguments, so it always returns 0
2. No deduplication in migration — calling with same documents twice creates duplicates (doc incorrectly stated "Already-migrated documents are not re-migrated")
3. Loading skeleton covers only action cards + manuscripts, so stats/searches/activity pop in after load
4. Header border class is `border-border-subtle` (lighter), not `border-border`

### Granular Additions
- Stats icon containers `w-9 h-9` with `size={18}` icons (different from action card icons)
- Project status defaults to "drafting" when null
- Soft-delete filters on projects and papers queries; NO soft-delete on searches/conversations
- Stats default values: `tokens_limit → 10000`, `plan → "free"`
- Sidebar: w-64 width, h-20 logo area, backdrop-blur-sm, nav onClick closes mobile, ClerkUserButton afterSignOutUrl="/"
- Command palette: cmdk library, top-[20%] position, "No results found." empty state, Navigation/Actions group headings
- Logo: SquaresFour icon, sky-to-indigo gradient, "ScholarSync" text
- Badge: rounded-full pill shape, unused `issues`/`popular` variants

## Features in doc that DON'T EXIST in the app
- Recent Searches rows are not clickable in the current implementation.
- Recent Activity rows are not clickable in the current implementation.
- The notification bell in the header does not currently open a notifications panel.
- The command-palette `New Project` action does not open a project-creation dialog; it routes to `/projects`.
