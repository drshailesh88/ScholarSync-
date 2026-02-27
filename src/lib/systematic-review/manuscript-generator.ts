/**
 * Systematic Review Manuscript Draft Generator
 *
 * Generates IMRAD-structured manuscript sections using AI,
 * pre-filled from project data (PICO, screening, meta-analysis, RoB 2, etc.).
 */

import { generateText } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import { db } from "@/lib/db";
import {
  systematicReviewConfig,
  screeningCriteria,
  screeningDecisions,
  prismaFlow,
  riskOfBias,
  metaAnalysisResults,
  papers,
} from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ManuscriptSection =
  | "introduction"
  | "methods"
  | "results"
  | "discussion"
  | "abstract";

export interface ManuscriptSectionOutput {
  section: ManuscriptSection;
  content: string;
  citations: { key: string; paperId: number; formatted: string }[];
}

export interface ManuscriptProjectData {
  projectTitle: string;
  pico: {
    population?: string;
    intervention?: string;
    comparison?: string;
    outcome?: string;
  } | null;
  searchStrategy: {
    pubmedQuery?: string;
    databases?: string[];
  } | null;
  searchDate: string | null;
  criteria: { type: string; description: string }[];
  prismaStages: {
    stage: string;
    source: string | null;
    recordCount: number;
    excludedCount: number;
    exclusionReasons: unknown;
  }[];
  screeningSummary: {
    total: number;
    included: number;
    excluded: number;
  };
  robSummary: {
    paperId: number;
    overallJudgment: string;
    domainCount: number;
  }[];
  metaResults: {
    analysisName: string | null;
    outcomeMeasure: string | null;
    effectModel: string | null;
    pooledEffect: number | null;
    pooledCiLower: number | null;
    pooledCiUpper: number | null;
    heterogeneityI2: number | null;
    heterogeneityP: number | null;
  }[];
  includedPaperCount: number;
}

// ---------------------------------------------------------------------------
// Load all project data needed for manuscript generation
// ---------------------------------------------------------------------------

export async function getProjectDataForManuscript(
  projectId: number
): Promise<ManuscriptProjectData> {
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

  // Load PRISMA flow stages
  const prismaStages = await db
    .select()
    .from(prismaFlow)
    .where(eq(prismaFlow.projectId, projectId));

  // Load screening summary (aggregate counts)
  const decisions = await db
    .select({
      decision: screeningDecisions.decision,
      count: sql<number>`count(*)`.as("count"),
    })
    .from(screeningDecisions)
    .where(eq(screeningDecisions.projectId, projectId))
    .groupBy(screeningDecisions.decision);

  const total = decisions.reduce((s, d) => s + Number(d.count), 0);
  const included =
    decisions.find((d) => d.decision === "include")?.count ?? 0;
  const excluded =
    decisions.find((d) => d.decision === "exclude")?.count ?? 0;

  // Load RoB 2 summary
  const robRows = await db
    .select()
    .from(riskOfBias)
    .where(eq(riskOfBias.projectId, projectId));

  const robByPaper = new Map<
    number,
    { judgments: string[]; domainCount: number }
  >();
  for (const r of robRows) {
    const existing = robByPaper.get(r.paperId) || {
      judgments: [],
      domainCount: 0,
    };
    existing.judgments.push(r.judgment || "low");
    existing.domainCount++;
    robByPaper.set(r.paperId, existing);
  }

  const robSummary = Array.from(robByPaper.entries()).map(
    ([paperId, data]) => {
      let overall = "low";
      if (data.judgments.includes("high")) overall = "high";
      else if (data.judgments.includes("some_concerns"))
        overall = "some_concerns";
      return { paperId, overallJudgment: overall, domainCount: data.domainCount };
    }
  );

  // Load meta-analysis results
  const metaResults = await db
    .select({
      analysisName: metaAnalysisResults.analysisName,
      outcomeMeasure: metaAnalysisResults.outcomeMeasure,
      effectModel: metaAnalysisResults.effectModel,
      pooledEffect: metaAnalysisResults.pooledEffect,
      pooledCiLower: metaAnalysisResults.pooledCiLower,
      pooledCiUpper: metaAnalysisResults.pooledCiUpper,
      heterogeneityI2: metaAnalysisResults.heterogeneityI2,
      heterogeneityP: metaAnalysisResults.heterogeneityP,
    })
    .from(metaAnalysisResults)
    .where(eq(metaAnalysisResults.projectId, projectId));

  // Count included papers
  const [paperCount] = await db
    .select({ count: sql<number>`count(distinct ${screeningDecisions.paperId})` })
    .from(screeningDecisions)
    .where(
      and(
        eq(screeningDecisions.projectId, projectId),
        eq(screeningDecisions.decision, "include")
      )
    );

  const pico = config?.pico as ManuscriptProjectData["pico"];
  const strategy =
    config?.searchStrategy as ManuscriptProjectData["searchStrategy"];

  return {
    projectTitle: "Systematic Review",
    pico: pico || null,
    searchStrategy: strategy || null,
    searchDate: config?.searchDate
      ? new Date(config.searchDate).toISOString().split("T")[0]
      : null,
    criteria: criteria.map((c) => ({
      type: c.criterionType || "inclusion",
      description: c.description,
    })),
    prismaStages: prismaStages.map((s) => ({
      stage: s.stage,
      source: s.source,
      recordCount: s.recordCount ?? 0,
      excludedCount: s.excludedCount ?? 0,
      exclusionReasons: s.exclusionReasons,
    })),
    screeningSummary: {
      total,
      included: Number(included),
      excluded: Number(excluded),
    },
    robSummary,
    metaResults,
    includedPaperCount: Number(paperCount?.count ?? 0),
  };
}

