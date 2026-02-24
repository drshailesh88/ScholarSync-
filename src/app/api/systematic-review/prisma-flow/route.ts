/**
 * GET  /api/systematic-review/prisma-flow?projectId=123
 * POST /api/systematic-review/prisma-flow
 *
 * Compute and return PRISMA 2020 flow diagram data + SVG.
 * POST updates a specific flow stage.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { logger } from "@/lib/logger";
import {
  computePRISMAFlow,
  updatePRISMAFlowStage,
  generatePRISMAFlowSVG,
  generatePRISMAChecklist,
} from "@/lib/systematic-review";

export async function GET(req: Request) {
  const log = logger.withRequestId();

  try {
    await getCurrentUserId();

    const { searchParams } = new URL(req.url);
    const projectId = parseInt(searchParams.get("projectId") || "0", 10);
    const format = searchParams.get("format") || "json"; // "json" | "svg"

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    const flowData = await computePRISMAFlow(projectId);

    if (format === "svg") {
      const svg = generatePRISMAFlowSVG(flowData);
      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "no-cache",
        },
      });
    }

    const checklist = generatePRISMAChecklist(flowData, {
      title: "Systematic Review", // Would come from project
    });

    return NextResponse.json({
      flowData,
      svg: generatePRISMAFlowSVG(flowData),
      checklist,
    });
  } catch (error) {
    log.error("PRISMA flow error", error);
    return NextResponse.json(
      { error: "PRISMA flow generation failed" },
      { status: 500 }
    );
  }
}

const updateSchema = z.object({
  projectId: z.number().int().positive(),
  stage: z.string().min(1),
  source: z.string().optional(),
  recordCount: z.number().int().min(0).optional(),
  excludedCount: z.number().int().min(0).optional(),
  exclusionReasons: z.record(z.string(), z.number()).optional(),
});

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    await getCurrentUserId();

    const body = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, stage, ...data } = parsed.data;
    await updatePRISMAFlowStage(projectId, stage, data);

    // Return updated flow
    const flowData = await computePRISMAFlow(projectId);
    return NextResponse.json({
      flowData,
      svg: generatePRISMAFlowSVG(flowData),
    });
  } catch (error) {
    log.error("PRISMA flow update error", error);
    return NextResponse.json(
      { error: "PRISMA flow update failed" },
      { status: 500 }
    );
  }
}
