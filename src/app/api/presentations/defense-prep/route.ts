import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel, traceGeneration } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const defensePrepSchema = z.object({
  deckId: z.number().int().positive(),
  slides: z
    .array(
      z.object({
        id: z.number().int(),
        title: z.string().nullish(),
        contentBlocks: z.array(z.any()).optional(),
        speakerNotes: z.string().nullish(),
      })
    )
    .min(1)
    .max(100),
  audienceType: z.string().min(1),
  difficulty: z.enum(["friendly", "moderate", "tough", "adversarial"]),
  focusAreas: z.array(
    z.enum(["methodology", "statistics", "interpretation", "clinical_relevance", "limitations", "theory"])
  ).optional(),
  conversationHistory: z
    .array(
      z.object({
        role: z.string(),
        content: z.string(),
      })
    )
    .optional(),
});

const REVIEWER_ROLES: Record<string, string> = {
  thesis_defense: "a thesis committee member at a top research university. You have decades of experience in this field and have supervised many doctoral candidates.",
  conference: "a conference session chair and senior researcher. You ask pointed questions to help clarify the contribution and its significance to the field.",
  journal_club: "a journal club moderator who is an experienced clinician-scientist. You probe for critical appraisal skills and evidence interpretation.",
  grant_presentation: "a grant review panel member evaluating funding applications. You focus on innovation, feasibility, and significance of the proposed research.",
  patient_case: "an attending physician during clinical rounds. You ask about differential diagnoses, clinical reasoning, and evidence-based management.",
  grand_rounds: "an attending physician at departmental grand rounds. You probe for depth of understanding, clinical applicability, and teaching quality.",
  classroom: "a senior faculty member evaluating a student presentation. You are constructive but thorough in your assessment.",
  general: "an expert reviewer evaluating an academic presentation. You ask probing questions about methodology, evidence, and conclusions.",
};

const DIFFICULTY_INSTRUCTIONS: Record<string, string> = {
  friendly:
    "Be constructive and encouraging. Highlight strengths before asking about potential areas for improvement. Frame questions gently and offer guidance.",
  moderate:
    "Be balanced and direct but fair. Ask clear, focused questions that test understanding. Mix positive feedback with pointed queries about methodology and interpretation.",
  tough:
    "Be challenging and demanding. Probe for weaknesses in methodology, statistical analysis, and interpretation. Ask for justification of every major decision. Do not accept vague answers.",
  adversarial:
    "Play devil's advocate aggressively. Challenge fundamental assumptions. Stress-test every claim with counterarguments. Question whether the study design can actually support the conclusions. Push for alternative explanations of the findings.",
};

function getDefensePrepSystemPrompt(
  audienceType: string,
  difficulty: string,
  focusAreas: string[]
): string {
  const role = REVIEWER_ROLES[audienceType] ?? REVIEWER_ROLES.general;
  const difficultyInstr = DIFFICULTY_INSTRUCTIONS[difficulty] ?? DIFFICULTY_INSTRUCTIONS.moderate;
  const focusInstr =
    focusAreas.length > 0
      ? `Focus your questions primarily on these areas: ${focusAreas.join(", ")}.`
      : "Cover a broad range of topics including methodology, results, interpretation, and limitations.";

  return `You are roleplaying as ${role}

DIFFICULTY LEVEL: ${difficulty}
${difficultyInstr}

${focusInstr}

You are reviewing an academic presentation and asking questions as part of a defense preparation exercise. Based on the presentation content and the conversation history, generate your next question.

RULES:
1. Ask one clear, specific question at a time.
2. Reference specific content from the slides when possible.
3. Each question should test a different aspect of the presenter's knowledge.
4. Provide a suggested answer that demonstrates what a strong response would include.
5. Identify which slide your question relates to most closely (by index, 0-based).
6. Categorize your question (methodology, statistics, interpretation, clinical_relevance, limitations, theory, or general).
7. Suggest 2-3 follow-up questions that could naturally arise.
8. If conversation history is provided, respond to the presenter's last answer before asking your next question. Evaluate their response briefly (1-2 sentences).

RESPONSE FORMAT — Return valid JSON only, no markdown fences:
{
  "question": "<your question>",
  "category": "<category>",
  "difficulty": "<easy|moderate|hard>",
  "suggestedAnswer": "<model answer>",
  "relatedSlideIndex": <0-based slide index>,
  "followUpQuestions": ["<follow-up 1>", "<follow-up 2>"],
  "evaluation": "<brief evaluation of presenter's last answer, or null if this is the first question>"
}`;
}

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    // Authentication
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limiting
    const rateLimitResponse = await checkRateLimit(userId, "presentations", RATE_LIMITS.ai);
    if (rateLimitResponse) return rateLimitResponse;

    // Validation
    const parseResult = defensePrepSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const body = parseResult.data;

    const systemPrompt = getDefensePrepSystemPrompt(
      body.audienceType,
      body.difficulty,
      body.focusAreas ?? []
    );

    const slideSummary = body.slides
      .map(
        (s, i) =>
          `Slide ${i} (ID ${s.id}): "${s.title ?? "Untitled"}"\n` +
          `Content: ${JSON.stringify(s.contentBlocks ?? [])}\n` +
          `Speaker Notes: ${s.speakerNotes ?? "None"}`
      )
      .join("\n\n");

    let conversationContext = "";
    if (body.conversationHistory && body.conversationHistory.length > 0) {
      conversationContext =
        "\n\nConversation so far:\n" +
        body.conversationHistory
          .map((msg) => `${msg.role === "reviewer" ? "Reviewer" : "Presenter"}: ${msg.content}`)
          .join("\n");
    }

    const trace = traceGeneration({ tier: "standard", modelId: "claude-sonnet-4-20250514", feature: "defense-prep", userId });
    const { text, usage } = await generateText({
      model: getModel(),
      system: systemPrompt,
      prompt: `Here is the presentation (${body.slides.length} slides):\n\n${slideSummary}${conversationContext}\n\nGenerate your next question.`,
    });
    trace.end(usage);

    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const result = JSON.parse(cleanText);

    return NextResponse.json(result);
  } catch (error) {
    log.error("Defense prep error", error);
    return NextResponse.json(
      { error: "Defense prep failed" },
      { status: 500 }
    );
  }
}
