# Vinext Clerk Migration Design

**Date:** 2026-02-27
**Branch:** `feat/vinext-clerk-migration`
**Status:** Approved

## Goal

Replace `@clerk/nextjs` with `@clerk/clerk-react` (client) + `@clerk/backend` (server) so ScholarSync can run on both Next.js and vinext (Cloudflare Workers).

## Approach: Direct Replacement

`@clerk/nextjs` is a thin wrapper around `@clerk/clerk-react` + `@clerk/backend`. We remove the wrapper and use the underlying packages directly.

## Package Changes

- **Remove:** `@clerk/nextjs`
- **Add:** `@clerk/clerk-react`, `@clerk/backend`
- **Bump:** `react` and `react-dom` to 19.2.4+

## Files Changed (9 total)

| File | Change | Risk |
|------|--------|------|
| `src/lib/auth.ts` | Replace `auth()` with `@clerk/backend` `verifyToken()` | Medium — all server auth flows through here |
| `src/middleware.ts` | Replace `clerkMiddleware()` with `authenticateRequest()` | Medium — same route patterns, different verification |
| `src/app/layout.tsx` | Swap `ClerkProvider` import source | Low |
| `src/components/providers/clerk-provider.tsx` | New client wrapper for ClerkProvider | Low — avoids making root layout a client component |
| `src/app/(app)/layout.tsx` | Use new auth helper instead of `@clerk/nextjs/server` | Low |
| `src/app/(auth)/sign-in/[[...sign-in]]/page.tsx` | Import from `@clerk/clerk-react` | Low |
| `src/app/(auth)/sign-up/[[...sign-up]]/page.tsx` | Import from `@clerk/clerk-react` | Low |
| `src/components/layout/app-sidebar.tsx` | Dynamic import from `@clerk/clerk-react` | Low |
| `src/app/api/liveblocks-auth/route.ts` | Use `@clerk/backend` client | Low |
| `src/lib/actions/comments.ts` | Use `@clerk/backend` client | Low |

## Environment Variables (unchanged)

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

## Server-Side Auth Strategy

Create a shared `getClerkClient()` singleton using `createClerkClient()` from `@clerk/backend`. Server-side `auth()` calls become:

1. Read session token from cookies (`__session`) or `Authorization` header
2. `clerkClient.verifyToken(token)` to get `{ sub: userId }`
3. `clerkClient.users.getUser(userId)` when user details are needed

## What Does NOT Change

- Database code, AI routes, UI components (except auth imports)
- `next.config.ts`, Sentry configuration
- Protected route patterns in middleware
- Clerk environment variable names
