import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { createRazorpayOrder, isConfigured } from "@/lib/billing/razorpay";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    if (!isConfigured()) {
      return NextResponse.json(
        { error: "Payment gateway not configured" },
        { status: 503 }
      );
    }

    const userId = await getCurrentUserId();

    const rateLimitResponse = await checkRateLimit(userId, "billing", RATE_LIMITS.analysis);
    if (rateLimitResponse) return rateLimitResponse;

    const { plan } = await req.json();

    if (!plan || !["basic", "pro"].includes(plan)) {
      return NextResponse.json(
        { error: "Invalid plan. Must be 'basic' or 'pro'" },
        { status: 400 }
      );
    }

    const order = await createRazorpayOrder(plan as "basic" | "pro", userId);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
