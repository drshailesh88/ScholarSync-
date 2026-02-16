import { NextResponse } from "next/server";
import { z } from "zod";
import { streamText } from "ai";
import { getModel, isAIConfigured } from "@/lib/ai/models";
import { db } from "@/lib/db";
import { papers } from "@/lib/db/schema";
import { inArray } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const synthesisModesEnum = z.enum(["summary", "compare", "gaps", "methodology"]);
type SynthesisMode = z.infer<typeof synthesisModesEnum>;

const synthesizeSchema = z.object({
  paperIds: z
    .array(z.number().int().positive())
    .min(1, "paperIds must contain at least one paper ID.")
    .max(50, "paperIds must contain at most 50 items."),
  mode: synthesisModesEnum,
  prompt: z
    .string()
    .max(5000, "prompt must be at most 5000 characters.")
    .optional(),
});

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
  const log = logger.withRequestId();

  try {
    // --- Authentication ---
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // --- Rate limiting ---
    const rateLimitResponse = await checkRateLimit(userId, "synthesize", RATE_LIMITS.ai);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // --- AI configuration check ---
    if (!isAIConfigured()) {
      return NextResponse.json(
        { error: "AI service is not configured." },
        { status: 503 }
      );
    }

    // --- Input validation ---
    const body: unknown = await req.json();
    const parsed = synthesizeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e: { message: string }) => e.message).join("; ") },
        { status: 400 }
      );
    }

    const { paperIds, prompt, mode } = parsed.data;

    // --- Fetch papers ---
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

    // --- Build prompt & stream ---
    const paperContext = buildPaperContext(fetchedPapers);
    const systemPrompt = getSystemPrompt(mode);

    let userPrompt = `Here are ${fetchedPapers.length} papers for analysis:\n\n${paperContext}`;

    if (prompt) {
      userPrompt += `\n\nAdditional instructions from the researcher:\n${prompt}`;
    }

    log.info("Synthesize request", { userId, mode, paperCount: fetchedPapers.length });

    const result = streamText({
      model: getModel(),
      system: systemPrompt,
      prompt: userPrompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    log.error("Synthesize API error", error);
    return NextResponse.json(
      { error: "Synthesis failed. Please try again." },
      { status: 500 }
    );
  }
}
