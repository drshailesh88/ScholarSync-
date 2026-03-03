import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { latexFiles, latexProjects, latexCompilations } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

const compileSchema = z.object({
  projectId: z.string().uuid(),
});

const LATEX_COMPILER_URL = process.env.LATEX_COMPILER_URL || "http://localhost:8080";
const LATEX_COMPILER_SECRET = process.env.LATEX_COMPILER_SECRET || "";

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = compileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { projectId } = parsed.data;

    // Verify ownership
    const [project] = await db
      .select()
      .from(latexProjects)
      .where(and(eq(latexProjects.id, projectId), eq(latexProjects.userId, userId)));

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Get all project files
    const files = await db
      .select()
      .from(latexFiles)
      .where(eq(latexFiles.latexProjectId, projectId));

    if (files.length === 0) {
      return NextResponse.json({ error: "No files in project" }, { status: 400 });
    }

    const mainFile = files.find((f) => f.isMain);
    if (!mainFile) {
      return NextResponse.json({ error: "No main .tex file found" }, { status: 400 });
    }

    const startTime = Date.now();

    const compilePayload = JSON.stringify({
      files: files.map((f) => ({
        path: f.path,
        content: f.content,
        isMain: f.isMain,
      })),
    });

    const compileHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(LATEX_COMPILER_SECRET
        ? { Authorization: `Bearer ${LATEX_COMPILER_SECRET}` }
        : {}),
    };

    // Retry transient compiler failures (connection reset, 503, timeout)
    let compileResponse: Response | null = null;
    const MAX_RETRIES = 2;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        compileResponse = await fetch(`${LATEX_COMPILER_URL}/compile`, {
          method: "POST",
          headers: compileHeaders,
          body: compilePayload,
          signal: AbortSignal.timeout(60_000), // 60s timeout per attempt
        });

        // Only retry on 503 (service unavailable) or 504 (gateway timeout)
        if (
          (compileResponse.status === 503 || compileResponse.status === 504) &&
          attempt < MAX_RETRIES
        ) {
          await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
          continue;
        }

        break; // Success or non-retryable error
      } catch (fetchErr) {
        if (attempt < MAX_RETRIES) {
          await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
          continue;
        }
        // All retries exhausted — return a clear error
        console.error("Compiler service unreachable after retries:", fetchErr);
        return NextResponse.json(
          {
            error: "LaTeX compiler service is currently unavailable. Please try again later.",
            retryable: true,
          },
          { status: 503 }
        );
      }
    }

    if (!compileResponse) {
      return NextResponse.json(
        { error: "Compiler service unavailable", retryable: true },
        { status: 503 }
      );
    }

    const durationMs = Date.now() - startTime;

    // Handle 429 (busy) passthrough
    if (compileResponse.status === 429) {
      const err = await compileResponse.json();
      return NextResponse.json(err, { status: 429 });
    }

    // Handle compilation failure (422)
    if (compileResponse.status === 422) {
      const result = (await compileResponse.json()) as {
        log?: string;
        errors?: { line: number | null; message: string; severity: string }[];
        durationMs?: number;
      };

      await db.insert(latexCompilations).values({
        latexProjectId: projectId,
        status: "error",
        log: result.log || "",
        durationMs,
      });

      return NextResponse.json(
        {
          error: "Compilation failed",
          log: result.log,
          errors: result.errors,
          durationMs,
        },
        { status: 422 }
      );
    }

    // Handle success (PDF response)
    if (compileResponse.ok) {
      const compilationStatus =
        (compileResponse.headers.get("X-Compilation-Status") as
          | "success"
          | "warning") || "success";
      const logBase64 = compileResponse.headers.get("X-Compilation-Log") || "";
      const log = logBase64 ? Buffer.from(logBase64, "base64").toString() : "";

      const pdfBuffer = await compileResponse.arrayBuffer();

      // Save compilation record
      await db.insert(latexCompilations).values({
        latexProjectId: projectId,
        status: compilationStatus,
        log,
        durationMs,
      });

      return new Response(new Uint8Array(pdfBuffer), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${project.title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf"`,
          "X-Compilation-Status": compilationStatus,
          "X-Compilation-Duration": String(durationMs),
        },
      });
    }

    // Unexpected status
    return NextResponse.json(
      { error: "Compilation service error" },
      { status: 502 }
    );
  } catch (error) {
    console.error("Compilation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
