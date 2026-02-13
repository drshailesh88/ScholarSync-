// Auth utility - returns current user ID or a dev fallback
// When Clerk has placeholder keys, uses a dev user ID

const hasClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

const DEV_USER_ID = "dev_user_001";

export async function getCurrentUserId(): Promise<string> {
  if (hasClerkKeys) {
    const { auth } = await import("@clerk/nextjs/server");
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");
    return userId;
  }
  return DEV_USER_ID;
}

export { DEV_USER_ID };
