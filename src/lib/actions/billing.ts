"use server";

import { db } from "@/lib/db";
import { subscriptions, usageQuotas } from "@/lib/db/schema";
import { users } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

export async function getSubscription() {
  const userId = await getCurrentUserId();
  const [sub] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId));
  return sub || null;
}

export async function getQuotaForPlan(plan: "free" | "basic" | "pro") {
  const [quota] = await db
    .select()
    .from(usageQuotas)
    .where(eq(usageQuotas.plan, plan));
  return quota || null;
}

export async function createSubscription(data: {
  plan: "free" | "basic" | "pro";
  razorpaySubscriptionId?: string;
  razorpayCustomerId?: string;
}) {
  const userId = await getCurrentUserId();

  // Upsert: update if exists, create if not
  const existing = await getSubscription();
  if (existing) {
    const [updated] = await db
      .update(subscriptions)
      .set({
        plan: data.plan,
        razorpaySubscriptionId: data.razorpaySubscriptionId || null,
        razorpayCustomerId: data.razorpayCustomerId || null,
        status: "active",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.id, existing.id))
      .returning();
    return updated;
  }

  const [sub] = await db
    .insert(subscriptions)
    .values({
      userId,
      plan: data.plan,
      razorpaySubscriptionId: data.razorpaySubscriptionId || null,
      razorpayCustomerId: data.razorpayCustomerId || null,
      status: "active",
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })
    .returning();

  // Also update user plan
  await db
    .update(users)
    .set({ plan: data.plan, updated_at: new Date() })
    .where(eq(users.id, userId));

  return sub;
}

export async function cancelSubscription() {
  const userId = await getCurrentUserId();
  const [sub] = await db
    .update(subscriptions)
    .set({ status: "cancelled", updatedAt: new Date() })
    .where(
      and(eq(subscriptions.userId, userId), eq(subscriptions.status, "active"))
    )
    .returning();

  if (sub) {
    await db
      .update(users)
      .set({ plan: "free", updated_at: new Date() })
      .where(eq(users.id, userId));
  }

  return sub || null;
}
