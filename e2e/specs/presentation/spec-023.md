# presentation — Spec 023

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Reference Import Panel
#### SlideRenderer — Layout Rendering (`slide-renderer.tsx`)
- [x] PASS: `three_column`: blocks split into thirds via `Math.ceil(blocks.length / 3)` into `grid grid-cols-3 gap-[0.8em]`
- [x] PASS: `quote_slide`: large left curly quote at `text-[2.5em]` in `theme.accentColor`; text at `text-[1.1em] italic`; attribution at `text-[0.75em] opacity-60` with em-dash
- [x] PASS: `comparison`: each block in a bordered card with `borderColor: theme.accentColor + "40"` in `grid grid-cols-2`
- [x] PASS: `image_text`: image area tinted `theme.primaryColor + "10"`; image left, text right in `grid grid-cols-2`; missing image shows `"Image placeholder"`
- [x] PASS: `chart_slide`: chart block centered via `SimpleChartPreview`; non-chart blocks render below
- [x] PASS: `table_slide`: table block via `SimpleTablePreview`; all blocks as fallback when no table found
- [x] PASS: `blank`: no title rendered; only content blocks fill the flex area
- [x] PASS: `bibliography_slide`: title defaults to `"References"` when falsy; bibliography in two-column mode via `twoColumn` prop
- [x] PASS: `methodology`: `grid grid-cols-5` — left `col-span-3` prefers timeline/diagram, right `col-span-2` prefers callouts in bordered cards
- [x] PASS: `results_summary`: stat grid at top (cols-2/3/4 based on count), then chart grid (cols-1/2), then callouts, then remaining
- [x] PASS: `key_findings`: optional stat at top (`text-[2em] font-extrabold` in `theme.accentColor`); numbered items with `w-[1.4em] h-[1.4em] rounded-full` circles in `theme.primaryColor`
- [x] PASS: `timeline_slide`: horizontal layout when `entries.length <= 6`; vertical otherwise; dots colored by status (completed=`#10B981`, in_progress=`#3B82F6`, default=`#9CA3AF`)
- [x] PASS: `stat_overview`: grid-cols-3 (≤3 stats), grid-cols-2 (4 stats), else grid-cols-3; adds grid-rows-2 when >3
- [x] PASS: `big_number`: value at `text-[3.5em] font-extrabold` in `theme.accentColor`; label at `text-[1.1em] font-semibold`; CI/pValue at `text-[0.65em] opacity-50`
- [x] PASS: `title_content` is the default/fallback layout; subtitle at `text-[0.7em] opacity-60` with negative top margin
- [x] PASS: `text`: 4 styles — title (`text-[1.2em] font-bold`), subtitle (`text-[0.9em] opacity-70`), body (`text-[0.75em]`), caption (`text-[0.65em] opacity-50`); HTML content uses `dangerouslySetInnerHTML`
- [x] PASS: `bullets`: ordered renders `<ol class="list-decimal">`; unordered renders `<ul class="list-disc">`; both at `text-[0.75em] pl-[1.2em]`
- [x] PASS: `image`: with URL renders `next/image` at `max-h-[8em] object-contain`; without URL shows tinted placeholder using `block.data.suggestion ?? block.data.alt`; caption at `text-[0.55em] opacity-50`
- [x] PASS: `citation`: accent-color `border-l-2` left border; source at `text-[0.85em] opacity-60` with em-dash
- [x] PASS: `quote`: accent-color `border-l-[0.15em]` left border; curly quotes around text; attribution at `text-[0.65em] not-italic opacity-60`
- [x] PASS: Chart palette: 8 hardcoded colors `#4F46E5`, `#06B6D4`, `#10B981`, `#F59E0B`, `#EF4444`, `#8B5CF6`, `#EC4899`, `#14B8A6`
- [x] PASS: `bar`: vertical bars proportional to `val / maxVal` with labels below
- [x] PASS: `line`: SVG polyline with data point circles at each value
- [x] PASS: `pie`: SVG path slices with percentage labels; legend capped at 6 items
- [x] PASS: `scatter`: SVG circles with axes, grid lines, and optional `xAxisLabel` / `yAxisLabel`
- [x] PASS: `area`: filled polygon under line with `fillOpacity={0.15}`
- [x] PASS: `radar`: polygon on radial grid with concentric rings at 25/50/75/100%
- [x] PASS: Chart legend renders only when `showLegend` is true and multiple datasets exist
- [x] PASS: `math`: KaTeX via `katex.renderToString` with `throwOnError: false`; display mode in surface-color container; inline as `<span>`; invalid shows red `"Invalid LaTeX"`; caption at `text-[0.55em] opacity-50`
- [x] PASS: `diagram`: Mermaid async render via `mermaid.render` with `useId`-based instance; initialized `startOnLoad: false, theme: "default"`; error shows `"Diagram preview unavailable"` with type + truncated syntax (200 chars); loading shows `"Rendering diagram..."`
- [x] PASS: `code`: background `theme.codeBackground ?? "#1E1E2E"` with `text-white/90`; language label at `text-[0.45em] font-mono opacity-50`; optional `showLineNumbers` with `select-none opacity-30` gutter; caption support
- [x] PASS: `callout`: 7 types with icon badges — info (#3B82F6,"i"), warning (#F59E0B,"!"), success (#10B981,"✓"), finding (accent,"★"), limitation (#EF4444,"✗"), methodology (#6366F1,"M"), clinical (#14B8A6,"+"); `finding` uses `theme.accentColor`
- [x] PASS: `stat_result`: bordered card with label at `text-[0.6em] opacity-70`, value at `text-[1.3em] font-bold` in `theme.primaryColor`, CI/pValue at `text-[0.5em] opacity-60`
- [x] PASS: `bibliography`: style label uppercase (e.g., `"APA Format"`); numbered `<ol>` at `text-[0.5em]`; two-column when >4 entries or `twoColumn` prop; DOI links as `doi:{doi}`; non-DOI URL links as `[Link]`; `citedOnSlides` badge circles in `theme.accentColor`
- [x] PASS: `timeline`: vertical line `w-[0.1em]` in border color; dots `w-[0.5em] h-[0.5em]`; horizontal variant with `border-2` dots; title at `text-[0.7em] font-semibold`
