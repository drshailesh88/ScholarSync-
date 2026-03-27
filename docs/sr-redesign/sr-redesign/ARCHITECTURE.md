# SR Module: Current Architecture

> This document captures the existing architecture of the Systematic Review module. It serves as the baseline for QA testing after any redesign work.

-----

## Overview

The SR module is a **single-page application** with **tab-based navigation**. All workflow phases exist as panels rendered conditionally based on the active tab.

**Entry point**: `/systematic-review` (hub/dashboard)
**Workflow page**: `/systematic-review/[projectId]` (single page, all tabs)

-----

## File Structure

```
src/
├── app/
│   ├── (app)/systematic-review/
│   │   ├── page.tsx                    # Hub/dashboard - project list
│   │   └── [projectId]/
│   │       └── page.tsx                # Main workflow page (tab-based)
│   │
│   └── api/systematic-review/          # 36 API route directories
│       ├── alerts/
│       ├── amstar2/
│       ├── audit/
│       ├── cerqual/
│       ├── collaborators/
│       ├── config/
│       ├── export-references/
│       ├── extract/
│       ├── gap-map/
│       ├── grade/
│       ├── import/
│       ├── import-references/
│       ├── manuscript/
│       ├── manuscript-export/
│       ├── meta-analysis/
│       ├── moose/
│       ├── nma/
│       ├── nos/
│       ├── pdf-retrieval/
│       ├── press/
│       ├── prisma-checklist/
│       ├── prisma-flow/
│       ├── probast/
│       ├── projects/
│       ├── prospero/
│       ├── protocol/
│       ├── quadas2/
│       ├── revman-export/
│       ├── rob2/
│       ├── robins-i/
│       ├── screen/
│       ├── screening-criteria/
│       ├── screening-queue/
│       ├── search-strategy/
│       ├── snowball/
│       └── upload/
│
├── components/systematic-review/       # 39 panel components
│   ├── AMSTAR2Panel.tsx
│   ├── ActivityFeed.tsx
│   ├── AuditTrailPanel.tsx
│   ├── CERQualPanel.tsx
│   ├── CollaboratorPresence.tsx
│   ├── DataExtractionPanel.tsx
│   ├── DeviationTracker.tsx
│   ├── EvidenceGapMap.tsx
│   ├── ForestPlot.tsx
│   ├── FunnelPlot.tsx
│   ├── GRADEPanel.tsx
│   ├── ImportExportPanel.tsx
│   ├── LeagueTable.tsx
│   ├── LivingReviewPanel.tsx
│   ├── MOOSEChecklistPanel.tsx
│   ├── ManuscriptPanel.tsx
│   ├── MetaAnalysisPanel.tsx
│   ├── NMAForestPlot.tsx
│   ├── NMAPanel.tsx
│   ├── NOSPanel.tsx
│   ├── NetworkPlot.tsx
│   ├── PRESSChecklistPanel.tsx
│   ├── PRISMAChecklistPanel.tsx
│   ├── PRISMAFlowPanel.tsx
│   ├── PROBASTPanel.tsx
│   ├── PROSPEROExport.tsx
│   ├── PaperImportPanel.tsx
│   ├── ProjectHeader.tsx
│   ├── ProtocolPanel.tsx
│   ├── QUADAS2Panel.tsx
│   ├── ROBINSIPanel.tsx
│   ├── ReviewTypeSelector.tsx
│   ├── RoB2Panel.tsx
│   ├── ScopingChartingPanel.tsx
│   ├── ScreeningPDFViewer.tsx
│   ├── ScreeningPanel.tsx
│   ├── SearchStrategyPanel.tsx
│   ├── SnowballingPanel.tsx
│   └── UnifiedRoBPanel.tsx
│
├── stores/
│   └── systematic-review-store.ts      # Zustand store
│
└── lib/liveblocks/
    └── sr-config.ts                    # Real-time collaboration config
```

-----

