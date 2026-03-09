# Editor — Feature Doc Gaps

**Original doc:** `EDITOR_FEATURES_TESTING.md`
**Original checkbox count:** 231
**Features found in UI:** 389
**Features found in source code:** 989
**Missing from doc:** 758
**Completeness of original doc:** 23.4%

## Missing Features

### Pass 2 Coverage Areas Added
- [ ] Route shell audit now includes exact route-level loading/error files, store defaults, and editor/store initial state values
- [ ] Persistence coverage now includes DB-vs-local fallback, offline queue behavior, retry backoff settings, autosave timing, and retry payload quirks
- [ ] AcademicEditor coverage now includes exact placeholder strings, toolbar visibility rules, selection-preserving mouse handling, and link-prompt behavior
- [ ] Slash command coverage now includes every command label, description, shortcut badge, insertion payload, and AI/tool dispatch branch
- [ ] Extension coverage now includes exact footnote numbering rules, citation numbering rules, bibliography empty states, and explicit absence of math/track-changes extensions
- [ ] CitationDialog coverage now includes every tab default, placeholder, loading state, identifier-detection branch, manual-entry field, and selected-pill behavior
- [ ] ReferenceSidebar coverage now includes exact sort options, filter placeholder, cited/uncited grouping, DOI/PMID detail rendering, and removal confirmation flow
- [ ] CommentSidebar coverage now includes local-storage thread ordering, reply ordering, owner-only delete visibility, inline-comment submission, and quoted-text scroll-back behavior
- [ ] Version-history coverage now includes prompt/confirm strings, auto-save-before-restore behavior, preview rendering mode, and auto/manual badge rules
- [ ] Studio coverage now includes mode-toggle defaults, project-selector behavior, intensity labels/descriptions, guide-stage visibility rules, and right-panel replacement order
- [ ] Studio chat coverage now includes conversation bootstrap, request-body branches, prompt-construction branches, stream handling, API error strings, and action-specific custom-event prompts
- [ ] Studio export coverage now includes current request shapes, empty-content early returns, console-only failures, and the current page/backend mismatch around PDF/Word handling

## Features in doc that DON'T EXIST in the app
- The current app tree does not have a dedicated `/editor/new` route file; the live editor routes are `/editor/[id]` and `/studio`.
- The editor header `DotsThree` overflow button is present visually but does not open a menu or trigger any action.
- Studio export does not use the editor-page `ExportDialog`; it is a simple dropdown with PDF and Word actions.
- Version-history preview does not render historical rich text; it shows raw JSON in a `<pre>` block.
- Studio export does not currently close on outside click because no backdrop or document-level close handler is wired in the page component.
- The current editor stack does not register a math node/mark extension.
- The current editor stack does not register track changes or suggesting mode.
- The current `ReferenceSidebar` UI does not expose any citation-style switching control.
- `/editor/[id]` does not have a route-level `loading.tsx`; only the route-level error file exists.
