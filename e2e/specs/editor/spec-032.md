# editor — Spec 032

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Bibliography Vancouver Fallback Formatting
- [ ] Vancouver title handling: appends `"."` only if title does not already end with one
- [ ] Vancouver journal section format: `"Journal. Year;Volume(Issue):Pages."` with optional fields omitted
- [ ] Vancouver DOI format: `"doi:10.xxxx/..."` (lowercase `doi:` prefix)
#### Document Template System
- [ ] `generateTemplateContent()` creates initial Tiptap JSON when DB content is null
- [ ] `DOCUMENT_TEMPLATES` defines 4 templates: `"original-article"`, `"case-report"`, `"review-article"`, `"meta-analysis"`
- [ ] Original Article template sections: Introduction, Methods (→ Study Design, Participants, Outcomes, Statistical Analysis), Results (→ Primary Outcome, Secondary Outcomes), Discussion, Conclusion, References
- [ ] Case Report template sections: Introduction, Case Presentation (→ History, Examination, Investigations, Treatment, Outcome), Discussion, Conclusion, References
- [ ] Review Article template sections: Introduction, Search Strategy, Findings, Discussion, Conclusion, References
- [ ] Meta-Analysis template sections: Introduction, Methods (→ Search Strategy, Study Selection, Data Extraction, Statistical Analysis), Results, Discussion, Conclusion, References
- [ ] Template subsections (e.g., Study Design under Methods) render as H3 headings; main sections render as H2
- [ ] `buildPlaceholderMap()` returns a mapping of lowercased heading text to placeholder strings for each template
#### Document Outline Details
- [ ] Document outline container is positioned `fixed right-6 top-1/4 z-30` (not z-50 like other overlays)
- [ ] Outline collapsed toggle button is a `w-9 h-9` rounded-lg button with `List` icon size 18
- [ ] Outline panel width is `w-64` (256px) with `max-h-[50vh]` and overflow scroll
- [ ] Outline panel entrance animation: `animate-in fade-in slide-in-from-right-2 duration-200`
- [ ] Outline panel uses `bg-white/95 dark:bg-surface/95 backdrop-blur-sm` for translucent background
- [ ] Outline heading indentation: H1 → 0px, H2 → 0px, H3 → 12px, H4 → 24px (padding-left inline style)
- [ ] Outline empty heading text displays `"(empty)"` instead of the heading text
- [ ] Outline word count per heading displays as `"{count}w"` (lowercase w suffix) on hover
- [ ] Outline footer text reads `"Total: {wordCount} words"`
- [ ] Outline expected IMRAD sections list: `"Introduction"`, `"Methods"`, `"Results"`, `"Discussion"`, `"Conclusion"`, `"References"` — checked via H2 text content matching
- [ ] Missing IMRAD sections display `"(missing)"` suffix with `WarningCircle` icon (size 12) in amber color
- [ ] Outline auto-expands on `onMouseEnter` and collapses on `onMouseLeave` (hover-driven)
#### Footnote View Details
- [ ] Footnote tooltip appears on hover after a 300ms delay (not 400ms like citation tooltips)
- [ ] Footnote tooltip container is `w-64` (256px) wide with `z-50` positioning
- [ ] Footnote tooltip textarea has exactly `rows={3}`
- [ ] Footnote tooltip textarea saves text changes on `onBlur` event, not on every keystroke
- [ ] Footnote delete button in tooltip is a plain text `"✕"` (Unicode multiplication sign), not a Phosphor icon
- [ ] Footnote superscript marker uses `text-brand cursor-help font-semibold hover:underline` styling
- [ ] FootnoteSection sorts footnotes by `number` property ascending before rendering the list
- [ ] FootnoteSection heading text is `"Footnotes"` (uppercase F) with `uppercase tracking-wider` CSS
- [ ] FootnoteSection each row displays the footnote number followed by a period: `"{number}."`
#### Research Store Persistence and Defaults
- [ ] Research store persists to `sessionStorage` (not localStorage) under key `"scholar-sync-research"`
- [ ] Research store sidebar default width is `380` pixels, clamped between `320` and `520`
- [ ] Research store default `activeTab` is `"search"` (from three options: search, library, chat)
