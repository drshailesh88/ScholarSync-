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
  research_interests?: string[];
  preferred_language?: string;
  default_citation_style?: string;
  orcid_id?: string;
}) {
  const userId = await getCurrentUserId();

  // Build a clean update payload so we only SET columns that were provided
  const payload: Record<string, unknown> = { updated_at: new Date() };
  if (data.full_name !== undefined) payload.full_name = data.full_name;
  if (data.specialty !== undefined) payload.specialty = data.specialty;
  if (data.country !== undefined) payload.country = data.country;
  if (data.bio !== undefined) payload.bio = data.bio;
  if (data.research_interests !== undefined) payload.research_interests = data.research_interests;
  if (data.preferred_language !== undefined) payload.preferred_language = data.preferred_language;
  if (data.default_citation_style !== undefined) payload.default_citation_style = data.default_citation_style;
  if (data.orcid_id !== undefined) payload.orcid_id = data.orcid_id;

  const [user] = await db
    .update(users)
    .set(payload)
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
