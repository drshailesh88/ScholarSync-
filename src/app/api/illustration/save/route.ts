import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

// ---------------------------------------------------------------------------
// POST /api/illustration/save
// Saves an illustration to the database
// Note: This route depends on the illustrations table created in Phase 8
// ---------------------------------------------------------------------------

const saveSchema = z.object({
  title: z.string().min(1).max(500).default("Untitled Illustration"),
  description: z.string().optional(),
  svgContent: z.string().optional(),
  canvasJson: z.any().optional(), // Fabric.js canvas state as JSON
  mermaidSyntax: z.string().optional(),
  domain: z.string().optional(),
  sourceBackend: z.string().optional(),
  sourcePrompt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitResponse = await checkRateLimit(userId, "illustrations", RATE_LIMITS.write);
    if (rateLimitResponse) return rateLimitResponse;

    const parseResult = saveSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // TODO: Implement actual database insert once illustrations table exists (Phase 8)
    // For now, return a success response with mock data
    log.info("Illustration save requested (table not yet created)", {
      userId,
      title: data.title,
      domain: data.domain,
    });

    return NextResponse.json({
      id: Math.floor(Math.random() * 10000), // Mock ID
      userId,
      title: data.title,
      description: data.description,
      svgContent: data.svgContent,
      canvasJson: data.canvasJson,
      mermaidSyntax: data.mermaidSyntax,
      domain: data.domain,
      sourceBackend: data.sourceBackend,
      sourcePrompt: data.sourcePrompt,
      width: data.width,
      height: data.height,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Note: This is a placeholder response until Phase 8 completes
    });
  } catch (error) {
    log.error("Illustration save error", error);
    return NextResponse.json(
      { error: "Illustration save failed" },
      { status: 500 }
    );
  }
}
