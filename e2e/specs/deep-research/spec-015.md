# deep-research — Spec 015

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Quick Test Workflows
#### Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)
- [ ] Route appends `## References` with a numbered citation list to the markdown before Tiptap conversion.
- [ ] Route builds `SourceReference[]` (with `doi`, `pmid`, `title`) from sources and passes to `markdownToTiptap()` for citation hyperlink mapping.
- [ ] Route computes `word_count` from the plain text markdown and stores it on the section record.
- [ ] If the authenticated user does not exist in the DB, the route inserts a placeholder user with `email: "{userId}@dev.local"` and `full_name: "Dev User"`; the comment describes a dev-mode fallback, but the code is not environment-gated.
- [ ] Unexpected errors return `500 { "error": "Failed to create studio document" }`.
- [ ] Auth failure returns `401 { "error": "Not authenticated" }`.
#### Evidence Badge Labels (`src/components/deep-research/CitationReference.tsx`, `CitationsPanel.tsx`)
- [ ] `EVIDENCE_BADGE_STYLES` in CitationReference.tsx renders evidence labels as capitalized: `"High"`, `"Moderate"`, `"Low"`, `"Unknown"`.
- [ ] CitationsPanel.tsx renders evidence labels via `level.charAt(0).toUpperCase() + level.slice(1)` — also capitalized.
- [ ] EvidenceBadge tooltip text is `"{Label} evidence — {designLabel}"` or `"{Label} evidence"` (no design label).
#### Citations Panel Initialization (`src/components/deep-research/ResearchDocument.tsx`)
- [ ] `citationsPanelOpen` is initialized to `true` — the citations panel starts open by default.
- [ ] Desktop TOC component (`TableOfContents`) returns `null` when `items.length === 0`, but the mobile floating TOC button still renders.
#### Mobile Citations Handle Bar (`src/components/deep-research/CitationsPanel.tsx`)
- [ ] The handle bar element (`<div className="w-10 h-1 bg-gray-300 ...">`) is purely decorative — there are no drag event handlers, touch listeners, or swipe-to-dismiss behavior attached to it.
#### Export Button UI Details (`src/components/deep-research/ExportButtons.tsx`)
- [ ] Export button text labels use `.hidden sm:inline` — on mobile (below `sm` breakpoint) only icons are visible, no text.
- [ ] Buttons render in this order: `.md` → `PDF` → `Copy` → vertical divider → `Open in Studio` → vertical divider → `.bib` → `.ris`.
- [ ] Markdown button `title` attribute: `"Download as Markdown"`.
- [ ] Copy button `title` attribute: `"Copies formatted text — paste into Google Docs, Word, or any editor with formatting preserved"`.
- [ ] BibTeX button `title` attribute: `"Download references as BibTeX"`.
- [ ] RIS button `title` attribute: `"Download references as RIS (EndNote/Mendeley)"`.
#### Export Format Details (`src/components/deep-research/ExportButtons.tsx`)
- [ ] RIS export: when `pdfUrl` is absent but `doi` is present, uses `UR  - https://doi.org/{doi}` as fallback URL.
- [ ] BibTeX `abstract` field is truncated to 500 characters via `s.abstract.slice(0, 500)`.
- [ ] RIS `AB` field is truncated to 500 characters via `s.abstract.slice(0, 500)`.
- [ ] `markdownToRichHTML()` generates a clipboard References section from ALL sources — no 50-source cap, unlike the rendered references list and citations panel.
- [ ] `markdownToRichHTML()` applies inline bold (`**text**` → `<strong>`), italic (`*text*` → `<em>`), and citation superscript (`[N]` → styled `<sup>`) formatting via `applyInlineFormatting()`.
- [ ] `markdownToRichHTML()` renders horizontal rules as `<hr>` with inline styles, while `markdownToSimpleHTML()` skips them entirely.
#### Markdown Rendering Details (`src/components/deep-research/ResearchDocument.tsx`)
- [ ] `h2` headings render with a bottom border: `border-b border-gray-200 dark:border-gray-700/50`.
- [ ] `h4` headings render with `italic` class applied.
- [ ] Heading ID generation: lowercased, strips `[^a-z0-9\s-]`, replaces `\s+` with `-`.
- [ ] `IntersectionObserver` for active heading tracking: `rootMargin: "-80px 0px -60% 0px"`, `threshold: 0.1`.
- [ ] `<hr>` elements render with `my-8 border-gray-200 dark:border-gray-700/50`.
#### Print Styles (`src/components/deep-research/ResearchDocument.tsx`)
- [ ] Even table rows: `background: #f9fafb` in print.
- [ ] Blockquotes in print: border `#666`, text `#555`, background transparent.
- [ ] Code elements in print: background `#f3f4f6`, text `#333`.
- [ ] Links in print: color `#1a56db`.
#### SSE Stream Headers (both `plan/route.ts` and `execute/route.ts`)
- [ ] Both routes return headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache, no-transform`, `Connection: keep-alive`, `X-Accel-Buffering: no`.
- [ ] Both routes export `dynamic = "force-dynamic"` (disables Next.js static caching).
