# Deep Research — Claude Code Pass 3 Verification Report

Line numbers below refer to the Pass 3 block as it appeared in `DEEP_RESEARCH_FEATURES_TESTING.md` before Codex final cleanup.

**Total assertions reviewed:** 61  
**Verified Correct:** 58  
**Hallucinated / Inaccurate:** 2  
**Partially Correct:** 1  
**Accuracy rate:** 95.1%

## Verified Correct
- [line 905] "`STAGE_MAP` maps engine stages `validating`, `generating-perspectives`, `building-tree`, and `searching` to the single frontend stage `search-round-1`." — CONFIRMED in `src/app/api/deep-research/execute/route.ts:30`.
- [line 906] "Engine stage `search-round-3` maps to frontend `search-round-2` (no separate round-3 indicator on the frontend)." — CONFIRMED in `src/app/api/deep-research/execute/route.ts:36`.
- [line 907] "Engine stages `deduplicating` and `unpaywall-lookup` both map to frontend `full-text-extraction`." — CONFIRMED in `src/app/api/deep-research/execute/route.ts:37`.
- [line 908] "Engine stage `synthesizing` maps to `synthesis-perspectives`; engine stage `complete` maps to `synthesis-critique`." — CONFIRMED in `src/app/api/deep-research/execute/route.ts:39`.
- [line 909] "Engine stages `citation-traversal`, `full-text-extraction`, and `data-extraction` are NOT in `STAGE_MAP` and pass through `mapStageId()` unchanged." — CONFIRMED in `src/app/api/deep-research/execute/route.ts:30`.
- [line 912] "The execute route does NOT call `validateTopic()` — it only checks `!topic || typeof topic !== \"string\"`. A topic of 2 characters would pass the execute route's validation (but the plan route would have already rejected it)." — CONFIRMED in `src/app/api/deep-research/execute/route.ts:84`.
- [line 913] "The execute route accepts an optional `config` field in the request body (`config?: Partial<ResearchConfig>`), but the page client never sends it — this is dead code from the page's perspective." — CONFIRMED in `src/app/api/deep-research/execute/route.ts:55` and `src/app/(app)/deep-research/page.tsx:210`.
- [line 917] "`validateTopic()` runs inside the SSE stream (after the 200 response is already sent), so a 5–500 character violation is emitted as an SSE error event `{ type: \"error\", error: \"Topic must be at least 5 characters long\" }`, not as an HTTP 400 response." — CONFIRMED in `src/app/api/deep-research/plan/route.ts:66`, `src/app/api/deep-research/plan/route.ts:79`, and `src/lib/deep-research/engine.ts:47`.
- [line 918] "The plan route emits the first progress message as `{ stage: \"generating-perspectives\", message: \"Generating research perspectives...\" }` before calling `generatePerspectives()`." — CONFIRMED in `src/app/api/deep-research/plan/route.ts:85`.
- [line 919] "After perspective generation completes, the plan route emits `{ stage: \"generating-perspectives\", message: \"Generated {N} perspectives\" }` before the perspectives event." — CONFIRMED in `src/app/api/deep-research/plan/route.ts:94`.
- [line 923] "Missing or non-string `topic` returns `400 { \"error\": \"Topic is required\" }`." — CONFIRMED in `src/app/api/deep-research/save/route.ts:13`.
- [line 924] "Auth failure returns `401 { \"error\": \"Not authenticated\" }`." — CONFIRMED in `src/app/api/deep-research/save/route.ts:35`.
- [line 925] "Unexpected errors return `500 { \"error\": \"Failed to save research session\" }`." — CONFIRMED in `src/app/api/deep-research/save/route.ts:39`.
- [line 929] "Mode is extracted from `researchPlan` JSON via `(s.researchPlan as { mode?: string })?.mode` with fallback `\"standard\"`." — CONFIRMED in `src/app/api/deep-research/sessions/route.ts:26`.
- [line 930] "`completedAt` for each session falls back to `startedAt?.toISOString()` when `completedAt` is null." — CONFIRMED in `src/app/api/deep-research/sessions/route.ts:33`.
- [line 931] "Unexpected errors return `500 { \"error\": \"Failed to fetch sessions\" }`." — CONFIRMED in `src/app/api/deep-research/sessions/route.ts:41`.
- [line 932] "Auth failure returns `401 { \"error\": \"Not authenticated\" }` (the client handles 401 silently by hiding the section)." — CONFIRMED in `src/app/api/deep-research/sessions/route.ts:38` and `src/components/deep-research/PastResearchSessions.tsx:30`.
- [line 936] "Mode defaults to `\"standard\"` when `researchPlan.mode` is absent from the stored JSON." — CONFIRMED in `src/app/api/deep-research/sessions/[id]/route.ts:35`.
- [line 937] "`markdownReport` defaults to `session.finalReport || \"\"` — an empty string, not null/undefined." — CONFIRMED in `src/app/api/deep-research/sessions/[id]/route.ts:41`.
- [line 938] "Unexpected errors return `500 { \"error\": \"Failed to fetch session\" }`." — CONFIRMED in `src/app/api/deep-research/sessions/[id]/route.ts:53`.
- [line 939] "Auth failure returns `401 { \"error\": \"Not authenticated\" }`." — CONFIRMED in `src/app/api/deep-research/sessions/[id]/route.ts:49`.
- [line 943] "Project title format: `Literature Review: {topic}`, with topic truncated to 77 chars + `\"...\"` when `topic.length > 80`." — CONFIRMED in `src/app/api/deep-research/open-in-studio/route.ts:43`.
- [line 944] "Project description: `Deep research report on: {topic}`." — CONFIRMED in `src/app/api/deep-research/open-in-studio/route.ts:71`.
- [line 945] "Document title is the same truncated string as the project title." — CONFIRMED in `src/app/api/deep-research/open-in-studio/route.ts:43` and `src/app/api/deep-research/open-in-studio/route.ts:77`.
- [line 946] "Route appends `## References` with a numbered citation list to the markdown before Tiptap conversion." — CONFIRMED in `src/app/api/deep-research/open-in-studio/route.ts:87`.
- [line 947] "Route builds `SourceReference[]` (with `doi`, `pmid`, `title`) from sources and passes to `markdownToTiptap()` for citation hyperlink mapping." — CONFIRMED in `src/app/api/deep-research/open-in-studio/route.ts:110` and `src/lib/editor/markdown-to-tiptap.ts:152`.
- [line 948] "Route computes `word_count` from the plain text markdown and stores it on the section record." — CONFIRMED in `src/app/api/deep-research/open-in-studio/route.ts:118`.
- [line 950] "Unexpected errors return `500 { \"error\": \"Failed to create studio document\" }`." — CONFIRMED in `src/app/api/deep-research/open-in-studio/route.ts:142`.
- [line 951] "Auth failure returns `401 { \"error\": \"Not authenticated\" }`." — CONFIRMED in `src/app/api/deep-research/open-in-studio/route.ts:138`.
- [line 955] "`EVIDENCE_BADGE_STYLES` in CitationReference.tsx renders evidence labels as capitalized: `\"High\"`, `\"Moderate\"`, `\"Low\"`, `\"Unknown\"`." — CONFIRMED in `src/components/deep-research/CitationReference.tsx:8`.
- [line 956] "CitationsPanel.tsx renders evidence labels via `level.charAt(0).toUpperCase() + level.slice(1)` — also capitalized." — CONFIRMED in `src/components/deep-research/CitationsPanel.tsx:65`.
- [line 957] "EvidenceBadge tooltip text is `\"{Label} evidence — {designLabel}\"` or `\"{Label} evidence\"` (no design label)." — CONFIRMED in `src/components/deep-research/CitationReference.tsx:23`.
- [line 961] "`citationsPanelOpen` is initialized to `true` — the citations panel starts open by default." — CONFIRMED in `src/components/deep-research/ResearchDocument.tsx:196`.
- [line 962] "Desktop TOC component (`TableOfContents`) returns `null` when `items.length === 0`, but the mobile floating TOC button still renders." — CONFIRMED in `src/components/deep-research/ResearchDocument.tsx:111` and `src/components/deep-research/ResearchDocument.tsx:405`.
- [line 966] "The handle bar element (`<div className=\"w-10 h-1 bg-gray-300 ...\">`) is purely decorative — there are no drag event handlers, touch listeners, or swipe-to-dismiss behavior attached to it." — CONFIRMED in `src/components/deep-research/CitationsPanel.tsx:147`.
- [line 970] "Export button text labels use `.hidden sm:inline` — on mobile (below `sm` breakpoint) only icons are visible, no text." — CONFIRMED in `src/components/deep-research/ExportButtons.tsx:497`.
- [line 971] "Buttons render in this order: `.md` → `PDF` → `Copy` → vertical divider → `Open in Studio` → vertical divider → `.bib` → `.ris`." — CONFIRMED in `src/components/deep-research/ExportButtons.tsx:490`.
- [line 972] "Markdown button `title` attribute: `\"Download as Markdown\"`." — CONFIRMED in `src/components/deep-research/ExportButtons.tsx:494`.
- [line 973] "Copy button `title` attribute: `\"Copies formatted text — paste into Google Docs, Word, or any editor with formatting preserved\"`." — CONFIRMED in `src/components/deep-research/ExportButtons.tsx:522`.
- [line 974] "BibTeX button `title` attribute: `\"Download references as BibTeX\"`." — CONFIRMED in `src/components/deep-research/ExportButtons.tsx:560`.
- [line 975] "RIS button `title` attribute: `\"Download references as RIS (EndNote/Mendeley)\"`." — CONFIRMED in `src/components/deep-research/ExportButtons.tsx:568`.
- [line 979] "RIS export: when `pdfUrl` is absent but `doi` is present, uses `UR  - https://doi.org/{doi}` as fallback URL." — CONFIRMED in `src/components/deep-research/ExportButtons.tsx:50`.
- [line 980] "BibTeX `abstract` field is truncated to 500 characters via `s.abstract.slice(0, 500)`." — CONFIRMED in `src/components/deep-research/ExportButtons.tsx:28`.
- [line 981] "RIS `AB` field is truncated to 500 characters via `s.abstract.slice(0, 500)`." — CONFIRMED in `src/components/deep-research/ExportButtons.tsx:50`.
- [line 982] "`markdownToRichHTML()` generates a clipboard References section from ALL sources — no 50-source cap, unlike the rendered references list and citations panel." — CONFIRMED in `src/components/deep-research/ExportButtons.tsx:279`, `src/components/deep-research/ResearchDocument.tsx:449`, and `src/components/deep-research/CitationsPanel.tsx:127`.
- [line 983] "`markdownToRichHTML()` applies inline bold (`**text**` → `<strong>`), italic (`*text*` → `<em>`), and citation superscript (`[N]` → styled `<sup>`) formatting via `applyInlineFormatting()`." — CONFIRMED in `src/components/deep-research/ExportButtons.tsx:110`.
- [line 984] "`markdownToRichHTML()` renders horizontal rules as `<hr>` with inline styles, while `markdownToSimpleHTML()` skips them entirely." — CONFIRMED in `src/components/deep-research/ExportButtons.tsx:78` and `src/components/deep-research/ExportButtons.tsx:187`.
- [line 988] "`h2` headings render with a bottom border: `border-b border-gray-200 dark:border-gray-700/50`." — CONFIRMED in `src/components/deep-research/ResearchDocument.tsx:268`.
- [line 989] "`h4` headings render with `italic` class applied." — CONFIRMED in `src/components/deep-research/ResearchDocument.tsx:301`.
- [line 990] "Heading ID generation: lowercased, strips `[^a-z0-9\\s-]`, replaces `\\s+` with `-`." — CONFIRMED in `src/components/deep-research/ResearchDocument.tsx:93` and `src/components/deep-research/ResearchDocument.tsx:261`.
- [line 991] "`IntersectionObserver` for active heading tracking: `rootMargin: \"-80px 0px -60% 0px\"`, `threshold: 0.1`." — CONFIRMED in `src/components/deep-research/ResearchDocument.tsx:212`.
- [line 992] "`<hr>` elements render with `my-8 border-gray-200 dark:border-gray-700/50`." — CONFIRMED in `src/components/deep-research/ResearchDocument.tsx:397`.
- [line 996] "Even table rows: `background: #f9fafb` in print." — CONFIRMED in `src/components/deep-research/ResearchDocument.tsx:590`.
- [line 997] "Blockquotes in print: border `#666`, text `#555`, background transparent." — CONFIRMED in `src/components/deep-research/ResearchDocument.tsx:593`.
- [line 998] "Code elements in print: background `#f3f4f6`, text `#333`." — CONFIRMED in `src/components/deep-research/ResearchDocument.tsx:598`.
- [line 999] "Links in print: color `#1a56db`." — CONFIRMED in `src/components/deep-research/ResearchDocument.tsx:576`.
- [line 1003] "Both routes return headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache, no-transform`, `Connection: keep-alive`, `X-Accel-Buffering: no`." — CONFIRMED in `src/app/api/deep-research/plan/route.ts:122` and `src/app/api/deep-research/execute/route.ts:193`.
- [line 1004] "Both routes export `dynamic = \"force-dynamic\"` (disables Next.js static caching)." — CONFIRMED in `src/app/api/deep-research/plan/route.ts:25` and `src/app/api/deep-research/execute/route.ts:27`.

