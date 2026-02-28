import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClerkClient } from "@clerk/backend";

const hasClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

const isDev = process.env.NODE_ENV === "development";

// Public page routes (no auth required)
const PUBLIC_PAGE_PATTERNS = [
  /^\/$/,
  /^\/sign-in(\/.*)?$/,
  /^\/sign-up(\/.*)?$/,
  /^\/share(\/.*)?$/,
];

// Explicit whitelist of public API routes that have their own auth or are
// genuinely public. All other /api routes require Clerk session auth.
const PUBLIC_API_PATTERNS = [
  /^\/api\/webhooks(\/.*)?$/,             // webhook endpoints
  /^\/api\/live-session\/[^/]+\/stream$/, // SSE stream (has its own token auth)
  /^\/api\/health$/,                      // health check
  /^\/api\/analytics\/track-view$/,       // public analytics
  /^\/api\/billing\/webhook$/,            // payment webhook
];

function isPublicRoute(pathname: string): boolean {
  return (
    PUBLIC_PAGE_PATTERNS.some((pattern) => pattern.test(pathname)) ||
    PUBLIC_API_PATTERNS.some((pattern) => pattern.test(pathname))
  );
}

export default async function middleware(request: NextRequest) {
  if (hasClerkKeys) {
    const { pathname } = request.nextUrl;

    // Public routes don't need auth verification
    if (isPublicRoute(pathname)) {
      return NextResponse.next();
    }

    // Guard: CLERK_SECRET_KEY must exist for server-side verification
    if (!process.env.CLERK_SECRET_KEY) {
      if (isDev) {
        return NextResponse.next();
      }
      return NextResponse.json(
        { error: "Server misconfiguration: CLERK_SECRET_KEY is not set" },
        { status: 500 }
      );
    }

    // Protected route: verify the session via @clerk/backend
    const clerk = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
    });

    const { isSignedIn } = await clerk.authenticateRequest(request, {
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    if (!isSignedIn) {
      // For API routes, return 401 instead of redirecting to sign-in
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect_url", request.url);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  }

  // In development without Clerk keys, allow all routes
  if (isDev) {
    return NextResponse.next();
  }

  // In production without Clerk keys, block protected routes
  const { pathname } = request.nextUrl;
  const publicPaths = ["/", "/sign-in", "/sign-up", "/share"];
  const isPublic =
    publicPaths.some(
      (p) => pathname === p || pathname.startsWith(p + "/")
    ) || PUBLIC_API_PATTERNS.some((pattern) => pattern.test(pathname));

  if (!isPublic) {
    return NextResponse.json(
      { error: "Authentication is not configured" },
      { status: 503 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
