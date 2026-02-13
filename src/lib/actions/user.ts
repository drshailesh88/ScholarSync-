"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUserId, DEV_USER_ID } from "@/lib/auth";

export async function getUser() {
  const userId = await getCurrentUserId();
  const [user] = await db.select().from(users).where(eq(users.id, userId));
  return user || null;
}

export async function ensureUser() {
  const userId = await getCurrentUserId();
  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId));

  if (existing) return existing;

  // Create dev user if doesn't exist (for placeholder Clerk keys)
  const [user] = await db
    .insert(users)
    .values({
      id: userId,
      email:
        userId === DEV_USER_ID
          ? "rahul.sharma@aiims.edu"
          : `${userId}@scholarsync.dev`,
      full_name: userId === DEV_USER_ID ? "Dr. Rahul Sharma" : "ScholarSync User",
      plan: "basic",
      tokens_limit: 50000,
      tokens_used_this_month: 0,
      onboarding_completed: true,
    })
    .returning();

  return user;
}

export async function updateUserProfile(data: {
  full_name?: string;
  specialty?: string;
  country?: string;
  bio?: string;
}) {
  const userId = await getCurrentUserId();
  const [user] = await db
    .update(users)
    .set({ ...data, updated_at: new Date() })
    .where(eq(users.id, userId))
    .returning();
  return user;
}

export async function getUserUsageStats() {
  const userId = await getCurrentUserId();
  const [user] = await db
    .select({
      tokens_used: users.tokens_used_this_month,
      tokens_limit: users.tokens_limit,
      searches_used: users.searches_used_this_month,
      plagiarism_checks: users.plagiarism_checks_used,
      exports_used: users.exports_used_this_month,
      plan: users.plan,
    })
    .from(users)
    .where(eq(users.id, userId));
  return user || null;
}
