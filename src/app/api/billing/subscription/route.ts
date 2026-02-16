import { NextResponse } from "next/server";
import { getSubscription } from "@/lib/actions/billing";
import { getUserUsageStats } from "@/lib/actions/user";

export async function GET() {
  try {
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
