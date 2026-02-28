import { URL } from "url";
import dns from "dns/promises";
import net from "net";

// Block private/internal IP ranges
const BLOCKED_IP_RANGES = [
  // Loopback
  { start: "127.0.0.0", end: "127.255.255.255" },
  // Private Class A
  { start: "10.0.0.0", end: "10.255.255.255" },
  // Private Class B
  { start: "172.16.0.0", end: "172.31.255.255" },
  // Private Class C
  { start: "192.168.0.0", end: "192.168.255.255" },
  // Link-local
  { start: "169.254.0.0", end: "169.254.255.255" },
];

const BLOCKED_HOSTNAMES = [
  "metadata.google.internal",
  "metadata.google.com",
  "169.254.169.254",
  "localhost",
];

/**
 * Convert an IPv4 address string to a numeric value for range comparison.
 */
function ipv4ToNumber(ip: string): number {
  const parts = ip.split(".");
  return (
    (parseInt(parts[0], 10) << 24) +
    (parseInt(parts[1], 10) << 16) +
    (parseInt(parts[2], 10) << 8) +
    parseInt(parts[3], 10)
  ) >>> 0; // unsigned right shift to ensure positive number
}

/**
 * Check if an IP address falls within any blocked private/internal range.
 */
export function isPrivateIP(ip: string): boolean {
  // Only handle IPv4 for now
  if (net.isIP(ip) !== 4) {
    // Block IPv6 loopback
    if (ip === "::1" || ip === "::ffff:127.0.0.1") {
      return true;
    }
    // Block all IPv6 to be safe (can be refined later)
    if (net.isIP(ip) === 6) {
      return true;
    }
    return false;
  }

  const ipNum = ipv4ToNumber(ip);

  for (const range of BLOCKED_IP_RANGES) {
    const startNum = ipv4ToNumber(range.start);
    const endNum = ipv4ToNumber(range.end);
    if (ipNum >= startNum && ipNum <= endNum) {
      return true;
    }
  }

  return false;
}

/**
 * Validate that a URL is safe to fetch (prevents SSRF attacks).
 *
 * Checks:
 * 1. URL scheme must be https (or http for flexibility)
 * 2. Hostname must not be in the blocked list
 * 3. Resolved IP must not be in private/internal ranges
 */
export async function validateExternalUrl(
  url: string
): Promise<{ valid: boolean; reason?: string }> {
  // Parse the URL
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { valid: false, reason: "Invalid URL format" };
  }

  // Check scheme — only allow http and https
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return { valid: false, reason: "Only HTTPS and HTTP URLs are allowed" };
  }

  // Check blocked hostnames
  const hostname = parsed.hostname.toLowerCase();
  if (BLOCKED_HOSTNAMES.includes(hostname)) {
    return { valid: false, reason: "Blocked hostname" };
  }

  // If hostname is already an IP, check it directly
  if (net.isIP(hostname)) {
    if (isPrivateIP(hostname)) {
      return { valid: false, reason: "URL resolves to a private/internal IP" };
    }
    return { valid: true };
  }

  // Resolve DNS and check the IP
  try {
    const addresses = await dns.resolve4(hostname);
    for (const addr of addresses) {
      if (isPrivateIP(addr)) {
        return { valid: false, reason: "URL resolves to a private/internal IP" };
      }
    }
  } catch {
    return { valid: false, reason: "DNS resolution failed" };
  }

  return { valid: true };
}
