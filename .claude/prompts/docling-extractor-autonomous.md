# ScholarSync — Workstream B (Docling) + Workstream C (Structured Extraction) — Autonomous Build Prompt

Paste everything below this line into the autonomous terminal:

---

You are building two Python microservices for ScholarSync autonomously, plus their Next.js integration points. Build continuously until ALL tasks are complete. Never stop to ask for input. Never wait for confirmation. If something breaks, fix it and keep going.

## PROJECT CONTEXT

ScholarSync is an AI-powered academic writing platform. The main app is Next.js 16 at the current working directory. You are adding two Python microservices:

- **Docling Service** — IBM Research PDF parser (97.9% accuracy on academic tables). Replaces the current `pdf-parse` which produces flat text with zero structure.
- **Extractor Service** — Structured fact extraction from paper text. Populates the `paper_extractions` table (PICO data, study design, sample size, effect size, p-values, evidence level). Uses the project's existing AI provider (GLM-5 or Claude via Vercel AI SDK) through a Next.js server action — NOT a separate Python service.

**Current broken state:**
- `src/app/api/extract-pdf/route.ts` uses `pdf-parse` — flat text only, no tables, no figures, no section detection
- `src/lib/actions/pdf.ts` does dumb 500-word chunking with no section awareness
- `paper_extractions` table exists in schema but NOTHING populates it
- `paper_chunks.section_type` column exists but is NEVER set (always null)

## WHAT YOU ARE BUILDING

### Workstream B: Docling Python Microservice

A FastAPI service that accepts PDF uploads and returns structured academic content.

### Workstream C: Structured Fact Extraction

A Next.js server action + API route that extracts PICO data and study metadata from paper text using the existing AI provider, then writes to the `paper_extractions` table.

---

## STEP-BY-STEP EXECUTION

### Phase 1: Read Context (DO THIS FIRST)

Read these files to understand the existing codebase:
1. `src/app/api/extract-pdf/route.ts` — Current basic PDF extraction
2. `src/lib/actions/pdf.ts` — Current dumb chunking (500-word, 50-word overlap)
3. `src/lib/actions/embeddings.ts` — Embedding functions
4. `src/lib/db/schema/core.ts` — papers, paper_chunks, paper_extractions tables
5. `src/lib/ai/models.ts` — AI provider abstraction (getModel, getSmallModel)
6. `src/lib/auth.ts` — getCurrentUserId
7. `docs/RESEARCH-library-updates.md` — Docling research and rationale
8. `.env.example` — Current env vars
9. `Dockerfile` — Existing Node.js Dockerfile
10. `cloudbuild.yaml` — Existing GCP Cloud Build config

### Phase 2: Create Docling Microservice

Create the directory `services/docling/` with these files:

**File 1: `services/docling/requirements.txt`**
```
fastapi==0.115.0
uvicorn[standard]==0.32.0
python-multipart==0.0.12
docling==2.14.0
pandas==2.2.3
```

**File 2: `services/docling/app.py`**