// ---------------------------------------------------------------------------
// Section-specific prompt builders
// ---------------------------------------------------------------------------

function buildIntroductionPrompt(data: ManuscriptProjectData): string {
  return `You are an expert academic writer drafting the INTRODUCTION section of a systematic review manuscript.

PROJECT DATA:
Title: ${data.projectTitle}
${data.pico ? `PICO:
- Population: ${data.pico.population || "[Not specified]"}
- Intervention: ${data.pico.intervention || "[Not specified]"}
- Comparison: ${data.pico.comparison || "[Not specified]"}
- Outcome: ${data.pico.outcome || "[Not specified]"}` : "PICO: [Not yet defined]"}
${data.searchStrategy?.pubmedQuery ? `Search Query: ${data.searchStrategy.pubmedQuery}` : ""}

Write a formal academic Introduction section (3-5 paragraphs) that:
1. Establishes the clinical/research context and significance
2. Summarizes current state of knowledge
3. Identifies the gap that motivates this review
4. States the review objectives using the PICO framework
5. Ends with a clear statement of the review question

Use [PLACEHOLDER] markers where specific references or facts need to be filled in.
Write in third person, past/present tense as appropriate for academic writing.`;
}

function buildMethodsPrompt(data: ManuscriptProjectData): string {
  const dbList =
    data.searchStrategy?.databases?.join(", ") || "PubMed";
  const criteriaText = data.criteria.length
    ? data.criteria
        .map((c) => `  - ${c.type}: ${c.description}`)
        .join("\n")
    : "  [No criteria defined yet]";

  return `You are an expert academic writer drafting the METHODS section of a systematic review manuscript following PRISMA 2020 guidelines.

PROJECT DATA:
Title: ${data.projectTitle}
${data.pico ? `PICO:
- Population: ${data.pico.population || "[Not specified]"}
- Intervention: ${data.pico.intervention || "[Not specified]"}
- Comparison: ${data.pico.comparison || "[Not specified]"}
- Outcome: ${data.pico.outcome || "[Not specified]"}` : ""}
Databases searched: ${dbList}
Search date: ${data.searchDate || "[Not specified]"}
${data.searchStrategy?.pubmedQuery ? `Search query: ${data.searchStrategy.pubmedQuery}` : ""}
Eligibility criteria:
${criteriaText}
Number of included studies: ${data.includedPaperCount}
${data.metaResults.length > 0 ? `Meta-analysis model: ${data.metaResults[0].effectModel || "random"}` : ""}

Write a formal academic Methods section (4-6 paragraphs) covering:
1. Protocol and registration (reference PROSPERO if applicable)
2. Eligibility criteria (inclusion/exclusion)
3. Information sources and search strategy
4. Study selection process (screening stages)
5. Data extraction process
6. Risk of bias assessment (RoB 2 tool)
7. Data synthesis and statistical methods (if meta-analysis was performed)

Use [PLACEHOLDER] markers where specific details are needed.`;
}

