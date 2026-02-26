/**
 * POST /api/systematic-review/press
 *
 * Run PRESS 2015 peer review validation on a project's search strategy.
 * Input: { projectId, searchStrategy, pico, databases }
 * Returns: PRESSValidation
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { db } from "@/lib/db";
import { systematicReviewConfig } from "@/lib/db/schema";
import { validateSearchStrategy } from "@/lib/systematic-review/press-validation";

// ---------------------------------------------------------------------------
// Input schema
// ---------------------------------------------------------------------------

const picoSchema = z.object({
  population: z.string().min(1),
  intervention: z.string().min(1),
  comparison: z.string().default(""),
  outcome: z.string().min(1),
});

const pressRequestSchema = z.object({
  projectId: z.number().int().positive(),
  searchStrategy: z.string().min(1).optional(),
  pico: picoSchema.optional(),
  databases: z.array(z.string()).min(1).default(["PubMed"]),
});

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    const userId = await getCurrentUserId();
    const rateLimitResponse = await checkRateLimit(
      userId,
      "systematic-review",
      RATE_LIMITS.ai
    );
    if (rateLimitResponse) return rateLimitResponse;

    const body = await req.json();
    const parsed = pressRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, databases } = parsed.data;
    let { searchStrategy, pico } = parsed.data;

    // If searchStrategy or pico not provided, load from project config
    if (!searchStrategy || !pico) {
      const [config] = await db
        .select()
        .from(systematicReviewConfig)
        .where(eq(systematicReviewConfig.projectId, projectId))
        .limit(1);

      if (!config) {
        return NextResponse.json(
          {
            error:
              "No systematic review config found for this project. Generate a search strategy first.",
          },
          { status: 404 }
        );
      }

      // Resolve search strategy from config if not supplied
      if (!searchStrategy) {
        const storedStrategy = config.searchStrategy as {
          fullSearchString?: string;
        } | null;

        if (!storedStrategy?.fullSearchString) {
          return NextResponse.json(
            {
              error:
                "No search strategy found for this project. Generate one using the Search Strategy tool first.",
            },
            { status: 422 }
          );
        }

        searchStrategy = storedStrategy.fullSearchString;
      }

      // Resolve PICO from config if not supplied
      if (!pico) {
        const storedPico = config.pico as {
          population?: string;
          intervention?: string;
          comparison?: string;
          outcome?: string;
        } | null;

        if (
          !storedPico?.population ||
          !storedPico?.intervention ||
          !storedPico?.outcome
        ) {
          return NextResponse.json(
            {
              error:
                "No PICO framework found for this project. Configure the project PICO first.",
            },
            { status: 422 }
          );
        }

        pico = {
          population: storedPico.population,
          intervention: storedPico.intervention,
          comparison: storedPico.comparison ?? "",
          outcome: storedPico.outcome,
        };
      }
    }

    const validation = await validateSearchStrategy(
      searchStrategy,
      pico,
      databases
    );

    return NextResponse.json(validation);
  } catch (error) {
    log.error("PRESS validation error", error);
    return NextResponse.json(
      { error: "PRESS validation failed" },
      { status: 500 }
    );
  }
}
