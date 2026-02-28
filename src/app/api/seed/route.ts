import { NextResponse } from "next/server";
import { seedDevData } from "@/lib/actions/seed";
import { logger } from "@/lib/logger";
import { rateLimit } from "@/lib/security/rate-limit";

// Dev-only endpoint to seed the database
export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  // Secondary guard: require a seed secret header when SEED_SECRET is configured
  const seedSecret = process.env.SEED_SECRET;
  if (seedSecret) {
    const provided = req.headers.get("x-seed-secret");
    if (provided !== seedSecret) {
      return NextResponse.json({ error: "Invalid seed secret" }, { status: 403 });
    }
  }

  const { success } = await rateLimit("seed-endpoint", { maxRequests: 5, windowMs: 60_000 });
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const result = await seedDevData();
    return NextResponse.json(result);
  } catch (error) {
    logger.error("Seed error", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
