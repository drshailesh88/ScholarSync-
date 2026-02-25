/**
 * Deep research multi-pass synthesis pipeline.
 *
 * Generates an enhanced literature synthesis through four sequential AI passes:
 *   Pass 1 — Per-perspective narrative sections (parallel)
 *   Pass 2 — Executive summary & introduction
 *   Pass 3 — Comparison tables, gaps, contradictions, conclusions
 *   Pass 4 — Self-critique and revision
 *
 * Returns both the legacy SynthesisReport shape (backward compat) and the
 * new EnhancedSynthesisReport with full markdown and structured sections.
 */

import { generateText } from "ai";
import { getDeepResearchModel } from "@/lib/ai/models";
import type {
  ResearchConfig,
  Perspective,
  EnhancedPaper,
  EnhancedSynthesisReport,
  PerspectiveSection,
  SynthesisProgressCallback,
} from "./types";

// ── Helpers ─────────────────────────────────────────────────────────

/**
 * Extract [N] citation references from text and return the set of
 * referenced paper IDs based on the provided mapping.
 */
function extractCitedPaperIds(
  text: string,
  numberToPaperId: Map<number, string>
): string[] {
  const cited = new Set<string>();
  const regex = /\[(\d+)\]/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const num = parseInt(match[1], 10);
    const paperId = numberToPaperId.get(num);
    if (paperId) {
      cited.add(paperId);
    }
  }
  return Array.from(cited);
}

/**
 * Safely parse JSON from an AI response, stripping code fences if present.
 */
function safeParseJson<T>(text: string, fallback: T): T {
  let cleaned = text.trim();
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) cleaned = fenceMatch[1].trim();
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    return fallback;
  }
}

/**
 * Get a unique stable ID for a paper, preferring DOI > PMID > S2 ID > title hash.
 */
function getPaperId(paper: EnhancedPaper): string {
  if (paper.doi) return `doi:${paper.doi}`;
  if (paper.pmid) return `pmid:${paper.pmid}`;
  if (paper.s2Id) return `s2:${paper.s2Id}`;
  // Fallback: deterministic key from title
  return `title:${paper.title.slice(0, 80).toLowerCase().replace(/\s+/g, "-")}`;
}

// ── Pass 1: Per-Perspective Sections ────────────────────────────────

interface Pass1Result {
  perspectiveId: string;
  perspectiveName: string;
  markdownContent: string;
  papersUsed: string[];
  sourceCount: number;
}

