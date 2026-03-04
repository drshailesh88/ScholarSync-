/**
 * prompts/index.ts
 * Prompt templates for AI diagram generation
 *
 * Contains system prompts and few-shot examples for different diagram types.
 * These templates guide AI models to generate accurate diagram DSL.
 */

import type { DiagramType, DiagramDomain } from '../types';

// =============================================================================
// SYSTEM PROMPTS
// =============================================================================

/**
 * Base system prompt for diagram generation
 */
export const BASE_SYSTEM_PROMPT = `You are an expert diagram generator for scientific and technical illustrations.
Your role is to convert natural language descriptions into precise diagram specifications.

Guidelines:
- Generate clean, well-structured diagrams
- Use appropriate visual hierarchy
- Follow scientific visualization best practices
- Ensure accessibility with clear labels and adequate contrast
- Keep diagrams focused and uncluttered`;

/**
 * System prompt for Mermaid diagram generation
 */
export const MERMAID_SYSTEM_PROMPT = `${BASE_SYSTEM_PROMPT}

You generate Mermaid.js DSL for flowcharts, sequence diagrams, and state diagrams.

Mermaid Syntax Guidelines:
- Use 'flowchart TB' for top-to-bottom flowcharts
- Use 'flowchart LR' for left-to-right flowcharts
- Node syntax: A["Label"] for rectangles, A{"Label"} for diamonds, A(["Label"]) for stadiums
- Arrow syntax: --> for solid arrows, -.-> for dashed arrows
- Use subgraphs for grouping related nodes
- Apply classDef for consistent styling

Always output valid Mermaid DSL that renders without errors.`;

/**
 * System prompt for direct SVG generation
 */
export const SVG_SYSTEM_PROMPT = `${BASE_SYSTEM_PROMPT}

You generate direct SVG code for custom diagrams that don't fit standard DSL patterns.

SVG Guidelines:
- Include proper viewBox for scalability
- Use semantic group elements (<g>) for logical sections
- Apply consistent stroke and fill colors
- Add appropriate text labels with proper anchoring
- Ensure the diagram is self-contained with no external dependencies

Always output valid, well-formed SVG that displays correctly.`;

// =============================================================================
// DOMAIN-SPECIFIC PROMPTS
// =============================================================================

/**
 * Domain-specific prompt additions
 */
export const DOMAIN_PROMPTS: Record<DiagramDomain, string> = {
  medicine: `
Medical diagram requirements:
- Follow CONSORT, PRISMA, or STROBE guidelines where applicable
- Use standard medical terminology
- Include appropriate sample sizes (n=) where relevant
- Maintain patient confidentiality in examples
- Use color coding consistent with medical publications`,

  biology: `
Biology diagram requirements:
- Use proper biological nomenclature
- Follow conventions for pathway diagrams
- Include scale bars where appropriate
- Use standard symbols for cellular components
- Maintain directional conventions (5' to 3', etc.)`,

  chemistry: `
Chemistry diagram requirements:
- Use IUPAC nomenclature
- Follow standard reaction arrow conventions
- Include proper molecular representations
- Use appropriate bonding symbols
- Maintain stereochemistry conventions`,

  physics: `
Physics diagram requirements:
- Include proper unit labels
- Use standard vector notation
- Follow conventional force diagram rules
- Include reference frames where needed
- Maintain scale consistency`,

  engineering: `
Engineering diagram requirements:
- Use standard engineering symbols
- Include proper dimensions and tolerances
- Follow industry-specific conventions
- Maintain consistent line weights
- Use appropriate annotation styles`,

  'computer-science': `
Computer science diagram requirements:
- Use standard algorithm notation
- Follow UML conventions where appropriate
- Include complexity annotations where relevant
- Use consistent data structure representations
- Maintain code-style consistency`,

  statistics: `
Statistics diagram requirements:
- Include proper axis labels and units
- Show confidence intervals where appropriate
- Use standard statistical notation
- Include sample sizes and p-values
- Follow publication-quality chart guidelines`,

  general: `
General diagram requirements:
- Maintain clarity and simplicity
- Use intuitive visual metaphors
- Include clear labels
- Ensure logical flow
- Use accessible color schemes`,
};

