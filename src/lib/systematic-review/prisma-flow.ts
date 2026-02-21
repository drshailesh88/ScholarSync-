/**
 * PRISMA 2020 Flow Diagram Generator
 *
 * Automatically generates a PRISMA 2020-compliant flow diagram
 * from actual screening numbers tracked throughout the review.
 *
 * Outputs SVG data that can be rendered client-side or exported as PNG/PDF.
 */

import { db } from "@/lib/db";
import { prismaFlow, screeningDecisions } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PRISMAFlowData {
  identification: {
    databaseResults: number;
    registerResults: number;
    otherSources: number;
    totalIdentified: number;
    duplicatesRemoved: number;
    automationExcluded: number;
    otherReasonsRemoved: number;
  };
  screening: {
    recordsScreened: number;
    recordsExcluded: number;
    exclusionReasons: Record<string, number>;
  };
  eligibility: {
    reportsRetrieved: number;
    reportsNotRetrieved: number;
    reportsAssessed: number;
    reportsExcluded: number;
    exclusionReasons: Record<string, number>;
  };
  included: {
    studiesIncluded: number;
    reportsIncluded: number;
  };
}

// ---------------------------------------------------------------------------
// Compute PRISMA flow data from screening decisions
// ---------------------------------------------------------------------------

export async function computePRISMAFlow(
  projectId: number
): Promise<PRISMAFlowData> {
  // Get all screening decisions for this project
  const decisions = await db
    .select({
      stage: screeningDecisions.stage,
      decision: screeningDecisions.decision,
      reason: screeningDecisions.reason,
      count: sql<number>`count(*)::int`,
    })
    .from(screeningDecisions)
    .where(eq(screeningDecisions.projectId, projectId))
    .groupBy(
      screeningDecisions.stage,
      screeningDecisions.decision,
      screeningDecisions.reason
    );

  // Get stored flow data
  const flowRecords = await db
    .select()
    .from(prismaFlow)
    .where(eq(prismaFlow.projectId, projectId));

  const flowMap = new Map(flowRecords.map((r: typeof flowRecords[number]) => [r.stage, r]));

  // Calculate screening numbers
  const titleAbstractInclude =
    decisions
      .filter(
        (d) => d.stage === "title_abstract" && d.decision === "include"
      )
      .reduce((sum, d) => sum + d.count, 0) || 0;

  const titleAbstractExclude =
    decisions
      .filter(
        (d) => d.stage === "title_abstract" && d.decision === "exclude"
      )
      .reduce((sum, d) => sum + d.count, 0) || 0;

  const fullTextInclude =
    decisions
      .filter((d) => d.stage === "full_text" && d.decision === "include")
      .reduce((sum, d) => sum + d.count, 0) || 0;

  const fullTextExclude =
    decisions
      .filter((d) => d.stage === "full_text" && d.decision === "exclude")
      .reduce((sum, d) => sum + d.count, 0) || 0;

  // Build exclusion reason maps
  const screeningExclusionReasons: Record<string, number> = {};
  const eligibilityExclusionReasons: Record<string, number> = {};

  for (const d of decisions) {
    if (d.decision !== "exclude" || !d.reason) continue;
    if (d.stage === "title_abstract") {
      screeningExclusionReasons[d.reason] =
        (screeningExclusionReasons[d.reason] || 0) + d.count;
    } else {
      eligibilityExclusionReasons[d.reason] =
        (eligibilityExclusionReasons[d.reason] || 0) + d.count;
    }
  }

  const identRecord = flowMap.get("identification");
  const dbResults = identRecord?.recordCount ?? 0;
  const duplicates = identRecord?.excludedCount ?? 0;

  const totalScreened = titleAbstractInclude + titleAbstractExclude;
  const totalIdentified = totalScreened + duplicates;

  return {
    identification: {
      databaseResults: dbResults || totalIdentified,
      registerResults: 0,
      otherSources: 0,
      totalIdentified: dbResults || totalIdentified,
      duplicatesRemoved: duplicates,
      automationExcluded: 0,
      otherReasonsRemoved: 0,
    },
    screening: {
      recordsScreened: totalScreened,
      recordsExcluded: titleAbstractExclude,
      exclusionReasons: screeningExclusionReasons,
    },
    eligibility: {
      reportsRetrieved: titleAbstractInclude,
      reportsNotRetrieved: 0,
      reportsAssessed: fullTextInclude + fullTextExclude,
      reportsExcluded: fullTextExclude,
      exclusionReasons: eligibilityExclusionReasons,
    },
    included: {
      studiesIncluded: fullTextInclude,
      reportsIncluded: fullTextInclude,
    },
  };
}

