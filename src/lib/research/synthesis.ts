/**
 * Deep research report synthesis.
 *
 * Generates structured multi-paper narratives with inline [N] citations.
 */

import type { PaperResult, SynthesisReportType } from "./types";

const SYNTHESIS_SYSTEM_PROMPT = `You are a medical literature synthesis assistant writing for an academic manuscript. Generate a structured literature review section based on the provided papers.

Rules:
- Every sentence containing a factual claim must cite the source paper with [N]
- Organize by theme, not by paper
- Start with the strongest evidence (systematic reviews, meta-analyses) then RCTs, then observational
- Report exact statistics: HR, OR, RR, CI, p-values, sample sizes
- Note study limitations where relevant
- Identify contradictions or conflicting evidence between papers
- Highlight gaps where evidence is insufficient
- Use formal academic English appropriate for a medical journal
- Do NOT introduce information not present in the provided papers
- Do NOT make clinical recommendations — only report what the evidence shows
- End each section with a brief synthesis statement
- Target the word count specified by the user`;

export interface SynthesisInput {
  papers: PaperResult[];
  reportType: SynthesisReportType;
  customInstructions?: string;
  targetWordCount?: number;
}

function buildPaperContext(papers: PaperResult[]): string {
  return papers
    .map((paper, idx) => {
      const num = idx + 1;
      const authors = paper.authors?.slice(0, 3).join(", ") || "Unknown";
      const etAl = (paper.authors?.length || 0) > 3 ? " et al." : "";
      return `[${num}] ${paper.title}
Authors: ${authors}${etAl}
Year: ${paper.year || "Unknown"}
Journal: ${paper.journal || "Unknown"}
PMID: ${paper.pmid || "N/A"} | DOI: ${paper.doi || "N/A"}
Study type: ${paper.studyType || "Unknown"}
Abstract: ${paper.abstract || "No abstract available"}
---`;
    })
    .join("\n\n");
}

/**
 * Build synthesis prompt for the AI.
 */
export function buildSynthesisPrompt(input: SynthesisInput): {
  system: string;
  user: string;
} {
  const paperContext = buildPaperContext(input.papers);

  let reportInstruction: string;
  let wordTarget: number;

  switch (input.reportType) {
    case "quick_summary":
      reportInstruction =
        "Generate a quick summary of the key findings across these papers. Use 2-3 paragraphs.";
      wordTarget = input.targetWordCount || 250;
      break;
    case "literature_review":
      reportInstruction =
        "Generate a structured literature review section with subheadings. Organize by theme, not by paper.";
      wordTarget = input.targetWordCount || 800;
      break;
    case "evidence_summary":
      reportInstruction =
        "Generate an evidence summary that first presents key findings in a structured format, then provides 2-3 paragraphs interpreting the evidence.";
      wordTarget = input.targetWordCount || 500;
      break;
    case "custom":
      reportInstruction = input.customInstructions || "Generate a literature synthesis.";
      wordTarget = input.targetWordCount || 500;
      break;
  }

  return {
    system: SYNTHESIS_SYSTEM_PROMPT,
    user: `${reportInstruction}

Target word count: ~${wordTarget} words

Papers to synthesize (${input.papers.length} total):

${paperContext}`,
  };
}

/**
 * Build a synthesis plan prompt that outlines what will be synthesized.
 */
export function buildSynthesisPlanPrompt(input: SynthesisInput): {
  system: string;
  user: string;
} {
  const paperSummaries = input.papers
    .map((p, i) => `[${i + 1}] ${p.title} (${p.year}) - ${p.studyType || "Unknown type"}`)
    .join("\n");

  return {
    system: `You are a medical literature synthesis planner. Given a set of papers, outline how you would structure a synthesis report.

Respond in JSON format:
{
  "sections": [
    { "title": "Section title", "description": "Brief description of what this section covers" }
  ],
  "estimatedWordCount": 800,
  "papersPerSection": { "Section title": [1, 3, 5] }
}

The paper numbers in papersPerSection reference the [N] numbers of the papers provided.`,
    user: `Report type: ${input.reportType}
${input.customInstructions ? `Custom instructions: ${input.customInstructions}` : ""}

Papers:
${paperSummaries}`,
  };
}
