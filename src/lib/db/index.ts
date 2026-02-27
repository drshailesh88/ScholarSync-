import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Resolve the database connection string.
 *
 * In Cloudflare Workers, Hyperdrive provides a pooled connection via
 * env.HYPERDRIVE.connectionString. Outside Workers (local dev, scripts),
 * we fall back to process.env.DATABASE_URL.
 */
function getConnectionString(): string {
  // Try Hyperdrive first (Workers runtime)
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { env } = require("cloudflare:workers");
    if (env?.HYPERDRIVE?.connectionString) {
      return env.HYPERDRIVE.connectionString;
    }
  } catch {
    // Not in Workers — fall through
  }

  // Fallback to process.env (local dev, scripts)
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  throw new Error("DATABASE_URL is not set and Hyperdrive is not available");
}

function createDb() {
  const client = postgres(getConnectionString(), {
    max: 5,
    prepare: false, // required for Neon serverless + Hyperdrive compatibility
  });

  return drizzle(client, { schema });
}

// Lazy proxy — creates connection on first use.
// In Workers with Hyperdrive, the connection string is injected per-request
// but the singleton pattern still works within a single request lifecycle.
let _db: ReturnType<typeof createDb> | undefined;

export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_target, prop, receiver) {
    if (!_db) {
      _db = createDb();
    }
    return Reflect.get(_db, prop, receiver);
  },
});