function buildResultsPrompt(data: ManuscriptProjectData): string {
  const prismaText = data.prismaStages.length
    ? data.prismaStages
        .map(
          (s) =>
            `  ${s.stage}: ${s.recordCount} records${s.excludedCount ? `, ${s.excludedCount} excluded` : ""}`
        )
        .join("\n")
    : "  [No PRISMA data available]";

  const robText = data.robSummary.length
    ? `${data.robSummary.filter((r) => r.overallJudgment === "low").length} low risk, ${data.robSummary.filter((r) => r.overallJudgment === "some_concerns").length} some concerns, ${data.robSummary.filter((r) => r.overallJudgment === "high").length} high risk`
    : "[No RoB assessments yet]";

  const metaText = data.metaResults.length
    ? data.metaResults
        .map(
          (m) =>
            `  ${m.analysisName || "Primary"}: pooled effect = ${m.pooledEffect?.toFixed(2) ?? "N/A"} (95% CI: ${m.pooledCiLower?.toFixed(2) ?? "N/A"} to ${m.pooledCiUpper?.toFixed(2) ?? "N/A"}), I2 = ${m.heterogeneityI2 != null ? (m.heterogeneityI2 * 100).toFixed(1) + "%" : "N/A"}`
        )
        .join("\n")
    : "  [No meta-analysis results]";

  return `You are an expert academic writer drafting the RESULTS section of a systematic review manuscript.

PROJECT DATA:
Title: ${data.projectTitle}
PRISMA Flow:
${prismaText}
Screening summary: ${data.screeningSummary.total} total screened, ${data.screeningSummary.included} included, ${data.screeningSummary.excluded} excluded
Risk of Bias summary: ${robText} (${data.robSummary.length} studies assessed)
Meta-analysis results:
${metaText}
Included studies: ${data.includedPaperCount}

Write a formal academic Results section (4-6 paragraphs) covering:
1. Study selection (PRISMA flow narrative)
2. Study characteristics (general summary)
3. Risk of bias across studies
4. Results of individual studies and synthesis
5. Meta-analysis results with effect sizes and heterogeneity (if available)
6. Publication bias assessment (if applicable)

Use actual numbers from the data provided. Use [PLACEHOLDER] for details not available.`;
}

function buildDiscussionPrompt(data: ManuscriptProjectData): string {
  const metaText = data.metaResults.length
    ? data.metaResults
        .map(
          (m) =>
            `${m.analysisName || "Primary"}: effect = ${m.pooledEffect?.toFixed(2) ?? "N/A"}, I2 = ${m.heterogeneityI2 != null ? (m.heterogeneityI2 * 100).toFixed(1) + "%" : "N/A"}`
        )
        .join("; ")
    : "[No meta-analysis]";

  return `You are an expert academic writer drafting the DISCUSSION section of a systematic review manuscript.

PROJECT DATA:
Title: ${data.projectTitle}
${data.pico ? `PICO:
- Population: ${data.pico.population || "[Not specified]"}
- Intervention: ${data.pico.intervention || "[Not specified]"}
- Comparison: ${data.pico.comparison || "[Not specified]"}
- Outcome: ${data.pico.outcome || "[Not specified]"}` : ""}
Included studies: ${data.includedPaperCount}
Meta-analysis findings: ${metaText}
Risk of bias: ${data.robSummary.length} studies assessed

Write a formal academic Discussion section (4-6 paragraphs) covering:
1. Summary of main findings in context of the review question
2. Comparison with existing literature and previous reviews
3. Strengths of this review (methodology, comprehensiveness)
4. Limitations (of evidence and of the review process)
5. Implications for practice and future research
6. Concluding statement

Use [PLACEHOLDER] markers for specific references and comparisons that need manual verification.`;
}

