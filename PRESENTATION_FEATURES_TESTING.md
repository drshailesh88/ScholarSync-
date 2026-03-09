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
- [ ] **3.10** Selecting a source advances to Step 1

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
- [ ] **3.39** On success, navigates to `/presentation/{deckId}`
- [ ] **3.40** Error during generation shows meaningful message
- [ ] **3.41** Back button works to return to previous steps

---

## 4. Deck Editor -- Layout & Navigation (`/presentation/[deckId]`)

- [ ] **4.1** Three-column layout renders: sidebar (left), canvas (center), panel (right)
- [ ] **4.2** Left sidebar is ~w-64 width
- [ ] **4.3** Right panel is ~w-72 width
- [ ] **4.4** Center canvas fills remaining space
- [ ] **4.5** Editor loads deck data from deckId route param
- [ ] **4.6** Invalid deckId shows error state
- [ ] **4.7** Save status indicator is visible (saved/saving/unsaved)

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
| 9.10 | code | Code block with highlighting | |
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
- [ ] **9.27** Code block applies syntax highlighting

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
| 10.11 | Presenter Mode | -- | Enters fullscreen presenter mode | |

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
- [ ] **17.6** Compare versions shows diff between two versions

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

- [ ] **19.1** Entering presenter mode goes fullscreen
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
| 19.16 | T | Toggle timer | |
| 19.17 | N | Toggle notes | |

### Broadcasting

- [ ] **19.18** BroadcastChannel "presenter-slide-sync" is created on enter
- [ ] **19.19** Slide index changes are broadcast to audience view
- [ ] **19.20** Screen mode changes (black/white/normal) are broadcast
- [ ] **19.21** Init message is sent when audience connects

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

## Summary

| Section | Total Checks |
|---------|-------------|
| 1. List Page | 14 |
| 2. Blank Mode | 15 |
| 3. AI GenerationWizard | 41 |
| 4. Editor Layout | 7 |
| 5. Slide Outline Sidebar | 10 |
| 6. Slide Canvas | 9 |
| 7. Design Panel | 7 |
| 8. Slide Layouts | 21 |
| 9. Content Block Types | 27 |
| 10. Toolbar Actions | 14 |
| 11. Agent Panel | 16 |
| 12. Coach Panel | 11 |
| 13. Defense Prep Panel | 18 |
| 14. Comments Panel | 10 |
| 15. Analytics Panel | 8 |
| 16. Share Panel | 7 |
| 17. Version History Panel | 6 |
| 18. Recordings Panel | 8 |
| 19. Presenter Mode | 21 |
| 20. Audience View | 9 |
| 21. AI Per-Slide Tools | 18 |
| 22. Preset Themes | 25 |
| 23. API Routes | 21 |
| 24. Store & State | 16 |
| 25. Loading/Error/Edge Cases | 10 |
| **Total** | **394** |

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