// ---------------------------------------------------------------------------
// Update PRISMA flow stage
// ---------------------------------------------------------------------------

export async function updatePRISMAFlowStage(
  projectId: number,
  stage: string,
  data: {
    source?: string;
    recordCount?: number;
    excludedCount?: number;
    exclusionReasons?: Record<string, number>;
  }
) {
  const existing = await db
    .select()
    .from(prismaFlow)
    .where(
      and(eq(prismaFlow.projectId, projectId), eq(prismaFlow.stage, stage))
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(prismaFlow)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(prismaFlow.id, existing[0].id));
  } else {
    await db.insert(prismaFlow).values({
      projectId,
      stage,
      ...data,
    });
  }
}

// ---------------------------------------------------------------------------
// Generate PRISMA 2020 Flow Diagram SVG
// ---------------------------------------------------------------------------

export function generatePRISMAFlowSVG(data: PRISMAFlowData): string {
  const { identification: id, screening: sc, eligibility: el, included: inc } = data;

  // Build exclusion reason text
  const screeningReasons = Object.entries(sc.exclusionReasons)
    .map(([reason, count]) => `${reason} (n=${count})`)
    .join("; ");

  const eligibilityReasons = Object.entries(el.exclusionReasons)
    .map(([reason, count]) => `${reason} (n=${count})`)
    .join("; ");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700" font-family="sans-serif" font-size="12">
  <style>
    .box { fill: #f8fafc; stroke: #334155; stroke-width: 1.5; rx: 6; }
    .box-highlight { fill: #eff6ff; stroke: #3b82f6; stroke-width: 2; rx: 6; }
    .label { font-weight: 600; fill: #1e293b; }
    .value { fill: #475569; }
    .arrow { stroke: #64748b; stroke-width: 1.5; fill: none; marker-end: url(#arrowhead); }
    .section-label { font-weight: 700; fill: #6366f1; font-size: 14px; }
  </style>
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
    </marker>
  </defs>

  <!-- Section Labels -->
  <text x="20" y="30" class="section-label">Identification</text>
  <text x="20" y="200" class="section-label">Screening</text>
  <text x="20" y="400" class="section-label">Eligibility</text>
  <text x="20" y="580" class="section-label">Included</text>

  <!-- Identification -->
  <rect x="150" y="45" width="280" height="55" class="box"/>
  <text x="290" y="65" text-anchor="middle" class="label">Records identified from databases</text>
  <text x="290" y="85" text-anchor="middle" class="value">(n = ${id.databaseResults})</text>

  <rect x="500" y="45" width="280" height="55" class="box"/>
  <text x="640" y="65" text-anchor="middle" class="label">Duplicates removed</text>
  <text x="640" y="85" text-anchor="middle" class="value">(n = ${id.duplicatesRemoved})</text>

  <!-- Arrow down from identification -->
  <line x1="290" y1="100" x2="290" y2="140" class="arrow"/>
  <!-- Arrow right to duplicates -->
  <line x1="430" y1="72" x2="500" y2="72" class="arrow"/>

  <!-- Screening -->
  <rect x="150" y="215" width="280" height="55" class="box"/>
  <text x="290" y="235" text-anchor="middle" class="label">Records screened</text>
  <text x="290" y="255" text-anchor="middle" class="value">(n = ${sc.recordsScreened})</text>

  <rect x="500" y="215" width="280" height="70" class="box"/>
  <text x="640" y="235" text-anchor="middle" class="label">Records excluded</text>
  <text x="640" y="255" text-anchor="middle" class="value">(n = ${sc.recordsExcluded})</text>
  <text x="640" y="275" text-anchor="middle" class="value" font-size="10">${screeningReasons || "—"}</text>

  <!-- Arrow down from screening -->
  <line x1="290" y1="270" x2="290" y2="310" class="arrow"/>
  <!-- Arrow right to excluded -->
  <line x1="430" y1="242" x2="500" y2="242" class="arrow"/>

  <!-- Arrow from identification to screening -->
  <rect x="150" y="140" width="280" height="55" class="box"/>
  <text x="290" y="160" text-anchor="middle" class="label">Records after deduplication</text>
  <text x="290" y="180" text-anchor="middle" class="value">(n = ${id.totalIdentified - id.duplicatesRemoved})</text>
  <line x1="290" y1="195" x2="290" y2="215" class="arrow"/>

  <!-- Eligibility -->
  <rect x="150" y="310" width="280" height="55" class="box"/>
  <text x="290" y="330" text-anchor="middle" class="label">Reports sought for retrieval</text>
  <text x="290" y="350" text-anchor="middle" class="value">(n = ${el.reportsRetrieved})</text>

  <line x1="290" y1="365" x2="290" y2="395" class="arrow"/>

  <rect x="150" y="395" width="280" height="55" class="box"/>
  <text x="290" y="415" text-anchor="middle" class="label">Reports assessed for eligibility</text>
  <text x="290" y="435" text-anchor="middle" class="value">(n = ${el.reportsAssessed})</text>

  <rect x="500" y="395" width="280" height="70" class="box"/>
  <text x="640" y="415" text-anchor="middle" class="label">Reports excluded</text>
  <text x="640" y="435" text-anchor="middle" class="value">(n = ${el.reportsExcluded})</text>
  <text x="640" y="455" text-anchor="middle" class="value" font-size="10">${eligibilityReasons || "—"}</text>

  <!-- Arrow right to excluded -->
  <line x1="430" y1="422" x2="500" y2="422" class="arrow"/>
  <!-- Arrow down -->
  <line x1="290" y1="450" x2="290" y2="550" class="arrow"/>

  <!-- Included -->
  <rect x="150" y="550" width="280" height="55" class="box-highlight"/>
  <text x="290" y="570" text-anchor="middle" class="label">Studies included in review</text>
  <text x="290" y="590" text-anchor="middle" class="value">(n = ${inc.studiesIncluded})</text>
</svg>`;
}

// ---------------------------------------------------------------------------
// Generate PRISMA 2020 checklist data
// ---------------------------------------------------------------------------

export function generatePRISMAChecklist(
  flowData: PRISMAFlowData,
  projectMeta: {
    title: string;
    registrationId?: string;
    protocol?: string;
    searchDate?: string;
  }
) {
  return {
    title: "PRISMA 2020 Checklist",
    sections: [
      {
        section: "TITLE",
        items: [
          { item: 1, description: "Identify the report as a systematic review", status: "complete" },
        ],
      },
      {
        section: "METHODS",
        items: [
          {
            item: 5,
            description: "Eligibility criteria",
            status: "complete",
            note: "Inclusion/exclusion criteria defined in screening configuration",
          },
          {
            item: 6,
            description: "Information sources",
            status: flowData.identification.databaseResults > 0 ? "complete" : "incomplete",
            note: `${flowData.identification.databaseResults} records from databases`,
          },
          {
            item: 7,
            description: "Search strategy",
            status: "complete",
            note: "Generated via PICO-to-MeSH strategy builder",
          },
          {
            item: 8,
            description: "Selection process",
            status: flowData.screening.recordsScreened > 0 ? "complete" : "incomplete",
            note: `Triple-agent AI consensus screening: ${flowData.screening.recordsScreened} records screened`,
          },
          {
            item: 11,
            description: "Study risk of bias assessment",
            status: "pending",
            note: "RoB 2 tool — automated via AI with human override",
          },
        ],
      },
      {
        section: "RESULTS",
        items: [
          {
            item: 16,
            description: "Study selection",
            status: "complete",
            note: `PRISMA flow diagram: ${flowData.identification.databaseResults} identified → ${flowData.included.studiesIncluded} included`,
          },
        ],
      },
    ],
  };
}
