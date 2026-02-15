import { NextRequest, NextResponse } from "next/server";
import {
  detectIdentifierType,
  extractDoi,
  crossrefToReference,
} from "@/lib/citations/reference-utils";
import { parsePubMedXml } from "@/lib/citations/pubmed-parser";

/**
 * POST /api/references/resolve
 *
 * Resolves a DOI, PMID, PMCID, or URL to full reference metadata.
 * Uses CrossRef for DOIs and PubMed E-utilities for PMIDs.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, identifierType = "auto", documentId = "default" } = body;

    if (!identifier || typeof identifier !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid identifier" },
        { status: 400 }
      );
    }

    const detectedType =
      identifierType === "auto"
        ? detectIdentifierType(identifier)
        : identifierType;

    switch (detectedType) {
      case "doi": {
        const doi = extractDoi(identifier) || identifier.trim();
        return await resolveDoi(doi, documentId);
      }
      case "pmid": {
        return await resolvePmid(identifier.trim(), documentId);
      }
      case "pmcid": {
        const pmid = identifier.replace(/^PMC/i, "");
        return await resolvePmcid(identifier.trim(), documentId);
      }
      case "url": {
        // Try to extract DOI from URL
        const doi = extractDoi(identifier);
        if (doi) {
          return await resolveDoi(doi, documentId);
        }
        return NextResponse.json(
          {
            success: false,
            error:
              "Could not extract a DOI from this URL. Try pasting the DOI directly.",
          },
          { status: 400 }
        );
      }
      default:
        return NextResponse.json(
          {
            success: false,
            error:
              "Could not determine identifier type. Try a DOI (starting with 10.) or a PMID (numeric).",
          },
          { status: 400 }
        );
    }
  } catch (err: any) {
    console.error("Reference resolve error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function resolveDoi(doi: string, documentId: string) {
  try {
    const url = `https://api.crossref.org/works/${encodeURIComponent(doi)}`;
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent":
          "ScholarSync/1.0 (mailto:support@scholarsync.app)",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({
          success: false,
          error:
            "Could not find a reference for this DOI. Check the DOI and try again, or add the reference manually.",
        });
      }
      return NextResponse.json(
        {
          success: false,
          error: `CrossRef returned status ${res.status}`,
        },
        { status: 502 }
      );
    }

    const data = await res.json();
    const work = data.message;
    const reference = crossrefToReference(work, documentId);

    return NextResponse.json({
      success: true,
      reference,
      source: "crossref",
      confidence: "high",
    });
  } catch (err: any) {
    if (err.name === "TimeoutError") {
      return NextResponse.json(
        { success: false, error: "CrossRef request timed out. Try again." },
        { status: 504 }
      );
    }
    throw err;
  }
}

async function resolvePmid(pmid: string, documentId: string) {
  try {
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmid}&rettype=xml&retmode=xml`;

    const apiKey = process.env.NCBI_API_KEY;
    const fetchUrl = apiKey ? `${url}&api_key=${apiKey}` : url;

    const res = await fetch(fetchUrl, {
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      return NextResponse.json({
        success: false,
        error: "No PubMed record found for this ID.",
      });
    }

    const xml = await res.text();

    if (xml.includes("<ERROR>")) {
      return NextResponse.json({
        success: false,
        error: "No PubMed record found for this ID.",
      });
    }

    const references = parsePubMedXml(xml, documentId);
    if (references.length === 0) {
      return NextResponse.json({
        success: false,
        error: "Could not parse PubMed record.",
      });
    }

    return NextResponse.json({
      success: true,
      reference: references[0],
      source: "pubmed",
      confidence: "high",
    });
  } catch (err: any) {
    if (err.name === "TimeoutError") {
      return NextResponse.json(
        {
          success: false,
          error: "PubMed request timed out. Try again.",
        },
        { status: 504 }
      );
    }
    throw err;
  }
}

async function resolvePmcid(pmcid: string, documentId: string) {
  // Convert PMCID to PMID using the ID converter, then resolve via PMID
  try {
    const url = `https://www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/?ids=${pmcid}&format=json`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(10000),
    });

    if (res.ok) {
      const data = await res.json();
      const pmid = data.records?.[0]?.pmid;
      if (pmid) {
        return await resolvePmid(pmid, documentId);
      }
    }

    return NextResponse.json({
      success: false,
      error:
        "Could not resolve PMCID. Try using the PMID or DOI instead.",
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: "Failed to convert PMCID. Try using the PMID or DOI instead.",
    });
  }
}
