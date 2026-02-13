import { submitScan, getScanResults } from "@/lib/copyleaks";

export async function POST(req: Request) {
  // Check that Copyleaks credentials are configured
  if (!process.env.COPYLEAKS_EMAIL || !process.env.COPYLEAKS_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "Copyleaks not configured. Set COPYLEAKS_EMAIL and COPYLEAKS_API_KEY in .env.local",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { text, action, scanId } = (await req.json()) as {
      text?: string;
      action: "scan" | "results";
      scanId?: string;
    };

    if (action === "scan") {
      if (!text || typeof text !== "string" || text.trim().length < 50) {
        return new Response(
          JSON.stringify({ error: "Text must be at least 50 characters" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const result = await submitScan(text);
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (action === "results") {
      if (!scanId || typeof scanId !== "string") {
        return new Response(
          JSON.stringify({ error: "scanId is required for results" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const result = await getScanResults(scanId);
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ error: "Invalid action. Use 'scan' or 'results'." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Copyleaks API error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: "Copyleaks request failed", details: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