```python
"""
ScholarSync Docling Service — Academic PDF Parsing Microservice

Endpoints:
  POST /parse       — Full structured parse (markdown + tables + figures + metadata)
  POST /chunk       — Intelligent section-aware chunking for RAG
  GET  /health      — Health check
"""

import io
import json
import tempfile
import os
from typing import Any

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from docling.document_converter import DocumentConverter
from docling.datamodel.base_models import InputFormat
from docling.datamodel.pipeline_options import PdfPipelineOptions
from docling.backend.pypdfium2_backend import PyPdfiumDocumentBackend

app = FastAPI(title="ScholarSync Docling Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize converter once (heavy — loads ML models)
pipeline_options = PdfPipelineOptions()
pipeline_options.do_ocr = False  # Disable OCR by default for speed
pipeline_options.do_table_structure = True  # Enable table extraction

converter = DocumentConverter(
    allowed_formats=[InputFormat.PDF],
    format_options={
        InputFormat.PDF: {
            "pipeline_options": pipeline_options,
            "backend": PyPdfiumDocumentBackend,
        }
    },
)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "docling", "version": "1.0.0"}


@app.post("/parse")
async def parse_pdf(file: UploadFile = File(...)):
    """
    Parse a PDF and return structured content:
    - markdown: Full document as clean Markdown
    - tables: List of tables as structured data (list of dicts)
    - sections: Detected document sections with types
    - metadata: Title, authors, page count
    """
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File must be a PDF")

    try:
        contents = await file.read()

        # Write to temp file (Docling needs a file path)
        with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
            tmp.write(contents)
            tmp_path = tmp.name

        try:
            result = converter.convert(tmp_path)
            doc = result.document

            # Extract markdown
            markdown = doc.export_to_markdown()

            # Extract tables as structured data
            tables = []
            for i, table in enumerate(doc.tables):
                try:
                    df = table.export_to_dataframe()
                    tables.append({
                        "index": i,
                        "data": df.to_dict(orient="records"),
                        "columns": list(df.columns),
                        "rows": len(df),
                        "caption": getattr(table, "caption", None),
                    })
                except Exception:
                    # Some tables may fail to convert — skip them
                    tables.append({
                        "index": i,
                        "data": [],
                        "columns": [],
                        "rows": 0,
                        "caption": None,
                        "error": "Failed to extract table structure",
                    })

            # Extract sections with types
            sections = []
            for item in doc.body:
                section_type = _classify_section(getattr(item, "label", ""), str(item))
                text = str(item).strip()
                if text:
                    sections.append({
                        "text": text,
                        "type": section_type,
                        "label": getattr(item, "label", "paragraph"),
                    })

            # Basic metadata
            metadata: dict[str, Any] = {
                "page_count": getattr(doc, "page_count", None),
                "title": _extract_title(sections),
            }

            return {
                "markdown": markdown,
                "tables": tables,
                "sections": sections,
                "metadata": metadata,
            }
        finally:
            os.unlink(tmp_path)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF parsing failed: {str(e)}")


@app.post("/chunk")
async def chunk_pdf(file: UploadFile = File(...)):
    """
    Parse a PDF and return section-aware chunks ready for RAG embedding.
    Unlike dumb 500-word splitting, this:
    1. Detects academic sections (Abstract, Methods, Results, etc.)
    2. Chunks within sections (never crosses section boundaries)
    3. Tags each chunk with section_type and page_number
    4. Preserves table data as structured text within chunks
    """
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File must be a PDF")

    try:
        contents = await file.read()

        with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
            tmp.write(contents)
            tmp_path = tmp.name

        try:
            result = converter.convert(tmp_path)
            doc = result.document

            chunks = []
            chunk_index = 0
            current_section = "other"
            current_text = ""

            TARGET_WORDS = 400
            OVERLAP_WORDS = 50

            for item in doc.body:
                text = str(item).strip()
                if not text:
                    continue

                label = getattr(item, "label", "paragraph")
                section_type = _classify_section(label, text)

                # If we hit a new section header, flush the current chunk
                if label in ("section_header", "title") and current_text:
                    for sub_chunk in _split_with_overlap(current_text, TARGET_WORDS, OVERLAP_WORDS):
                        chunks.append({
                            "chunk_index": chunk_index,
                            "text": sub_chunk,
                            "section_type": current_section,
                            "word_count": len(sub_chunk.split()),
                        })
                        chunk_index += 1
                    current_text = ""
                    current_section = section_type
                else:
                    if section_type != "other":
                        current_section = section_type

                current_text += " " + text if current_text else text

            # Flush remaining text
            if current_text:
                for sub_chunk in _split_with_overlap(current_text, TARGET_WORDS, OVERLAP_WORDS):
                    chunks.append({
                        "chunk_index": chunk_index,
                        "text": sub_chunk,
                        "section_type": current_section,
                        "word_count": len(sub_chunk.split()),
                    })
                    chunk_index += 1

            # Add table chunks separately (so they can be found by "table" queries)
            for table in doc.tables:
                try:
                    df = table.export_to_dataframe()
                    table_text = df.to_string(index=False)
                    caption = getattr(table, "caption", "")
                    full_text = f"Table: {caption}\n{table_text}" if caption else f"Table:\n{table_text}"
                    chunks.append({
                        "chunk_index": chunk_index,
                        "text": full_text,
                        "section_type": "results",  # Tables are typically in Results
                        "word_count": len(full_text.split()),
                    })
                    chunk_index += 1
                except Exception:
                    pass

            return {
                "chunks": chunks,
                "total_chunks": len(chunks),
                "sections_detected": list(set(c["section_type"] for c in chunks)),
            }
        finally:
            os.unlink(tmp_path)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chunking failed: {str(e)}")


def _classify_section(label: str, text: str) -> str:
    """Classify a document element into an academic section type."""
    text_lower = text.lower()[:200]
    label_lower = label.lower()

    if label_lower in ("title",):
        return "other"

    section_map = {
        "abstract": "abstract",
        "introduction": "introduction",
        "background": "introduction",
        "method": "methods",
        "materials and methods": "methods",
        "experimental": "methods",
        "procedure": "methods",
        "result": "results",
        "finding": "results",
        "discussion": "discussion",
        "conclusion": "conclusion",
        "summary": "conclusion",
        "reference": "other",
        "bibliography": "other",
        "acknowledgment": "other",
        "appendix": "other",
        "supplementary": "other",
    }

    for keyword, section_type in section_map.items():
        if keyword in text_lower:
            return section_type

    return "other"


def _extract_title(sections: list[dict]) -> str | None:
    """Extract title from the first section if it looks like a title."""
    if sections and sections[0].get("label") == "title":
        return sections[0]["text"][:500]
    return None


def _split_with_overlap(text: str, target_words: int, overlap_words: int) -> list[str]:
    """Split text into chunks with word overlap."""
    words = text.split()
    if len(words) <= target_words:
        return [text]

    chunks = []
    start = 0
    while start < len(words):
        end = min(start + target_words, len(words))
        chunks.append(" ".join(words[start:end]))
        if end >= len(words):
            break
        start += target_words - overlap_words

    return chunks
```

