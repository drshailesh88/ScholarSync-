import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { parseAny, resolveDoiToReference } from "@/lib/references/import";
import { logger } from "@/lib/logger";

const parseSchema = z.object({
  /** Raw file content (BibTeX, RIS, CSL-JSON) */
  content: z.string().max(2_000_000).optional(),
  /** A single DOI to resolve */
  doi: z.string().max(200).optional(),
});

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    // Authentication
    try {
      await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parseResult = parseSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { content, doi } = parseResult.data;

    if (!content && !doi) {
      return NextResponse.json(
        { error: "Provide either 'content' (BibTeX/RIS/CSL-JSON) or 'doi'" },
        { status: 400 }
      );
    }

    // DOI lookup
    if (doi) {
      log.info("Resolving DOI", { doi });
      const ref = await resolveDoiToReference(doi);
      if (!ref) {
        return NextResponse.json(
          { error: "Could not resolve DOI. Please check it and try again." },
          { status: 404 }
        );
      }
      return NextResponse.json({ references: [ref], count: 1 });
    }

    // File content parse
    if (content) {
      log.info("Parsing reference file content", {
        length: content.length,
      });

      try {
        const references = parseAny(content);
        return NextResponse.json({
          references,
          count: references.length,
        });
      } catch (parseError) {
        log.error("Reference parse error", parseError);
        return NextResponse.json(
          {
            error:
              "Could not parse the provided content. Ensure it is valid BibTeX, RIS, or CSL-JSON.",
          },
          { status: 422 }
        );
      }
    }

    return NextResponse.json(
      { error: "No input provided" },
      { status: 400 }
    );
  } catch (error) {
    log.error("Reference parse route error", error);
    return NextResponse.json(
      { error: "Failed to parse references" },
      { status: 500 }
    );
  }
}
