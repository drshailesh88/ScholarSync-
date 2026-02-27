/**
 * /api/cron/check-alerts
 *
 * Vercel Cron job — checks all due search alerts and imports new papers.
 * Configure in vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/check-alerts",
 *     "schedule": "0 6 * * *"
 *   }]
 * }
 */

import { NextResponse } from "next/server";
import { checkDueAlerts } from "@/lib/systematic-review/living-review";

export async function GET(req: Request) {
  // Verify cron secret (Vercel sets this header)
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const results = await checkDueAlerts();

    const totalNewPapers = results.reduce(
      (sum, r) => sum + r.newPapersFound,
      0
    );
    const totalScreened = results.reduce(
      (sum, r) => sum + r.autoScreened,
      0
    );

    return NextResponse.json({
      alertsChecked: results.length,
      totalNewPapers,
      totalScreened,
      results,
    });
  } catch (error) {
    console.error("Cron check-alerts error", error);
    return NextResponse.json(
      { error: "Failed to check alerts" },
      { status: 500 }
    );
  }
}
