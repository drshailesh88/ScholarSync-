# poster — Spec 014

STATUS: PARTIAL
TESTED: 35/35
PASS: 32
FAIL: 3
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Error Handling & Edge Cases
#### Content Block Enhancements
- [x] PASS: Math block supports `displayMode` boolean property (inline vs. display mode rendering in KaTeX)
- [x] PASS: Math block sets `throwOnError: false` and separately catches thrown render errors to fall back to red "Invalid LaTeX" text
- [x] PASS: Math, diagram, and code blocks all support an optional `caption` rendered below their content
- [x] PASS: Code block uses `theme.codeBackground ?? "#1E1E2E"` for background and `#E2E8F0` for text color
- [x] PASS: Callout block supports an optional `title` rendered in bold (`text-[0.7em] font-bold`) with the callout type's border color
- [x] PASS: Stat result block displays `{label}: {value}` with the value in `text-[0.9em] font-bold` styled in `theme.primaryColor`
- [x] PASS: Stat result block shows optional CI (`CI: {ci}`) and p-value (`p = {pValue}`) as sub-details at `text-[0.55em] opacity-60`
- [x] PASS: Stat result block shows optional `interpretation` in italic below CI/p-value
- [x] PASS: Bibliography entries format as `[{id}] {formatted}` where `id` falls back to `i + 1` when the entry id is not a number
- [x] PASS: Bibliography entries show an optional `doi:{doi}` suffix at `opacity-60`
- [x] PASS: Timeline entry dots are colored by status: `completed` = `#10B981`, `in_progress` = `theme.primaryColor`, other/upcoming = `#9CA3AF`
- [x] PASS: Timeline entries show label, optional date (at `text-[0.55em] opacity-50`), and optional description
- [x] PASS: Timeline block supports an optional `title` above entries in `text-[0.7em] font-medium` styled in `primaryColor`
- [x] PASS: Divider block data accepts a `style` property and defaults to `"solid"`; the renderer interpolates that value directly into `borderTop`
#### Editor Right Sidebar Headers
- [x] PASS: Right sidebar theme section header reads `THEME` in `text-xs font-semibold text-ink-muted tracking-wide`
- [x] PASS: Editor theme tiles render a `w-3 h-3 rounded-full` colored circle in `primaryColor` (not the theme name text used in the wizard)
- [x] PASS: Right sidebar section details header reads `SECTION DETAILS` in `text-xs font-semibold text-ink-muted tracking-wide`
- [x] PASS: Content blocks label in section details shows count: `Content Blocks ({N})`
- [x] PASS: Block type in section details is displayed in `font-mono text-brand` styling
#### Editor Toolbar Dividers
- [x] PASS: A `w-px h-5 bg-border mx-1` vertical divider separates zoom controls from the panel toggle buttons
- [x] PASS: A second identical vertical divider separates panel toggle buttons from the Export PDF button
#### Editor Layout Structure
- [x] PASS: Editor page root uses `h-[calc(100vh-5rem)]` with `-m-6` for full-height layout
- [ ] FAIL: Canvas area has `p-8` padding around the scaled poster
#### Fallback Reconstruction Specifics
- [ ] FAIL: Fallback reconstruction gives the first content section (sortOrder=1) `colSpan: 3` in addition to the title bar
- [ ] FAIL: Fallback reconstruction section IDs use format `section_${slide.id}`
- [x] PASS: Fallback reconstruction section titles fall back to `Section ${i + 1}` when slide title is null
- [x] PASS: Fallback reconstruction calculates position as `column: i % 3`, `row: Math.floor(i / 3) + 1`
#### API Route Implementation Details
- [x] PASS: API creates deck with `audienceType: "poster_session"` and `sourceType: "custom"`
- [x] PASS: API stores `generationPrompt: body.additionalInstructions` during the "processing" status update
- [x] PASS: API strips markdown code fences from AI response before `JSON.parse`
- [x] PASS: Metadata slide (sortOrder 0) is created with `layout: "title_slide"`
- [x] PASS: Section slides (sortOrder 1+) are created with `layout: "title_content"`
- [x] PASS: API updates `totalSlides: sections.length + 1` and `theme: themeKey` on completion
- [x] PASS: On generation failure, deck status is updated to `"failed"` (in addition to processing/completed)
- [x] PASS: 400 validation error response body: `{ error: "Invalid request body", details: parseResult.error.flatten().fieldErrors }`
