/**
 * POST /api/research/chat
 *
 * Paper Chat — scoped AI Q&A about selected papers.
 * Streams responses using the Vercel AI SDK.
 */

import { NextRequest } from "next/server";
import { streamText } from "ai";
import { getModel, isAIConfigured } from "@/lib/ai/models";

const PAPER_CHAT_SYSTEM = `You are a medical literature analysis assistant. Answer the user's question using ONLY information from the provided papers.

Rules:
- ONLY use information from the papers provided in context
- Cite every factual claim with [N] referencing the specific paper
- If the papers don't contain enough information to answer, say so explicitly
- Never generate information not present in the provided papers
- Use precise medical terminology
- Report exact statistics when available (HR, OR, CI, p-values)
- Note contradictions between papers if they exist
- Distinguish between findings from RCTs vs observational studies
- End with a "Papers used:" list showing paper number, first author, year, and PMID`;

interface PaperContext {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  abstract?: string;
  studyType?: string;
  pmid?: string;
}

function buildPaperContext(papers: PaperContext[]): string {
  return papers
    .map((p, idx) => {
      const num = idx + 1;
      const authorStr = p.authors?.slice(0, 3).join(", ") || "Unknown";
      const etAl = (p.authors?.length || 0) > 3 ? " et al." : "";
      return `[${num}] "${p.title}"
Authors: ${authorStr}${etAl}
Year: ${p.year || "Unknown"} | Journal: ${p.journal || "Unknown"}
PMID: ${p.pmid || "N/A"} | Study type: ${p.studyType || "Unknown"}
Abstract: ${p.abstract || "No abstract available"}`;
    })
    .join("\n\n---\n\n");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, papers, scopeLabel } = body;

    if (!question || !papers || !Array.isArray(papers) || papers.length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: question, papers" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!isAIConfigured()) {
      return new Response(
        JSON.stringify({ error: "AI not configured" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const paperContext = buildPaperContext(papers);
    const scopeInfo = scopeLabel || `${papers.length} paper${papers.length !== 1 ? "s" : ""}`;

    const userPrompt = `Based on ${scopeInfo}:

${paperContext}

---

User's question: ${question}`;

    const result = streamText({
      model: getModel(),
      system: PAPER_CHAT_SYSTEM,
      prompt: userPrompt,
      temperature: 0.3,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Paper chat error:", error);
    return new Response(
      JSON.stringify({ error: "Chat failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
