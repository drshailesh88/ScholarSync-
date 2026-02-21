/**
 * POST /api/systematic-review/search-strategy
 *
 * Generate a comprehensive PubMed search strategy from a PICO framework.
 * Returns MeSH terms, Boolean string, and estimated result count.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import {
  generateSearchStrategy,
  formatForCochrane,
  formatForEmbase,
} from "@/lib/systematic-review";

const requestSchema = z.object({
  population: z.string().min(1).max(1000),
  intervention: z.string().min(1).max(1000),
  comparison: z.string().max(1000).optional(),
  outcome: z.string().min(1).max(1000),
  databases: z
    .array(z.enum(["pubmed", "cochrane", "embase"]))
    .optional()
    .default(["pubmed"]),
});

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
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid PICO input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { population, intervention, comparison, outcome, databases } =
      parsed.data;

    const strategy = await generateSearchStrategy({
      population,
      intervention,
      comparison,
      outcome,
    });

    // Format for additional databases if requested
    const formattedStrategies: Record<string, string> = {
      pubmed: strategy.fullSearchString,
    };

    if (databases.includes("cochrane")) {
      formattedStrategies.cochrane = formatForCochrane(
        strategy.fullSearchString
      );
    }
    if (databases.includes("embase")) {
      formattedStrategies.embase = formatForEmbase(strategy.fullSearchString);
    }

    return NextResponse.json({
      ...strategy,
      formattedStrategies,
    });
  } catch (error) {
    log.error("Search strategy generation error", error);
    return NextResponse.json(
      { error: "Search strategy generation failed" },
      { status: 500 }
    );
  }
}
