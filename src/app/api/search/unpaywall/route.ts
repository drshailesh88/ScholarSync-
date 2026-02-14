import { NextResponse } from "next/server";
import { lookupUnpaywall } from "@/lib/search/sources/unpaywall";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const doi = searchParams.get("doi");

  if (!doi) {
    return NextResponse.json(
      { error: "Query parameter 'doi' is required" },
      { status: 400 }
    );
  }

  try {
    const result = await lookupUnpaywall(doi);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Unpaywall lookup error:", error);
    return NextResponse.json(
      { error: "Unpaywall lookup failed" },
      { status: 500 }
    );
  }
}
