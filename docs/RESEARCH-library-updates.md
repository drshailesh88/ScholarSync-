# ScholarSync - Library Updates & Better Alternatives Research

> **Date:** 2026-02-11
> **Status:** Research complete

---

## Summary of Changes

| Library | Verdict | Action |
|---------|---------|--------|
| **Tiptap** | KEEP | Approved. Best-in-class editor. |
| **citation-js** | KEEP | Approved. Handles all citation formats. |
| **Copyleaks** | KEEP | Approved. One vendor for plagiarism + AI detection. |
| **retext** | KEEP + AUGMENT | Keep for academic analysis. Add **LanguageTool API** for grammar/spelling. |
| **pdf-parse** | **REPLACE** | Replace with **unpdf** (modern, maintained, TypeScript). Add **Docling** Python microservice for academic PDFs with tables. |
| **pptxgenjs** | KEEP | Best JS PPTX library available. No better alternative. |

---

## Detailed Analysis

### retext — KEEP + Augment with LanguageTool

**Why keep retext:**
- Only JavaScript-native library providing rule-based, deterministic writing analysis
- Integrates into unified.js pipeline already in use
- Plugins (`retext-passive`, `retext-readability`, `retext-intensify`, `retext-simplify`, `retext-equality`) have no better JS alternative

**What to add — LanguageTool API:**
- Grammar checking, punctuation, style suggestions across 25+ languages
- Self-hostable Java server (important for HIPAA-adjacent compliance)
- Catches errors retext misses: subject-verb agreement, article usage, comma splices
- Public API is free for small volume; self-hosting is free
- Use LanguageTool for grammar/spelling, retext for academic-specific analysis (readability, passive voice density, hedge word %)

### pdf-parse — REPLACE with unpdf + Docling

**Why replace pdf-parse:**
- **Unmaintained** — no commits in years, no response to issues
- Does NOT preserve table structure — everything is flat text
- No TypeScript types, no ESM support

**Primary replacement: unpdf**
- Modern, actively maintained, positioned as pdf-parse replacement
- TypeScript-first, ESM native, async/await API
- Works across all JS runtimes (Node.js, Deno, Bun, browser, serverless)
- OCR fallback via Tesseract
- `npm install unpdf`

**For complex academic PDFs: Docling (Python microservice)**
- IBM Research open-source parser — **97.9% accuracy** on complex table extraction
- Extracts tables as structured data, figures with captions, formulas, reading order
- Run as small FastAPI microservice alongside Node.js app
- Same approach used by SciSpace and Elicit

```python
# Docling microservice (~10 lines)
from fastapi import FastAPI, UploadFile
from docling.document_converter import DocumentConverter

app = FastAPI()
converter = DocumentConverter()

@app.post("/extract")
async def extract(file: UploadFile):
    result = converter.convert(file.file)
    return {"markdown": result.document.export_to_markdown(),
            "tables": [t.export_to_dataframe().to_dict() for t in result.document.tables]}
```

### pptxgenjs — KEEP

No meaningfully better alternative exists in JavaScript:
- officegen: Less maintained, fewer features
- Aspose.Slides: Commercial ($999+ license)
- reveal.js: Browser presentations, not PPTX generation

**Enhancement:** Add reveal.js (MIT, 68K stars) as complement for "Present in Browser" option.

---

## agentic-file-search Repo Assessment

**Repo:** github.com/PromtEngineer/agentic-file-search
**Verdict:** Low direct utility for ScholarSync. Some patterns worth studying.

**Not useful:** No web APIs, no vector search, no citation graphs, no embeddings. Operates only on local filesystem.

**Patterns worth borrowing:**
1. **Docling integration** for PDF parsing with caching (filepath + mtime keyed)
2. **Event-driven workflow** (LlamaIndex Workflows) — scan → deep-dive → backtrack pattern
3. **WebSocket streaming** for real-time progress UI
4. **Structured JSON output** from LLM — could adapt for paper data extraction schemas
5. **Token/cost tracking** utility class

---

## Updated npm Install Commands

```bash
# NEW: AI SDK + Agent Orchestration
npm install ai @ai-sdk/anthropic @ai-sdk/openai @mastra/core

# CHANGED: PDF extraction (replaces pdf-parse)
npm install unpdf

# EXISTING (unchanged)
npm install @tiptap/core @tiptap/react @tiptap/starter-kit @tiptap/suggestion
npm install unified retext retext-passive retext-readability retext-intensify retext-simplify retext-equality syllable
npm install remark remark-parse remark-rehype rehype rehype-stringify
npm install citation-js @citation-js/core @citation-js/plugin-bibtex @citation-js/plugin-csl @citation-js/plugin-doi @citation-js/plugin-ris @citation-js/plugin-pubmed
npm install string-similarity diff-match-patch diff
npm install @react-pdf-viewer/core docx pptxgenjs react-dropzone sharp browser-image-compression
npm install cmdk
```
