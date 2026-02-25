/**
 * Research synthesis — generates a structured report from collected papers.
 *
 * Uses AI to synthesize findings across perspectives into a cohesive report
 * with key findings, gaps, and contradictions.
 */

import { generateText } from "ai";
import { getBigModel } from "@/lib/ai/models";
import type { UnifiedSearchResult } from "@/types/search";
import type { Perspective, ResearchConfig, SynthesisReport } from "./types";

/**
 * Format papers for AI context (compressed to save tokens).
 */
function formatPapersForContext(papers: UnifiedSearchResult[], limit: number): string {
  return papers
    .slice(0, limit)
    .map((p, i) => {
      const authors = p.authors.slice(0, 3).join(", ");
      const authorStr = p.authors.length > 3 ? `${authors} et al.` : authors;
      const abstract = p.abstract?.slice(0, 250) || "No abstract";
      return `[${i + 1}] ${p.title}
   ${authorStr} (${p.year}) — ${p.journal}
   ${abstract}${p.abstract && p.abstract.length > 250 ? "..." : ""}
   Citations: ${p.citationCount || 0}${p.evidenceLevel ? ` | Evidence: Level ${p.evidenceLevel}` : ""}${p.doi ? ` | DOI: ${p.doi}` : ""}`;
    })
    .join("\n\n");
}

/**
 * Synthesize findings from all perspectives into a structured report.
 */
export async function synthesizeFindings(
  topic: string,
  config: ResearchConfig,
  perspectives: Perspective[],
  papers: UnifiedSearchResult[]
): Promise<SynthesisReport> {
  // Limit papers sent to AI to avoid token overflow
  const maxPapers = Math.min(papers.length, 40);
  const topPapers = papers
    .sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0))
    .slice(0, maxPapers);

  const papersContext = formatPapersForContext(topPapers, maxPapers);

  const perspectivesContext = perspectives
    .map((p) => `- ${p.name}: ${p.description}`)
    .join("\n");

  const { text } = await generateText({
    model: getBigModel(),
    system: `You are an expert academic researcher synthesizing literature findings.
You MUST respond with ONLY a JSON object (no markdown fences, no extra text).

Given a research topic, expert perspectives, and collected papers, produce
a structured synthesis report. Be rigorous: cite specific papers by their
[N] reference numbers, report exact statistics when available, note
contradictions between studies, and identify research gaps.

The JSON object must have these fields:
{
  "summary": "A 200-300 word executive summary of findings",
  "keyFindings": ["finding 1 with [N] citations", "finding 2", ...],
  "perspectiveFindings": [
    {"name": "perspective name", "findings": "what was found from this angle"}
  ],
  "gaps": ["gap 1", "gap 2", ...],
  "contradictions": ["contradiction 1 between studies", ...]
}`,
    prompt: `Topic: "${topic}"

Perspectives explored:
${perspectivesContext}

Papers collected (${papers.length} total, showing top ${maxPapers} by citations):

${papersContext}

Synthesize these findings into a comprehensive report.`,
    maxOutputTokens: 3000,
  });

  try {
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return {
      topic,
      mode: config.mode,
      summary: parsed.summary || "Synthesis could not be generated.",
      keyFindings: parsed.keyFindings || [],
      perspectives: (parsed.perspectiveFindings || []).map(
        (p: { name: string; findings: string }) => ({
          name: p.name,
          findings: p.findings,
          sourceCount: papers.filter((paper) =>
            perspectives
              .find((pp) => pp.name === p.name)
              ?.searchQueries.some((q) =>
                paper.title.toLowerCase().includes(q.toLowerCase().split(" ")[0])
              )
          ).length,
        })
      ),
      gaps: parsed.gaps || [],
      contradictions: parsed.contradictions || [],
      totalSources: papers.length,
      sources: papers,
    };
  } catch {
    // Fallback: return raw text as summary
    return {
      topic,
      mode: config.mode,
      summary: text.slice(0, 1000),
      keyFindings: [],
      perspectives: perspectives.map((p) => ({
        name: p.name,
        findings: "Could not parse structured findings.",
        sourceCount: 0,
      })),
      gaps: [],
      contradictions: [],
      totalSources: papers.length,
      sources: papers,
    };
  }
}
