import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { db } from "@/lib/db";
import { users, integrityChecks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { runIntegrityCheck } from "@/lib/integrity";
import type { IntegrityCheckInput } from "@/lib/integrity/types";

const requestSchema = z.object({
  text: z
    .string()
    .min(50, "Text must be at least 50 characters")
    .max(50000, "Text must not exceed 50000 characters"),
  mode: z
    .enum(["full", "ai_detection", "plagiarism", "citation_audit"])
    .optional()
    .default("full"),
  sources: z
    .array(
      z.object({
        title: z.string().optional(),
        doi: z.string().optional(),
        pmid: z.string().optional(),
        authors: z.array(z.string()).optional(),
        year: z.number().optional(),
      }),
    )
    .optional(),
  projectId: z.number().int().positive().optional(),
  documentId: z.number().int().positive().optional(),
});

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    // Authentication
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return new Response(
        JSON.stringify({ error: "Not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    // Rate limiting
    const rateLimitResponse = await checkRateLimit(
      userId,
      "integrity-check",
      RATE_LIMITS.analysis,
    );
    if (rateLimitResponse) return rateLimitResponse;

    // Parse and validate request body
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid request",
          details: parsed.error.flatten().fieldErrors,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Get user plan for tier gating
    const [user] = await db
      .select({ plan: users.plan })
      .from(users)
      .where(eq(users.id, userId));

    const plan = (user?.plan ?? "free") as IntegrityCheckInput["plan"];

    // Run the unified integrity check
    const result = await runIntegrityCheck({
      text: parsed.data.text,
      plan,
      mode: parsed.data.mode,
      sources: parsed.data.sources,
      userId,
    });

    log.info("Integrity check completed", {
      userId,
      plan,
      mode: parsed.data.mode,
      tier: result.tier,
      humanScore: result.aiDetection.humanScore,
      engine: result.aiDetection.engine,
    });

    // Always persist results to database
    try {
      const wordCount = parsed.data.text.split(/\s+/).filter(Boolean).length;
      await db.insert(integrityChecks).values({
        userId,
        projectId: parsed.data.projectId ?? null,
        documentId: parsed.data.documentId ?? null,
        checkType: result.plagiarism ? "both" : "ai_detection",
        contentChecked: parsed.data.text.slice(0, 5000),
        wordCount,
        plagiarismScore: result.plagiarism?.similarityScore ?? null,
        plagiarismMatches: result.plagiarism?.matches ?? null,
        plagiarismEngine: result.plagiarism?.engine ?? null,
        aiScore: result.aiDetection.aiScore,
        aiDetectionDetails: {
          humanScore: result.aiDetection.humanScore,
          overallRisk: result.aiDetection.overallRisk,
          engine: result.aiDetection.engine,
          stats: result.aiDetection.stats,
          paragraphCount: result.aiDetection.paragraphs.length,
        },
        aiDetectionEngine: result.aiDetection.engine,
        flaggedPassages: result.aiDetection.paragraphs
          .filter((p) => p.humanProbability < 50)
          .map((p) => ({
            excerpt: p.excerpt,
            humanProbability: p.humanProbability,
            flags: p.flags,
          })),
        sourceMatches: result.plagiarism?.matches ?? null,
      });
    } catch (dbErr) {
      // Non-fatal — still return results even if DB save fails
      log.error("Failed to persist integrity check results", dbErr);
    }

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    log.error("Integrity check failed", error);
    return new Response(
      JSON.stringify({ error: "Failed to analyze text" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
