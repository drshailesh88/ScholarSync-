# presentation — Spec 026

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Reference Import Panel
#### ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)
- [x] PASS: Drag active: `border-brand bg-brand/5`; idle: `border-border hover:border-brand/40`
- [x] PASS: File read via `FileReader.readAsText`; input reset after select; POST to `/api/references/parse` with `{ content }`
- [x] PASS: Empty parse: `"No references found in {filename}. Check the file format."`; deduplicates by DOI or title
- [x] PASS: Link to `zotero.org/settings/keys` with `target="_blank" rel="noopener noreferrer"`
- [x] PASS: API Key `type="password"` placeholder `"Your Zotero API key"`; User ID placeholder `"Numeric user ID"`; `grid grid-cols-2`
- [x] PASS: Button: `"Connect & Import"` / `"Fetching..."` with ArrowsClockwise/CircleNotch; disabled when loading or fields empty
- [x] PASS: Validation: `"Both API Key and User ID are required"`; POST `/api/references/zotero`; empty: `"No items found in this Zotero library."`
- [x] PASS: Text: `"Look up a single reference by its DOI."`; placeholder `"e.g., 10.1038/nature12373"`
- [x] PASS: Enter key triggers lookup; button: `MagnifyingGlass` icon + `"Lookup"` / CircleNotch; disabled when loading or empty
- [x] PASS: Empty DOI error: `"Enter a DOI to look up"`; POST `/api/references/parse` with `{ doi }`; success clears input
- [x] PASS: Header: `"{count} reference(s) imported"` + `"({selectedIds.size} selected)"` in brand; `Select all` / `Clear` links
- [x] PASS: Filter: `Funnel` icon toggle; search placeholder `"Search references..."`; filters by title, authors, journal (case-insensitive)
- [x] PASS: Type dropdown only when `refTypes.length > 1` with `"All types"` default
- [x] PASS: Items in `max-h-64 overflow-y-auto`; selected: `bg-brand/5 border-brand/30`; checkbox `w-4 h-4 rounded`
- [x] PASS: Title `text-xs font-medium line-clamp-2`; authors: first 3 + `" et al."` when >3; year in parens; journal italic
- [x] PASS: Remove X uses `stopPropagation`; empty filter: `"No references match your filter."`
- [x] PASS: Use button: `"Use {count} Selected Reference{plural}"` with Check; disabled at 0 selected
- [x] PASS: Loading: `"Processing..."` with CircleNotch in `bg-brand/5 border-brand/20`
- [x] PASS: Error: `bg-red-500/10 border-red-500/20 text-red-500` with Warning + X dismiss
#### PresenterMode — Presentation Delivery (`presenter-mode.tsx`)
- [x] PASS: 5 types: `none` (0 duration), `fade` (0.3s opacity), `slide` (spring stiffness:300 damping:32 direction-aware), `zoom` (0.28s scale 0.92→1→1.07), `morph` (0.3s crossfade + layoutId)
- [x] PASS: Per-slide `transition` overrides global; `AnimatePresence` uses `mode="sync"` for morph, `mode="wait"` for others
- [x] PASS: Morph: `computeMorphIds` + `MORPH_TITLE_ID` / `MORPH_SUBTITLE_ID` from `morph-matcher`
- [x] PASS: Hidden slides filtered via `slide.hidden`; total count = visible only
- [x] PASS: Empty: `"No visible slides to present."` + `"Exit Presentation"` button on black bg
- [x] PASS: Auto-starts; updates every 250ms; format `MM:SS` zero-padded; Pause/Play icons with aria-labels
- [x] PASS: Pause preserves elapsed via offset tracking
- [x] PASS: `w-[30%] min-w-[320px]` bg `#090b12`; `border-l border-white/10`
- [x] PASS: Slide counter: `"Slide {X} / {Y}"`; Audience button: `Monitor` icon → popup `/presentation/audience` at 1280×720
- [x] PASS: Timer: `Clock` icon `text-emerald-400` + `"Timer"` label; value `font-mono tabular-nums`
- [x] PASS: Screen buttons: `"Black (B)"` Moon icon, `"White (W)"` Sun icon; active: `bg-white text-black`
- [x] PASS: Header `"Speaker Notes"` uppercase; progress `"Build {current} of {total}"` + optional click/auto counts + `" • Next click advances slide"`
- [x] PASS: Rendered via `ReactMarkdown` + `remark-gfm`; links `target="_blank"`; bold `text-white`; empty: `"No speaker notes for this slide."` italic
- [x] PASS: Auto-scroll to top on slide change; font size S/M/L toggle (text-sm/base/lg); active: `bg-white text-black`
- [x] PASS: Header `"Next Slide"`; shows title or `"Slide {n+1}"`; `SlideRenderer` at `scale={0.42}`; last slide: `"End of presentation"`
- [x] PASS: Prev disabled at index 0; Next disabled at last slide when `maxRevealOrder === 0 || revealedOrder >= maxRevealOrder`