## Hallucinated / Inaccurate
- [line 910] "Frontend stages `synthesis-summary` and `synthesis-tables` are never individually activated by any SSE progress event — they remain `pending` during execution and jump to `completed` only when the final `report` event marks all 9 stages completed." — WRONG because `pass2ExecutiveSummary()` emits `synthesis-summary` and `pass3TablesAndAnalysis()` emits `synthesis-tables`, and the execute route forwards unmapped stages unchanged in `src/lib/deep-research/synthesis.ts:221`, `src/lib/deep-research/synthesis.ts:290`, and `src/app/api/deep-research/execute/route.ts:43`.
- [line 911] "During a live research execution, the progress stepper shows stages jumping from `synthesis-perspectives` (active) directly to `synthesis-critique` (active), with `synthesis-summary` and `synthesis-tables` staying as gray pending circles until the report event." — WRONG because the client activates each new stage ID as it arrives, so `synthesis-summary` and `synthesis-tables` can become active before `synthesis-critique` in `src/app/(app)/deep-research/page.tsx:226` and `src/components/deep-research/ProgressStepper.tsx:118`.

## Partially Correct
- [line 949] "If the authenticated user does not exist in the DB, the route creates a dev user record with `email: \"{userId}@dev.local\"` and `full_name: \"Dev User\"` (for FK constraint satisfaction in dev mode)." — MOSTLY RIGHT but the inserted values are correct while the "in dev mode" qualifier is not enforced in code; the insert runs whenever the authenticated user is missing in `src/app/api/deep-research/open-in-studio/route.ts:28`.

