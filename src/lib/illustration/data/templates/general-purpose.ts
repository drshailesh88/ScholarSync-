/**
 * General-Purpose Templates
 * High-demand diagram templates for business, project management, and analysis.
 *
 * @module data/templates/general-purpose
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// 1. SWOT Analysis
// =============================================================================

export const swotAnalysis: DiagramTemplate = {
  id: 'gen-swot-analysis',
  name: 'SWOT Analysis',
  description: 'Strengths, Weaknesses, Opportunities, and Threats analysis quadrant diagram',
  domain: 'general',
  promptTemplate: `Create a SWOT analysis diagram for {{subject}}:
Strengths: {{strengths}}
Weaknesses: {{weaknesses}}
Opportunities: {{opportunities}}
Threats: {{threats}}
{{#context}}Context: {{context}}{{/context}}`,
  placeholders: ['subject', 'strengths', 'weaknesses', 'opportunities', 'threats', 'context'],
  mermaidExample: `quadrantChart
    title SWOT Analysis for {{subject}}
    x-axis "Helpful" --> "Harmful"
    y-axis "External" --> "Internal"
    quadrant-1 Strengths
    quadrant-2 Weaknesses
    quadrant-3 Opportunities
    quadrant-4 Threats
    "Strong brand": [0.2, 0.8]
    "Limited budget": [0.7, 0.8]
    "Market growth": [0.2, 0.2]
    "New competitors": [0.8, 0.3]`,
};

// =============================================================================
// 2. Gantt Chart
// =============================================================================

export const ganttChart: DiagramTemplate = {
  id: 'gen-gantt-chart',
  name: 'Gantt Chart',
  description: 'Project timeline with tasks, milestones, and dependencies',
  domain: 'general',
  promptTemplate: `Create a Gantt chart for project: {{projectName}}
Start date: {{startDate}}
Tasks:
{{tasks}}
{{#milestones}}Milestones: {{milestones}}{{/milestones}}
{{#dependencies}}Dependencies: {{dependencies}}{{/dependencies}}`,
  placeholders: ['projectName', 'startDate', 'tasks', 'milestones', 'dependencies'],
  mermaidExample: `gantt
    title {{projectName}}
    dateFormat YYYY-MM-DD
    section Planning
        Requirements gathering :a1, 2024-01-01, 14d
        Design phase           :a2, after a1, 21d
    section Development
        Backend development    :a3, after a2, 30d
        Frontend development   :a4, after a2, 25d
    section Testing
        Integration testing    :a5, after a3, 14d
        UAT                    :milestone, m1, after a5, 0d`,
};

// =============================================================================
// 3. Mind Map
// =============================================================================

export const mindMap: DiagramTemplate = {
  id: 'gen-mind-map',
  name: 'Mind Map',
  description: 'Radial diagram for brainstorming and organizing ideas around a central topic',
  domain: 'general',
  promptTemplate: `Create a mind map centered on: {{centralTopic}}
Main branches: {{branches}}
{{#subTopics}}Sub-topics: {{subTopics}}{{/subTopics}}
{{#depth}}Depth level: {{depth}}{{/depth}}`,
  placeholders: ['centralTopic', 'branches', 'subTopics', 'depth'],
  mermaidExample: `mindmap
  root(({{centralTopic}}))
    Branch A
      Sub-topic A1
      Sub-topic A2
    Branch B
      Sub-topic B1
        Detail B1a
      Sub-topic B2
    Branch C
      Sub-topic C1
      Sub-topic C2
      Sub-topic C3`,
};

// =============================================================================
// 4. Venn Diagram (2, 3, 4 sets)
// =============================================================================

export const vennDiagram: DiagramTemplate = {
  id: 'gen-venn-diagram',
  name: 'Venn Diagram',
  description: 'Overlapping circles showing relationships between 2, 3, or 4 sets',
  domain: 'general',
  promptTemplate: `Create a Venn diagram with {{numberOfSets}} sets:
Set labels: {{setLabels}}
Set contents: {{setContents}}
Intersections: {{intersections}}
{{#title}}Title: {{title}}{{/title}}`,
  placeholders: ['numberOfSets', 'setLabels', 'setContents', 'intersections', 'title'],
  mermaidExample: `flowchart TB
    subgraph venn["{{title}}"]
        direction TB
        A["Set A<br/>- Item 1<br/>- Item 2"]
        B["Set B<br/>- Item 3<br/>- Item 4"]
        AB["A ∩ B<br/>- Shared 1"]
        C["Set C<br/>- Item 5"]
        AC["A ∩ C<br/>- Shared 2"]
        BC["B ∩ C<br/>- Shared 3"]
        ABC["A ∩ B ∩ C<br/>- Common"]
    end
    style A fill:#ff000030,stroke:#ff0000
    style B fill:#0000ff30,stroke:#0000ff
    style C fill:#00ff0030,stroke:#00ff00`,
};

// =============================================================================
// 5. Timeline (horizontal)
// =============================================================================

export const horizontalTimeline: DiagramTemplate = {
  id: 'gen-timeline',
  name: 'Timeline',
  description: 'Horizontal timeline showing events, dates, and milestones in chronological order',
  domain: 'general',
  promptTemplate: `Create a horizontal timeline:
Title: {{timelineTitle}}
Events: {{events}}
{{#period}}Time period: {{period}}{{/period}}
{{#categories}}Categories: {{categories}}{{/categories}}`,
  placeholders: ['timelineTitle', 'events', 'period', 'categories'],
  mermaidExample: `timeline
    title {{timelineTitle}}
    section Phase 1
        2024-Q1 : Event A
                 : Event B
    section Phase 2
        2024-Q2 : Event C
        2024-Q3 : Event D
                 : Event E
    section Phase 3
        2024-Q4 : Event F`,
};

// =============================================================================
// 6. Comparison Table
// =============================================================================

export const comparisonTable: DiagramTemplate = {
  id: 'gen-comparison-table',
  name: 'Comparison Table',
  description: 'Side-by-side comparison of items across multiple criteria',
  domain: 'general',
  promptTemplate: `Create a comparison table:
Items to compare: {{items}}
Criteria: {{criteria}}
Values: {{values}}
{{#title}}Title: {{title}}{{/title}}
{{#highlights}}Highlight best: {{highlights}}{{/highlights}}`,
  placeholders: ['items', 'criteria', 'values', 'title', 'highlights'],
  mermaidExample: `flowchart TB
    subgraph comparison["{{title}}"]
        direction TB
        subgraph header["Criteria"]
            H1["Feature"]
            H2["Option A"]
            H3["Option B"]
        end
        subgraph row1["Performance"]
            R1A["Criterion 1"]
            R1B["High"]
            R1C["Medium"]
        end
        subgraph row2["Cost"]
            R2A["Criterion 2"]
            R2B["$$"]
            R2C["$$$"]
        end
    end`,
};

// =============================================================================
// 7. Process Flow (Swimlane)
// =============================================================================

export const swimlaneProcessFlow: DiagramTemplate = {
  id: 'gen-swimlane-process',
  name: 'Process Flow (Swimlane)',
  description: 'Cross-functional process flow with swimlanes showing responsibilities by role or department',
  domain: 'general',
  promptTemplate: `Create a swimlane process flow:
Process name: {{processName}}
Lanes (roles/departments): {{lanes}}
Steps: {{steps}}
{{#decisions}}Decision points: {{decisions}}{{/decisions}}
{{#handoffs}}Handoff points: {{handoffs}}{{/handoffs}}`,
  placeholders: ['processName', 'lanes', 'steps', 'decisions', 'handoffs'],
  mermaidExample: `flowchart TB
    subgraph Customer["Customer"]
        A["Submit Request"] --> B["Review Response"]
    end
    subgraph Sales["Sales Team"]
        C["Receive Request"] --> D{"Approve?"}
        D -->|Yes| E["Process Order"]
        D -->|No| F["Request Info"]
    end
    subgraph Operations["Operations"]
        G["Fulfill Order"] --> H["Ship Product"]
    end
    A --> C
    E --> G
    F --> B
    H --> B`,
};

// =============================================================================
// 8. Hierarchy / Org Chart
// =============================================================================

export const orgChart: DiagramTemplate = {
  id: 'gen-org-chart',
  name: 'Hierarchy / Org Chart',
  description: 'Organizational chart showing hierarchical structure with reporting lines',
  domain: 'general',
  promptTemplate: `Create an organizational chart:
Organization: {{orgName}}
Top level: {{topLevel}}
Structure: {{structure}}
{{#departments}}Departments: {{departments}}{{/departments}}
{{#levels}}Number of levels: {{levels}}{{/levels}}`,
  placeholders: ['orgName', 'topLevel', 'structure', 'departments', 'levels'],
  mermaidExample: `flowchart TB
    CEO["CEO<br/>{{topLevel}}"]
    CEO --> VP1["VP Engineering"]
    CEO --> VP2["VP Marketing"]
    CEO --> VP3["VP Operations"]
    VP1 --> D1["Dev Lead"]
    VP1 --> D2["QA Lead"]
    VP2 --> D3["Content Manager"]
    VP2 --> D4["Social Media"]
    VP3 --> D5["Logistics"]
    VP3 --> D6["Procurement"]`,
};

// =============================================================================
// 9. Cycle Diagram
// =============================================================================

export const cycleDiagram: DiagramTemplate = {
  id: 'gen-cycle-diagram',
  name: 'Cycle Diagram',
  description: 'Circular process showing repeating steps or continuous improvement cycles',
  domain: 'general',
  promptTemplate: `Create a cycle diagram:
Cycle name: {{cycleName}}
Steps: {{steps}}
{{#description}}Description: {{description}}{{/description}}
{{#duration}}Step durations: {{duration}}{{/duration}}`,
  placeholders: ['cycleName', 'steps', 'description', 'duration'],
  mermaidExample: `flowchart TB
    A["Plan"] --> B["Do"]
    B --> C["Check"]
    C --> D["Act"]
    D --> A
    style A fill:#4CAF50,color:#fff
    style B fill:#2196F3,color:#fff
    style C fill:#FF9800,color:#fff
    style D fill:#F44336,color:#fff`,
};

// =============================================================================
// 10. Fishbone / Ishikawa Diagram
// =============================================================================

export const fishboneDiagram: DiagramTemplate = {
  id: 'gen-fishbone-diagram',
  name: 'Fishbone / Ishikawa Diagram',
  description: 'Cause-and-effect diagram for root cause analysis with major categories and sub-causes',
  domain: 'general',
  promptTemplate: `Create a fishbone (Ishikawa) diagram:
Problem/Effect: {{problem}}
Categories: {{categories}}
Causes: {{causes}}
{{#subCauses}}Sub-causes: {{subCauses}}{{/subCauses}}
{{#priority}}Priority causes: {{priority}}{{/priority}}`,
  placeholders: ['problem', 'categories', 'causes', 'subCauses', 'priority'],
  mermaidExample: `flowchart RL
    Effect["{{problem}}"]

    subgraph People["People"]
        P1["Insufficient training"]
        P2["Staff shortage"]
    end

    subgraph Process["Process"]
        PR1["Unclear procedures"]
        PR2["Missing QC steps"]
    end

    subgraph Equipment["Equipment"]
        E1["Outdated tools"]
        E2["Poor maintenance"]
    end

    subgraph Materials["Materials"]
        M1["Low quality inputs"]
        M2["Supply delays"]
    end

    People --> Effect
    Process --> Effect
    Equipment --> Effect
    Materials --> Effect`,
};

// =============================================================================
// TEMPLATE COLLECTION
// =============================================================================

export const generalPurposeTemplates: DiagramTemplate[] = [
  swotAnalysis,
  ganttChart,
  mindMap,
  vennDiagram,
  horizontalTimeline,
  comparisonTable,
  swimlaneProcessFlow,
  orgChart,
  cycleDiagram,
  fishboneDiagram,
];
