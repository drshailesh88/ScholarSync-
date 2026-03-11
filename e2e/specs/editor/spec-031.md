# editor — Spec 031

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Editor Config Constants (Defined But Not All Wired)
- [ ] `EDITOR_SHORTCUTS` defines `versionHistory: "Mod-Shift-h"` but no keyboard shortcut opens version history in either route
- [ ] `EDITOR_FONTS` defines three font options: Serif (`var(--font-merriweather)`), Sans-serif (`var(--font-inter)`), and Monospace (`'JetBrains Mono'`) — none are exposed via a UI font picker
- [ ] `TYPOGRAPHY` constants define `contentMaxWidth: "720px"`, `wideMaxWidth: "960px"`, `bodySize: "16px"`, `lineHeight: "1.75"`, `headingLineHeight: "1.3"`, `h1Size: "28px"`, `h2Size: "22px"`, `h3Size: "18px"`, `h4Size: "16px"`
#### Draft Mode Type System (Defined, Partially Wired)
- [ ] `PrecisionEditAction` type defines 14 discrete edit actions: rephrase, shorten, expand, make_academic, active_voice, simplify, strengthen_claim, add_transition, split_paragraph, merge_paragraphs, reorder, add_citation, flag_unsupported, check_guidelines
- [ ] `PRECISION_EDIT_LABELS` maps each action to a human label (e.g., `make_academic` → `"Make Academic"`, `active_voice` → `"Active Voice"`)
- [ ] `ScholarRules` interface defines project-level AI configuration with fields: `document_type`, `target_journal`, `reporting_guideline`, `citation_style`, `dialect` (British_English/American_English), `voice`, `tense` (per section), `max_sentence_length`, `max_paragraph_length`, `avoid_terms`, `prefer_terms`, `custom_rules`, `ghost_text`
- [ ] `ScholarRules.ghost_text` sub-interface includes `enabled`, `pause_delay_ms`, `max_length_sentences`, `citation_prompts` fields
- [ ] `ScholarRules.voice` accepts `"first_person_plural"`, `"first_person_singular"`, `"third_person"`, or `"passive"`
- [ ] `ScholarRules.tense` maps per-section tense preferences for: introduction, methods, results, discussion, case_presentation
- [ ] `DraftContext` interface sends `intensity`, `documentType`, `currentSection`, `targetJournal`, `projectTitle`, `scholarRules`, `surroundingText` to the chat API
- [ ] `PrecisionEditRequest` sends `action`, `selectedText`, `instruction`, `surroundingContext`, `documentType`, `targetJournal`, `scholarRules`
- [ ] `PrecisionEditResponse` returns `originalText`, `suggestedText`, `explanation`, `action`
- [ ] `SuggestionSeverity` type defines three levels: `"error"`, `"improvement"`, `"polish"`
- [ ] `SuggestionCategory` type defines three categories: `"language"`, `"consistency"`, `"structure"`
#### Citation Node Overrides Structure
- [ ] Citation node `overrides` attribute, when non-null, is a record keyed by `referenceId` with per-reference fields: `prefix`, `suffix`, `suppressAuthor`, `locator`, `locatorType`
- [ ] Citation `locatorType` accepts: `"page"`, `"chapter"`, `"figure"`, `"table"`, `"section"`
- [ ] Citation `overrides` are parsed from `data-overrides` HTML attribute via JSON.parse with null fallback on error
#### Citation Display Logic Details
- [ ] `CitationStyleId` type defines exactly 7 styles: `"vancouver"`, `"apa"`, `"ama"`, `"icmje"`, `"harvard"`, `"chicago-author-date"`, `"ieee"`
- [ ] Numeric citation styles (vancouver, ieee, ama, icmje) compress consecutive numbers into ranges: [1,2,3] → `"1-3"`, [1,2,4] → `"1,2,4"`, [1,2,3,5] → `"1-3,5"`
- [ ] Author-year citation styles format as: 1 author → `"(Smith, 2020)"`, 2 authors → `"(Smith & Jones, 2021)"`, 3+ authors → `"(Smith et al., 2020)"`
- [ ] Multiple author-year citations are separated by semicolons: `"(Smith, 2020; Jones, 2021)"`
- [ ] Author-year citations with no resolved references display `"(?)"` as fallback
- [ ] Numeric citations with no assigned numbers display `"[?]"` as fallback
- [ ] Citation chip selected state adds `ring-2 ring-blue-400 dark:ring-blue-500 ring-offset-1`
- [ ] Citation chip base colors: `bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800`
- [ ] Citation chip has a `data-citation` HTML attribute
- [ ] Citation popover container is `w-72` (288px) with `rounded-xl` corners
#### Citation Tooltip Details
- [ ] Citation tooltip authors line uses `font-semibold` class
- [ ] Citation tooltip title uses `text-gray-300 dark:text-gray-600 truncate max-w-[250px]` with single-line truncation
- [ ] Citation tooltip journal uses `text-gray-400 dark:text-gray-500 italic`
- [ ] Citation tooltip separator between entries uses `border-t border-gray-700 dark:border-gray-300 my-1`
- [ ] Citation popover "View" button icon is `ArrowSquareOut` (size 10), "Remove" button icon is `Trash` (size 10), footer delete icon is `Trash` (size 12)
#### Bibliography Vancouver Fallback Formatting
- [ ] Vancouver fallback takes the first 6 authors maximum; if >6, appends `", et al."`
- [ ] Vancouver author initials are computed by splitting given name on `/\s+/`, taking first character of each part, uppercasing, and joining without spaces
- [ ] Vancouver author format: `"Family Initials"` (e.g., `"Smith JA"`)
