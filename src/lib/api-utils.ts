// Shared API route utilities: auth guard, rate limiting, error handling, CORS

import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

type RateLimitPreset = keyof typeof RATE_LIMITS;

const isProd = process.env.NODE_ENV === "production";

/**
 * Wraps an API route handler with authentication, rate limiting, and error handling.
 */
export function withApiProtection(
  handler: (req: Request, userId: string) => Promise<Response>,
  options?: {
    rateLimit?: RateLimitPreset;
  }
) {
  return async (req: Request): Promise<Response> => {
    const log = logger.withRequestId();

    try {
      // 1. Authentication
      const userId = await getCurrentUserId();

      // 2. Rate limiting
      if (options?.rateLimit) {
        const config = RATE_LIMITS[options.rateLimit];
        const rateLimitResponse = await checkRateLimit(
          userId,
          options.rateLimit,
          config
        );
        if (rateLimitResponse) {
          log.warn("Rate limit exceeded", { userId, endpoint: options.rateLimit });
          return addCorsHeaders(rateLimitResponse);
        }
      }

      // 3. Execute handler
      const response = await handler(req, userId);
      return addCorsHeaders(response);
    } catch (error) {
      // Auth errors
      if (error instanceof Error && error.message === "Not authenticated") {
        return addCorsHeaders(
          NextResponse.json({ error: "Authentication required" }, { status: 401 })
        );
      }
      if (
        error instanceof Error &&
        error.message.includes("Authentication is not configured")
      ) {
        return addCorsHeaders(
          NextResponse.json(
            { error: "Authentication service unavailable" },
            { status: 503 }
          )
        );
      }

      // Generic errors — log full details server-side, return safe message
      log.error("API route error", error);
      return addCorsHeaders(
        NextResponse.json(
          { error: "An internal error occurred. Please try again later." },
          { status: 500 }
        )
      );
    }
  };
}

/**
 * Safe error response — logs details server-side, returns generic message to client.
 */
export function safeErrorResponse(
  error: unknown,
  userMessage: string,
  status = 500
): Response {
  logger.error(userMessage, error);
  return NextResponse.json({ error: userMessage }, { status });
}

/**
 * Add CORS headers to a response.
 */
export function addCorsHeaders(response: Response): Response {
  const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(",").map((o) =>
    o.trim()
  );

  const headers = new Headers(response.headers);

  if (allowedOrigins && allowedOrigins.length > 0) {
    // In production, only allow specific origins
    headers.set("Access-Control-Allow-Origin", allowedOrigins[0]);
    headers.set("Vary", "Origin");
  } else if (!isProd) {
    // In dev, allow all origins
    headers.set("Access-Control-Allow-Origin", "*");
  }

  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Access-Control-Max-Age", "86400");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
