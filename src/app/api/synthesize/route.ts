import { NextResponse } from "next/server";
import { streamText } from "ai";
import { getModel, isAIConfigured, requiredKeyName } from "@/lib/ai/models";
import { db } from "@/lib/db";
import { papers } from "@/lib/db/schema";
import { inArray } from "drizzle-orm";

type SynthesisMode = "summary" | "compare" | "gaps" | "methodology";

interface SynthesizeRequest {
  paperIds: number[];
  prompt?: string;
  mode: SynthesisMode;
}

interface PaperAuthor {
  name?: string;
  [key: string]: unknown;
}

function formatAuthors(authors: unknown): string {
  if (!authors) return "Unknown authors";
  if (!Array.isArray(authors)) return "Unknown authors";

  return (authors as PaperAuthor[])
    .map((a) => a.name ?? "Unknown")
    .join(", ");
}

function buildPaperContext(
  fetchedPapers: {
    id: number;
    title: string;
    authors: unknown;
    abstract: string | null;
    tldr: string | null;
    journal: string | null;
    year: number | null;
  }[]
): string {
  return fetchedPapers
    .map((p, i) => {
      const lines: string[] = [
        `--- Paper ${i + 1} ---`,
        `Title: ${p.title}`,
        `Authors: ${formatAuthors(p.authors)}`,
      ];

      if (p.journal) lines.push(`Journal: ${p.journal}`);
      if (p.year) lines.push(`Year: ${p.year}`);
      if (p.abstract) {
        lines.push(`Abstract: ${p.abstract}`);
      } else {
        lines.push(`Abstract: Not available`);
      }
      if (p.tldr) lines.push(`TLDR: ${p.tldr}`);

      return lines.join("\n");
    })
    .join("\n\n");
}

function getSystemPrompt(mode: SynthesisMode): string {
  const base =
    "You are an expert academic research assistant specializing in literature synthesis for medical and scientific research. " +
    "You write in clear, precise academic English. Always reference specific papers by their title when making claims.";

  switch (mode) {
    case "summary":
      return (
        base +
        "\n\nYour task is to synthesize the key findings across the provided papers into a coherent narrative. " +
        "Identify overarching themes, highlight the most significant results, and explain how the papers relate to each other. " +
        "Organize findings thematically rather than paper-by-paper. " +
        "Note areas of agreement between studies and flag any notable differences in conclusions."
      );

    case "compare":
      return (
        base +
        "\n\nYour task is to compare and contrast the methodologies and results across the provided papers. " +
        "Create a structured comparison covering: study designs, sample sizes, key variables, analytical approaches, and primary outcomes. " +
        "Highlight where studies agree or disagree in their findings. " +
        "Assess the relative strengths and limitations of each approach."
      );

    case "gaps":
      return (
        base +
        "\n\nYour task is to identify research gaps and contradictions across the provided papers. " +
        "Look for: unanswered questions, conflicting findings between studies, methodological limitations that future research should address, " +
        "populations or variables not yet studied, and areas where evidence is weak or inconsistent. " +
        "Propose specific research questions that could address the identified gaps."
      );

    case "methodology":
      return (
        base +
        "\n\nYour task is to analyze and compare the research methods used across the provided papers. " +
        "Evaluate: study designs, sampling strategies, data collection instruments, statistical analyses, and validity measures. " +
        "Identify best practices and methodological innovations. " +
        "Discuss the appropriateness of each methodology for its research question and highlight any methodological weaknesses."
      );
  }
}

export async function POST(req: Request) {
  if (!isAIConfigured()) {
    return NextResponse.json(
      {
        error: `API key not configured. Add ${requiredKeyName()} to .env.local to enable synthesis.`,
      },
      { status: 503 }
    );
  }

  try {
    const body = (await req.json()) as SynthesizeRequest;
    const { paperIds, prompt, mode } = body;

    if (!paperIds || !Array.isArray(paperIds) || paperIds.length === 0) {
      return NextResponse.json(
        { error: "paperIds must be a non-empty array of paper IDs." },
        { status: 400 }
      );
    }

    const validModes: SynthesisMode[] = [
      "summary",
      "compare",
      "gaps",
      "methodology",
    ];
    if (!mode || !validModes.includes(mode)) {
      return NextResponse.json(
        {
          error: `mode must be one of: ${validModes.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const fetchedPapers = await db
      .select({
        id: papers.id,
        title: papers.title,
        authors: papers.authors,
        abstract: papers.abstract,
        tldr: papers.tldr,
        journal: papers.journal,
        year: papers.year,
      })
      .from(papers)
      .where(inArray(papers.id, paperIds));

    if (fetchedPapers.length === 0) {
      return NextResponse.json(
        { error: "No papers found for the provided IDs." },
        { status: 404 }
      );
    }

    const paperContext = buildPaperContext(fetchedPapers);
    const systemPrompt = getSystemPrompt(mode);

    let userPrompt = `Here are ${fetchedPapers.length} papers for analysis:\n\n${paperContext}`;

    if (prompt) {
      userPrompt += `\n\nAdditional instructions from the researcher:\n${prompt}`;
    }

    const result = streamText({
      model: getModel(),
      system: systemPrompt,
      prompt: userPrompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Synthesize API error:", error);
    return NextResponse.json(
      { error: "Synthesis failed. Please try again." },
      { status: 500 }
    );
  }
}
