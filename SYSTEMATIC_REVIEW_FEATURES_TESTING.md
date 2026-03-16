# ScholarSync Systematic Review — Complete Feature Inventory & Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the Systematic Review module (`/systematic-review` hub and `/systematic-review/[projectId]` workflow).
> **Generated**: March 2026
> **Source**: `src/app/(app)/systematic-review/`, `src/lib/systematic-review-store.ts`, API routes under `src/app/api/systematic-review/`, and all panel/component files.

---

## Table of Contents

1. [Page Overview & Architecture](#1-page-overview--architecture)
2. [Hub Page — Project List](#2-hub-page--project-list)
3. [Hub Page — Create New Review](#3-hub-page--create-new-review)
4. [Hub Page — Project Cards](#4-hub-page--project-cards)
5. [Workflow Page — Layout & Navigation](#5-workflow-page--layout--navigation)
6. [Workflow Page — Collaborator Presence](#6-workflow-page--collaborator-presence)
7. [Workflow Page — Project Header & Stage Stepper](#7-workflow-page--project-header--stage-stepper)
8. [Workflow Page — Tab System (15 Tabs)](#8-workflow-page--tab-system-15-tabs)
9. [Search Strategy Panel](#9-search-strategy-panel)
10. [Paper Import Panel](#10-paper-import-panel)
11. [Screening Panel](#11-screening-panel)
12. [PRISMA Flow Panel](#12-prisma-flow-panel)
13. [PRISMA Checklist Panel](#13-prisma-checklist-panel)
14. [Unified Risk of Bias Panel](#14-unified-risk-of-bias-panel)
15. [Data Extraction Panel](#15-data-extraction-panel)
16. [Meta-Analysis Panel](#16-meta-analysis-panel)
17. [Network Meta-Analysis Panel](#17-network-meta-analysis-panel)
18. [GRADE Panel](#18-grade-panel)
19. [Manuscript Panel](#19-manuscript-panel)
20. [Snowballing Panel](#20-snowballing-panel)
21. [Import/Export Panel](#21-importexport-panel)
22. [Protocol Panel](#22-protocol-panel)
23. [PROSPERO Export Panel](#23-prospero-export-panel)
24. [Activity Feed](#24-activity-feed)
25. [Zustand Store & Persistence](#25-zustand-store--persistence)
26. [API Routes](#26-api-routes)
27. [Loading & Error States](#27-loading--error-states)
28. [Accessibility](#28-accessibility)
29. [Quick Test Workflows](#29-quick-test-workflows)

---

## 1. Page Overview & Architecture

The Systematic Review module spans **two** pages and provides a PRISMA 2020-compliant end-to-end pipeline:

| Page | Route | Purpose |
|------|-------|---------|
| **Hub** | `/systematic-review` | Lists all SR projects with stage badges and progress indicators |
| **Workflow** | `/systematic-review/[projectId]` | Multi-tab workspace covering all stages from search strategy through reporting |

### Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│  Hub Page: /systematic-review                                        │
│  ┌─────────────────────────────────┐  ┌─────────────────────────┐    │
│  │  Header + "New Review" button   │  │  Create Form (toggle)   │    │
│  └─────────────────────────────────┘  └─────────────────────────┘    │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                              │
│  │ Project │  │ Project │  │ Project │  ... (card grid)              │
│  │ Card    │  │ Card    │  │ Card    │                              │
│  └─────────┘  └─────────┘  └─────────┘                              │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  Workflow Page: /systematic-review/[projectId]                        │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  Back Link | CollaboratorPresence | ProjectHeader (7-stage)      ││
│  ├──────────────────────────────────────────────────────────────────┤│
│  │  15 Workflow Tabs (scrollable horizontal tab bar)                ││
│  ├──────────────────────────────────────────────────────────────────┤│
│  │                                                                  ││
│  │                   Active Panel Content                           ││
│  │                   (renders based on selected tab)                ││
│  │                                                                  ││
│  ├──────────────────────────────────────────────────────────────────┤│
│  │  Activity Feed (real-time log)                                   ││
│  └──────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────┘
```

### Technology Stack

- [ ] **Liveblocks** — real-time collaboration via `SRRoomProvider`
- [ ] **Zustand** — state management with `systematic-review-store.ts` (persistence enabled)
- [ ] **15 panel components** — one per workflow tab
- [ ] **7-stage stepper** — tracks overall review progress

---

## 2. Hub Page — Project List

Route: `/systematic-review`

### Header

- [ ] **Icon** — FlowArrow icon displayed next to title
- [ ] **Title** — "Systematic Reviews" heading rendered
- [ ] **Description** — "PRISMA 2020-compliant systematic review pipeline with AI-powered screening, data extraction, and risk of bias assessment"

### Project List

- [ ] **Projects load on mount** — fetches from `GET /api/systematic-review/projects`
- [ ] **Loading state** — shows loading indicator while projects fetch
- [ ] **Empty state** — appropriate message when no projects exist
- [ ] **Project cards** — renders one card per project (see section 4)
- [ ] **Grid layout** — cards arranged in responsive grid

---

## 3. Hub Page — Create New Review

### "New Review" Button

- [ ] **Button label** — "New Review"
- [ ] **Icon** — Plus icon displayed in button
- [ ] **Click action** — toggles visibility of create form
- [ ] **Button position** — in header area, visually prominent

### Create Form

- [ ] **Title input** — text input for review title
- [ ] **Placeholder** — "e.g., Metformin vs Sulfonylureas for T2DM: A Systematic Review"
- [ ] **"Create Review" button** — submits the form
- [ ] **Spinner** — loading spinner shown on "Create Review" button during submission
- [ ] **"Cancel" button** — hides the create form without submitting
- [ ] **Validation** — empty title cannot be submitted
- [ ] **Success** — navigates to newly created project workflow page
- [ ] **Error handling** — displays error if creation fails
- [ ] **API call** — `POST /api/systematic-review/config` to create the review

---

## 4. Hub Page — Project Cards

Each project renders as a card with the following elements:

### Card Content

- [ ] **Title** — project title displayed prominently
- [ ] **Stage badge** — shows current stage with color coding
- [ ] **Paper count** — number of papers in the review
- [ ] **Screening progress** — percentage of papers screened
- [ ] **Progress bar** — visual bar representing screening completion

### Stage Badge Colors

| Stage Value | Label | Color | Test |
|-------------|-------|-------|------|
| `search_strategy` | Search Strategy | Blue | [ ] Correct color |
| `screening` | Screening | Amber | [ ] Correct color |
| `full_text_screening` | Full-Text Screening | Orange | [ ] Correct color |
| `data_extraction` | Data Extraction | Purple | [ ] Correct color |
| `risk_of_bias` | Risk of Bias | Rose | [ ] Correct color |
| `meta_analysis` | Meta-Analysis | Emerald | [ ] Correct color |
| `reporting` | Reporting | Sky | [ ] Correct color |

### Card Interactions

- [ ] **Click** — navigates to `/systematic-review/[projectId]`
- [ ] **Hover state** — visual feedback on card hover
- [ ] **Progress bar fill** — proportional to screening progress percentage
- [ ] **Paper count formatting** — correct numeric display

---

## 5. Workflow Page — Layout & Navigation

Route: `/systematic-review/[projectId]`

### Wrapper

- [ ] **SRRoomProvider** — page wrapped in Liveblocks room provider for real-time collaboration
- [ ] **Project ID** — extracted from URL params and used to fetch/hydrate state

### Navigation

- [ ] **Back link** — "All Reviews" text link navigates back to `/systematic-review`
- [ ] **Back link position** — top-left of page
- [ ] **Browser back** — back navigation returns to hub page

---

## 6. Workflow Page — Collaborator Presence

### Online Indicators

- [ ] **CollaboratorPresence component** — renders in workflow page header
- [ ] **Avatar display** — shows online collaborator avatars
- [ ] **Tooltips** — hover shows collaborator name, current tab, and current paper
- [ ] **WiFi status indicator** — shows connection status icon
- [ ] **Real-time updates** — avatars appear/disappear as collaborators join/leave

### Collaborator API

- [ ] `GET /api/systematic-review/collaborators` — fetches team members
- [ ] `POST /api/systematic-review/collaborators` — adds a collaborator
- [ ] `PUT /api/systematic-review/collaborators` — updates collaborator role/permissions
- [ ] `DELETE /api/systematic-review/collaborators` — removes a collaborator

---

## 7. Workflow Page — Project Header & Stage Stepper

### Project Header

- [ ] **Title** — project title displayed in header
- [ ] **Subtitle** — "PRISMA 2020-compliant systematic review"
- [ ] **Paper count badge** — shows total paper count in a pill/badge

### 7-Stage Stepper

The stepper shows progress through the entire systematic review pipeline:

| Step | Stage | Test |
|------|-------|------|
| 1 | Search Strategy | [ ] Renders, highlights when active |
| 2 | Screening | [ ] Renders, highlights when active |
| 3 | Full-Text Screening | [ ] Renders, highlights when active |
| 4 | Data Extraction | [ ] Renders, highlights when active |
| 5 | Risk of Bias | [ ] Renders, highlights when active |
| 6 | Meta-Analysis | [ ] Renders, highlights when active |
| 7 | Reporting | [ ] Renders, highlights when active |

- [ ] **Active stage** — visually highlighted (filled/colored)
- [ ] **Completed stages** — show completion indicator
- [ ] **Future stages** — shown as inactive/dimmed
- [ ] **Connectors** — lines or arrows between steps
- [ ] **Stage updates** — stepper reflects `reviewStage` from store

---

## 8. Workflow Page — Tab System (15 Tabs)

### Tab Bar

- [ ] **Horizontal scrollable** — tabs arranged in a scrollable horizontal bar
- [ ] **Active tab** — visually highlighted
- [ ] **Tab icons** — each tab has a unique Phosphor icon
- [ ] **Tab labels** — descriptive text label on each tab
- [ ] **Click** — switches active panel content

### Tab Registry

| Tab Key | Label | Icon | Panel Component | Test |
|---------|-------|------|-----------------|------|
| `strategy` | Search Strategy | MagnifyingGlass | SearchStrategyPanel | [ ] Selectable |
| `import` | Import Papers | DownloadSimple | PaperImportPanel | [ ] Selectable |
| `screening` | AI Screening | Funnel | ScreeningPanel | [ ] Selectable |
| `prisma` | PRISMA Flow | FlowArrow | PRISMAFlowPanel | [ ] Selectable |
| `rob` | Risk of Bias | ShieldCheck | UnifiedRoBPanel | [ ] Selectable |
| `extraction` | Data Extraction | Table | DataExtractionPanel | [ ] Selectable |
| `meta_analysis` | Meta-Analysis | ChartBar | MetaAnalysisPanel | [ ] Selectable |
| `nma` | Network MA | ShareNetwork | NMAPanel | [ ] Selectable |
| `grade` | GRADE | Certificate | GRADEPanel | [ ] Selectable |
| `manuscript` | Manuscript | Article | ManuscriptPanel | [ ] Selectable |
| `snowball` | Snowballing | Graph | SnowballingPanel | [ ] Selectable |
| `export` | Export | Export | ImportExportPanel | [ ] Selectable |
| `living` | Living Review | Bell | LivingReviewPanel | [ ] Selectable |
| `protocol` | Protocol | Scroll | ProtocolPanel | [ ] Selectable |
| `prospero` | PROSPERO | ArrowSquareOut | PROSPEROExport | [ ] Selectable |

- [ ] **Tab persistence** — `activeTab` stored in Zustand and survives page refresh
- [ ] **Default tab** — first tab selected on initial load
- [ ] **All 15 tabs** — verify all 15 tabs render in the bar

---

## 9. Search Strategy Panel

The entry point for a systematic review: define PICO and generate a PubMed search strategy.

### PICO Input Form

| Field | Label | Required | Placeholder | Test |
|-------|-------|----------|-------------|------|
| P | Population | Yes | Population description | [ ] Input accepts text |
| I | Intervention | Yes | Intervention description | [ ] Input accepts text |
| C | Comparison | No (optional) | Comparison description | [ ] Input accepts text, can be left empty |
| O | Outcome | Yes | Outcome description | [ ] Input accepts text |

- [ ] **Form layout** — 4 labeled input fields for P, I, C, O
- [ ] **Comparison marked optional** — visual indicator that C is not required
- [ ] **All fields editable** — free-text input for each PICO element

### Generate Search Strategy

- [ ] **"Generate Search Strategy" button** — triggers strategy generation
- [ ] **API call** — `POST /api/systematic-review/search-strategy` with PICO data
- [ ] **Loading state** — button shows spinner during generation
- [ ] **Disabled while loading** — button not clickable during API call

### Strategy Results

- [ ] **Estimated PubMed count** — shows estimated number of results
- [ ] **PICO blocks** — each PICO element rendered as a block with terms
- [ ] **MeSH terms** — displayed with green color coding within blocks
- [ ] **Free-text terms** — displayed with blue color coding within blocks
- [ ] **Full search string** — complete PubMed query string displayed
- [ ] **Copy button** — copies the full search string to clipboard
- [ ] **Suggested filters** — additional filters shown with amber color coding

### CTA

- [ ] **"Import Papers Using This Strategy" button** — transitions to import tab with strategy pre-loaded
- [ ] **Tab switch** — clicking the CTA switches active tab to `import`
- [ ] **Strategy carried over** — generated strategy available in import panel

---

## 10. Paper Import Panel

### Source Selection

| Source | Key | Test |
|--------|-----|------|
| PubMed | `pubmed` | [ ] Selectable as import source |
| Semantic Scholar | `semantic_scholar` | [ ] Selectable as import source |
| OpenAlex | `openalex` | [ ] Selectable as import source |

- [ ] **Source toggle/selector** — UI to pick which database to search
- [ ] **Multiple sources** — can switch between sources

### Search Configuration

- [ ] **Custom search input** — free-text search query field
- [ ] **Use generated strategy** — option to use the strategy from Search Strategy tab
- [ ] **Max results config** — configurable limit (default: 100)
- [ ] **Max results input** — numeric input or dropdown for result limit

### Paper Results

- [ ] **Paper list** — results displayed in a scrollable list
- [ ] **Expand/collapse** — each paper entry can be expanded for details
- [ ] **Paper metadata** — title, authors, abstract, year, journal
- [ ] **Selection** — papers can be selected/deselected for import

### PDF Upload

- [ ] **PDF upload area** — drag-and-drop or click to upload PDFs
- [ ] **File processing** — uploaded PDFs processed and added to review

### Duplicate Detection

- [ ] **Duplicate detection** — system identifies duplicate papers across sources
- [ ] **Duplicate indicators** — duplicates visually flagged
- [ ] **Duplicate resolution** — mechanism to keep/remove duplicates

### API

- [ ] `POST /api/systematic-review/import-references` — imports selected references
- [ ] `GET /api/systematic-review/import-references` — retrieves imported references

---

## 11. Screening Panel

The most feature-rich panel, supporting human, AI, and comparative screening modes.

### Criteria Management

- [ ] **"Define Inclusion/Exclusion Criteria" button** — Plus icon, opens criteria editor
- [ ] **Inclusion criteria** — list of inclusion rules
- [ ] **Exclusion criteria** — list of exclusion rules
- [ ] **Add criteria** — new criteria can be added
- [ ] **Edit criteria** — existing criteria editable
- [ ] **Delete criteria** — criteria can be removed

### Screening Modes

| Mode | Icon | Description | Test |
|------|------|-------------|------|
| Human | User | Manual screening by reviewers | [ ] Selectable |
| AI | Robot | Automated AI-powered screening | [ ] Selectable |
| Compare | Handshake | Dual human-AI comparison screening | [ ] Selectable |

- [ ] **Mode toggle** — UI to switch between Human, AI, and Compare modes
- [ ] **Mode icons** — correct icons displayed (User, Robot, Handshake)

### AI Screening

- [ ] **"Run AI Screening" button** — Lightning icon, triggers batch AI screening
- [ ] **API call** — `POST /api/systematic-review/screen` (single or batch, max 100)
- [ ] **Triple-agent screening** — AI uses triple-agent approach for reliability
- [ ] **AI reasoning display** — shows AI rationale for each screening decision
- [ ] **Priority scoring** — papers ranked by screening priority
- [ ] **Batch processing** — screens multiple papers in one operation
- [ ] **Progress indicator** — shows screening progress during batch operation

### Screening Filters

| Filter | Description | Test |
|--------|-------------|------|
| All | Shows all papers | [ ] Displays full list |
| Unscreened | Papers not yet screened | [ ] Filters correctly |
| Conflicts | Papers with disagreements | [ ] Filters correctly |
| Uncertain | Papers marked as uncertain/maybe | [ ] Filters correctly |

- [ ] **Filter toggle** — UI to switch between filter views
- [ ] **Filter counts** — badge showing number of papers in each filter

### Dual Screening & Inter-Rater Agreement

- [ ] **Dual-screening support** — two independent reviewers can screen same paper
- [ ] **Inter-rater agreement** — kappa or percentage agreement calculated and displayed
- [ ] **Blinded mode toggle** — EyeSlash (blinded) / Eye (unblinded) icons
- [ ] **Blinded screening** — second reviewer cannot see first reviewer's decision
- [ ] **Unblinded mode** — decisions visible to both reviewers

### Conflict Resolution

- [ ] **Conflict detection** — papers where reviewers disagree are flagged
- [ ] **Conflict resolution UI** — mechanism to resolve disagreements
- [ ] **Resolution actions** — arbiter can make final include/exclude decision

### Per-Paper Actions

| Action | Icon | Test |
|--------|------|------|
| Include | CheckCircle or similar | [ ] Marks paper as included |
| Exclude | XCircle or similar | [ ] Marks paper as excluded |
| Maybe | Question or similar | [ ] Marks paper as uncertain |
| Save | FloppyDisk | [ ] Saves screening decision |

- [ ] **Decision persistence** — decisions saved via screening queue API
- [ ] **Decision display** — each paper shows its current screening status
- [ ] **Decision changeable** — screening decision can be updated

### Refresh

- [ ] **"Refresh" button** — ArrowsClockwise icon, refreshes screening data
- [ ] **Reloads from API** — `GET /api/systematic-review/screening-queue`

### Screening Queue API

- [ ] `GET /api/systematic-review/screening-queue` — fetches queue with priority ordering
- [ ] `POST /api/systematic-review/screening-queue` — submits screening decisions
- [ ] `PUT /api/systematic-review/screening-queue` — updates decisions, triggers priority recomputation

---

## 12. PRISMA Flow Panel

### Diagram Generation

- [ ] **"Generate Diagram" button** — triggers PRISMA 2020 flow diagram generation
- [ ] **Auto-generated** — diagram built from actual screening/import data
- [ ] **SVG output** — diagram rendered as SVG in the panel
- [ ] **PRISMA 2020-compliant** — follows official PRISMA 2020 flow diagram template

### Diagram Content

- [ ] **Identification box** — shows records identified from databases
- [ ] **Screening box** — shows records screened and excluded
- [ ] **Eligibility box** — shows full-text articles assessed
- [ ] **Included box** — shows studies included in review
- [ ] **Exclusion reasons** — reasons for exclusion shown at each stage
- [ ] **Counts accurate** — numbers match actual project data

### Export

- [ ] **"Download SVG" button** — downloads the PRISMA diagram as SVG file
- [ ] **SVG quality** — downloaded file is valid, well-formed SVG
- [ ] **Print-ready** — diagram suitable for manuscript inclusion

---

## 13. PRISMA Checklist Panel

### Checklist Variants

| Variant | Items | Description | Test |
|---------|-------|-------------|------|
| PRISMA 2020 | 27 items | Standard systematic review checklist | [ ] Loads correctly |
| PRISMA-S | 16 items | Search reporting extension | [ ] Loads correctly |
| PRISMA-NMA | 5 items | Network meta-analysis extension | [ ] Loads correctly |

- [ ] **Variant selector** — UI to switch between 3 checklist variants
- [ ] **Correct item count** — each variant shows the correct number of items

### Checklist Items

Each item has a compliance status:

| Status | Icon | Color | Test |
|--------|------|-------|------|
| Reported | CheckCircle | Emerald | [ ] Correct icon and color |
| Partially | WarningCircle | Amber | [ ] Correct icon and color |
| Not Reported | XCircle | Red | [ ] Correct icon and color |
| Not Applicable | MinusCircle | Gray | [ ] Correct icon and color |

- [ ] **Status toggle** — each item's status can be changed
- [ ] **Item description** — each checklist item shows its description
- [ ] **Section headings** — items grouped by PRISMA section

### Manuscript Verification

- [ ] **Manuscript paste area** — text area to paste manuscript text
- [ ] **Verify button** — triggers AI verification against checklist
- [ ] **Auto-check** — AI scans manuscript and auto-populates compliance statuses

### Compliance Summary

- [ ] **Compliance percentage** — overall percentage displayed
- [ ] **Breakdown** — counts per status (reported, partially, not reported, N/A)
- [ ] **Color-coded summary** — uses status colors in summary display

### Export

- [ ] **CSV export** — downloads completed checklist as CSV file
- [ ] **CSV format** — includes item number, description, status, and notes

---

## 14. Unified Risk of Bias Panel

### Tool Selection

| Tool | Color | Target Study Type | Test |
|------|-------|-------------------|------|
| RoB 2 | Blue | Randomized Controlled Trials (RCTs) | [ ] Selectable |
| ROBINS-I | Purple | Observational studies | [ ] Selectable |
| QUADAS-2 | Teal | Diagnostic accuracy studies | [ ] Selectable |

- [ ] **Tool toggle** — UI to select which RoB tool to use
- [ ] **Auto-detection** — system auto-detects appropriate tool based on study type
- [ ] **Manual override** — user can override auto-detected tool selection
- [ ] **Color coding** — each tool renders with its designated color

### RoB 2 (for RCTs)

- [ ] **Domain assessment** — assess each RoB 2 domain
- [ ] **Domains** — randomization, deviations, missing data, measurement, selection
- [ ] **Per-domain judgment** — Low / Some concerns / High risk
- [ ] **Supporting text** — space for justification per domain
- [ ] **Overall judgment** — aggregated across domains

### ROBINS-I (for Observational Studies)

- [ ] **Domain assessment** — assess each ROBINS-I domain
- [ ] **Domains** — confounding, selection, classification, deviations, missing, measurement, reporting
- [ ] **Per-domain judgment** — Low / Moderate / Serious / Critical risk
- [ ] **Supporting text** — justification per domain
- [ ] **Overall judgment** — aggregated across domains

### QUADAS-2 (for Diagnostic Studies)

- [ ] **Domain assessment** — assess each QUADAS-2 domain
- [ ] **Domains** — patient selection, index test, reference standard, flow and timing
- [ ] **Per-domain judgment** — Low / High / Unclear risk
- [ ] **Applicability concerns** — separate applicability assessment
- [ ] **Overall judgment** — aggregated across domains

### Judgment Color Coding

| Judgment | Color | Test |
|----------|-------|------|
| Low risk | Emerald | [ ] Correct color |
| Some concerns | Amber | [ ] Correct color |
| Moderate risk | Yellow | [ ] Correct color |
| High risk | Orange | [ ] Correct color |
| Serious risk | Red | [ ] Correct color |
| Critical risk | Red (darker) | [ ] Correct color |

### Batch Assessment

- [ ] **"Assess All" button** — triggers batch RoB assessment for all included papers
- [ ] **Batch progress** — shows progress during batch operation
- [ ] **Per-paper results** — each paper gets individual assessment

### API Routes

- [ ] `POST /api/systematic-review/rob2` — submits RoB 2 assessment
- [ ] `GET /api/systematic-review/rob2` — retrieves RoB 2 results
- [ ] `POST /api/systematic-review/robins-i` — submits ROBINS-I assessment
- [ ] `GET /api/systematic-review/robins-i` — retrieves ROBINS-I results
- [ ] `POST /api/systematic-review/quadas2` — submits QUADAS-2 assessment
- [ ] `GET /api/systematic-review/quadas2` — retrieves QUADAS-2 results

---

## 15. Data Extraction Panel

### Schema Definition

- [ ] **Custom schema builder** — UI to define extraction fields
- [ ] **Field name** — text input for field name
- [ ] **Field description** — text input for field description
- [ ] **Field type** — dropdown with options:

| Type | Description | Test |
|------|-------------|------|
| `text` | Free-text field | [ ] Selectable |
| `number` | Numeric field | [ ] Selectable |
| `boolean` | Yes/no field | [ ] Selectable |
| `select` | Dropdown/choice field | [ ] Selectable |

- [ ] **Add field** — new fields can be added to schema
- [ ] **Remove field** — existing fields can be deleted
- [ ] **Reorder fields** — fields can be reordered (if supported)

### AI Extraction

- [ ] **"Run Extraction" button** — Lightning icon, triggers AI data extraction
- [ ] **API call** — `POST /api/systematic-review/extract` (single/batch/fulltext modes)
- [ ] **Single mode** — extracts from one paper at a time
- [ ] **Batch mode** — extracts from multiple papers
- [ ] **Fulltext mode** — uses full-text PDF content for extraction
- [ ] **Confidence badges** — each extracted value shows confidence score
- [ ] **Confidence color coding** — high/medium/low confidence visually differentiated

### Source Linking

- [ ] **Page number references** — extracted data linked to source page numbers
- [ ] **Source linking** — click to jump to relevant passage in paper
- [ ] **Provenance tracking** — each extracted value traces back to source text

### Manual Editing

- [ ] **Editable cells** — extracted values can be manually edited
- [ ] **Override AI values** — manual edits override AI-extracted data
- [ ] **Save edits** — changes persisted

### Matrix Table View

- [ ] **Table layout** — papers as rows, extraction fields as columns
- [ ] **Scrollable** — horizontal scroll for many fields
- [ ] **Sortable** — columns sortable (if supported)
- [ ] **All papers visible** — every included paper has a row

### Export

- [ ] **"Download CSV" button** — exports extraction data as CSV
- [ ] **CSV format** — rows = papers, columns = extraction fields
- [ ] **Complete data** — all extracted values included in export

---

## 16. Meta-Analysis Panel

### Effect Size Configuration

| Effect Type | Abbreviation | Description | Test |
|-------------|-------------|-------------|------|
| Odds Ratio | OR | Binary outcomes | [ ] Selectable |
| Risk Ratio | RR | Binary outcomes | [ ] Selectable |
| Standardized Mean Difference | SMD | Continuous outcomes (different scales) | [ ] Selectable |
| Mean Difference | MD | Continuous outcomes (same scale) | [ ] Selectable |
| Risk Difference | RD | Absolute effect | [ ] Selectable |

- [ ] **Effect type selector** — dropdown or radio to choose effect measure

### Model Selection

| Model | Description | Test |
|-------|-------------|------|
| Fixed-effect | Assumes one true effect | [ ] Selectable |
| Random-effects | Allows effect variation | [ ] Selectable |

- [ ] **Model toggle** — switch between fixed and random effects
- [ ] **Trim-and-fill** — option to apply trim-and-fill adjustment for publication bias

### Result Tabs

| Tab | Content | Test |
|-----|---------|------|
| Main | Primary forest plot + summary statistics | [ ] Renders correctly |
| Subgroup | Subgroup analysis results | [ ] Renders correctly |
| Sensitivity | Leave-one-out sensitivity analysis | [ ] Renders correctly |

### Forest Plot

- [ ] **Forest plot rendered** — standard meta-analysis forest plot
- [ ] **Study labels** — each study labeled on left
- [ ] **Effect estimates** — point estimates with confidence intervals
- [ ] **Diamond summary** — pooled effect shown as diamond
- [ ] **Heterogeneity stats** — I-squared, tau-squared, Q-test displayed
- [ ] **Weights** — study weights shown

### Funnel Plot

- [ ] **Funnel plot rendered** — standard funnel plot for publication bias
- [ ] **Symmetry assessment** — visual inspection of asymmetry
- [ ] **Trim-and-fill** — imputed studies shown if trim-and-fill enabled

### Subgroup Analysis

- [ ] **Subgroup definition** — UI to define subgroups
- [ ] **Subgroup forest plots** — separate analyses per subgroup
- [ ] **Between-group comparison** — test for subgroup differences

### Sensitivity Analysis

- [ ] **Leave-one-out** — iteratively removes each study
- [ ] **Results table** — shows effect with each study removed
- [ ] **Influence detection** — highlights studies that strongly influence results

### API

- [ ] `POST /api/systematic-review/meta-analysis` — runs meta-analysis
- [ ] `GET /api/systematic-review/meta-analysis` — retrieves saved results

---

## 17. Network Meta-Analysis Panel

### Study Input

- [ ] **Treatment pair input** — define comparisons between treatments
- [ ] **Treatment A** — input field for first treatment
- [ ] **Treatment B** — input field for second treatment
- [ ] **Effect data** — input fields for effect size and variance
- [ ] **Add comparison** — button to add new study comparison
- [ ] **Remove comparison** — button to remove a comparison

### Result Tabs

| Tab | Icon | Content | Test |
|-----|------|---------|------|
| League Table | TableIcon | Pairwise comparison matrix | [ ] Renders correctly |
| Network Plot | Graph | Network geometry visualization | [ ] Renders correctly |
| Forest Plot | TreeStructure | NMA forest plot | [ ] Renders correctly |
| Inconsistency | Warning | Inconsistency assessment | [ ] Renders correctly |
| Rankings | Trophy | Treatment rankings (SUCRA/P-score) | [ ] Renders correctly |

### League Table

- [ ] **Matrix format** — treatments on rows and columns
- [ ] **Pairwise comparisons** — effect estimates in cells
- [ ] **Confidence intervals** — shown for each comparison
- [ ] **Color coding** — significant effects highlighted

### Network Plot

- [ ] **Node rendering** — each treatment as a node
- [ ] **Edge rendering** — direct comparisons as edges
- [ ] **Node size** — proportional to sample size
- [ ] **Edge thickness** — proportional to number of studies

### Inconsistency Assessment

- [ ] **Global inconsistency test** — overall network consistency
- [ ] **Loop inconsistency** — specific loops with inconsistency detected
- [ ] **Node-splitting** — local inconsistency assessment

### Rankings

- [ ] **SUCRA or P-scores** — treatment ranking scores
- [ ] **Ranking table** — treatments ordered by ranking
- [ ] **Rankogram** — visual ranking probabilities (if applicable)

### Export

- [ ] **CSV export** — league table and rankings downloadable as CSV

### API

- [ ] `POST /api/systematic-review/nma` — runs network meta-analysis

---

## 18. GRADE Panel

### Domain Assessment

| Domain | Key | Description | Test |
|--------|-----|-------------|------|
| Risk of Bias | `risk_of_bias` | Limitations in study design | [ ] Assessable |
| Inconsistency | `inconsistency` | Heterogeneity across studies | [ ] Assessable |
| Indirectness | `indirectness` | Applicability of evidence | [ ] Assessable |
| Imprecision | `imprecision` | Width of confidence intervals | [ ] Assessable |
| Publication Bias | `publication_bias` | Selective reporting | [ ] Assessable |

### Domain Ratings

| Rating | Color | Test |
|--------|-------|------|
| No serious concern | Emerald | [ ] Correct color |
| Serious concern | Amber | [ ] Correct color |
| Very serious concern | Red | [ ] Correct color |

- [ ] **Per-domain selector** — each domain has a rating selector
- [ ] **Justification text** — space for written rationale per domain
- [ ] **Downgrade indicators** — visual cue when domain causes downgrade

### Overall Certainty

| Level | Color | Test |
|-------|-------|------|
| High | Emerald | [ ] Correct color |
| Moderate | Blue | [ ] Correct color |
| Low | Amber | [ ] Correct color |
| Very Low | Red | [ ] Correct color |

- [ ] **Auto-calculated** — overall certainty derived from domain ratings
- [ ] **Visual indicator** — prominent display of overall certainty level
- [ ] **Upgrade factors** — large effect, dose-response, confounding considered

### Export

- [ ] **CSV export** — GRADE evidence table downloadable as CSV
- [ ] **Complete data** — includes all domains, ratings, justifications, and overall certainty

### API

- [ ] `POST /api/systematic-review/grade` — submits GRADE assessment
- [ ] `GET /api/systematic-review/grade` — retrieves GRADE results + CSV export

---

## 19. Manuscript Panel

### Section Generation

| Section | Content | Test |
|---------|---------|------|
| Abstract | Structured abstract of the review | [ ] Generates correctly |
| Introduction | Background and rationale | [ ] Generates correctly |
| Methods | Search strategy, screening, analysis methods | [ ] Generates correctly |
| Results | Study selection, characteristics, synthesis | [ ] Generates correctly |
| Discussion | Interpretation, limitations, implications | [ ] Generates correctly |

- [ ] **5 sections** — all 5 manuscript sections available
- [ ] **Individual generation** — each section can be generated independently
- [ ] **"Generate All" button** — generates all 5 sections in sequence
- [ ] **Custom instructions** — text input for additional instructions per section
- [ ] **AI-generated content** — sections generated based on review data

### Section Editing

- [ ] **Editable text** — generated sections can be manually edited
- [ ] **Rich text** — sections support formatting (headings, lists, etc.)
- [ ] **Auto-save** — edits saved automatically

### Export

- [ ] **Copy to clipboard** — individual sections copiable
- [ ] **Download DOCX** — complete manuscript downloadable as Word document
- [ ] **Formatting preserved** — headings, references, and structure maintained in export

### API

- [ ] `POST /api/systematic-review/manuscript` — generates manuscript section(s)
- [ ] `GET /api/systematic-review/manuscript` — retrieves saved manuscript content

---

## 20. Snowballing Panel

### Configuration

- [ ] **Direction selector** — choose snowballing direction:

| Direction | Description | Test |
|-----------|-------------|------|
| Forward | Papers that cite the included studies | [ ] Selectable |
| Backward | Papers cited by the included studies | [ ] Selectable |
| Both | Forward and backward combined | [ ] Selectable |

- [ ] **Depth setting** — configurable depth (1 or 2 levels)
- [ ] **Depth 1** — direct citations only
- [ ] **Depth 2** — citations of citations

### Execution

- [ ] **Run snowballing** — triggers citation search
- [ ] **API call** — `POST /api/systematic-review/snowball`
- [ ] **Progress indicator** — shows progress during search
- [ ] **Results list** — newly discovered papers displayed

### Session History

- [ ] **Session tracking** — previous snowballing runs saved
- [ ] **Session list** — past sessions viewable with date and results
- [ ] **Session details** — expand to see papers found in each session

### Citation Network Visualization

- [ ] **Network graph** — visual network of citation relationships
- [ ] **Node interaction** — click nodes to view paper details
- [ ] **Edge display** — citation direction shown on edges
- [ ] **Included papers highlighted** — distinguish between included and new papers

### API

- [ ] `POST /api/systematic-review/snowball` — initiates snowball search
- [ ] `GET /api/systematic-review/snowball` — retrieves snowball results

---

## 21. Import/Export Panel

### Import

#### File Formats

| Format | Description | Test |
|--------|-------------|------|
| RIS | Research Information Systems format | [ ] Importable |
| BibTeX | LaTeX bibliography format | [ ] Importable |

- [ ] **Drag-and-drop** — files can be dragged onto import area
- [ ] **Click to upload** — file picker for selecting import files
- [ ] **File validation** — invalid files show error message
- [ ] **Parse preview** — shows count of papers found before confirming import
- [ ] **Duplicate handling** — detects and flags duplicates against existing papers

### Export

#### Export Formats

| Format | Description | Test |
|--------|-------------|------|
| RIS | Research Information Systems | [ ] Exports correctly |
| BibTeX | LaTeX bibliography | [ ] Exports correctly |
| Endnote | Endnote XML format | [ ] Exports correctly |
| CSV | Comma-separated values | [ ] Exports correctly |

- [ ] **Format selector** — dropdown or buttons to choose export format

#### Paper Filter

| Filter | Description | Test |
|--------|-------------|------|
| All | Export all papers in the review | [ ] Filters correctly |
| Included | Only papers that passed screening | [ ] Filters correctly |
| Excluded | Only papers that were excluded | [ ] Filters correctly |

- [ ] **Filter selector** — choose which papers to include in export

### RevMan Export

- [ ] **RevMan export** — specialized export compatible with Cochrane RevMan software
- [ ] **RevMan format** — correct XML structure for RevMan import

### API

- [ ] `POST /api/systematic-review/import-references` — imports reference files
- [ ] `GET /api/systematic-review/import-references` — retrieves imported references

---

## 22. Protocol Panel

### Protocol Generation

- [ ] **Generate from config** — auto-generates protocol from review configuration
- [ ] **API call** — `POST /api/systematic-review/protocol`
- [ ] **Generated sections** — protocol structured with standard sections

### Section Editing

- [ ] **Editable sections** — each protocol section individually editable
- [ ] **Guidance text** — each section shows guidance on what to include
- [ ] **Rich text editing** — formatting supported within sections

### Protocol Sections (Expected)

- [ ] **Title and registration** — review title and registration details
- [ ] **Background/rationale** — justification for the review
- [ ] **Objectives** — review question and aims
- [ ] **Methods** — search strategy, eligibility, screening, extraction, analysis
- [ ] **Timeline** — projected timeline for review completion

### PROSPERO ID Tracking

- [ ] **PROSPERO ID field** — input to enter/track PROSPERO registration number
- [ ] **ID validation** — format check for PROSPERO IDs (e.g., CRD42...)
- [ ] **ID persistence** — saved with project configuration

### API

- [ ] `GET /api/systematic-review/protocol` — retrieves saved protocol
- [ ] `POST /api/systematic-review/protocol` — generates/saves protocol

---

## 23. PROSPERO Export Panel

### Auto-Population

- [ ] **22 fields auto-populated** — fields pre-filled from review configuration and data
- [ ] **Field list** — all 22 PROSPERO registration fields present
- [ ] **Data sources** — fields populated from PICO, protocol, search strategy, screening criteria

### Field Editing

- [ ] **Editable fields** — each of the 22 fields can be manually edited before export
- [ ] **Validation** — required fields flagged if empty
- [ ] **Preview** — shows complete PROSPERO form before export

### Export

- [ ] **Download as text** — exports PROSPERO registration as plain text file
- [ ] **Complete fields** — all 22 fields included in export
- [ ] **Formatted output** — text file properly structured for PROSPERO submission

### API

- [ ] `GET /api/systematic-review/prospero` — retrieves auto-populated fields
- [ ] `POST /api/systematic-review/prospero` — saves/exports PROSPERO data

---

## 24. Activity Feed

### Real-Time Log

- [ ] **Activity feed component** — renders a chronological log of review activities
- [ ] **Real-time updates** — new entries appear without page refresh (via Liveblocks)
- [ ] **Chronological order** — most recent activity at top

### Entry Types

| Entry Type | Icon | Description | Test |
|------------|------|-------------|------|
| `decision-made` | CheckCircle | Screening decision recorded | [ ] Renders correctly |
| `extraction-complete` | Table | Data extraction completed | [ ] Renders correctly |
| `rob2-assessed` | ShieldCheck | Risk of bias assessment done | [ ] Renders correctly |
| `stage-advanced` | ArrowFatUp | Review stage progressed | [ ] Renders correctly |
| `papers-imported` | DownloadSimple | Papers imported into review | [ ] Renders correctly |

- [ ] **Entry content** — each entry shows timestamp, actor, action description
- [ ] **Icon color coding** — icons use appropriate colors per type
- [ ] **Entry details** — expandable for additional context (if applicable)

---

## 25. Zustand Store & Persistence

### Store: `systematic-review-store.ts`

#### State Properties

| Property | Type | Description | Test |
|----------|------|-------------|------|
| `projectId` | string | Current project identifier | [ ] Set on navigation |
| `projectTitle` | string | Current project title | [ ] Displays correctly |
| `reviewConfig` | object | Full review configuration | [ ] Loaded from API |
| `activeTab` | string | Currently selected tab | [ ] Persists on refresh |
| `reviewStage` | string | Current review stage | [ ] Updates with progress |
| `pico` | object | PICO elements (P, I, C, O) | [ ] Set from Search Strategy |
| `generatedStrategy` | object | Generated search strategy | [ ] Set from API response |
| `criteria` | array | Inclusion/exclusion criteria | [ ] Set from Screening |
| `screeningResults` | array | Paper screening outcomes | [ ] Updated per decision |
| `screeningSummary` | object | Screening progress summary | [ ] Updated on changes |
| `projects` | array | All SR projects for hub | [ ] Loaded on hub mount |
| `isLoadingProjects` | boolean | Projects loading state | [ ] True during fetch |

#### Persistence

- [ ] **Zustand persist middleware** — store persisted to localStorage
- [ ] **Rehydration** — state restored on page load
- [ ] **Tab persistence** — `activeTab` survives page refresh
- [ ] **Cross-tab sync** — state consistent across browser tabs (if applicable)
- [ ] **Clear on project switch** — stale state cleared when switching projects

---

## 26. API Routes

### Configuration & Projects

| Method | Endpoint | Purpose | Test |
|--------|----------|---------|------|
| POST | `/api/systematic-review/config` | Create new SR config | [ ] Returns project ID |
| GET | `/api/systematic-review/config` | Read SR config | [ ] Returns config object |
| PUT | `/api/systematic-review/config` | Update SR config | [ ] Persists changes |
| GET | `/api/systematic-review/projects` | List projects with paper counts and screening progress | [ ] Returns array |

### Search & Import

| Method | Endpoint | Purpose | Test |
|--------|----------|---------|------|
| POST | `/api/systematic-review/search-strategy` | Generate PubMed strategy from PICO | [ ] Returns strategy object |
| POST | `/api/systematic-review/import-references` | Import RIS/BibTeX references | [ ] Papers added |
| GET | `/api/systematic-review/import-references` | Retrieve imported references | [ ] Returns papers array |

### Screening

| Method | Endpoint | Purpose | Test |
|--------|----------|---------|------|
| POST | `/api/systematic-review/screen` | AI screening (single/batch max 100) | [ ] Returns decisions |
| GET | `/api/systematic-review/screening-queue` | Get screening queue | [ ] Returns ordered queue |
| POST | `/api/systematic-review/screening-queue` | Submit screening decisions | [ ] Decisions saved |
| PUT | `/api/systematic-review/screening-queue` | Update decisions + recompute priority | [ ] Priority updated |

### Extraction & Analysis

| Method | Endpoint | Purpose | Test |
|--------|----------|---------|------|
| POST | `/api/systematic-review/extract` | AI data extraction (single/batch/fulltext) | [ ] Returns extracted data |
| POST | `/api/systematic-review/meta-analysis` | Run meta-analysis | [ ] Returns results |
| GET | `/api/systematic-review/meta-analysis` | Retrieve saved meta-analysis | [ ] Returns saved results |
| POST | `/api/systematic-review/nma` | Run network meta-analysis | [ ] Returns NMA results |

### Risk of Bias

| Method | Endpoint | Purpose | Test |
|--------|----------|---------|------|
| POST | `/api/systematic-review/rob2` | Submit RoB 2 assessment | [ ] Assessment saved |
| GET | `/api/systematic-review/rob2` | Retrieve RoB 2 results | [ ] Returns assessments |
| POST | `/api/systematic-review/robins-i` | Submit ROBINS-I assessment | [ ] Assessment saved |
| GET | `/api/systematic-review/robins-i` | Retrieve ROBINS-I results | [ ] Returns assessments |
| POST | `/api/systematic-review/quadas2` | Submit QUADAS-2 assessment | [ ] Assessment saved |
| GET | `/api/systematic-review/quadas2` | Retrieve QUADAS-2 results | [ ] Returns assessments |

### GRADE & Reporting

| Method | Endpoint | Purpose | Test |
|--------|----------|---------|------|
| POST | `/api/systematic-review/grade` | Submit GRADE assessment | [ ] Assessment saved |
| GET | `/api/systematic-review/grade` | Retrieve GRADE results + CSV | [ ] Returns results |
| POST | `/api/systematic-review/manuscript` | Generate manuscript section(s) | [ ] Returns text |
| GET | `/api/systematic-review/manuscript` | Retrieve saved manuscript | [ ] Returns sections |
| GET | `/api/systematic-review/prospero` | Auto-populate PROSPERO fields | [ ] Returns 22 fields |
| POST | `/api/systematic-review/prospero` | Save/export PROSPERO data | [ ] Data saved |

### Collaboration & Additional

| Method | Endpoint | Purpose | Test |
|--------|----------|---------|------|
| GET | `/api/systematic-review/collaborators` | Fetch team members | [ ] Returns collaborators |
| POST | `/api/systematic-review/collaborators` | Add collaborator | [ ] Collaborator added |
| PUT | `/api/systematic-review/collaborators` | Update collaborator | [ ] Role updated |
| DELETE | `/api/systematic-review/collaborators` | Remove collaborator | [ ] Collaborator removed |
| POST | `/api/systematic-review/snowball` | Initiate snowball search | [ ] Returns new papers |
| GET | `/api/systematic-review/snowball` | Retrieve snowball results | [ ] Returns sessions |
| GET | `/api/systematic-review/gap-map` | Get evidence gap map | [ ] Returns gap map data |
| GET | `/api/systematic-review/protocol` | Retrieve protocol | [ ] Returns protocol text |
| POST | `/api/systematic-review/protocol` | Generate/save protocol | [ ] Protocol saved |

---

## 27. Loading & Error States

### Loading State (loading.tsx)

- [ ] **Skeleton tabs** — placeholder skeleton for the 15-tab bar
- [ ] **Skeleton content** — placeholder skeleton for panel content area
- [ ] **Pulse animation** — all skeletons animate with pulse
- [ ] **No layout shift** — skeleton dimensions match real content

### Error State (error.tsx)

- [ ] **Error title** — "Systematic Review unavailable"
- [ ] **Error message** — "We couldn't load the systematic review tool. Please try again."
- [ ] **Retry button** — triggers `reset()` to re-attempt page load
- [ ] **Error details** — technical error information displayed (if applicable)

---

## 28. Accessibility

### Navigation

- [ ] **Back link** — accessible as standard link

### Forms

- [ ] **PICO inputs** — labeled with `aria-label` or associated `<label>`
- [ ] **Criteria inputs** — labeled for screen readers
- [ ] **Schema builder** — field inputs labeled
- [ ] **GRADE domain selectors** — labeled for each domain

### Buttons

- [ ] **Stage badges** — include text labels (not color-only)
- [ ] **Judgment colors** — text labels accompany color coding
- [ ] **Compliance status icons** — screen reader text for each status

---

## 29. Quick Test Workflows

### Workflow A: End-to-End Systematic Review (Happy Path)

1. [ ] Navigate to `/systematic-review`
2. [ ] Verify hub page loads with header and description
3. [ ] Click "New Review" — verify create form appears
4. [ ] Enter title "Metformin vs Sulfonylureas for T2DM" — click "Create Review"
5. [ ] Verify navigation to `/systematic-review/[projectId]`
6. [ ] Verify 15 tabs render, "Search Strategy" tab active
7. [ ] Enter PICO: P="Type 2 Diabetes patients", I="Metformin", C="Sulfonylureas", O="HbA1c reduction"
8. [ ] Click "Generate Search Strategy" — verify results with MeSH terms and search string
9. [ ] Click "Import Papers Using This Strategy" — verify tab switches to Import
10. [ ] Select PubMed source, set max results to 50, run import
11. [ ] Verify papers appear in list with metadata
12. [ ] Switch to Screening tab — define inclusion/exclusion criteria
13. [ ] Click "Run AI Screening" — verify AI processes papers
14. [ ] Verify screening decisions with AI reasoning displayed
15. [ ] Switch to PRISMA Flow tab — click "Generate Diagram"
16. [ ] Verify PRISMA 2020 flow diagram renders with correct counts
17. [ ] Switch to Data Extraction tab — define schema fields
18. [ ] Click "Run Extraction" — verify AI extracts data into matrix
19. [ ] Switch to Risk of Bias tab — verify tool auto-detected
20. [ ] Click "Assess All" — verify batch RoB assessment runs
21. [ ] Switch to Meta-Analysis tab — select effect type and model
22. [ ] Verify forest plot and funnel plot render
23. [ ] Switch to GRADE tab — assess all 5 domains
24. [ ] Verify overall certainty calculated
25. [ ] Switch to Manuscript tab — click "Generate All"
26. [ ] Verify all 5 sections generated
27. [ ] Download DOCX — verify file downloads

### Workflow B: Search Strategy Generation

1. [ ] Navigate to a review project's Search Strategy tab
2. [ ] Enter Population: "Adults with hypertension"
3. [ ] Enter Intervention: "ACE inhibitors"
4. [ ] Leave Comparison empty (optional field)
5. [ ] Enter Outcome: "Blood pressure reduction"
6. [ ] Click "Generate Search Strategy"
7. [ ] Verify loading spinner appears on button
8. [ ] Verify results show estimated PubMed count
9. [ ] Verify MeSH terms displayed in green
10. [ ] Verify free-text terms displayed in blue
11. [ ] Click Copy on the search string — verify clipboard contains the query
12. [ ] Verify suggested filters shown in amber
13. [ ] Click "Import Papers Using This Strategy" — verify transition

### Workflow C: Paper Import & Duplicate Detection

1. [ ] Switch to Import Papers tab
2. [ ] Select PubMed as source
3. [ ] Enter a custom search query
4. [ ] Set max results to 20
5. [ ] Run search — verify papers listed
6. [ ] Expand a paper — verify metadata (title, authors, abstract)
7. [ ] Switch source to Semantic Scholar — run same query
8. [ ] Verify duplicate detection flags overlapping papers
9. [ ] Upload a PDF file — verify processing and addition
10. [ ] Verify total paper count updates in header

### Workflow D: AI Screening Pipeline

1. [ ] Switch to AI Screening tab
2. [ ] Click "Define Inclusion/Exclusion Criteria"
3. [ ] Add inclusion criterion: "RCTs with adults over 18"
4. [ ] Add exclusion criterion: "Animal studies"
5. [ ] Add exclusion criterion: "Non-English publications"
6. [ ] Save criteria
7. [ ] Select AI mode (Robot icon)
8. [ ] Click "Run AI Screening"
9. [ ] Verify batch processing with progress indicator
10. [ ] Verify each paper gets Include/Exclude/Maybe decision
11. [ ] Verify AI reasoning displayed for each decision
12. [ ] Use filter to show only "Conflicts"
13. [ ] Use filter to show only "Unscreened"
14. [ ] Manually override an AI decision — click Include/Exclude
15. [ ] Click Save (FloppyDisk) — verify decision saved

### Workflow E: Dual Screening with Blinding

1. [ ] Switch to Compare mode (Handshake icon)
2. [ ] Enable blinded mode (EyeSlash icon)
3. [ ] Screen papers as Reviewer 1
4. [ ] Verify Reviewer 2's decisions are hidden
5. [ ] Switch to unblinded mode (Eye icon)
6. [ ] Verify both decisions now visible
7. [ ] Check inter-rater agreement score displays
8. [ ] Filter to "Conflicts" — verify disagreements shown
9. [ ] Resolve a conflict by making a final decision

### Workflow F: PRISMA Checklist Compliance

1. [ ] Switch to PRISMA Flow tab (or separate checklist section)
2. [ ] Select PRISMA 2020 variant (27 items)
3. [ ] Mark several items as "Reported" — verify emerald CheckCircle
4. [ ] Mark an item as "Partially" — verify amber WarningCircle
5. [ ] Mark an item as "Not Reported" — verify red XCircle
6. [ ] Mark an item as "Not Applicable" — verify gray MinusCircle
7. [ ] Verify compliance percentage updates
8. [ ] Switch to PRISMA-S variant — verify 16 items load
9. [ ] Switch to PRISMA-NMA variant — verify 5 items load
10. [ ] Paste manuscript text and click verify — verify auto-population
11. [ ] Export CSV — verify download with all item statuses

### Workflow G: Risk of Bias Assessment

1. [ ] Switch to Risk of Bias tab
2. [ ] Verify tool auto-detected based on study types
3. [ ] If RCTs: verify RoB 2 selected (blue)
4. [ ] If observational: verify ROBINS-I selected (purple)
5. [ ] If diagnostic: verify QUADAS-2 selected (teal)
6. [ ] Manually override tool selection — verify switch
7. [ ] Assess domains for a single paper
8. [ ] Set domain judgments (Low, Some concerns, High)
9. [ ] Verify judgment colors: Low=emerald, Some concerns=amber, High=orange/red
10. [ ] Verify overall judgment calculated
11. [ ] Click "Assess All" — verify batch processing
12. [ ] Verify all papers get assessments

### Workflow H: Data Extraction Schema & AI Extraction

1. [ ] Switch to Data Extraction tab
2. [ ] Add field: Name="Sample Size", Type=number
3. [ ] Add field: Name="Study Design", Type=text
4. [ ] Add field: Name="Blinded", Type=boolean
5. [ ] Add field: Name="Country", Type=select
6. [ ] Click "Run Extraction" (Lightning icon)
7. [ ] Verify AI processes papers against schema
8. [ ] Verify confidence badges on extracted values
9. [ ] Click a source link — verify jump to page number
10. [ ] Edit an extracted value manually — verify save
11. [ ] Verify matrix table shows all papers x all fields
12. [ ] Click "Download CSV" — verify complete data in CSV

### Workflow I: Meta-Analysis Execution

1. [ ] Switch to Meta-Analysis tab
2. [ ] Select effect type: Odds Ratio (OR)
3. [ ] Select model: Random-effects
4. [ ] Verify forest plot renders with study labels and CIs
5. [ ] Verify pooled effect diamond at bottom
6. [ ] Verify heterogeneity stats (I-squared, Q-test)
7. [ ] Check funnel plot for publication bias
8. [ ] Enable trim-and-fill — verify imputed studies
9. [ ] Switch to Subgroup tab — verify subgroup analysis
10. [ ] Switch to Sensitivity tab — verify leave-one-out results
11. [ ] Change effect type to SMD — verify plot updates

### Workflow J: Network Meta-Analysis

1. [ ] Switch to Network MA tab
2. [ ] Add study with Treatment A="Drug X" and Treatment B="Placebo"
3. [ ] Add study with Treatment A="Drug Y" and Treatment B="Placebo"
4. [ ] Add study with Treatment A="Drug X" and Treatment B="Drug Y"
5. [ ] Run NMA analysis
6. [ ] Switch to League Table tab — verify pairwise matrix
7. [ ] Switch to Network Plot tab — verify 3 nodes and 3 edges
8. [ ] Switch to Forest Plot tab — verify NMA forest plot
9. [ ] Switch to Inconsistency tab — verify consistency assessment
10. [ ] Switch to Rankings tab — verify treatment ranking scores
11. [ ] Export CSV — verify data downloads

### Workflow K: GRADE Assessment

1. [ ] Switch to GRADE tab
2. [ ] Assess Risk of Bias domain — select "No serious concern"
3. [ ] Assess Inconsistency domain — select "Serious concern"
4. [ ] Assess Indirectness domain — select "No serious concern"
5. [ ] Assess Imprecision domain — select "Serious concern"
6. [ ] Assess Publication Bias domain — select "No serious concern"
7. [ ] Verify overall certainty calculated (should be "Low" with 2 downgrades)
8. [ ] Verify color coding: Low=amber
9. [ ] Add justification text for each domain
10. [ ] Export CSV — verify GRADE evidence table downloads

### Workflow L: Manuscript Generation & Export

1. [ ] Switch to Manuscript tab
2. [ ] Add custom instructions: "Focus on clinical implications"
3. [ ] Click "Generate All"
4. [ ] Verify Abstract section generates
5. [ ] Verify Introduction section generates
6. [ ] Verify Methods section generates
7. [ ] Verify Results section generates
8. [ ] Verify Discussion section generates
9. [ ] Edit the Results section manually
10. [ ] Copy Abstract to clipboard — verify clipboard content
11. [ ] Click "Download DOCX" — verify Word file downloads with all sections

### Workflow M: Snowballing

1. [ ] Switch to Snowballing tab
2. [ ] Select direction: "Both" (forward + backward)
3. [ ] Set depth to 1
4. [ ] Run snowballing search
5. [ ] Verify new papers discovered and listed
6. [ ] Verify citation network visualization renders
7. [ ] Click a node in the network — verify paper details shown
8. [ ] Verify session saved in history
9. [ ] Run again with depth 2 — verify deeper search
10. [ ] Check session history shows both runs

### Workflow N: Import/Export References

1. [ ] Switch to Export tab
2. [ ] Import a RIS file via drag-and-drop — verify papers parsed
3. [ ] Import a BibTeX file via click-to-upload — verify papers parsed
4. [ ] Verify duplicate detection against existing papers
5. [ ] Select export format: RIS — filter: Included — download
6. [ ] Select export format: BibTeX — filter: All — download
7. [ ] Select export format: CSV — filter: Excluded — download
8. [ ] Select export format: Endnote — download
9. [ ] Test RevMan export — verify compatible XML

### Workflow O: Protocol & PROSPERO

1. [ ] Switch to Protocol tab
2. [ ] Click generate protocol from config
3. [ ] Verify protocol sections populate
4. [ ] Edit the Methods section — add additional detail
5. [ ] Enter PROSPERO ID: "CRD42026000001"
6. [ ] Verify ID persists
7. [ ] Switch to PROSPERO tab
8. [ ] Verify 22 fields auto-populated from review data
9. [ ] Edit a field manually
10. [ ] Click download — verify text file exports with all 22 fields

### Workflow P: Real-Time Collaboration

1. [ ] Open the same review in two browser windows
2. [ ] Verify CollaboratorPresence shows both users' avatars
3. [ ] In Window 1: make a screening decision
4. [ ] In Window 2: verify activity feed shows the decision
5. [ ] In Window 2: switch to a different tab
6. [ ] In Window 1: verify collaborator tooltip shows updated tab
7. [ ] Verify WiFi status indicator reflects connection state

### Workflow Q: Hub Page Navigation

1. [ ] Navigate to `/systematic-review`
2. [ ] Verify existing projects display as cards
3. [ ] Verify each card shows title, stage badge, paper count, progress
4. [ ] Verify stage badges use correct colors per stage
5. [ ] Click a project card — verify navigation to workflow page
6. [ ] Click "All Reviews" back link — verify return to hub
7. [ ] Create a new review — verify it appears in the project list
8. [ ] Verify newly created project shows "Search Strategy" stage badge (blue)

### Workflow R: Error Recovery

1. [ ] Simulate network disconnect during AI screening — verify error displayed
2. [ ] Reconnect — click "Refresh" (ArrowsClockwise) — verify data reloads
3. [ ] Trigger search strategy generation with empty PICO — verify validation error
4. [ ] Attempt to create review with empty title — verify form validation
5. [ ] Navigate to invalid project ID — verify error page loads
6. [ ] Verify "Systematic Review unavailable" error page with retry button
7. [ ] Click retry — verify page attempts to reload

---

*Document generated from source code analysis of `src/app/(app)/systematic-review/`, `src/lib/systematic-review-store.ts`, API routes, and all panel component files. Last updated: 2026-03-09.*

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI and source code but were
> missing from the original document generated by Claude Code.

### Hub Page — Header, Form, and Error Banner Details
- [ ] Hub-page description ends with a period in the rendered copy
- [ ] "New Review" button always opens the create form and clears any existing error banner
- [ ] Clicking "New Review" while the form is already visible does not toggle it closed
- [ ] Error banner renders above page content when project load or creation fails
- [ ] Error banner close button clears local `error` state without retrying the failed request
- [ ] Create form heading is exactly "New Systematic Review"
- [ ] Create form includes a `Review Title` label with a visible `Required` badge
- [ ] Create form helper text explains the full PICO/protocol can be defined after opening the review
- [ ] Title input is autofocused when the create form opens
- [ ] Title input placeholder is `e.g., Metformin vs Sulfonylureas for T2DM: A Systematic Review`
- [ ] Pressing Enter inside the title input triggers the same create handler as clicking `Create Review`
- [ ] `Create Review` button is disabled when the trimmed title is empty
- [ ] `Create Review` button swaps the Plus icon for a spinning `CircleNotch` during submission
- [ ] `Cancel` closes the create form and resets the draft title to an empty string
- [ ] Successful create clears the title field, hides the form, and refreshes the hub list
- [ ] Successful create does not auto-navigate to `/systematic-review/[projectId]` in the current implementation
- [ ] Failed create shows banner text `Failed to create project. Please try again.`
- [ ] Failed projects fetch shows banner text `Failed to load projects. Please try again.`

### Hub Page — Loading, Empty State, and Project Cards
- [ ] Hub loading state is spinner-only and does not render loading text
- [ ] Empty-state heading reads `No systematic reviews yet`
- [ ] Empty-state body mentions AI help from search strategy to meta-analysis
- [ ] Empty-state CTA label is `Create Your First Review`
- [ ] Empty-state CTA opens the same create form used by the header button
- [ ] Project cards render inside a responsive `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` grid
- [ ] Project card title is line-clamped to 2 lines
- [ ] Project card shows ArrowRight icon in the top-right corner
- [ ] Card hover changes both border color and title/icon text color through the `group` hover styles
- [ ] Stage badge falls back to raw `reviewStage` text with neutral styling for unknown stage values
- [ ] Paper-count text always renders as `{project.paperCount} papers`
- [ ] Screening-progress text renders only when `screeningProgress > 0`
- [ ] Progress bar renders only when `paperCount > 0`
- [ ] Progress bar inline width style is derived from `screeningProgress`
- [ ] Hub cards link to `/systematic-review/{project.id}` via `Link`, not an imperative router push

### Workflow Shell — Route Loading, Provider Setup, and Navigation
- [ ] Non-numeric `projectId` params return `null` from the outer page component before rendering workflow UI
- [ ] Liveblocks room id is constructed as `sr-project-{projectId}`
- [ ] SR room provider initial presence includes empty `userId`, `name`, `avatar`, and `color`
- [ ] SR room provider initial presence sets `activeTab` and `currentPaperId` to `null`
- [ ] Workflow page fetches `/api/systematic-review/config?projectId={projectId}` on mount
- [ ] Workflow `404` config response shows centered error text `Project not found`
- [ ] Generic config-load failure shows centered error text `Failed to load project`
- [ ] Error state offers a `Back to Reviews` link to `/systematic-review`
- [ ] Successful workflow load additionally fetches `/api/systematic-review/projects` to derive `paperCount`
- [ ] Failure of the secondary projects fetch is tolerated silently without replacing the main workflow page
- [ ] Workflow loading state is spinner-only and does not show loading copy
- [ ] Route-level loading component shows skeleton icon, title bar, 5 skeleton tabs, and one large content skeleton
- [ ] Route-level error component title is `Systematic Review unavailable`
- [ ] Route-level error component message is `We couldn't load the systematic review tool. Please try again.`
- [ ] Top-left back link text is exactly `All Reviews`
- [ ] Back link uses a `Link` to `/systematic-review`
- [ ] Project header subtitle is `PRISMA 2020-compliant systematic review`
- [ ] Paper-count pill only renders in the header when `paperCount > 0`
- [ ] Stepper label abbreviations are `Search`, `Screening`, `Full-Text`, `Extraction`, `RoB`, `Meta-Analysis`, `Reporting`

### Workflow Tabs and Presence — Actual Current Behavior
- [ ] Workflow tab bar is built from the shared `Tabs` component with text labels only
- [ ] Workflow tab bar does not render tab icons in the current live shell
- [ ] Workflow tab bar does not render tab counts in the current live shell
- [ ] Workflow tab container is a plain flex row and is not explicitly horizontally scrollable in the current `Tabs` component
- [ ] Active tab default is `strategy`
- [ ] Active tab persists in `scholarsync-systematic-review`
- [ ] Collaborator presence receives `activeTab` updates through `updatePresence({ activeTab })`
- [ ] Collaborator presence self tooltip title is `You`
- [ ] Self tooltip shows the active-tab label when `self.presence.activeTab` exists
- [ ] Collaborator tooltip prefixes tab text with `Viewing:`
- [ ] Collaborator tooltip shows `Paper #{currentPaperId}` when current-paper presence is set
- [ ] Presence count badge displays `collaborators.length + 1`, including the current user
- [ ] Offline compact state shows `Offline` only when status is disconnected and there are no collaborators
- [ ] Presence widget still shows a WiFiHigh icon with amber text when not fully connected but collaborators exist
- [ ] `CollaboratorPresence` tab label map does not include a friendly label for `nma`, so unknown tab keys fall back to the raw key text

### Search Strategy Panel — Detailed Defaults and Results
- [ ] Search Strategy panel heading is `PICO Framework`
- [ ] Search panel copy states the AI generates a PubMed search strategy with MeSH terms and Boolean operators
- [ ] Population field is required and marked with a red asterisk
- [ ] Intervention field is required and marked with a red asterisk
- [ ] Comparison field is optional and has no red asterisk
- [ ] Outcome field is required and marked with a red asterisk
- [ ] Population placeholder is `e.g., Adults with type 2 diabetes`
- [ ] Intervention placeholder is `e.g., Metformin monotherapy`
- [ ] Comparison placeholder is `e.g., Sulfonylurea monotherapy`
- [ ] Outcome placeholder is `e.g., HbA1c reduction at 12 months`
- [ ] Generate Search Strategy button is disabled until population, intervention, and outcome are all non-empty
- [ ] Generate Search Strategy button clears the previous generated strategy before starting a new request
- [ ] Search-strategy generation failure shows `Failed to generate search strategy. Please try again.`
- [ ] Search-strategy panel does not maintain its own in-flight generation flag; the button spinner logic is tied to initial review-config loading state instead
- [ ] Generated-strategy heading is `Generated Search Strategy`
- [ ] Estimated PubMed results banner only renders when `estimatedResults` is defined
- [ ] Estimated PubMed results are formatted with `toLocaleString()`
- [ ] Each PICO block shows its `picoElement` label in title case/capitalized style
- [ ] MeSH terms render with `[MeSH]` suffix chips
- [ ] Full search string appears in a `pre` block under `Complete PubMed Search String`
- [ ] Copy button copies only `strategy.fullSearchString`
- [ ] Suggested Filters section only renders when the array is non-empty
- [ ] CTA button label is `Import Papers Using This Strategy`
- [ ] CTA button switches the shared workflow store active tab to `import`

### Paper Import Panel — Detailed Behavior
- [ ] Selected import sources default to `["pubmed"]`
- [ ] Max results default is `100`
- [ ] Generated-strategy query banner reads `Using generated PICO search strategy`
- [ ] Generated-strategy banner displays `?` when estimated-result count is unavailable
- [ ] When a generated strategy exists, the visible input is an override field with placeholder `Or override with custom search string...`
- [ ] When no generated strategy exists, the main query placeholder tells the user to generate one in the Search Strategy tab first
- [ ] Database source buttons are multi-select toggles rather than radio buttons
- [ ] Import button is disabled when no query string is available
- [ ] Import button is disabled when no sources are selected
- [ ] Import button label changes from `Import Papers` to `Importing...`
- [ ] Successful import result card shows imported count, total found count, and duplicate count when duplicates were skipped
- [ ] Import failure shows `Failed to import papers. Please try again.`
- [ ] PDF upload drop zone changes border/background styling while upload is active
- [ ] Upload drop zone copy reads `Drag & drop PDF files here, or browse`
- [ ] Hidden browse input accepts `.pdf`
- [ ] Non-PDF files in the selected/dropped list are skipped silently by the upload handler
- [ ] Upload progress copy is exactly `Uploading...`
- [ ] Upload helper text says PDFs are processed for full-text extraction and embedding
- [ ] Project Papers panel only renders when `papers.length > 0`
- [ ] Project Papers header includes a `Refresh` text button
- [ ] `Refresh` label changes to `Refreshing...` while project papers reload
- [ ] Clicking a paper title toggles its expanded metadata/abstract view
- [ ] PDF badge renders only when `pdfStoragePath` exists
- [ ] Screening-decision badge renders only when `screeningDecision` exists
- [ ] Expanded paper view shows DOI link only when DOI exists
- [ ] Expanded paper view shows PubMed link only when PMID exists
- [ ] Expanded paper view shows `studyType` badge only when available
- [ ] Expanded paper view shows `Level {evidenceLevel}` badge only when evidence level is available

### Screening Panel — Criteria, Queue, Modes, and Shortcuts
- [ ] Screening filter default is `unscreened`
- [ ] Screening view mode default is `queue`
- [ ] Blinded mode default is `false`
- [ ] Criteria reset to a single empty inclusion row when the project has no saved criteria
- [ ] Criteria also reset to a single empty inclusion row if criteria fetch fails, preventing cross-project leakage
- [ ] Criteria section heading is `Screening Criteria`
- [ ] Criteria help text states that three independent AI agents use majority consensus voting
- [ ] Criterion type dropdown options are exactly `Inclusion` and `Exclusion`
- [ ] Criterion description placeholder is `e.g., Randomized controlled trials only`
- [ ] Remove-criterion button is hidden when only one criterion row remains
- [ ] `Add Criterion` appends a new inclusion row
- [ ] `Save Criteria` button label changes to `Saving...` while criteria POST is in flight
- [ ] Last-saved timestamp text appears only after a successful criteria save
- [ ] Queue/Conflict mode switch is separate from the item filter tabs
- [ ] Queue-mode filter tabs are `Unscreened`, `All`, `Conflicts`, and `Uncertain`
- [ ] Changing the queue filter resets `activeIndex` back to 0
- [ ] Blind-mode toggle label reads `Blind Mode` when off and `Blinded` when on
- [ ] Blind-mode button title changes to explain whether AI decisions are hidden
- [ ] Toggling blind mode clears any loaded unblinded-results summary
- [ ] `Reprioritize` button title is `Recompute paper priorities using active learning`
- [ ] AI batch screening only includes unscreened papers that have abstracts
- [ ] AI batch screening sends at most the first 50 eligible papers in one request
- [ ] AI screening failure shows `Failed to run AI screening. Please try again.`
- [ ] Reprioritization failure shows `Failed to recompute priorities. Please try again.`
- [ ] Recording a decision updates local queue rows to set `reviewerScreened: true`
- [ ] In `unscreened` filter mode, a decided paper is removed from the visible queue immediately after decision
- [ ] Queue keyboard shortcuts are inactive when the current focus target is an input, textarea, or select
- [ ] Queue keyboard shortcut `I` records `include`
- [ ] Queue keyboard shortcut `E` records `exclude`
- [ ] Queue keyboard shortcut `U` records `maybe`
- [ ] Queue keyboard shortcuts `ArrowDown` and `J` advance selection
- [ ] Queue keyboard shortcuts `ArrowUp` and `K` move to the previous paper
- [ ] `Unblind & Show Conflicts` button is shown only while blinded mode is on
- [ ] Unblinding performs both `mode=unblind` fetch and a queue reload with `blinded=false`
- [ ] Successful unblinding also turns blinded mode off
- [ ] Conflict-view empty state heading is `No Conflicts Found`
- [ ] Conflict-view empty state body explains there are no reviewer disagreements to resolve
- [ ] Conflict-resolution POST includes `action: "resolve"` and optional `reason`
- [ ] Resolving a conflict removes it from the local conflict list on success
- [ ] Conflict-resolution failure shows `Failed to resolve conflict. Please try again.`
- [ ] PDF viewer opens with paper metadata immediately and fetches PDF path best-effort in the background
- [ ] PDF path fetch failure does not block opening the screening PDF viewer

### PRISMA Flow and PRISMA Checklist — Combined Tab Details
- [ ] The `prisma` workflow tab renders both `PRISMAFlowPanel` and `PRISMAChecklistPanel` stacked vertically
- [ ] PRISMA Flow button label is `Generate Diagram`
- [ ] PRISMA Flow download button label is `Download SVG`
- [ ] PRISMA Flow download filename is `prisma-flow-diagram.svg`
- [ ] PRISMA Flow diagram container is rendered only after a successful API response sets `flowSvg`
- [ ] PRISMA Flow error text is `Failed to generate PRISMA flow diagram. Please try again.`
- [ ] PRISMA checklist default variant is `PRISMA 2020`
- [ ] PRISMA checklist variant buttons are `PRISMA 2020`, `PRISMA-S (Search)`, and `PRISMA-NMA (Network MA)`
- [ ] Switching checklist variant resets the status filter to `all`
- [ ] Switching checklist variant collapses all expanded items
- [ ] Manuscript textarea placeholder is `Paste your manuscript text here (minimum 100 characters)...`
- [ ] Character counter uses localized formatting and remains visible before verification
- [ ] Verify button is disabled until manuscript text reaches 100 characters
- [ ] Verify button label includes the active variant short label, e.g. `Verify PRISMA 2020 Compliance`
- [ ] In-flight verify label uses variant-specific copy such as `Verifying 27 items...`
- [ ] Summary stat cards are clickable filters that toggle each status on/off
- [ ] Expanding all checklist items uses the item numbers from the current filtered result set
- [ ] Checklist export filename changes by variant (`prisma-2020-checklist.csv`, `prisma-s-checklist.csv`, `prisma-nma-checklist.csv`)
- [ ] `Found:` and `Suggestion:` rows render only when those values are non-empty

### Protocol and PROSPERO Panels — Detailed Behavior
- [ ] Protocol panel preloads the saved PROSPERO registration id from `reviewConfig.protocolRegistration`
- [ ] PROSPERO ID placeholder is `e.g. CRD42024XXXXXX`
- [ ] Save PROSPERO ID button is disabled when the trimmed field is empty
- [ ] Save PROSPERO ID success changes the button label to `Saved` temporarily
- [ ] Generate Protocol button label changes to `Generating protocol (16 sections)...` while running
- [ ] Successful protocol generation expands all returned sections by default
- [ ] `Regenerate` in the controls bar clears the generated protocol from view instead of calling the API immediately
- [ ] Protocol copy action concatenates every section title and content into one clipboard payload
- [ ] Protocol TXT export filename is `protocol.txt`
- [ ] Protocol HTML export filename is `protocol.html`
- [ ] Protocol HTML export button title mentions printing to PDF via the browser
- [ ] Section edit mode is per-section and stores edits only in local component state until export/copy
- [ ] PROSPERO helper loads fields on mount from `/api/systematic-review/prospero?projectId={projectId}`
- [ ] PROSPERO progress text shows `{filledCount}/{totalCount} fields completed`
- [ ] PROSPERO progress bar color changes by completion percentage threshold
- [ ] `Copy All` button text changes to `Copied!` temporarily after successful copy
- [ ] `Download as TXT` button text changes to `Downloading…` while POST export is running
- [ ] `Refresh from project` reloads the 22 PROSPERO fields from the server
- [ ] Each PROSPERO field header shows a green filled indicator or red required-empty indicator
- [ ] Each PROSPERO field shows an `Auto` or `Manual` source badge
- [ ] Empty manual field placeholder is `Enter {field name}…`
- [ ] Empty auto field placeholder is `Auto-populated — edit if needed`
- [ ] Footer help text explicitly tells the user to use `Copy All` or `Download as TXT` for transfer into PROSPERO

### Export, Living Review, and Other Advanced Panels
- [ ] Export References format buttons are `RIS`, `BibTeX`, `EndNote XML`, and `CSV`
- [ ] Export filter buttons are `All`, `Included`, and `Excluded`
- [ ] Export button label changes to `Download {FORMAT}` based on the selected export format
- [ ] Export button label changes to `Exporting...` while the reference export request is in flight
- [ ] Exported reference filename extension is `.bib` for BibTeX and `.xml` for EndNote XML
- [ ] RevMan export section is hidden behind `Prepare RevMan Export` until package generation succeeds
- [ ] Successful RevMan generation exposes 4 downloadable cards: Study Characteristics, Risk of Bias, Outcome Data, and Excluded Studies
- [ ] RevMan CSV filenames are hard-coded per card and downloaded individually
- [ ] RevMan package can be cleared with `Regenerate export`
- [ ] Living Review new-alert form is hidden by default
- [ ] New alert frequency default is `weekly`
- [ ] Living Review prefill only uses `reviewConfig.searchStrategy.pubmedQuery` when that property exists
- [ ] New alert creation requires a non-empty search string
- [ ] `New Alert` button in the header toggles the create form visibility
- [ ] Alert check-now action sets a temporary `checkingId` only for the active alert row
- [ ] Living Review `check_now` success stores a `lastCheckResult` summary card in local state
- [ ] Deleting an alert refetches the alerts list and does not show a separate confirmation modal in the current component
- [ ] GRADE panel supports row expansion for outcome-specific domain detail
- [ ] GRADE panel exposes `Export CSV` with its own export-loading state
- [ ] Manuscript panel has separate `Generate All Sections`, `Export Markdown`, and DOCX export actions
- [ ] Manuscript DOCX export has its own `Exporting...` state separate from markdown export
- [ ] Snowballing panel falls back to all project papers when there are no explicitly included papers
- [ ] Unified RoB panel defaults to its dashboard sub-view and supports CSV export from the dashboard summary

### Store and API Persistence Details
- [ ] Systematic-review persisted store key is `scholarsync-systematic-review`
- [ ] Store persistence includes `projectId`, `projectTitle`, `activeTab`, `reviewStage`, and `pico`
- [ ] Store persistence intentionally excludes `criteria` to avoid stale criteria leaking across projects
- [ ] `clearProject()` resets active tab to `strategy` and review stage to `search_strategy`
- [ ] `GET /api/systematic-review/projects` orders projects by `updated_at DESC NULLS LAST`
- [ ] Projects API computes screening progress from `screeningDecisions / projectPapers`
- [ ] `POST /api/systematic-review/config` creates a `projects` row with `project_type: "systematic_review"` and `status: "planning"`
- [ ] New-config POST initializes `searchDatabases` to `["pubmed"]`
- [ ] New-config POST initializes `reviewStage` to `search_strategy`
- [ ] `PUT /api/systematic-review/config` only includes provided fields in its update payload
- [ ] Config GET requires `projectId` query param and returns 400 when it is missing

### Actual Current Behavior Corrections
- The hub create flow does not redirect to the new workflow page; it refreshes the project list in place.
- The workflow tab bar is text-only through the shared `Tabs` component; icons are imported in the page file but not rendered in the tab buttons.
- The live `Tabs` component is a plain flex row and is not explicitly scrollable.
- The `prisma` tab renders both PRISMA Flow and PRISMA Checklist together; they are not separate top-level tabs.
- Search-strategy generation does not have a dedicated in-flight loading flag; the button spinner logic is tied to initial review-config loading state rather than the generation request itself.
- The workflow route does not render a dedicated invalid-project-id error screen for non-numeric params; it returns `null` before the inner content mounts.
- `CollaboratorPresence` does not have a friendly `nma` label mapping and may fall back to the raw tab key.

## Re-Audit Discoveries (Codex Pass 2)

All items in `Actual Current Behavior Corrections` above were re-verified against the current source in this pass.

### Unified Risk of Bias Panel
- [ ] Unified RoB panel initializes with `dashboard` sub-view before any tool-specific panel is opened
- [ ] Unified RoB panel initializes the tool filter to `all`
- [ ] Panel title renders as `Unified Risk of Bias Dashboard`
- [ ] Header description explicitly says the panel auto-detects study type and routes papers to RoB 2, ROBINS-I, or QUADAS-2
- [ ] Dashboard action button label is `Auto-Assign Tools`
- [ ] Dashboard action button label is `Export CSV`
- [ ] Dashboard action button label is `Refresh`
- [ ] `Auto-Assign Tools` is disabled while the panel is loading
- [ ] `Auto-Assign Tools` is disabled while auto-assignment is already running
- [ ] `Auto-Assign Tools` is disabled when the paper list is empty
- [ ] `Export CSV` is disabled until at least one assessment result exists across the three RoB tools
- [ ] `Refresh` shows a spinning refresh icon while the dashboard is loading
- [ ] Initial full-panel loading state only appears when `isLoading` is true and no papers have been loaded yet
- [ ] Initial loading message is exactly `Loading papers and assessments...`
- [ ] Included-paper load prefers papers with screening decision `include` or `included`
- [ ] If no papers are explicitly included yet, Unified RoB falls back to all imported papers instead of rendering an empty dashboard immediately
- [ ] Auto-assignment preserves a paper's manual override instead of overwriting it on subsequent auto-assign runs
- [ ] Papers with diagnostic-study heuristics are auto-assigned to `QUADAS-2`
- [ ] Papers with observational-study heuristics are auto-assigned to `ROBINS-I`
- [ ] Papers without a stronger heuristic fallback are auto-assigned to `RoB 2`
- [ ] Summary cards are `Included Papers`, `Assessed`, `Remaining`, and `Completion`
- [ ] Completion card rounds to a whole-number percentage
- [ ] Completion shows `0%` when no papers have been assigned a tool yet
- [ ] Tool distribution section header is `Tool Assignment Distribution`
- [ ] Tool distribution helper copy says the detected study type determines the suggested assessment tool
- [ ] Tool filter tabs are `All Papers`, `RoB 2 (N)`, `ROBINS-I (N)`, and `QUADAS-2 (N)`
- [ ] Filtered empty state message is `No papers match this filter.`
- [ ] Global empty state message is `No included papers found. Import and screen papers first.`
- [ ] Table columns are expand control, `Paper`, `Study Type`, `Assigned Tool`, `Status`, and `Overall Judgment`
- [ ] Paper titles in the table truncate after 55 characters with an ellipsis
- [ ] Year is appended to the table title as ` (YEAR)` only when a year exists
- [ ] Assigned-tool select options are exactly `RoB 2`, `ROBINS-I`, and `QUADAS-2`
- [ ] Manual tool overrides add `overridden` helper text below the select and apply a highlighted ring style
- [ ] Status cell shows `Done` with a success icon when a result exists for the assigned tool
- [ ] Status cell shows `Pending` when no result exists for the assigned tool
- [ ] Dashboard-level error banner includes a `Dismiss` button rather than auto-clearing
- [ ] CSV export filename is `rob-summary-project-{projectId}.csv`
- [ ] CSV header row is `Paper ID,Title,Year,Detected Study Type,Assigned Tool,Assessment Status,Overall Judgment`
- [ ] Entering a specific tool panel replaces the dashboard with that tool component instead of opening a modal or drawer
- [ ] Tool sub-view back button label is exactly `Back to Unified Dashboard`
- [ ] Returning from a tool-specific sub-view refreshes all saved results before re-rendering the dashboard
- [ ] robvis summary section title is `Risk of Bias Summary (robvis-style)`
- [ ] robvis summary helper text says stacked bars are grouped by tool and overall judgment
- [ ] Percentage labels inside robvis bars only render for segments larger than roughly 12% of the bar

### Data Extraction Panel
- [ ] Default extraction schema starts with 5 fields: `sample_size`, `intervention`, `primary_outcome`, `effect_size`, and `follow_up`
- [ ] Default `sample_size` description is `Total number of participants`
- [ ] Default `intervention` description is `Intervention used`
- [ ] Default `primary_outcome` description is `Primary outcome measured`
- [ ] Default `effect_size` description is `Main effect size reported`
- [ ] Default `follow_up` description is `Follow-up duration`
- [ ] Full-text extraction checkbox is checked by default on initial render
- [ ] Full-text extraction label is exactly `Use full-text PDF chunks`
- [ ] Schema column headers are `Field Name`, `Description / Prompt`, `Type`, and an unlabeled actions column
- [ ] Field-name placeholder is `field_name`
- [ ] Description placeholder is `What the AI should look for`
- [ ] Type selector options are `Text`, `Number`, `Boolean`, and `Category`
- [ ] `Add Field` appends a new blank text-type row instead of duplicating the previous row
- [ ] Remove-field button is hidden when only one schema row remains
- [ ] Schema validation error message is `All schema fields must have a name and description.`
- [ ] Included-papers section title is `Included Papers`
- [ ] Papers list refresh button uses tooltip text `Refresh papers`
- [ ] Extract-all button is hidden when the included-paper list is empty
- [ ] Extract-all button label uses the raw paper count in the form `Extract All (N)`
- [ ] Extract-all button is disabled when the schema is invalid
- [ ] Extract-all button is disabled while a batch extraction is already running
- [ ] Extract-all in-flight label is `Extracting ({done}/{total})` when batch progress is known
- [ ] Loading state copy for the paper list is exactly `Loading papers...`
- [ ] Empty papers state headline is `No included papers found.`
- [ ] Empty papers helper text says `Screen and include papers first, then return here to extract data.`
- [ ] Papers with available chunk data show a `Full-text` chip with tooltip `Full-text PDF chunks available`
- [ ] Papers without full-text chunks and with abstract length under 50 show `Insufficient text content for extraction`
- [ ] Per-paper `Extract` button is disabled while that paper is extracting
- [ ] Per-paper `Extract` button is disabled while a batch extraction is running
- [ ] Per-paper `Extract` button is disabled for papers with no chunks and fewer than 50 abstract characters
- [ ] Per-paper action label changes from `Extract` to `Re-extract` once either live or persisted extraction data exists
- [ ] Abstract-only single-paper extraction error includes the paper title and exact text `does not have enough text content for extraction (minimum 50 characters).`
- [ ] Batch extraction error for no eligible papers is `No papers have enough text content for extraction. Upload PDFs or ensure papers have abstracts.`
- [ ] Full-text extraction is preferred when the checkbox is enabled and the paper has saved chunks
- [ ] Abstract-only extraction falls back to `paper.abstract || ""` rather than another derived text source
- [ ] Extraction results panel stays hidden until persisted results or live results exist, or the saved table is still loading
- [ ] Results panel helper text says `Click any value to view source passage`
- [ ] Saved-table loading message is `Loading extraction data...`
- [ ] Result-table first column header is `Paper`
- [ ] Result columns are the union of persisted extraction columns and the current schema field names
- [ ] Missing result cells render as `--`
- [ ] Source-link styling only appears when a cell has both `sourceChunkId` and matching chunk data loaded
- [ ] Clicking a linked extraction value opens the side-by-side source passage viewer instead of inline expanding the row
- [ ] Quote-only fallback opens the side panel with a synthetic chunk when a source quote exists but no chunk link is available
- [ ] Edit icon for a result cell is hover-only rather than always visible
- [ ] Inline result edit supports `Enter` to save the edited value
- [ ] Inline result edit supports `Escape` to cancel the edit
- [ ] Inline result edits only mutate in-memory `liveExtractions` state and do not issue a persistence request
- [ ] Source side panel header shows the field name in brand styling above the paper title
- [ ] Source side panel metadata shows section chip when `sectionType` exists
- [ ] Source side panel metadata shows `Page {n}` only when `pageNumber` exists
- [ ] Source side panel metadata always shows `Chunk #{chunkIndex + 1}`
- [ ] Source side panel close control is an `X` icon in the header
- [ ] No-results helper card title is `How AI Extraction Works`
- [ ] No-results helper card step 1 says the user defines columns and descriptions
- [ ] No-results helper card step 2 says AI reads full text or abstract and extracts matching data points
- [ ] No-results helper card step 3 says every extraction links to the source passage
- [ ] No-results helper card step 4 says the human verifies and edits with the source visible side-by-side

### Meta-Analysis Panel
- [ ] Meta-analysis panel defaults `analysisName` to `Primary Analysis`
- [ ] Meta-analysis panel defaults `effectType` to `OR`
- [ ] Meta-analysis panel defaults `model` to `random`
- [ ] Meta-analysis panel defaults `outcomeMeasure` to an empty string
- [ ] Meta-analysis panel initializes with 3 empty study rows rather than 1 or 2
- [ ] Outcome placeholder is `e.g., HbA1c reduction at 12 months`
- [ ] Effect-type buttons are `Odds Ratio`, `Risk Ratio`, `Std. Mean Diff`, `Mean Difference`, and `Risk Difference`
- [ ] Model buttons are exactly `Fixed` and `Random`
- [ ] Trim-and-fill checkbox label is `Include trim-and-fill analysis`
- [ ] Study-table headers are `Study Label`, `Effect(log optional)`, `SE`, `95% CI Lower`, `95% CI Upper`, and `Subgroup`
- [ ] Study-label placeholder is `Study {N}`
- [ ] Numeric placeholders in effect and SE inputs are `0.00`
- [ ] CI placeholders are `auto`
- [ ] Subgroup placeholder is `Group`
- [ ] Confidence interval values auto-compute on blur of the effect and SE inputs
- [ ] Remove-study control is disabled when only 2 study rows remain
- [ ] Primary run button label is `Run Meta-Analysis`
- [ ] Primary run button label changes to `Running...` while the standard analysis request is in flight
- [ ] Standard-analysis precheck error is `At least 2 complete studies are required`
- [ ] Standard-analysis network failure fallback shown to the user is `Analysis failed`
- [ ] Result tabs are exactly `Main`, `Subgroup`, and `Sensitivity`
- [ ] Main-result summary cards are `Studies`, `Pooled {effectType}`, `I²`, and `p-value`
- [ ] Detailed main-result text appends `(potential publication bias)` when Egger's test p-value is below 0.1
- [ ] Forest plot title is `Forest Plot — {analysisName}`
- [ ] Funnel plot title is `Funnel Plot — {analysisName}`
- [ ] Funnel plot title appends `({N} imputed studies)` when trim-and-fill returns imputed studies
- [ ] Trim-and-fill result block title is `Trim-and-Fill Adjusted Estimate`
- [ ] Trim-and-fill helper text says `{N} studies imputed to correct for asymmetry`
- [ ] Subgroup tab helper text says each subgroup needs at least 2 studies and the analysis needs at least 2 subgroups
- [ ] Subgroup chip counts render in amber styling when a subgroup has fewer than 2 studies
- [ ] Subgroup run button label is `Run Subgroup Analysis`
- [ ] Subgroup in-flight label is `Running...`
- [ ] Subgroup validation error is `At least 2 groups with 2+ studies each are required. Assign studies to groups using the Subgroup column.`
- [ ] Subgroup forest plot title format is `Subgroup: {groupName} ({studyCount} studies)`
- [ ] Subgroup comparison block title is `Test for Subgroup Differences`
- [ ] Sensitivity tab title is `Leave-One-Out Sensitivity Analysis`
- [ ] Sensitivity helper text says the analysis requires at least 3 complete studies
- [ ] Sensitivity run button label is `Run Leave-One-Out`
- [ ] Sensitivity in-flight label is `Running...`
- [ ] Sensitivity validation error is `At least 3 complete studies are required for leave-one-out analysis`
- [ ] Leave-one-out result rows are visually highlighted when dropping that study changes the significance conclusion relative to the main analysis

### Network Meta-Analysis Panel
- [ ] Network meta-analysis panel initializes with 2 empty study rows
- [ ] NMA panel defaults the model toggle to `fixed`
- [ ] NMA panel shows a spinner-only loading state while fetching saved results, with no loading text
- [ ] Failed saved-result GET requests do not block manual data entry and do not show a dedicated banner by default
- [ ] Header title is `Network Meta-Analysis`
- [ ] Header description explicitly references a graph-theoretical approach and `Ruecker 2012`
- [ ] Study table headers are `Study ID`, `Treatment 1`, `Treatment 2`, `Effect (log)`, and `SE`
- [ ] Study ID placeholder is `e.g., Smith 2020`
- [ ] Treatment 1 placeholder is `e.g., Drug A`
- [ ] Treatment 2 placeholder is `e.g., Placebo`
- [ ] Effect and SE placeholders are both `0.00`
- [ ] SE input enforces a minimum of `0.001`
- [ ] Remove-study button tooltip is `Remove study`
- [ ] Remove-study button is disabled when only 2 study rows remain
- [ ] Add-row link label is `Add Study`
- [ ] Run button label is `Run NMA`
- [ ] Run button is disabled when any validation error exists
- [ ] Only the first validation error string is rendered inline beside the run button
- [ ] Validation error text can be `At least 2 complete studies are required.`
- [ ] Validation error text can be `Study "{studyId}" compares a treatment to itself.`
- [ ] Validation error text can be `Study "{studyId}" has invalid effect value.`
- [ ] Validation error text can be `Study "{studyId}" has invalid SE (must be > 0).`
- [ ] Successful NMA run always switches the active result tab back to `league`
- [ ] Result tabs are `League Table`, `Network Plot`, `Forest Plot`, `Inconsistency`, and `Rankings`
- [ ] League-tab export action label is `Export CSV`
- [ ] League-table export filename is `nma-league-table.csv`
- [ ] Result status text shows `Random-effects | tau² = {value} | {N} treatments` for random models
- [ ] Result status text shows `Fixed-effect model | {N} treatments` for fixed models
- [ ] Forest-tab reference selector label is `Reference:`
- [ ] Forest-tab reference select defaults to the first treatment when no explicit reference has been chosen
- [ ] Forest plot title is `NMA Forest Plot`
- [ ] Inconsistency tab header is `Node-Splitting Inconsistency Test`
- [ ] Inconsistency empty-state text says no closed loops with both direct and indirect evidence were found
- [ ] Inconsistency rows show `Inconsistent` when p-value is below 0.05
- [ ] Inconsistency rows show `Consistent` when p-value is 0.05 or higher
- [ ] Rankings tab header is `Treatment Rankings (P-scores)`
- [ ] Rankings helper note cites `Ruecker & Schwarzer 2015`

### GRADE Panel
- [ ] GRADE panel initializes with `selectedOutcome` as an empty string
- [ ] GRADE panel initializes with `selectedAnalysisId` as `null`
- [ ] GRADE panel keeps `expandedRow` collapsed by default
- [ ] Outcome selector is only rendered when at least one saved meta-analysis exists
- [ ] Outcome selector placeholder option is `Select an outcome...`
- [ ] Previously assessed outcomes are prefixed with `[Done] ` in the outcome selector
- [ ] Free-text outcome input is always shown even when the selector is available
- [ ] Free-text input placeholder is `Or type an outcome name...`
- [ ] `Assess Certainty` button is disabled when the trimmed outcome value is empty
- [ ] `Assess Certainty` button is disabled during initial panel loading
- [ ] `Assess Certainty` button is disabled while an assessment request is in flight
- [ ] `Assess Certainty` keeps the label `Assess Certainty` even while the icon swaps to a spinner
- [ ] `Export CSV` button is hidden until at least one GRADE assessment exists
- [ ] `Export CSV` shows a spinner icon but keeps the text `Export CSV` while exporting
- [ ] Refresh button always remains visible, even when no assessments exist yet
- [ ] Empty state headline is `No GRADE assessments yet.`
- [ ] Empty state helper text says `Run a meta-analysis first, then return here to assess the certainty of evidence.` when no meta-analyses exist
- [ ] Empty state helper text says `Select an outcome above or type one in, then click "Assess Certainty" to begin.` when meta-analyses exist
- [ ] Initial loading message is `Loading assessments...`
- [ ] Error banner uses a `Dismiss` button rather than auto-clearing
- [ ] Summary section heading is `Summary of Findings`
- [ ] Summary helper text says `{N} outcomes assessed. Click a row to expand domain rationale.`
- [ ] Clicking an assessment row toggles the expanded domain-rationale view for that row
- [ ] Effect estimate subtitle only renders under an outcome when an effect estimate exists
- [ ] Participant-count cell renders as `{studies} (n={participants})` only when total participants are available
- [ ] Domain cells use a check icon for `no_concern`
- [ ] Domain cells use a single down-arrow icon for `serious`
- [ ] Domain cells use a double down-arrow icon for `very_serious`
- [ ] Expanded-domain downgrade text is `(-1 level)` for a single-level downgrade
- [ ] Expanded-domain downgrade text switches to `(-N levels)` for larger downgrades
- [ ] Export CSV route adds the attachment filename `grade-summary-{projectId}.csv`

### Manuscript Panel
- [ ] Manuscript panel initializes with all 5 section slots set to `null`
- [ ] Active section defaults to `introduction` rather than `abstract`
- [ ] Section order in the left rail is `Abstract`, `Introduction`, `Methods`, `Results`, and `Discussion`
- [ ] Custom-instructions label is `Custom Instructions (optional)`
- [ ] Custom-instructions placeholder is `e.g., Focus on clinical implications, use APA style, emphasize heterogeneity...`
- [ ] `Generate All Sections` is disabled while any single-section generation is in progress
- [ ] `Generate All Sections` is disabled while an all-sections run is already in progress
- [ ] All-sections loading label is exactly `Generating all sections...`
- [ ] `Export Markdown`, `Download DOCX`, and `Open in Studio` are hidden until at least one section has content
- [ ] Markdown export filename is `manuscript-draft.md`
- [ ] DOCX export filename is `manuscript-draft.docx`
- [ ] DOCX export sends fixed title text `Systematic Review Manuscript Draft` to the API instead of using the project title
- [ ] DOCX button label changes to `Exporting...` while the export request is in flight
- [ ] Left-rail progress text format is `{generated} / 5 sections generated`
- [ ] Section rows show an empty outlined circle before content exists
- [ ] Section rows show a green success icon after content exists
- [ ] Section rows show a spinner for only the section currently generating
- [ ] Section action button label is `Generate` before the section has content
- [ ] Section action button label becomes `Regenerate` after content exists
- [ ] Section-level loading helper text says `This may take 15-30 seconds`
- [ ] Empty-content placeholder headline is `No content generated yet`
- [ ] Empty-content helper text says `Click "Generate" to create this section using your project data`
- [ ] Copy button success state changes label text from `Copy` to `Copied`
- [ ] Copy success state automatically clears after 2 seconds
- [ ] Edit mode uses a monospaced textarea and local-only save behavior
- [ ] Edit toolbar button label toggles between `Edit` and `Save`
- [ ] `Save Changes` updates local section content in memory and does not persist back to the server
- [ ] `Generate All Sections` runs in the hard-coded order `introduction`, `methods`, `results`, `discussion`, `abstract`
- [ ] Abstract generation is the only section that passes `existingSections` context to the manuscript API
- [ ] Footer note explicitly says `[PLACEHOLDER]` markers require manual input and instructs the user to continue editing in Studio for the full editor

### Snowballing Panel
- [ ] Snowballing panel defaults to `seeds` view on first render
- [ ] Direction toggle defaults to `both`
- [ ] Depth toggle defaults to `1`
- [ ] Initial loading state is a centered spinner with no helper text
- [ ] Header title is `Citation Snowballing`
- [ ] Header description explicitly explains forward as `who cites these?` and backward as `what do these cite?`
- [ ] Top-level view toggles are `Select Seeds` and `Results & Network`
- [ ] Results toggle shows a count badge only when at least one snowball session exists
- [ ] Selected-seed counter text pluralizes as `seed selected` or `seeds selected`
- [ ] `Run Snowball` is disabled when no seeds are selected
- [ ] `Run Snowball` in-flight label is `Snowballing...`
- [ ] Successful run banner headline is `Snowballing complete.`
- [ ] Success banner body lists discovered count, new papers added, and duplicates skipped
- [ ] Seed empty state copy is `No papers in project yet. Import papers first, then use snowballing to discover related studies.`
- [ ] Seed-list header text is `Select seed papers ({N} available)`
- [ ] Seed utility links are exactly `Select all` and `Clear`
- [ ] Included seed rows show an `Included` pill only for papers with screening decision `include`
- [ ] Results-view empty state copy is `No snowball sessions yet. Select seed papers and run snowballing.`
- [ ] Sessions without `completedAt` show `In progress` instead of a date
- [ ] Session status dot pulses only for `running` sessions
- [ ] Citation-network heading format is `Citation Network ({papers} papers, {edges} edges)`
- [ ] Discovered-papers subsection only renders when at least one network node has `addedBy === "snowball"`
- [ ] Discovered-paper rows show `Unscreened` when no screening decision exists
- [ ] Mini-network legend labels are `Seed / imported` and `Discovered (snowball)`
- [ ] Mini-network node radius scales from citation count and truncates node labels at 35 characters

### Living Review Panel
- [ ] Living Review panel initializes with `showForm` set to false
- [ ] New-alert frequency defaults to `weekly`
- [ ] New-search text defaults to an empty string until optionally prefilled from `reviewConfig.searchStrategy.pubmedQuery`
- [ ] Initial loading state is a centered spinner with no helper copy
- [ ] Header title is `Living Review`
- [ ] Header action button label is `New Alert`
- [ ] Header helper text says new papers are auto-imported and screened against existing criteria
- [ ] `New Alert` button toggles the visibility of the create form rather than opening a modal
- [ ] Create-form textarea label is `Search Query`
- [ ] Create-form textarea placeholder is `Enter PubMed search query...`
- [ ] Frequency buttons are exactly `daily`, `weekly`, and `monthly`
- [ ] `Create Alert` is disabled when the trimmed search string is empty
- [ ] `Create Alert` swaps its icon to a spinner while the create request is in flight
- [ ] `Cancel` button hides the form without resetting the selected frequency
- [ ] Successful create hides the form and clears `newSearchString`
- [ ] Successful create does not render a dedicated toast or banner; it simply refetches the alerts list
- [ ] `lastCheckResult` success banner is only shown after the `check_now` action returns a result payload
- [ ] `lastCheckResult` banner headline is `Check complete.`
- [ ] `lastCheckResult` banner includes a `Dismiss` button that clears only the local summary card
- [ ] Alerts empty state copy is `No search alerts yet. Create one to automatically check for new papers.`
- [ ] Alert search string is displayed in a monospaced block with `line-clamp-2`
- [ ] Active alert rows show `Last:` date only when `lastChecked` exists
- [ ] Active alert rows show `Next:` date only when `nextCheck` exists and status is `active`
- [ ] `Check now` action sets a row-specific spinner only for the alert being checked
- [ ] Pause/resume controls switch by status: `Pause` appears only for active alerts, `Resume` appears for non-active alerts
- [ ] Delete action does not ask for confirmation in the current component
- [ ] Pause, resume, check-now, and delete success paths refetch the alerts list without showing a dedicated success toast
- [ ] Footer explainer starts with `How it works:` and says alerts re-run the PubMed search at the selected frequency

### Second-Pass Verified Behavior Corrections
- [ ] Screening PDF viewer shows keyboard shortcut hints for `Esc`, `I`, `E`, and `U`, but this component does not register matching keyboard handlers in the current source
- [ ] Screening PDF viewer exclusion reason form is only forced open from the `Exclude` button while the viewer is in `full-text` mode
- [ ] Screening PDF viewer `Exclude` action in `title-abstract` mode does not capture a reason before submitting
- [ ] Protocol export buttons call `GET /api/systematic-review/protocol?format={format}` without supplying the `protocol` query payload that the route currently requires
- [ ] Manuscript panel only uses client-side markdown export; the `GET /api/systematic-review/manuscript` export path is not used by the panel
- [ ] Manuscript DOCX export sanitizes the filename from the provided title, but the panel always passes the fixed title `Systematic Review Manuscript Draft`
- [ ] Living Review panel never exposes the API's `update_frequency` action in the current UI
- [ ] Alerts route supports `update_frequency`, but the panel only offers `pause`, `resume`, `check_now`, and `delete`
- [ ] Data Extraction inline edits do not call `GET` or `POST /api/systematic-review/extract`; edited values are session-local until a new extraction or reload replaces them
- [ ] NMA saved-result loading failure is intentionally non-blocking; the UI falls back to manual entry without a blocking error state

---

## Re-Audit Discoveries (Claude Code Pass 3)

### Activity Feed — Sidebar Rendering Details

- [ ] Activity feed is a collapsible sidebar, not inline in the page layout
- [ ] Collapsed state renders a fixed button on the right side of the viewport at vertical center
- [ ] Collapsed button uses Lightning icon (weight bold, size 16) and title `Open activity feed`
- [ ] Collapsed button entry count badge shows exact count when ≤ 9, or `9+` when entries exceed 9
- [ ] Expanded sidebar is 320px wide (`w-80`), slides in from right with `animate-in slide-in-from-right` animation
- [ ] Expanded sidebar header text is exactly `Activity Feed` with Lightning icon in brand color
- [ ] Expanded sidebar header shows entry count badge in brand styling when entries exist
- [ ] Expanded sidebar close button uses X icon (weight bold, size 14)
- [ ] Empty feed text is `No activity yet. Actions by collaborators will appear here in real time.`
- [ ] Empty feed shows a large Lightning icon (weight light, size 32) above the text
- [ ] Maximum activity entries retained in memory is 50 (oldest trimmed on overflow)
- [ ] Entries are prepended (newest first) to the activity feed array
- [ ] `decision-made` entry: include = emerald-500, exclude = red-400, maybe = amber-400
- [ ] `decision-made` text format: `{userName} screened Paper #{paperId} as {decision}`
- [ ] `decision-made` shows paperTitle as truncated secondary line when available
- [ ] `extraction-complete` icon is Table (weight fill) in blue-400
- [ ] `extraction-complete` text format: `{userName} completed data extraction for Paper #{paperId}`
- [ ] `rob2-assessed` icon is ShieldCheck (weight fill) in purple-400
- [ ] `rob2-assessed` text shows `Overall risk: {overallRisk}` as secondary line
- [ ] `stage-advanced` icon is ArrowFatUp (weight fill) in brand color
- [ ] `stage-advanced` text shows `{fromStage}` → `{toStage}` with CaretRight separator, toStage in brand color
- [ ] `papers-imported` icon is DownloadSimple (weight fill) in teal-400
- [ ] `papers-imported` text format: `{userName} imported {count} papers from {source}`
- [ ] Time formatting: `just now` (< 5s), `{N}s ago`, `{N}m ago`, `{N}h ago`, `{N}d ago`
- [ ] Each entry is wrapped in a GlassPanel with `!rounded-xl` override
- [ ] Unknown event types render `null` (no fallback entry)

### Forest Plot — SVG Rendering Details

- [ ] Forest plot is pure SVG rendering (no charting library dependency)
- [ ] Column headers are `Study`, `{effectType} (95% CI)`, and `Weight`
- [ ] Study labels truncated at 28 characters with `...` suffix
- [ ] Effect size rendered as indigo (#6366f1) filled square, size proportional to weight (3-10px range)
- [ ] CI whisker end caps only render when the CI bound is within the visible x-axis range
- [ ] Alternating row backgrounds: even rows get 0.03 opacity fill
- [ ] Null line is dashed (strokeDasharray 4,4) at 0.4 opacity
- [ ] Null line label shows `1` for OR/RR effect types, `0` for MD/SMD/RD
- [ ] OR and RR values displayed via `Math.exp()` transformation; MD/SMD/RD displayed raw
- [ ] Pooled effect row labeled `Pooled` in bold text
- [ ] Pooled effect diamond fill color is #dc2626 (red) at 0.85 opacity
- [ ] Separator line above pooled row at 0.2 opacity
- [ ] Prediction interval row renders only when `predictionInterval` prop is provided
- [ ] Prediction interval label is italic text `Prediction interval` at 0.55 opacity
- [ ] Prediction interval diamond is outline-only (no fill), dashed stroke (4,3), red (#dc2626)
- [ ] Footer axis labels: `Favours control` (left 25%) and `Favours treatment` (right 75%)
- [ ] Heterogeneity footer format: `Heterogeneity: I² = {val}%, τ² = {val}, p = {val}`
- [ ] Heterogeneity p-value formatted as `<0.001` when below 0.001
- [ ] Weight column values displayed as `{val}%` with 1 decimal place

### Funnel Plot — Recharts Rendering Details

- [ ] Funnel plot uses Recharts ScatterChart (not custom SVG)
- [ ] Chart height is fixed at 350px in a ResponsiveContainer
- [ ] X-axis label is the full effect type name: `Odds Ratio`, `Risk Ratio`, `Std. Mean Difference`, `Mean Difference`, or `Risk Difference`
- [ ] Y-axis label is `SE`, reversed axis (0 at top)
- [ ] Real studies rendered as filled indigo (#6366f1) circles (radius 4)
- [ ] Imputed studies rendered as hollow amber (#f59e0b) circles with 1.5px stroke
- [ ] Pooled effect vertical reference line: dashed indigo (#6366f1) at 1.5px width
- [ ] Custom tooltip shows study name, effect value (3 decimal places), SE (3 decimal places)
- [ ] Tooltip shows `Imputed (trim-and-fill)` in amber text for imputed studies
- [ ] Egger's test result displays below the chart: `Egger's test: intercept = {val}, p = {val}`
- [ ] Egger's test shows `(significant asymmetry detected)` in amber font-medium when p < 0.05

### Network Plot — SVG Rendering Details

- [ ] Network plot supports two layout algorithms: `circular` (default) and `force-directed` (via `forceLayout` prop)
- [ ] Force-directed layout runs 120 iterations with spring-charge model (Coulomb repulsion + Hooke attraction)
- [ ] 12-color palette for nodes: indigo, pink, teal, amber, violet, emerald, orange, cyan, red, lime, purple, sky
- [ ] Default SVG dimensions are 600×500
- [ ] Node hover highlights connected nodes and edges; dims unconnected to 0.15 opacity
- [ ] Hovered node gets white stroke (2.5px) instead of self-color stroke
- [ ] Edge weight labels only shown when weight > 1
- [ ] Node labels truncated at 18 characters with `...` suffix
- [ ] Node size range: 12px to 36px, proportional to sample size ratio
- [ ] Edge thickness range: 1.5px to ~6.5px, proportional to weight ratio
- [ ] Legend text: `Node size = total sample size | Edge thickness = number of studies`
- [ ] Glass background rect at 0.02 opacity with 12px border radius

### League Table — SVG Rendering Details

- [ ] League table is SVG-based rendering (not HTML table)
- [ ] Cell width responsive to treatment count: 140px (≤4), 120px (≤6), 105px (≤8), 90px (>8)
- [ ] Cell height is fixed at 52px
- [ ] Diagonal cells: indigo (#6366f1) background at 0.15 opacity
- [ ] Diagonal cells show treatment name truncated at 14 characters + P-score as `P = {val}`
- [ ] Statistically significant cells (95% CI excludes 0): green (#22c55e) background at 0.08 opacity
- [ ] Hover increases cell background opacity (0.18 for significant, 0.08 for non-significant)
- [ ] Upper triangle cells show abbreviated comparison label (first 3 chars of each treatment)
- [ ] Legend has 3 items: `Statistically significant (95% CI excludes 0)`, `Not significant`, `Diagonal (treatment + P-score)`
- [ ] Reading guide text: `Read row vs column. Upper triangle: row treatment vs column treatment. Lower triangle: mirrored (reversed sign).`

### NMA Forest Plot — SVG Rendering Details

- [ ] NMA forest plot reference treatment selector label is `Reference treatment:`
- [ ] Default reference treatment is the first treatment in the result array
- [ ] Comparisons sortable by `effect` (default) or `pscore`
- [ ] Statistically significant comparisons marked with `*` asterisk (bold, 0.6 opacity)
- [ ] Treatment labels truncated at 24 characters
- [ ] Point estimates rendered as diamond shapes (not squares)
- [ ] Significant rows: 0.9 fill opacity; non-significant: 0.5 fill opacity
- [ ] Reference treatment row at bottom: labeled `{ref} (reference)`, red (#dc2626) diamond at null line
- [ ] Reference treatment shows `0.00 (reference)` in stats column
- [ ] P-score column in rightmost position with `P-score` sub-header
- [ ] Column headers: `Treatment`, `Effect vs {ref} (95% CI)`, `Estimate [95% CI]`
- [ ] Footer model info: `Random-effects NMA (tau² = {val})` or `Fixed-effect NMA` followed by `| * = statistically significant`
- [ ] Axis labels: `Favours {selectedRef}` (left) / `Favours treatment` (right)

### Screening PDF Viewer — Full Component Details

- [ ] PDF viewer renders as full-screen fixed overlay (z-50 with `bg-black/60 backdrop-blur-sm`)
- [ ] Split pane layout: 70% left (PDF/abstract viewer), 30% right (controls)
- [ ] Stage toggle buttons: `Title/Abstract` (TextAlignLeft icon) and `Full Text` (FileText icon)
- [ ] Full Text toggle disabled with `opacity-30 cursor-not-allowed` when no PDF exists
- [ ] Default stage is `full-text` when paper has pdfUrl or pdfStoragePath, otherwise `title-abstract`
- [ ] PDF page navigation: CaretLeft/CaretRight buttons with aria-labels `Previous page` / `Next page`
- [ ] Page display format: `{pageNumber} / {numPages}` or `...` while PDF loading
- [ ] Zoom controls: MagnifyingGlassMinus/Plus with aria-labels, range 0.5x to 3.0x in 0.25 steps
- [ ] Fit-width button uses ArrowsOutSimple icon with aria-label `Fit width`, resets to 1.0x
- [ ] Zoom percentage display: `{Math.round(scale * 100)}%`
- [ ] PDF loading state: spinner with `Loading PDF...` text
- [ ] No-PDF state: FileText icon + `No PDF available` + clickable `View title/abstract instead` link
- [ ] PDF error state: red X in circle + `Failed to load PDF` + error message text
- [ ] Close button: X icon (size 18) with aria-label `Close screening viewer`
- [ ] Paper title shown in toolbar truncated to `max-w-md`
- [ ] Title/Abstract view: paper title as h1 bold, authors, journal/year, DOI link, PubMed link
- [ ] Abstract rendered in GlassPanel with TextAlignLeft icon + heading `Abstract`
- [ ] No-abstract state: `No abstract available for this paper.`
- [ ] `Open Full-Text PDF` button visible in title-abstract view only when PDF exists
- [ ] AI highlight overlays on PDF for relevant chunks: active chunk pulses in brand color (auto-clears after 3 seconds)
- [ ] Passive chunk highlights: `bg-yellow-400/15` with yellow left border
- [ ] Right panel heading: `Screening Decision`
- [ ] Current decision badge shows icon + `Currently: {decision}` with color-coded background
- [ ] Decision buttons: `Include` (CheckCircle, emerald), `Exclude` (XCircle, red), `Uncertain` (Warning, amber)
- [ ] Exclude in full-text mode opens exclusion reason form; in title-abstract mode submits immediately without reason
- [ ] 11 predefined exclusion reasons: `Wrong study design`, `Wrong population`, `Wrong intervention/exposure`, `Wrong comparator`, `Wrong outcome`, `Wrong setting`, `Duplicate`, `Not primary research`, `Not in English`, `Full text unavailable`, `Other`
- [ ] Exclusion form: dropdown selector + free-text textarea with placeholder `Additional details (optional)...`
- [ ] Exclusion reason format when free text provided: `{dropdown}: {freeText}`
- [ ] `Confirm Exclusion` button in red (bg-red-500)
- [ ] AI Assessment section: Robot icon (weight duotone) + heading `AI Assessment`
- [ ] AI decision badge color-coded same as screening decisions (emerald/red/amber)
- [ ] AI decision text: `Decision: {aiDecision}`
- [ ] Relevant Sections heading: Crosshair icon (weight duotone) + `Relevant Sections`
- [ ] Screening reasons shown as bordered cards: inclusion (emerald), exclusion (red)
- [ ] Jump-to-chunk buttons: ArrowFatLineRight icon + `{sectionType || "p."}{pageNumber ?? "?"}` label text with no inserted separator
- [ ] High-relevance passages: label `High-relevance passages` with Highlighter icon
- [ ] High-priority chunks: those with `highlightPriority >= 0.7`, sorted by priority descending, max 8 shown
- [ ] Priority badge: ≥ 0.9 renders in brand styling, < 0.9 in amber styling
- [ ] Chunk text preview truncated at 150 characters
- [ ] Section overview fallback (when no reasons/highlights): `Jump to section:` with section buttons
- [ ] Paper metadata footer: shows `Previous reason:` when `screeningReason` exists
- [ ] Keyboard shortcuts hint: `Esc` Close, `I` Include, `E` Exclude, `U` Uncertain
- [ ] Chunks loaded from `/api/systematic-review/paper-chunks?paperId={}&projectId={}`
- [ ] Chunk load failure is silent (does not block viewer)
- [ ] PDF served via `/api/pdf/serve?path={encodedPath}` for stored PDFs

### API Routes — Undocumented Endpoints

- [ ] `GET /api/systematic-review/alerts?projectId={id}` — lists search alerts for a project
- [ ] `POST /api/systematic-review/alerts` — creates search alert; Zod validates searchString min 3, max 2000 chars
- [ ] `PUT /api/systematic-review/alerts` — updates alert; action enum: `pause`, `resume`, `update_frequency`, `check_now`
- [ ] `PUT /api/systematic-review/alerts` with `update_frequency` requires `frequency` field or returns 400
- [ ] `DELETE /api/systematic-review/alerts?alertId={id}` — deletes alert by query param
- [ ] Alerts POST/GET verify project ownership via user_id check; returns 404 if not found
- [ ] `GET /api/systematic-review/screening-criteria?projectId={id}` — loads criteria for a project
- [ ] `POST /api/systematic-review/screening-criteria` — replaces all criteria using delete-then-insert transaction
- [ ] `GET /api/systematic-review/export-references?projectId={id}&format={ris|bibtex|endnote|csv}&filter={all|included|excluded}` — exports references
- [ ] `POST /api/systematic-review/manuscript-export` — generates DOCX with academic formatting, section ordering, headers/footers, page numbers
- [ ] `POST /api/systematic-review/pdf-retrieval` — triggers open-access PDF retrieval for specified papers or, when `paperIds` is omitted, all project papers lacking `pdf_storage_path`
- [ ] `GET /api/systematic-review/pdf-retrieval?projectId={id}` — returns retrieval status for all papers
- [ ] `GET /api/systematic-review/revman-export?projectId={id}` — generates RevMan CSV package with 4 files
- [ ] `POST /api/systematic-review/upload` — uploads PDF file, creates paper record, uploads to R2, triggers background processing
- [ ] `POST /api/systematic-review/press` — validates search strategy using PRESS 2015 framework; rate limited
- [ ] `GET /api/systematic-review/prisma-flow?projectId={id}` — returns PRISMA flow data in JSON or SVG format
- [ ] `POST /api/systematic-review/prisma-flow` — updates specific PRISMA flow stages
- [ ] `GET /api/systematic-review/prisma-checklist` — returns static checklist items
- [ ] `POST /api/systematic-review/prisma-checklist` — verifies manuscript compliance against PRISMA 2020 (27 items); supports CSV export
- [ ] `POST /api/systematic-review/import` — imports papers from search databases (pubmed, semantic_scholar, openalex); max results 1-500
- [ ] `GET /api/systematic-review/import?projectId={id}` — fetches papers with full details

### API Route — Screening Internals

- [ ] `POST /api/systematic-review/screen` sets `maxDuration = 300` (5-minute timeout for batch operations)
- [ ] Screen API is rate-limited via `checkRateLimit(userId, "systematic-review", RATE_LIMITS.ai)`
- [ ] Screen API returns 400 with message `No screening criteria found. Define inclusion/exclusion criteria first.` when no criteria exist
- [ ] Screen batch mode Zod validates papers array: min 1, max 100 items
- [ ] Screen batch response includes `summary` object: `{ total, included, excluded, conflicts }`
- [ ] `GET /api/systematic-review/screen?projectId={id}` returns screening summary (separate from queue)

### API Route — Extraction Internals

- [ ] Extract API supports 4 discriminated modes: `single`, `single-fulltext`, `batch`, `batch-fulltext`
- [ ] Extract schema allows max 50 fields per extraction
- [ ] `single` mode textContent Zod: min 50, max 100000 characters
- [ ] `batch` and `batch-fulltext` modes allow max 50 papers per request
- [ ] `single-fulltext` mode returns `{ extractions, chunks }` for source linking
- [ ] `GET /api/systematic-review/extract?paperId={id}` returns chunks for a specific paper
- [ ] `GET /api/systematic-review/extract?projectId={id}` returns the full extraction table; returns 404 when no data exists

### API Route — Screening Queue Internals

- [ ] Screening queue GET supports `stage` parameter: `title_abstract` (default) or `full_text`
- [ ] Screening queue GET supports `mode` parameter: `conflicts` or `unblind`
- [ ] Screening queue verifies project access via `verifyProjectAccess(projectId, userId)` (owner or collaborator)
- [ ] `mode=conflicts` returns `{ conflicts, total }` from `detectConflicts(projectId, stage)`
- [ ] `mode=unblind` returns results with `{ results, summary: { total, withBothDecisions, agreements, conflicts } }`
- [ ] Standard queue GET returns `{ queue, progress, agreement, reviewerProgress }` from 4 parallel promises
- [ ] Queue POST discriminates actions via `z.union([resolveSchema, decisionSchema])`
- [ ] Resolve action calls `resolveConflict(projectId, paperId, stage, resolution, userId, reason)`
- [ ] Decision action calls `recordHumanDecision` with both `userId` and `reviewerId` set to current user
- [ ] Queue PUT recomputes priorities via `updateScreeningPriorities(projectId)` from active-learning module

### Liveblocks Configuration Details

- [ ] Liveblocks SR rooms use empty storage (`SRStorage = Record<string, never>`) — all data persisted in DB
- [ ] Liveblocks auth endpoint is `/api/liveblocks-auth`
- [ ] `SRUserMeta` includes `id: string` and `info: { name, avatar, color }`
- [ ] `SRRoomEvent` is a 5-variant discriminated union on `type` field
- [ ] `useCollaborativeReview` hook exposes 5 broadcast helpers: `broadcastDecision`, `broadcastExtraction`, `broadcastRoB2`, `broadcastStageAdvanced`, `broadcastPapersImported`
- [ ] Activity feed entry ID format: `activity-{timestamp}-{incrementingCounter}`

### Zustand Store — Additional Details

- [ ] `clearProject()` also resets `criteria` to `[{ type: "inclusion", description: "" }]`, `screeningResults` to `[]`, `screeningSummary` to `null`
- [ ] `setProject()` sets `reviewStage` from config, `pico` from `config.pico` (falls back to DEFAULT_PICO), and `generatedStrategy` from `config.searchStrategy`
- [ ] `WorkflowTab` union type includes both `rob2` and `rob` as valid tab keys
- [ ] Store persistence keeps only `projectId`, `projectTitle`, `activeTab`, `reviewStage`, and `pico`; `generatedStrategy`, `reviewConfig`, `criteria`, `screeningResults`, `screeningSummary`, `projects`, and `isLoadingProjects` are omitted from the persisted subset

### Behavior Corrections (Pass 3)

- The `CollaboratorPresence` TAB_LABELS map includes `rob2` → `Risk of Bias` but does NOT include `rob` or `nma` as keys. Both fall back to raw key text.
- The doc section 24 describes entry types with CheckCircle, Table, ShieldCheck, ArrowFatUp, DownloadSimple icons — these are correct per source, but the icon colors were not specified. Actual colors: decision-made varies by decision, extraction-complete=blue-400, rob2-assessed=purple-400, stage-advanced=brand, papers-imported=teal-400.
- The doc states "Activity feed — aria-live='polite' for new entries" in section 28 — this is NOT implemented in the current source. The ActivityFeed component has no aria-live attribute.
- The doc states screening progress live region exists — NOT implemented in current source. No `aria-live` on any screening progress element.

### Components Referenced But Not Rendered

These components exist in `src/components/systematic-review/` but are NOT imported by any tab panel or page component in the current import chain:

- `AMSTAR2Panel.tsx` — AMSTAR 2 self-assessment (16 items). Not imported by any rendered component.
- `AuditTrailPanel.tsx` — Audit trail/transparency logging. Not imported by any rendered component.
- `PRESSChecklistPanel.tsx` — PRESS 2015 search strategy peer review. Not imported by any rendered component.
- `EvidenceGapMap.tsx` — Evidence gap map visualization. Not imported by any rendered component (API route exists at `/api/systematic-review/gap-map` but no UI renders it).

## Codex Verification Pass Discoveries

- [ ] Shared `Tabs` renders plain `<button>` elements with no `role="tablist"`, `role="tab"`, `aria-selected`, or arrow-key handlers in the current workflow shell
- [ ] The inner workflow-page `useEffect` still contains an `isNaN(projectId)` redirect branch, but the outer page component already returns `null` for non-numeric params before that branch can run
- [ ] Screening PDF viewer chunk loading uses `fetch(/api/systematic-review/paper-chunks...)` inside `useEffect` without `AbortController` cancellation or a stale-response guard
- [ ] Screening PDF viewer active-chunk clearing uses a bare `setTimeout(() => setActiveChunkId(null), 3000)` with no cleanup when the viewer closes or unmounts
- [ ] Screening panel best-effort PDF hydration calls `/api/systematic-review/paper-pdf?paperId={paperId}&projectId={projectId}`, but no matching route file exists under `src/app/api/systematic-review/` in the current source tree
- [ ] Screening PDF viewer fetches `/api/systematic-review/paper-chunks?paperId={paperId}&projectId={projectId}`, but no matching route file exists under `src/app/api/systematic-review/` in the current source tree
- [ ] Screening PDF viewer resolves stored PDFs through `/api/pdf/serve?path={encodedPath}`, but no matching route file exists under `src/app/api/pdf/` in the current source tree
- [ ] Screening PDF viewer keeps the hard-coded `w-[70%]` / `w-[30%]` split at all breakpoints; there is no mobile-specific stacked layout
- [ ] Activity feed open/close behavior has no explicit focus management or focus restoration logic around the drawer toggle button
- [ ] Route error recovery delegates only to `ErrorDisplay`'s retry callback; it does not clear persisted systematic-review store state or navigate away from the workflow page
