import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

export default async function middleware(request: NextRequest) {
  if (hasClerkKeys) {
    const { clerkMiddleware, createRouteMatcher } = await import(
      "@clerk/nextjs/server"
    );
    const isPublicRoute = createRouteMatcher([
      "/",
      "/sign-in(.*)",
      "/sign-up(.*)",
      "/api/(.*)",
      "/share/(.*)",
    ]);
    const response = await clerkMiddleware(async (auth, req) => {
      if (!isPublicRoute(req)) {
        await auth.protect();
      }
    })(request, {} as never);

    if (response) {
      return applySecurityHeaders(response as NextResponse);
    }
    const next = NextResponse.next();
    return applySecurityHeaders(next);
  }

  // In development without Clerk keys, allow all routes
  if (isDev) {
    return applySecurityHeaders(NextResponse.next());
  }

  // In production without Clerk keys, block protected routes
  const { pathname } = request.nextUrl;
  const publicPaths = ["/", "/sign-in", "/sign-up", "/api", "/share"];
  const isPublic = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (!isPublic) {
    const errorResponse = NextResponse.json(
      { error: "Authentication is not configured" },
      { status: 503 }
    );
    return applySecurityHeaders(errorResponse);
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
