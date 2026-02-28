// ---------------------------------------------------------------------------
// In-memory session token denylist (defense-in-depth)
//
// NOTE: In production, this should be backed by Redis (or a similar shared
// store) for multi-instance deployments. An in-memory Map only covers the
// current process and will be lost on restart.
// ---------------------------------------------------------------------------

interface DenylistEntry {
  /** Absolute timestamp (ms) at which this entry expires and can be cleaned up */
  expiresAt: number;
}

const denylist = new Map<string, DenylistEntry>();

/**
 * Revoke a session so that subsequent calls to `isSessionRevoked` return true
 * until the entry expires.
 *
 * @param sessionId - The session/token identifier to revoke
 * @param expiresInMs - How long (in milliseconds) the entry should remain in
 *   the denylist. Typically this matches the remaining lifetime of the token.
 */
export function revokeSession(sessionId: string, expiresInMs: number): void {
  denylist.set(sessionId, {
    expiresAt: Date.now() + expiresInMs,
  });
}

/**
 * Check whether a session has been revoked.
 *
 * @param sessionId - The session/token identifier to check
 * @returns `true` if the session is in the denylist and has not yet expired
 */
export function isSessionRevoked(sessionId: string): boolean {
  const entry = denylist.get(sessionId);
  if (!entry) return false;

  // If the entry has expired, clean it up eagerly and report not-revoked
  if (Date.now() >= entry.expiresAt) {
    denylist.delete(sessionId);
    return false;
  }

  return true;
}

// ---------------------------------------------------------------------------
// Periodic cleanup of expired entries — runs every 5 minutes
// ---------------------------------------------------------------------------
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [sessionId, entry] of denylist) {
    if (now >= entry.expiresAt) {
      denylist.delete(sessionId);
    }
  }
}

const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

// Use setInterval for periodic cleanup. unref() ensures it does not prevent
// the Node.js process from exiting gracefully.
const cleanupTimer = setInterval(cleanupExpiredEntries, CLEANUP_INTERVAL_MS);
if (typeof cleanupTimer.unref === "function") {
  cleanupTimer.unref();
}