## State Management

### Zustand Store (`systematic-review-store.ts`)

```typescript
interface SystematicReviewStore {
  // Project context
  projectId: number | null;
  projectTitle: string;
  reviewConfig: ReviewConfig | null;
  activeTab: WorkflowTab;

  // Workflow progress
  reviewStage: ReviewStage;
  reviewType: ReviewType;
  isRapid: boolean;

  // Search strategy state
  pico: PICOInput;
  generatedStrategy: SearchStrategy | null;

  // Screening state
  criteria: Criterion[];
  screeningResults: ScreeningResult[];
  screeningSummary: ScreeningSummary | null;

  // Project list (hub page)
  projects: SRProject[];
  isLoadingProjects: boolean;
}
```

### Workflow Tabs (19 total)

```typescript
type WorkflowTab =
  | "strategy"      // Search strategy builder
  | "import"        // Paper import
  | "screening"     // Title/abstract screening
  | "prisma"        // PRISMA flow diagram
  | "rob2"          // Risk of Bias 2.0
  | "rob"           // Generic RoB (deprecated?)
  | "extraction"    // Data extraction
  | "meta_analysis" // Meta-analysis
  | "nma"           // Network meta-analysis
  | "snowball"      // Snowball searching
  | "export"        // Export references
  | "living"        // Living review updates
  | "protocol"      // Protocol registration
  | "prospero"      // PROSPERO export
  | "grade"         // GRADE assessment
  | "cerqual"       // CERQual (qualitative)
  | "manuscript"    // Manuscript writing
  | "gap_map"       // Evidence gap map
  | "audit";        // Audit trail
```

### Review Types (10 types)

```typescript
type ReviewType =
  | "intervention_rct"
  | "intervention_non_rct"
  | "observational_cohort"
  | "observational_case_control"
  | "diagnostic_accuracy"
  | "prognostic"
  | "qualitative"
  | "mixed_methods"
  | "scoping"
  | "umbrella";
```

### Review Stages (7 stages)

```typescript
type ReviewStage =
  | "search_strategy"
  | "screening"
  | "full_text_screening"
  | "data_extraction"
  | "risk_of_bias"
  | "meta_analysis"
  | "reporting";
```

-----

## Real-Time Collaboration (Liveblocks)

### Room ID Pattern

`sr-project-{projectId}`

### Presence Type

```typescript
type SRPresence = {
  userId: string;
  name: string;
  avatar: string;
  color: string;
  activeTab: WorkflowTab | null;
  currentPaperId: number | null;
};
```

### Broadcast Events

- `decision-made` — User made screening decision
- `extraction-complete` — User finished extracting data
- `rob2-assessed` — User completed RoB2 assessment
- `stage-advanced` — Workflow stage changed
- `papers-imported` — Papers were imported

### Storage

Empty — all data lives in the database, not Liveblocks storage.

-----

## API Routes

### Project Management

|Route                                 |Method|Purpose            |
|--------------------------------------|------|-------------------|
|`/api/systematic-review/projects`     |GET   |List all projects  |
|`/api/systematic-review/projects`     |POST  |Create new project |
|`/api/systematic-review/projects/[id]`|GET   |Get project details|
|`/api/systematic-review/projects/[id]`|PATCH |Update project     |
|`/api/systematic-review/projects/[id]`|DELETE|Delete project     |

### Configuration

|Route                          |Method|Purpose             |
|-------------------------------|------|--------------------|
|`/api/systematic-review/config`|GET   |Get review config   |
|`/api/systematic-review/config`|POST  |Create/update config|

### Protocol & Registration

|Route                            |Method  |Purpose            |
|---------------------------------|--------|-------------------|
|`/api/systematic-review/protocol`|GET/POST|Protocol management|
|`/api/systematic-review/prospero`|GET/POST|PROSPERO export    |

### Search & Import