async function pass1PerspectiveSections(
  topic: string,
  perspectives: Perspective[],
  papers: EnhancedPaper[],
  globalNumberMap: Map<string, number>,
  onProgress?: SynthesisProgressCallback
): Promise<Pass1Result[]> {
  onProgress?.("synthesis-perspectives", "Writing per-perspective narrative sections...");

  const tasks = perspectives.map(async (perspective): Promise<Pass1Result> => {
    // Gather papers belonging to this perspective
    const perspectivePapers = papers.filter((p) =>
      p.perspectiveIds.includes(perspective.id)
    );

    if (perspectivePapers.length === 0) {
      return {
        perspectiveId: perspective.id,
        perspectiveName: perspective.name,
        markdownContent: "*No papers were found for this perspective.*",
        papersUsed: [],
        sourceCount: 0,
      };
    }

    // Build number-to-ID mapping for this perspective's papers (using global numbers)
    const numberToPaperId = new Map<number, string>();
    for (const paper of perspectivePapers) {
      const id = getPaperId(paper);
      const globalNum = globalNumberMap.get(id);
      if (globalNum !== undefined) {
        numberToPaperId.set(globalNum, id);
      }
    }

    // Build the paper reference list showing global citation numbers
    const paperBlock = perspectivePapers
      .map((paper) => {
        const id = getPaperId(paper);
        const num = globalNumberMap.get(id) ?? 0;
        const authors =
          paper.authors?.slice(0, 4).join(", ") || "Unknown";
        const etAl = (paper.authors?.length || 0) > 4 ? " et al." : "";

        let block = `[${num}] ${paper.title}
Authors: ${authors}${etAl}
Year: ${paper.year || "Unknown"} | Journal: ${paper.journal || "Unknown"}
Study type: ${paper.studyType || "Unknown"}
Abstract: ${paper.abstract || "No abstract available"}`;

        if (paper.extractedData) {
          const ed = paper.extractedData;
          const parts: string[] = [];
          if (ed.studyDesign) parts.push(`Design: ${ed.studyDesign}`);
          if (ed.sampleSize) parts.push(`N=${ed.sampleSize}`);
          if (ed.effectSizes?.length) parts.push(`Effects: ${ed.effectSizes.join("; ")}`);
          if (ed.pValues?.length) parts.push(`p: ${ed.pValues.join("; ")}`);
          if (ed.populationCharacteristics) parts.push(`Pop: ${ed.populationCharacteristics}`);
          if (ed.followUpDuration) parts.push(`FU: ${ed.followUpDuration}`);
          if (ed.keyFindings?.length) parts.push(`Findings: ${ed.keyFindings.join("; ")}`);
          if (parts.length) block += `\nExtracted: ${parts.join(" | ")}`;
        }

        if (paper.fullText) {
          block += `\nExcerpt: ${paper.fullText.slice(0, 1500)}`;
        }

        return block;
      })
      .join("\n\n---\n\n");

    const { text } = await generateText({
      model: getDeepResearchModel(),
      system: `You are writing one section of a systematic literature review for an academic medical audience. This section covers the perspective: "${perspective.name}" — ${perspective.description}.

Rules:
- Write a flowing 500-800 word narrative section organized by theme, not by paper
- Every factual claim MUST cite the source using [N] where N is the paper's reference number
- Report exact statistics when available: HR, OR, RR, CI, p-values, sample sizes, NNT
- Start with the strongest evidence (systematic reviews, meta-analyses), then RCTs, then observational
- Note study limitations and quality concerns
- Identify contradictions or conflicting findings between papers
- End with a brief synthesis statement for this perspective
- Use formal academic English suitable for a medical journal
- Do NOT introduce information not present in the provided papers
- Do NOT make clinical recommendations — only report what the evidence shows`,
      prompt: `Topic: ${topic}
Perspective: ${perspective.name}
Description: ${perspective.description}

Papers (${perspectivePapers.length} total):

${paperBlock}

Write the narrative section for this perspective. Use [N] citation markers that match the paper numbers above.`,
      maxOutputTokens: 4000,
      temperature: 0.3,
    });

    const papersUsed = extractCitedPaperIds(text, numberToPaperId);

    return {
      perspectiveId: perspective.id,
      perspectiveName: perspective.name,
      markdownContent: text.trim(),
      papersUsed,
      sourceCount: papersUsed.length,
    };
  });

  // Run all perspective sections in parallel
  return Promise.all(tasks);
}

// ── Pass 2: Executive Summary & Introduction ────────────────────────

interface Pass2Result {
  executiveSummary: string;
  introduction: string;
}

async function pass2ExecutiveSummary(
  topic: string,
  perspectiveSections: Pass1Result[],
  totalPapers: number,
  onProgress?: SynthesisProgressCallback
): Promise<Pass2Result> {
  onProgress?.("synthesis-summary", "Writing executive summary and introduction...");

  const sectionsOverview = perspectiveSections
    .map(
      (s) =>
        `### ${s.perspectiveName}\n${s.markdownContent}`
    )
    .join("\n\n");

  const { text } = await generateText({
    model: getDeepResearchModel(),
    system: `You are writing the executive summary and introduction for a multi-perspective literature review. You have already written individual perspective sections; now tie them together.

Respond in this exact JSON format:
{
  "executiveSummary": "300-500 word executive summary...",
  "introduction": "200-400 word introduction..."
}

The executive summary should:
- Highlight the most important findings across ALL perspectives
- Note the overall strength and direction of evidence
- Call out key gaps or contradictions
- Be suitable for a busy clinician or researcher to read alone

The introduction should:
- Frame the research question and its clinical significance
- Briefly describe the scope (number of papers, perspectives examined)
- Preview the structure of the review`,
    prompt: `Topic: ${topic}
Total papers analyzed: ${totalPapers}
Number of perspectives: ${perspectiveSections.length}

Perspective sections written:

${sectionsOverview}`,
    maxOutputTokens: 3000,
    temperature: 0.3,
  });

  const fallback: Pass2Result = {
    executiveSummary: "Executive summary could not be generated.",
    introduction: "Introduction could not be generated.",
  };

  return safeParseJson<Pass2Result>(text, fallback);
}

// ── Pass 3: Tables, Gaps, Contradictions, Conclusions ───────────────

interface Pass3Result {
  tablesSection: string;
  gapsAnalysis: string;
  contradictionsAnalysis: string;
  conclusions: string;
  keyFindings: string[];
  gaps: string[];
  contradictions: string[];
}

