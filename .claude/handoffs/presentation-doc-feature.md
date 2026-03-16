# Handoff: /doc-feature presentation

## Status
Phase 2 complete (extraction + gap analysis). Phase 3 (write doc) not started.

## Files ready to use

- **Extraction (user-facing):** `e2e/extracted/presentation/user-facing.json` — 2,303 patterns from 74 files
- **Import tree:** `e2e/extracted/presentation/import-tree.json` — 91 files reachable from 3 route entry points
- **Existing doc:** `PRESENTATION_FEATURES_TESTING.md` — 438 checkboxes (394 original + 44 Codex audit)
- **Command spec:** `.claude/commands/doc-feature.md` — the workflow to follow

## Entry points (from extract-features.cjs MODULE_MAP)

```
presentation/page.tsx        — list page
presentation/new/page.tsx    — blank + AI wizard
presentation/[deckId]/page.tsx — deck editor
```

## Gap analysis (what to add)

The existing doc is well-structured with 25 sections. The Codex audit (lines 666-879) already added detailed QA for the main flows. The gap is in **per-component behavioral details** that the extraction reveals but the doc doesn't cover:

### Priority 1 — High-pattern components barely documented

| Component | Patterns | Current doc coverage |
|---|---:|---|
| `slide-renderer.tsx` | 191 | Section 8 lists 18 layout names but not HOW each renders (which regions, which conditionals, which blocks go where) |
| `content-block-editor.tsx` | 175 | Section 9 lists 22 block types but not the inline editing UI (handlers, placeholders, disabled states per block type) |
| `custom-theme-builder.tsx` | 86 | Not in doc at all — custom theme creation flow with color pickers, font selectors, save/cancel |
| `social-export-modal.tsx` | 61 | Line 876 says "not reachable" but component IS in import tree — needs its own section |
| `social-slide-renderer.tsx` | 28 | Not in doc — renders slides in social media aspect ratios |

### Priority 2 — Partially covered, details missing

| Component | Patterns | What's missing |
|---|---:|---|
| `generation-wizard.tsx` | 152 | Codex covered most of this well (lines 707-763). Missing: all 23 useState defaults, error boundary behaviors |
| `presenter-mode.tsx` | 104 | Section 19 covers basics. Missing: animation sequencing, morph transitions, timer implementation, screen overlay logic |
| `defense-prep-panel.tsx` | 89 | Section 13 covers basics. Missing: state machine (config→active→summary), message formatting, evaluation display |
| `reference-import-panel.tsx` | 111 | Not documented — search/select references, format preview, author truncation |
| `source-selector.tsx` | 90 | Partially covered in step 0. Missing: per-source validation logic, deep research numeric input, URL fetch flow details |
| `chart-block.tsx` | 101 | Listed as "chart" in block types. Missing: 70 sub-components for different chart renderers |
| `infographic-block.tsx` | 95 | Listed as "infographic" in block types. Missing: 56 ternaries for variant rendering |

### Priority 3 — Well covered, minor gaps

| Component | Notes |
|---|---|
| `agent-panel.tsx` | Codex covered well. Minor: exact quick action button labels from extraction |
| `coach-panel.tsx` | Codex covered well. Minor: disabled state when 0 slides |
| `comments-panel.tsx` + `comment-thread.tsx` | Codex covered. Minor: reply threading details |
| `share-panel.tsx` | Codex covered. Minor: expiration date min value logic |
| `version-history-panel.tsx` | Codex covered. Minor: compare cap at 2 versions |
| `analytics-panel.tsx` | Codex covered. Minor: 26 sub-components for charts |

## Instructions for next session

1. Read `e2e/extracted/presentation/user-facing.json` (2,303 items)
2. Read `PRESENTATION_FEATURES_TESTING.md` (existing 438 checks)
3. For each Priority 1 component above:
   - Filter `user-facing.json` for that file
   - Write a new section or expand the existing section with checkboxes
   - Every checkbox must cite `file:line` from the extraction JSON
   - Do NOT read source files directly — only use extraction data
4. For each Priority 2 component:
   - Filter extraction for that file
   - Add missing details to existing sections
5. After all edits, count checkboxes: `grep -c '^\- \[ \]' PRESENTATION_FEATURES_TESTING.md`
6. Run `node e2e/pipeline/build-specs.cjs presentation` to generate spec files
7. Report manifest

## Extractor changes made this session

- Fixed MODULE_MAP for `poster` (was `poster/page.tsx`, now `poster/new/page.tsx` + `poster/[posterId]/page.tsx`)
- Fixed MODULE_MAP for `slides-ai` (was `slides/ai/page.tsx`, now `slides/new/page.tsx` + `slides/[deckId]/page.tsx`)
- Fixed MODULE_MAP for `presentation` (added `new/page.tsx` + `[deckId]/page.tsx`)
- Added user-facing filter: outputs `user-facing.json` alongside `raw-extraction.json`
- User-facing types: string, handler, component, ternary, conditional, state, list_render, link, placeholder, disabled, api_call, error_handler
- Noise filtered: config_string, if_statement, function_decl, type_decl, console_call, throw, async_call, hook, effect, timer, jsx_expression

## What NOT to do

- Do NOT add items to the doc that aren't in `user-facing.json`
- Do NOT read source code to "fill gaps" — the extractor already did that
- Do NOT document components that aren't in `import-tree.json`
- Do NOT rewrite existing Codex-audited sections — only add to them
- Do NOT touch the "Actual Current Behavior Corrections" section — that's verified
