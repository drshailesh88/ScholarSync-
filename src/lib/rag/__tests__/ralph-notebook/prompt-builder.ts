/**
 * RALPH Prompt Builder
 *
 * Replicates the system prompt construction logic from /api/rag-chat/route.ts
 * so we can test it in isolation without spinning up the HTTP server.
 *
 * This must stay in sync with the actual route. If the route changes,
 * update this file accordingly.
 */

import { COMPARISON_PROMPT } from "@/lib/ai/prompts/notebook";
import type { ArtifactType } from "@/lib/ai/prompts/artifacts";
import { getArtifactPrompt } from "@/lib/ai/prompts/artifacts";
import type { MockChunk, MockPaper } from "./types";

export interface BuiltPrompt {
  systemPrompt: string;
  sourceMetadata: Array<{
    sourceIndex: number;
    paperId: number;
    paperTitle: string;
    paperAuthors: string[];
    pageNumber: number | null;
    sectionType: string | null;
    chunkId: number;
  }>;
}

/**
 * Build the system prompt exactly as /api/rag-chat/route.ts does,
 * using mock chunks and papers instead of real DB data.
 */
export function buildSystemPrompt(
  chunks: MockChunk[],
  papers: MockPaper[],
  mode: string = "notebook",
  comparisonMode: boolean = false,
  artifactType: ArtifactType = null
): BuiltPrompt {
  const paperMap = new Map(papers.map((p) => [p.id, p]));

  let systemPrompt = `You are ScholarSync, an AI research assistant for academic writing. You help students and researchers analyze their papers and answer questions.`;

  if (mode === "notebook") {
    systemPrompt += ` You are in Notebook mode — analyzing uploaded research sources.`;
  }

  const sourceMetadata: BuiltPrompt["sourceMetadata"] = [];

  if (chunks.length > 0) {
    systemPrompt += `\n\nRelevant sources from the user's research papers:\n\n`;

    chunks.forEach((chunk, i) => {
      const paper = paperMap.get(chunk.paper_id);
      const paperTitle = paper?.title || "Unknown paper";
      const paperAuthors = paper
        ? paper.authors.slice(0, 3).join(", ")
        : "Unknown authors";
      const pageInfo = chunk.page_number
        ? ` | Page ${chunk.page_number}`
        : "";
      const sectionInfo = chunk.section_type
        ? ` | Section: ${chunk.section_type}`
        : "";

      systemPrompt += `[Source ${i + 1}] "${paperTitle}" — ${paperAuthors}${pageInfo}${sectionInfo}\n`;
      systemPrompt += `${chunk.text}\n\n`;

      sourceMetadata.push({
        sourceIndex: i + 1,
        paperId: chunk.paper_id,
        paperTitle: paper?.title || "Unknown",
        paperAuthors: paper?.authors || [],
        pageNumber: chunk.page_number,
        sectionType: chunk.section_type,
        chunkId: chunk.id,
      });
    });

    systemPrompt += `CRITICAL GROUNDING RULES:
1. For EVERY factual claim, cite the source number in brackets like [1] or [1][2].
2. ONLY use information from the sources above. Your knowledge boundary is these sources.
3. If the sources do NOT contain information to answer the question:
   - Lead with: "Your uploaded sources don't cover [topic]."
   - Briefly state what the sources DO cover instead.
   - If you can offer general context, clearly separate it: "For general context (not from your sources): ..."
   - NEVER present general knowledge as if it came from the sources.
   - NEVER cite [N] for information not in Source N.
4. For partially-covered questions (some info in sources, some not):
   - First answer what the sources DO cover, with citations.
   - Then explicitly state what is NOT covered: "However, your sources do not specifically address [aspect]."
   - Do NOT fill the gap with training knowledge unless clearly marked.
5. If sources conflict, cite both and note the disagreement.
6. When quoting numbers (HR, CI, p-values, percentages), ALWAYS cite the exact source. Never paraphrase a number without a citation.
7. NEVER fabricate trial names, drug results, or statistical values not present in the sources.
8. End your response with a "Sources:" section listing all cited references. If no sources were cited, state "No sources cited — this topic is not covered in your uploaded papers."`;

    // Append comparison/synthesis instructions when comparison intent detected
    if (comparisonMode) {
      systemPrompt += COMPARISON_PROMPT;
    }

    // Append artifact-specific prompt when artifact intent detected
    if (artifactType) {
      const artifactPrompt = getArtifactPrompt(artifactType);
      if (artifactPrompt) {
        systemPrompt += artifactPrompt;
      }
    }
  }

  return { systemPrompt, sourceMetadata };
}
