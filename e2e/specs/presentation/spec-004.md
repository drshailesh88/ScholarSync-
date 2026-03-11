# presentation — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Design Panel (Right Column)
- [ ] **7.1** DesignPanel component renders at w-72
- [ ] **7.2** Theme picker section is present and functional
- [ ] **7.3** Selecting a theme updates the canvas immediately
- [ ] **7.4** Layout picker section is present
- [ ] **7.5** Changing layout reorganizes the current slide
- [ ] **7.6** AI tools section is accessible
- [ ] **7.7** Coach section is accessible from the panel

### Slide Layouts (18 Types)
#### Academic Layouts
- [ ] **8.19** Layout picker shows all 18 options
- [ ] **8.20** Switching layout preserves content where applicable
- [ ] **8.21** Each layout renders with correct structural regions
#### Per-Layout Rendering Details
- [ ] **8.22** title_slide: renders a centered custom title/subtitle block plus ContentBlockList for body content (`slide-renderer.tsx:139-152`)
- [ ] **8.23** title_content: renders SlideTitle + separate subtitle + ContentBlockList in two regions (`slide-renderer.tsx:186`, `:189`)
- [ ] **8.24** two_column: renders SlideTitle + left ContentBlockList + right ContentBlockList (`slide-renderer.tsx:192`)
- [ ] **8.26** quote_slide: renders quote block attribution conditionally (`slide-renderer.tsx:212`)
- [ ] **8.28** image_text: renders SlideTitle + image (or placeholder "Image placeholder") + text ContentBlockList (`slide-renderer.tsx:246`, `:265`, `:270`)
- [ ] **8.29** chart_slide: renders SlideTitle + SimpleChartPreview (or "Chart placeholder") + ContentBlockList (`slide-renderer.tsx:282`, `:285`, `:288`)
- [ ] **8.30** table_slide: renders SlideTitle + SimpleTablePreview or ContentBlockList fallback (`slide-renderer.tsx:305`, `:307-308`)
- [ ] **8.31** bibliography_slide: renders SlideTitle + BibliographyBlockRenderer or ContentBlockList fallback (`slide-renderer.tsx:333`, `:335-336`)
- [ ] **8.32** results_summary: renders SlideTitle + stat blocks grid (2/3/4 cols adaptive) + chart blocks grid + callout blocks + other blocks (`slide-renderer.tsx:438`, `:441-479`)
- [ ] **8.33** key_findings: renders SlideTitle + numbered items list + bottom callout conditional (`slide-renderer.tsx:509`, `:530`, `:545`)
- [ ] **8.34** methodology: renders SlideTitle + left methodology block or fallback list, plus right detail/callout cards or fallback list (`slide-renderer.tsx:374-418`)
- [ ] **8.35** timeline_slide: renders SlideTitle + TimelineBlockRenderer or ContentBlockList fallback (`slide-renderer.tsx:558`, `:560-561`)
- [ ] **8.36** stat_overview: renders stat blocks in responsive grid (3 cols for ≤3, 2x2 for 4, 3-col+rows for 5+) with optional bottom content (`slide-renderer.tsx:581-602`)
- [ ] **8.37** big_number: renders large stat value (3.5em) if stat_result block exists, otherwise large title (2em) with body content (`slide-renderer.tsx:638`)
- [ ] **8.38** blank: renders ContentBlockList only (`slide-renderer.tsx:320`)
- [ ] **8.39** Slide number display conditional on `showSlideNumber && slideNumber != null` (`slide-renderer.tsx:110`)
- [ ] **8.40** Subtitle display conditional for title_content and section_header layouts (`slide-renderer.tsx:149`, `:172`, `:685`, `:700`)

### Content Block Types (20+)
- [ ] **9.23** Each block type renders correctly in preview mode
- [ ] **9.24** Each block type is editable in edit mode
- [ ] **9.25** KaTeX math renders valid LaTeX expressions
- [ ] **9.26** Mermaid diagram renders valid Mermaid syntax
#### Content Block Editor -- Inline Editing UI
- [ ] **9.28** Clicking a block sets it as active via editingIndex state (`content-block-editor.tsx:56`, `:95`)
- [ ] **9.29** Active block shows border highlight `border-brand/50 bg-surface-raised/50` (`content-block-editor.tsx:93`)
- [ ] **9.30** Move up button shown when block index > 0 (`content-block-editor.tsx:100`, `:102`)
- [ ] **9.31** Move down button shown when block index < last (`content-block-editor.tsx:108`, `:110`)
