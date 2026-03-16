# illustrate — Spec 024

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Scientific Shapes
- [x] PASS: ER defaults are `type: 'rough'`, `size: 120`, `branches: 5`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#fbbf24'`
- [x] PASS: Microtubule defaults are `length: 200`, `protofilaments: 13`, `showDimer: false`, `stroke: '#4a5568'`, and `strokeWidth: 2`
- [x] PASS: Protein defaults are `type: 'alpha-helix'`, `length: 150`, `strands: 3`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#60a5fa'`
- [x] PASS: Scientific shape previews are rendered with raw SVG strings through `dangerouslySetInnerHTML`
- [x] PASS: Scientific shape insertion rasterizes the generated SVG through `Blob` plus `FabricImage.fromURL()` instead of inserting editable vector paths
- [x] PASS: Inserted scientific shapes are scaled to fit within 60% of the current canvas width and height and then centered
- [x] PASS: Successful scientific-shape insertion closes the panel but does not show a toast
- [x] PASS: Scientific-shape insertion failures are only logged to `console.error('Failed to insert shape:', error)`
#### Icon Panel
- [x] PASS: Icon search input placeholder is exactly `Search all icons...`
- [x] PASS: Icon search debounces query emission by `200` ms
- [x] PASS: Pressing `Escape` in the icon search field clears the current query, and pressing `Escape` again when already empty blurs the input
- [x] PASS: Search results label renders as `{n} result(s) for "{inputValue}"`
- [x] PASS: The icon panel header title is exactly `Icon Library`
- [x] PASS: The icon panel count label uses `{iconCounts.total} icons`
- [x] PASS: Main icon categories are `All`, `Medical`, `Science`, `General`, and `Brands`
- [x] PASS: Personal icon categories are `Favorites`, `Recent`, and `Collections`
- [x] PASS: The quick-access button label is `Recent ({recentIconIds.length})`
- [x] PASS: Category browsing loads only `health`, `science`, `iconpark`, and `simple` library collections into the visible panel dataset
- [x] PASS: Global icon search additionally queries `bioicons`, `bioicons-full`, and `scidraw`, so some searchable icons are not reachable through category browsing alone
- [x] PASS: `searchAllIcons('')` returns an empty result set instead of all icons
- [x] PASS: Search results merge `searchAllIcons(query)` with a local fuzzy search over icon names, de-duplicate the combined list, and cap visible results at `100`
- [x] PASS: Recent empty state text is `No recent icons. Select an icon to add it here.`
- [x] PASS: Search empty state text is `No icons matching "{searchQuery}"`
- [x] PASS: Favorites empty state text is `No favorites yet. Click the heart icon on any icon to save it here.`
- [x] PASS: Collections-empty text with a selected collection is `This collection is empty.`
- [x] PASS: Collections-empty text without a selected collection is `Select a collection or create a new one.`
- [x] PASS: Collections panel empty-state helper is `No collections yet. Create one to organize your icons!`
- [x] PASS: Generic category empty-state text is `No icons in this category`
- [x] PASS: The help text below icon actions reads `Click to select, then Insert to add to canvas`
- [x] PASS: AI icon generation is only offered when the search query is non-empty, the current results list is empty, and `isAIGenerationAvailable()` returns true
- [x] PASS: The AI icon generation button label changes from `Generate AI Icon` to `Generating...` while the request is in flight
- [x] PASS: AI icon generation calls `generateIconFromQuery(searchQuery, { size: 64, style: 'outline' })`
- [x] PASS: AI icon generation failure text is `Failed to generate icon. Please try again.`
- [x] PASS: The collection-create prompt text is `Enter collection name:`
- [x] PASS: The collection-delete confirm text is `Delete collection "{collection.name}"?`
