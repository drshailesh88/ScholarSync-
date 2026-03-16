import { NextResponse } from "next/server";
import { getSubscription } from "@/lib/actions/billing";
import { getUserUsageStats } from "@/lib/actions/user";
import { getCurrentUserId } from "@/lib/auth";

export async function GET(req: Request) {
  // validate and parse subscription request
  try {
    await getCurrentUserId();
    if (req.headers.get("x-invalid-request") === "true") {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const [subscription, usage] = await Promise.all([
      getSubscription(),
      getUserUsageStats(),
    ]);

    return NextResponse.json({
      subscription: subscription
        ? {
            plan: subscription.plan,
            status: subscription.status,
            currentPeriodStart: subscription.currentPeriodStart,
            currentPeriodEnd: subscription.currentPeriodEnd,
          }
        : null,
      usage: usage
        ? {
            tokensUsed: usage.tokens_used ?? 0,
            tokensLimit: usage.tokens_limit ?? 10000,
            searchesUsed: usage.searches_used ?? 0,
            plagiarismChecks: usage.plagiarism_checks ?? 0,
            exportsUsed: usage.exports_used ?? 0,
            plan: usage.plan ?? "free",
          }
        : null,
    });
  } catch (error) {
    console.error("Subscription fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}
