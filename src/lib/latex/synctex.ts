/**
 * SyncTeX Parser Module
 *
 * Parses .synctex.gz files to enable bidirectional navigation between
 * LaTeX source and PDF output.
 *
 * SyncTeX file format reference:
 * https://tug.org/svn/texlive/trunk/Build/source/texk/web2c/synctexdir/synctex_parser_readme.txt
 */

import { createGunzip } from "zlib";
import { Readable } from "stream";

/**
 * Position in the PDF document
 */
export interface PdfPosition {
  page: number;
  x: number; // in TeX points (1/72.27 inch)
  y: number;
  width: number;
  height: number;
}

/**
 * Position in the source file
 */
export interface SourcePosition {
  file: string;
  line: number;
  column?: number;
}

/**
 * SyncTeX entry mapping source to PDF
 */
export interface SyncTeXEntry {
  source: SourcePosition;
  pdf: PdfPosition;
}

/**
 * Parsed SyncTeX data structure
 */
export interface SyncTeXData {
  magnification: number;
  unit: number; // unit in scaled points
  xoffset: number;
  yoffset: number;
  entries: SyncTeXEntry[];
  pageInfo: Map<number, { width: number; height: number }>;
}

/**
 * Parse a .synctex.gz file content into structured data
 */
export async function parseSyncTeX(synctexGzBuffer: Buffer): Promise<SyncTeXData> {
  const content = await gunzipBuffer(synctexGzBuffer);
  const text = content.toString("utf-8");
  return parseSyncTeXText(text);
}

/**
 * Gunzip a buffer
 */
function gunzipBuffer(buffer: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const stream = Readable.from(buffer);
    stream
      .pipe(createGunzip())
      .on("data", (chunk) => chunks.push(chunk))
      .on("end", () => resolve(Buffer.concat(chunks)))
      .on("error", reject);
  });
}

/**
 * Parse decompressed SyncTeX text content
 */
function parseSyncTeXText(text: string): SyncTeXData {
  const lines = text.split("\n");

  const data: SyncTeXData = {
    magnification: 1000,
    unit: 1,
    xoffset: 0,
    yoffset: 0,
    entries: [],
    pageInfo: new Map(),
  };

  let currentPage = 0;
  let currentFile = "";
  const fileMap = new Map<number, string>();

  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue;

    const prefix = line[0];
    const rest = line.slice(1);

    switch (prefix) {
      case "S": // SyncTeX version - ignore for now
        break;

      case "I": // Input file mapping: I <id> <path>
        {
          const match = rest.match(/^(\d+)\s+(.+)$/);
          if (match) {
            const id = parseInt(match[1], 10);
            const path = match[2];
            fileMap.set(id, path);
          }
        }
        break;

      case "O": // Output tag - page dimensions
        {
          // O contains page offset info, but we'll extract from other records
        }
        break;

      case "{": // Begin page group
        currentPage++;
        break;

      case "}": // End page group
        break;

      case "p": // Page dimensions
        {
          // Format varies, but often contains width/height
          const parts = rest.split(",");
          if (parts.length >= 2) {
            const width = parseFloat(parts[0]) || 0;
            const height = parseFloat(parts[1]) || 0;
            data.pageInfo.set(currentPage, { width, height });
          }
        }
        break;

      case "f": // File reference
        {
          const fileId = parseInt(rest, 10);
          currentFile = fileMap.get(fileId) || "";
        }
        break;

      case "l": // Line reference
        {
          const _lineNum = parseInt(rest, 10);
          // Following entries will have position info
        }
        break;

      case "x": // Horizontal position (hbox)
      case "k": // Horizontal position (kern)
      case "g": // Horizontal position (glue)
        {
          const parts = rest.split(",");
          if (parts.length >= 5) {
            const line = parseInt(parts[0], 10);
            const column = parseInt(parts[1], 10) || undefined;
            const x = parseFloat(parts[2]) || 0;
            const y = parseFloat(parts[3]) || 0;
            const w = parseFloat(parts[4]) || 0;
            const h = parseFloat(parts[5]) || 0;

            if (currentFile && line > 0) {
              data.entries.push({
                source: { file: currentFile, line, column },
                pdf: { page: currentPage, x, y, width: w, height: h },
              });
            }
          }
        }
        break;

      case "v": // Vertical position (vbox)
        {
          const parts = rest.split(",");
          if (parts.length >= 5) {
            const line = parseInt(parts[0], 10);
            const x = parseFloat(parts[1]) || 0;
            const y = parseFloat(parts[2]) || 0;
            const w = parseFloat(parts[3]) || 0;
            const h = parseFloat(parts[4]) || 0;

            if (currentFile && line > 0) {
              data.entries.push({
                source: { file: currentFile, line },
                pdf: { page: currentPage, x, y, width: w, height: h },
              });
            }
          }
        }
        break;

      case "$": // Math mode position
        {
          const parts = rest.split(",");
          if (parts.length >= 5) {
            const line = parseInt(parts[0], 10);
            const x = parseFloat(parts[1]) || 0;
            const y = parseFloat(parts[2]) || 0;
            const w = parseFloat(parts[3]) || 0;
            const h = parseFloat(parts[4]) || 0;

            if (currentFile && line > 0) {
              data.entries.push({
                source: { file: currentFile, line },
                pdf: { page: currentPage, x, y, width: w, height: h },
              });
            }
          }
        }
        break;

      case "M": // Magnification
        data.magnification = parseInt(rest, 10) || 1000;
        break;

      case "U": // Unit
        data.unit = parseFloat(rest) || 1;
        break;

      case "X": // X offset
        data.xoffset = parseFloat(rest) || 0;
        break;

      case "Y": // Y offset
        data.yoffset = parseFloat(rest) || 0;
        break;
    }
  }

  return data;
}

