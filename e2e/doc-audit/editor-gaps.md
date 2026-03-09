# Editor — Feature Doc Gaps

**Original doc:** `EDITOR_FEATURES_TESTING.md`
**Original checkbox count:** 231
**After Codex Pass 1:** 389
**After Codex Pass 2:** 989
**After Claude Code Pass 3:** 1203
**New checks added in Pass 3:** 214

## Pass 3 Coverage Areas Added
- Studio page architecture (Suspense wrapper, CSS dimensions, component wiring)
- Studio chat internals (message IDs, submitAiPrompt mechanism, streaming details, conversation modes)
- Studio integrity panel wiring (text truncation, sources prop, API endpoint)
- Studio export internals (HTML extraction, file download mechanism)
- TiptapEditor vs AcademicEditor differences (CSS classes, heading levels, padding, prose styles)
- Editor config constants (EDITOR_SHORTCUTS, EDITOR_FONTS, TYPOGRAPHY — defined but not all wired)
- Draft mode type system (PrecisionEditAction, ScholarRules, DraftContext, SuggestionSeverity)
- Citation node overrides structure (prefix, suffix, suppressAuthor, locator, locatorType)
- Citation display logic (7 style IDs, number range compression, author-year formatting rules)
- Bibliography Vancouver fallback formatting (author limits, initials, DOI format)
- Document template system (4 templates with exact section hierarchies)
- Document outline details (z-index, indentation values, IMRAD checking, animations)
- Footnote view details (tooltip delay, textarea rows, Unicode delete button)
- Research store persistence (sessionStorage, sidebar width clamping, defaults)
- ResearchSidebar UI details (tooltips, badge cap, resize handle)
- Offline queue and save retry details (storage key, deduplication, jitter, attempt count)
- Word counter internals (section key format, counting logic)
- SaveStatus type mismatches across store vs hooks
- Export API route internals (validation limits, fonts, page sizes, margins, rate limiting)
- tiptap-to-docx converter details (footnote heading, image rendering, task item characters)
- Chat API route details (message limit, rate limiting, prompt selection logic)
- Reference type system (9 types vs 8 in UI, unsurfaced optional fields)
- Guide types additional details (unused GuideContext fields, reporting guidelines gaps)
- Slash command shortcut label vs actual shortcut mismatches
- TopBar implementation details (refresh interval, title attributes, event types)
- Citation dialog identifier detection (DOI/PMID patterns, error messages)
- Pending citation notice timing differences (5s editor vs 2.5s studio)
- Comment sidebar input placeholder correction
- 4 behavior corrections from Pass 1/2

## Behavior Corrections Found in Pass 3
1. Bottom new-comment input placeholder is `"Add a comment..."` not `"Add a general comment about this document..."`
2. Studio saving indicator uses spinning CircleNotch, not pulsing cloud icon
3. Studio idle save state uses Check icon, not CloudCheck
4. Slash menu heading shortcut badges show Cmd+Opt+N but actual shortcuts are Cmd+Shift+N

## Components Referenced But Not Rendered
- `toolbar.tsx` — not imported by either route
- `template-picker.tsx` — not imported by either route
- `EDITOR_SHORTCUTS`, `EDITOR_FONTS`, `TYPOGRAPHY` from `editor-config.ts` — not imported by editors
- `DiffView.tsx` — not imported by IntegrityPanel