async function pass3TablesAndAnalysis(
  topic: string,
  perspectiveSections: Pass1Result[],
  papers: EnhancedPaper[],
  globalNumberMap: Map<string, number>,
  onProgress?: SynthesisProgressCallback
): Promise<Pass3Result> {
  onProgress?.("synthesis-tables", "Generating comparison tables, gaps analysis, and conclusions...");

  const sectionsText = perspectiveSections
    .map((s) => `### ${s.perspectiveName}\n${s.markdownContent}`)
    .join("\n\n");

  // Build a condensed paper data block for table generation
  const paperDataBlock = papers
    .slice(0, 60) // cap for context limits
    .map((paper) => {
      const id = getPaperId(paper);
      const num = globalNumberMap.get(id) ?? 0;
      const parts = [`[${num}] ${paper.title} (${paper.year})`];
      if (paper.studyType) parts.push(`Type: ${paper.studyType}`);
      if (paper.extractedData?.sampleSize)
        parts.push(`N=${paper.extractedData.sampleSize}`);
      if (paper.extractedData?.effectSizes?.length)
        parts.push(`Effects: ${paper.extractedData.effectSizes.join("; ")}`);
      if (paper.extractedData?.pValues?.length)
        parts.push(`p: ${paper.extractedData.pValues.join("; ")}`);
      if (paper.extractedData?.studyDesign)
        parts.push(`Design: ${paper.extractedData.studyDesign}`);
      return parts.join(" | ");
    })
    .join("\n");

  const { text } = await generateText({
    model: getDeepResearchModel(),
    system: `You are completing a multi-perspective literature review. Based on the perspective sections already written and the paper data, generate the final analytical components.

Respond in this exact JSON format:
{
  "tablesSection": "Markdown tables comparing key studies (use | column | format). Include 1-3 tables as appropriate.",
  "gapsAnalysis": "2-4 paragraphs analyzing research gaps identified across all perspectives.",
  "contradictionsAnalysis": "1-3 paragraphs discussing contradictions or conflicting evidence found.",
  "conclusions": "2-3 paragraphs with overall conclusions and future directions.",
  "keyFindings": ["finding 1", "finding 2", "...up to 8 key findings"],
  "gaps": ["gap 1", "gap 2", "...concise gap descriptions"],
  "contradictions": ["contradiction 1", "contradiction 2", "...concise contradiction descriptions"]
}

For the tables:
- Create a comparison table of the most important studies
- Include columns for: Study [N], Design, N, Key Outcome, Effect Size, Quality
- If relevant, create sub-tables by study type or outcome

For gaps and contradictions, be specific and cite papers with [N] references.`,
    prompt: `Topic: ${topic}

Perspective sections:
${sectionsText}

Paper data:
${paperDataBlock}`,
    maxOutputTokens: 4000,
    temperature: 0.3,
  });

  const fallback: Pass3Result = {
    tablesSection:
      "| Study | Design | N | Outcome | Effect Size |\n|---|---|---|---|---|\n| *Table generation failed* | | | | |",
    gapsAnalysis: "Gap analysis could not be generated.",
    contradictionsAnalysis: "Contradiction analysis could not be generated.",
    conclusions: "Conclusions could not be generated.",
    keyFindings: [],
    gaps: [],
    contradictions: [],
  };

  return safeParseJson<Pass3Result>(text, fallback);
}

// ── Pass 4: Self-Critique & Revision ────────────────────────────────

async function pass4CritiqueAndRevise(
  fullReport: string,
  topic: string,
  onProgress?: SynthesisProgressCallback
): Promise<string> {
  onProgress?.("synthesis-critique", "Self-critiquing and revising the report...");

  const { text } = await generateText({
    model: getDeepResearchModel(),
    system: `You are a senior medical researcher reviewing a literature synthesis report. Your task is to:

1. Identify weaknesses: vague claims without specific data, missing citation markers, unsupported statements, logical gaps, areas needing more specificity
2. Then output a REVISED version of the full report that addresses these weaknesses

Rules for revision:
- Strengthen vague claims by adding specific data points where the original sections contained them
- Ensure all factual claims have [N] citation markers
- Improve transitions between sections
- Tighten language — remove hedging where evidence is clear
- Do NOT add new information or citations not present in the original
- Do NOT change the section structure or headings
- Output ONLY the revised full report (no critique commentary)`,
    prompt: `Topic: ${topic}

Full report to critique and revise:

${fullReport}`,
    maxOutputTokens: 8000,
    temperature: 0.2,
  });

  return text.trim();
}

// ── Main Synthesis Function ─────────────────────────────────────────

