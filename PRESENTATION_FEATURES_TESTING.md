# Presentation Module -- Feature Testing Checklist

> **Module:** Presentation (AI-Powered Slide Decks)
> **Routes:** `/presentation`, `/presentation/new`, `/presentation/[deckId]`, `/presentation/audience`
> **Date:** 2026-03-09
> **Branch:** `test/codex-feature-tests`

---

## Table of Contents

1. [List Page (`/presentation`)](#1-list-page-presentation)
2. [New Presentation -- Blank Mode (`/presentation/new`)](#2-new-presentation--blank-mode-presentationnew)
3. [New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)](#3-new-presentation--ai-generationwizard-presentationnewmodeai)
4. [Deck Editor -- Layout & Navigation (`/presentation/[deckId]`)](#4-deck-editor--layout--navigation-presentationdeckid)
5. [Slide Outline Sidebar (Left Column)](#5-slide-outline-sidebar-left-column)
6. [Slide Canvas (Center Column)](#6-slide-canvas-center-column)
7. [Design Panel (Right Column)](#7-design-panel-right-column)
8. [Slide Layouts (18 Types)](#8-slide-layouts-18-types)
9. [Content Block Types (20+)](#9-content-block-types-20)
10. [Toolbar Actions](#10-toolbar-actions)
11. [Agent Panel (AI Chat)](#11-agent-panel-ai-chat)
12. [Coach Panel](#12-coach-panel)
13. [Defense Prep Panel](#13-defense-prep-panel)
14. [Comments Panel](#14-comments-panel)
15. [Analytics Panel](#15-analytics-panel)
16. [Share Panel](#16-share-panel)
17. [Version History Panel](#17-version-history-panel)
18. [Recordings Panel](#18-recordings-panel)
19. [Presenter Mode](#19-presenter-mode)
20. [Audience View (`/presentation/audience`)](#20-audience-view-presentationaudience)
21. [AI Per-Slide Tools (14 Actions)](#21-ai-per-slide-tools-14-actions)
22. [Preset Themes (20+)](#22-preset-themes-20)
23. [API Routes](#23-api-routes)
24. [Store & State Management](#24-store--state-management)
25. [Loading, Error & Edge Cases](#25-loading-error--edge-cases)
26. [Custom Theme Builder](#26-custom-theme-builder)
27. [Social Export](#27-social-export)
28. [Reference Import Panel](#28-reference-import-panel)

---

## 1. List Page (`/presentation`)

| # | Feature | Status |
|---|---------|--------|
| 1.1 | Header displays "Presentations" | |
| 1.2 | Subtitle displays "Create AI-powered slide decks from your research" | |
| 1.3 | "+ New Presentation" button visible and links to `/presentation/new` | |
| 1.4 | Grid cards render with theme preview thumbnail | |
| 1.5 | Grid cards show title, slide count, modified date | |
| 1.6 | AI badge shown on AI-generated decks | |
| 1.7 | Delete button triggers confirmation dialog "Delete this presentation?" | |
| 1.8 | Confirming delete removes the deck from the list | |
| 1.9 | Cancelling delete keeps the deck intact | |

- [ ] **1.10** Loading state renders 3 skeleton cards
- [ ] **1.11** Empty state shows "No presentations yet" message
- [ ] **1.12** Empty state shows "Create Presentation" CTA button
- [ ] **1.13** CTA navigates to `/presentation/new`
- [ ] **1.14** Cards are clickable and navigate to `/presentation/[deckId]`

---

## 2. New Presentation -- Blank Mode (`/presentation/new`)

| # | Feature | Status |
|---|---------|--------|
| 2.1 | Blank mode is the default view (no query param) | |
| 2.2 | Title field is required with placeholder "e.g., CRISPR Gene Therapy in Sickle Cell Disease" | |
| 2.3 | Description field is optional | |
| 2.4 | Audience selector shows 5 buttons | |

- [ ] **2.5** Audience option: General
- [ ] **2.6** Audience option: Thesis Defense
- [ ] **2.7** Audience option: Conference
- [ ] **2.8** Audience option: Journal Club
- [ ] **2.9** Audience option: Classroom
- [ ] **2.10** Only one audience button is selectable at a time
- [ ] **2.11** Theme picker is visible and functional
- [ ] **2.12** "Create Blank Deck" button is present
- [ ] **2.13** Submitting without title shows validation error
- [ ] **2.14** Submitting with valid title creates deck and navigates to editor
- [ ] **2.15** Toggle/link to switch to AI mode

---

## 3. New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)

### Step 0 -- Select Source

- [ ] **3.1** Step 0 header displays "Select Source"
- [ ] **3.2** SourceSelector component renders
- [ ] **3.3** Source option: Papers
- [ ] **3.4** Source option: Document
- [ ] **3.5** Source option: Text
- [ ] **3.6** Source option: Deep Research
- [ ] **3.7** Source option: References
- [ ] **3.8** Source option: URL
- [ ] **3.9** Source option: Import Deck

#### Source Selector Details

- [ ] **3.42** Source option grid renders from SOURCE_OPTIONS array (`source-selector.tsx:121`, `:124`)
- [ ] **3.43** Papers icon: BookOpen (`source-selector.tsx:68`)
- [ ] **3.44** Document icon: FileText (`source-selector.tsx:74`)
- [ ] **3.45** Text icon: TextT (`source-selector.tsx:80`)
- [ ] **3.46** References icon: BookBookmark (`source-selector.tsx:86`)
- [ ] **3.47** URL icon: Globe (`source-selector.tsx:92`)
- [ ] **3.48** Import Deck icon: Presentation (`source-selector.tsx:98`)
- [ ] **3.49** Selected source shows `border-brand bg-brand/5 text-brand` (`source-selector.tsx:127`)
- [ ] **3.50** Papers path: comma-separated IDs input with placeholder "e.g., 1, 2, 3" (`source-selector.tsx:139`, `:142`, `:146`, `:153`)
- [ ] **3.51** Papers helper: "Enter the IDs of papers from your library to generate slides from" (`source-selector.tsx:157`)
- [ ] **3.52** Document path: numeric ID input with placeholder "Enter document ID" (`source-selector.tsx:162`, `:164`, `:168`, `:169`)
- [ ] **3.53** Document helper: "Enter the ID of a synthesis document to generate slides from" (`source-selector.tsx:173`)
- [ ] **3.54** Text path: textarea with placeholder "Paste your research content, abstract, or notes here..." and character count (`source-selector.tsx:178`, `:180`, `:183-184`, `:188`)
- [ ] **3.55** URL path: UrlSourceInput component with per-URL rows (`source-selector.tsx:192-193`)
- [ ] **3.56** URL helper: "Paste a URL to any article, blog post, or documentation page" (`source-selector.tsx:450`)
- [ ] **3.57** URL input placeholder: "https://example.com/article" (`source-selector.tsx:503`)
- [ ] **3.58** URL "Add" button disabled until valid URL (`source-selector.tsx:507-508`, `:511`, `:516`)
- [ ] **3.59** Each URL row shows Globe icon and fetched title/word count (`source-selector.tsx:453`, `:458`, `:461`, `:466`)
- [ ] **3.60** URL fetch error shown inline per-source (`source-selector.tsx:470`)
- [ ] **3.61** "Fetch Preview" button per unfetched URL (`source-selector.tsx:473`, `:478`)
- [ ] **3.62** Fetching state shows CircleNotch spinner (`source-selector.tsx:481`)
- [ ] **3.63** Remove URL button with Trash icon (`source-selector.tsx:483`, `:486`)
- [ ] **3.64** Max 3 URLs: input area replaced by "Maximum of 3 URLs reached" (`source-selector.tsx:492`, `:521`, `:522`)
- [ ] **3.65** Import Deck path: ImportDeckInput component with .pptx file upload (`source-selector.tsx:196-197`)
- [ ] **3.66** Import upload button: "Choose .pptx file" / "Parsing presentation..." while loading (`source-selector.tsx:311`, `:314-315`)
- [ ] **3.67** Import errors: WarningCircle icon with error text (`source-selector.tsx:318`, `:320`)
- [ ] **3.68** Password-protected PPTX error: "Password-protected files are not supported" (`source-selector.tsx:264`)
- [ ] **3.69** Import preview: shows deck title plus "N slides from {fileName}" with Clear button (`source-selector.tsx:325`, `:329-331`, `:337`, `:343`)
- [ ] **3.70** Import slide preview: up to 6 slides shown with "Slide N" label (`source-selector.tsx:348`, `:351`)
- [ ] **3.71** Import preview text truncated per slide (`source-selector.tsx:356`)
- [ ] **3.72** "Showing 6 of N imported slide previews." when > 6 slides (`source-selector.tsx:363`, `:365`)
- [ ] **3.73** Import warnings rendered when present (`source-selector.tsx:369`)
- [ ] **3.74** References path: shows selected count and "Clear & re-import" button (`source-selector.tsx:204`, `:206`, `:210`, `:213`, `:216`)
- [ ] **3.75** References selected summary renders per-reference with BookBookmark icon (`source-selector.tsx:220`, `:225`)
- [ ] **3.76** References fallback: opens ReferenceImportPanel when none selected (`source-selector.tsx:239`)
- [ ] **3.77** API: POST /api/slides/fetch-url for URL preview (`source-selector.tsx:406`)

### Step 1 -- Template & Audience

- [ ] **3.11** Step 1 header displays "Template & Audience"
- [ ] **3.12** TemplateSelector component renders

| # | Audience Option | Status |
|---|-----------------|--------|
| 3.13 | General | |
| 3.14 | Thesis Defense | |
| 3.15 | Conference | |
| 3.16 | Journal Club | |
| 3.17 | Classroom | |
| 3.18 | Grant Presentation | |
| 3.19 | Poster Session | |
| 3.20 | Systematic Review | |
| 3.21 | Patient Case | |
| 3.22 | Grand Rounds | |

- [ ] **3.23** Selecting audience and template advances to Step 2

### Step 2 -- Configure

- [ ] **3.24** Step 2 header displays "Configure"
- [ ] **3.25** Title field is editable
- [ ] **3.26** Slide count field defaults to 12
- [ ] **3.27** Theme key selector is functional
- [ ] **3.28** Instructions textarea is available
- [ ] **3.29** Citation style: APA
- [ ] **3.30** Citation style: MLA
- [ ] **3.31** Citation style: Chicago
- [ ] **3.32** Citation style: Vancouver
- [ ] **3.33** Citation style: Harvard
- [ ] **3.34** Structure preview renders based on configuration
- [ ] **3.35** Advancing to Step 3 triggers generation

### Step 3 -- Generate

- [ ] **3.36** Step 3 header displays "Generate"
- [ ] **3.37** Preprocess stream initiates and shows progress
- [ ] **3.38** Generation step runs after preprocessing
- [ ] **3.40** Error during generation shows meaningful message
- [ ] **3.41** Back button works to return to previous steps

---

## 4. Deck Editor -- Layout & Navigation (`/presentation/[deckId]`)

- [ ] **4.1** Three-column layout renders: sidebar (left), canvas (center), panel (right)
- [ ] **4.2** Left sidebar is ~w-64 width
- [ ] **4.3** Right panel is ~w-72 width
- [ ] **4.4** Center canvas fills remaining space
- [ ] **4.5** Editor loads deck data from deckId route param

---

## 5. Slide Outline Sidebar (Left Column)

- [ ] **5.1** SlideOutlineSidebar component renders at w-64
- [ ] **5.2** Slide thumbnails render at 0.35 scale
- [ ] **5.3** Clicking a thumbnail selects that slide in the canvas
- [ ] **5.4** Active slide is visually highlighted
- [ ] **5.5** Drag-and-drop reorders slides
- [ ] **5.6** Reorder persists after dropping
- [ ] **5.7** Comment badges appear on slides with comments
- [ ] **5.8** Delete button is present on each slide entry
- [ ] **5.9** Deleting a slide removes it from the list
- [ ] **5.10** Add new slide button/action is available

---

## 6. Slide Canvas (Center Column)

- [ ] **6.1** SlideCanvas component renders
- [ ] **6.2** Preview mode displays slide read-only
- [ ] **6.3** Edit mode enables inline editing
- [ ] **6.4** Toggle between Preview and Edit modes
- [ ] **6.5** Title field is editable in edit mode
- [ ] **6.6** Subtitle field is editable in edit mode
- [ ] **6.7** Content blocks are editable in edit mode
- [ ] **6.8** Changes reflect immediately in the sidebar thumbnail
- [ ] **6.9** Slide respects the selected theme styling

---

## 7. Design Panel (Right Column)

- [ ] **7.1** DesignPanel component renders at w-72
- [ ] **7.2** Theme picker section is present and functional
- [ ] **7.3** Selecting a theme updates the canvas immediately
- [ ] **7.4** Layout picker section is present
- [ ] **7.5** Changing layout reorganizes the current slide
- [ ] **7.6** AI tools section is accessible
- [ ] **7.7** Coach section is accessible from the panel

---

## 8. Slide Layouts (18 Types)

### Standard Layouts

| # | Layout | Status |
|---|--------|--------|
| 8.1 | title_slide | |
| 8.2 | title_content | |
| 8.3 | two_column | |
| 8.4 | three_column | |
| 8.5 | section_header | |
| 8.6 | image_text | |
| 8.7 | chart_slide | |
| 8.8 | table_slide | |
| 8.9 | quote_slide | |
| 8.10 | comparison | |
| 8.11 | blank | |

### Academic Layouts

| # | Layout | Status |
|---|--------|--------|
| 8.12 | big_number | |
| 8.13 | stat_overview | |
| 8.14 | results_summary | |
| 8.15 | key_findings | |
| 8.16 | methodology | |
| 8.17 | timeline_slide | |
| 8.18 | bibliography_slide | |

- [ ] **8.19** Layout picker shows all 18 options
- [ ] **8.20** Switching layout preserves content where applicable
- [ ] **8.21** Each layout renders with correct structural regions

### Per-Layout Rendering Details

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

---

## 9. Content Block Types (20+)

| # | Block Type | Description | Status |
|---|-----------|-------------|--------|
| 9.1 | text | Plain text block | |
| 9.2 | bullets | Bulleted list | |
| 9.3 | image | Image embed | |
| 9.4 | chart | Chart/graph visualization | |
| 9.5 | table | Data table | |
| 9.6 | citation | Formatted citation | |
| 9.7 | quote | Blockquote styling | |
| 9.8 | math | KaTeX rendered math | |
| 9.9 | diagram | Mermaid diagram rendering | |
| 9.10 | code | Monospace code block | |
| 9.11 | callout | Highlighted callout box | |
| 9.12 | stat_result | Statistical result display | |
| 9.13 | bibliography | Bibliography list | |
| 9.14 | timeline | Timeline visualization | |
| 9.15 | shape | SVG/vector shape | |
| 9.16 | divider | Horizontal divider | |
| 9.17 | toggle | Expandable/collapsible section | |
| 9.18 | embed | External embed (iframe) | |
| 9.19 | nested_card | Card within a slide | |
| 9.20 | infographic | Infographic block | |
| 9.21 | illustration | Illustration block | |
| 9.22 | media | Audio/video media block | |

- [ ] **9.23** Each block type renders correctly in preview mode
- [ ] **9.24** Each block type is editable in edit mode
- [ ] **9.25** KaTeX math renders valid LaTeX expressions
- [ ] **9.26** Mermaid diagram renders valid Mermaid syntax

### Content Block Editor -- Inline Editing UI

#### Block Management

- [ ] **9.28** Clicking a block sets it as active via editingIndex state (`content-block-editor.tsx:56`, `:95`)
- [ ] **9.29** Active block shows border highlight `border-brand/50 bg-surface-raised/50` (`content-block-editor.tsx:93`)
- [ ] **9.30** Move up button shown when block index > 0 (`content-block-editor.tsx:100`, `:102`)
- [ ] **9.31** Move down button shown when block index < last (`content-block-editor.tsx:108`, `:110`)
- [ ] **9.32** Delete block button with Trash icon (`content-block-editor.tsx:117`, `:120`)
- [ ] **9.33** Add block menu shows content categories (BLOCK_CATEGORIES.content) (`content-block-editor.tsx:135`)
- [ ] **9.34** Add block menu shows media categories (BLOCK_CATEGORIES.media) (`content-block-editor.tsx:145`)
- [ ] **9.35** "More" toggle button expands academic block categories (`content-block-editor.tsx:156`, `:159`, `:170`)
- [ ] **9.36** Academic categories visible when showAllBlocks=true (`content-block-editor.tsx:172`)

#### Text Block Editor

- [ ] **9.37** Style selector dropdown (Title/Subtitle/Body/Caption) shown when active (`content-block-editor.tsx:204`, `:210-213`)
- [ ] **9.38** Text content editable via EditableText component (`content-block-editor.tsx:218`)

#### Bullets Block Editor

- [ ] **9.39** "Numbered" checkbox to toggle ordered/unordered (`content-block-editor.tsx:232`, `:237`, `:240`)
- [ ] **9.40** Each bullet item editable via EditableText (`content-block-editor.tsx:244`, `:251`)
- [ ] **9.41** Remove bullet button shown when active and items > 1 (`content-block-editor.tsx:258`, `:260`)
- [ ] **9.42** "+ Add item" button to append new bullet (`content-block-editor.tsx:271`, `:273`, `:276`)

#### Quote Block Editor

- [ ] **9.43** Quote text editable via EditableText (`content-block-editor.tsx:288`)
- [ ] **9.44** Attribution field with placeholder "Attribution" (`content-block-editor.tsx:291`, `:293`, `:295`)

#### Citation Block Editor

- [ ] **9.45** Citation text editable (`content-block-editor.tsx:303`, `:305`)
- [ ] **9.46** Source field with placeholder "Source" (`content-block-editor.tsx:308`, `:310`, `:312`)
- [ ] **9.47** DOI field with placeholder "DOI (e.g., 10.1000/xyz123)" (`content-block-editor.tsx:318`, `:320`)
- [ ] **9.48** Year field with placeholder "Year" (`content-block-editor.tsx:324`, `:326`)

#### Image Block Editor

- [ ] **9.49** Image preview when URL exists (`content-block-editor.tsx:336`)
- [ ] **9.50** Alt text field with placeholder "Alt text" shown when active (`content-block-editor.tsx:343-344`, `:346`, `:348`)

#### Table Block Editor

- [ ] **9.51** Header cells editable via EditableText when active (`content-block-editor.tsx:370`, `:372`, `:375`)
- [ ] **9.52** Body cells editable via EditableText when active (`content-block-editor.tsx:388`, `:390`, `:392`, `:395`)

#### Math Block Editor

- [ ] **9.53** "LaTeX Math" label with MathOperations icon (`content-block-editor.tsx:420`, `:421`)
- [ ] **9.54** "Display mode" checkbox when active (`content-block-editor.tsx:422`, `:427`, `:430`)
- [ ] **9.55** Expression textarea with placeholder `e.g., E = mc^2 or \frac{a}{b}` (`content-block-editor.tsx:436`, `:439`)
- [ ] **9.56** Caption field with placeholder "Caption" shown when caption exists and active (`content-block-editor.tsx:441`, `:444`, `:446`)

#### Diagram Block Editor

- [ ] **9.57** "Mermaid Diagram" label with TreeStructure icon (`content-block-editor.tsx:456`, `:457`)
- [ ] **9.58** Diagram type selector with options: Flowchart, Sequence, Class Diagram, Gantt, Mind Map, Timeline, PRISMA Flow (`content-block-editor.tsx:458`, `:461`, `:464-470`)
- [ ] **9.59** Syntax textarea with placeholder (`content-block-editor.tsx:476`, `:479`)

#### Code Block Editor

- [ ] **9.60** "Code" label with Code icon (`content-block-editor.tsx:488`, `:489`)
- [ ] **9.61** Language input with placeholder "Language" when active (`content-block-editor.tsx:490`, `:493`, `:495`)
- [ ] **9.62** Code textarea with placeholder "// Your code here" (`content-block-editor.tsx:501`, `:505`)

#### Callout Block Editor

- [ ] **9.63** Style selector dropdown with options: Info, Warning, Success, Key Finding, Limitation, Methodology, Clinical Note (`content-block-editor.tsx:521`, `:524`, `:527-533`)
- [ ] **9.64** Callout title editable when block has title (`content-block-editor.tsx:536`, `:537`, `:539`)
- [ ] **9.65** Callout body text editable (`content-block-editor.tsx:544`, `:546`)

#### Stat Result Block Editor

- [ ] **9.66** Label field with placeholder "Metric name" (`content-block-editor.tsx:557`, `:559`, `:561`)
- [ ] **9.67** Value field (`content-block-editor.tsx:563`, `:565`)
- [ ] **9.68** CI field with placeholder "95% CI" when active (`content-block-editor.tsx:570`, `:574`, `:576`)
- [ ] **9.69** p-value field with placeholder "p-value" when active (`content-block-editor.tsx:580`, `:582`)
- [ ] **9.70** Interpretation text shown when present (`content-block-editor.tsx:587`)

#### Bibliography Block Editor

- [ ] **9.71** Header shows "Bibliography ({style.toUpperCase()})" (`content-block-editor.tsx:597`, `:599`)
- [ ] **9.72** Entry list renders all entries (`content-block-editor.tsx:603`)

#### Timeline Block Editor

- [ ] **9.73** "Timeline" header with Clock icon (`content-block-editor.tsx:617`, `:618`)
- [ ] **9.74** Entry label editable via EditableText (`content-block-editor.tsx:621`, `:635`, `:637`)
- [ ] **9.75** Date field with placeholder "Date" (`content-block-editor.tsx:646`, `:652`)
- [ ] **9.76** Description field editable when present (`content-block-editor.tsx:655`, `:658`)
- [ ] **9.77** Date and description shown in read mode (`content-block-editor.tsx:669`, `:670`)
- [ ] **9.79** "+ Add milestone" button to append entry (`content-block-editor.tsx:677`, `:686`)
- [ ] **9.80** Timeline entry status colors: completed=#22C55E, in_progress=theme.primaryColor, default=#94A3B8 (`content-block-editor.tsx:627-628`)

#### Divider Block Editor

- [ ] **9.81** Style picker with solid/dashed/gradient options (`content-block-editor.tsx:712`, `:714`, `:717`, `:720`)

#### Unknown Block

- [ ] **9.82** Fallback displays "Unknown block type:" label (`content-block-editor.tsx:732`)

### Chart Block Rendering Details

- [ ] **9.83** Bar chart: BarChart with CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar per dataset (`chart-block.tsx:201-208`)
- [ ] **9.84** Line chart: LineChart with CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line per dataset (`chart-block.tsx:215-222`)
- [ ] **9.85** Pie chart: PieChart with Pie and Cell per data point, Tooltip (`chart-block.tsx:233-248`)
- [ ] **9.86** Donut chart: PieChart with inner radius Pie, Cell per point, Tooltip (`chart-block.tsx:260-276`)
- [ ] **9.87** Scatter chart: ScatterChart with CartesianGrid, XAxis, YAxis, Tooltip, Scatter per dataset (`chart-block.tsx:286-292`)
- [ ] **9.88** Area chart: AreaChart with CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area per dataset (`chart-block.tsx:299-306`)
- [ ] **9.89** Radar chart: RadarChart with PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar per dataset, Legend (`chart-block.tsx:313-320`)
- [ ] **9.90** Stacked bar chart: BarChart with stacked Bar components and Legend (`chart-block.tsx:327-334`)
- [ ] **9.91** Funnel chart: FunnelChart with Funnel, Tooltip, LabelList (`chart-block.tsx:346-349`)
- [ ] **9.92** Waterfall chart: BarChart with per-bar Cell colors (blue=total, green=increase, red=decrease) (`chart-block.tsx:359-369`)
- [ ] **9.93** Treemap: Treemap with custom TreemapContent, Tooltip (`chart-block.tsx:384-391`)
- [ ] **9.94** Gauge: SVG arc with color thresholds (red <33%, amber <66%, green >=66%) (`chart-block.tsx:410`, `:418`)
- [ ] **9.95** Forest plot: table layout with Study/Effect Size/ES columns, per-study rows, Overall summary diamond (`chart-block.tsx:473-525`)
- [ ] **9.97** "No chart data" empty state text (`chart-block.tsx:68`)
- [ ] **9.98** Title shown conditionally above chart (`chart-block.tsx:89`)
- [ ] **9.99** ResponsiveContainer wrapping (except forest_plot and gauge) (`chart-block.tsx:98`, `:101`)
- [ ] **9.100** xAxisLabel and yAxisLabel conditionally displayed (`chart-block.tsx:203-204`)
- [ ] **9.101** Legend shown conditionally when `showLegend !== false` (`chart-block.tsx:206`, `:220`, `:304`, `:320`, `:332`)

### Infographic Block Rendering Details

#### Infographic Variants

- [ ] **9.103** Process flow: circular steps with connector lines/arrows between items (`infographic-block.tsx:131-166`)
- [ ] **9.104** Cycle: circular layout with items positioned around circumference (`infographic-block.tsx:177`)
- [ ] **9.105** Hierarchy: root node at top with child nodes below, connected by lines (`infographic-block.tsx:216`, `:225`)
- [ ] **9.106** Pyramid: stacked layers narrowing upward (`infographic-block.tsx:256`)
- [ ] **9.107** Comparison grid: side-by-side items for comparison (`infographic-block.tsx:310`)
- [ ] **9.108** Venn diagram: overlapping circles (`infographic-block.tsx:346`)
- [ ] **9.109** Matrix: four-quadrant grid layout (`infographic-block.tsx:404-438`)
- [ ] **9.110** Radial: center node with radiating spokes to outer items (`infographic-block.tsx:442-476`)
- [ ] **9.112** Checklist: items with done/active/pending states, alternating row bands, and checkmark on done (`infographic-block.tsx:521-563`)
- [ ] **9.113** Cause-effect: effect node with branching causes (`infographic-block.tsx:566-600`)
- [ ] **9.114** Icon array: grid of repeated icon items with legend counts (`infographic-block.tsx:604-657`)
- [ ] **9.115** Pictograph: repeated icon units with fractional last unit for ratio display (`infographic-block.tsx:643`, `:674`, `:688`, `:700`)

#### Common Infographic Properties

- [ ] **9.117** Per-item opacity applied when `item.opacity != null` (`infographic-block.tsx:63`, `:136`, `:181`)
- [ ] **9.118** Per-item border when `item.borderColor` present (`infographic-block.tsx:147`, `:183`)
- [ ] **9.119** Per-item bold weight when `item.bold` (`infographic-block.tsx:151`, `:186`)
- [ ] **9.120** Highlighted items get drop-shadow glow effect (`infographic-block.tsx:63`)
- [ ] **9.121** Description text shown conditionally per item (`infographic-block.tsx:154`, `:189`, `:237`, `:392`, `:428`, `:500`)
- [ ] **9.122** Value text shown conditionally (`infographic-block.tsx:196`, `:554`)
- [ ] **9.123** Title shown conditionally above infographic (`infographic-block.tsx:856`)
- [ ] **9.124** Caption shown conditionally below (`infographic-block.tsx:870`)
- [ ] **9.125** Interactive mode renders SvgTooltip for hover details (`infographic-block.tsx:868`)
- [ ] **9.126** Checklist done items show strikethrough text (`infographic-block.tsx:544-550`)
- [ ] **9.127** Checklist active items show filled circle indicator (`infographic-block.tsx:541-542`)

---

## 10. Toolbar Actions

| # | Button | Icon | Behavior | Status |
|---|--------|------|----------|--------|
| 10.1 | Edit/Preview | -- | Toggles canvas mode | |
| 10.2 | AI Agent | Robot | Opens AgentPanel | |
| 10.3 | Defense Prep | Target (purple) | Opens DefensePrepPanel | |
| 10.4 | Analytics | ChartBar (blue) | Opens AnalyticsPanel | |
| 10.5 | Comments | ChatCircle (amber + badge) | Opens CommentsPanel | |
| 10.6 | Version History | ClockCounterClockwise (teal) | Opens VersionHistoryPanel | |
| 10.7 | Recordings | VideoCamera | Opens RecordingsPanel | |
| 10.8 | Export PPTX | -- | Exports deck as .pptx file | |
| 10.9 | Export PDF | -- | Exports deck as .pdf file | |
| 10.10 | Share | ShareNetwork | Opens SharePanel | |
| 10.11 | Presenter Mode | -- | Opens presenter mode overlay | |

- [ ] **10.12** Comments badge shows unresolved count
- [ ] **10.13** Only one right panel is open at a time
- [ ] **10.14** Clicking active panel button closes it

---

## 11. Agent Panel (AI Chat)

- [ ] **11.1** AgentPanel renders as chat interface
- [ ] **11.2** Text input field for custom commands
- [ ] **11.3** Send button submits the command
- [ ] **11.4** Response streams and renders in the chat

### Quick Actions

| # | Action | Status |
|---|--------|--------|
| 11.5 | "Shorten All Slides" | |
| 11.6 | "Add Citations Everywhere" | |
| 11.7 | "Improve Flow" | |
| 11.8 | "Generate Bibliography" | |
| 11.9 | "Adapt for Different Audience" | |
| 11.10 | "Restructure Deck" | |

- [ ] **11.11** Quick action buttons trigger the corresponding AI command
- [ ] **11.12** Custom command input accepts freeform text (up to 2000 chars)
- [ ] **11.13** Undo action reverts the last agent change
- [ ] **11.14** Redo action re-applies a reverted change
- [ ] **11.15** Agent returns modifiedSlides and summary
- [ ] **11.16** Modified slides are applied to the deck

---

## 12. Coach Panel

- [ ] **12.1** CoachPanel renders with "Run Coach" button
- [ ] **12.2** Clicking "Run Coach" triggers evaluation API call
- [ ] **12.3** Overall score displays as X/10
- [ ] **12.4** Structure dimension bar renders with score
- [ ] **12.5** Evidence dimension bar renders with score
- [ ] **12.6** Narrative dimension bar renders with score
- [ ] **12.7** Design dimension bar renders with score
- [ ] **12.8** Audience Fit dimension bar renders with score
- [ ] **12.9** Suggestions are grouped per slide
- [ ] **12.10** Each suggestion is actionable/readable
- [ ] **12.11** Re-running coach updates the scores

---

## 13. Defense Prep Panel

### Configuration

- [ ] **13.1** DefensePrepPanel renders

| # | Difficulty Level | Status |
|---|-----------------|--------|
| 13.2 | Friendly | |
| 13.3 | Moderate | |
| 13.4 | Tough | |
| 13.5 | Adversarial | |

### Focus Areas

| # | Focus Area | Status |
|---|-----------|--------|
| 13.6 | Methodology | |
| 13.7 | Statistics | |
| 13.8 | Interpretation | |
| 13.9 | Clinical Relevance | |
| 13.10 | Limitations | |
| 13.11 | Theory | |

- [ ] **13.12** Multiple focus areas can be selected simultaneously
- [ ] **13.13** Starting a session generates a question
- [ ] **13.14** User can submit an answer to the question
- [ ] **13.15** Evaluation of the answer is returned
- [ ] **13.16** Follow-up questions are generated based on conversation
- [ ] **13.17** Session summary is available after ending the session
- [ ] **13.18** Conversation history is maintained during the session

### Defense Prep Panel UI Details

- [ ] **13.19** Panel header shows "Defense Prep" with GraduationCap icon (`defense-prep-panel.tsx:282`, `:283`)
- [ ] **13.20** Descriptive help text below header (`defense-prep-panel.tsx:288`)
- [ ] **13.21** Difficulty section labeled "Difficulty" (`defense-prep-panel.tsx:295`)
- [ ] **13.22** Difficulty buttons rendered from DIFFICULTIES array (`defense-prep-panel.tsx:298`, `:301`)
- [ ] **13.23** Selected difficulty shows `border-brand bg-brand/5` (`defense-prep-panel.tsx:304`)
- [ ] **13.24** Focus areas labeled "Focus Areas (optional)" (`defense-prep-panel.tsx:319`)
- [ ] **13.25** Focus area buttons rendered from FOCUS_AREAS array (`defense-prep-panel.tsx:322`, `:325`)
- [ ] **13.26** Selected focus area shows `border-brand bg-brand/10 text-brand` (`defense-prep-panel.tsx:328`)
- [ ] **13.27** "Start Session" button with Play icon (`defense-prep-panel.tsx:343`, `:352`, `:353`)
- [ ] **13.28** Start button disabled when slides.length === 0 (`defense-prep-panel.tsx:344`, `:347`)
- [ ] **13.29** Default difficulty is "moderate" (`defense-prep-panel.tsx:95`)
- [ ] **13.30** Default focus areas is empty array (`defense-prep-panel.tsx:96`)
- [ ] **13.31** Session summary screen shows Trophy icon and "Session Complete" header (`defense-prep-panel.tsx:365`, `:366`)
- [ ] **13.32** Summary score displays a large numeric score with separate "out of 10" label (`defense-prep-panel.tsx:371-374`)
- [ ] **13.33** "Strengths" list with Target icon (`defense-prep-panel.tsx:379`, `:381`, `:385`)
- [ ] **13.34** "Areas for Improvement" list with Lightning icon (`defense-prep-panel.tsx:399`, `:401`, `:405`)
- [ ] **13.35** "Suggested Talking Points" list shown when talkingPoints > 0 (`defense-prep-panel.tsx:417`, `:420`, `:423`)
- [ ] **13.36** "New Session" button with ArrowRight icon resets to config (`defense-prep-panel.tsx:439`, `:442`, `:443`)
- [ ] **13.37** Q&A session header: "Q&A Session" with GraduationCap icon (`defense-prep-panel.tsx:456`, `:458`)
- [ ] **13.38** "End" button with Stop icon (`defense-prep-panel.tsx:465`, `:469`, `:470`)
- [ ] **13.39** End button disabled while loading (`defense-prep-panel.tsx:466`)
- [ ] **13.40** Presenter messages right-aligned with brand bg and white text (`defense-prep-panel.tsx:481`, `:492`)
- [ ] **13.41** Reviewer messages left-aligned with surface bg and border (`defense-prep-panel.tsx:481`, `:484`, `:486`, `:492`)
- [ ] **13.42** Reviewer messages show GraduationCap icon (`defense-prep-panel.tsx:486`)
- [ ] **13.43** Category badge shown on reviewer messages when category exists (`defense-prep-panel.tsx:498`, `:500`)
- [ ] **13.44** Slide reference badge "Slide N" shown when relatedSlideIndex exists (`defense-prep-panel.tsx:505`, `:507`)
- [ ] **13.45** Suggested answer reveal uses "Show suggested answer" / "Hide suggested answer" toggle text with Eye/EyeSlash icons (`defense-prep-panel.tsx:525`, `:528`, `:531`, `:536`)
- [ ] **13.46** Revealed answer content shown when toggle active (`defense-prep-panel.tsx:538`)
- [ ] **13.47** Loading state "Reviewing your response..." with CircleNotch spinner (`defense-prep-panel.tsx:550`, `:553`, `:557`)
- [ ] **13.48** Error state shows Warning icon with error message (`defense-prep-panel.tsx:567`, `:570`)
- [ ] **13.49** Answer input: placeholder "Type your answer...", disabled while loading (`defense-prep-panel.tsx:581-583`)
- [ ] **13.50** Send button: PaperPlaneRight when idle, CircleNotch when loading (`defense-prep-panel.tsx:592`, `:595`, `:600-603`)
- [ ] **13.51** Send button disabled when loading or input empty (`defense-prep-panel.tsx:592`)
- [ ] **13.52** Footer shows "Question N · {difficulty} difficulty" (`defense-prep-panel.tsx:608`)
- [ ] **13.53** API calls to /api/presentations/defense-prep (`defense-prep-panel.tsx:139`)
- [ ] **13.54** Focus areas omitted from request when none selected (`defense-prep-panel.tsx:152`)

---

## 14. Comments Panel

- [ ] **14.1** CommentsPanel renders
- [ ] **14.2** Filter: All comments
- [ ] **14.3** Filter: Unresolved comments
- [ ] **14.4** Filter: Resolved comments
- [ ] **14.5** Comments are grouped by slide
- [ ] **14.6** Adding a new comment on a slide
- [ ] **14.7** Replying to an existing comment
- [ ] **14.8** Resolving a comment marks it as resolved
- [ ] **14.9** Deleting a comment removes it
- [ ] **14.10** Comment count badge in toolbar updates accordingly

---

## 15. Analytics Panel

- [ ] **15.1** AnalyticsPanel renders
- [ ] **15.2** Total Views metric displays
- [ ] **15.3** Unique Viewers metric displays
- [ ] **15.4** Average Duration metric displays
- [ ] **15.5** Completion Rate metric displays
- [ ] **15.6** Slide heatmap shows per-slide engagement
- [ ] **15.7** Views over time chart renders
- [ ] **15.8** Data updates on panel open/refresh

---

## 16. Share Panel

- [ ] **16.1** SharePanel renders
- [ ] **16.2** Public toggle switches between public and private
- [ ] **16.3** Share URL is displayed when public
- [ ] **16.4** Copy URL button copies link to clipboard
- [ ] **16.5** Password field allows setting an access password
- [ ] **16.6** Expiration setting allows time-limited sharing
- [ ] **16.7** Toggling off public disables the share link

---

## 17. Version History Panel

- [ ] **17.1** VersionHistoryPanel renders
- [ ] **17.2** Save current version creates a snapshot
- [ ] **17.3** Version list shows saved versions with timestamps
- [ ] **17.4** Restore version replaces current deck with selected version
- [ ] **17.5** Delete version removes it from the list

---

## 18. Recordings Panel

- [ ] **18.1** RecordingsPanel renders
- [ ] **18.2** Recording setup UI (mic/camera permissions)
- [ ] **18.3** Start recording begins capture
- [ ] **18.4** Pause/Resume toggles recording state
- [ ] **18.5** Mute/Unmute toggles audio capture
- [ ] **18.6** Stop recording ends and saves the recording
- [ ] **18.7** Recording library lists saved recordings
- [ ] **18.8** Playback of saved recordings

---

## 19. Presenter Mode

### Display & Layout

- [ ] **19.2** Two-panel layout: main slide (2/3) + presenter panel (1/3)
- [ ] **19.3** Presenter panel shows speaker notes
- [ ] **19.4** Presenter panel shows timer
- [ ] **19.5** Presenter panel shows next slide preview

### Transitions

| # | Transition | Status |
|---|-----------|--------|
| 19.6 | Fade | |
| 19.7 | Slide | |
| 19.8 | Zoom | |
| 19.9 | Morph (framer-motion) | |

### Keyboard Controls

| # | Key | Action | Status |
|---|-----|--------|--------|
| 19.10 | Right Arrow | Next slide | |
| 19.11 | Left Arrow | Previous slide | |
| 19.12 | Space | Trigger animation | |
| 19.13 | Escape | Exit presenter mode | |
| 19.14 | B | Black screen | |
| 19.15 | W | White screen | |
| 19.16 | N | Toggle presenter panel | |
| 19.17 | Home / End | Jump to first / last slide | |

### Broadcasting

- [ ] **19.18** BroadcastChannel "presenter-slide-sync" is created on enter
- [ ] **19.19** Slide index changes are broadcast to audience view
- [ ] **19.20** Screen mode changes (black/white/normal) are broadcast
- [ ] **19.21** Init message is sent when audience connects

### Presenter Mode UI Details

- [ ] **19.22** Empty slide state shows "No visible slides to present." with "Exit Presentation" button (`presenter-mode.tsx:634`, `:636`, `:639`)
- [ ] **19.23** Timer auto-starts on mount (elapsed=0, running=true) (`presenter-mode.tsx:129-130`)
- [ ] **19.24** Timer section labeled "Timer" with Clock icon (`presenter-mode.tsx:773`, `:774`)
- [ ] **19.25** Timer pause/resume button toggles between Pause and Play icons (`presenter-mode.tsx:781`, `:783`, `:785-788`)
- [ ] **19.26** Presenter panel toggle: "Hide Panel (N)" / "Show Panel (N)" text (`presenter-mode.tsx:729`, `:732`)
- [ ] **19.27** Main slide area width: 70% with panel, 100% without (`presenter-mode.tsx:656`)
- [ ] **19.28** "Audience" button opens separate audience window (`presenter-mode.tsx:763`, `:767`)
- [ ] **19.29** Speaker notes section labeled "Speaker Notes" (`presenter-mode.tsx:830`)
- [ ] **19.30** Notes font size selector: Small/Medium/Large buttons with active state (`presenter-mode.tsx:842-867`)
- [ ] **19.31** Notes render via ReactMarkdown when present, "No speaker notes for this slide." otherwise (`presenter-mode.tsx:885`, `:911`)
- [ ] **19.32** Notes links rendered as clickable anchors (`presenter-mode.tsx:894`)
- [ ] **19.33** Build progress: "Build X of Y" display with reveal status (`presenter-mode.tsx:833`)
- [ ] **19.34** Reveal sequence complete hint: "Next click advances slide" (`presenter-mode.tsx:837`)
- [ ] **19.35** Next slide preview labeled "Next Slide" with SlideRenderer at small scale (`presenter-mode.tsx:918`, `:921`, `:927`)
- [ ] **19.36** "End of presentation" shown when on last slide (`presenter-mode.tsx:941`)
- [ ] **19.37** Prev button disabled when currentIndex <= 0 (`presenter-mode.tsx:950`, `:954`)
- [ ] **19.38** Next button disabled when on the last slide and `maxRevealOrder === 0 || revealedOrder >= maxRevealOrder` (`presenter-mode.tsx:958-960`, `:964`)
- [ ] **19.39** Jump-to-slide form: input with placeholder "Slide #", "Jump" button (`presenter-mode.tsx:970`, `:981`, `:987`, `:988`, `:995`)
- [ ] **19.40** Jump input accepts only digits (`presenter-mode.tsx:981`)
- [ ] **19.41** Keyboard help text rendered at bottom (`presenter-mode.tsx:1000`)
- [ ] **19.42** Black screen overlay: "Black Screen" text on black bg (`presenter-mode.tsx:710`, `:716`, `:719`)
- [ ] **19.43** White screen overlay: "White Screen" text on white bg (`presenter-mode.tsx:710`, `:716`, `:719`)
- [ ] **19.44** Black (B) toggle button with Moon icon (`presenter-mode.tsx:796`, `:799`, `:805`, `:806`)
- [ ] **19.45** White (W) toggle button with Sun icon (`presenter-mode.tsx:810`, `:813`, `:819`, `:820`)
- [ ] **19.46** Fullscreen toggle button with ArrowsOut icon (`presenter-mode.tsx:735`, `:737-738`, `:740`)
- [ ] **19.47** Exit button with X icon (`presenter-mode.tsx:743`, `:745-746`, `:748`)
- [ ] **19.48** Morph transition uses LayoutGroup + AnimatePresence + motion.div (`presenter-mode.tsx:659-661`)
- [ ] **19.49** Morph transition assigns MORPH_TITLE_ID to matching titles (`presenter-mode.tsx:702`)
- [ ] **19.50** Morph transition assigns MORPH_SUBTITLE_ID to matching subtitles (`presenter-mode.tsx:703`)
- [ ] **19.51** Slide transition direction: enter from right (100%) when forward, from left (-100%) when backward (`presenter-mode.tsx:92`, `:97`)
- [ ] **19.52** Slide area click triggers goNext (`presenter-mode.tsx:682`)
- [ ] **19.53** Reveal order state tracks animation progress (revealedOrder, activeRevealOrder, currentStepIndex) (`presenter-mode.tsx:232-234`)

---

## 20. Audience View (`/presentation/audience`)

- [ ] **20.1** Audience view page renders
- [ ] **20.2** Receives slide index via BroadcastChannel
- [ ] **20.3** Receives screen-mode messages
- [ ] **20.4** Receives init message on connection
- [ ] **20.5** Loading state shows "Waiting for presenter connection..." on black screen
- [ ] **20.6** Normal mode displays the current slide
- [ ] **20.7** Black screen mode renders black overlay
- [ ] **20.8** White screen mode renders white overlay
- [ ] **20.9** Slide transitions match presenter transitions

---

## 21. AI Per-Slide Tools (14 Actions)

| # | AI Action | Expected Behavior | Status |
|---|-----------|-------------------|--------|
| 21.1 | Shorten | Reduces slide content length | |
| 21.2 | Expand | Adds more detail to content | |
| 21.3 | Rephrase | Rewrites content with different wording | |
| 21.4 | Suggest Image | Proposes relevant image for slide | |
| 21.5 | Add Citations | Inserts academic citations | |
| 21.6 | Improve Bullets | Enhances bullet point quality | |
| 21.7 | Regenerate | Completely regenerates slide content | |
| 21.8 | Add Math | Inserts KaTeX math expressions | |
| 21.9 | Add Diagram | Inserts Mermaid diagram block | |
| 21.10 | Add Chart | Inserts chart visualization | |
| 21.11 | Strengthen Evidence | Adds supporting evidence | |
| 21.12 | Simplify Language | Reduces complexity of language | |
| 21.13 | Add Speaker Notes | Generates presenter notes | |
| 21.14 | Translate | Translates slide content to target language | |

- [ ] **21.15** Each action sends request to `/api/presentations/edit-slide`
- [ ] **21.16** Modified content blocks replace current blocks on success
- [ ] **21.17** Loading indicator shown during AI processing
- [ ] **21.18** Error message displayed on failure

---

## 22. Preset Themes (20+)

| # | Theme Key | Status |
|---|-----------|--------|
| 22.1 | modern | |
| 22.2 | dark | |
| 22.3 | thesis | |
| 22.4 | vibrant | |
| 22.5 | academic | |
| 22.6 | minimal | |
| 22.7 | nature | |
| 22.8 | clinical | |
| 22.9 | lancet | |
| 22.10 | nejm | |
| 22.11 | nature_journal | |
| 22.12 | ieee | |
| 22.13 | midnight | |
| 22.14 | gradient_blue | |
| 22.15 | executive | |
| 22.16 | startup | |
| 22.17 | consulting | |
| 22.18 | harvard | |
| 22.19 | oxford | |
| 22.20 | medical | |
| 22.21 | aurora | |

- [ ] **22.22** Theme picker renders preview swatches for all themes
- [ ] **22.23** Selecting a theme applies it to the entire deck
- [ ] **22.24** Theme change is reflected in sidebar thumbnails
- [ ] **22.25** Custom themes are supported and persistable

---

## 23. API Routes

### POST `/api/presentations/generate`

- [ ] **23.1** Accepts title (1-500 chars), preprocessedData (1-200k), audienceType
- [ ] **23.2** Optional params: slideCount, themeKey
- [ ] **23.3** Uses model `claude-sonnet-4-20250514`
- [ ] **23.4** Returns generated deck structure
- [ ] **23.5** Validates title length (1-500)
- [ ] **23.6** Validates preprocessedData length (1-200k)
- [ ] **23.7** Returns 400 on invalid input

### POST `/api/presentations/preprocess`

- [ ] **23.8** Accepts sourceType and data payload
- [ ] **23.9** Streams response back to client
- [ ] **23.10** Handles all 7 source types (papers/document/text/deep_research/references/url/import_deck)

### POST `/api/presentations/agent`

- [ ] **23.11** Accepts deckId, command (1-2000 chars), slides (1-100)
- [ ] **23.12** Returns modifiedSlides array and summary string
- [ ] **23.13** Validates command length (1-2000)
- [ ] **23.14** Validates slides count (1-100)

### POST `/api/presentations/coach`

- [ ] **23.15** Accepts slides for evaluation
- [ ] **23.16** Returns CoachEvaluation with overall score and 5 dimensions

### POST `/api/presentations/defense-prep`

- [ ] **23.17** Accepts difficulty, focusAreas, conversationHistory
- [ ] **23.18** Returns question, answer evaluation, follow-ups

### POST `/api/presentations/edit-slide`

- [ ] **23.19** Accepts action and contentBlocks
- [ ] **23.20** Returns modified content blocks
- [ ] **23.21** Uses model `claude-haiku-4-5-20251001`

---

## 24. Store & State Management

> **File:** `slides-store.ts` (Zustand)

### Key State Fields

- [ ] **24.1** `deckId` -- tracks active deck identifier
- [ ] **24.2** `slides` -- array of slide objects
- [ ] **24.3** `activeSlideId` -- currently selected slide
- [ ] **24.4** `themeKey` -- selected theme identifier
- [ ] **24.5** `themeConfig` -- resolved theme configuration
- [ ] **24.6** `customThemes` -- user-defined theme storage
- [ ] **24.7** `mode` -- edit vs. preview mode
- [ ] **24.8** `rightPanel` -- which right panel is active
- [ ] **24.9** `agentMode` -- agent panel state
- [ ] **24.10** `transition` -- current transition type
- [ ] **24.11** `isPresenting` -- presenter mode flag
- [ ] **24.12** `saveStatus` -- saved/saving/unsaved indicator

### Undo/Redo

- [ ] **24.13** Undo reverts the last state change
- [ ] **24.14** Redo re-applies a reverted change
- [ ] **24.15** Undo/redo history caps at 50 entries
- [ ] **24.16** Exceeding 50 entries drops the oldest entry

---

## 25. Loading, Error & Edge Cases

- [ ] **25.1** Error banner: "Presentations unavailable" renders on module-level failure
- [ ] **25.2** Error message: "We couldn't load the presentation builder. Please try again." renders on editor load failure
- [ ] **25.3** Retry action on error state reloads the editor
- [ ] **25.4** Network timeout during AI generation shows timeout error
- [ ] **25.5** Concurrent edits do not corrupt slide data
- [ ] **25.6** Large deck (50+ slides) renders without performance degradation
- [ ] **25.7** Navigating away from unsaved changes prompts a warning
- [ ] **25.8** Exporting empty deck is handled gracefully
- [ ] **25.9** Invalid theme key falls back to default theme
- [ ] **25.10** Missing deckId in URL shows meaningful error

---

## 26. Custom Theme Builder

> **File:** `src/components/slides/shared/custom-theme-builder.tsx`

### Modal & Header

- [ ] **26.1** Modal renders with title "Custom Theme Builder" (`custom-theme-builder.tsx:205`)
- [ ] **26.2** "Start from" dropdown with scratch option and preset entries (`custom-theme-builder.tsx:208`, `:214`, `:215`)

### Colors Section

- [ ] **26.3** Colors section header displays "Colors" (`custom-theme-builder.tsx:226`)
- [ ] **26.4** Primary picker via ThemeColorField (`custom-theme-builder.tsx:228`)
- [ ] **26.5** Secondary picker via ThemeColorField (`custom-theme-builder.tsx:229`)
- [ ] **26.6** Background picker via ThemeColorField (`custom-theme-builder.tsx:230`)
- [ ] **26.7** Text picker via ThemeColorField (`custom-theme-builder.tsx:231`)
- [ ] **26.8** Accent picker via ThemeColorField (`custom-theme-builder.tsx:232`)
- [ ] **26.9** Surface picker via ThemeColorField (`custom-theme-builder.tsx:233`)

### Typography Section

- [ ] **26.10** Typography section header "Typography" (`custom-theme-builder.tsx:239`)
- [ ] **26.11** Heading Font dropdown with FONT_OPTIONS (`custom-theme-builder.tsx:242`, `:245`, `:248`)
- [ ] **26.12** Body Font dropdown with FONT_OPTIONS (`custom-theme-builder.tsx:254`, `:257`, `:260`)
- [ ] **26.13** Font Size Scale label "Font Size Scale" and button group (`custom-theme-builder.tsx:266`, `:268`, `:272`)
- [ ] **26.14** Selected font size scale shows active style `bg-brand/10 border-brand` (`custom-theme-builder.tsx:275`)

### Style Section

- [ ] **26.15** Style section header "Style" (`custom-theme-builder.tsx:290`)
- [ ] **26.16** Border Radius button group from BORDER_RADIUS_OPTIONS (`custom-theme-builder.tsx:293`, `:295`, `:299`)
- [ ] **26.17** Shadow Style button group from SHADOW_OPTIONS (`custom-theme-builder.tsx:314`, `:316`, `:320`)
- [ ] **26.18** Card Spacing button group from CARD_SPACING_OPTIONS (`custom-theme-builder.tsx:334`, `:336`, `:340`)

### Advanced Section

- [ ] **26.19** "Advanced" toggle button (`custom-theme-builder.tsx:364`, `:360`)
- [ ] **26.20** Advanced panel visibility conditional on `showAdvanced` (`custom-theme-builder.tsx:366`)
- [ ] **26.21** Code Background color picker (`custom-theme-builder.tsx:368`)
- [ ] **26.22** Callout Background color picker (`custom-theme-builder.tsx:369`)
- [ ] **26.23** Gradient From color picker (`custom-theme-builder.tsx:370`)
- [ ] **26.24** Gradient To color picker (`custom-theme-builder.tsx:371`)
- [ ] **26.25** Border Color picker (`custom-theme-builder.tsx:372`)
- [ ] **26.26** Border Style button group from BORDER_STYLE_OPTIONS (`custom-theme-builder.tsx:374`, `:376`, `:380`)

### Preview Section

- [ ] **26.27** Preview section header "Preview" (`custom-theme-builder.tsx:400`)
- [ ] **26.28** Sample Title text renders (`custom-theme-builder.tsx:416`)
- [ ] **26.29** Body text preview renders (`custom-theme-builder.tsx:426`)
- [ ] **26.30** Accent callout block renders (`custom-theme-builder.tsx:444`)
- [ ] **26.31** Code sample `const x = 42;` renders (`custom-theme-builder.tsx:455`)

### Theme Name & Actions

- [ ] **26.32** Theme Name label and input with placeholder "My Custom Theme" (`custom-theme-builder.tsx:465`, `:470`)
- [ ] **26.33** Name validation: empty name shows "Theme name is required" error (`custom-theme-builder.tsx:476`)
- [ ] **26.34** Name error highlights input border red (`custom-theme-builder.tsx:473`)
- [ ] **26.35** Cancel button closes builder (`custom-theme-builder.tsx:484`, `:481`)
- [ ] **26.36** "Apply Without Saving" button applies theme without persisting (`custom-theme-builder.tsx:491`, `:488`)
- [ ] **26.37** "Save as Custom Theme" button saves and applies (`custom-theme-builder.tsx:498`, `:495`)

### State

- [ ] **26.38** Initial state: config=defaultThemeConfig, themeName="", startFrom="scratch", showAdvanced=false, nameError=false, fontSizeScale="default" (`custom-theme-builder.tsx:118-123`)

---

## 27. Social Export

> **Files:** `src/components/presentation/social-export-modal.tsx`, `src/components/presentation/social-slide-renderer.tsx`

### Format Selection

- [ ] **27.1** Modal opens with no format selected (`social-export-modal.tsx:61`)
- [ ] **27.2** Format grid renders SOCIAL_FORMATS entries (`social-export-modal.tsx:198`)
- [ ] **27.3** Each format card shows icon (when available) and aspect ratio badge (`social-export-modal.tsx:207`, `:217`)
- [ ] **27.4** Clicking format card selects it (`social-export-modal.tsx:204`)
- [ ] **27.5** Header shows "Export for Social Media" when no format selected, "Export as {name}" when selected (`social-export-modal.tsx:180`)
- [ ] **27.6** Back button returns to format grid (`social-export-modal.tsx:173`)
- [ ] **27.7** Close button dismisses modal (`social-export-modal.tsx:163`, `:186`)

### Twitter Thread

- [ ] **27.8** Thread editor shows per-tweet textarea with editable content (`social-export-modal.tsx:236`, `:257`)
- [ ] **27.9** Each tweet shows "Tweet N of M" label (`social-export-modal.tsx:240`)
- [ ] **27.10** Character count shows "/280" suffix (`social-export-modal.tsx:252`)
- [ ] **27.11** Count turns red when > 280 characters (`social-export-modal.tsx:245`)
- [ ] **27.12** Count turns amber when > 260 characters (`social-export-modal.tsx:247`)
- [ ] **27.13** Download .txt button for thread (`social-export-modal.tsx:383`, `:387`)
- [ ] **27.14** Copy Thread button toggles to "Copied!" with Check icon for 2 seconds (`social-export-modal.tsx:390`, `:393`, `:394`)

### Export Options

- [ ] **27.15** "Show “Created with ScholarSync” branding" checkbox (`social-export-modal.tsx:278`, `:281`)
- [ ] **27.16** Slide limit warning when format has maxSlides < total slides (`social-export-modal.tsx:283`)
- [ ] **27.17** Preview grid shows "Preview (N slides)" header (`social-export-modal.tsx:292`)
- [ ] **27.18** Preview uses SocialSlideRenderer component (`social-export-modal.tsx:329`, `:358`)
- [ ] **27.19** Grid columns adapt: portrait formats use 2-3 cols, landscape use 2 (`social-export-modal.tsx:298`)
- [ ] **27.20** Aspect ratio applied from format config (`social-export-modal.tsx:310`)
- [ ] **27.21** Download button shows "Download Images" or "Download PDF" for LinkedIn carousel (`social-export-modal.tsx:412`)
- [ ] **27.22** Exporting state disables download button and shows "Exporting..." with spinner (`social-export-modal.tsx:400`, `:403`, `:406`)
- [ ] **27.23** Export errors logged to console (`social-export-modal.tsx:100`)

### Social Slide Renderer

- [ ] **27.24** Slide number indicator shown when totalSlides > 1 (`social-slide-renderer.tsx:95`)
- [ ] **27.25** Vertical format uses larger padding/gaps than horizontal (`social-slide-renderer.tsx:88`, `:117-119`)
- [ ] **27.26** Title conditionally rendered (`social-slide-renderer.tsx:124`)
- [ ] **27.27** Subtitle conditionally rendered (`social-slide-renderer.tsx:141`)
- [ ] **27.28** Bullet lists support ordered (numbered) and unordered (bullet) (`social-slide-renderer.tsx:199`)
- [ ] **27.29** Excess bullets show `+N more...` text (`social-slide-renderer.tsx:204`, `:212`)
- [ ] **27.30** Quote attribution conditionally shown (`social-slide-renderer.tsx:262`)
- [ ] **27.31** Callout title conditionally shown (`social-slide-renderer.tsx:289`)
- [ ] **27.32** Stat result interpretation conditionally shown (`social-slide-renderer.tsx:346`)
- [ ] **27.33** Branding footer "Created with ScholarSync" conditionally shown (`social-slide-renderer.tsx:368`, `:387`)

---

## 28. Reference Import Panel

> **File:** `src/components/presentation/reference-import-panel.tsx`

### Tabs

- [ ] **28.1** Three import tabs: File Upload, Zotero, DOI Lookup (`reference-import-panel.tsx:299`, `:302`)
- [ ] **28.2** Active tab shows white bg with shadow (`reference-import-panel.tsx:308`)

### File Tab

- [ ] **28.3** Drag-and-drop zone for file upload (`reference-import-panel.tsx:321`, `:329-330`)
- [ ] **28.4** Drop zone highlights on drag: `border-brand bg-brand/5` (`reference-import-panel.tsx:333`)
- [ ] **28.5** FileArrowUp icon changes color on drag (`reference-import-panel.tsx:338`, `:341`)
- [ ] **28.6** Drop text: "Drop a .bib or .ris file here" (`reference-import-panel.tsx:346`)
- [ ] **28.7** "or click to browse" sub-text (`reference-import-panel.tsx:349`)
- [ ] **28.8** Format support text: "Supports BibTeX (.bib), RIS (.ris), and CSL-JSON (.json)" (`reference-import-panel.tsx:352`)
- [ ] **28.9** Hidden file input for click-to-browse (`reference-import-panel.tsx:358`)
- [ ] **28.10** Mendeley tip: "Tip: Export your Mendeley library as BibTeX, then upload here." (`reference-import-panel.tsx:363`)
- [ ] **28.11** Parse errors show error message or fallback "Parse failed" (`reference-import-panel.tsx:100`)
- [ ] **28.12** API: POST /api/references/parse (`reference-import-panel.tsx:75`)

### Zotero Tab

- [ ] **28.13** Instructions with link to zotero.org/settings/keys (`reference-import-panel.tsx:369`, `:372`, `:374`, `:379`)
- [ ] **28.14** "API Key" label and input with placeholder "Your Zotero API key" (`reference-import-panel.tsx:385`, `:390`, `:391`)
- [ ] **28.15** "User ID" label and input with placeholder "Numeric user ID" (`reference-import-panel.tsx:397`, `:401`, `:402`)
- [ ] **28.16** "Connect & Import" button, disabled when loading or fields empty (`reference-import-panel.tsx:408-409`, `:412`)
- [ ] **28.17** Button shows "Fetching..." with CircleNotch spinner while loading (`reference-import-panel.tsx:417-418`, `:422`)
- [ ] **28.18** API: POST /api/references/zotero (`reference-import-panel.tsx:154`)
- [ ] **28.19** Errors show "Zotero fetch failed" fallback (`reference-import-panel.tsx:181`)

### DOI Tab

- [ ] **28.20** Help text: "Look up a single reference by its DOI." (`reference-import-panel.tsx:430`, `:433`)
- [ ] **28.21** DOI input with placeholder "e.g., 10.1038/nature12373" (`reference-import-panel.tsx:438`, `:442`)
- [ ] **28.22** Enter key triggers lookup (`reference-import-panel.tsx:439`)
- [ ] **28.23** "Lookup" button with MagnifyingGlass icon, disabled when loading or empty (`reference-import-panel.tsx:446-447`, `:450`, `:455-458`, `:460`)
- [ ] **28.24** API: POST /api/references/parse for DOI (`reference-import-panel.tsx:200`)
- [ ] **28.25** Errors show "DOI lookup failed" fallback (`reference-import-panel.tsx:222`)

### Error & Loading

- [ ] **28.26** Error banner with Warning icon and dismiss X button (`reference-import-panel.tsx:468`, `:470`, `:472-473`)
- [ ] **28.27** Loading state shows "Processing..." with CircleNotch spinner (`reference-import-panel.tsx:479`, `:481`, `:482`)

### Reference List

- [ ] **28.28** Header shows "N references imported" with count (`reference-import-panel.tsx:487`, `:492`)
- [ ] **28.29** Selected count badge shown when > 0: "(N selected)" (`reference-import-panel.tsx:493`, `:495`)
- [ ] **28.30** "Select all" button (`reference-import-panel.tsx:508`, `:511`)
- [ ] **28.31** "Clear" button (`reference-import-panel.tsx:514`, `:517`)
- [ ] **28.32** Filter toggle button with Funnel icon and CaretUp/CaretDown (`reference-import-panel.tsx:501`, `:504-505`)
- [ ] **28.33** Search input with placeholder "Search references..." (`reference-import-panel.tsx:532-533`)
- [ ] **28.34** Type filter dropdown showing "All types" + unique types (`reference-import-panel.tsx:537`, `:540`, `:543-544`)
- [ ] **28.35** Per-reference row: clickable, selected state with brand border (`reference-import-panel.tsx:559`, `:562`)
- [ ] **28.36** Checkbox indicator: Check icon when selected, empty border otherwise (`reference-import-panel.tsx:571`, `:576-577`)
- [ ] **28.37** Reference title displayed (`reference-import-panel.tsx:587`)
- [ ] **28.38** Authors: first 3 joined, or "Unknown authors" fallback (`reference-import-panel.tsx:587`)
- [ ] **28.39** Journal name shown when present (`reference-import-panel.tsx:593`)
- [ ] **28.40** Remove button with X icon per reference (`reference-import-panel.tsx:602`, `:608`)
- [ ] **28.41** "No references match your filter." empty filter state (`reference-import-panel.tsx:613`, `:615`)
- [ ] **28.42** "Use N Selected Reference{plural}" button, disabled when 0 selected (`reference-import-panel.tsx:622-623`, `:626`, `:631-632`)

---

## Summary

| Section | Total Checks |
|---------|-------------|
| 1. List Page | 14 |
| 2. Blank Mode | 15 |
| 3. AI GenerationWizard | 75 |
| 4. Editor Layout | 5 |
| 5. Slide Outline Sidebar | 10 |
| 6. Slide Canvas | 9 |
| 7. Design Panel | 7 |
| 8. Slide Layouts | 38 |
| 9. Content Block Types | 120 |
| 10. Toolbar Actions | 14 |
| 11. Agent Panel | 16 |
| 12. Coach Panel | 11 |
| 13. Defense Prep Panel | 54 |
| 14. Comments Panel | 10 |
| 15. Analytics Panel | 8 |
| 16. Share Panel | 7 |
| 17. Version History Panel | 5 |
| 18. Recordings Panel | 8 |
| 19. Presenter Mode | 52 |
| 20. Audience View | 9 |
| 21. AI Per-Slide Tools | 18 |
| 22. Preset Themes | 25 |
| 23. API Routes | 21 |
| 24. Store & State | 16 |
| 25. Loading/Error/Edge Cases | 10 |
| 26. Custom Theme Builder | 38 |
| 27. Social Export | 33 |
| 28. Reference Import Panel | 42 |
| **Total** | **690** |

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI and source code but were
> missing from the original document generated by Claude Code.

### Detailed QA Coverage
- [ ] `/presentation` initializes with `loading = true` and calls `getUserDecks()` from a client `useEffect`
- [ ] `/presentation` header action label is `New Presentation` without a leading `+` character
- [ ] List-page loading state renders exactly three pulsing aspect-video rectangles
- [ ] Route-level `src/app/(app)/presentation/loading.tsx` separately renders a skeleton heading plus six `SkeletonCard` placeholders
- [ ] Empty-state CTA button uses `Sparkle` icon and label `Create Presentation`
- [ ] Empty-state helper text explicitly says users can create from papers, documents, or start from scratch
- [ ] Deck-card preview uses the resolved theme background color and a 1px top accent bar based on theme primary color
- [ ] Deck-card delete button is hidden until card hover via `opacity-0 group-hover:opacity-100`
- [ ] Clicking the delete button stops link navigation with both `preventDefault()` and `stopPropagation()`
- [ ] Delete confirmation uses the browser-native prompt text `Delete this presentation?`
- [ ] Successful delete removes the deck optimistically from local state without refetching the list
- [ ] List-page load failures are logged to console and leave the page in a non-loading state without an inline error banner
- [ ] AI badge appears only when `generationStatus === "completed"`, not for other AI-related statuses
- [ ] Modified date on cards is formatted with `toLocaleDateString()` rather than relative time
- [ ] Blank-mode new presentation page renders inside a `Suspense` boundary with a centered `Loading...` fallback
- [ ] New-presentation header back button is icon-only and links to `/presentation`
- [ ] Header title changes between `New Presentation` and `AI Presentation Generator` based on `mode=ai`
- [ ] Blank mode opens with `title`, `description`, and `creating` all empty/false and `audience = "general"`
- [ ] Blank mode opens with `themeKey = "modern"`
- [ ] Title input in blank mode is autofocused on first render
- [ ] Blank-mode title field does not show an inline validation error; it simply keeps `Create Blank Deck` disabled when trimmed title is empty
- [ ] Description textarea is optional, uses three rows, and placeholder `Brief description of your presentation`
- [ ] Audience buttons render in a responsive `2 / 3` column grid depending on viewport width
- [ ] Selected audience button uses `border-brand bg-brand/5`
- [ ] Blank-mode theme picker renders all themes from `PRESET_THEMES`, not a fixed set of four
- [ ] Blank-mode theme tiles render as aspect-video previews with the theme name centered inside
- [ ] `Create Blank Deck` is disabled when `creating` is true even if title is present
- [ ] `Create Blank Deck` swaps its label to `Creating...` while the deck is being created
- [ ] Blank deck creation trims title and description before passing them to `createDeck`
- [ ] Blank deck creation passes `sourceType: "custom"` and `audienceType: audience` to `createDeck`
- [ ] Blank deck creation immediately creates slide 0 as `title_slide` with empty `contentBlocks`
- [ ] Blank deck creation sets the new slide subtitle to trimmed description or fallback text `Click to edit`
- [ ] Blank deck creation redirects directly to `/presentation/{deckId}` after `createSlide` succeeds
- [ ] Blank deck creation failures are logged to console and leave the user on the same page with `creating` reset to false
- [ ] Secondary mode-switch CTA uses a bordered link labeled `Generate with AI`
- [ ] AI wizard step indicator labels read `Select Source`, `Template & Audience`, `Configure`, and `Generate`
- [ ] AI wizard starts on step 0 with `sourceType = "text"` and `title = ""`
- [ ] AI wizard `Next` on step 0 starts disabled because raw text is empty
- [ ] AI wizard supports `references`, `url`, and `import_deck` as real step-0 paths in addition to papers/document/text/deep research
- [ ] Step 0 uses the shared `SourceSelector` grid plus a separate full-width `From Deep Research` card beneath it
- [ ] Step-0 `Reference Library` path is considered valid only when `selectedReferences.length > 0`
- [ ] Step-0 `From URL` path is considered valid only when at least one URL exists and at least one URL has been fetched successfully
- [ ] Step-0 imported-deck path becomes valid as soon as `importedDeck` is non-null
- [ ] URL source allows adding at most three URLs before the input is replaced by `Maximum of 3 URLs reached`
- [ ] URL add button stays disabled until `inputValue` passes `http:` or `https:` URL validation
- [ ] Pressing `Enter` in the URL input triggers the same `addUrl()` path as clicking `Add`
- [ ] Each URL row shows `Fetch Preview` until fetched, then swaps to fetched metadata and hides the button
- [ ] URL fetch failures render inline red text per-source instead of a global wizard error
- [ ] Step-0 imported-reference summary shows `Clear & re-import` only after references exist
- [ ] Imported-reference rows show the first two authors and append `et al.` when more than two authors exist
- [ ] Step-0 imported deck copies `deck.title` into the wizard title only if the title field is still blank
- [ ] Deep Research source exposes a numeric input only while that source is selected
- [ ] Step 1 opens with `templateId = null` and `audienceType = "general"`
- [ ] Step 1 template grid includes a `No Template (Custom)` card in addition to academic templates
- [ ] Selecting `No Template (Custom)` clears `templateId` without changing audience type
- [ ] Selecting a template forces `audienceType` to the template's configured audience type via `onAudienceChange`
- [ ] Template cards show default slide count and optional estimated duration in their top-right metadata
- [ ] Step-1 audience choices are rendered as pill buttons rather than cards
- [ ] Step-1 `Next` is always enabled and does not require a template selection
- [ ] Step-1 `Back` returns to source selection without clearing imported source state
- [ ] Step 2 heading text is `Configure Presentation`
- [ ] Step-2 title input placeholder is `Presentation title`, not the blank-mode example placeholder
- [ ] Step-2 title input is autofocus-enabled when the step mounts
- [ ] Step-2 title is required only by `title.trim().length > 0`
- [ ] Step-2 target slide count uses a range slider, not a numeric text field
- [ ] Range slider minimum is 5 and maximum is 30
- [ ] Step-2 citation style defaults to `apa`
- [ ] Citation style selector renders as flat pill buttons for APA, MLA, Chicago, Vancouver, and Harvard
- [ ] Step-2 theme picker renders a 7-column grid of all preset themes
- [ ] Template structure preview is hidden until a template is selected
- [ ] Template structure preview toggle label reads `Template Structure Preview ({template name})`
- [ ] Expanded structure preview shows slot title, optional marker, one-line guidance, and layout name for each slot
- [ ] Additional instructions textarea is optional and uses exactly three rows
- [ ] Empty additional instructions are sent to the generate API as `undefined`
- [ ] `Generate` button on step 2 uses `Sparkle` icon and moves to step 3 before preprocess completes
- [ ] Step 3 heading text is `Generating Presentation`
- [ ] Step 3 renders three progress rows: `Preprocessing content`, `Generating slides`, and `Generating bibliography`
- [ ] `Generating bibliography` is a simulated client-side step driven by a 1500 ms timeout after slide generation succeeds
- [ ] For `references` source, preprocess rewrites the effective source type to `text` and sends `formatReferencesAsContent(selectedReferences)` as `rawText`
- [ ] For `url` source, preprocess fetches full content from `/api/slides/fetch-url` for each fetched source before calling `/api/presentations/preprocess`
- [ ] URL preprocess concatenates fetched sources into `--- Source: {title} ---` text sections
- [ ] For imported decks, preprocess rewrites the effective source type to `text` and sends `importedDeck.sourceText`
- [ ] Streaming preprocess parsing appends only lines prefixed with `0:`
- [ ] Malformed streamed chunks are skipped without failing the entire preprocess step
- [ ] Step-3 auto-trigger waits 500 ms after preprocess success before starting generation
- [ ] Generation request sends `preprocessedData`, `title`, `audienceType`, `slideCount`, `themeKey`, optional `additionalInstructions`, optional `templateId`, and `citationStyle`
- [ ] Step-3 success banner reads `Generated {slideCount} slides successfully`
- [ ] Step-3 success banner appends `using the {template} template` only when a template is selected
- [ ] Step-3 success CTA label is `Open Presentation`
- [ ] Step-3 error path shows a single inline red banner with the error message and a `Retry` button
- [ ] Retry reruns preprocess only when `preprocessedData` is still empty; otherwise it jumps straight to `handleGenerate()`
- [ ] Step-3 `Back` from the error state resets `error`, `preprocessedData`, and `generationResult`
- [ ] AI wizard does not show a local spinner on the step-2 `Generate` button; progress only becomes visible on step 3
- [ ] Deck editor starts with `isEditing = true`, `exporting = false`, and all slide-over panels closed
- [ ] Editor loads deck data via `getDeck(deckId)` and redirects to `/presentation` on null response or thrown error
- [ ] Initial active slide is always the first returned slide when the deck has at least one slide
- [ ] Editor keeps local `themeKey` and `themeConfig` in sync with the loaded deck theme
- [ ] Autosave for slide title/subtitle/content/speaker notes is debounced by 800 ms through `debouncedSaveSlide`
- [ ] Local slide state updates happen optimistically before `updateSlideAction` is called
- [ ] Debounced save does not expose any visible save-status UI in the editor shell
- [ ] Adding a slide creates a `title_content` slide titled `New Slide`
- [ ] New slide creation seeds content with one body text block: `Click to add content`
- [ ] Adding a slide sets the newly created slide as the active slide
- [ ] Deleting the active slide automatically selects the first remaining slide, or clears selection if no slides remain
- [ ] Slide reordering is optimistic and persists by calling `reorderSlides(deckId, slideIds)`
- [ ] Theme changes in the editor immediately call `updateDeck(deckId, { theme, themeConfig })`
- [ ] Layout changes are applied only to the active slide
- [ ] The editor back link in the left rail header is icon-only and returns to `/presentation`
- [ ] Left rail title is truncated to `max-w-[160px]`
- [ ] `SlideOutlineSidebar` width is fixed by `w-64` on the component root
- [ ] Sidebar header shows live slide count and a plus-icon add button with title `Add slide`
- [ ] Slide thumbnails are rendered through `SlideRenderer` at `scale={0.35}` and wrapped in `pointer-events-none`
- [ ] Drag-reordering visual feedback lowers opacity for the dragged slide and adds a brand ring on the hovered drop target
- [ ] Delete-slide affordance only appears on hover and only when the deck contains more than one slide
- [ ] Sidebar comment badges show total comment count and switch color based on unresolved count
- [ ] Sidebar slide label format is `{index}. {title || "Untitled"}`
- [ ] `SlideCanvas` empty state copy is `Select a slide to start editing`
- [ ] Preview mode shows only the rendered slide inside a centered `max-w-3xl` frame
- [ ] Edit mode shows both the rendered slide preview and a form/editor card beneath it
- [ ] Subtitle input is only rendered for `title_slide`, `title_content`, and `section_header` layouts
- [ ] Content-block editing is delegated entirely to `ContentBlockEditor`
- [ ] `SpeakerNotesPanel` is always mounted below the slide canvas within the center column
- [ ] Toolbar edit toggle label flips between `Editing` and `Preview`
- [ ] Toolbar edit toggle icon flips between `PencilSimple` and `Eye`
- [ ] Toolbar comments button shows an unresolved-count badge only when the count is greater than zero
- [ ] Toolbar `PDF` export button renders only because the editor passes `onExportPdf`
- [ ] `Export PPTX` and `PDF` share the same `exporting` disabled state
- [ ] `Export PPTX` changes its label to `Exporting...` while either export path is active
- [ ] `PDF` button text does not change while exporting; only its disabled styling updates
- [ ] Toolbar `Social Export` button is not rendered in the current editor because no `socialSlides` prop is passed
- [ ] Export PPTX posts to `/api/export/pptx` using the current local slide state
- [ ] Export PDF posts to `/api/export/presentation-pdf` using the current local slide state
- [ ] Successful PPTX export downloads `{deck title}.pptx` without title sanitization
- [ ] Successful PDF export downloads `{deck title}_handout.pdf` without title sanitization at the editor layer
- [ ] Export failures are logged to console only and do not show inline error UI
- [ ] Opening AI Agent closes Defense Prep, Analytics, and Comments if they were open
- [ ] Opening Defense Prep closes AI Agent, Analytics, and Comments if they were open
- [ ] Opening Analytics closes Comments, AI Agent, and Defense Prep if they were open
- [ ] Opening Comments closes Analytics, AI Agent, Defense Prep, and Version History if they were open
- [ ] Opening Version History closes Comments, Analytics, AI Agent, and Defense Prep if they were open
- [ ] Comments, Analytics, Agent, Defense Prep, and Version History slide-over panels each mount as a `w-80` right column
- [ ] `AiToolsDropdown` disables all actions while one AI slide edit is in progress
- [ ] AI slide tools endpoint payload includes `title`, `subtitle`, `contentBlocks`, and `speakerNotes` for the active slide
- [ ] Successful AI slide edits may update both `contentBlocks` and `speakerNotes`
- [ ] `AiToolsDropdown` shows one inline red error line when an action fails
- [ ] `CoachPanel` run button is disabled when the deck has zero slides
- [ ] Coach panel empty state includes descriptive helper copy and a `Run Coach` CTA
- [ ] Successful coach response replaces the CTA state with score bars, suggestions, and per-slide insights
- [ ] Coach suggestions are sorted by priority and capped to the top five items
- [ ] Slide insights navigate to the referenced slide by calling `onNavigateToSlide`
- [ ] `AgentPanel` starts with six quick-action buttons when no chat history exists
- [ ] Agent quick actions disappear once there is at least one message in chat history
- [ ] Agent messages can include `modifiedSlideIds`, which are displayed back to the user in the agent response bubble
- [ ] Agent undo only resets the panel-local `canUndo` state and triggers `onSlidesUpdated()`; it does not restore the prior slide snapshot client-side
- [ ] Agent command input trims whitespace before submission
- [ ] Agent errors are both shown inline and appended as agent chat messages prefixed with `Error:`
- [ ] Defense Prep configuration opens before any Q&A messages are shown
- [ ] Defense Prep default difficulty is `moderate`
- [ ] Defense Prep starts with no focus areas selected
- [ ] Starting a defense session clears prior messages, summary, revealed answers, and question count before fetching the first question
- [ ] Defense Prep API request omits `focusAreas` when none are selected
- [ ] Reviewer messages can prepend `evaluation` text before the generated question
- [ ] Ending a defense session computes a local summary instead of requesting one from the server
- [ ] Resetting the defense session returns the panel to the configuration screen
- [ ] `CommentsPanel` loads all comments on mount via `getComments(deckId)`
- [ ] Comments filter modes are exactly `all`, `unresolved`, and `resolved`
- [ ] Under the `all` filter, the active slide section is still shown even when it has zero comments
- [ ] Comments empty state shows `No comments yet` plus helper copy `Comments on slides will appear here`
- [ ] `useCommentCounts()` silently ignores load errors and exposes `counts`, `totalUnresolved`, and `refresh`
- [ ] `CommentsPanel` close button is local to the slide-over header and does not affect other editor state
- [ ] `SharePanel` loads current settings on mount and shows `Loading share settings...` while waiting
- [ ] Share toggle uses a custom pill switch rather than a checkbox
- [ ] Enabling sharing calls `enableDeckSharing(deckId)` and immediately stores the returned `shareUrl`
- [ ] Disabling sharing calls `disableDeckSharing(deckId)` and flips only `shareEnabled` locally
- [ ] Share link input is read-only and paired with a `Copy` button
- [ ] Copy success swaps the button content to `Copied` for two seconds
- [ ] Expiration date input sets `min` to today's date string in local ISO format
- [ ] Share settings save button remains visible only while sharing is enabled and a share URL exists
- [ ] Share-panel failures are logged to console only and do not surface an inline error message
- [ ] `AnalyticsPanel` fetches `/api/analytics/deck-stats?deckId={id}` on mount
- [ ] Analytics loading state shows spinner plus text `Loading analytics...`
- [ ] Analytics error state is a compact inline red banner saying `Failed to load analytics data`
- [ ] Slide heatmap and time-series charts are rendered only when corresponding data arrays are non-empty
- [ ] `VersionHistoryPanel` auto-clears success messages after three seconds
- [ ] First click on `Restore` or `Delete` enters a confirm state; the destructive action happens on the second click
- [ ] Compare selection caps at two versions and replaces the oldest selected version when a third is chosen
- [ ] In this editor, version comparison is not shown; `onCompareVersions` simply closes the panel
- [ ] Presenter mode is lazily imported and wrapped in a full-screen `Loading presenter mode...` fallback
- [ ] Audience view waits for an `init` message on `BroadcastChannel("presenter-slide-sync")` before rendering slides
- [ ] Audience view posts `{ type: "audience-ready" }` to the broadcast channel on mount
- [ ] Audience view waiting screen is full-screen black with spinner and text `Waiting for presenter connection...`
- [ ] Audience view applies `screenMode` overlays for `black` and `white` on top of the current slide
- [ ] Audience view never renders presenter notes or toolbar controls
- [ ] Module-level error route uses `ErrorDisplay` title `Presentations unavailable` and retry callback `reset`

### Actual Current Behavior Corrections
- [ ] The editor page does not render a visible saved/saving/unsaved status indicator even though autosave is debounced in code
- [ ] Invalid `deckId` navigation redirects to `/presentation` instead of showing a dedicated in-editor error state
- [ ] The main editor implementation does not read from `slides-store.ts`; it keeps its own local React state and only uses the store indirectly through `ThemePicker` custom themes
- [ ] Undo/redo, right-panel store state, and many `slides-store.ts` fields listed in the original doc are not wired into this specific page component
- [ ] Blank-mode submission does not show an inline validation error when title is empty; the primary button is simply disabled
- [ ] AI wizard step 0 does not auto-advance when a source is selected; the user must click `Next`
- [ ] AI generation success does not auto-redirect; it waits for the user to click `Open Presentation`
- [ ] The editor right sidebar is always the design panel; agent/comments/analytics/defense/history mount as additional slide-over columns, not tabs inside the design panel
- [ ] `Social Export` is implemented in `SlideToolbar` but is not reachable from this editor because no `socialSlides` prop is supplied
- [ ] Agent-panel undo currently reports success in chat but does not restore the prior slide snapshot client-side
- [ ] Version comparison is not implemented in the editor; choosing two versions and invoking compare only closes the panel
- [ ] Share-panel failures, export failures, and list-page load failures are console-only in the current UI

---

## Re-Audit Discoveries (Claude Code Pass 2)

> Source-verified patterns extracted from the five largest underdocumented
> components: `slide-renderer.tsx`, `content-block-editor.tsx`,
> `generation-wizard.tsx`, `reference-import-panel.tsx`, and
> `presenter-mode.tsx`.

### SlideRenderer — Layout Rendering (`slide-renderer.tsx`)

#### Theme & Chrome
- [ ] Every slide renders inside an `aspect-video` container with `overflow-hidden`
- [ ] Slide background uses `theme.backgroundColor`, text uses `theme.textColor`, font uses `theme.fontFamily`
- [ ] Top accent bar height is `scale * 4px` using `theme.primaryColor`
- [ ] Base font size is `scale * 16px`; all child sizes use relative `em` units
- [ ] Slide number renders at `bottom-[3%] right-[4%]` with `text-[0.6em] opacity-50` only when `showSlideNumber && slideNumber != null`
- [ ] Theme resolution falls back to `PRESET_THEMES[themeKey]` then `PRESET_THEMES.modern`
- [ ] Slide content area is inset by `p-[6%] pt-[8%]` in a flex-col container

#### Layout-Specific Rendering
- [ ] `title_slide`: title at `text-[2em] font-bold` in `theme.primaryColor` and `theme.headingFontFamily`; subtitle at `text-[1em] opacity-70`; centered vertically
- [ ] `section_header`: accent divider bar (`w-[3em] h-[0.15em] rounded-full`) above title using `theme.accentColor`; title at `text-[1.8em] font-bold`
- [ ] `two_column`: blocks split at `Math.ceil(blocks.length / 2)` into `grid grid-cols-2 gap-[1em]`
- [ ] `three_column`: blocks split into thirds via `Math.ceil(blocks.length / 3)` into `grid grid-cols-3 gap-[0.8em]`
- [ ] `quote_slide`: large left curly quote at `text-[2.5em]` in `theme.accentColor`; text at `text-[1.1em] italic`; attribution at `text-[0.75em] opacity-60` with em-dash
- [ ] `comparison`: each block in a bordered card with `borderColor: theme.accentColor + "40"` in `grid grid-cols-2`
- [ ] `image_text`: image area tinted `theme.primaryColor + "10"`; image left, text right in `grid grid-cols-2`; missing image shows `"Image placeholder"`
- [ ] `chart_slide`: chart block centered via `SimpleChartPreview`; non-chart blocks render below
- [ ] `table_slide`: table block via `SimpleTablePreview`; all blocks as fallback when no table found
- [ ] `blank`: no title rendered; only content blocks fill the flex area
- [ ] `bibliography_slide`: title defaults to `"References"` when falsy; bibliography in two-column mode via `twoColumn` prop
- [ ] `methodology`: `grid grid-cols-5` — left `col-span-3` prefers timeline/diagram, right `col-span-2` prefers callouts in bordered cards
- [ ] `results_summary`: stat grid at top (cols-2/3/4 based on count), then chart grid (cols-1/2), then callouts, then remaining
- [ ] `key_findings`: optional stat at top (`text-[2em] font-extrabold` in `theme.accentColor`); numbered items with `w-[1.4em] h-[1.4em] rounded-full` circles in `theme.primaryColor`
- [ ] `timeline_slide`: horizontal layout when `entries.length <= 6`; vertical otherwise; dots colored by status (completed=`#10B981`, in_progress=`#3B82F6`, default=`#9CA3AF`)
- [ ] `stat_overview`: grid-cols-3 (≤3 stats), grid-cols-2 (4 stats), else grid-cols-3; adds grid-rows-2 when >3
- [ ] `big_number`: value at `text-[3.5em] font-extrabold` in `theme.accentColor`; label at `text-[1.1em] font-semibold`; CI/pValue at `text-[0.65em] opacity-50`
- [ ] `title_content` is the default/fallback layout; subtitle at `text-[0.7em] opacity-60` with negative top margin

#### Content Block Rendering (Read-Only)
- [ ] `text`: 4 styles — title (`text-[1.2em] font-bold`), subtitle (`text-[0.9em] opacity-70`), body (`text-[0.75em]`), caption (`text-[0.65em] opacity-50`); HTML content uses `dangerouslySetInnerHTML`
- [ ] `bullets`: ordered renders `<ol class="list-decimal">`; unordered renders `<ul class="list-disc">`; both at `text-[0.75em] pl-[1.2em]`
- [ ] `image`: with URL renders `next/image` at `max-h-[8em] object-contain`; without URL shows tinted placeholder using `block.data.suggestion ?? block.data.alt`; caption at `text-[0.55em] opacity-50`
- [ ] `citation`: accent-color `border-l-2` left border; source at `text-[0.85em] opacity-60` with em-dash
- [ ] `quote`: accent-color `border-l-[0.15em]` left border; curly quotes around text; attribution at `text-[0.65em] not-italic opacity-60`

##### Chart Rendering (6 Types)
- [ ] Chart palette: 8 hardcoded colors `#4F46E5`, `#06B6D4`, `#10B981`, `#F59E0B`, `#EF4444`, `#8B5CF6`, `#EC4899`, `#14B8A6`
- [ ] `bar`: vertical bars proportional to `val / maxVal` with labels below
- [ ] `line`: SVG polyline with data point circles at each value
- [ ] `pie`: SVG path slices with percentage labels; legend capped at 6 items
- [ ] `scatter`: SVG circles with axes, grid lines, and optional `xAxisLabel` / `yAxisLabel`
- [ ] `area`: filled polygon under line with `fillOpacity={0.15}`
- [ ] `radar`: polygon on radial grid with concentric rings at 25/50/75/100%
- [ ] Chart legend renders only when `showLegend` is true and multiple datasets exist

##### Academic Block Rendering
- [ ] `math`: KaTeX via `katex.renderToString` with `throwOnError: false`; display mode in surface-color container; inline as `<span>`; invalid shows red `"Invalid LaTeX"`; caption at `text-[0.55em] opacity-50`
- [ ] `diagram`: Mermaid async render via `mermaid.render` with `useId`-based instance; initialized `startOnLoad: false, theme: "default"`; error shows `"Diagram preview unavailable"` with type + truncated syntax (200 chars); loading shows `"Rendering diagram..."`
- [ ] `code`: background `theme.codeBackground ?? "#1E1E2E"` with `text-white/90`; language label at `text-[0.45em] font-mono opacity-50`; optional `showLineNumbers` with `select-none opacity-30` gutter; caption support
- [ ] `callout`: 7 types with icon badges — info (#3B82F6,"i"), warning (#F59E0B,"!"), success (#10B981,"✓"), finding (accent,"★"), limitation (#EF4444,"✗"), methodology (#6366F1,"M"), clinical (#14B8A6,"+"); `finding` uses `theme.accentColor`
- [ ] `stat_result`: bordered card with label at `text-[0.6em] opacity-70`, value at `text-[1.3em] font-bold` in `theme.primaryColor`, CI/pValue at `text-[0.5em] opacity-60`
- [ ] `bibliography`: style label uppercase (e.g., `"APA Format"`); numbered `<ol>` at `text-[0.5em]`; two-column when >4 entries or `twoColumn` prop; DOI links as `doi:{doi}`; non-DOI URL links as `[Link]`; `citedOnSlides` badge circles in `theme.accentColor`
- [ ] `timeline`: vertical line `w-[0.1em]` in border color; dots `w-[0.5em] h-[0.5em]`; horizontal variant with `border-2` dots; title at `text-[0.7em] font-semibold`
- [ ] `divider`: gradient uses `linear-gradient` from `gradientFrom ?? primaryColor` to `gradientTo ?? accentColor`; solid uses border-color background; dashed uses `border-top: 0.08em dashed`

---

### ContentBlockEditor — Block Editing (`content-block-editor.tsx`)

#### Block Category System
- [ ] 3 categories: content (`text`, `bullets`, `quote`, `citation`), media (`image`, `chart`, `table`), academic (`math`, `diagram`, `code`, `callout`, `stat_result`, `bibliography`, `timeline`, `divider`)
- [ ] Content + media render as primary add-block row; academic hidden behind `More` toggle
- [ ] Expanded academic row has `border-l-2 border-brand/20` left accent
- [ ] Block labels: `Text`, `Bullets`, `Image`, `Chart`, `Table`, `Citation`, `Quote`, `Math`, `Diagram`, `Code`, `Callout`, `Stat`, `Bibliography`, `Timeline`, `Divider`
- [ ] Academic icons: MathOperations, TreeStructure, Code, Megaphone, ChartBar, BookOpen, Clock, Minus

#### Block Controls & Selection
- [ ] Controls appear on hover when block is active; move-up only when `i > 0`, move-down only when `i < blocks.length - 1`
- [ ] Delete button: `bg-red-500/10 border-red-500/20 text-red-500`; all controls use `stopPropagation`
- [ ] Moving a block updates `editingIndex` to the new position
- [ ] Selected block: `border-brand/50 bg-surface-raised/50`; unselected: `hover:border-border`

#### Block-Specific Editing
- [ ] `text`: style selector (Title/Subtitle/Body/Caption) only when active; `contentEditable` div commits on `blur`
- [ ] `bullets`: `Numbered` checkbox toggles ordered/unordered; per-item Trash only when active and `items.length > 1`; `+ Add item` appends `"New item"`
- [ ] `quote`: accent-color `border-l-2`; attribution placeholder `"Attribution"`
- [ ] `citation`: text + source + DOI (placeholder `"DOI (e.g., 10.1000/xyz123)"`) + Year (`w-16`) fields; DOI/Year only when active
- [ ] `image`: `next/image` at `max-h-32` with `unoptimized`; no-URL placeholder `border-2 border-dashed` at `h-20` showing `suggestion ?? "Image placeholder"`; alt text field only when active
- [ ] `chart`: read-only showing `"{chartType} chart: {title}"` and `"{labels.length} labels, {datasets.length} dataset(s)"`
- [ ] `table`: editable headers and cells via `contentEditable`; header `border-b-2` in `theme.primaryColor`
- [ ] `math`: header `"LaTeX Math"` with MathOperations icon; `"Display mode"` checkbox; textarea 2 rows placeholder `"e.g., E = mc^2 or \frac{a}{b}"`
- [ ] `diagram`: header `"Mermaid Diagram"` with TreeStructure icon; type selector (Flowchart/Sequence/Class Diagram/Gantt/Mind Map/Timeline/PRISMA Flow); textarea 4 rows
- [ ] `code`: header `"Code"` with Code icon; language input `w-20`; textarea 4 rows with `theme.codeBackground ?? "#1E1E2E"` bg and `#E2E8F0` text; placeholder `"// Your code here"`
- [ ] `callout`: type selector (Info/Warning/Success/Key Finding/Limitation/Methodology/Clinical Note); Megaphone icon; color-coded border + bg; title only when `block.data.title` truthy
- [ ] `stat_result`: label placeholder `"Metric name"`; value at `text-lg font-bold` in `theme.primaryColor`; CI placeholder `"95% CI"`; pValue placeholder `"p-value"`
- [ ] `bibliography`: read-only; style label `"Bibliography ({style.toUpperCase()})"` (e.g., `"Bibliography (APA)"`); entries numbered `[1]`, `[2]`, etc.
- [ ] `timeline`: accent-color `border-l-2`; status dots (completed=#22C55E, in_progress=primaryColor, default=#94A3B8); `+ Add milestone` appends `{ label: "New milestone", status: "upcoming" }`
- [ ] `divider`: three style buttons (solid/dashed/gradient); active button `border-brand text-brand`

#### Default Block Values
- [ ] text: `"Enter text here"`, body | bullets: `["First point","Second point"]`, unordered | image: alt `"Image description"`, suggestion `"Add an image"`
- [ ] chart: bar, `"Chart Title"`, labels A/B/C, data 10/20/30 | table: 2 cols, 1 row | citation: `"Citation text"`, `"Author et al., 2024"`
- [ ] quote: `"Quote text"`, `"Author"` | math: `"E = mc^2"`, displayMode true | diagram: flowchart, default graph syntax
- [ ] code: `"// Your code here"`, python | callout: finding, `"Key Finding"`, `"Key finding or note"`
- [ ] stat_result: `"Primary Outcome"`, `"0.73"`, `"95% CI: 0.65-0.81"`, `"p < 0.001"` | bibliography: single APA entry
- [ ] timeline: Phase 1 (completed, Q1 2024) + Phase 2 (in_progress, Q2 2024) | divider: solid
- [ ] toggle: `"Click to expand"`, `"Hidden content goes here"`, defaultOpen false | embed: empty URL, generic, 16:9
- [ ] nested_card: `"Sub-section"`, one nested text block | infographic: process_flow, `"Infographic"`, one item
- [ ] Unknown types fall back to default text block

---

### GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)

#### Step Indicator
- [ ] Labels: `Select Source`, `Template & Audience`, `Configure`, `Generate`
- [ ] Completed steps show `Check` icon; current step: `bg-brand/10 text-brand border-brand`; future: `bg-surface-raised text-ink-muted`
- [ ] Steps separated by `w-8 h-px bg-border` dividers

#### Step 0 — Source Selection
- [ ] Heading `"Select Source Material"` with subheading `"Choose where to generate your presentation from"`
- [ ] Deep Research: full-width card with `Sparkle` icon, text `"From Deep Research"`, description `"Import findings from a Deep Research session"`
- [ ] Deep Research input: `type="number"` placeholder `"Deep Research session ID"`; only renders when `sourceType === "deep_research"`
- [ ] Text validation: `rawText.trim().length > 50`; URL validation: at least one fetched source; Import deck: `importedDeck != null`
- [ ] Disabled Next: `bg-surface-raised text-ink-muted cursor-not-allowed`

#### Step 1 — Template & Audience
- [ ] Heading `"Template & Audience"` sub `"Choose a presentation template and target audience"`
- [ ] Template label: `"Presentation Template"` with `"(optional)"`; uses `TemplateSelector` with `onAudienceChange`
- [ ] 10 audience pill buttons: General, Thesis Defense, Conference, Journal Club, Classroom, Grant Presentation, Poster Session, Systematic Review, Patient Case, Grand Rounds
- [ ] Selected audience: `border-brand bg-brand/5 text-brand`; Next always enabled; Back preserves source state

#### Step 2 — Configure
- [ ] Heading `"Configure Presentation"` sub `"Set title, theme, and generation preferences"`
- [ ] Title placeholder `"Presentation title"` with `autoFocus`; slide count label `"Target Slide Count: {slideCount}"` range min=5 max=30
- [ ] Citation style label `"Citation Style"` as pill buttons; theme label `"Theme"` in `grid grid-cols-7 gap-2`
- [ ] Theme tiles: `aspect-video` with name at `text-[8px] font-bold`; selected: `border-brand ring-1 ring-brand/30`
- [ ] Structure preview toggle: `"Template Structure Preview ({name})"` with CaretUp/CaretDown; `max-h-64 overflow-y-auto`; shows numeric slot index, title, (optional), guidance (line-clamp-1), layout name
- [ ] Instructions label `"Additional Instructions"` `"(optional)"`; placeholder `"e.g., Focus on methodology, include more charts..."`; 3 rows; empty sent as `undefined`
- [ ] Generate button: `Sparkle` icon + `"Generate"`; disabled when `title.trim().length === 0`

#### Step 3 — Generation
- [ ] Heading `"Generating Presentation"` sub `"AI is creating your slide deck"`
- [ ] Progress rows: `"Preprocessing content"`, `"Generating slides"`, `"Generating bibliography"`
- [ ] 4 states: pending (empty circle), loading (CircleNotch brand spin), done (green Check bold), error (red Warning)
- [ ] `handleStartGeneration` calls `setStep(3)` then `handlePreprocess()` — step changes before preprocess
- [ ] `AutoTrigger`: 500ms setTimeout fires `handleGenerate` when `preprocessedData && !generating && !generationResult && !error`
- [ ] Bibliography: simulated 1500ms timeout after slides succeed
- [ ] Success: `"Generated {slideCount} slides successfully"` + optional `" using the {name} template"`; green `bg-green-500/10`; CTA `"Open Presentation"` with ArrowRight
- [ ] Error: red `bg-red-500/10` with Warning; Retry reruns preprocess if empty else handleGenerate; Back resets error+data+result to step 2

#### Preprocessing
- [ ] References → `"text"` + `formatReferencesAsContent`; URL → `"text"` + fetch `/api/slides/fetch-url` per source + concatenate `"--- Source: {title} ---"`; Import → `"text"` + `importedDeck.sourceText`
- [ ] Stream: `getReader()` + `TextDecoder`; only `"0:"` prefixed lines parsed via `JSON.parse`; malformed skipped silently
- [ ] Generate request sends: `preprocessedData`, `title`, `audienceType`, `slideCount`, `themeKey`, optional `additionalInstructions`, optional `templateId`, `citationStyle`

---

### ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)

#### Tab System
- [ ] 3 tabs: `File Upload`, `Zotero`, `DOI Lookup` in `bg-surface-raised rounded-xl` bar
- [ ] Active tab: `bg-white text-ink shadow-sm` / dark `bg-surface text-ink`; inactive: `text-ink-muted hover:text-ink`
- [ ] Switching tabs clears error

#### File Upload
- [ ] `FileArrowUp` icon size 28; text: `"Drop a .bib or .ris file here"` (bold) / `"or click to browse"`
- [ ] Format text: `"Supports BibTeX (.bib), RIS (.ris), and CSL-JSON (.json)"`; accepts `.bib,.ris,.json,.txt`
- [ ] Tip: `"Tip: Export your Mendeley library as BibTeX, then upload here."`
- [ ] Drag active: `border-brand bg-brand/5`; idle: `border-border hover:border-brand/40`
- [ ] File read via `FileReader.readAsText`; input reset after select; POST to `/api/references/parse` with `{ content }`
- [ ] Empty parse: `"No references found in {filename}. Check the file format."`; deduplicates by DOI or title

#### Zotero
- [ ] Link to `zotero.org/settings/keys` with `target="_blank" rel="noopener noreferrer"`
- [ ] API Key `type="password"` placeholder `"Your Zotero API key"`; User ID placeholder `"Numeric user ID"`; `grid grid-cols-2`
- [ ] Button: `"Connect & Import"` / `"Fetching..."` with ArrowsClockwise/CircleNotch; disabled when loading or fields empty
- [ ] Validation: `"Both API Key and User ID are required"`; POST `/api/references/zotero`; empty: `"No items found in this Zotero library."`

#### DOI Lookup
- [ ] Text: `"Look up a single reference by its DOI."`; placeholder `"e.g., 10.1038/nature12373"`
- [ ] Enter key triggers lookup; button: `MagnifyingGlass` icon + `"Lookup"` / CircleNotch; disabled when loading or empty
- [ ] Empty DOI error: `"Enter a DOI to look up"`; POST `/api/references/parse` with `{ doi }`; success clears input

#### Reference List
- [ ] Header: `"{count} reference(s) imported"` + `"({selectedIds.size} selected)"` in brand; `Select all` / `Clear` links
- [ ] Filter: `Funnel` icon toggle; search placeholder `"Search references..."`; filters by title, authors, journal (case-insensitive)
- [ ] Type dropdown only when `refTypes.length > 1` with `"All types"` default
- [ ] Items in `max-h-64 overflow-y-auto`; selected: `bg-brand/5 border-brand/30`; checkbox `w-4 h-4 rounded`
- [ ] Title `text-xs font-medium line-clamp-2`; authors: first 3 + `" et al."` when >3; year in parens; journal italic
- [ ] Remove X uses `stopPropagation`; empty filter: `"No references match your filter."`
- [ ] Use button: `"Use {count} Selected Reference{plural}"` with Check; disabled at 0 selected

#### Loading & Error
- [ ] Loading: `"Processing..."` with CircleNotch in `bg-brand/5 border-brand/20`
- [ ] Error: `bg-red-500/10 border-red-500/20 text-red-500` with Warning + X dismiss

---

### PresenterMode — Presentation Delivery (`presenter-mode.tsx`)

#### Transitions
- [ ] 5 types: `none` (0 duration), `fade` (0.3s opacity), `slide` (spring stiffness:300 damping:32 direction-aware), `zoom` (0.28s scale 0.92→1→1.07), `morph` (0.3s crossfade + layoutId)
- [ ] Per-slide `transition` overrides global; `AnimatePresence` uses `mode="sync"` for morph, `mode="wait"` for others
- [ ] Morph: `computeMorphIds` + `MORPH_TITLE_ID` / `MORPH_SUBTITLE_ID` from `morph-matcher`

#### Hidden Slides & Empty State
- [ ] Hidden slides filtered via `slide.hidden`; total count = visible only
- [ ] Empty: `"No visible slides to present."` + `"Exit Presentation"` button on black bg

#### Timer
- [ ] Auto-starts; updates every 250ms; format `MM:SS` zero-padded; Pause/Play icons with aria-labels
- [ ] Pause preserves elapsed via offset tracking

#### Presenter Panel
- [ ] `w-[30%] min-w-[320px]` bg `#090b12`; `border-l border-white/10`
- [ ] Slide counter: `"Slide {X} / {Y}"`; Audience button: `Monitor` icon → popup `/presentation/audience` at 1280×720
- [ ] Timer: `Clock` icon `text-emerald-400` + `"Timer"` label; value `font-mono tabular-nums`
- [ ] Screen buttons: `"Black (B)"` Moon icon, `"White (W)"` Sun icon; active: `bg-white text-black`

#### Speaker Notes
- [ ] Header `"Speaker Notes"` uppercase; progress `"Build {current} of {total}"` + optional click/auto counts + `" • Next click advances slide"`
- [ ] Rendered via `ReactMarkdown` + `remark-gfm`; links `target="_blank"`; bold `text-white`; empty: `"No speaker notes for this slide."` italic
- [ ] Auto-scroll to top on slide change; font size S/M/L toggle (text-sm/base/lg); active: `bg-white text-black`

#### Next Slide Preview
- [ ] Header `"Next Slide"`; shows title or `"Slide {n+1}"`; `SlideRenderer` at `scale={0.42}`; last slide: `"End of presentation"`

#### Navigation
- [ ] Prev disabled at index 0; Next disabled at last slide when `maxRevealOrder === 0 || revealedOrder >= maxRevealOrder`
- [ ] Jump input: `inputMode="numeric" pattern="[0-9]*"` placeholder `"Slide #"` + `"Jump"` button

#### Keyboard
- [ ] ArrowRight / Space: next; Enter: jump (if digits) or next; ArrowLeft: prev; Backspace: delete digit or prev
- [ ] Escape: exit fullscreen + onExit; Home: first slide; End: last slide; B: toggle black; W: toggle white; N: toggle panel
- [ ] Digit keys accumulate in buffer; 1500ms auto-clear; ignored in input/textarea/contentEditable (except Escape)
- [ ] Hint: `"Keys: Right/Space/Enter next, Left/Backspace prev, Home/End, digits + Enter jump, B black, W white."`

#### Touch/Swipe
- [ ] Threshold: 50px horizontal, must exceed 1.5× vertical; swipe left = next, swipe right = prev

#### Screen Overlays
- [ ] Black: `bg-black text-white/50` text `"Black Screen"`; White: `bg-white text-black/50` text `"White Screen"`; both `uppercase tracking-[0.2em]`

#### Fullscreen & Exit
- [ ] Fullscreen: `ArrowsOut` icon, `aria-label="Toggle fullscreen"`, `title="Fullscreen"`
- [ ] Exit: `X` icon, `bg-black/70 hover:bg-red-600/80`, `aria-label="Exit presentation"`
- [ ] Panel toggle: `"Hide Panel (N)"` / `"Show Panel (N)"`; main area transitions `w-[70%]` ↔ `w-full` with `duration-200`

#### BroadcastChannel
- [ ] Channel `"presenter-slide-sync"`; listens for `{ type: "audience-ready" }`
- [ ] On ready: sends `{ type: "init" }` with slides, masters, themeKey, themeConfig, screenMode
- [ ] Sends `{ type: "slide", index }` on slide change; `{ type: "screen-mode", mode }` on mode change
- [ ] Channel created on mount, closed on unmount

#### Animation Sequencing
- [ ] Uses `computeAnimationSequence` + `countClickSteps` from `animation-sequencer`
- [ ] Click-triggered steps on user input; auto-triggered steps via timers with relative delays
- [ ] Reveal resets to order 0 on slide change; auto-step timers cleared on change/unmount
- [ ] Clicking main slide area calls `goNext`

---

## Codex Verification Pass Discoveries

- [ ] `src/app/(app)/presentation/error.tsx` is a real module error boundary and was not documented directly: it renders `ErrorDisplay` with title `Presentations unavailable`, passes the thrown `error`, and wires retry to `reset`
- [ ] `src/app/(app)/presentation/loading.tsx` is a real loading route and was not documented directly: it renders one `Skeleton` header plus six `SkeletonCard` placeholders in a responsive `1 / 2 / 3` column grid
- [ ] `src/app/presentation/audience/page.tsx` remains undercovered as its own file: it creates `BroadcastChannel("presenter-slide-sync")`, posts `{ type: "audience-ready" }` on mount, waits for `init`, and applies black/white screen overlays without presenter notes or controls
- [ ] `/api/presentations/preprocess` internals remain underdocumented: auth + rate limiting run before a zod schema check, references are accepted as `rawText` or `referenceContent`, empty source material returns `400 "No source content provided"`, and preprocessing failures return `500 "Preprocessing failed"`
- [ ] `/api/presentations/generate` internals remain underdocumented: the deck is created before generation, `generationStatus` transitions through `processing` / `completed` / `failed`, unsupported slide layouts fall back to `title_content`, and route-level failures return `500 "Generation failed"`
- [ ] Cleanup behavior still lacks explicit coverage: `generation-wizard.tsx` clears the `AutoTrigger` timeout, `presenter-mode.tsx` clears the timer interval, auto-step timers, jump-buffer timeout, keydown listener, and `BroadcastChannel`, `slide-renderer.tsx` cancels Mermaid updates via a `cancelled` flag, and the audience view closes its broadcast channel on unmount
- [ ] Accessibility coverage is still incomplete: `SourceSelector` source cards and `ReferenceImportPanel` tabs are button groups without `role="tablist"` / `role="tab"` or `aria-selected`, while `presenter-mode.tsx` does provide `aria-label`s on fullscreen, exit, timer, and jump controls
- [ ] Mobile/responsive behavior is still lightly documented: `SourceSelector` changes from `grid-cols-2` to `md:grid-cols-3` to `xl:grid-cols-6`, `NewPresentationPage` uses `grid-cols-2 sm:grid-cols-3` for audience options, `ReferenceImportPanel` keeps a fixed two-column Zotero form, and `presentation/loading.tsx` shifts from 1 to 2 to 3 columns
- [ ] Import-tree files still not covered by dedicated sections include `template-selector.tsx`, `speaker-notes-panel.tsx`, `recordings-panel.tsx`, `src/app/(app)/presentation/error.tsx`, `src/app/(app)/presentation/loading.tsx`, `src/app/presentation/audience/page.tsx`, `/api/presentations/preprocess`, and `/api/presentations/generate`