function buildAbstractPrompt(
  data: ManuscriptProjectData,
  existingSections?: Record<string, string>
): string {
  const sectionsContext = existingSections
    ? Object.entries(existingSections)
        .map(([k, v]) => `${k.toUpperCase()} (excerpt):\n${v.slice(0, 500)}`)
        .join("\n\n")
    : "";

  return `You are an expert academic writer drafting a STRUCTURED ABSTRACT for a systematic review manuscript.

PROJECT DATA:
Title: ${data.projectTitle}
${data.pico ? `PICO:
- Population: ${data.pico.population || "[Not specified]"}
- Intervention: ${data.pico.intervention || "[Not specified]"}
- Comparison: ${data.pico.comparison || "[Not specified]"}
- Outcome: ${data.pico.outcome || "[Not specified]"}` : ""}
Included studies: ${data.includedPaperCount}
Screening: ${data.screeningSummary.total} screened, ${data.screeningSummary.included} included
${data.metaResults.length > 0 ? `Primary meta-analysis: effect = ${data.metaResults[0].pooledEffect?.toFixed(2) ?? "N/A"} (95% CI: ${data.metaResults[0].pooledCiLower?.toFixed(2) ?? "N/A"} to ${data.metaResults[0].pooledCiUpper?.toFixed(2) ?? "N/A"})` : ""}
${sectionsContext ? `\nEXISTING SECTION CONTENT:\n${sectionsContext}` : ""}

Write a structured abstract (250-300 words) with the following headings:
- Background
- Objectives
- Methods
- Results
- Conclusions

Use actual numbers where available. Use [PLACEHOLDER] where data is missing.`;
}

// ---------------------------------------------------------------------------
// Generate a single manuscript section
// ---------------------------------------------------------------------------

export async function generateManuscriptSection(
  projectId: number,
  section: ManuscriptSection,
  options?: { customInstructions?: string; existingSections?: Record<string, string> }
): Promise<ManuscriptSectionOutput> {
  const data = await getProjectDataForManuscript(projectId);

  let prompt: string;
  switch (section) {
    case "introduction":
      prompt = buildIntroductionPrompt(data);
      break;
    case "methods":
      prompt = buildMethodsPrompt(data);
      break;
    case "results":
      prompt = buildResultsPrompt(data);
      break;
    case "discussion":
      prompt = buildDiscussionPrompt(data);
      break;
    case "abstract":
      prompt = buildAbstractPrompt(data, options?.existingSections);
      break;
  }

  if (options?.customInstructions) {
    prompt += `\n\nADDITIONAL INSTRUCTIONS FROM THE USER:\n${options.customInstructions}`;
  }

  const { text } = await generateText({
    model: getSmallModel(),
    prompt,
  });

  return {
    section,
    content: text,
    citations: [], // citations are placeholders — user fills in during editing
  };
}

// ---------------------------------------------------------------------------
// Export combined manuscript draft as markdown
// ---------------------------------------------------------------------------

export function exportManuscriptDraft(
  sections: ManuscriptSectionOutput[]
): string {
  const sectionOrder: ManuscriptSection[] = [
    "abstract",
    "introduction",
    "methods",
    "results",
    "discussion",
  ];

  const sectionTitles: Record<ManuscriptSection, string> = {
    abstract: "Abstract",
    introduction: "Introduction",
    methods: "Methods",
    results: "Results",
    discussion: "Discussion",
  };

  // Sort sections by IMRAD order
  const sorted = [...sections].sort(
    (a, b) => sectionOrder.indexOf(a.section) - sectionOrder.indexOf(b.section)
  );

  const lines: string[] = [];
  lines.push("# Systematic Review Manuscript Draft");
  lines.push("");
  lines.push(
    `*Generated on ${new Date().toLocaleDateString()} — AI-assisted draft requiring human review and editing.*`
  );
  lines.push("");
  lines.push("---");
  lines.push("");

  for (const s of sorted) {
    lines.push(`## ${sectionTitles[s.section]}`);
    lines.push("");
    lines.push(s.content);
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  lines.push(
    "*Note: [PLACEHOLDER] markers indicate areas requiring manual input. All content should be verified for accuracy before submission.*"
  );

  return lines.join("\n");
}
