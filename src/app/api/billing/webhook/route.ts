import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
    }

    // Verify webhook signature
    const signature = req.headers.get("x-razorpay-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    const body = await req.text();
    const crypto = await import("crypto");
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

    // Use timing-safe comparison to prevent timing attacks
    let isValid = false;
    try {
      isValid = crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "hex"),
        Buffer.from(signature, "hex")
      );
    } catch {
      isValid = false;
    }

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);
    const eventType = event.event;

    switch (eventType) {
      case "payment.captured": {
        // Payment was successful — subscription already created via verify-payment
        break;
      }
      case "subscription.cancelled":
      case "subscription.halted": {
        const rzpSubId = event.payload?.subscription?.entity?.id;
        if (rzpSubId) {
          const [sub] = await db
            .update(subscriptions)
            .set({ status: "cancelled", updatedAt: new Date() })
            .where(eq(subscriptions.razorpaySubscriptionId, rzpSubId))
            .returning();

          if (sub) {
            await db
              .update(users)
              .set({ plan: "free", updated_at: new Date() })
              .where(eq(users.id, sub.userId));
          }
        }
        break;
      }
      default:
        // Ignore unhandled events
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
