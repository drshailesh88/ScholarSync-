import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { verifyPaymentSignature, PLAN_PRICES } from "@/lib/billing/razorpay";
import { createSubscription } from "@/lib/actions/billing";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { auditLog } from "@/lib/security/audit-log";

const VALID_PLANS = Object.keys(PLAN_PRICES).filter((p) => p !== "free") as string[];

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();

    const rateLimitResponse = await checkRateLimit(userId, "billing", RATE_LIMITS.analysis);
    if (rateLimitResponse) return rateLimitResponse;

    const { orderId, paymentId, signature, plan } = await req.json();

    if (!orderId || !paymentId || !signature || !plan) {
      return NextResponse.json(
        { error: "Missing required fields: orderId, paymentId, signature, plan" },
        { status: 400 }
      );
    }

    if (!VALID_PLANS.includes(plan)) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    const isValid = await verifyPaymentSignature(orderId, paymentId, signature);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Create/update subscription in database
    const subscription = await createSubscription({
      plan,
      razorpaySubscriptionId: paymentId,
      razorpayCustomerId: orderId,
    });

    auditLog({
      action: "billing.payment_verified",
      userId,
      resourceType: "subscription",
      resourceId: paymentId,
      metadata: { plan, orderId },
    });

    return NextResponse.json({
      success: true,
      subscription: {
        plan: subscription.plan,
        status: subscription.status,
        currentPeriodEnd: subscription.currentPeriodEnd,
      },
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
