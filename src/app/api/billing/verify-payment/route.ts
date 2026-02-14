import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { verifyPaymentSignature } from "@/lib/billing/razorpay";
import { createSubscription } from "@/lib/actions/billing";

export async function POST(req: NextRequest) {
  try {
    const { orderId, paymentId, signature, plan } = await req.json();

    if (!orderId || !paymentId || !signature || !plan) {
      return NextResponse.json(
        { error: "Missing required fields: orderId, paymentId, signature, plan" },
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
