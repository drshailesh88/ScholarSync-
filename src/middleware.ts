import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const hasClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

const isDev = process.env.NODE_ENV === "development";

export default async function middleware(request: NextRequest) {
  if (hasClerkKeys) {
    const { clerkMiddleware, createRouteMatcher } = await import(
      "@clerk/nextjs/server"
    );
    const isPublicRoute = createRouteMatcher([
      "/",
      "/sign-in(.*)",
      "/sign-up(.*)",
      "/api/webhooks(.*)",
      "/api/health",
    ]);
    return clerkMiddleware(async (auth, req) => {
      if (!isPublicRoute(req)) {
        await auth.protect();
      }
    })(request, {} as never);
  }

  // In development without Clerk keys, allow all routes
  if (isDev) {
    return NextResponse.next();
  }

  // In production without Clerk keys, block protected routes
  const { pathname } = request.nextUrl;
  const publicPaths = ["/", "/sign-in", "/sign-up", "/api/webhooks", "/api/health"];
  const isPublic = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

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
