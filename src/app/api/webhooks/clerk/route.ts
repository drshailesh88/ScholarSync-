import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { logger } from "@/lib/logger";

// Clerk webhook handler - creates/updates user in DB on Clerk events
// In production, verify webhook signature with svix
export async function POST(req: NextRequest) {
  const log = logger.withRequestId();

  try {
    const payload = await req.json();
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
