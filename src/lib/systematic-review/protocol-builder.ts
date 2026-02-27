/**
 * Systematic Review Protocol Builder
 *
 * Generates a structured protocol following PROSPERO template sections
 * using AI, pre-filled from existing project configuration (PICO,
 * search strategy, screening criteria, etc.).
 */

import { generateObject } from "ai";
import { getModel } from "@/lib/ai/models";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  systematicReviewConfig,
  screeningCriteria,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProtocolSection {
  id: string;
  title: string;
  content: string;
  guidance: string;
}

export interface Protocol {
  title: string;
  sections: ProtocolSection[];
  generatedAt: string;
  prosperoId?: string;
}

export interface ProtocolInput {
  projectTitle: string;
  pico?: {
    population?: string;
    intervention?: string;
    comparison?: string;
    outcome?: string;
  } | null;
  searchStrategy?: {
    pubmedQuery?: string;
    databases?: string[];
  } | null;
  criteria?: Array<{
    type: string;
    description: string;
  }>;
  additionalContext?: string;
}

// ---------------------------------------------------------------------------
// PROSPERO template sections
// ---------------------------------------------------------------------------

const PROSPERO_SECTIONS = [
  {
    id: "review_title",
    title: "Review Title",
    guidance:
      "Provide a concise title that clearly indicates the topic. Include study design if applicable.",
  },
  {
    id: "background",
    title: "Background / Rationale",
    guidance:
      "Describe the rationale for the review in the context of what is already known. Include the condition/problem, current evidence, and why this review is needed.",
  },
  {
    id: "objectives",
    title: "Review Objectives",
    guidance:
      "Provide an explicit statement of the question(s) the review will address, using the PICO framework.",
  },
  {
    id: "search_strategy",
    title: "Search Strategy",
    guidance:
      "Present the planned search strategy for at least one major database. Include databases to be searched, key search terms, and any limits/filters.",
  },
  {
    id: "eligibility_criteria",
    title: "Eligibility Criteria",
    guidance:
      "Specify inclusion and exclusion criteria. State the study designs to be included, population, intervention/exposure, comparators, and outcomes.",
  },
  {
    id: "population",
    title: "Population",
    guidance:
      "Define the population or participants in studies to be included. State any restrictions on age, sex, geographic location, etc.",
  },
  {
    id: "intervention",
    title: "Intervention / Exposure",
    guidance:
      "Define the intervention(s) or exposure(s) to be studied. Include dose, duration, timing, and delivery method if applicable.",
  },
  {
    id: "comparator",
    title: "Comparator / Control",
    guidance:
      "Define the comparator(s) or control group(s). This could be placebo, no treatment, usual care, or an alternative intervention.",
  },
  {
    id: "outcomes",
    title: "Outcomes",
    guidance:
      "List primary and secondary outcomes. Include how and when outcomes will be measured.",
  },
  {
    id: "data_extraction",
    title: "Data Extraction",
    guidance:
      "Describe the methods for data extraction. Include what data items will be extracted, how many reviewers will extract data, and how discrepancies will be resolved.",
  },
  {
    id: "risk_of_bias",
    title: "Risk of Bias Assessment",
    guidance:
      "Describe the tool(s) to be used for risk of bias assessment (e.g., RoB 2, ROBINS-I, Newcastle-Ottawa). State how many reviewers will assess each study.",
  },
  {
    id: "synthesis",
    title: "Data Synthesis",
    guidance:
      "Describe the planned method of synthesis. State whether meta-analysis will be performed, statistical methods, heterogeneity assessment, and sensitivity/subgroup analyses planned.",
  },
  {
    id: "confidence",
    title: "Certainty of Evidence",
    guidance:
      "Describe how the certainty/quality of evidence will be assessed (e.g., GRADE approach).",
  },
  {
    id: "dissemination",
    title: "Dissemination Plans",
    guidance:
      "Describe how the review findings will be disseminated (publication, presentations, etc.).",
  },
  {
    id: "timeline",
    title: "Timeline",
    guidance:
      "Provide anticipated dates for the review: protocol registration, search completion, data extraction, analysis, and manuscript submission.",
  },
  {
    id: "funding",
    title: "Funding / Conflicts of Interest",
    guidance:
      "Declare sources of funding and any potential conflicts of interest of the review team.",
  },
];

// ---------------------------------------------------------------------------
// AI protocol generation
// ---------------------------------------------------------------------------

