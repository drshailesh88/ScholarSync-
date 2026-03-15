import { cookies } from "next/headers";
import crypto from "crypto";

const CSRF_COOKIE = "csrf_token";
const CSRF_HEADER = "x-csrf-token";

/**
 * Generate a CSRF token and set it as a cookie.
 * Returns the token so it can be sent to the client.
 */
export async function generateCsrfToken(): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set(CSRF_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  return token;
}

/**
 * Validate the CSRF token from the request header against the cookie.
 * Throws if the token is missing or does not match.
 */
export async function validateCsrfToken(request: Request): Promise<void> {
  const headerToken = request.headers.get(CSRF_HEADER);
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_COOKIE)?.value;

  if (!headerToken || !cookieToken) {
    throw new Error("CSRF token missing");
  }

  // Use timing-safe comparison to prevent timing attacks
  const headerBuf = Buffer.from(headerToken);
  const cookieBuf = Buffer.from(cookieToken);

  if (
    headerBuf.length !== cookieBuf.length ||
    !crypto.timingSafeEqual(headerBuf, cookieBuf)
  ) {
    throw new Error("CSRF token mismatch");
  }
}
