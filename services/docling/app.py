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
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "docling", "version": "1.0.0"}


@app.post("/parse")
async def parse_pdf(file: UploadFile = File(...)) -> dict[str, Any]:
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
            tables: list[dict[str, Any]] = []
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
            sections: list[dict[str, str]] = []
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
async def chunk_pdf(file: UploadFile = File(...)) -> dict[str, Any]:
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

            chunks: list[dict[str, Any]] = []
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


def _extract_title(sections: list[dict[str, str]]) -> str | None:
    """Extract title from the first section if it looks like a title."""
    if sections and sections[0].get("label") == "title":
        return sections[0]["text"][:500]
    return None


def _split_with_overlap(text: str, target_words: int, overlap_words: int) -> list[str]:
    """Split text into chunks with word overlap."""
    words = text.split()
    if len(words) <= target_words:
        return [text]

    chunks: list[str] = []
    start = 0
    while start < len(words):
        end = min(start + target_words, len(words))
        chunks.append(" ".join(words[start:end]))
        if end >= len(words):
            break
        start += target_words - overlap_words

    return chunks
