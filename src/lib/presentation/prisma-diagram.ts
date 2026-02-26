// =============================================================================
// PRISMA 2020 Flow Diagram Generator
// Generates Mermaid flowchart syntax following the PRISMA 2020 standard
// =============================================================================

export interface PrismaFlowData {
  // Identification
  databaseRecords: number; // Records from database searching
  registerRecords: number; // Records from registers
  otherSourceRecords: number; // Records from other sources

  // Screening
  duplicatesRemoved: number;
  recordsScreened: number;
  recordsExcluded: number;

  // Eligibility
  fullTextAssessed: number;
  fullTextExcluded: number;
  fullTextExclusionReasons: { reason: string; count: number }[];

  // Included
  studiesIncluded: number;
  reportsIncluded: number;
}

/** Default empty PRISMA data for form initialization */
export function createEmptyPrismaData(): PrismaFlowData {
  return {
    databaseRecords: 0,
    registerRecords: 0,
    otherSourceRecords: 0,
    duplicatesRemoved: 0,
    recordsScreened: 0,
    recordsExcluded: 0,
    fullTextAssessed: 0,
    fullTextExcluded: 0,
    fullTextExclusionReasons: [],
    studiesIncluded: 0,
    reportsIncluded: 0,
  };
}

/**
 * Generates a Mermaid flowchart that follows the PRISMA 2020 standard.
 * Uses graph TD (top-down) layout with all 4 phases:
 * Identification, Screening, Eligibility, Included.
 */
export function generatePrismaMermaid(data: PrismaFlowData): string {
  const totalIdentified =
    data.databaseRecords + data.registerRecords + data.otherSourceRecords;
  const afterDuplicates = totalIdentified - data.duplicatesRemoved;

  // Build exclusion reasons text for the eligibility box
  let exclusionReasonsText = "";
  if (data.fullTextExclusionReasons.length > 0) {
    const reasonLines = data.fullTextExclusionReasons
      .map((r) => `${r.reason} (n = ${r.count})`)
      .join("<br/>");
    exclusionReasonsText = `<br/>${reasonLines}`;
  }

  const lines = [
    "graph TD",
    "",
    '    subgraph Identification[" Identification"]',
    `        A["Records identified through<br/>database searching<br/>(n = ${data.databaseRecords})"]`,
    `        B["Records identified through<br/>registers and other sources<br/>(n = ${data.registerRecords + data.otherSourceRecords})"]`,
    "    end",
    "",
    '    subgraph Screening[" Screening"]',
    `        C["Records after duplicates removed<br/>(n = ${afterDuplicates})"]`,
    `        D["Records screened<br/>(n = ${data.recordsScreened})"]`,
    `        E["Records excluded<br/>(n = ${data.recordsExcluded})"]`,
    "    end",
    "",
    '    subgraph Eligibility[" Eligibility"]',
    `        F["Full-text articles assessed<br/>for eligibility<br/>(n = ${data.fullTextAssessed})"]`,
    `        G["Full-text articles excluded,<br/>with reasons<br/>(n = ${data.fullTextExcluded})${exclusionReasonsText}"]`,
    "    end",
    "",
    '    subgraph Included[" Included"]',
    `        H["Studies included in<br/>qualitative synthesis<br/>(n = ${data.studiesIncluded})"]`,
    `        I["Studies included in<br/>quantitative synthesis<br/>(meta-analysis)<br/>(n = ${data.reportsIncluded})"]`,
    "    end",
    "",
    "    A --> C",
    "    B --> C",
    "    C --> D",
    "    D --> E",
    "    D --> F",
    "    F --> G",
    "    F --> H",
    "    H --> I",
    "",
    "    style Identification fill:#E0F2FE,stroke:#0284C7,stroke-width:2px",
    "    style Screening fill:#FEF3C7,stroke:#D97706,stroke-width:2px",
    "    style Eligibility fill:#FEE2E2,stroke:#DC2626,stroke-width:2px",
    "    style Included fill:#D1FAE5,stroke:#059669,stroke-width:2px",
  ];

  return lines.join("\n");
}

/**
 * Attempts to extract PRISMA flow data from preprocessed content.
 * This is used by the AI auto-generation pipeline when it detects
 * a systematic review.
 */
export function extractPrismaFromText(text: string): Partial<PrismaFlowData> {
  const partial: Partial<PrismaFlowData> = {};

  // Common patterns in systematic review text
  const patterns: { key: keyof PrismaFlowData; regex: RegExp }[] = [
    {
      key: "databaseRecords",
      regex:
        /(?:records?\s+identified\s+(?:through|from)\s+(?:database|electronic)\s+search(?:ing|es)?)[^\d]*(\d[\d,]*)/i,
    },
    {
      key: "duplicatesRemoved",
      regex:
        /(?:duplicates?\s+removed|removed\s+(?:as\s+)?duplicates?)[^\d]*(\d[\d,]*)/i,
    },
    {
      key: "recordsScreened",
      regex: /(?:records?\s+screened)[^\d]*(\d[\d,]*)/i,
    },
    {
      key: "recordsExcluded",
      regex:
        /(?:records?\s+excluded|excluded\s+(?:after|at)\s+(?:title|abstract)\s+screen(?:ing)?)[^\d]*(\d[\d,]*)/i,
    },
    {
      key: "fullTextAssessed",
      regex:
        /(?:full[- ]?text\s+(?:articles?\s+)?assessed)[^\d]*(\d[\d,]*)/i,
    },
    {
      key: "fullTextExcluded",
      regex:
        /(?:full[- ]?text\s+(?:articles?\s+)?excluded)[^\d]*(\d[\d,]*)/i,
    },
    {
      key: "studiesIncluded",
      regex:
        /(?:studies?\s+included|included\s+(?:in\s+)?(?:qualitative|final)?\s*(?:synthesis|review|analysis)?)[^\d]*(\d[\d,]*)/i,
    },
    {
      key: "reportsIncluded",
      regex:
        /(?:(?:included\s+in\s+)?(?:quantitative|meta)[- ]?analysis)[^\d]*(\d[\d,]*)/i,
    },
  ];

  for (const { key, regex } of patterns) {
    const match = text.match(regex);
    if (match?.[1]) {
      const val = parseInt(match[1].replace(/,/g, ""), 10);
      if (!isNaN(val)) {
        (partial as Record<string, number>)[key] = val;
      }
    }
  }

  return partial;
}
