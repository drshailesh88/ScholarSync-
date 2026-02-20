import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

function createDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your .env.local file."
    );
  }

  const instanceConnection = process.env.CLOUD_SQL_CONNECTION_NAME;
  if (instanceConnection) {
    // Cloud Run: connect via Unix socket at /cloudsql/<connection-name>
    const url = new URL(process.env.DATABASE_URL);
    const client = postgres({
      host: `/cloudsql/${instanceConnection}`,
      port: 5432,
      database: url.pathname.slice(1) || "scholarsync",
      username: url.username,
      password: decodeURIComponent(url.password),
    });
    return drizzle(client, { schema });
  }

  const client = postgres(process.env.DATABASE_URL);
  return drizzle(client, { schema });
}

let _db: ReturnType<typeof createDb> | undefined;

export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_target, prop, receiver) {
    if (!_db) {
      _db = createDb();
    }
    return Reflect.get(_db, prop, receiver);
  },
});