const protocolSectionSchema = z.object({
  sections: z.array(
    z.object({
      id: z.string(),
      content: z.string(),
    })
  ),
});

/**
 * Generate a complete protocol from project configuration.
 * Processes sections in two batches to stay within token limits.
 */
export async function generateProtocol(
  input: ProtocolInput
): Promise<Protocol> {
  const sections: ProtocolSection[] = [];
  const halfIdx = Math.ceil(PROSPERO_SECTIONS.length / 2);
  const batches = [
    PROSPERO_SECTIONS.slice(0, halfIdx),
    PROSPERO_SECTIONS.slice(halfIdx),
  ];

  for (const batch of batches) {
    const sectionPrompts = batch
      .map(
        (s) =>
          `Section "${s.id}" (${s.title}): ${s.guidance}`
      )
      .join("\n\n");

    const { object } = await generateObject({
      model: getModel(),
      schema: protocolSectionSchema,
      prompt: `You are an expert systematic review methodologist. Generate detailed content for each protocol section below based on the project information provided.

Write in formal academic style suitable for PROSPERO registration. Each section should be thorough but concise (2-4 paragraphs). Use the project details to pre-fill content where available, and provide sensible defaults with [PLACEHOLDER] markers where information is missing.

PROJECT INFORMATION:
Title: ${input.projectTitle}
${input.pico ? `
PICO:
- Population: ${input.pico.population || "[Not specified]"}
- Intervention: ${input.pico.intervention || "[Not specified]"}
- Comparison: ${input.pico.comparison || "[Not specified]"}
- Outcome: ${input.pico.outcome || "[Not specified]"}` : "PICO: [Not yet defined]"}
${input.searchStrategy ? `
Search Strategy:
- Databases: ${input.searchStrategy.databases?.join(", ") || "PubMed"}
- Query: ${input.searchStrategy.pubmedQuery || "[Not yet generated]"}` : ""}
${input.criteria && input.criteria.length > 0 ? `
Eligibility Criteria:
${input.criteria.map((c) => `- ${c.type}: ${c.description}`).join("\n")}` : ""}
${input.additionalContext ? `\nAdditional Context: ${input.additionalContext}` : ""}

SECTIONS TO GENERATE:
${sectionPrompts}

Generate content for each section ID listed above.`,
    });

    for (const result of object.sections) {
      const template = batch.find((s) => s.id === result.id);
      if (!template) continue;
      sections.push({
        id: result.id,
        title: template.title,
        content: result.content,
        guidance: template.guidance,
      });
    }
  }

  // Fill in any missing sections
  for (const template of PROSPERO_SECTIONS) {
    if (!sections.find((s) => s.id === template.id)) {
      sections.push({
        id: template.id,
        title: template.title,
        content: "[This section requires manual input]",
        guidance: template.guidance,
      });
    }
  }

  // Sort by template order
  sections.sort(
    (a, b) =>
      PROSPERO_SECTIONS.findIndex((t) => t.id === a.id) -
      PROSPERO_SECTIONS.findIndex((t) => t.id === b.id)
  );

  return {
    title: input.projectTitle,
    sections,
    generatedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Load project data for protocol generation
// ---------------------------------------------------------------------------

export async function loadProjectDataForProtocol(
  projectId: number
): Promise<ProtocolInput> {
  // Load SR config
  const [config] = await db
    .select()
    .from(systematicReviewConfig)
    .where(eq(systematicReviewConfig.projectId, projectId));

  // Load criteria
  const criteria = await db
    .select()
    .from(screeningCriteria)
    .where(eq(screeningCriteria.projectId, projectId));

  const pico = config?.pico as ProtocolInput["pico"];
  const strategy = config?.searchStrategy as ProtocolInput["searchStrategy"];

  return {
    projectTitle: "Systematic Review Protocol",
    pico: pico || null,
    searchStrategy: strategy || null,
    criteria: criteria.map((c) => ({
      type: c.criterionType || "inclusion",
      description: c.description,
    })),
  };
}

// ---------------------------------------------------------------------------
// Export protocol as plain text (PROSPERO-compatible)
// ---------------------------------------------------------------------------

export function exportProtocolText(protocol: Protocol): string {
  const lines: string[] = [];

  lines.push("SYSTEMATIC REVIEW PROTOCOL");
  lines.push("=".repeat(60));
  lines.push("");
  lines.push(`Title: ${protocol.title}`);
  lines.push(`Generated: ${new Date(protocol.generatedAt).toLocaleDateString()}`);
  if (protocol.prosperoId) {
    lines.push(`PROSPERO ID: ${protocol.prosperoId}`);
  }
  lines.push("");
  lines.push("=".repeat(60));
  lines.push("");

  for (const section of protocol.sections) {
    lines.push(section.title.toUpperCase());
    lines.push("-".repeat(section.title.length));
    lines.push("");
    lines.push(section.content);
    lines.push("");
    lines.push("");
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Export protocol as HTML (for DOCX conversion)
// ---------------------------------------------------------------------------

export function exportProtocolHTML(protocol: Protocol): string {
  const sectionHTML = protocol.sections
    .map(
      (s) => `
    <h2>${escapeHtml(s.title)}</h2>
    ${s.content
      .split("\n\n")
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("\n")}`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(protocol.title)} — Protocol</title>
  <style>
    body { font-family: "Times New Roman", serif; max-width: 800px; margin: 40px auto; line-height: 1.6; color: #333; }
    h1 { text-align: center; font-size: 18pt; margin-bottom: 4px; }
    .meta { text-align: center; color: #666; font-size: 10pt; margin-bottom: 30px; }
    h2 { font-size: 13pt; margin-top: 24px; margin-bottom: 8px; border-bottom: 1px solid #ccc; padding-bottom: 4px; }
    p { font-size: 11pt; margin: 8px 0; text-align: justify; }
  </style>
</head>
<body>
  <h1>${escapeHtml(protocol.title)}</h1>
  <div class="meta">
    Generated: ${new Date(protocol.generatedAt).toLocaleDateString()}
    ${protocol.prosperoId ? `<br>PROSPERO ID: ${escapeHtml(protocol.prosperoId)}` : ""}
  </div>
  ${sectionHTML}
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------------------------------------------------------------------------
// PROSPERO mandatory field registration helper
// ---------------------------------------------------------------------------

export interface PROSPEROField {
  fieldNumber: number;
  fieldName: string;
  value: string;
  source: "auto" | "manual"; // auto = populated from project data, manual = needs user input
  required: boolean;
}

/**
 * Generate the 22 mandatory PROSPERO fields, auto-populating from project
 * configuration where possible and marking the rest as manual-entry required.
 */
export async function generatePROSPEROFields(
  projectId: number
): Promise<PROSPEROField[]> {
  // Load SR config
  const [config] = await db
    .select()
    .from(systematicReviewConfig)
    .where(eq(systematicReviewConfig.projectId, projectId));

  // Load the project title from projects table
  const { projects } = await import("@/lib/db/schema");
  const [project] = await db
    .select({ title: projects.title })
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1);

  const pico = config?.pico as ProtocolInput["pico"] | undefined;
  const strategy = config?.searchStrategy as
    | { pubmedQuery?: string; databases?: string[]; fullSearchString?: string }
    | undefined;
  const databases =
    (config?.searchDatabases as string[] | undefined) ??
    strategy?.databases ??
    [];
  const searchDateStr = config?.searchDate
    ? config.searchDate.toISOString().split("T")[0]
    : "";
  const searchQuery =
    strategy?.pubmedQuery ?? strategy?.fullSearchString ?? "";
  const dbList =
    databases.length > 0 ? databases.join(", ") : "PubMed, EMBASE, Cochrane Library";

  // Build review question from PICO
  let reviewQuestion = "";
  if (pico) {
    const parts: string[] = [];
    if (pico.population) parts.push(`In ${pico.population}`);
    if (pico.intervention) parts.push(`does ${pico.intervention}`);
    if (pico.comparison) parts.push(`compared with ${pico.comparison}`);
    if (pico.outcome) parts.push(`affect ${pico.outcome}`);
    reviewQuestion = parts.join(", ");
    if (reviewQuestion && !reviewQuestion.endsWith("?")) reviewQuestion += "?";
  }

  // Build searches field
  let searchesField = "";
  if (dbList) searchesField += `Databases: ${dbList}.`;
  if (searchDateStr) searchesField += ` Search date: ${searchDateStr}.`;
  if (searchQuery) searchesField += `\n\nSearch query (PubMed): ${searchQuery}`;

  // Condition/domain from PICO population + intervention
  let condition = "";
  if (pico?.population && pico?.intervention) {
    condition = `${pico.intervention} in ${pico.population}`;
  } else if (pico?.population) {
    condition = pico.population;
  } else if (pico?.intervention) {
    condition = pico.intervention;
  }

  const prosperoId = config?.protocolRegistration ?? "";

  const fields: PROSPEROField[] = [
    {
      fieldNumber: 1,
      fieldName: "Review title",
      value: project?.title ?? "",
      source: project?.title ? "auto" : "manual",
      required: true,
    },
    {
      fieldNumber: 2,
      fieldName: "Original language title",
      value: project?.title ?? "",
      source: project?.title ? "auto" : "manual",
      required: true,
    },
    {
      fieldNumber: 3,
      fieldName: "Anticipated or actual start date",
      value: config?.createdAt
        ? config.createdAt.toISOString().split("T")[0]
        : "",
      source: config?.createdAt ? "auto" : "manual",
      required: true,
    },
    {
      fieldNumber: 4,
      fieldName: "Anticipated completion date",
      value: "",
      source: "manual",
      required: true,
    },
    {
      fieldNumber: 5,
      fieldName: "Stage of review",
      value: config?.reviewStage
        ? config.reviewStage.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "",
      source: config?.reviewStage ? "auto" : "manual",
      required: true,
    },
    {
      fieldNumber: 6,
      fieldName: "Named contact",
      value: "",
      source: "manual",
      required: true,
    },
    {
      fieldNumber: 7,
      fieldName: "Named contact email",
      value: "",
      source: "manual",
      required: true,
    },
    {
      fieldNumber: 8,
      fieldName: "Named contact address",
      value: "",
      source: "manual",
      required: true,
    },
    {
      fieldNumber: 9,
      fieldName: "Named contact phone",
      value: "",
      source: "manual",
      required: true,
    },
    {
      fieldNumber: 10,
      fieldName: "Organisational affiliation",
      value: "",
      source: "manual",
      required: true,
    },
    {
      fieldNumber: 11,
      fieldName: "Review team members and affiliations",
      value: "",
      source: "manual",
      required: true,
    },
    {
      fieldNumber: 12,
      fieldName: "Funding sources/sponsors",
      value: "",
      source: "manual",
      required: true,
    },
    {
      fieldNumber: 13,
      fieldName: "Conflicts of interest",
      value: "",
      source: "manual",
      required: true,
    },
    {
      fieldNumber: 14,
      fieldName: "Collaborators",
      value: "",
      source: "manual",
      required: true,
    },
    {
      fieldNumber: 15,
      fieldName: "Review question",
      value: reviewQuestion,
      source: reviewQuestion ? "auto" : "manual",
      required: true,
    },
    {
      fieldNumber: 16,
      fieldName: "Searches (databases, date range)",
      value: searchesField,
      source: searchesField ? "auto" : "manual",
      required: true,
    },
    {
      fieldNumber: 17,
      fieldName: "URL to search strategy",
      value: prosperoId ? `https://www.crd.york.ac.uk/prospero/display_record.php?RecordID=${prosperoId.replace(/\D/g, "")}` : "",
      source: prosperoId ? "auto" : "manual",
      required: true,
    },
    {
      fieldNumber: 18,
      fieldName: "Condition or domain being studied",
      value: condition,
      source: condition ? "auto" : "manual",
      required: true,
    },
    {
      fieldNumber: 19,
      fieldName: "Participants/population",
      value: pico?.population ?? "",
      source: pico?.population ? "auto" : "manual",
      required: true,
    },
    {
      fieldNumber: 20,
      fieldName: "Intervention(s), exposure(s)",
      value: pico?.intervention ?? "",
      source: pico?.intervention ? "auto" : "manual",
      required: true,
    },
    {
      fieldNumber: 21,
      fieldName: "Comparator(s)/control",
      value: pico?.comparison ?? "",
      source: pico?.comparison ? "auto" : "manual",
      required: true,
    },
    {
      fieldNumber: 22,
      fieldName: "Main outcome(s)",
      value: pico?.outcome ?? "",
      source: pico?.outcome ? "auto" : "manual",
      required: true,
    },
  ];

  return fields;
}

/**
 * Export PROSPERO fields as formatted plain text for pasting into the
 * PROSPERO web form.
 */
export function exportPROSPEROText(fields: PROSPEROField[]): string {
  const lines: string[] = [];
  lines.push("PROSPERO REGISTRATION — MANDATORY FIELDS");
  lines.push("=".repeat(60));
  lines.push("");

  for (const field of fields) {
    lines.push(`${field.fieldNumber}. ${field.fieldName}`);
    lines.push("-".repeat(field.fieldName.length + 4));
    lines.push(field.value || "[REQUIRED — please fill in]");
    lines.push("");
  }

  return lines.join("\n");
}
