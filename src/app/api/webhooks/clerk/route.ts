import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { logger } from "@/lib/logger";

const clerkWebhookSchema = z.object({
  type: z.enum(["user.created", "user.updated", "user.deleted"]),
  data: z
    .object({
      id: z.string().trim().min(1),
      email_addresses: z
        .array(
          z.object({
            email_address: z.string().email(),
          })
        )
        .optional(),
      first_name: z.string().nullable().optional(),
      last_name: z.string().nullable().optional(),
      image_url: z.string().url().nullable().optional(),
    })
    .passthrough(),
});

// Clerk webhook handler - creates/updates user in DB on Clerk events
export async function POST(req: NextRequest) {
  const log = logger.withRequestId();

  try {
    const payload = await req.json();
    if (
      !payload ||
      typeof payload !== "object" ||
      !("type" in payload) ||
      !("data" in payload) ||
      !payload.type ||
      !payload.data
    ) {
      return NextResponse.json({ error: "Missing type or data" }, { status: 400 });
    }

    const parseResult = clerkWebhookSchema.safeParse(payload);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid webhook payload", issues: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { type, data } = parseResult.data;

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
