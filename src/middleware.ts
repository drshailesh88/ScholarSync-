import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextFetchEvent, NextResponse } from "next/server";
import { isHiddenInV1Path, isPrivateApp, SEARCH_LANDING_PATH } from "@/lib/config/v1-features";

// Security headers
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://api.razorpay.com https://cdn.clerk.io https://*.clerk.accounts.dev",
  "style-src 'self' 'unsafe-inline' https://cdn.clerk.io https://*.clerk.accounts.dev",
  "img-src 'self' data: blob: https://img.clerk.com https://*.clerk.accounts.dev https://*.googleusercontent.com",
  "font-src 'self' data: https://*.clerk.accounts.dev",
  "connect-src 'self' https://api.clerk.io https://*.clerk.accounts.dev https://api.anthropic.com https://api.openai.com https://eutils.ncbi.nlm.nih.gov https://api.semanticscholar.org https://api.openalex.org https://api.copyleaks.com https://checkout.razorpay.com https://lumberjack.razorpay.com https://*.upstash.io https://*.sentry.io https://*.ingest.sentry.io https://*.i.posthog.com https://us.i.posthog.com",
  "frame-src https://checkout.razorpay.com https://accounts.clerk.dev https://*.clerk.accounts.dev",
  "worker-src 'self' blob:",
].join("; ");

const securityHeaders: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": csp,
};

function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }
  return response;
}

// Public route patterns — no auth required
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api(.*)",
  "/share(.*)",
]);

// Playwright dev bypass — skip Clerk auth for E2E tests
function isPlaywrightDevRequest(request: Request): boolean {
  // Check for __playwright cookie in development
  if (process.env.NODE_ENV !== "development") return false;

  const cookieHeader = request.headers.get("cookie") || "";
  return cookieHeader.includes("__playwright=true");
}

const clerkProxy = clerkMiddleware(async (auth, request) => {
  // Private-tool gate: the marketing homepage is not public. Route "/" into the
  // app for signed-in users and to sign-in (a public route) for everyone else.
  if (isPrivateApp() && request.nextUrl.pathname === "/") {
    const { userId } = await auth();
    const url = request.nextUrl.clone();
    url.pathname = userId ? SEARCH_LANDING_PATH : "/sign-in";
    url.search = "";
    return applySecurityHeaders(NextResponse.redirect(url));
  }

  if (!isPublicRoute(request)) {
    await auth.protect();

    // Manan OS v1 is search-only: hidden v2 capabilities redirect to search.
    if (isHiddenInV1Path(request.nextUrl.pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = SEARCH_LANDING_PATH;
      url.search = "";
      return applySecurityHeaders(NextResponse.redirect(url));
    }
  }

  const response = NextResponse.next();
  return applySecurityHeaders(response);
});

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
  // Important: bypass before invoking clerkMiddleware to avoid any auth/session
  // network work during local Playwright automation.
  if (isPlaywrightDevRequest(request)) {
    return applySecurityHeaders(NextResponse.next());
  }

  return clerkProxy(request, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
