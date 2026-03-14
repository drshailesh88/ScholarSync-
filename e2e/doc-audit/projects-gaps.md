# Projects — Feature Doc Gaps

**Original doc:** `PROJECTS_FEATURES_TESTING.md`
**Original checkbox count:** 145
**After Codex pass 1:** 233 checks
**After Claude Code pass 2:** 293 checks
**After Codex verification re-audit:** 305 checks
**Claude Code pass 2 verification:** 66 / 66 assertions correct
**Additional coverage added in Codex re-audit:** 12 checks
**Hallucinations corrected/removed in Codex re-audit:** 15

## New Coverage Added In Codex Re-Audit
- [ ] Archived projects can be restored by opening the Status Update modal and selecting a non-archived status
- [ ] There is no dedicated Restore button; unarchiving is only exposed through the Status Update modal
- [ ] Inline status and action controls call `stopPropagation()` so they do not trigger row/card navigation
- [ ] Mutation failures only log to the console; the UI shows no toast, inline alert, or modal-level error state
- [ ] No bulk selection, bulk archive, or bulk delete controls exist in the projects page or its import tree
- [ ] No project sharing or collaboration controls exist anywhere in the `/projects` page import tree
- [ ] List row navigation is mouse-only because `DataTable` attaches `onClick` to a `<tr>` with no keyboard semantics
- [ ] Grid card navigation is mouse-only because the card root is a clickable `<div>` with no keyboard semantics
- [ ] Grid icon-only action buttons have no `title` or `aria-label`
- [ ] View toggle buttons are icon-only and expose no `aria-label` or `aria-pressed`
- [ ] Modal close button has no explicit accessible name (`aria-label` or `title`)
- [ ] Search input and status filter have no explicit associated label in the current UI

## Hallucinations Corrected From The Checklist
- The list view does not always show all three action buttons; archived projects hide the Archive action.
- The `CaretDown` reveal is scoped to the status button group, not the entire table row.
- The table is wrapped in horizontal overflow; there is no dedicated vertical table scroller.
- The grid card top bar is fixed `bg-brand`, not data-driven by type or status.
- Grid footer wording is singular/plural aware (`paper/papers`, `doc/docs`), not a fixed `papers/docs` string.
- Card layout is structurally consistent, but card height is still content-driven rather than explicitly equal-height.
- Create-modal validation is implemented through button disable/handler guards, not a native `required` validation flow.
- Enter submission only works from the Project Name input; the modal is not a `<form>`.
- Successful create navigates to `/editor/new?project={id}`; the user does not stay on `/projects`.
- Failed create keeps the modal open and logs an error; the old checklist implied list refresh/visibility behavior instead.
- The `"Updating..."` label is not user-visible because the status modal closes before the batched re-render.
- Loading coverage needed to be split between route-level `loading.tsx` skeleton UI and the page component's client fetch spinner.
- A caught `getProjects()` failure falls through to the zero-state; it does not render the route-level error boundary.
- `getProject` takes a numeric id and returns `null` when ownership/deletion checks fail.
- The documented `Project` interface needed correction for `id`, nullable fields, and `updated_at: Date | null`.
