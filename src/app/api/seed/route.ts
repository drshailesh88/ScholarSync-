import { NextResponse } from "next/server";
import { seedDevData } from "@/lib/actions/seed";
import { logger } from "@/lib/logger";
import { getCurrentUserId } from "@/lib/auth";

// Dev-only endpoint to seed the database — validate environment before execution
export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  try {
    await getCurrentUserId();
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