**File 3: `services/docling/Dockerfile`**
```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install system dependencies for Docling
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

# Cloud Run sets PORT env var
ENV PORT=8001
EXPOSE 8001

CMD ["sh", "-c", "uvicorn app:app --host 0.0.0.0 --port ${PORT}"]
```

**File 4: `services/docling/.dockerignore`**
```
__pycache__
*.pyc
.git
.env
venv
.venv
```

### Phase 3: Create Next.js Integration for Docling

**File 5: `src/app/api/extract-pdf-advanced/route.ts`**

This route proxies PDF uploads to the Docling service. Falls back to existing pdf-parse if Docling is unavailable.

```typescript
import { NextResponse } from "next/server";

const DOCLING_URL = process.env.DOCLING_SERVICE_URL || "http://localhost:8001";
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB for Docling (vs 20MB for pdf-parse)

interface DoclingParseResult {
  markdown: string;
  tables: Array<{
    index: number;
    data: Record<string, unknown>[];
    columns: string[];
    rows: number;
    caption: string | null;
  }>;
  sections: Array<{
    text: string;
    type: string;
    label: string;
  }>;
  metadata: {
    page_count: number | null;
    title: string | null;
  };
}

interface DoclingChunkResult {
  chunks: Array<{
    chunk_index: number;
    text: string;
    section_type: string;
    word_count: number;
  }>;
  total_chunks: number;
  sections_detected: string[];
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const mode = url.searchParams.get("mode") || "parse"; // "parse" or "chunk"

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Content-Type must be multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No PDF file provided" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Max ${MAX_FILE_SIZE / (1024 * 1024)}MB.` },
        { status: 413 }
      );
    }

    // Forward to Docling service
    const doclingForm = new FormData();
    doclingForm.append("file", file);

    const endpoint = mode === "chunk" ? "/chunk" : "/parse";

    const response = await fetch(`${DOCLING_URL}${endpoint}`, {
      method: "POST",
      body: doclingForm,
      signal: AbortSignal.timeout(120_000), // 2 minute timeout for large PDFs
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Docling service error" }));
      console.error("Docling service error:", error);

      // Return error — caller can fall back to basic extraction
      return NextResponse.json(
        {
          error: "Advanced PDF extraction failed",
          detail: error.detail || "Docling service unavailable",
          fallback: true, // Signal that caller should try /api/extract-pdf instead
        },
        { status: 502 }
      );
    }

    const result: DoclingParseResult | DoclingChunkResult = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Advanced PDF extraction error:", error);

    const isTimeout = error instanceof DOMException && error.name === "TimeoutError";
    const isConnectionRefused =
      error instanceof TypeError && String(error.message).includes("fetch failed");

    if (isTimeout) {
      return NextResponse.json(
        { error: "PDF extraction timed out", fallback: true },
        { status: 504 }
      );
    }

    if (isConnectionRefused) {
      return NextResponse.json(
        {
          error: "Docling service not running",
          detail: `Could not connect to ${DOCLING_URL}. Start with: cd services/docling && pip install -r requirements.txt && uvicorn app:app --port 8001`,
          fallback: true,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to extract PDF" },
      { status: 500 }
    );
  }
}
```

**File 6: `src/lib/actions/pdf-advanced.ts`**

Server action that calls Docling's `/chunk` endpoint and saves structured chunks to `paper_chunks` with proper section types.

```typescript
"use server";

import { db } from "@/lib/db";
import { paperChunks, papers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

const DOCLING_URL = process.env.DOCLING_SERVICE_URL || "http://localhost:8001";

interface DoclingChunk {
  chunk_index: number;
  text: string;
  section_type: string;
  word_count: number;
}

/**
 * Check if the Docling service is available.
 */
export async function isDoclingAvailable(): Promise<boolean> {
  try {
    const res = await fetch(`${DOCLING_URL}/health`, {
      signal: AbortSignal.timeout(3_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Extract and chunk a PDF using Docling (section-aware chunking).
 * Falls back to basic chunking if Docling is unavailable.
 *
 * @param paperId - The paper record ID
 * @param fileBuffer - Raw PDF bytes
 * @returns Number of chunks created and sections detected
 */
export async function extractWithDocling(
  paperId: number,
  fileBuffer: Buffer
): Promise<{
  chunksCreated: number;
  sectionsDetected: string[];
  usedDocling: boolean;
}> {
  await getCurrentUserId();

  // Verify paper exists
  const [paper] = await db
    .select({ id: papers.id })
    .from(papers)
    .where(eq(papers.id, paperId));

  if (!paper) {
    throw new Error(`Paper ${paperId} not found`);
  }

  // Try Docling first
  const doclingUp = await isDoclingAvailable();

  if (doclingUp) {
    try {
      const formData = new FormData();
      const blob = new Blob([fileBuffer], { type: "application/pdf" });
      formData.append("file", blob, "paper.pdf");

      const response = await fetch(`${DOCLING_URL}/chunk`, {
        method: "POST",
        body: formData,
        signal: AbortSignal.timeout(120_000),
      });

      if (!response.ok) {
        throw new Error(`Docling returned ${response.status}`);
      }

      const result = (await response.json()) as {
        chunks: DoclingChunk[];
        total_chunks: number;
        sections_detected: string[];
      };

      // Delete existing chunks
      await db.delete(paperChunks).where(eq(paperChunks.paper_id, paperId));

      // Insert Docling chunks with section types
      if (result.chunks.length > 0) {
        const values = result.chunks.map((chunk) => ({
          paper_id: paperId,
          chunk_index: chunk.chunk_index,
          text: chunk.text,
          section_type: mapSectionType(chunk.section_type),
          metadata: { word_count: chunk.word_count, source: "docling" as const },
        }));

        await db.insert(paperChunks).values(values);
      }

      // Also get full markdown for full_text_plain
      try {
        const parseForm = new FormData();
        const parseBlob = new Blob([fileBuffer], { type: "application/pdf" });
        parseForm.append("file", parseBlob, "paper.pdf");

        const parseRes = await fetch(`${DOCLING_URL}/parse`, {
          method: "POST",
          body: parseForm,
          signal: AbortSignal.timeout(120_000),
        });

        if (parseRes.ok) {
          const parseResult = (await parseRes.json()) as { markdown: string };
          await db
            .update(papers)
            .set({
              is_chunked: true,
              is_extracted: true,
              full_text_plain: parseResult.markdown,
            })
            .where(eq(papers.id, paperId));
        }
      } catch {
        // Non-critical — just mark as chunked
        await db
          .update(papers)
          .set({ is_chunked: true })
          .where(eq(papers.id, paperId));
      }

      return {
        chunksCreated: result.total_chunks,
        sectionsDetected: result.sections_detected,
        usedDocling: true,
      };
    } catch (error) {
      console.error("Docling extraction failed, falling back to basic:", error);
      // Fall through to basic extraction
    }
  }

  // Fallback: use existing basic extraction from pdf.ts
  const { extractPdfText } = await import("@/lib/actions/pdf");
  const basicResult = await extractPdfText(paperId, fileBuffer);

  return {
    chunksCreated: basicResult.chunksCreated,
    sectionsDetected: [],
    usedDocling: false,
  };
}

/**
 * Map Docling section types to our schema enum values.
 */
function mapSectionType(
  doclingType: string
): "abstract" | "introduction" | "methods" | "results" | "discussion" | "conclusion" | "other" {
  const mapping: Record<string, "abstract" | "introduction" | "methods" | "results" | "discussion" | "conclusion" | "other"> = {
    abstract: "abstract",
    introduction: "introduction",
    methods: "methods",
    results: "results",
    discussion: "discussion",
    conclusion: "conclusion",
  };
  return mapping[doclingType] || "other";
}
```

### Phase 4: Create Structured Fact Extraction (Workstream C)

This uses the EXISTING AI provider (GLM-5 or Claude) via the Vercel AI SDK — NOT a separate Python service. It extracts PICO data and study metadata from paper text and writes to the `paper_extractions` table.

**File 7: `src/lib/actions/extraction.ts`**

```typescript
"use server";

import { generateObject } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import { db } from "@/lib/db";
import { papers, paperExtractions, paperChunks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { z } from "zod";

/**
 * Schema for structured extraction output.
 * Maps to the paper_extractions table columns.
 */
const extractionSchema = z.object({
  population: z
    .string()
    .optional()
    .describe("Study population: who was studied (e.g., 'Adults aged 18-65 with type 2 diabetes')"),
  intervention: z
    .string()
    .optional()
    .describe("Primary intervention or exposure (e.g., 'Dapagliflozin 10mg daily')"),
  comparison: z
    .string()
    .optional()
    .describe("Comparator/control group (e.g., 'Placebo', 'Standard care')"),
  outcome: z
    .string()
    .optional()
    .describe("Primary outcome measured (e.g., 'All-cause mortality at 12 months')"),
  sample_size: z
    .number()
    .optional()
    .describe("Total number of participants/subjects enrolled"),
  study_design: z
    .string()
    .optional()
    .describe("Study design (e.g., 'Randomized controlled trial', 'Retrospective cohort', 'Meta-analysis', 'Cross-sectional survey')"),
  effect_size: z
    .string()
    .optional()
    .describe("Primary effect size with units (e.g., 'HR 0.83', 'OR 1.45', 'Mean difference -2.3 mmHg')"),
  p_value: z
    .string()
    .optional()
    .describe("P-value for primary outcome (e.g., 'p<0.001', 'p=0.034')"),
  confidence_interval: z
    .string()
    .optional()
    .describe("95% confidence interval (e.g., '95% CI 0.73-0.95')"),
  risk_of_bias: z
    .enum(["low", "moderate", "high", "unclear"])
    .optional()
    .describe("Overall risk of bias assessment"),
  evidence_level: z
    .enum(["1a", "1b", "2a", "2b", "3a", "3b", "4", "5"])
    .optional()
    .describe("Oxford CEBM evidence level"),
  key_findings: z
    .string()
    .optional()
    .describe("2-3 sentence summary of key findings"),
  limitations: z
    .string()
    .optional()
    .describe("Major limitations noted by authors or apparent from design"),
});

type ExtractionResult = z.infer<typeof extractionSchema>;

/**
 * Extract structured facts from a paper's text.
 * Uses the existing AI provider (GLM-5 or Claude) via generateObject.
 *
 * @param paperId - The paper to extract from
 * @param projectId - Optional project context for the extraction
 * @returns The extraction result and database record ID
 */
export async function extractPaperFacts(
  paperId: number,
  projectId?: number
): Promise<{ extraction: ExtractionResult; recordId: number }> {
  await getCurrentUserId();

  // Get the paper
  const [paper] = await db
    .select()
    .from(papers)
    .where(eq(papers.id, paperId));

  if (!paper) {
    throw new Error(`Paper ${paperId} not found`);
  }

  // Build the best available text for extraction
  const text = await buildExtractionText(paperId, paper);

  if (!text || text.trim().length < 50) {
    throw new Error("Insufficient text for extraction. Upload or process the PDF first.");
  }

  // Run structured extraction with the AI provider
  const { object: extraction } = await generateObject({
    model: getSmallModel(),
    schema: extractionSchema,
    system: `You are a medical research data extractor. Extract structured information from the following academic paper text. Be precise and factual. Only extract what is explicitly stated — do NOT infer or guess.

Rules:
- For PICO fields, extract exactly what is described in the paper
- For study_design, use standard epidemiological terms
- For effect_size, include the metric type (HR, OR, RR, mean difference, etc.)
- For evidence_level, use the Oxford Centre for Evidence-Based Medicine (CEBM) levels
- For risk_of_bias, assess based on study design and methodology described
- If a field is not mentioned or cannot be determined, omit it
- For p_value and confidence_interval, copy the exact values from the text`,
    prompt: `Extract structured data from this paper:\n\nTitle: ${paper.title}\n\n${text}`,
  });

  // Check if extraction already exists for this paper+project
  const existing = await db
    .select({ id: paperExtractions.id })
    .from(paperExtractions)
    .where(eq(paperExtractions.paper_id, paperId))
    .limit(1);

  let recordId: number;

  if (existing.length > 0) {
    // Update existing extraction
    await db
      .update(paperExtractions)
      .set({
        population: extraction.population || null,
        intervention: extraction.intervention || null,
        comparison: extraction.comparison || null,
        outcome: extraction.outcome || null,
        sample_size: extraction.sample_size || null,
        study_design: extraction.study_design || null,
        effect_size: extraction.effect_size || null,
        p_value: extraction.p_value || null,
        confidence_interval: extraction.confidence_interval || null,
        risk_of_bias: extraction.risk_of_bias || null,
        evidence_level: extraction.evidence_level || null,
        custom_extractions: {
          key_findings: extraction.key_findings,
          limitations: extraction.limitations,
        },
        extraction_model: "ai-provider",
        confidence_score: 0.85,
        human_verified: false,
      })
      .where(eq(paperExtractions.id, existing[0].id));
    recordId = existing[0].id;
  } else {
    // Insert new extraction
    const [row] = await db
      .insert(paperExtractions)
      .values({
        paper_id: paperId,
        project_id: projectId || null,
        population: extraction.population || null,
        intervention: extraction.intervention || null,
        comparison: extraction.comparison || null,
        outcome: extraction.outcome || null,
        sample_size: extraction.sample_size || null,
        study_design: extraction.study_design || null,
        effect_size: extraction.effect_size || null,
        p_value: extraction.p_value || null,
        confidence_interval: extraction.confidence_interval || null,
        risk_of_bias: extraction.risk_of_bias || null,
        evidence_level: extraction.evidence_level || null,
        custom_extractions: {
          key_findings: extraction.key_findings,
          limitations: extraction.limitations,
        },
        extraction_model: "ai-provider",
        confidence_score: 0.85,
        human_verified: false,
      })
      .returning({ id: paperExtractions.id });
    recordId = row.id;
  }

  // Mark paper as extracted
  await db
    .update(papers)
    .set({ is_extracted: true })
    .where(eq(papers.id, paperId));

  return { extraction, recordId };
}

/**
 * Batch extract facts from multiple papers.
 */
export async function batchExtractFacts(
  paperIds: number[],
  projectId?: number
): Promise<{ success: number; failed: number; errors: string[] }> {
  await getCurrentUserId();

  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const paperId of paperIds) {
    try {
      await extractPaperFacts(paperId, projectId);
      success++;
    } catch (error) {
      failed++;
      errors.push(
        `Paper ${paperId}: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  return { success, failed, errors };
}

/**
 * Build the best available text for extraction from a paper.
 * Priority: full_text_plain > chunks > abstract
 */
async function buildExtractionText(
  paperId: number,
  paper: { abstract: string | null; full_text_plain: string | null; title: string }
): Promise<string> {
  // Best: full text from PDF
  if (paper.full_text_plain && paper.full_text_plain.length > 200) {
    // Truncate to ~4000 words to stay within model context
    const words = paper.full_text_plain.split(/\s+/);
    if (words.length > 4000) {
      return words.slice(0, 4000).join(" ");
    }
    return paper.full_text_plain;
  }

  // Good: concatenated chunks
  const chunks = await db
    .select({ text: paperChunks.text, section_type: paperChunks.section_type })
    .from(paperChunks)
    .where(eq(paperChunks.paper_id, paperId))
    .orderBy(paperChunks.chunk_index);

  if (chunks.length > 0) {
    const chunkText = chunks.map((c) => c.text).join("\n\n");
    const words = chunkText.split(/\s+/);
    if (words.length > 4000) {
      return words.slice(0, 4000).join(" ");
    }
    return chunkText;
  }

  // Minimum: abstract only
  return paper.abstract || "";
}
```

**File 8: `src/app/api/extract-facts/route.ts`**

API route to trigger structured extraction for a paper.

```typescript
import { NextResponse } from "next/server";
import { extractPaperFacts, batchExtractFacts } from "@/lib/actions/extraction";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await getCurrentUserId();

    const body = await req.json();
    const { paperId, paperIds, projectId } = body;

    // Batch mode
    if (paperIds && Array.isArray(paperIds)) {
      const result = await batchExtractFacts(paperIds, projectId);
      return NextResponse.json(result);
    }

    // Single paper mode
    if (!paperId || typeof paperId !== "number") {
      return NextResponse.json(
        { error: "paperId (number) is required" },
        { status: 400 }
      );
    }

    const result = await extractPaperFacts(paperId, projectId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Fact extraction error:", error);
    return NextResponse.json(
      {
        error: "Extraction failed",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
```

### Phase 5: Add Extraction UI to Notebook Page

**Update:** `src/app/(app)/notebook/page.tsx`

Add an "Extract Facts" button on each paper card in the notebook. When clicked, it calls `/api/extract-facts` and shows the extracted PICO data in a structured card.

Add these elements to the notebook page:

1. An "Extract Facts" button (with a Phosphor `Table` or `MagnifyingGlass` icon) next to each paper
2. A loading state while extraction runs
3. An `ExtractionCard` component that displays the PICO data in a clean grid:

```
┌─────────────────────────────────────────┐
│ Structured Extraction                    │
├──────────────┬──────────────────────────┤
│ Population   │ Adults with HFrEF        │
│ Intervention │ Dapagliflozin 10mg       │
│ Comparison   │ Placebo                  │
│ Outcome      │ CV death or worsening HF │
│ Sample Size  │ 4,744                    │
│ Study Design │ RCT                      │
│ Effect Size  │ HR 0.74                  │
│ P-value      │ p<0.001                  │
│ 95% CI       │ 0.65-0.85               │
│ Evidence     │ Level 1b                 │
└──────────────┴──────────────────────────┘
```

Style this with the existing theme variables (bg-surface, text-ink, border-border, text-brand for labels).

4. A "Verify" checkbox that sets `human_verified = true` via a server action
5. Show an "Extracted" badge on papers that already have extractions

### Phase 6: Update Environment and Configuration

**Update `.env.example`** — add these lines:
```
# Docling PDF Parsing Service (Python microservice)
# Start locally: cd services/docling && pip install -r requirements.txt && uvicorn app:app --port 8001
DOCLING_SERVICE_URL=http://localhost:8001
```

**Update `.gitignore`** — add if not already present:
```
# Python
__pycache__/
*.pyc
*.pyo
.venv/
venv/
```

### Phase 7: Verification

Run these checks and fix ALL issues:
```bash
# TypeScript check (Next.js files only)
npx tsc --noEmit

# Build check
npm run build

# Verify Docling service starts (if Python is available)
cd services/docling && pip install -r requirements.txt && python -c "from app import app; print('Docling app loads OK')" && cd ../..
```

If TypeScript or build fails, read the errors, fix them, and run again.

---

## CRITICAL CODING RULES

### AI Calls (TypeScript)
- ALL AI calls use `getModel()`, `getSmallModel()`, or `getBigModel()` from `src/lib/ai/models.ts`
- NEVER hardcode model names
- Use `generateObject` from `ai` package with `zod` schemas for structured extraction
- The extraction uses `getSmallModel()` (cheap — GLM-4-Flash or Claude Haiku)

### Database
- ALL database queries use Drizzle ORM
- Import `db` from `@/lib/db`, tables from `@/lib/db/schema`
- ALL server actions call `getCurrentUserId()` from `@/lib/auth`

### Theme System
- Backgrounds: `bg-background`, `bg-surface`, `bg-surface-raised`
- Text: `text-ink`, `text-ink-muted`
- Borders: `border-border`
- Brand: `text-brand`
- Glass: `.glass-panel`

### Icons
- ONLY `@phosphor-icons/react` — NEVER Lucide or Heroicons

### No New npm Packages
- The TypeScript side needs ZERO new packages
- All Python packages are in `services/docling/requirements.txt`

### TypeScript
- Strict mode — no `any` types
- All functions must have explicit return types

### Python
- Type hints on all functions
- FastAPI with proper error handling (HTTPException)
- Pydantic models where appropriate

---

## FILE CREATION ORDER (strict sequence)

```
 1. services/docling/requirements.txt      ← Python deps
 2. services/docling/app.py                ← FastAPI Docling service
 3. services/docling/Dockerfile            ← Docker for Cloud Run
 4. services/docling/.dockerignore         ← Docker ignore
 5. src/app/api/extract-pdf-advanced/route.ts  ← Next.js proxy to Docling
 6. src/lib/actions/pdf-advanced.ts        ← Server action for Docling chunking
 7. src/lib/actions/extraction.ts          ← PICO/structured extraction (AI)
 8. src/app/api/extract-facts/route.ts     ← API route for extraction
 9. src/app/(app)/notebook/page.tsx        ← UPDATE: add Extract Facts UI
10. .env.example                           ← UPDATE: add DOCLING_SERVICE_URL
11. .gitignore                             ← UPDATE: add Python patterns
```

## GO

Start now. Read the context files first, then execute the build loop continuously. Run `npx tsc --noEmit` after creating all TypeScript files. Do not stop until ALL files are created and `npm run build` passes clean.