|Route                                     |Method  |Purpose           |
|------------------------------------------|--------|------------------|
|`/api/systematic-review/search-strategy`  |GET/POST|Search strategy   |
|`/api/systematic-review/import`           |POST    |Import papers     |
|`/api/systematic-review/import-references`|POST    |Import references |
|`/api/systematic-review/upload`           |POST    |Upload files      |
|`/api/systematic-review/snowball`         |GET/POST|Snowball searching|

### Screening

|Route                                      |Method  |Purpose             |
|-------------------------------------------|--------|--------------------|
|`/api/systematic-review/screening-criteria`|GET/POST|Manage criteria     |
|`/api/systematic-review/screening-queue`   |GET     |Get papers to screen|
|`/api/systematic-review/screen`            |POST    |Submit decision     |

### Assessment

|Route                            |Method  |Purpose           |
|---------------------------------|--------|------------------|
|`/api/systematic-review/rob2`    |GET/POST|RoB 2.0 assessment|
|`/api/systematic-review/robins-i`|GET/POST|ROBINS-I          |
|`/api/systematic-review/quadas2` |GET/POST|QUADAS-2          |
|`/api/systematic-review/probast` |GET/POST|PROBAST           |
|`/api/systematic-review/nos`     |GET/POST|Newcastle-Ottawa  |
|`/api/systematic-review/amstar2` |GET/POST|AMSTAR 2          |
|`/api/systematic-review/press`   |GET/POST|PRESS checklist   |
|`/api/systematic-review/moose`   |GET/POST|MOOSE checklist   |

### Data Extraction

|Route                           |Method  |Purpose        |
|--------------------------------|--------|---------------|
|`/api/systematic-review/extract`|GET/POST|Data extraction|

### Analysis

|Route                                 |Method  |Purpose              |
|--------------------------------------|--------|---------------------|
|`/api/systematic-review/meta-analysis`|GET/POST|Meta-analysis        |
|`/api/systematic-review/nma`          |GET/POST|Network meta-analysis|
|`/api/systematic-review/grade`        |GET/POST|GRADE assessment     |
|`/api/systematic-review/cerqual`      |GET/POST|CERQual              |
|`/api/systematic-review/gap-map`      |GET/POST|Evidence gap map     |

### Reporting

|Route                                     |Method  |Purpose          |
|------------------------------------------|--------|-----------------|
|`/api/systematic-review/prisma-flow`      |GET/POST|PRISMA diagram   |
|`/api/systematic-review/prisma-checklist` |GET/POST|PRISMA checklist |
|`/api/systematic-review/manuscript`       |GET/POST|Manuscript       |
|`/api/systematic-review/manuscript-export`|POST    |Export manuscript|
|`/api/systematic-review/export-references`|POST    |Export references|
|`/api/systematic-review/revman-export`    |POST    |RevMan export    |

### Collaboration & Audit

|Route                                 |Method  |Purpose      |
|--------------------------------------|--------|-------------|
|`/api/systematic-review/collaborators`|GET/POST|Team members |
|`/api/systematic-review/audit`        |GET     |Audit trail  |
|`/api/systematic-review/alerts`       |GET     |System alerts|

### Utilities

|Route                                 |Method|Purpose          |
|--------------------------------------|------|-----------------|
|`/api/systematic-review/pdf-retrieval`|POST  |Get PDF for paper|

-----

## Existing Tests

### E2E Tests (Playwright)

```
e2e/
├── forms/
│   └── systematic-review-protocol-form.spec.ts
└── journeys/
    ├── deep/
    │   └── systematic-review.spec.ts
    └── systematic-review-pipeline.spec.ts
```

### QA Generated Tests

```
qa/generated/systematic-review/
├── spec-001.spec.ts through spec-017.spec.ts
```

These are the self-healing QA tests from the Karpathy-inspired methodology.

-----

## Tab Visibility by Review Type

Tabs are shown/hidden based on `reviewType`. The mapping is in the workflow page.

