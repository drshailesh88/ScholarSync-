import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { latexFiles, latexProjects, latexCompilations } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { writeFile, mkdir, readFile, rm } from "fs/promises";
import { execFile } from "child_process";
import { promisify } from "util";
import { join } from "path";
import { tmpdir } from "os";

const execFileAsync = promisify(execFile);

const compileSchema = z.object({
  projectId: z.string().uuid(),
});

// Simple concurrency limiter
let activeCompilations = 0;
const MAX_CONCURRENT = 5;

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
      .select({ id: latexProjects.id, title: latexProjects.title })
      .from(latexProjects)
      .where(and(eq(latexProjects.id, projectId), eq(latexProjects.userId, userId)));

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Check concurrency
    if (activeCompilations >= MAX_CONCURRENT) {
      return NextResponse.json(
        { error: "Server busy — too many concurrent compilations. Try again in a moment." },
        { status: 429 }
      );
    }

    activeCompilations++;
    const startTime = Date.now();

    try {
      // Get all project files
      const files = await db
        .select({
          path: latexFiles.path,
          content: latexFiles.content,
          isMain: latexFiles.isMain,
        })
        .from(latexFiles)
        .where(eq(latexFiles.latexProjectId, projectId));

      if (files.length === 0) {
        return NextResponse.json({ error: "No files in project" }, { status: 400 });
      }

      const mainFile = files.find((f) => f.isMain);
      if (!mainFile) {
        return NextResponse.json({ error: "No main .tex file found" }, { status: 400 });
      }

      // Create temp directory for compilation
      const tempDir = join(tmpdir(), `latex-compile-${projectId}-${Date.now()}`);
      await mkdir(tempDir, { recursive: true });

      try {
        // Write all files to temp directory
        for (const file of files) {
          if (file.content != null) {
            const filePath = join(tempDir, file.path);
            const dir = filePath.substring(0, filePath.lastIndexOf("/"));
            if (dir !== tempDir) {
              await mkdir(dir, { recursive: true });
            }
            await writeFile(filePath, file.content, "utf-8");
          }
        }

        // Run Tectonic compilation
        const mainPath = join(tempDir, mainFile.path);
        let log = "";
        let compilationStatus: "success" | "error" | "warning" = "success";

        try {
          const { stdout, stderr } = await execFileAsync("tectonic", [mainPath, "--chatter", "minimal"], {
            cwd: tempDir,
            timeout: 30000, // 30 second timeout
          });
          log = stdout + "\n" + stderr;

          if (log.toLowerCase().includes("warning")) {
            compilationStatus = "warning";
          }
        } catch (execError: unknown) {
          compilationStatus = "error";
          const err = execError as { stdout?: string; stderr?: string; message?: string };
          log = (err.stdout || "") + "\n" + (err.stderr || "") + "\n" + (err.message || "");
        }

        const durationMs = Date.now() - startTime;

        // Read the PDF if compilation succeeded
        const pdfPath = mainPath.replace(/\.tex$/, ".pdf");
        let pdfBuffer: Buffer | null = null;

        if (compilationStatus !== "error") {
          try {
            pdfBuffer = await readFile(pdfPath);
          } catch {
            compilationStatus = "error";
            log += "\nPDF file not generated.";
          }
        }

        // Save compilation record
        await db.insert(latexCompilations).values({
          latexProjectId: projectId,
          status: compilationStatus,
          log,
          durationMs,
        });

        if (pdfBuffer) {
          return new Response(new Uint8Array(pdfBuffer), {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": `inline; filename="${project.title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf"`,
              "X-Compilation-Status": compilationStatus,
              "X-Compilation-Duration": String(durationMs),
            },
          });
        }

        // Parse errors for line numbers
        const errors = parseCompilationErrors(log);

        return NextResponse.json(
          {
            error: "Compilation failed",
            log,
            errors,
            durationMs,
          },
          { status: 422 }
        );
      } finally {
        // Cleanup temp directory
        await rm(tempDir, { recursive: true, force: true }).catch(() => {});
      }
    } finally {
      activeCompilations--;
    }
  } catch (error) {
    console.error("Compilation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

interface CompilationError {
  line: number | null;
  message: string;
  severity: "error" | "warning";
}

function parseCompilationErrors(log: string): CompilationError[] {
  const errors: CompilationError[] = [];
  const lines = log.split("\n");

  for (const line of lines) {
    // Match "! Error message" pattern
    if (line.startsWith("!")) {
      errors.push({
        line: null,
        message: line.slice(1).trim(),
        severity: "error",
      });
    }
    // Match "l.123 ..." pattern (line number from TeX errors)
    const lineMatch = line.match(/^l\.(\d+)/);
    if (lineMatch && errors.length > 0) {
      errors[errors.length - 1].line = parseInt(lineMatch[1], 10);
    }
    // Match LaTeX warnings
    if (line.includes("LaTeX Warning:")) {
      const warnMatch = line.match(/LaTeX Warning:\s*(.+)/);
      if (warnMatch) {
        const lineNumMatch = warnMatch[1].match(/on input line (\d+)/);
        errors.push({
          line: lineNumMatch ? parseInt(lineNumMatch[1], 10) : null,
          message: warnMatch[1],
          severity: "warning",
        });
      }
    }
    // Match overfull/underfull warnings
    if (line.match(/^(Over|Under)full \\[hv]box/)) {
      const lineNumMatch = line.match(/at lines? (\d+)/);
      errors.push({
        line: lineNumMatch ? parseInt(lineNumMatch[1], 10) : null,
        message: line.trim(),
        severity: "warning",
      });
    }
  }

  return errors;
}
