import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClerkClient } from "@clerk/backend";

const hasClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

const isDev = process.env.NODE_ENV === "development";

// Security headers (moved from next.config.ts for Vinext compatibility)
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
const PUBLIC_PATTERNS = [
  /^\/$/,
  /^\/sign-in(\/.*)?$/,
  /^\/sign-up(\/.*)?$/,
  /^\/api(\/.*)?$/,
  /^\/share(\/.*)?$/,
];

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_PATTERNS.some((pattern) => pattern.test(pathname));
}

export default async function middleware(request: NextRequest) {
  if (hasClerkKeys) {
    const { pathname } = request.nextUrl;

    // Public routes don't need auth verification
    if (isPublicRoute(pathname)) {
      return applySecurityHeaders(NextResponse.next());
    }

    // Guard: CLERK_SECRET_KEY must exist for server-side verification
    if (!process.env.CLERK_SECRET_KEY) {
      if (isDev) {
        return applySecurityHeaders(NextResponse.next());
      }
      return applySecurityHeaders(
        NextResponse.json(
          { error: "Server misconfiguration: CLERK_SECRET_KEY is not set" },
          { status: 500 }
        ) as unknown as NextResponse
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
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect_url", request.url);
      return NextResponse.redirect(signInUrl);
    }

    return applySecurityHeaders(NextResponse.next());
  }

  // In development without Clerk keys, allow all routes
  if (isDev) {
    return applySecurityHeaders(NextResponse.next());
  }

  // In production without Clerk keys, block protected routes
  const { pathname } = request.nextUrl;
  if (!isPublicRoute(pathname)) {
    return applySecurityHeaders(
      NextResponse.json(
        { error: "Authentication is not configured" },
        { status: 503 }
      ) as unknown as NextResponse
    );
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