|Tab          |RCT|Non-RCT|Cohort|Case-Control|DTA|Prognostic|Qual|Mixed|Scoping|Umbrella|
|-------------|---|-------|------|------------|---|----------|----|-----|-------|--------|
|strategy     |✓  |✓      |✓     |✓           |✓  |✓         |✓   |✓    |✓      |✓       |
|import       |✓  |✓      |✓     |✓           |✓  |✓         |✓   |✓    |✓      |✓       |
|screening    |✓  |✓      |✓     |✓           |✓  |✓         |✓   |✓    |✓      |✓       |
|prisma       |✓  |✓      |✓     |✓           |✓  |✓         |✓   |✓    |✓      |✓       |
|rob2         |✓  |-      |-     |-           |-  |-         |-   |✓    |-      |-       |
|robins-i     |-  |✓      |✓     |✓           |-  |-         |-   |✓    |-      |-       |
|quadas2      |-  |-      |-     |-           |✓  |-         |-   |-    |-      |-       |
|probast      |-  |-      |-     |-           |-  |✓         |-   |-    |-      |-       |
|extraction   |✓  |✓      |✓     |✓           |✓  |✓         |✓   |✓    |✓      |✓       |
|meta_analysis|✓  |✓      |✓     |✓           |✓  |✓         |-   |✓    |-      |✓       |
|nma          |✓  |✓      |-     |-           |-  |-         |-   |-    |-      |-       |
|grade        |✓  |✓      |✓     |✓           |✓  |✓         |-   |✓    |-      |✓       |
|cerqual      |-  |-      |-     |-           |-  |-         |✓   |✓    |-      |-       |
|gap_map      |✓  |✓      |✓     |✓           |✓  |✓         |✓   |✓    |✓      |✓       |
|manuscript   |✓  |✓      |✓     |✓           |✓  |✓         |✓   |✓    |✓      |✓       |
|audit        |✓  |✓      |✓     |✓           |✓  |✓         |✓   |✓    |✓      |✓       |

-----

## Key Dependencies

### External Libraries

- `zustand` — State management
- `@liveblocks/client`, `@liveblocks/react` — Real-time collaboration
- `recharts` — Charts (forest plots, funnel plots)
- `react-pdf` — PDF viewing
- `papaparse` — CSV parsing for imports

### Internal Dependencies

- `/src/lib/db/schema.ts` — Database schema (Drizzle ORM)
- `/src/lib/liveblocks/sr-config.ts` — Liveblocks typing
- `/src/stores/systematic-review-store.ts` — Zustand store

-----

## Current User Journey

```
1. Hub Page (/systematic-review)
   └── See project list
   └── Create new project → Select review type → Enter details
   
2. Workflow Page (/systematic-review/[projectId])
   └── Tab: Protocol → Register with PROSPERO
   └── Tab: Strategy → Build PICO, generate search string
   └── Tab: Import → Upload RIS/CSV, deduplicate
   └── Tab: Screening → AI-assisted screening decisions
   └── Tab: PRISMA → Auto-generated flow diagram
   └── Tab: RoB → Risk of bias assessment (type-specific)
   └── Tab: Extraction → Data extraction forms
   └── Tab: Meta-Analysis → Forest plots, heterogeneity
   └── Tab: NMA → Network plots, league tables
   └── Tab: GRADE → Evidence quality assessment
   └── Tab: Manuscript → Auto-generate methods section
   └── Tab: Export → RevMan, PROSPERO update, references
```

-----

## Known Issues / Technical Debt

1. **Tab overload** — 19 tabs is overwhelming for users
1. **No progressive disclosure** — All tabs visible from start
1. **No phase grouping** — Tabs are flat, not grouped by workflow phase
1. **Screening UX** — No keyboard shortcuts, no single-paper focus mode
1. **Empty states** — Generic “No data” messages, not helpful guidance

-----

*Last updated: March 27, 2026*
*Generated from codebase analysis*