/**
 * Forward search: find PDF position for a source location
 *
 * @param data - Parsed SyncTeX data
 * @param file - Source file path (relative to project root)
 * @param line - Line number in source file
 * @returns Best matching PDF position, or undefined if not found
 */
export function forwardSearch(
  data: SyncTeXData,
  file: string,
  line: number
): PdfPosition | undefined {
  // Find entries matching the file (with fuzzy path matching)
  const matchingEntries = data.entries.filter((entry) => {
    // Match file paths more flexibly
    const entryFile = entry.source.file;
    return (
      entryFile === file ||
      entryFile.endsWith("/" + file) ||
      file.endsWith("/" + entryFile) ||
      normalizePath(entryFile) === normalizePath(file)
    );
  });

  if (matchingEntries.length === 0) {
    return undefined;
  }

  // Find the entry with the closest line number
  let bestEntry = matchingEntries[0];
  let bestDistance = Math.abs(matchingEntries[0].source.line - line);

  for (const entry of matchingEntries) {
    const distance = Math.abs(entry.source.line - line);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestEntry = entry;
    }
  }

  return bestEntry.pdf;
}

/**
 * Backward search: find source location for a PDF position
 *
 * @param data - Parsed SyncTeX data
 * @param page - PDF page number (1-indexed)
 * @param x - X coordinate in PDF (in TeX points)
 * @param y - Y coordinate in PDF (in TeX points)
 * @returns Best matching source position, or undefined if not found
 */
export function backwardSearch(
  data: SyncTeXData,
  page: number,
  x: number,
  y: number
): SourcePosition | undefined {
  // Find entries on the specified page
  const pageEntries = data.entries.filter((entry) => entry.pdf.page === page);

  if (pageEntries.length === 0) {
    return undefined;
  }

  // Find the entry closest to the click position
  let bestEntry = pageEntries[0];
  let bestDistance = distanceToRect(
    x,
    y,
    pageEntries[0].pdf.x,
    pageEntries[0].pdf.y,
    pageEntries[0].pdf.width,
    pageEntries[0].pdf.height
  );

  for (const entry of pageEntries) {
    const dist = distanceToRect(
      x,
      y,
      entry.pdf.x,
      entry.pdf.y,
      entry.pdf.width,
      entry.pdf.height
    );
    if (dist < bestDistance) {
      bestDistance = dist;
      bestEntry = entry;
    }
  }

  return bestEntry.source;
}

/**
 * Calculate distance from a point to a rectangle
 * Returns 0 if point is inside the rectangle
 */
function distanceToRect(
  px: number,
  py: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number
): number {
  // Check if point is inside rectangle
  if (px >= rx && px <= rx + rw && py >= ry && py <= ry + rh) {
    return 0;
  }

  // Calculate distance to closest edge or corner
  const dx = Math.max(rx - px, 0, px - (rx + rw));
  const dy = Math.max(ry - py, 0, py - (ry + rh));

  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Normalize a file path for comparison
 */
function normalizePath(path: string): string {
  return path.replace(/\\/g, "/").toLowerCase();
}

/**
 * Convert TeX points to PDF points (they're the same, but included for clarity)
 * 1 TeX point = 1/72.27 inch, 1 PDF point = 1/72 inch
 */
export function texPointsToPdfPoints(texPoints: number): number {
  return texPoints * (72 / 72.27);
}

/**
 * Convert PDF points to TeX points
 */
export function pdfPointsToTexPoints(pdfPoints: number): number {
  return pdfPoints * (72.27 / 72);
}

/**
 * Get all entries for a specific page
 */
export function getPageEntries(data: SyncTeXData, page: number): SyncTeXEntry[] {
  return data.entries.filter((entry) => entry.pdf.page === page);
}

/**
 * Get all unique source files referenced in the SyncTeX data
 */
export function getSourceFiles(data: SyncTeXData): string[] {
  const files = new Set<string>();
  for (const entry of data.entries) {
    files.add(entry.source.file);
  }
  return Array.from(files);
}
