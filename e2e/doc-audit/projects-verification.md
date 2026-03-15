# Projects — Claude Code Pass 2 Verification Report

**Total assertions reviewed:** 66
**Verified Correct:** 66
**Hallucinated / Inaccurate:** 0
**Partially Correct:** 0
**Accuracy rate:** 100%

## Hallucinated / Inaccurate
- None.

## Partially Correct
- None.

## Codex Verification Pass Discoveries
- Archived projects can be restored by opening the Status Update modal on an archived project and selecting a non-archived status. There is no dedicated Restore button; the restore path is only exposed through the status modal.
- Inline status and action controls in both list and grid views call `e.stopPropagation()`, so using them does not trigger row/card navigation to `/studio/{id}`.
- Mutation failures are console-only. `create`, `archive`, `delete`, and `update status` log errors, but the UI shows no toast, inline alert, or modal-level error feedback.
- The projects page has no bulk-selection, bulk-archive, or bulk-delete controls anywhere in its import tree.
- The projects page has no sharing or collaboration controls anywhere in its import tree.
- Accessibility coverage is still weak: list row navigation is mouse-only because `DataTable` binds `onClick` to a `<tr>` with no keyboard semantics.
- Accessibility coverage is still weak: grid card navigation is mouse-only because the card root is a clickable `<div>` with no keyboard semantics.
- Accessibility coverage is still weak: grid icon-only action buttons, the modal close button, and the list/grid toggle buttons have no explicit accessible names; the toggle also exposes no `aria-pressed` state.
- Accessibility coverage is still weak: the search input and status filter have no explicit associated label in the rendered UI.
- The main checklist needed additional cleanup beyond Claude Pass 2: the original list-view hover wording implied row-level hover, but the `CaretDown` reveal is scoped to the status button group.
- The main checklist needed additional cleanup beyond Claude Pass 2: workflow coverage originally implied create stayed on `/projects`; the actual success path navigates to `/editor/new?project={id}`.
- The main checklist needed additional cleanup beyond Claude Pass 2: the checklist did not originally note that card heights are content-driven rather than fixed/equal-height.
