# editor — Spec 031

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Editor Config Constants (Defined But Not All Wired)
- [x] `EDITOR_SHORTCUTS` defines `versionHistory: "Mod-Shift-h"` but no keyboard shortcut opens version history in either route
- [x] `EDITOR_FONTS` defines three font options: Serif (`var(--font-merriweather)`), Sans-serif (`var(--font-inter)`), and Monospace (`'JetBrains Mono'`) — none are exposed via a UI font picker
- [x] `TYPOGRAPHY` constants define `contentMaxWidth: "720px"`, `wideMaxWidth: "960px"`, `bodySize: "16px"`, `lineHeight: "1.75"`, `headingLineHeight: "1.3"`, `h1Size: "28px"`, `h2Size: "22px"`, `h3Size: "18px"`, `h4Size: "16px"`
#### Draft Mode Type System (Defined, Partially Wired)
- [x] `PrecisionEditAction` type defines 14 discrete edit actions: rephrase, shorten, expand, make_academic, active_voice, simplify, strengthen_claim, add_transition, split_paragraph, merge_paragraphs, reorder, add_citation, flag_unsupported, check_guidelines
- [x] `PRECISION_EDIT_LABELS` maps each action to a human label (e.g., `make_academic` → `"Make Academic"`, `active_voice` → `"Active Voice"`)
- [x] `ScholarRules` interface defines project-level AI configuration with fields: `document_type`, `target_journal`, `reporting_guideline`, `citation_style`, `dialect` (British_English/American_English), `voice`, `tense` (per section), `max_sentence_length`, `max_paragraph_length`, `avoid_terms`, `prefer_terms`, `custom_rules`, `ghost_text`
- [x] `ScholarRules.ghost_text` sub-interface includes `enabled`, `pause_delay_ms`, `max_length_sentences`, `citation_prompts` fields
- [x] `ScholarRules.voice` accepts `"first_person_plural"`, `"first_person_singular"`, `"third_person"`, or `"passive"`
- [x] `ScholarRules.tense` maps per-section tense preferences for: introduction, methods, results, discussion, case_presentation
- [x] `DraftContext` interface sends `intensity`, `documentType`, `currentSection`, `targetJournal`, `projectTitle`, `scholarRules`, `surroundingText` to the chat API
- [x] `PrecisionEditRequest` sends `action`, `selectedText`, `instruction`, `surroundingContext`, `documentType`, `targetJournal`, `scholarRules`
- [x] `PrecisionEditResponse` returns `originalText`, `suggestedText`, `explanation`, `action`
- [x] `SuggestionSeverity` type defines three levels: `"error"`, `"improvement"`, `"polish"`
- [x] `SuggestionCategory` type defines three categories: `"language"`, `"consistency"`, `"structure"`
#### Citation Node Overrides Structure
- [x] Citation node `overrides` attribute, when non-null, is a record keyed by `referenceId` with per-reference fields: `prefix`, `suffix`, `suppressAuthor`, `locator`, `locatorType`
- [x] Citation `locatorType` accepts: `"page"`, `"chapter"`, `"figure"`, `"table"`, `"section"`
- [x] Citation `overrides` are parsed from `data-overrides` HTML attribute via JSON.parse with null fallback on error
#### Citation Display Logic Details
- [x] `CitationStyleId` type defines exactly 7 styles: `"vancouver"`, `"apa"`, `"ama"`, `"icmje"`, `"harvard"`, `"chicago-author-date"`, `"ieee"`
- [x] Numeric citation styles (vancouver, ieee, ama, icmje) compress consecutive numbers into ranges: [1,2,3] → `"1-3"`, [1,2,4] → `"1,2,4"`, [1,2,3,5] → `"1-3,5"`
- [x] Author-year citation styles format as: 1 author → `"(Smith, 2020)"`, 2 authors → `"(Smith & Jones, 2021)"`, 3+ authors → `"(Smith et al., 2020)"`
- [x] Multiple author-year citations are separated by semicolons: `"(Smith, 2020; Jones, 2021)"`
- [x] Author-year citations with no resolved references display `"(?)"` as fallback
- [x] Numeric citations with no assigned numbers display `"[?]"` as fallback
- [x] Citation chip selected state adds `ring-2 ring-blue-400 dark:ring-blue-500 ring-offset-1`
- [x] Citation chip base colors: `bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800`
- [x] Citation chip has a `data-citation` HTML attribute
- [x] Citation popover container is `w-72` (288px) with `rounded-xl` corners
#### Citation Tooltip Details
- [x] Citation tooltip authors line uses `font-semibold` class
- [x] Citation tooltip title uses `text-gray-300 dark:text-gray-600 truncate max-w-[250px]` with single-line truncation
- [x] Citation tooltip journal uses `text-gray-400 dark:text-gray-500 italic`
- [x] Citation tooltip separator between entries uses `border-t border-gray-700 dark:border-gray-300 my-1`
- [x] Citation popover "View" button icon is `ArrowSquareOut` (size 10), "Remove" button icon is `Trash` (size 10), footer delete icon is `Trash` (size 12)
#### Bibliography Vancouver Fallback Formatting
- [x] Vancouver fallback takes the first 6 authors maximum; if >6, appends `", et al."`
- [x] Vancouver author initials are computed by splitting given name on `/\s+/`, taking first character of each part, uppercasing, and joining without spaces
- [x] Vancouver author format: `"Family Initials"` (e.g., `"Smith JA"`)

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Source verification covered `src/lib/editor/editor-config.ts`, `src/types/draft.ts`, `src/types/citation.ts`, `src/components/editor/extensions/citation-node.ts`, `src/components/editor/extensions/citation-node-view.tsx`, `src/components/editor/extensions/bibliography-view.tsx`, and `/editor/[id]` route wiring in `src/app/(app)/editor/[id]/page.tsx`.
  - Live browser verification on `/studio` confirmed the center toolbar still exposes no font picker UI despite `EDITOR_FONTS` and `FontFamily` support existing in source.
  - Focused tests passed in `src/lib/editor/__tests__/feature-ralph-editor.test.ts`, `src/components/editor/extensions/__tests__/citation-node.test.ts`, and `src/lib/editor/__tests__/sanitize-editor-content.test.ts`.
  - No product mismatch was found in spec 31; this was a source-and-verification audit only.
-->
