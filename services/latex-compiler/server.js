import express from "express";
import { writeFile, mkdir, readFile, rm, readdir, stat } from "fs/promises";
import { execFile } from "child_process";
import { promisify } from "util";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID, _createHash } from "crypto";

const execFileAsync = promisify(execFile);

const app = express();
app.use(express.json({ limit: "10mb" }));

const PORT = parseInt(process.env.PORT || "8080", 10);
const SHARED_SECRET = process.env.LATEX_COMPILER_SECRET || "";

// ---------------------------------------------------------------------------
// Health check
// ---------------------------------------------------------------------------
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ---------------------------------------------------------------------------
// Concurrency limiter
// ---------------------------------------------------------------------------
let activeCompilations = 0;
const MAX_CONCURRENT = parseInt(process.env.MAX_CONCURRENT || "5", 10);

// ---------------------------------------------------------------------------
// POST /compile
// Accepts: { files: [{ path, content, isMain }] }
// Returns: PDF binary on success, JSON error on failure
// ---------------------------------------------------------------------------
app.post("/compile", async (req, res) => {
  // Auth: verify shared secret
  if (SHARED_SECRET) {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${SHARED_SECRET}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  const { files } = req.body;

  if (!Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ error: "No files provided" });
  }

  const mainFile = files.find((f) => f.isMain);
  if (!mainFile) {
    return res.status(400).json({ error: "No main .tex file found" });
  }

  // Concurrency gate
  if (activeCompilations >= MAX_CONCURRENT) {
    return res.status(429).json({
      error: "Server busy — too many concurrent compilations. Try again in a moment.",
    });
  }

  activeCompilations++;
  const startTime = Date.now();
  const tempDir = join(tmpdir(), `latex-${randomUUID()}`);

  try {
    await mkdir(tempDir, { recursive: true });

    // Write files to temp directory
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

    // Run tectonic with SyncTeX enabled
    const mainPath = join(tempDir, mainFile.path);
    let log = "";
    let compilationStatus = "success";

    try {
      const { stdout, stderr } = await execFileAsync(
        "tectonic",
        [mainPath, "--chatter", "minimal", "--synctex"],
        { cwd: tempDir, timeout: 30_000 }
      );
      log = stdout + "\n" + stderr;
      if (log.toLowerCase().includes("warning")) {
        compilationStatus = "warning";
      }
    } catch (execError) {
      compilationStatus = "error";
      log =
        (execError.stdout || "") +
        "\n" +
        (execError.stderr || "") +
        "\n" +
        (execError.message || "");
    }

    const durationMs = Date.now() - startTime;

    // Read PDF
    const pdfPath = mainPath.replace(/\.tex$/, ".pdf");
    let pdfBuffer = null;
    let synctexBuffer = null;

    if (compilationStatus !== "error") {
      try {
        pdfBuffer = await readFile(pdfPath);
      } catch {
        compilationStatus = "error";
        log += "\nPDF file not generated.";
      }
    }

    // Read SyncTeX file if available
    if (compilationStatus !== "error") {
      const synctexPath = mainPath.replace(/\.tex$/, ".synctex.gz");
      try {
        synctexBuffer = await readFile(synctexPath);
      } catch {
        // SyncTeX file is optional, don't fail if missing
        log += "\nSyncTeX file not generated.";
      }
    }

    if (pdfBuffer) {
      res.set({
        "Content-Type": "application/pdf",
        "X-Compilation-Status": compilationStatus,
        "X-Compilation-Duration": String(durationMs),
        "X-Compilation-Log": Buffer.from(log).toString("base64"),
        "X-Synctex-Data": synctexBuffer ? synctexBuffer.toString("base64") : "",
      });
      return res.send(pdfBuffer);
    }

    // Parse errors and return them
    const _errors = parseCompilationErrors(log);

    return res.status(422).json({
      error: "Compilation failed",
      log,
      errors,
      durationMs,
    });
  } finally {
    activeCompilations--;
    await rm(tempDir, { recursive: true, force: true }).catch(() => {});
  }
});

// ---------------------------------------------------------------------------
// Error parser (moved from the Next.js route)
// ---------------------------------------------------------------------------
function parseCompilationErrors(log) {
  const _errors = [];
  const lines = log.split("\n");

  for (const line of lines) {
    if (line.startsWith("!")) {
      errors.push({ line: null, message: line.slice(1).trim(), severity: "error" });
    }
    const lineMatch = line.match(/^l\.(\d+)/);
    if (lineMatch && errors.length > 0) {
      errors[errors.length - 1].line = parseInt(lineMatch[1], 10);
    }
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

// ---------------------------------------------------------------------------
// DELETE /cache/:projectId
// Clean up build cache for a specific project
// ---------------------------------------------------------------------------
app.delete("/cache/:projectId", async (req, res) => {
  // Auth: verify shared secret
  if (SHARED_SECRET) {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${SHARED_SECRET}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  const { projectId } = req.params;
  if (!projectId) {
    return res.status(400).json({ error: "Missing projectId" });
  }

  const dir = join(BUILD_CACHE_DIR, projectId);
  try {
    await rm(dir, { recursive: true, force: true });
    return res.json({ status: "ok", message: `Cache cleared for project ${projectId}` });
  } catch {
    return res.json({ status: "ok", message: "No cache to clear" });
  }
});

// ---------------------------------------------------------------------------
// GET /cache/stats
// Get cache statistics
// ---------------------------------------------------------------------------
app.get("/cache/stats", async (req, res) => {
  // Auth: verify shared secret
  if (SHARED_SECRET) {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${SHARED_SECRET}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  try {
    const entries = await readdir(BUILD_CACHE_DIR);
    let _totalSize = 0;
    let projectCount = 0;

    for (const entry of entries) {
      const dir = join(BUILD_CACHE_DIR, entry);
      try {
        const info = await stat(dir);
        if (info.isDirectory()) {
          projectCount++;
          // Rough estimate - actual size would require recursive stat
        }
      } catch {
        // Ignore errors
      }
    }

    return res.json({
      cacheDirectory: BUILD_CACHE_DIR,
      projectCount,
      maxAgeHours: MAX_AGE_MS / (60 * 60 * 1000),
    });
  } catch {
    return res.status(500).json({ error: "Failed to get cache stats" });
  }
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`latex-compiler listening on :${PORT}`);
});
