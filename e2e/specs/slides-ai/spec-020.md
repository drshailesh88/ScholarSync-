# slides-ai — Spec 020

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### CardStack — Additional Details (`card-stack.tsx`)
- [x] PASS: Background image frosted overlay uses `backdropFilter: blur(${intensity / 10}px)` where intensity is `overlayIntensity ?? 50`
- [x] PASS: Card wrapper uses `role="button" tabIndex={0}` for accessibility
#### OutlineGenerator — Additional Details (`outline-generator.tsx`)
- [x] PASS: Prompt step header: Sparkle icon (28px, duotone) in a `w-14 h-14 rounded-2xl bg-brand/10` container
- [x] PASS: Prompt step title: `"Create a new presentation"`
- [x] PASS: Prompt step subtitle: `"Describe your topic and we will generate an editable outline you can refine before creating slides."`
- [x] PASS: Title input placeholder: `"e.g. The Role of CRISPR in Gene Therapy"`
- [x] PASS: Description label includes `"(optional)"` in faint text
- [x] PASS: Audience picker active state: `border-brand bg-brand/5 text-brand`
- [x] PASS: Card count slider label shows `"Cards: ${cardCount}"`
- [x] PASS: Outline step header: `"Edit your outline"` with `PencilSimple` icon (20px, duotone)
- [x] PASS: Outline step subtitle: `"Reorder, add, remove, or edit cards and bullet points before generating."`
- [x] PASS: Outline card number shown as brand circle badge at top-left (`-top-2.5 -left-2.5 w-6 h-6`)
- [x] PASS: Outline card remove button has red hover: `hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500`
- [x] PASS: Outline card list scrollable: `max-h-[50vh] overflow-y-auto`
- [x] PASS: Individual bullet remove buttons show on group-hover with red styling
- [x] PASS: Theme step title: `"Pick a theme"`
- [x] PASS: Theme step subtitle: `"Select a visual style for your presentation. You can change this later."`
- [x] PASS: Theme step swatches use `flex flex-wrap justify-center gap-3` — NOT a 4-column grid as stated in original doc
#### ThemeCustomizer — Additional Details (`theme-customizer.tsx`)
- [x] PASS: `SegmentedControl` uses `role="radiogroup"` with `aria-checked` on each option
- [x] PASS: Small theme swatches are `64x36px` (not large cards)
- [x] PASS: Small theme swatch check badge is in BOTTOM-RIGHT corner (`bottom-0.5 right-0.5 w-3.5 h-3.5`), not top-right
- [x] PASS: Section headings use `"mt-3 mb-1.5 first:mt-0"` spacing
#### SmartLayoutPicker — Additional Details (`smart-layout-picker.tsx`)
- [x] PASS: Layout picker uses a 2-column grid (`grid-cols-2 gap-2`) with max-h-96 overflow-y-auto
- [x] PASS: Header shows `"Smart Layouts"` title with subtitle `"Replace this card's content with a pre-built layout"`
- [x] PASS: Each smart layout maps to a `SlideLayout` via `LAYOUT_MAP` (e.g., `two_column → "two_column"`, `chart_with_caption → "chart_slide"`)
- [x] PASS: Picker closes on Escape and click-outside
#### ModeSelector — Additional Details (`mode-selector.tsx`)
- [x] PASS: Mode toggle buttons use inline SVG icons (not Phosphor icon components)
- [x] PASS: "Slides" SVG: rectangle with vertical divider line; "Create" SVG: star outline path
- [x] PASS: `ModeSelectionScreen` subtitle text: `"You can switch anytime with the toggle"` (not just "You can switch anytime")
- [x] PASS: Mode selection cards are `w-64` with `p-8 rounded-2xl`
- [x] PASS: Mode selection icon containers: `w-16 h-16 rounded-xl bg-brand/10`
#### BlockInserterMenu — Additional Details (`block-inserter-menu.tsx`)
- [x] PASS: Search input auto-focuses on mount via `inputRef.current?.focus()`
- [x] PASS: Smart Layouts entry hidden when search query is non-empty
- [x] PASS: Empty search results show: `"No blocks found"` centered text
- [x] PASS: Category order is hardcoded: `["content", "media", "academic"]`
