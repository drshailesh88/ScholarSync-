import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { createRazorpayOrder, isConfigured, PLAN_PRICES } from "@/lib/billing/razorpay";

export async function POST(req: NextRequest) {
  try {
    if (!isConfigured()) {
      return NextResponse.json(
        { error: "Payment gateway not configured" },
        { status: 503 }
      );
    }

    const { plan } = await req.json();

    if (!plan || !["basic", "pro"].includes(plan)) {
      return NextResponse.json(
        { error: "Invalid plan. Must be 'basic' or 'pro'" },
        { status: 400 }
      );
    }

    const userId = await getCurrentUserId();
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
