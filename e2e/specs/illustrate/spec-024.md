# illustrate — Spec 024

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Scientific Shapes
- [ ] ER defaults are `type: 'rough'`, `size: 120`, `branches: 5`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#fbbf24'`
- [ ] Microtubule defaults are `length: 200`, `protofilaments: 13`, `showDimer: false`, `stroke: '#4a5568'`, and `strokeWidth: 2`
- [ ] Protein defaults are `type: 'alpha-helix'`, `length: 150`, `strands: 3`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#60a5fa'`
- [ ] Scientific shape previews are rendered with raw SVG strings through `dangerouslySetInnerHTML`
- [ ] Scientific shape insertion rasterizes the generated SVG through `Blob` plus `FabricImage.fromURL()` instead of inserting editable vector paths
- [ ] Inserted scientific shapes are scaled to fit within 60% of the current canvas width and height and then centered
- [ ] Successful scientific-shape insertion closes the panel but does not show a toast
- [ ] Scientific-shape insertion failures are only logged to `console.error('Failed to insert shape:', error)`
#### Icon Panel
- [ ] Icon search input placeholder is exactly `Search all icons...`
- [ ] Icon search debounces query emission by `200` ms
- [ ] Pressing `Escape` in the icon search field clears the current query, and pressing `Escape` again when already empty blurs the input
- [ ] Search results label renders as `{n} result(s) for "{inputValue}"`
- [ ] The icon panel header title is exactly `Icon Library`
- [ ] The icon panel count label uses `{iconCounts.total} icons`
- [ ] Main icon categories are `All`, `Medical`, `Science`, `General`, and `Brands`
- [ ] Personal icon categories are `Favorites`, `Recent`, and `Collections`
- [ ] The quick-access button label is `Recent ({recentIconIds.length})`
- [ ] Category browsing loads only `health`, `science`, `iconpark`, and `simple` library collections into the visible panel dataset
- [ ] Global icon search additionally queries `bioicons`, `bioicons-full`, and `scidraw`, so some searchable icons are not reachable through category browsing alone
- [ ] `searchAllIcons('')` returns an empty result set instead of all icons
- [ ] Search results merge `searchAllIcons(query)` with a local fuzzy search over icon names, de-duplicate the combined list, and cap visible results at `100`
- [ ] Recent empty state text is `No recent icons. Select an icon to add it here.`
- [ ] Search empty state text is `No icons matching "{searchQuery}"`
- [ ] Favorites empty state text is `No favorites yet. Click the heart icon on any icon to save it here.`
- [ ] Collections-empty text with a selected collection is `This collection is empty.`
- [ ] Collections-empty text without a selected collection is `Select a collection or create a new one.`
- [ ] Collections panel empty-state helper is `No collections yet. Create one to organize your icons!`
- [ ] Generic category empty-state text is `No icons in this category`
- [ ] The help text below icon actions reads `Click to select, then Insert to add to canvas`
- [ ] AI icon generation is only offered when the search query is non-empty, the current results list is empty, and `isAIGenerationAvailable()` returns true
- [ ] The AI icon generation button label changes from `Generate AI Icon` to `Generating...` while the request is in flight
- [ ] AI icon generation calls `generateIconFromQuery(searchQuery, { size: 64, style: 'outline' })`
- [ ] AI icon generation failure text is `Failed to generate icon. Please try again.`
- [ ] The collection-create prompt text is `Enter collection name:`
- [ ] The collection-delete confirm text is `Delete collection "{collection.name}"?`