// =============================================================================
// DIAGRAM TYPE PROMPTS
// =============================================================================

/**
 * Type-specific prompt additions
 */
export const TYPE_PROMPTS: Partial<Record<DiagramType, string>> = {
  consort: `
CONSORT Flow Diagram requirements:
- Include all four phases: Enrollment, Allocation, Follow-up, Analysis
- Show exclusion reasons with counts
- Track both intervention and control arms
- Include discontinuation and loss to follow-up
- Reference: CONSORT 2010 Statement`,

  prisma: `
PRISMA Flow Diagram requirements:
- Include Identification, Screening, Eligibility, Included phases
- Show database sources with record counts
- Track duplicate removal
- Include exclusion reasons at each stage
- Reference: PRISMA 2020 Statement`,

  'decision-tree': `
Decision Tree requirements:
- Clear decision nodes with yes/no branches
- Terminal nodes for outcomes
- Probability or likelihood annotations where appropriate
- Logical left-to-right or top-to-bottom flow
- Clear action recommendations at endpoints`,

  'state-diagram': `
State Diagram requirements:
- Clear initial and terminal states
- Labeled transitions between states
- Include trigger conditions on transitions
- Show self-loops for recurring events
- Use standard state machine notation`,

  flowchart: `
Flowchart requirements:
- Use appropriate shapes: rectangles for processes, diamonds for decisions
- Maintain consistent flow direction
- Include start and end terminators
- Label all decision branches
- Keep connector lines clean and non-crossing where possible`,

  sequence: `
Sequence Diagram requirements:
- Clear participant/actor definitions
- Properly ordered message flows
- Include activation bars for long operations
- Show return messages where appropriate
- Use notes for clarification`,

  pathway: `
Pathway Diagram requirements:
- Show molecular/cellular components
- Include activation and inhibition arrows
- Use standard pathway notation
- Group related components
- Include feedback loops where present`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Few-shot examples for different diagram types
 */
export const FEW_SHOT_EXAMPLES: Partial<Record<DiagramType, FewShotExample[]>> = {
  flowchart: [
    {
      prompt: 'Create a simple process flowchart for user registration',
      output: `flowchart TB
    start(["Start"])
    input["User enters email and password"]
    validate{"Valid input?"}
    checkExists{"Email exists?"}
    createAccount["Create account"]
    sendEmail["Send verification email"]
    error1["Show validation error"]
    error2["Show 'email exists' error"]
    success(["Registration complete"])

    start --> input
    input --> validate
    validate -->|No| error1
    validate -->|Yes| checkExists
    checkExists -->|Yes| error2
    checkExists -->|No| createAccount
    createAccount --> sendEmail
    sendEmail --> success
    error1 --> input
    error2 --> input`,
    },
    {
      prompt: 'Make a flowchart showing data processing pipeline',
      output: `flowchart LR
    subgraph input["Data Input"]
        A["Raw Data"]
        B["Data Validation"]
    end

    subgraph processing["Processing"]
        C["Data Cleaning"]
        D["Transformation"]
        E["Feature Engineering"]
    end

    subgraph output["Output"]
        F["Model Input"]
        G["Data Warehouse"]
    end

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    E --> G`,
    },
  ],

  consort: [
    {
      prompt: 'Create a CONSORT diagram for a randomized trial with 200 participants',
      output: `flowchart TB
    subgraph enrollment["Enrollment"]
        assessed["Assessed for eligibility<br/>(n=250)"]
        excluded["Excluded (n=50)<br/>Not meeting criteria (n=30)<br/>Declined (n=15)<br/>Other (n=5)"]
    end

    randomized["Randomized<br/>(n=200)"]

    subgraph allocation["Allocation"]
        intervention["Allocated to intervention (n=100)<br/>Received intervention (n=98)<br/>Did not receive (n=2)"]
        control["Allocated to control (n=100)<br/>Received control (n=99)<br/>Did not receive (n=1)"]
    end

    subgraph followup["Follow-up"]
        fuIntervention["Lost to follow-up (n=5)<br/>Discontinued (n=3)"]
        fuControl["Lost to follow-up (n=4)<br/>Discontinued (n=2)"]
    end

    subgraph analysis["Analysis"]
        analysisIntervention["Analyzed (n=92)<br/>Excluded (n=8)"]
        analysisControl["Analyzed (n=94)<br/>Excluded (n=6)"]
    end

    assessed --> excluded
    assessed --> randomized
    randomized --> intervention
    randomized --> control
    intervention --> fuIntervention
    control --> fuControl
    fuIntervention --> analysisIntervention
    fuControl --> analysisControl`,
    },
  ],

  'decision-tree': [
    {
      prompt: 'Create a clinical decision tree for chest pain evaluation',
      output: `flowchart TB
    start(["Patient presents with chest pain"])

    q1{"STEMI on ECG?"}
    q2{"High-risk features?"}
    q3{"Troponin elevated?"}
    q4{"ACS likely?"}

    a1["Activate cath lab<br/>Emergent PCI"]
    a2["Admit to CCU<br/>Anticoagulation"]
    a3["Serial troponins<br/>Observation"]
    a4["Risk stratify<br/>Stress testing"]
    a5["Consider non-cardiac causes"]

    start --> q1
    q1 -->|Yes| a1
    q1 -->|No| q2
    q2 -->|Yes| a2
    q2 -->|No| q3
    q3 -->|Yes| a2
    q3 -->|No| q4
    q4 -->|Yes| a3
    q4 -->|No| a5

    classDef emergency fill:#fee2e2,stroke:#dc2626
    classDef admit fill:#fef3c7,stroke:#d97706
    classDef observe fill:#d1fae5,stroke:#059669

    class a1 emergency
    class a2 admit
    class a3,a4,a5 observe`,
    },
  ],

  sequence: [
    {
      prompt: 'Create a patient journey sequence diagram for clinic visit',
      output: `sequenceDiagram
    participant P as Patient
    participant R as Reception
    participant N as Nurse
    participant D as Doctor
    participant L as Lab

    P->>R: Arrives for appointment
    R->>R: Verify insurance
    R-->>P: Confirm copay

    R->>N: Patient ready
    N->>P: Vital signs
    N->>N: Update chart

    N->>D: Patient in room
    D->>P: History & examination

    alt Lab work needed
        D->>L: Order tests
        P->>L: Blood draw
        L-->>D: Results
    end

    D->>P: Discuss findings
    D->>P: Treatment plan
    D-->>R: Schedule follow-up
    R-->>P: Appointment confirmed`,
    },
  ],
};

/**
 * Few-shot example structure
 */
export interface FewShotExample {
  prompt: string;
  output: string;
  /** Optional explanation of why this output is appropriate */
  reasoning?: string;
}

// =============================================================================
// MODIFICATION PROMPTS
// =============================================================================

/**
 * Build a system prompt for a given backend type with optional domain context
 *
 * @param backend - The backend type ('mermaid' or 'svg')
 * @param domain - Optional domain context for specialized prompts
 * @returns A complete system prompt string
 */
export function buildSystemPrompt(
  backend: 'mermaid' | 'svg' = 'mermaid',
  domain?: string
): string {
  const basePrompt = backend === 'mermaid' ? MERMAID_SYSTEM_PROMPT : SVG_SYSTEM_PROMPT;

  if (!domain) {
    return basePrompt;
  }

  // Try to get domain-specific prompt
  // Note: Domain names in domain prompt files may not match DiagramDomain enum exactly
  // We'll use a generic domain enhancement if specific domain prompt isn't found
  const domainEnhancement = DOMAIN_PROMPTS[domain as DiagramDomain] || '';

  if (domainEnhancement) {
    return `${basePrompt}\n\n${domainEnhancement}`;
  }

  return basePrompt;
}

// =============================================================================
// MODIFICATION PROMPTS
// =============================================================================

/**
 * Prompts for diagram modification requests
 */
export const MODIFICATION_PROMPTS = {
  addNode: `Add a new node to the existing diagram.
Identify the appropriate location based on the description.
Connect it to relevant existing nodes.
Maintain the diagram's visual consistency.`,

  removeNode: `Remove the specified node from the diagram.
Update connections to maintain flow.
Consider if any orphaned nodes need to be handled.`,

  updateLabel: `Update the label of the specified element.
Preserve formatting and styling.
Ensure the new label fits appropriately.`,

  changeStyle: `Modify the visual style of the diagram.
Apply changes consistently across similar elements.
Maintain readability and accessibility.`,

  restructure: `Reorganize the diagram structure.
Maintain all existing information.
Improve visual clarity and logical flow.`,
};

// =============================================================================
// PROMPT BUILDER
// =============================================================================

/**
 * Build a complete prompt for diagram generation
 */
export function buildPrompt(params: {
  userPrompt: string;
  diagramType?: DiagramType;
  domain?: DiagramDomain;
  backend?: 'mermaid' | 'svg';
  isModification?: boolean;
  existingDiagram?: string;
  conversationContext?: string;
}): string {
  const {
    userPrompt,
    diagramType,
    domain = 'general',
    backend = 'mermaid',
    isModification = false,
    existingDiagram,
    conversationContext,
  } = params;

  const parts: string[] = [];

  // Add base system prompt
  parts.push(backend === 'mermaid' ? MERMAID_SYSTEM_PROMPT : SVG_SYSTEM_PROMPT);

  // Add domain-specific guidance
  parts.push(DOMAIN_PROMPTS[domain]);

  // Add type-specific guidance
  if (diagramType && TYPE_PROMPTS[diagramType]) {
    parts.push(TYPE_PROMPTS[diagramType]!);
  }

  // Add conversation context if available
  if (conversationContext) {
    parts.push(`\nPrevious context:\n${conversationContext}`);
  }

  // Add existing diagram for modifications
  if (isModification && existingDiagram) {
    parts.push(`\nExisting diagram to modify:\n\`\`\`\n${existingDiagram}\n\`\`\``);
  }

  // Add few-shot examples if available
  if (diagramType && FEW_SHOT_EXAMPLES[diagramType]) {
    const examples = FEW_SHOT_EXAMPLES[diagramType]!;
    parts.push('\nExamples:');
    for (const example of examples.slice(0, 2)) {
      parts.push(`\nUser: ${example.prompt}\nAssistant:\n\`\`\`mermaid\n${example.output}\n\`\`\``);
    }
  }

  // Add the user's actual prompt
  parts.push(`\nUser request: ${userPrompt}`);
  parts.push('\nGenerate the diagram code:');

  return parts.join('\n');
}

/**
 * Extract DSL code from AI response
 */
export function extractDSL(response: string): string | null {
  // Try to extract from code blocks
  const codeBlockMatch = response.match(/```(?:mermaid|svg|xml)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }

  // Try to extract Mermaid DSL directly
  const mermaidPatterns = [
    /^(flowchart\s+(?:TB|BT|LR|RL)[\s\S]*)/m,
    /^(sequenceDiagram[\s\S]*)/m,
    /^(stateDiagram[\s\S]*)/m,
    /^(graph\s+(?:TB|BT|LR|RL)[\s\S]*)/m,
  ];

  for (const pattern of mermaidPatterns) {
    const match = response.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  // Try to extract SVG directly
  const svgMatch = response.match(/(<svg[\s\S]*<\/svg>)/);
  if (svgMatch) {
    return svgMatch[1].trim();
  }

  return null;
}

/**
 * Validate that extracted content is valid DSL
 */
export function isValidDSL(content: string): { valid: boolean; type: 'mermaid' | 'svg' | 'unknown' } {
  const trimmed = content.trim();

  // Check for Mermaid DSL
  if (
    trimmed.startsWith('flowchart') ||
    trimmed.startsWith('graph') ||
    trimmed.startsWith('sequenceDiagram') ||
    trimmed.startsWith('stateDiagram') ||
    trimmed.startsWith('classDiagram') ||
    trimmed.startsWith('erDiagram') ||
    trimmed.startsWith('pie') ||
    trimmed.startsWith('gantt')
  ) {
    return { valid: true, type: 'mermaid' };
  }

  // Check for SVG
  if (trimmed.startsWith('<svg') && trimmed.endsWith('</svg>')) {
    return { valid: true, type: 'svg' };
  }

  return { valid: false, type: 'unknown' };
}

// =============================================================================
// SPECIALTY PROMPTS EXPORTS
// =============================================================================

export * from './pulmonology-prompts';
export { default as pulmonologyPrompts } from './pulmonology-prompts';

export * from './emergency-medicine-prompts';
export { default as emergencyMedicinePrompts } from './emergency-medicine-prompts';

export * from './endocrinology-prompts';
export { default as endocrinologyPrompts } from './endocrinology-prompts';

export * from './gastroenterology-prompts';
export { default as gastroenterologyPrompts } from './gastroenterology-prompts';

export * from './neurology-prompts';
export { default as neurologyPrompts } from './neurology-prompts';

export * from './nephrology-prompts';
export { default as nephrologyPrompts } from './nephrology-prompts';

export * from './infectious-disease-prompts';
export { default as infectiousDiseasePrompts } from './infectious-disease-prompts';

export * from './hematology-oncology-prompts';
export { default as hematologyOncologyPrompts } from './hematology-oncology-prompts';

export * from './orthopedics-prompts';
export { default as orthopedicsPrompts } from './orthopedics-prompts';

export * from './anesthesiology-prompts';
export { default as anesthesiologyPrompts } from './anesthesiology-prompts';

export * from './radiology-prompts';
export { default as radiologyPrompts } from './radiology-prompts';

export * from './ophthalmology-prompts';
export { default as ophthalmologyPrompts } from './ophthalmology-prompts';

export * from './ent-prompts';
export { default as entPrompts } from './ent-prompts';

export * from './dermatology-prompts';
export { default as dermatologyPrompts } from './dermatology-prompts';

export * from './physiology-prompts';
export { default as physiologyPrompts } from './physiology-prompts';

export * from './biochemistry-prompts';
export { default as biochemistryPrompts } from './biochemistry-prompts';

export * from './pharmacology-prompts';
export { default as pharmacologyPrompts } from './pharmacology-prompts';

export * from './rheumatology-prompts';
export { default as rheumatologyPrompts } from './rheumatology-prompts';

export * from './biology-prompts';
export { default as biologyPrompts } from './biology-prompts';

export * from './cell-biology-prompts';
export { default as cellBiologyPrompts } from './cell-biology-prompts';

export * from './psychiatry-prompts';
export { default as psychiatryPrompts } from './psychiatry-prompts';

export * from './computer-science-prompts';
export { default as computerSciencePrompts } from './computer-science-prompts';

export * from './engineering-prompts';
export { default as engineeringPrompts } from './engineering-prompts';

export * from './molecular-biology-prompts';
export { default as molecularBiologyPrompts } from './molecular-biology-prompts';

export * from './mathematics-prompts';
export { default as mathematicsPrompts } from './mathematics-prompts';

export * from './neuroscience-prompts';
export { default as neurosciencePrompts } from './neuroscience-prompts';

export * from './biomedical-engineering-prompts';
export { default as biomedicalEngineeringPrompts } from './biomedical-engineering-prompts';

export * from './microbiology-prompts';
export { default as microbiologyPrompts } from './microbiology-prompts';

export * from './anatomy-prompts';
export { default as anatomyPrompts } from './anatomy-prompts';

export * from './physics-prompts';
export { default as physicsPrompts } from './physics-prompts';

export * from './chemistry-prompts';
export { default as chemistryPrompts } from './chemistry-prompts';

export * from './obgyn-prompts';
export { default as obgynPrompts } from './obgyn-prompts';

export * from './cardiology-prompts';
export { default as cardiologyPrompts } from './cardiology-prompts';

export * from './aerospace-prompts';
export { default as aerospacePrompts } from './aerospace-prompts';

export * from './agriculture-prompts';
export { default as agriculturePrompts } from './agriculture-prompts';

export * from './forensics-prompts';
export { default as forensicsPrompts } from './forensics-prompts';

export * from './geology-prompts';
export { default as geologyPrompts } from './geology-prompts';

export * from './astronomy-prompts';
export { default as astronomyPrompts } from './astronomy-prompts';

export * from './ecology-prompts';
export { default as ecologyPrompts } from './ecology-prompts';

export * from './meteorology-prompts';
export { default as meteorologyPrompts } from './meteorology-prompts';

export * from './oceanography-prompts';
export { default as oceanographyPrompts } from './oceanography-prompts';

export * from './botany-prompts';
export { default as botanyPrompts } from './botany-prompts';

export * from './zoology-prompts';
export { default as zoologyPrompts } from './zoology-prompts';