## Behavior Corrections Verified

1. Evidence badge labels are capitalized. Exact strings are `"High"`, `"Moderate"`, `"Low"`, and `"Unknown"` in `src/components/deep-research/CitationReference.tsx:9`. The citations panel also capitalizes via `level.charAt(0).toUpperCase() + level.slice(1)` in `src/components/deep-research/CitationsPanel.tsx:66`.
2. The mobile citations handle bar is decorative only. The handle is a plain nested `<div>` at `src/components/deep-research/CitationsPanel.tsx:147`; there is no `onTouchMove`, `onDrag`, `pointer-events-*`, or swipe logic attached to it or its wrapper.
3. Clipboard References are uncapped, but rendered references are capped at 50. `markdownToRichHTML()` iterates `for (const s of sources)` in `src/components/deep-research/ExportButtons.tsx:283`, while rendered references and the citations panel both use `sources.slice(0, 50)` in `src/components/deep-research/ResearchDocument.tsx:449` and `src/components/deep-research/CitationsPanel.tsx:127`.

## STAGE_MAP Verification

1. Exact execute-route stage mappings are:
   `validating`, `generating-perspectives`, `building-tree`, `searching` → `search-round-1`
   `search-round-2` → `search-round-2`
   `search-round-3` → `search-round-2`
   `deduplicating`, `unpaywall-lookup` → `full-text-extraction`
   `synthesizing` → `synthesis-perspectives`
   `complete` → `synthesis-critique`
   Verified in `src/app/api/deep-research/execute/route.ts:30`.
