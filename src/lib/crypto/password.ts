/**
 * Password Hashing Utility
 *
 * Uses PBKDF2 via the Web Crypto API for password hashing.
 * Compatible with Cloudflare Workers, Node.js, and all modern runtimes.
 *
 * Storage format: "salt:iterations:hash" where:
 * - salt: 32-char hex (16 random bytes)
 * - iterations: number (100000)
 * - hash: 64-char hex (32 bytes / 256 bits)
 */

const ITERATIONS = 100_000;
const KEY_LENGTH_BITS = 256;
const SALT_LENGTH_BYTES = 16;

/**
 * Hash a plain-text password for storage.
 * Returns a string in the format "salt:iterations:hash".
 *
 * @param password - The plain-text password to hash
 * @returns A string safe to store in the database
 */
export async function hashPassword(password: string): Promise<string> {
  // Generate a random salt
  const saltBytes = new Uint8Array(SALT_LENGTH_BYTES);
  crypto.getRandomValues(saltBytes);
  const salt = Array.from(saltBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Import the password as a CryptoKey
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  // Derive bits using PBKDF2
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    KEY_LENGTH_BITS
  );

  // Convert to hex string
  const hashHex = Array.from(new Uint8Array(derivedBits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${salt}:${ITERATIONS}:${hashHex}`;
}

/**
 * Verify a plain-text password against a stored hash.
 * Uses constant-time comparison to prevent timing attacks.
 *
 * @param password - The plain-text password to verify
 * @param storedHash - The hash string from the database (format: "salt:iterations:hash")
 * @returns true if the password matches, false otherwise
 */
export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  // Parse the stored hash
  const parts = storedHash.split(":");
  if (parts.length !== 3) return false;

  const [salt, iterationsStr, expectedHash] = parts;
  const iterations = parseInt(iterationsStr, 10);
  if (!salt || !iterations || !expectedHash) return false;

  // Re-derive the hash with the same salt and iterations
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    KEY_LENGTH_BITS
  );

  const actualHash = Array.from(new Uint8Array(derivedBits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Constant-time comparison to prevent timing attacks
  if (actualHash.length !== expectedHash.length) return false;

  let mismatch = 0;
  for (let i = 0; i < actualHash.length; i++) {
    mismatch |= actualHash.charCodeAt(i) ^ expectedHash.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Check if a stored value looks like a hashed password (vs plain text).
 * Used during migration to detect already-hashed values.
 *
 * Hashed passwords match the pattern: hex(32):number:hex(64)
 */
export function isHashedPassword(stored: string): boolean {
  return /^[0-9a-f]{32}:\d+:[0-9a-f]{64}$/.test(stored);
}
