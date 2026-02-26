/**
 * RevMan Data Package Export for Cochrane Reviews
 *
 * Generates 4 CSV files compatible with RevMan 5 / RevMan Web import:
 *  1. Study Characteristics  — Study ID, Authors, Year, Design, Country, PICO, Notes
 *  2. Risk of Bias           — Study ID, Domain, Judgment, Support
 *  3. Outcome Data           — Study ID, Outcome, dichotomous + continuous fields
 *  4. Excluded Studies       — Study ID, Title, Reason for Exclusion
 */

import { db } from "@/lib/db";
import {
  papers,
  projectPapers,
  riskOfBias,
  metaAnalysisResults,
  screeningDecisions,
  comparisonMatrices,
  matrixColumns,
  matrixCells,
} from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RevManExportPackage {
  studyCharacteristics: string; // CSV
  riskOfBias: string;           // CSV
  outcomeData: string;          // CSV
  excludedStudies: string;      // CSV
}

// ---------------------------------------------------------------------------
// CSV helper
// ---------------------------------------------------------------------------

function csvEscape(value: string | number | null | undefined): string {
  if (value == null) return "";
  const str = String(value);
  // Wrap in quotes if the value contains commas, quotes, or newlines
  if (str.includes('"') || str.includes(",") || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function buildCSVRow(fields: (string | number | null | undefined)[]): string {
  return fields.map(csvEscape).join(",");
}

function buildCSV(
  headers: string[],
  rows: (string | number | null | undefined)[][]
): string {
  const headerRow = headers.map(csvEscape).join(",");
  const dataRows = rows.map(buildCSVRow);
  return [headerRow, ...dataRows].join("\n");
}

// ---------------------------------------------------------------------------
// 1. Study Characteristics CSV
// ---------------------------------------------------------------------------

async function generateStudyCharacteristicsCSV(
  projectId: number
): Promise<string> {
  const headers = [
    "Study ID",
    "Authors",
    "Year",
    "Study Design",
    "Country",
    "Population",
    "Intervention",
    "Comparator",
    "Outcome",
    "Notes",
  ];

  // Get all included papers for this project
  const projectPaperRows = await db
    .select({
      paperId: papers.id,
      title: papers.title,
      authors: papers.authors,
      year: papers.year,
      studyType: papers.study_type,
      ppNotes: projectPapers.user_notes,
      screeningDecision: projectPapers.screening_decision,
    })
    .from(projectPapers)
    .innerJoin(papers, eq(projectPapers.paper_id, papers.id))
    .where(
      and(
        eq(projectPapers.project_id, projectId),
        eq(projectPapers.screening_decision, "include")
      )
    );

  // Try to pull PICO fields from matrix cells if a comparison matrix exists
  // We look for columns named after PICO concepts (case-insensitive)
  const picoData = await getPICOFromMatrix(projectId, projectPaperRows.map((r) => r.paperId));

  const rows = projectPaperRows.map((row) => {
    const authorsArr = Array.isArray(row.authors)
      ? (row.authors as string[])
      : [];
    // Build first-author + year study ID e.g. "Smith 2023"
    const firstAuthor = authorsArr[0]
      ? authorsArr[0].split(",")[0].split(" ").pop() ?? authorsArr[0]
      : `Paper${row.paperId}`;
    const studyId = `${firstAuthor} ${row.year ?? ""}`.trim();

    const authorsStr = authorsArr.slice(0, 3).join("; ") +
      (authorsArr.length > 3 ? " et al." : "");

    const pico = picoData.get(row.paperId) ?? {};

    return [
      studyId,
      authorsStr,
      row.year,
      row.studyType ?? "",
      pico.country ?? "",
      pico.population ?? "",
      pico.intervention ?? "",
      pico.comparator ?? "",
      pico.outcome ?? "",
      row.ppNotes ?? "",
    ];
  });

  return buildCSV(headers, rows);
}

// ---------------------------------------------------------------------------
// Helper: pull PICO field values from the comparison/extraction matrix
// ---------------------------------------------------------------------------

interface PICOFields {
  population?: string;
  intervention?: string;
  comparator?: string;
  outcome?: string;
  country?: string;
}

async function getPICOFromMatrix(
  projectId: number,
  paperIds: number[]
): Promise<Map<number, PICOFields>> {
  const result = new Map<number, PICOFields>();
  if (paperIds.length === 0) return result;

  // Fetch the first comparison matrix for this project
  const matrices = await db
    .select({ id: comparisonMatrices.id })
    .from(comparisonMatrices)
    .where(eq(comparisonMatrices.projectId, projectId))
    .limit(1);

  if (matrices.length === 0) return result;
  const matrixId = matrices[0].id;

  // Get all columns for this matrix
  const columns = await db
    .select({ id: matrixColumns.id, name: matrixColumns.name })
    .from(matrixColumns)
    .where(eq(matrixColumns.matrixId, matrixId));

  if (columns.length === 0) return result;

  // Map column names to PICO keys
  const picoKeyMap = new Map<number, keyof PICOFields>();
  for (const col of columns) {
    const lower = col.name.toLowerCase();
    if (lower.includes("population") || lower.includes("sample") || lower.includes("participants")) {
      picoKeyMap.set(col.id, "population");
    } else if (lower.includes("intervention") || lower.includes("treatment") || lower.includes("exposure")) {
      picoKeyMap.set(col.id, "intervention");
    } else if (lower.includes("comparator") || lower.includes("control") || lower.includes("comparison")) {
      picoKeyMap.set(col.id, "comparator");
    } else if (lower.includes("outcome") || lower.includes("endpoint") || lower.includes("measure")) {
      picoKeyMap.set(col.id, "outcome");
    } else if (lower.includes("country") || lower.includes("setting") || lower.includes("location")) {
      picoKeyMap.set(col.id, "country");
    }
  }

  if (picoKeyMap.size === 0) return result;

  // Fetch cells for these columns + papers
  const columnIds = Array.from(picoKeyMap.keys());
  const cells = await db
    .select({
      paperId: matrixCells.paperId,
      columnId: matrixCells.columnId,
      value: matrixCells.value,
    })
    .from(matrixCells)
    .where(eq(matrixCells.matrixId, matrixId));

  for (const cell of cells) {
    if (!paperIds.includes(cell.paperId)) continue;
    if (!columnIds.includes(cell.columnId)) continue;

    const picoKey = picoKeyMap.get(cell.columnId);
    if (!picoKey || !cell.value) continue;

    if (!result.has(cell.paperId)) result.set(cell.paperId, {});
    result.get(cell.paperId)![picoKey] = cell.value;
  }

  return result;
}

// ---------------------------------------------------------------------------
// 2. Risk of Bias CSV
// ---------------------------------------------------------------------------

async function generateRiskOfBiasCSV(projectId: number): Promise<string> {
  const headers = ["Study ID", "Domain", "Judgment", "Support"];

  const rows = await db
    .select({
      paperId: riskOfBias.paperId,
      authorsList: papers.authors,
      year: papers.year,
      domain: riskOfBias.domain,
      judgment: riskOfBias.judgment,
      supportText: riskOfBias.supportText,
    })
    .from(riskOfBias)
    .innerJoin(papers, eq(riskOfBias.paperId, papers.id))
    .where(eq(riskOfBias.projectId, projectId));

  const csvRows = rows.map((row) => {
    const authorsArr = Array.isArray(row.authorsList)
      ? (row.authorsList as string[])
      : [];
    const firstAuthor = authorsArr[0]
      ? authorsArr[0].split(",")[0].split(" ").pop() ?? authorsArr[0]
      : `Paper${row.paperId}`;
    const studyId = `${firstAuthor} ${row.year ?? ""}`.trim();

    return [studyId, row.domain, row.judgment ?? "", row.supportText ?? ""];
  });

  return buildCSV(headers, csvRows);
}

// ---------------------------------------------------------------------------
// 3. Outcome Data CSV
// ---------------------------------------------------------------------------

interface StudyDataEntry {
  studyId?: string;
  studyLabel?: string;
  // Dichotomous
  eventsTreatment?: number | null;
  totalTreatment?: number | null;
  eventsControl?: number | null;
  totalControl?: number | null;
  // Continuous
  meanTreatment?: number | null;
  sdTreatment?: number | null;
  nTreatment?: number | null;
  meanControl?: number | null;
  sdControl?: number | null;
  nControl?: number | null;
}

async function generateOutcomeDataCSV(projectId: number): Promise<string> {
  const headers = [
    "Study ID",
    "Outcome",
    "Events Treatment",
    "Total Treatment",
    "Events Control",
    "Total Control",
    "Mean Treatment",
    "SD Treatment",
    "N Treatment",
    "Mean Control",
    "SD Control",
    "N Control",
  ];

  const analyses = await db
    .select({
      analysisName: metaAnalysisResults.analysisName,
      outcomeMeasure: metaAnalysisResults.outcomeMeasure,
      studyData: metaAnalysisResults.studyData,
    })
    .from(metaAnalysisResults)
    .where(eq(metaAnalysisResults.projectId, projectId));

  const csvRows: (string | number | null | undefined)[][] = [];

  for (const analysis of analyses) {
    const outcome = analysis.outcomeMeasure ?? analysis.analysisName ?? "";

    // studyData is persisted as the full MetaAnalysisOutput JSON
    // Structure: { studies: StudyEffect[], ... }
    const studyDataRaw = analysis.studyData as Record<string, unknown> | null;
    if (!studyDataRaw) continue;

    // The studies array lives at the top level or inside .studies
    const studiesRaw = Array.isArray(studyDataRaw.studies)
      ? (studyDataRaw.studies as StudyDataEntry[])
      : [];

    for (const study of studiesRaw) {
      const studyId = study.studyLabel ?? study.studyId ?? "";

      csvRows.push([
        studyId,
        outcome,
        study.eventsTreatment ?? null,
        study.totalTreatment ?? null,
        study.eventsControl ?? null,
        study.totalControl ?? null,
        study.meanTreatment ?? null,
        study.sdTreatment ?? null,
        study.nTreatment ?? null,
        study.meanControl ?? null,
        study.sdControl ?? null,
        study.nControl ?? null,
      ]);
    }
  }

  return buildCSV(headers, csvRows);
}

// ---------------------------------------------------------------------------
// 4. Excluded Studies CSV
// ---------------------------------------------------------------------------

async function generateExcludedStudiesCSV(projectId: number): Promise<string> {
  const headers = ["Study ID", "Title", "Reason for Exclusion"];

  const rows = await db
    .select({
      paperId: papers.id,
      title: papers.title,
      authors: papers.authors,
      year: papers.year,
      reason: screeningDecisions.reason,
    })
    .from(screeningDecisions)
    .innerJoin(papers, eq(screeningDecisions.paperId, papers.id))
    .where(
      and(
        eq(screeningDecisions.projectId, projectId),
        eq(screeningDecisions.decision, "exclude")
      )
    );

  // Deduplicate by paperId (same paper may have multiple screening stage decisions)
  const seen = new Set<number>();
  const csvRows: (string | number | null | undefined)[][] = [];

  for (const row of rows) {
    if (seen.has(row.paperId)) continue;
    seen.add(row.paperId);

    const authorsArr = Array.isArray(row.authors)
      ? (row.authors as string[])
      : [];
    const firstAuthor = authorsArr[0]
      ? authorsArr[0].split(",")[0].split(" ").pop() ?? authorsArr[0]
      : `Paper${row.paperId}`;
    const studyId = `${firstAuthor} ${row.year ?? ""}`.trim();

    csvRows.push([studyId, row.title, row.reason ?? ""]);
  }

  return buildCSV(headers, csvRows);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function generateRevManExport(
  projectId: number
): Promise<RevManExportPackage> {
  const [studyCharacteristics, riskOfBiasCSV, outcomeData, excludedStudies] =
    await Promise.all([
      generateStudyCharacteristicsCSV(projectId),
      generateRiskOfBiasCSV(projectId),
      generateOutcomeDataCSV(projectId),
      generateExcludedStudiesCSV(projectId),
    ]);

  return {
    studyCharacteristics,
    riskOfBias: riskOfBiasCSV,
    outcomeData,
    excludedStudies,
  };
}