/**
 * Multi-pass synthesis pipeline.
 *
 * Produces an EnhancedSynthesisReport that extends SynthesisReport for
 * backward compatibility while adding full markdown output and structured
 * analytical sections.
 */
export async function synthesizeFindings(
  topic: string,
  config: ResearchConfig,
  perspectives: Perspective[],
  papers: EnhancedPaper[],
  onProgress?: SynthesisProgressCallback
): Promise<EnhancedSynthesisReport> {
  // ── Build global citation number map ──────────────────────────────
  // Assign each unique paper a stable [N] number used across all sections.
  const globalNumberMap = new Map<string, number>();
  const deduplicatedPapers: EnhancedPaper[] = [];
  const seenIds = new Set<string>();

  for (const paper of papers) {
    const id = getPaperId(paper);
    if (!seenIds.has(id)) {
      seenIds.add(id);
      deduplicatedPapers.push(paper);
      globalNumberMap.set(id, deduplicatedPapers.length); // 1-indexed
    }
  }

  // ── Pass 1: Per-perspective sections (parallel) ───────────────────
  const perspectiveSections = await pass1PerspectiveSections(
    topic,
    perspectives,
    deduplicatedPapers,
    globalNumberMap,
    onProgress
  );

  // ── Pass 2: Executive summary & introduction ──────────────────────
  const { executiveSummary, introduction } = await pass2ExecutiveSummary(
    topic,
    perspectiveSections,
    deduplicatedPapers.length,
    onProgress
  );

  // ── Pass 3: Tables, gaps, contradictions, conclusions ─────────────
  const pass3 = await pass3TablesAndAnalysis(
    topic,
    perspectiveSections,
    deduplicatedPapers,
    globalNumberMap,
    onProgress
  );

  // ── Assemble draft report ─────────────────────────────────────────
  const perspectiveMd = perspectiveSections
    .map((s) => `## ${s.perspectiveName}\n\n${s.markdownContent}`)
    .join("\n\n");

  const referencesList = deduplicatedPapers
    .map((paper, idx) => {
      const num = idx + 1;
      const authors =
        paper.authors?.slice(0, 6).join(", ") || "Unknown";
      const etAl = (paper.authors?.length || 0) > 6 ? " et al." : "";
      const doi = paper.doi ? ` DOI: ${paper.doi}` : "";
      const pmid = paper.pmid ? ` PMID: ${paper.pmid}` : "";
      return `${num}. ${authors}${etAl}. ${paper.title}. *${paper.journal || "Unknown"}*. ${paper.year || "Unknown"}.${doi}${pmid}`;
    })
    .join("\n");

  const draftReport = `## Executive Summary

${executiveSummary}

## Introduction

${introduction}

${perspectiveMd}

## Comparison of Key Studies

${pass3.tablesSection}

## Research Gaps

${pass3.gapsAnalysis}

## Contradictions

${pass3.contradictionsAnalysis}

## Conclusions

${pass3.conclusions}

## References

${referencesList}`;

  // ── Pass 4: Self-critique & revision ──────────────────────────────
  const revisedReport = await pass4CritiqueAndRevise(
    draftReport,
    topic,
    onProgress
  );

  onProgress?.("complete", "Synthesis complete.");

  // ── Build backward-compatible SynthesisReport fields ──────────────
  // The old perspectives array uses actual source counts from Pass 1.
  const legacyPerspectives = perspectiveSections.map((s) => ({
    name: s.perspectiveName,
    findings: s.markdownContent,
    sourceCount: s.sourceCount, // Real count from [N] reference tracking
  }));

  // Build PerspectiveSection array
  const enhancedSections: PerspectiveSection[] = perspectiveSections.map(
    (s) => ({
      perspectiveId: s.perspectiveId,
      perspectiveName: s.perspectiveName,
      markdownContent: s.markdownContent,
      papersUsed: s.papersUsed,
      sourceCount: s.sourceCount,
    })
  );

  return {
    // Legacy SynthesisReport fields
    topic,
    mode: config.mode,
    summary: executiveSummary,
    keyFindings: pass3.keyFindings,
    perspectives: legacyPerspectives,
    gaps: pass3.gaps,
    contradictions: pass3.contradictions,
    totalSources: deduplicatedPapers.length,
    sources: deduplicatedPapers,

    // Enhanced fields
    markdownReport: revisedReport,
    perspectiveSections: enhancedSections,
    executiveSummary,
    tablesSection: pass3.tablesSection,
    gapsAnalysis: pass3.gapsAnalysis,
    contradictionsAnalysis: pass3.contradictionsAnalysis,
    conclusions: pass3.conclusions,
  };
}
