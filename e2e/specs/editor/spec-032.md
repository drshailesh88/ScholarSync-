# editor — Spec 032

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Bibliography Vancouver Fallback Formatting
- [x] Vancouver title handling: appends `"."` only if title does not already end with one
- [x] Vancouver journal section format: `"Journal. Year;Volume(Issue):Pages."` with optional fields omitted
- [x] Vancouver DOI format: `"doi:10.xxxx/..."` (lowercase `doi:` prefix)
#### Document Template System
- [x] `generateTemplateContent()` creates initial Tiptap JSON when DB content is null
- [x] `DOCUMENT_TEMPLATES` defines 4 templates: `"original-article"`, `"case-report"`, `"review-article"`, `"meta-analysis"`
- [x] Original Article template sections: Introduction, Methods (→ Study Design, Participants, Outcomes, Statistical Analysis), Results (→ Primary Outcome, Secondary Outcomes), Discussion, Conclusion, References
- [x] Case Report template sections: Introduction, Case Presentation (→ History, Examination, Investigations, Treatment, Outcome), Discussion, Conclusion, References
- [x] Review Article template sections: Introduction, Search Strategy, Findings, Discussion, Conclusion, References
- [x] Meta-Analysis template sections: Introduction, Methods (→ Search Strategy, Study Selection, Data Extraction, Statistical Analysis), Results, Discussion, Conclusion, References
- [x] Template subsections (e.g., Study Design under Methods) render as H3 headings; main sections render as H2
- [x] `buildPlaceholderMap()` returns a mapping of lowercased heading text to placeholder strings for each template
#### Document Outline Details
- [x] Document outline container is positioned `fixed right-6 top-1/4 z-30` (not z-50 like other overlays)
- [x] Outline collapsed toggle button is a `w-9 h-9` rounded-lg button with `List` icon size 18
- [x] Outline panel width is `w-64` (256px) with `max-h-[50vh]` and overflow scroll
- [x] Outline panel entrance animation: `animate-in fade-in slide-in-from-right-2 duration-200`
- [x] Outline panel uses `bg-white/95 dark:bg-surface/95 backdrop-blur-sm` for translucent background
- [x] Outline heading indentation: H1 → 0px, H2 → 0px, H3 → 12px, H4 → 24px (padding-left inline style)
- [x] Outline empty heading text displays `"(empty)"` instead of the heading text
- [x] Outline word count per heading displays as `"{count}w"` (lowercase w suffix) on hover
- [x] Outline footer text reads `"Total: {wordCount} words"`
- [x] Outline expected IMRAD sections list: `"Introduction"`, `"Methods"`, `"Results"`, `"Discussion"`, `"Conclusion"`, `"References"` — checked via H2 text content matching
- [x] Missing IMRAD sections display `"(missing)"` suffix with `WarningCircle` icon (size 12) in amber color
- [x] Outline auto-expands on `onMouseEnter` and collapses on `onMouseLeave` (hover-driven)
#### Footnote View Details
- [x] Footnote tooltip appears on hover after a 300ms delay (not 400ms like citation tooltips)
- [x] Footnote tooltip container is `w-64` (256px) wide with `z-50` positioning
- [x] Footnote tooltip textarea has exactly `rows={3}`
- [x] Footnote tooltip textarea saves text changes on `onBlur` event, not on every keystroke
- [x] Footnote delete button in tooltip is a plain text `"✕"` (Unicode multiplication sign), not a Phosphor icon
- [x] Footnote superscript marker uses `text-brand cursor-help font-semibold hover:underline` styling
- [x] FootnoteSection sorts footnotes by `number` property ascending before rendering the list
- [x] FootnoteSection heading text is `"Footnotes"` (uppercase F) with `uppercase tracking-wider` CSS
- [x] FootnoteSection each row displays the footnote number followed by a period: `"{number}."`
#### Research Store Persistence and Defaults
- [x] Research store persists to `sessionStorage` (not localStorage) under key `"scholar-sync-research"`
- [x] Research store sidebar default width is `380` pixels, clamped between `320` and `520`
- [x] Research store default `activeTab` is `"search"` (from three options: search, library, chat)

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Source verification covered bibliography fallback formatting in `src/components/editor/extensions/bibliography-view.tsx`, template generation in `src/lib/editor/section-templates.ts`, editor-route template fallback in `src/app/(app)/editor/[id]/page.tsx`, outline behavior in `src/components/editor/DocumentOutline.tsx`, footnote rendering in `src/components/editor/extensions/footnote-view.tsx` and `src/components/editor/FootnoteSection.tsx`, and research-store persistence/defaults in `src/stores/research-store.ts`.
  - Focused tests passed in `src/lib/editor/__tests__/section-templates.test.ts` and `src/lib/editor/__tests__/studio-hardening.test.ts`.
  - No product mismatch was found in spec 32; this was a source-and-verification audit only.
-->
