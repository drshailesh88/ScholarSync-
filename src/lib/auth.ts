// Auth utility — uses @clerk/backend directly (vinext + Next.js compatible)

import { createClerkClient, verifyToken } from "@clerk/backend";
import { cookies } from "next/headers";

const hasClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

// Module-private — never exposed to other modules directly
const DEV_USER_ID = "dev_user_001";
const isDev = process.env.NODE_ENV === "development";

// Startup-time warning for unexpected NODE_ENV values
if (
  process.env.NODE_ENV !== "production" &&
  process.env.NODE_ENV !== "development"
) {
  console.warn(
    `[auth] WARNING: NODE_ENV is "${process.env.NODE_ENV}" — expected "production" or "development". ` +
      "Dev fallbacks will be disabled."
  );
}

// Singleton Clerk client for server-side usage
let _clerkClient: ReturnType<typeof createClerkClient> | null = null;

export function getClerkClient() {
  if (!_clerkClient) {
    _clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY!,
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
    });
  }
  return _clerkClient;
}

// Read the Clerk session token from cookies or return null
async function getSessionToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("__session")?.value ?? null;
  } catch {
    // cookies() throws outside of a request context (e.g. build time)
    return null;
  }
}

export async function getCurrentUserId(): Promise<string> {
  // In production, NEVER fall back to DEV_USER_ID — always require real auth
  const isProduction = process.env.NODE_ENV === "production";

  if (hasClerkKeys) {
    const token = await getSessionToken();
    if (token) {
      try {
        const decoded = await verifyToken(token, {
          secretKey: process.env.CLERK_SECRET_KEY!,
        });
        if (decoded.sub) return decoded.sub;
      } catch {
        // Token invalid or expired — fall through
      }
    }

    if (isProduction) {
      throw new Error("Not authenticated");
    }

    // In dev, fall back to a synthetic user when no session cookie is present
    // (e.g. curl, server-side calls, preview environments)
    if (isDev) return DEV_USER_ID;

    throw new Error("Not authenticated");
  }

  if (isProduction) {
    throw new Error(
      "Authentication is not configured. Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY."
    );
  }

  // Dev fallback ONLY works in development (NODE_ENV === "development" strictly).
  if (isDev) {
    return DEV_USER_ID;
  }

  throw new Error(
    "Authentication is not configured. Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY."
  );
}

// Get full Clerk user object (name, avatar, email, etc.)
export async function getCurrentUser() {
  const userId = await getCurrentUserId();
  if (userId === DEV_USER_ID) {
    return {
      id: DEV_USER_ID,
      firstName: "Dev",
      lastName: "User",
      imageUrl: "",
      emailAddresses: [],
    };
  }
  const clerk = getClerkClient();
  return clerk.users.getUser(userId);
}

// DEV_USER_ID is intentionally NOT exported — it is module-private.
// Consumers that need a dev user constant should define their own.
