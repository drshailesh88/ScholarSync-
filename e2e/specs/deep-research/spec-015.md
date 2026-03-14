# deep-research — Spec 015

STATUS: PARTIAL
TESTED: 35/35
PASS: 26
FAIL: 9
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Quick Test Workflows
#### Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)
- [ ] FAIL: Route appends `## References` with a numbered citation list to the markdown before Tiptap conversion.
- [x] PASS: Route builds `SourceReference[]` (with `doi`, `pmid`, `title`) from sources and passes to `markdownToTiptap()` for citation hyperlink mapping.
- [ ] FAIL: Route computes `word_count` from the plain text markdown and stores it on the section record.
- [ ] FAIL: If the authenticated user does not exist in the DB, the route inserts a placeholder user with `email: "{userId}@dev.local"` and `full_name: "Dev User"`; the comment describes a dev-mode fallback, but the code is not environment-gated.
- [ ] FAIL: Unexpected errors return `500 { "error": "Failed to create studio document" }`.
- [ ] FAIL: Auth failure returns `401 { "error": "Not authenticated" }`.
#### Evidence Badge Labels (`src/components/deep-research/CitationReference.tsx`, `CitationsPanel.tsx`)
- [x] PASS: `EVIDENCE_BADGE_STYLES` in CitationReference.tsx renders evidence labels as capitalized: `"High"`, `"Moderate"`, `"Low"`, `"Unknown"`.
- [x] PASS: CitationsPanel.tsx renders evidence labels via `level.charAt(0).toUpperCase() + level.slice(1)` — also capitalized.
- [ ] FAIL: EvidenceBadge tooltip text is `"{Label} evidence — {designLabel}"` or `"{Label} evidence"` (no design label).
#### Citations Panel Initialization (`src/components/deep-research/ResearchDocument.tsx`)
- [x] PASS: `citationsPanelOpen` is initialized to `true` — the citations panel starts open by default.
- [x] PASS: Desktop TOC component (`TableOfContents`) returns `null` when `items.length === 0`, but the mobile floating TOC button still renders.
#### Mobile Citations Handle Bar (`src/components/deep-research/CitationsPanel.tsx`)
- [ ] FAIL: The handle bar element (`<div className="w-10 h-1 bg-gray-300 ...">`) is purely decorative — there are no drag event handlers, touch listeners, or swipe-to-dismiss behavior attached to it.
#### Export Button UI Details (`src/components/deep-research/ExportButtons.tsx`)
- [ ] FAIL: Export button text labels use `.hidden sm:inline` — on mobile (below `sm` breakpoint) only icons are visible, no text.
- [x] PASS: Buttons render in this order: `.md` → `PDF` → `Copy` → vertical divider → `Open in Studio` → vertical divider → `.bib` → `.ris`.
- [x] PASS: Markdown button `title` attribute: `"Download as Markdown"`.
- [x] PASS: Copy button `title` attribute: `"Copies formatted text — paste into Google Docs, Word, or any editor with formatting preserved"`.
- [x] PASS: BibTeX button `title` attribute: `"Download references as BibTeX"`.
- [x] PASS: RIS button `title` attribute: `"Download references as RIS (EndNote/Mendeley)"`.
#### Export Format Details (`src/components/deep-research/ExportButtons.tsx`)
- [x] PASS: RIS export: when `pdfUrl` is absent but `doi` is present, uses `UR  - https://doi.org/{doi}` as fallback URL.
- [x] PASS: BibTeX `abstract` field is truncated to 500 characters via `s.abstract.slice(0, 500)`.
- [x] PASS: RIS `AB` field is truncated to 500 characters via `s.abstract.slice(0, 500)`.
- [x] PASS: `markdownToRichHTML()` generates a clipboard References section from ALL sources — no 50-source cap, unlike the rendered references list and citations panel.
- [x] PASS: `markdownToRichHTML()` applies inline bold (`**text**` → `<strong>`), italic (`*text*` → `<em>`), and citation superscript (`[N]` → styled `<sup>`) formatting via `applyInlineFormatting()`.
- [x] PASS: `markdownToRichHTML()` renders horizontal rules as `<hr>` with inline styles, while `markdownToSimpleHTML()` skips them entirely.
#### Markdown Rendering Details (`src/components/deep-research/ResearchDocument.tsx`)
- [x] PASS: `h2` headings render with a bottom border: `border-b border-gray-200 dark:border-gray-700/50`.
- [x] PASS: `h4` headings render with `italic` class applied.
- [x] PASS: Heading ID generation: lowercased, strips `[^a-z0-9\s-]`, replaces `\s+` with `-`.
- [x] PASS: `IntersectionObserver` for active heading tracking: `rootMargin: "-80px 0px -60% 0px"`, `threshold: 0.1`.
- [x] PASS: `<hr>` elements render with `my-8 border-gray-200 dark:border-gray-700/50`.
#### Print Styles (`src/components/deep-research/ResearchDocument.tsx`)
- [x] PASS: Even table rows: `background: #f9fafb` in print.
- [x] PASS: Blockquotes in print: border `#666`, text `#555`, background transparent.
- [x] PASS: Code elements in print: background `#f3f4f6`, text `#333`.
- [x] PASS: Links in print: color `#1a56db`.
#### SSE Stream Headers (both `plan/route.ts` and `execute/route.ts`)
- [ ] FAIL: Both routes return headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache, no-transform`, `Connection: keep-alive`, `X-Accel-Buffering: no`.
- [x] PASS: Both routes export `dynamic = "force-dynamic"` (disables Next.js static caching).
