/**
 * Feature flags for progressive rollout of new features.
 * Simple environment-variable-based flags — no external service needed.
 */

/**
 * Whether the new Library UI (Phase 13+) is enabled.
 * Controlled by NEXT_PUBLIC_NEW_LIBRARY env var.
 * Defaults to false (old Library) for safety.
 */
export function isNewLibraryEnabled(): boolean {
  return process.env.NEXT_PUBLIC_NEW_LIBRARY === "true";
}
