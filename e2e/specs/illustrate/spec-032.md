# illustrate — Spec 032

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Export Options Panel Details
- [ ] PPTX title placeholder: `Cell Biology Diagrams`; author placeholder: `Dr. Jane Smith`
- [ ] LaTeX Standalone description: `Generate complete compilable .tex file`
- [ ] LaTeX Include Preamble description: `Add TikZ package imports and libraries`
- [ ] LaTeX panel renders a `Download .tex` button that creates a Blob and downloads `diagram.tex` independently of the main Export button
- [ ] LaTeX help text: `Compile with: pdflatex diagram.tex`
- [ ] Export dialog filename label is `Filename` with placeholder `Enter filename`
- [ ] Export dialog shows `Journal Preset` selector for png, svg, and pdf formats only
- [ ] Default journal preset option text: `None (no journal preset)`
- [ ] Export dialog renders both `Cancel` and `Export` / `Exporting...` buttons
- [ ] Export dialog close button has `aria-label="Close dialog"`
#### Journal Figure Panel Details (`JournalFigurePanel.tsx`)
- [ ] Figure label style options: `Fig. 1`, `Figure 1`, `(a)`, `A`
- [ ] Scale bar unit options: `nm`, `μm`, `mm`, `cm`, `m`
- [ ] Panel letter auto-increments to next letter after each insertion (e.g., A → B → C)
- [ ] `ColorConventionManager` applies standardized color conventions to canvas objects via `handleApplyConventions`
- [ ] Color blind simulation types: `Deuteranopia (green-blind)`, `Protanopia (red-blind)`, `Tritanopia (blue-blind)`
- [ ] Accessibility check success text is `Colors appear sufficiently distinct for the selected simulation type.`
- [ ] Accessibility check fallback text is `Consider using patterns or textures alongside colors to convey information.`
#### Icon Grid Virtualization (`IconGrid.tsx`)
- [ ] Icon grid implements scroll-based virtualization with `visibleRange` state tracking start and end indexes
- [ ] Row height calculated as `showNames ? iconSize + 32 : iconSize + 8`
- [ ] Spacer elements above and below visible range maintain scroll position during virtualization
- [ ] Truncation message: `Showing {N} of {total} icons. Scroll to load more.`
- [ ] Icon card title format: `${icon.name} (${icon.library})`
- [ ] Icon card `aria-label` format: `Icon: ${icon.name}`
#### Icon Preview Details (`IconPreview.tsx`)
- [ ] 16 preset tint colors available in `commonColors` array
- [ ] Icon tinting via `applyTint()` replaces `currentColor`, `fill`, and `stroke` attributes in SVG
- [ ] SVG extraction from React component icons uses `50ms` setTimeout delay before DOM scraping
- [ ] Library license information displayed per icon in preview details
- [ ] Keywords display truncates to 8 and shows a bare `+N` indicator when more keywords remain
#### Effects Panel Ranges (`EffectsPanel.tsx`)
- [ ] Shadow blur range: `0` to `50`
- [ ] Shadow X and Y offset range: `-50` to `50`
- [ ] Blur approximation range: `0` to `20`
- [ ] Full blend mode list: `source-over`, `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`
#### Gradient Editor Details (`GradientEditor.tsx`)
- [ ] Linear gradient angle presets: 0°, 45°, 90°, 135°, 180°
- [ ] Radial gradient center positioning via `cx` / `cy` percentage values
#### API Route: `/api/illustration/icons` (GET)
- [ ] No authentication required on this endpoint
