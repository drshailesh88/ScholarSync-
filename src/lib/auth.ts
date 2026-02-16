// Auth utility - returns current user ID or a dev fallback (dev only)

const hasClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

const DEV_USER_ID = "dev_user_001";
const isDev = process.env.NODE_ENV === "development";

export async function getCurrentUserId(): Promise<string> {
  if (hasClerkKeys) {
    const { auth } = await import("@clerk/nextjs/server");
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");
    return userId;
  }

  // Dev fallback ONLY works in development. In production, missing Clerk keys is a fatal error.
  if (isDev) {
    return DEV_USER_ID;
  }

  throw new Error(
    "Authentication is not configured. Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY."
  );
}

export { DEV_USER_ID };
