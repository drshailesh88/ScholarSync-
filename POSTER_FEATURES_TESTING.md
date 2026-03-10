# Poster Features Testing

## Table of Contents

1. [Routes & Navigation](#1-routes--navigation)
2. [New Poster Wizard — Step 0: Source Selection](#2-new-poster-wizard--step-0-source-selection)
3. [New Poster Wizard — Step 1: Size & Template](#3-new-poster-wizard--step-1-size--template)
4. [New Poster Wizard — Step 2: Theme & Options](#4-new-poster-wizard--step-2-theme--options)
5. [New Poster Wizard — Step 3: Generation](#5-new-poster-wizard--step-3-generation)
6. [Step Indicator](#6-step-indicator)
7. [Wizard State Management](#7-wizard-state-management)
8. [Poster Editor — Top Toolbar](#8-poster-editor--top-toolbar)
9. [Poster Editor — Zoom Controls](#9-poster-editor--zoom-controls)
10. [Poster Editor — Left Panel (Sections)](#10-poster-editor--left-panel-sections)
11. [Poster Editor — Center Canvas](#11-poster-editor--center-canvas)
12. [Poster Editor — Right Panel](#12-poster-editor--right-panel)
13. [PosterRenderer Component](#13-posterrenderer-component)
14. [Content Block Types](#14-content-block-types)
15. [Export PDF](#15-export-pdf)
16. [API — POST /api/posters/generate](#16-api--post-apipostersgenerate)
17. [Types & Data Structures](#17-types--data-structures)
18. [Templates](#18-templates)
19. [Icons & Visual Elements](#19-icons--visual-elements)
20. [Error Handling & Edge Cases](#20-error-handling--edge-cases)

---

## 1. Routes & Navigation

| Route | Purpose | Key Behavior |
|---|---|---|
| `/poster/new` | Creation wizard (4 steps) | Multi-step poster creation flow |
| `/poster/[posterId]` | Poster editor | Full editing environment with panels |

- [ ] Navigating to `/poster/new` loads the creation wizard at Step 0
- [ ] Navigating to `/poster/[posterId]` with a valid ID loads the poster editor
- [ ] Navigating to `/poster/[posterId]` with an invalid ID shows an appropriate error
- [ ] Back button in editor navigates to `/poster` (ArrowLeft icon)

---

## 2. New Poster Wizard — Step 0: Source Selection

**Header:** "Select Source Material"

| Source | Icon | Component |
|---|---|---|
| Papers | BookOpen | SourceSelector |
| Document | FileText | SourceSelector |
| Text | TextT | SourceSelector |
| References | BookBookmark | SourceSelector |
| URL | Globe | SourceSelector |
| Import Deck | Presentation | SourceSelector |
| Deep Research | Sparkle | SourceSelector |

- [ ] Step 0 displays the heading "Select Source Material"
- [ ] All 7 source types are rendered with correct icons
- [ ] Papers source (BookOpen icon) is selectable and functional
- [ ] Document source (FileText icon) is selectable and functional
- [ ] Text source (TextT icon) is selectable and functional
- [ ] References source (BookBookmark icon) is selectable and functional
- [ ] URL source (Globe icon) is selectable and functional
- [ ] Import Deck source (Presentation icon) is selectable and functional
- [ ] Deep Research source (Sparkle icon) is selectable and functional
- [ ] Validation: cannot proceed without a selection that has data
- [ ] Validation: text input requires more than 50 characters
- [ ] Text input with exactly 50 characters is rejected
- [ ] Text input with 51 characters is accepted
- [ ] Back button navigates to `/poster`
- [ ] Selecting a source type highlights it visually

---

## 3. New Poster Wizard — Step 1: Size & Template

**Header:** "Poster Size & Template"

### Poster Sizes (6 options)

| Size Key | Dimensions | Format |
|---|---|---|
| `a0_portrait` | 841 x 1189 mm | Metric |
| `a0_landscape` | 1189 x 841 mm | Metric |
| `a1_portrait` | 594 x 841 mm | Metric |
| `a1_landscape` | 841 x 594 mm | Metric |
| `48x36` | 48 x 36 in | Imperial |
| `36x24` | 36 x 24 in | Imperial |

### Grid Layouts (4 options)

| Layout Key | Description | Columns |
|---|---|---|
| `three_column` | 3 columns | 3 |
| `two_column_wide` | 2 columns | 2 |
| `four_column` | 4 columns | 4 |
| `two_plus_one` | 2 narrow + 1 wide | 3 |

- [ ] Step 1 displays the heading "Poster Size & Template"
- [ ] All 6 poster sizes are displayed in a grid
- [ ] Default size is `a0_portrait`
- [ ] Selecting each poster size updates the state correctly
- [ ] All 4 grid layouts are displayed in a grid with descriptions
- [ ] Default grid layout is `three_column`
- [ ] Selecting each grid layout updates the state correctly
- [ ] 4 templates are shown with an optional toggle
- [ ] Templates can be toggled on/off (optional selection)
- [ ] Clicking a size visually highlights the selected option
- [ ] Clicking a layout visually highlights the selected option

---

## 4. New Poster Wizard — Step 2: Theme & Options

**Header:** "Configure Poster"

- [ ] Step 2 displays the heading "Configure Poster"
- [ ] Title input field is present with placeholder "e.g., Impact of Novel Therapy on Patient Outcomes"
- [ ] Title input has autofocus enabled
- [ ] Title input is required (cannot proceed without it)
- [ ] Theme picker displays as a 7-column grid
- [ ] Default theme is "modern"
- [ ] Selecting a different theme updates the state
- [ ] Template structure preview section is present (expandable)
- [ ] Template structure toggle text reads "Template Structure ({name})" with the selected template name
- [ ] Clicking the template structure toggle expands/collapses the preview
- [ ] Additional instructions textarea is present with 3 rows
- [ ] Additional instructions placeholder reads "e.g., Emphasize results section, include forest plot..."
- [ ] "Generate Poster" button is displayed with Sparkle icon
- [ ] "Generate Poster" button triggers generation (advances to Step 3)
- [ ] Cannot proceed without filling in the title field

---

## 5. New Poster Wizard — Step 3: Generation

**Header:** "Generating Poster"

### Progress Items

| Stage | Label |
|---|---|
| 1 | "Preprocessing content" |
| 2 | "Generating poster sections" |

- [ ] Step 3 displays the heading "Generating Poster"
- [ ] "Preprocessing content" progress item appears first
- [ ] "Generating poster sections" auto-triggers 500ms after preprocessing completes
- [ ] Progress indicators animate during processing
- [ ] On error: red box with Warning icon is displayed
- [ ] On error: retry button is available and functional
- [ ] Clicking retry restarts the generation process
- [ ] On success: green box with Check icon is displayed
- [ ] On success: section count is shown as "{sectionCount} sections"
- [ ] On success: "Open Poster Editor" button appears with ArrowRight icon
- [ ] Clicking "Open Poster Editor" navigates to `/poster/{deckId}`
- [ ] Generation handles network timeout gracefully
- [ ] Generation handles server errors gracefully

---

## 6. Step Indicator

| Step State | Visual |
|---|---|
| Completed | Filled circle with Check icon |
| Current | Outlined circle |
| Future | Empty circle |

- [ ] Step indicator shows 4 steps (0 through 3)
- [ ] Completed steps display filled circles with Check icon
- [ ] Current step displays an outlined circle
- [ ] Future steps display empty circles
- [ ] Step indicator updates correctly as user progresses through wizard
- [ ] Step indicator reflects correct state when going back

---

## 7. Wizard State Management

| State Field | Purpose |
|---|---|
| `step` | Current wizard step (0-3) |
| `sourceType` | Selected source type |
| `paperIds` | Selected paper IDs |
| `documentId` | Selected document ID |
| `rawText` | Raw text input |
| `deepResearchSessionId` | Deep research session ID |
| `importedDeck` | Imported deck data |
| `posterSize` | Selected poster size |
| `gridLayout` | Selected grid layout |
| `templateId` | Selected template ID |
| `title` | Poster title |
| `themeKey` | Selected theme key |
| `instructions` | Additional instructions |
| `preprocessing` | Preprocessing status |
| `preprocessedData` | Preprocessed content |
| `generating` | Generation status |
| `generationResult` | Generation output |
| `error` | Error message |
| `templateExpanded` | Template preview toggle |

- [ ] All state fields initialize with correct default values
- [ ] State persists correctly when navigating between steps
- [ ] Changing source type clears previous source-specific data
- [ ] Error state is cleared when retrying generation
- [ ] `templateExpanded` toggles correctly on click

---

## 8. Poster Editor — Top Toolbar

| Element | Position | Icon/Behavior |
|---|---|---|
| Back button | Left | ArrowLeft, navigates to `/poster` |
| Title | Left (after back) | Truncated at 300px |
| Size label | Left (after title) | Displays current poster size |
| Zoom controls | Right | See Section 9 |
| Section list toggle | Right | List icon |
| Theme toggle | Right | Palette icon |
| Export PDF | Right | DownloadSimple, labeled "Export PDF" |

- [ ] Back button (ArrowLeft) is visible and navigates to `/poster`
- [ ] Poster title is displayed and truncated at 300px for long titles
- [ ] Size label shows the current poster size correctly
- [ ] Section list toggle (List icon) toggles the left panel
- [ ] Theme toggle (Palette icon) toggles the theme picker in the right panel
- [ ] Export PDF button (DownloadSimple icon) is visible with label "Export PDF"
- [ ] All toolbar elements are properly aligned (left group, right group)

---

## 9. Poster Editor — Zoom Controls

| Control | Icon | Action |
|---|---|---|
| Zoom out | MagnifyingGlassMinus | Decrease scale by step |
| Zoom percentage | — | Displays current zoom level |
| Zoom in | MagnifyingGlassPlus | Increase scale by step |
| Fit to view | ArrowsOut | Sets scale to 0.25 |

| Parameter | Value |
|---|---|
| Minimum scale | 0.1 |
| Maximum scale | 1.0 |
| Default scale | 0.25 |
| Step size | 0.05 |

- [ ] Zoom out button (MagnifyingGlassMinus) decreases scale by 0.05
- [ ] Zoom in button (MagnifyingGlassPlus) increases scale by 0.05
- [ ] Zoom percentage label shows the correct current percentage
- [ ] Fit-to-view button (ArrowsOut) resets scale to 0.25
- [ ] Scale cannot go below 0.1 (minimum)
- [ ] Scale cannot exceed 1.0 (maximum)
- [ ] Default scale on load is 0.25
- [ ] Zoom percentage updates in real time as scale changes

---

## 10. Poster Editor — Left Panel (Sections)

| Property | Value |
|---|---|
| Panel width | 224px |
| Visibility | Controlled by `showSections` toggle |
| Header | "SECTIONS" |

- [ ] Left panel is 224px wide
- [ ] Left panel displays "SECTIONS" header
- [ ] Left panel visibility toggles with the List button in toolbar
- [ ] Each section is rendered as a clickable button
- [ ] Clicking a section button sets it as the active section
- [ ] Active section has blue background, blue border, and brand-colored text
- [ ] Section buttons display "{blockCount} blocks" text
- [ ] Sections with column span display "{blockCount} blocks | span {colSpan}"
- [ ] Inactive sections have default styling (no blue highlight)
- [ ] Sections are listed in the correct order

---

## 11. Poster Editor — Center Canvas

- [ ] Center area has scrollable gray background (#F0F0F0)
- [ ] PosterRenderer is displayed at the current scale
- [ ] Canvas scrolls horizontally and vertically as needed
- [ ] Poster is centered in the canvas area
- [ ] Canvas responds to zoom level changes

---

## 12. Poster Editor — Right Panel

| Property | Value |
|---|---|
| Panel width | 256px |
| Theme picker grid | 4-column grid |

### Section Details (when `activeSectionData` is set)

| Field | Description |
|---|---|
| Title | Section title |
| Position | "Column {col}, Row {row}" |
| Content blocks | List with type and preview |

- [ ] Right panel is 256px wide
- [ ] Theme picker displays as a 4-column grid when `showThemes` is true
- [ ] Selecting a theme in the picker updates the poster theme
- [ ] Section details panel shows when a section is active (`activeSectionData`)
- [ ] Section details display the section title
- [ ] Section details display position as "Column {col}, Row {row}"
- [ ] Content blocks list shows each block's type
- [ ] Content blocks list shows each block's preview text
- [ ] Right panel hides theme picker when `showThemes` is false
- [ ] Right panel hides section details when no section is active

---

## 13. PosterRenderer Component

| Prop | Type | Default |
|---|---|---|
| `poster` | Poster data | Required |
| `scale` | number | 0.2 |
| `className` | string | — |
| `onSectionClick` | function | — |
| `activeSectionId` | string | — |

| Property | Value |
|---|---|
| Font base | `scale * 14px` |
| Title text size | 2.2em |
| Authors text size | 0.9em |
| Affiliations text size | 0.75em |
| Grid gap | 0.8em |
| Section border | 2px, primaryColor + "30" opacity |
| Section border-radius | 0.4em |
| Section header bg | primaryColor + "15" opacity |

- [ ] PosterRenderer accepts `poster`, `scale`, `className`, `onSectionClick`, `activeSectionId` props
- [ ] Default scale is 0.2 when not specified
- [ ] Font base size calculates correctly as `scale * 14px`
- [ ] Title section spans full width
- [ ] Title section has gradient or primary background color
- [ ] Title section text is white
- [ ] Title text renders at 2.2em
- [ ] Authors text renders at 0.9em
- [ ] Affiliations text renders at 0.75em
- [ ] Content grid uses CSS grid layout
- [ ] Content grid has 0.8em gap
- [ ] Section cards have 2px border with primaryColor + "30" opacity
- [ ] Section cards have 0.4em border-radius
- [ ] Section headers have primaryColor + "15" background opacity
- [ ] Clicking a section triggers `onSectionClick` callback
- [ ] Active section is visually highlighted via `activeSectionId`
- [ ] Custom `className` is applied to the root element

---

## 14. Content Block Types

| Block Type | Rendering | Key Detail |
|---|---|---|
| `text` | Styled text | Styles: title, subtitle, caption, body |
| `bullets` | Ordered/Unordered list | `ol` or `ul` |
| `image` | Image with max height | Max 12em height, placeholder if no URL |
| `chart` | PosterChartPreview | Subtypes: pie, bar, line |
| `table` | PosterTablePreview | Tabular data display |
| `citation` | Left-bordered text | Border color: accentColor |
| `quote` | Italic text | Styled as blockquote |
| `math` | KaTeX rendered formula | LaTeX math rendering |
| `diagram` | Mermaid diagram | Rendered via Mermaid |
| `code` | Monospace text | Dark background |
| `callout` | Styled callout box | 7 types (see below) |
| `stat_result` | Statistical result | Formatted stat display |
| `bibliography` | Bibliography entries | Reference list |
| `timeline` | Timeline visualization | Sequential events |
| `divider` | Horizontal rule | Visual separator |

### Callout Types

| Type | Purpose |
|---|---|
| `info` | General information |
| `warning` | Warning/caution |
| `success` | Positive outcome |
| `finding` | Research finding |
| `limitation` | Study limitation |
| `methodology` | Methodology note |
| `clinical` | Clinical implication |

- [ ] `text` block renders with correct style variants (title, subtitle, caption, body)
- [ ] `bullets` block renders ordered lists (`ol`) correctly
- [ ] `bullets` block renders unordered lists (`ul`) correctly
- [ ] `image` block displays image with max height of 12em
- [ ] `image` block shows placeholder when no URL is provided
- [ ] `chart` block renders pie charts via PosterChartPreview
- [ ] `chart` block renders bar charts via PosterChartPreview
- [ ] `chart` block renders line charts via PosterChartPreview
- [ ] `table` block renders tabular data via PosterTablePreview
- [ ] `citation` block has left border in accentColor
- [ ] `quote` block renders text in italic
- [ ] `math` block renders LaTeX formulas via KaTeX
- [ ] `diagram` block renders diagrams via Mermaid
- [ ] `code` block uses monospace font with dark background
- [ ] `callout` block renders `info` type correctly
- [ ] `callout` block renders `warning` type correctly
- [ ] `callout` block renders `success` type correctly
- [ ] `callout` block renders `finding` type correctly
- [ ] `callout` block renders `limitation` type correctly
- [ ] `callout` block renders `methodology` type correctly
- [ ] `callout` block renders `clinical` type correctly
- [ ] `stat_result` block renders formatted statistical results
- [ ] `bibliography` block renders reference entries
- [ ] `timeline` block renders sequential events
- [ ] `divider` block renders as a horizontal rule

---

## 15. Export PDF

| Property | Value |
|---|---|
| Endpoint | `POST /api/export/poster-pdf` |
| Filename | `{sanitizedTitle}_poster.pdf` |
| Trigger | "Export PDF" button (DownloadSimple icon) |

- [ ] Clicking "Export PDF" sends POST request to `/api/export/poster-pdf`
- [ ] Downloaded file is named `{title}_poster.pdf` with the poster's title
- [ ] PDF download initiates automatically after successful response
- [ ] Export handles special characters in title for filename

---

## 16. API — POST /api/posters/generate

### Request

| Field | Type | Constraints |
|---|---|---|
| `title` | string | 1-500 characters |
| `preprocessedData` | string | 1-200,000 characters (sliced to 60,000) |
| `posterSize` | PosterSize | Required |
| `gridLayout` | PosterGridLayout | Required |
| `themeKey` | string | Optional, default "modern" |
| `templateId` | string | Optional |
| `additionalInstructions` | string | Optional |
| `projectId` | string | Optional |

### Processing Pipeline

| Step | Description |
|---|---|
| 1 | Create deck |
| 2 | Update deck status to "processing" |
| 3 | AI generation via `claude-sonnet-4-20250514` |
| 4 | Parse JSON response |
| 5 | Store metadata in slide 0 |
| 6 | Create section slides |
| 7 | Update deck status to "completed" |

### Response

```json
{ "deckId": "string", "sectionCount": "number", "posterData": "object" }
```

### Error Codes

| Code | Meaning |
|---|---|
| 401 | Unauthorized (missing/invalid auth) |
| 400 | Bad request (validation failure) |
| 500 | Internal server error |

- [ ] API requires authentication (returns 401 without valid auth)
- [ ] API enforces rate limiting
- [ ] Title shorter than 1 character returns 400
- [ ] Title longer than 500 characters returns 400
- [ ] preprocessedData shorter than 1 character returns 400
- [ ] preprocessedData longer than 200,000 characters returns 400
- [ ] preprocessedData is sliced to 60,000 characters before AI processing
- [ ] Missing `posterSize` returns 400
- [ ] Missing `gridLayout` returns 400
- [ ] Default `themeKey` is "modern" when not provided
- [ ] Valid request creates a deck successfully
- [ ] Deck status transitions: created -> processing -> completed
- [ ] AI model used is `claude-sonnet-4-20250514`
- [ ] Response contains `deckId`, `sectionCount`, and `posterData`
- [ ] Metadata is stored in slide 0
- [ ] Section slides are created correctly
- [ ] Server errors return 500 with error details

---

## 17. Types & Data Structures

### PosterSize

| Key | Width | Height | Unit |
|---|---|---|---|
| `a0_portrait` | 841 | 1189 | mm |
| `a0_landscape` | 1189 | 841 | mm |
| `a1_portrait` | 594 | 841 | mm |
| `a1_landscape` | 841 | 594 | mm |
| `48x36` | 48 | 36 | in |
| `36x24` | 36 | 24 | in |

### PosterGridLayout

| Key | Columns | Description |
|---|---|---|
| `three_column` | 3 | Standard 3-column layout |
| `two_column_wide` | 2 | Wide 2-column layout |
| `four_column` | 4 | 4-column layout |
| `two_plus_one` | 3 | 2 narrow + 1 wide column |

- [ ] All 6 PosterSize values are defined in `src/types/poster.ts`
- [ ] All 4 PosterGridLayout values are defined in `src/types/poster.ts`
- [ ] Poster size dimensions match the specification
- [ ] Grid layout column counts match the specification

---

## 18. Templates

### Template 1: Clinical Research

| Property | Value |
|---|---|
| Layout | `three_column` |
| Sections | Title, Introduction, Objectives, Methods, Results (colSpan 2), Discussion, Conclusions, References, Acknowledgments |

### Template 2: Basic Science

| Property | Value |
|---|---|
| Layout | `three_column` |
| Sections | Title, Background, Hypothesis, Materials & Methods, Results, Discussion, Conclusions & Future Directions, References, Acknowledgments |

### Template 3: Systematic Review

| Property | Value |
|---|---|
| Layout | `three_column` |
| Sections | Title, Background, Methods, PRISMA Flow, Results, Risk of Bias, Conclusions, References, Acknowledgments |

### Template 4: Engineering/CS

| Property | Value |
|---|---|
| Layout | `two_column_wide` |
| Sections | Title, Problem Statement, Proposed Approach, Implementation, Results & Evaluation, Analysis, Conclusions & Future Work, References, Acknowledgments |

- [ ] Clinical Research template uses `three_column` layout
- [ ] Clinical Research template has 9 sections including Results with colSpan 2
- [ ] Clinical Research Results section spans 2 columns
- [ ] Basic Science template uses `three_column` layout
- [ ] Basic Science template has 9 sections
- [ ] Basic Science template includes Hypothesis section
- [ ] Systematic Review template uses `three_column` layout
- [ ] Systematic Review template has 9 sections
- [ ] Systematic Review template includes PRISMA Flow and Risk of Bias sections
- [ ] Engineering/CS template uses `two_column_wide` layout
- [ ] Engineering/CS template has 9 sections
- [ ] Engineering/CS template includes Problem Statement and Proposed Approach sections
- [ ] All templates include Title, References, and Acknowledgments sections

---

## 19. Icons & Visual Elements

| Icon | Usage |
|---|---|
| ArrowLeft | Back navigation |
| ArrowRight | "Open Poster Editor" button |
| Check | Completed steps, success state |
| CircleNotch | Loading/spinner |
| Warning | Error state |
| Sparkle | Generate button, Deep Research source |
| CaretDown | Template structure collapsed |
| CaretUp | Template structure expanded |
| MagnifyingGlassMinus | Zoom out |
| MagnifyingGlassPlus | Zoom in |
| ArrowsOut | Fit to view |
| DownloadSimple | Export PDF |
| Palette | Theme toggle |
| List | Section list toggle |
| FileText | Document source |
| TextT | Text source |
| BookOpen | Papers source |
| BookBookmark | References source |
| Globe | URL source |
| Presentation | Import Deck source |
| UploadSimple | Upload action |
| WarningCircle | Warning indicator |
| Trash | Delete action |
| Plus | Add action |

- [ ] All listed icons render correctly without missing imports
- [ ] Icons are appropriately sized relative to their context
- [ ] Icons have correct color theming (inherit or explicit)

---

## 20. Error Handling & Edge Cases

- [ ] Wizard handles browser back/forward navigation gracefully
- [ ] Editor handles missing poster data (deleted or invalid posterId)
- [ ] Editor handles poster with zero sections
- [ ] Editor handles poster with very long title (>300px truncation in toolbar)
- [ ] Editor handles poster with special characters in title
- [ ] Generation handles timeout from AI model
- [ ] Generation handles malformed JSON response from AI
- [ ] Zoom controls handle rapid clicking without visual glitches
- [ ] Section panel handles poster with many sections (scrolling)
- [ ] Theme changes apply immediately to the rendered poster
- [ ] Source selection handles switching between source types without data loss warnings
- [ ] Wizard prevents double-submission of the generate action
- [ ] Editor state persists across page refresh (or shows appropriate reload behavior)
- [ ] Mobile/responsive behavior for toolbar and panels

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI and source code but were
> missing from the original document generated by Claude Code.

### Detailed QA Coverage
- [ ] `/poster/new` renders inside a `Suspense` boundary with a centered `Loading...` fallback before the wizard hydrates
- [ ] New poster header shows an icon-only back link on the left and the title `New Conference Poster` on the right
- [ ] Step indicator labels appear in the order `Source`, `Size & Template`, `Theme & Options`, `Generate`
- [ ] Step indicator starts with step 1 visually active and the remaining steps rendered as future steps
- [ ] Completed step circles replace the step number with a `Check` icon
- [ ] Step 0 opens with `From Text` selected by default
- [ ] Step 0 renders the six `SourceSelector` cards in a responsive `2 / 3 / 6` column grid depending on viewport width
- [ ] Step 0 renders `From Deep Research` as a separate full-width card below the main source grid
- [ ] `Next` on Step 0 is disabled on first load because `rawText` is empty
- [ ] Step 0 `Next` uses disabled styling `bg-surface-raised text-ink-muted cursor-not-allowed` when requirements are not met
- [ ] Switching between source cards changes selection styling immediately without changing the current step
- [ ] Step 0 selection styling uses `border-brand bg-brand/5` for the active source card
- [ ] `From Papers` shows a `Paper IDs` text input with helper text `(comma-separated)`
- [ ] `Paper IDs` input accepts comma-separated values and filters out tokens that parse to `NaN`
- [ ] `Paper IDs` helper copy reads `Enter the IDs of papers from your library to generate slides from`
- [ ] `From Papers` enables `Next` only when at least one parsed numeric ID is present
- [ ] `From Document` shows a numeric `Document ID` input only while that source is selected
- [ ] Clearing the `Document ID` field stores `null` and disables `Next` again
- [ ] `From Document` helper copy reads `Enter the ID of a synthesis document to generate slides from`
- [ ] `From Text` shows a multiline `Content` textarea with placeholder `Paste your research content, abstract, or notes here...`
- [ ] `From Text` shows a live character count beneath the textarea
- [ ] `From Text` requires trimmed content length greater than 50 characters before `Next` becomes enabled
- [ ] Fifty trimmed characters keep `Next` disabled because the gate is strictly `> 50`
- [ ] Fifty-one trimmed characters enable `Next` when `From Text` is active
- [ ] `From Deep Research` shows a numeric `Deep Research session ID` input only while that source is selected
- [ ] `From Deep Research` enables `Next` only when a session ID is present
- [ ] `Import Deck` shows a single `Choose .pptx file` button rather than a drag-and-drop zone
- [ ] `Choose .pptx file` opens a hidden file input restricted to `.pptx` MIME/type values
- [ ] Uploading a non-`.pptx` file shows the inline error `Please upload a .pptx file`
- [ ] Uploading a password-protected deck shows the inline error `Password-protected files are not supported`
- [ ] Generic deck-parse failures show `Could not read this file. Is it a valid PowerPoint presentation?`
- [ ] While a deck is being parsed, the upload button swaps `UploadSimple` for a spinning `CircleNotch` and label `Parsing presentation...`
- [ ] Successful deck import copies `parsed.sourceText` into the wizard `rawText` state
- [ ] Successful deck import copies the imported deck title into `Poster Title` only when the title field is still blank
- [ ] Successful deck import shows imported title, slide count, source filename, and optional theme name in a summary card
- [ ] Imported deck preview lists at most the first six slide previews even when the deck contains more slides
- [ ] Imported deck preview shows `Showing 6 of N imported slide previews.` when additional slides exist
- [ ] Imported deck warnings show only the first warning plus `(+N more)` when multiple warnings are returned
- [ ] Clearing an imported deck removes both the parsed deck object and the copied `rawText`
- [ ] `Reference Library` appears as a selectable source card but no import panel is rendered in `NewPosterPage`
- [ ] `From URL` appears as a selectable source card but no URL input panel is rendered in `NewPosterPage`
- [ ] Selecting `Reference Library` leaves `Next` disabled because Step 0 validation does not include the `references` source type
- [ ] Selecting `From URL` leaves `Next` disabled because Step 0 validation does not include the `url` source type
- [ ] Step 0 back navigation uses a `Link` with `href="/poster"` rather than a wizard-local step reset
- [ ] Step 1 opens with `A0 Portrait (841 x 1189 mm)` selected by default
- [ ] Step 1 opens with `Three Column` selected by default
- [ ] Step 1 opens with no template selected
- [ ] Poster size options are rendered as clickable buttons rather than radios or a select input
- [ ] Each poster size card shows only the human-readable label from `POSTER_SIZES`
- [ ] Selected poster size card uses `border-brand bg-brand/5`
- [ ] Grid layout cards show both label and description from `POSTER_GRID_LAYOUTS`
- [ ] Selected grid layout card uses `border-brand bg-brand/5`
- [ ] Template cards render the four template names `Clinical Research`, `Basic Science`, `Systematic Review`, and `Engineering / CS`
- [ ] Template descriptions are clamped to two lines inside each template card
- [ ] Clicking an unselected template sets `templateId` to that key
- [ ] Clicking the already selected template clears `templateId` back to `null`
- [ ] Step 1 `Back` returns to Step 0 without clearing previously entered source data
- [ ] Step 1 `Next` is always enabled and moves to Step 2 with the current selections
- [ ] Step 2 header text reads `Configure Poster` with subcopy `Set title, theme, and generation preferences`
- [ ] `Poster Title` input is autofocused on Step 2 mount
- [ ] `Poster Title` placeholder reads `e.g., Impact of Novel Therapy on Patient Outcomes`
- [ ] `Generate Poster` stays disabled until `title.trim().length > 0`
- [ ] A title consisting only of whitespace keeps `Generate Poster` disabled
- [ ] Non-empty title text enables `Generate Poster` even before any additional instructions are entered
- [ ] Theme picker buttons are generated from `PRESET_THEMES` rather than a hard-coded seven-theme list
- [ ] Each theme swatch renders the theme name as small text inside the preview square
- [ ] Selected theme swatch uses `border-brand ring-1 ring-brand/30`
- [ ] `Additional Instructions` textarea is optional and uses exactly three visible rows
- [ ] Empty additional instructions are sent as `undefined` rather than an empty string in the generation request
- [ ] Template structure toggle is hidden until a template is selected
- [ ] Template structure toggle starts collapsed when a template is first selected
- [ ] Template structure toggle label includes the currently selected template name in parentheses
- [ ] Expanding template structure shows numbered rows for each template section
- [ ] Expanded template structure rows show section title, optional `spans N cols`, and one-line guidance text
- [ ] Step 2 `Back` returns to Step 1 while preserving title, theme, and instructions state
- [ ] Clicking `Generate Poster` moves to Step 3 immediately before any network response completes
- [ ] `Generate Poster` does not show its own inline spinner; progress feedback only appears after Step 3 mounts
- [ ] Client-side Step 2 does not enforce the API's 500-character title maximum before submission
- [ ] Step 3 always renders exactly two progress rows: `Preprocessing content` and `Generating poster sections`
- [ ] `Preprocessing content` shows a pending hollow circle before preprocessing begins
- [ ] `Preprocessing content` swaps to a spinning `CircleNotch` while `preprocessing` is true
- [ ] `Preprocessing content` swaps to a green `Check` after streamed preprocess output populates `preprocessedData`
- [ ] `Preprocessing content` swaps to a red `Warning` when preprocess fails before any output is captured
- [ ] `Generating poster sections` remains pending until preprocess completes successfully
- [ ] `Generating poster sections` swaps to a spinning `CircleNotch` while `generating` is true
- [ ] `Generating poster sections` swaps to a green `Check` after `generationResult` is received
- [ ] `Generating poster sections` swaps to a red `Warning` when generation fails after preprocess has succeeded
- [ ] Entering Step 3 calls `handlePreprocess()` immediately via `handleStartGeneration`
- [ ] Preprocess requests remap `sourceType="import_deck"` to `sourceType="text"` before posting to `/api/presentations/preprocess`
- [ ] Preprocess requests send imported deck `sourceText` instead of manual `rawText` when the imported deck source is active
- [ ] Preprocess requests omit unrelated source fields by passing them as `undefined`
- [ ] Stream parsing appends only SSE-style lines prefixed with `0:`
- [ ] Malformed streamed chunks are skipped silently without surfacing a client-side parse error
- [ ] Preprocess failures show a single inline red error banner with `Warning` and the message text
- [ ] When preprocess succeeds and there is no generation result or error, `AutoTrigger` schedules `handleGenerate` after 500 ms
- [ ] Generation requests POST `preprocessedData`, `title`, `posterSize`, `gridLayout`, `themeKey`, optional `templateId`, and optional `additionalInstructions` to `/api/posters/generate`
- [ ] Generation success shows an inline green success banner instead of redirecting automatically
- [ ] Generation success banner appends `using the {template} template` only when a template is selected
- [ ] Generation success CTA reads `Open Poster Editor` and pushes to `/poster/{deckId}`
- [ ] Generation error after preprocess keeps the first progress row done while marking only the second row as error
- [ ] Retry after preprocess failure reruns preprocess because `preprocessedData` is still empty
- [ ] Retry after generation failure calls `handleGenerate()` directly without rerunning preprocess
- [ ] Error-state `Back` from Step 3 returns to Step 2 and clears `error`, `preprocessedData`, and `generationResult`
- [ ] Step 3 has no explicit cancel action once preprocess has started
- [ ] Poster editor parses `posterId` from route params using `Number(params.posterId)`
- [ ] Poster editor starts with `loading = true` and shows `Loading poster...` centered in the viewport
- [ ] Poster editor calls `getDeck(posterId)` inside a client `useEffect`
- [ ] Missing deck data triggers `router.push("/poster")` before the editor tries to reconstruct poster state
- [ ] Deck reconstruction prefers slide `sortOrder === 0` with a metadata text block containing the string `"isPoster"`
- [ ] Metadata parse success hydrates `authors`, `affiliations`, `posterSize`, `gridLayout`, and `sections` from stored JSON
- [ ] Metadata parse failure falls back to reconstructing poster sections from individual slides
- [ ] Fallback reconstruction creates a synthetic full-width `Title` section with id `title_bar`
- [ ] Fallback reconstruction maps only slides with `sortOrder > 0` into content sections
- [ ] Fallback reconstruction defaults poster size to `a0_portrait` and grid layout to `three_column`
- [ ] Exceptions during `getDeck()` are only logged to console before the page falls through to `Poster not found`
- [ ] Toolbar back control is an icon-only link with `href="/poster"`
- [ ] Toolbar title text uses `truncate max-w-[300px]` for long poster titles
- [ ] Toolbar size chip uses `POSTER_SIZES[posterData.size].label`
- [ ] Zoom percentage display rounds `scale * 100` to the nearest integer
- [ ] Zoom out decreases scale in `0.05` steps but clamps at `0.1`
- [ ] Zoom in increases scale in `0.05` steps but clamps at `1.0`
- [ ] Zoom buttons remain clickable at their clamp bounds instead of entering a disabled state
- [ ] `Fit to screen` always resets scale back to exactly `0.25`
- [ ] `Section list` toggle starts active on initial editor load
- [ ] `Theme picker` toggle starts inactive on initial editor load
- [ ] Active panel toggles use brand text on a brand-tinted background
- [ ] `Export PDF` is the only full-width primary-styled text button in the toolbar action group
- [ ] `Export PDF` has no local loading spinner, disabled state, or completion toast
- [ ] Left sidebar renders only when `showSections` is true
- [ ] Left sidebar heading text is `SECTIONS`
- [ ] Each section list row shows the section title and the number of content blocks
- [ ] Section list rows append `| span N` only for sections that define `colSpan`
- [ ] Clicking a section list row sets `activeSectionId` and updates row highlight styling
- [ ] Center canvas uses a gray `#F0F0F0` background and centers the scaled poster within padded scrollable space
- [ ] Canvas width is driven by inline style `${scale * 100}%` with `maxWidth: 100%`
- [ ] Clicking the poster title bar on the canvas sets `activeSectionId` to the title section id
- [ ] Clicking a poster section card on the canvas sets `activeSectionId` to that section id
- [ ] Active canvas section and active title section show a blue ring highlight
- [ ] Right sidebar appears whenever either `showThemes` is true or `activeSectionData` exists
- [ ] Theme picker area in the right sidebar is separated from section details by a bottom border only when open
- [ ] Right-sidebar theme tiles compare selection by `posterData.themeConfig.name`, not by theme key
- [ ] Theme changes mutate local `posterData.themeConfig` only and are not saved to the backend
- [ ] Section details panel is read-only and does not expose editable form controls
- [ ] Section details `Title` field renders as plain text, not an input
- [ ] Section details `Position` field renders `Column X, Row Y` and appends `(spans N columns)` when relevant
- [ ] Section details block list shows one compact row per content block
- [ ] Text block summaries show the first 30 characters followed by `...`
- [ ] Bullet block summaries show `{N} items`
- [ ] Chart block summaries show the `chartType`
- [ ] Table block summaries show `{N} rows`
- [ ] Poster renderer computes aspect ratio directly from numeric width and height in `POSTER_SIZES`
- [ ] Poster title bar renders authors only when `authors.length > 0`
- [ ] Poster title bar renders affiliations only when `affiliations.length > 0`
- [ ] If no full-width title section exists, `PosterRenderer` falls back to a simpler colored title header
- [ ] Content grid column count is derived from `POSTER_GRID_LAYOUTS[poster.gridLayout].columns`
- [ ] QR footer renders only when `poster.qrCodeUrl` exists
- [ ] Image blocks without a real `url` render a themed placeholder box using `suggestion` or `alt`
- [ ] Pie charts render label percentages rather than drawing a visual pie graphic
- [ ] Non-pie charts render horizontal bars based on the first dataset only
- [ ] Table preview uses a themed header background and row separator borders
- [ ] Invalid KaTeX render exceptions fall back to inline `Invalid LaTeX` text
- [ ] Diagram blocks show `Rendering diagram...` before Mermaid output resolves
- [ ] Diagram render failures show `Diagram preview unavailable` plus the first 200 characters of Mermaid syntax
- [ ] Export attempts POST `{ poster: posterData }` to `/api/export/poster-pdf`
- [ ] Successful export sanitizes the title to alphanumeric and underscore characters before downloading `{safeTitle}_poster.pdf`
- [ ] Export failures are logged to console only and do not show inline or toast feedback

### Actual Current Behavior Corrections
- [ ] Only `/poster/new` and `/poster/[posterId]` are present in the source tree; `/poster` itself is referenced by links and redirects but has no page file under `src/app/(app)/poster`
- [ ] `Reference Library` and `From URL` appear as selectable source cards in the poster wizard, but their corresponding panels are not wired by `NewPosterPage`
- [ ] Selecting `Reference Library` or `From URL` cannot satisfy Step 0 validation, so those choices are presentational only in the current poster flow
- [ ] The poster editor is a viewer/inspector with zoom, section selection, and theme preview; it does not provide inline section editing, creation, deletion, or drag reordering
- [ ] Zoom controls clamp scale at min/max values but do not disable the buttons at those bounds
- [ ] Theme changes in `/poster/[posterId]` are local-only and do not persist after refresh
- [ ] Poster generation success and failure feedback are inline inside Step 3; there are no toasts for either path
- [ ] Invalid or inaccessible poster loads redirect toward `/poster` rather than rendering a dedicated recovery page with a retry action
- [ ] There is no `src/app/api/export/poster-pdf/route.ts` in the current source tree even though the editor posts to that endpoint
- [ ] There are no route-level `loading.tsx` or `error.tsx` files under `src/app/(app)/poster`

---

## Re-Audit Discoveries (Claude Code Pass 2)

### Wizard Step Subcopy

- [ ] Step 0 renders subcopy "Choose where to generate your poster from" below the heading
- [ ] Step 1 renders subcopy "Choose dimensions and a poster template" below the heading
- [ ] Step 3 renders subcopy "AI is creating your conference poster" below the heading

### Source Card Descriptions

- [ ] "From Papers" source card description reads "Select papers from your library"
- [ ] "From Document" source card description reads "Use a synthesis document"
- [ ] "From Text" source card description reads "Paste content directly"
- [ ] "Reference Library" source card description reads "Import from Zotero, BibTeX, DOI"
- [ ] "From URL" source card description reads "Paste a link to any web page"
- [ ] "Import Deck" source card description reads "Upload an existing PowerPoint"
- [ ] Source card descriptions render at `text-[10px] opacity-60` below the label

### Deep Research Card Details

- [ ] Deep Research card description text reads "Import findings from a Deep Research session"
- [ ] Deep Research active state: icon and label text change to `text-brand`
- [ ] Deep Research inactive state: icon uses `text-ink-muted`, label uses `text-ink`

### Wizard Field Labels

- [ ] Step 1 "Poster Size" field label renders as `text-sm font-medium text-ink`
- [ ] Step 1 "Grid Layout" field label renders as `text-sm font-medium text-ink`
- [ ] Step 1 "Poster Template" label appends `(optional)` in `text-ink-muted font-normal`
- [ ] Step 2 "Theme" field label renders as `text-sm font-medium text-ink`
- [ ] Step 2 "Additional Instructions" label appends `(optional)` in `text-ink-muted font-normal`
- [ ] Step 2 "Poster Title" field label renders as `text-sm font-medium text-ink`

### Poster Size Exact Labels

- [ ] `a0_portrait` label string is "A0 Portrait (841 x 1189 mm)"
- [ ] `a0_landscape` label string is "A0 Landscape (1189 x 841 mm)"
- [ ] `a1_portrait` label string is "A1 Portrait (594 x 841 mm)"
- [ ] `a1_landscape` label string is "A1 Landscape (841 x 594 mm)"
- [ ] `48x36` label string is "48 x 36 inches (US Standard)"
- [ ] `36x24` label string is "36 x 24 inches (Small)"

### Grid Layout Exact Labels & Descriptions

- [ ] `three_column` label is "Three Column" with description "Classic 3-column academic poster layout"
- [ ] `two_column_wide` label is "Two Column (Wide)" with description "Two wide columns for text-heavy posters"
- [ ] `four_column` label is "Four Column" with description "Four narrow columns for data-dense posters"
- [ ] `two_plus_one` label is "2 + 1 Split" with description "Two narrow columns + one wide results column"

### Template Exact Descriptions

- [ ] Clinical Research template description is "Standard IMRAD poster for clinical studies with emphasis on results"
- [ ] Basic Science template description is "Lab research poster with detailed methodology and data visualization"
- [ ] Systematic Review template description is "PRISMA-compliant poster for systematic reviews and meta-analyses"
- [ ] Engineering/CS template description is "Technical poster for engineering and computer science research"
- [ ] Engineering/CS template key in `POSTER_TEMPLATES` is `engineering` (not `engineering_cs`)

### Step Indicator Rendering Details

- [ ] Non-completed steps display their 1-based number (`i + 1`) inside the circle
- [ ] Future step circles use `bg-surface-raised text-ink-muted border border-border`
- [ ] Current step circle uses `bg-brand/10 text-brand border border-brand`
- [ ] Steps are separated by `w-8 h-px bg-border mx-1` horizontal divider lines
- [ ] Current step label uses `text-ink font-medium`; non-current labels use `text-ink-muted`

### Wizard Selection Grid Responsiveness

- [ ] Poster size selection grid uses `grid-cols-2 sm:grid-cols-3` (responsive)
- [ ] Grid layout selection grid uses `grid-cols-2`
- [ ] Template selection grid uses `grid-cols-2`

### Template Structure Preview Details

- [ ] Template structure expanded list has `max-h-64 overflow-y-auto` for scrollable content
- [ ] Template section numbers use `font-mono w-5 shrink-0 text-right` styling
- [ ] Template guidance text uses `line-clamp-1` to truncate to one line

### Theme Count

- [ ] `PRESET_THEMES` contains 26 themes; the 7-column wizard grid and 4-column editor grid wrap to multiple rows

### PosterRenderer Root & Typography

- [ ] PosterRenderer root element has `shadow-lg` class for drop shadow
- [ ] Poster body text uses `fontFamily: theme.fontFamily ?? "Inter, sans-serif"`
- [ ] Poster title and section headings use `theme.headingFontFamily`
- [ ] Poster content container has `padding: "1.5em"`

### Title Section Identification Logic

- [ ] Title section is determined by finding the first section where `colSpan >= columns` (the grid column count)
- [ ] Content sections are filtered as those where `!colSpan || colSpan < columns`
- [ ] Fallback title bar (no full-width section found) uses solid `primaryColor` background with no gradient, and renders only the title text (no authors or affiliations)

### Title Bar Rendering Specifics

- [ ] Title bar gradient renders only when BOTH `theme.gradientFrom` and `theme.gradientTo` exist; otherwise solid `primaryColor`
- [ ] Authors are joined with `", "` separator
- [ ] Affiliations are joined with `"; "` separator
- [ ] Authors text uses `opacity-90`
- [ ] Affiliations text uses `opacity-75`
- [ ] Title section renders its own `contentBlocks` below affiliations if any exist, with text forced to white
- [ ] Title bar has `rounded-[0.4em]` with `mb-[1em]` bottom margin and `p-[1.2em]` padding

### Section Card Rendering Specifics

- [ ] Section card body background is `theme.surfaceColor ?? theme.backgroundColor`
- [ ] Section header has a bottom border: `2px solid ${theme.primaryColor}30` (separate from the outer card border)
- [ ] Section heading renders at `text-[1em] font-bold` in `theme.primaryColor`
- [ ] Sections with `colSpan` use CSS `gridColumn: span N` to span multiple grid columns
- [ ] Section content area has `p-[0.8em]` padding

### Content Block Enhancements

- [ ] Image blocks render via `next/Image` with `unoptimized` prop when a URL is present
- [ ] Image placeholder box is `h-[6em]` tall (smaller than the `max-h-[12em]` for actual images)
- [ ] Image blocks support an optional `caption` below the image at `text-[0.55em] opacity-50`
- [ ] Chart blocks display an optional `title` above the chart in `text-[0.7em] font-medium` styled in `primaryColor`
- [ ] Chart types beyond bar/line/pie (scatter, area, radar, funnel, forest_plot, donut, stacked_bar, waterfall, gauge, treemap) all render as horizontal bars via the same non-pie code path
- [ ] Citation block shows source attribution as `"— {source}"` below the cited text at `text-[0.85em] opacity-60`
- [ ] Quote block wraps content in a `<blockquote>` element with `accentColor` left border and shows `"— {attribution}"` below
- [ ] Math block renders inside a container box with `surfaceColor` background and themed border
- [ ] Math block supports `displayMode` boolean property (inline vs. display mode rendering in KaTeX)
- [ ] Math block sets `throwOnError: false` and separately catches thrown render errors to fall back to red "Invalid LaTeX" text
- [ ] Math, diagram, and code blocks all support an optional `caption` rendered below their content
- [ ] Code block uses `theme.codeBackground ?? "#1E1E2E"` for background and `#E2E8F0` for text color
- [ ] Callout block supports an optional `title` rendered in bold (`text-[0.7em] font-bold`) with the callout type's border color
- [ ] Stat result block displays `{label}: {value}` with the value in `text-[0.9em] font-bold` styled in `theme.primaryColor`
- [ ] Stat result block shows optional CI (`CI: {ci}`) and p-value (`p = {pValue}`) as sub-details at `text-[0.55em] opacity-60`
- [ ] Stat result block shows optional `interpretation` in italic below CI/p-value
- [ ] Bibliography entries format as `[{id}] {formatted}` where `id` falls back to `i + 1` when the entry id is not a number
- [ ] Bibliography entries show an optional `doi:{doi}` suffix at `opacity-60`
- [ ] Timeline entry dots are colored by status: `completed` = `#10B981`, `in_progress` = `theme.primaryColor`, other/upcoming = `#9CA3AF`
- [ ] Timeline entries show label, optional date (at `text-[0.55em] opacity-50`), and optional description
- [ ] Timeline block supports an optional `title` above entries in `text-[0.7em] font-medium` styled in `primaryColor`
- [ ] Divider block data accepts a `style` property and defaults to `"solid"`; the renderer interpolates that value directly into `borderTop`

### Editor Right Sidebar Headers

- [ ] Right sidebar theme section header reads `THEME` in `text-xs font-semibold text-ink-muted tracking-wide`
- [ ] Editor theme tiles render a `w-3 h-3 rounded-full` colored circle in `primaryColor` (not the theme name text used in the wizard)
- [ ] Right sidebar section details header reads `SECTION DETAILS` in `text-xs font-semibold text-ink-muted tracking-wide`
- [ ] Content blocks label in section details shows count: `Content Blocks ({N})`
- [ ] Block type in section details is displayed in `font-mono text-brand` styling

### Editor Toolbar Dividers

- [ ] A `w-px h-5 bg-border mx-1` vertical divider separates zoom controls from the panel toggle buttons
- [ ] A second identical vertical divider separates panel toggle buttons from the Export PDF button

### Editor Layout Structure

- [ ] Editor page root uses `h-[calc(100vh-5rem)]` with `-m-6` for full-height layout
- [ ] Canvas area has `p-8` padding around the scaled poster

### Fallback Reconstruction Specifics

- [ ] Fallback reconstruction gives the first content section (sortOrder=1) `colSpan: 3` in addition to the title bar
- [ ] Fallback reconstruction section IDs use format `section_${slide.id}`
- [ ] Fallback reconstruction section titles fall back to `Section ${i + 1}` when slide title is null
- [ ] Fallback reconstruction calculates position as `column: i % 3`, `row: Math.floor(i / 3) + 1`

### API Route Implementation Details

- [ ] API creates deck with `audienceType: "poster_session"` and `sourceType: "custom"`
- [ ] API stores `generationPrompt: body.additionalInstructions` during the "processing" status update
- [ ] API strips markdown code fences from AI response before `JSON.parse`
- [ ] Metadata slide (sortOrder 0) is created with `layout: "title_slide"`
- [ ] Section slides (sortOrder 1+) are created with `layout: "title_content"`
- [ ] API updates `totalSlides: sections.length + 1` and `theme: themeKey` on completion
- [ ] On generation failure, deck status is updated to `"failed"` (in addition to processing/completed)
- [ ] 400 validation error response body: `{ error: "Invalid request body", details: parseResult.error.flatten().fieldErrors }`
- [ ] `projectId` is validated as `z.number().int().positive().optional()` (must be a positive integer if provided)

### ProgressItem & Success Icon Details

- [ ] ProgressItem loading state text uses `text-brand` color
- [ ] ProgressItem done state text uses `text-ink` color
- [ ] ProgressItem error state text uses `text-red-500` color
- [ ] ProgressItem pending state text uses `text-ink-muted` color
- [ ] ProgressItem done state `Check` icon uses `weight="bold"` with `text-green-500`
- [ ] Generation success banner `Check` icon uses `weight="bold"`

### Error Message Exact Strings

- [ ] Non-OK preprocess HTTP response throws `"Preprocessing failed"`
- [ ] Missing response body reader throws `"No response body"`
- [ ] Non-OK generate HTTP response throws `"Poster generation failed"`
- [ ] Preprocess catch fallback error message is `"Preprocessing failed"`
- [ ] Generate catch fallback error message is `"Generation failed"`

### POSTER_SIZES pdfPoints Dimensions

- [ ] Each poster size in `POSTER_SIZES` defines a `pdfPoints` object with `width` and `height` in PDF point units
- [ ] `a0_portrait` pdfPoints: width 2384, height 3370
- [ ] `a0_landscape` pdfPoints: width 3370, height 2384
- [ ] `a1_portrait` pdfPoints: width 1684, height 2384
- [ ] `a1_landscape` pdfPoints: width 2384, height 1684
- [ ] `48x36` pdfPoints: width 3456, height 2592
- [ ] `36x24` pdfPoints: width 2592, height 1728

### Behavior Corrections (Pass 2)

All Codex pass 1 behavior corrections verified as still accurate — no changes needed.

### Components Referenced But Not Rendered

- `ReferenceImportPanel` is imported by `source-selector.tsx` but never renders in the poster wizard because `NewPosterPage` does not pass `onReferencesSelected` to `SourceSelector`
- `UrlSourceInput` (internal to `source-selector.tsx`) never renders in the poster wizard because `NewPosterPage` does not pass `onUrlSourcesChange` to `SourceSelector`
