# projects — Spec 009

STATUS: PENDING
TESTED: 0/25
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/projects
MODULE: projects

---
### Quick Test Workflows
#### formatRelativeTime Details
- [ ] Returns `"{N}h ago"` for timestamps between 1–23 hours ago
- [ ] Returns `"{N}d ago"` for timestamps between 1–6 days ago
- [ ] Returns locale-formatted date (`en-IN`, short month + numeric day) for timestamps 7+ days old
#### Styling Details
- [ ] Active tab uses `bg-surface-raised text-ink border border-border-subtle`; inactive tab uses `text-ink-muted hover:text-ink hover:bg-surface-raised/50`
- [ ] Status pipeline selected option uses `border-brand bg-brand/5 text-ink`; unselected uses `border-border bg-surface-raised text-ink-muted hover:border-brand/40 hover:text-ink`
- [ ] Name column icon rendered at `size={18}` with `text-ink-muted shrink-0`
- [ ] Type column text uses `text-ink-muted text-xs` styling
- [ ] View toggle container has `border border-border rounded-lg overflow-hidden`
- [ ] Empty state `FolderOpen` icon wrapped in `w-16 h-16 rounded-2xl bg-surface-raised` container
- [ ] "Create Your First Project" empty-state button includes a `Plus` icon alongside the text
- [ ] Status modal project title in subtitle uses `font-medium text-ink` to distinguish it from surrounding muted text
#### Components Referenced But Not Rendered Directly
- [ ] `MagnifyingGlass` icon is not imported by `page.tsx` — it is rendered inside the `SearchInput` component
- [ ] `X` icon is not imported by `page.tsx` — it is rendered inside the `Modal` component
- [ ] `Tabs` component supports an optional `count` property per tab, but the projects page passes no counts — tabs show labels only, no per-tab badge numbers
- [ ] No API routes exist under `src/app/api/projects/` — all data access uses server actions from `src/lib/actions/projects.ts`
#### Codex Verification Pass Discoveries
- [ ] Archived projects can be restored by opening the Status Update modal and selecting a non-archived status
- [ ] There is no dedicated Restore button — unarchiving is only exposed through the Status Update modal
- [ ] No bulk selection, bulk archive, or bulk delete controls exist in the projects page or its imported components
- [ ] No project sharing or collaboration controls exist anywhere in the `/projects` page import tree
- [ ] List row navigation is mouse-only because `DataTable` binds `onClick` to a `<tr>` without keyboard focus semantics
- [ ] Grid card navigation is mouse-only because the card root is a clickable `<div>` with no keyboard focus semantics
- [ ] Grid card icon-only action buttons have no `title` or `aria-label` attributes
- [ ] View toggle buttons are icon-only and expose no `aria-label` or `aria-pressed` state
- [ ] Modal close button has no explicit accessible name (`aria-label` or `title`)
- [ ] Search input and status filter have no explicit associated label in the current UI
