/**
 * POST /api/research/verify
 *
 * Verify paper DOI/PMID against PubMed and CrossRef.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyPaper } from "@/lib/research/verify";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paper } = body;

    if (!paper) {
      return NextResponse.json(
        { error: "Missing required field: paper" },
        { status: 400 }
      );
    }

    const result = await verifyPaper(paper);

    return NextResponse.json({ verification: result });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