2. `synthesis-summary` and `synthesis-tables` both exist as engine stages in `src/lib/deep-research/types.ts:106`, and synthesis emits them from `src/lib/deep-research/synthesis.ts:221` and `src/lib/deep-research/synthesis.ts:290`.
3. The execute route itself emits SSE event types `progress`, `report`, `done`, and `error` in `src/app/api/deep-research/execute/route.ts:123`. The progress events can carry stage IDs including `synthesis-summary` and `synthesis-tables` because `mapStageId()` passes unmapped stages through.
4. Pending circles are controlled by `buildStagesFromEvents()`: any stage not equal to `currentStage` and not present in `seenStages` gets `status = "pending"` in `src/components/deep-research/ProgressStepper.tsx:119`, and `ProgressStepper` renders pending stages as gray `Circle` icons in `src/components/deep-research/ProgressStepper.tsx:61`.
5. When the final `report` event arrives, the client sets all nine stage IDs into `allCompleted`, clears `currentStageIdRef`, and rebuilds the stepper in `src/app/(app)/deep-research/page.tsx:255`.

## SSE Validation Verification

1. `validateTopic()` is called inside the `ReadableStream.start()` handler in `src/app/api/deep-research/plan/route.ts:67`.
2. Validation failure emits `sendEvent("error", { error: ... })` and does not return an HTTP 400 for 5-to-500 length violations in `src/app/api/deep-research/plan/route.ts:79`.
3. The client handles both cases:
   HTTP errors via `if (!response.ok) ... throw new Error(...)` in `src/app/(app)/deep-research/page.tsx:161`
   SSE error events via `case "error": throw new Error(...)` in `src/app/(app)/deep-research/page.tsx:127`

