import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { logger } from "@/lib/logger";

// ---------------------------------------------------------------------------
// Svix signature verification for Clerk webhooks
// ---------------------------------------------------------------------------
function verifyWebhookSignature(
  body: string,
  headers: Headers
): boolean {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("CLERK_WEBHOOK_SECRET is not set");
  }

  const svixId = headers.get("svix-id");
  const svixTimestamp = headers.get("svix-timestamp");
  const svixSignature = headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return false;
  }

  // Validate timestamp is within 5 minutes to prevent replay attacks
  const timestampSec = parseInt(svixTimestamp, 10);
  if (isNaN(timestampSec)) return false;
  const nowSec = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSec - timestampSec) > 300) {
    return false;
  }

  // Decode the secret: strip "whsec_" prefix and base64-decode
  const secretBytes = Buffer.from(
    secret.startsWith("whsec_") ? secret.slice(6) : secret,
    "base64"
  );

  // Construct signed content and compute HMAC-SHA256
  const signedContent = `${svixId}.${svixTimestamp}.${body}`;
  const expectedSignature = crypto
    .createHmac("sha256", secretBytes)
    .update(signedContent)
    .digest();

  // svix-signature header may contain multiple signatures separated by spaces
  // Each is in the form "v1,<base64>"
  const signatures = svixSignature.split(" ");
  for (const sig of signatures) {
    const parts = sig.split(",");
    if (parts[0] !== "v1" || !parts[1]) continue;
    const sigBytes = Buffer.from(parts[1], "base64");
    if (
      sigBytes.length === expectedSignature.length &&
      crypto.timingSafeEqual(sigBytes, expectedSignature)
    ) {
      return true;
    }
  }

  return false;
}

// Clerk webhook handler - creates/updates user in DB on Clerk events
export async function POST(req: NextRequest) {
  const log = logger.withRequestId();

  // Read the raw body for signature verification
  const rawBody = await req.text();

  // Verify webhook signature
  try {
    if (!verifyWebhookSignature(rawBody, req.headers)) {
      log.error("Clerk webhook signature verification failed");
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }
  } catch (err) {
    log.error("Clerk webhook verification error", err);
    return NextResponse.json(
      { error: "Webhook verification error" },
      { status: 401 }
    );
  }

  try {
    const payload = JSON.parse(rawBody);
    const { type, data } = payload;

    if (type === "user.created" || type === "user.updated") {
      const email =
        data.email_addresses?.[0]?.email_address || `${data.id}@unknown.com`;
      const fullName = [data.first_name, data.last_name]
        .filter(Boolean)
        .join(" ");

      await db
        .insert(users)
        .values({
          id: data.id,
          email,
          full_name: fullName || null,
          avatar_url: data.image_url || null,
        })
        .onConflictDoUpdate({
          target: users.id,
          set: {
            email,
            full_name: fullName || undefined,
            avatar_url: data.image_url || undefined,
            updated_at: new Date(),
          },
        });
    }

    if (type === "user.deleted") {
      const { eq } = await import("drizzle-orm");
      await db
        .update(users)
        .set({ deleted_at: new Date() })
        .where(eq(users.id, data.id));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    log.error("Clerk webhook error", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
