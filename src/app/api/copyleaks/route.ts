import { submitScan, getScanResults } from "@/lib/copyleaks";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { z } from "zod";

const requestSchema = z.object({
  action: z.enum(["scan", "results"]),
  text: z
    .string()
    .min(50, "Text must be at least 50 characters")
    .max(50000, "Text must not exceed 50000 characters")
    .optional(),
  scanId: z.string().optional(),
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
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Rate limiting
    const rateLimitResponse = await checkRateLimit(
      userId,
      "copyleaks",
      RATE_LIMITS.analysis
    );
    if (rateLimitResponse) return rateLimitResponse;

    // Check that Copyleaks credentials are configured
    if (!process.env.COPYLEAKS_EMAIL || !process.env.COPYLEAKS_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "Plagiarism checking service is not configured. Please contact your administrator.",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid request",
          details: parsed.error.flatten().fieldErrors,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { action, text, scanId } = parsed.data;

    if (action === "scan") {
      if (!text) {
        return new Response(
          JSON.stringify({ error: "Text is required for scan action" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const result = await submitScan(text);
      log.info("Copyleaks scan submitted", { userId });
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (action === "results") {
      if (!scanId) {
        return new Response(
          JSON.stringify({ error: "scanId is required for results action" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const result = await getScanResults(scanId);
      log.info("Copyleaks results retrieved", { userId, scanId });
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ error: "Invalid action. Use 'scan' or 'results'." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    log.error("Copyleaks API request failed", error);
    return new Response(
      JSON.stringify({ error: "Copyleaks request failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