## API Error Responses

### `POST /api/deep-research/save`

- `400 {"error":"Topic is required"}` for missing/non-string `topic` in `src/app/api/deep-research/save/route.ts:13`
- `401 {"error":"Not authenticated"}` in `src/app/api/deep-research/save/route.ts:35`
- `500 {"error":"Failed to save research session"}` in `src/app/api/deep-research/save/route.ts:39`
- Missed path: malformed JSON also falls through to the generic `500` because `request.json()` is inside the outer `try` and has no dedicated parse-error branch in `src/app/api/deep-research/save/route.ts:10`

### `GET /api/deep-research/sessions`

- `401 {"error":"Not authenticated"}` in `src/app/api/deep-research/sessions/route.ts:38`
- `500 {"error":"Failed to fetch sessions"}` in `src/app/api/deep-research/sessions/route.ts:41`
- No additional route-local error branches were missed

### `GET /api/deep-research/sessions/[id]`

- `400 {"error":"Invalid session ID"}` in `src/app/api/deep-research/sessions/[id]/route.ts:16`
- `404 {"error":"Session not found"}` in `src/app/api/deep-research/sessions/[id]/route.ts:31`
- `401 {"error":"Not authenticated"}` in `src/app/api/deep-research/sessions/[id]/route.ts:49`
- `500 {"error":"Failed to fetch session"}` in `src/app/api/deep-research/sessions/[id]/route.ts:53`
- Claude's Pass 3 addendum omitted the `400` and `404` branches

### `POST /api/deep-research/open-in-studio`

- `400 {"error":"Topic and markdownReport are required"}` in `src/app/api/deep-research/open-in-studio/route.ts:21`
- `401 {"error":"Not authenticated"}` in `src/app/api/deep-research/open-in-studio/route.ts:138`
- `500 {"error":"Failed to create studio document"}` in `src/app/api/deep-research/open-in-studio/route.ts:142`
- Missed path: malformed JSON also falls through to the generic `500` because `request.json()` has no dedicated parse-error branch in `src/app/api/deep-research/open-in-studio/route.ts:18`

## Open in Studio Verification

