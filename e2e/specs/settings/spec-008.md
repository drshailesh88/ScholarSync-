# settings — Spec 008

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/settings
MODULE: settings

---
### Quick Test Workflow
#### Save Flow — Message Clearing (page.tsx:147, 184)
- [ ] `handleSaveProfile` clears `saveMessage` to null before starting the save request, removing any prior success/error feedback
- [ ] `handleSavePreferences` clears `prefsSaveMessage` to null before starting the preferences save request
- [ ] Profile save failure logs `Failed to save profile:` with the error to `console.error` (page.tsx:174)
- [ ] Preferences save failure logs `Failed to save preferences:` with the error to `console.error` (page.tsx:204)
- [ ] Both profile and preferences saves call the same `updateUserProfile` server action with different field subsets
#### Plan Fallback (page.tsx:234)
- [ ] When `user.plan` is null or undefined, `displayPlan` defaults to `"free"` — plan-derived UI falls back to free-tier pricing and plagiarism limits, while token quota and usage totals still come from `usageStats`
#### Sidebar Tab Hover (page.tsx:261)
- [ ] Inactive sidebar tab buttons show `hover:bg-surface-raised/50` translucent background on hover
- [ ] Inactive sidebar tab buttons transition text from `text-ink-muted` to `text-ink` on hover
#### Account vs Preferences Label Styling (page.tsx:301, 551, 556)
- [ ] Account tab form labels use `text-xs font-medium text-ink-muted mb-1.5` styling (12px, muted)
- [ ] Preferences tab section labels use `text-sm font-medium text-ink` styling (14px, full ink color)
#### Research Interest Chip Styling (page.tsx:354)
- [ ] Research interest chips use `bg-brand/10 text-brand` color scheme (brand-tinted background with brand text)
- [ ] Plus button for adding interests has explicit `type="button"` attribute to prevent form submission
- [ ] Chip remove (X) buttons have explicit `type="button"` attribute to prevent form submission
#### Save Button Disabled Styling (page.tsx:409)
- [ ] Save Changes button renders with `disabled:opacity-50` when `saving` is true
- [ ] Save Changes button uses `rounded-xl` border radius (not `rounded-lg`)
- [ ] Save Preferences button uses identical `disabled:opacity-50` and `rounded-xl` styling (page.tsx:607)
#### Content Pane Layout (page.tsx:277, 280)
- [ ] Content pane uses `overflow-y-auto` allowing vertical scroll when tab content exceeds viewport height
- [ ] Each tab content area is constrained to `max-w-2xl` (672px maximum width)
#### Usage Summary Number Formatting (page.tsx:521–537)
- [ ] Tokens Used summary card formats both value and limit with `toLocaleString("en-IN")` (Indian English locale)
- [ ] Searches summary card displays the raw `searchesUsed` number without any locale formatting
- [ ] Plagiarism Checks summary card displays the raw `plagiarismChecks` number without any locale formatting
- [ ] Exports summary card displays the raw `usageStats?.exports_used ?? 0` number without any locale formatting
- [ ] Plagiarism limit in summary helper text (`of {plagiarismLimit}`) is a raw number without `toLocaleString`
#### ProgressBar Component (progress-bar.tsx:29–30)
- [ ] ProgressBar formats values with `value.toLocaleString()` using browser default locale (no explicit locale argument)
- [ ] ProgressBar formats max with `max.toLocaleString()` using browser default locale (no explicit locale argument)
- [ ] ProgressBar fill bar uses `transition-all duration-500` for a 500ms animated transition
- [ ] When `max` is exactly 0, ProgressBar fill percentage is 0% (guarded by `max > 0` check)
#### ThemeToggle SSR Placeholder (theme-toggle.tsx:16–17)
- [ ] ThemeToggle SSR placeholder has exact dimensions `h-9 w-[156px]` (36px height × 156px width)
- [ ] ThemeToggle uses `useSyncExternalStore` with a server snapshot of `false` to detect client mount
- [ ] Inactive theme buttons have `hover:text-ink` hover transition to full ink color
#### DataTable Component (data-table.tsx:31, 43–45)
- [ ] DataTable header cells use `text-left` alignment
- [ ] DataTable rows without an `onRowClick` prop do not receive `cursor-pointer` or hover styling
- [ ] DataTable `Description` column renders via the default `String(item[col.key] ?? "")` path (no custom render function)
#### ErrorDisplay Component (error-display.tsx:35, 44)
- [ ] ErrorDisplay retry button label text is `Try Again` (not "Retry")
- [ ] ErrorDisplay `WarningCircle` icon sits inside a `w-16 h-16 rounded-2xl bg-red-500/10` container (not bare icon)
