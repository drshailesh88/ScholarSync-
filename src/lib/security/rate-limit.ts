import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// In-memory fallback for development or when Redis is not configured
class InMemoryStore {
  private store = new Map<string, { tokens: number; resetAt: number }>();

  async limit(key: string, maxRequests: number, windowMs: number) {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || now > entry.resetAt) {
      this.store.set(key, { tokens: maxRequests - 1, resetAt: now + windowMs });
      return { success: true, remaining: maxRequests - 1 };
    }

    if (entry.tokens <= 0) {
      return { success: false, remaining: 0 };
    }

    entry.tokens--;
    return { success: true, remaining: entry.tokens };
  }
}

const inMemoryStore = new InMemoryStore();

let upstashRatelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  upstashRatelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "60 s"),
  });
}

export async function rateLimit(
  identifier: string,
  options?: { maxRequests?: number; windowMs?: number }
): Promise<{ success: boolean; remaining: number }> {
  const maxRequests = options?.maxRequests ?? 10;
  const windowMs = options?.windowMs ?? 60_000;

  if (upstashRatelimit) {
    const result = await upstashRatelimit.limit(identifier);
    return { success: result.success, remaining: result.remaining };
  }

  return inMemoryStore.limit(identifier, maxRequests, windowMs);
}

// Helper to extract IP from request headers
export function getClientIP(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