1. No `sessionStorage` key is used anywhere in the deep-research Open in Studio flow. The client simply posts to the route and `router.push()`es the returned URL in `src/components/deep-research/ExportButtons.tsx:455`.
2. The client payload shape is exactly `{ topic, mode, markdownReport, sources, keyFindings, gaps }` in `src/components/deep-research/ExportButtons.tsx:462`.
3. Project/document title format is `Literature Review: ${topic}`, truncated with `topic.slice(0, 77) + "..."` when `topic.length > 80` in `src/app/api/deep-research/open-in-studio/route.ts:43`.
4. References are appended before Tiptap conversion as `\n\n## References\n\n${refLines.join("\n")}` in `src/app/api/deep-research/open-in-studio/route.ts:105`.
5. Citation hyperlinks are mapped by building `SourceReference[]` and letting `markdownToTiptap()` prefer DOI URLs, then PubMed URLs, in `src/app/api/deep-research/open-in-studio/route.ts:110` and `src/lib/editor/markdown-to-tiptap.ts:152`.
6. Word count is stored in `synthesisSections.word_count`, computed as `fullMarkdown.split(/\\s+/).filter(Boolean).length` in `src/app/api/deep-research/open-in-studio/route.ts:118`.
7. Placeholder user creation happens when the authenticated `userId` is missing from `users`; the inserted values are `${userId}@dev.local` and `"Dev User"` in `src/app/api/deep-research/open-in-studio/route.ts:35`. The comment frames this as a dev fallback, but the code is not production-gated.

## Export Verification

1. All button labels use `.hidden sm:inline`, so below `sm` only icons render in `src/components/deep-research/ExportButtons.tsx:497`.
2. Render order is `.md`, `PDF`, `Copy`, divider, `Open in Studio`, divider, `.bib`, `.ris` in `src/components/deep-research/ExportButtons.tsx:490`.
3. Exact tooltip strings are:
   `Download as Markdown`
   `Download as PDF` or current error text
   `Copies formatted text — paste into Google Docs, Word, or any editor with formatting preserved`
   `Open in Studio editor` or current error text
   `Download references as BibTeX`
   `Download references as RIS (EndNote/Mendeley)`
4. RIS DOI fallback URL is exactly ``https://doi.org/${s.doi}`` in `src/components/deep-research/ExportButtons.tsx:52`.
5. BibTeX and RIS abstracts both truncate with `.slice(0, 500)` in `src/components/deep-research/ExportButtons.tsx:28` and `src/components/deep-research/ExportButtons.tsx:50`.
6. Clipboard References are uncapped in `src/components/deep-research/ExportButtons.tsx:283`.

## Rendering and Print Verification

1. `h2` uses `border-b border-gray-200 dark:border-gray-700/50` in `src/components/deep-research/ResearchDocument.tsx:268`.
2. `h4` uses `italic` in `src/components/deep-research/ResearchDocument.tsx:301`.
3. Heading IDs are generated by `.toLowerCase().replace(/[^a-z0-9\\s-]/g, "").replace(/\\s+/g, "-")` in `src/components/deep-research/ResearchDocument.tsx:261`.
4. `IntersectionObserver` uses `rootMargin: "-80px 0px -60% 0px"` and `threshold: 0.1` in `src/components/deep-research/ResearchDocument.tsx:221`.
5. Print styles set table zebra background `#f9fafb`, blockquote border/text `#666` / `#555`, code background/text `#f3f4f6` / `#333`, and link color `#1a56db` in `src/components/deep-research/ResearchDocument.tsx:557`.

## Full Document Integrity Sweep

1. The broader deep-research audit remains source-backed after this pass. I re-checked the page, core components, API routes, engine, synthesis, citation traversal, full-text extraction, data extraction, and markdown/Tiptap conversion files.
2. Remaining inaccuracies found in the active checklist were corrected in place. The old "Features in Existing Doc That Don't Exist in Code" section was converted into a historical-corrections section so disproven claims no longer survive as active assertions.
3. The "Dead Code" section remains accurate: `section` SSE handling and `streamingSections` preview UI are still dead in the live two-phase flow because neither `plan` nor `execute` emits `section`.
4. The old hallucinated-feature inventory is still conceptually correct after cleanup: no client-side 5-to-500 validation, no button-local plan spinner, no live section streaming, no explicit `done` handler, no sessionStorage handoff, no Escape handler, no custom aria-live wiring, and no abstract fallback inside the full-text extractor.
5. After cleanup, I did not find any remaining internal contradiction in the document. The largest one, around `synthesis-summary` / `synthesis-tables`, is now corrected.
6. New source-backed finding: the UI components check `source.pdfUrl`, but the execute route serializes `openAccessPdfUrl` / `fullTextUrl`. That means live report data will usually not show `PDF` anchors even though the components support them.
