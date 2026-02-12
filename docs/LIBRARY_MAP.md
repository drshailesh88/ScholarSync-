# ScholarSync - Open Source Library Map

> **Last Updated:** 2026-02-11
> **Purpose:** Battle-tested, permissively-licensed libraries mapped to every feature/button in ScholarSync
> **Rule:** All libraries are MIT, Apache-2.0, BSD, or ISC licensed (SaaS-safe). No GPL.

---

## Quick Reference: The Stack

| Layer | Library | License | What It Does |
|-------|---------|---------|--------------|
| **Editor** | Tiptap (ProseMirror) | MIT | Core rich text editor |
| **Slash Commands** | @tiptap/suggestion | MIT | `/` command palette for AI actions |
| **Global Commands** | cmdk | MIT | Cmd+K command palette |
| **Writing Analysis** | retext ecosystem (unified.js) | MIT | Passive voice, weak words, complex sentences |
| **Readability** | retext-readability + syllable | MIT | Flesch, Fog, ARI scores |
| **Content Transform** | unified (remark + rehype) | MIT | Markdown/HTML conversion |
| **Citations** | citation-js | MIT | Format APA, MLA, Chicago, Vancouver, AMA |
| **CSL Styles** | citation-style-language/styles | CC-BY-SA-3.0 | 10,000+ citation styles |
| **BibTeX/RIS** | @citation-js/plugin-bibtex + plugin-ris | MIT | Import/export reference files |
| **DOI Resolution** | Crossref content negotiation | CC0 | Resolve DOIs to metadata |
| **PubMed Search** | NCBI E-utilities (direct REST) | Public domain | Search 36M+ biomedical articles |
| **Semantic Scholar** | S2 Academic Graph API (direct REST) | Check ToS | Search 200M+ papers + TL;DR |
| **OpenAlex** | OpenAlex API (direct REST) | CC0 | Search 250M+ works, autocomplete |
| **Plagiarism** | Copyleaks API | Commercial | Web + literature matching |
| **AI Detection** | Copyleaks AI Detector (bundled) | Commercial | Per-sentence AI probability |
| **Text Similarity** | string-similarity | ISC | Quick Dice coefficient scoring |
| **Text Diff** | diff-match-patch (Google) | Apache-2.0 | Inline diff, fuzzy matching |
| **PDF Viewing** | @react-pdf-viewer/core | Apache-2.0 | Read uploaded papers in browser |
| **PDF Extraction** | pdf-parse | MIT | Extract text for RAG/chat |
| **PDF Export** | Puppeteer | Apache-2.0 | HTML-to-PDF (pixel-perfect) |
| **DOCX Export** | docx | MIT | Programmatic Word generation |
| **LaTeX Export** | Pandoc (CLI subprocess) | GPL-2.0* | Universal document converter |
| **PPTX Generation** | pptxgenjs | MIT | Draft-to-deck PowerPoint |
| **File Upload** | react-dropzone | MIT | Drag-and-drop uploads |
| **Image Processing** | sharp (server) + browser-image-compression (client) | Apache-2.0 / MIT | Resize, optimize images |
| **Humanization** | Custom LLM prompt | N/A | Rewrite AI-flagged text |

*Pandoc GPL-2.0: Used as CLI subprocess, not linked — SaaS-safe.

---

## Detailed Breakdown by Feature Area

### 1. Core Editor & Writing (The Studio - Page 07)

#### Rich Text Editor: **Tiptap**
- **Repo:** github.com/ueberdosis/tiptap
- **Stars:** ~28,000+ | **License:** MIT
- **Maps to:** The Studio editor (center panel), formatting toolbar, contenteditable area
- **Why:** ProseMirror foundation = schema-validated academic documents. Extension system for custom citation nodes, footnotes, equations. Built-in slash commands via `@tiptap/suggestion`. Collaboration via Yjs. SSR-safe with Next.js.
- **Runner-up:** Plate (github.com/udecode/plate) — Apache-2.0, ~12K stars, Slate.js-based

#### Slash Commands: **@tiptap/suggestion** (built into Tiptap)
- **Maps to:** `[Start typing or press '/' for AI commands...]` placeholder
- **How:** Triggers popup on `/`, user selects AI action (Rephrase, Expand, Summarize), handler calls AI API, streams result into editor.

#### Global Command Palette: **cmdk**
- **Repo:** github.com/pacocoursey/cmdk
- **Stars:** ~10,000+ | **License:** MIT
- **Maps to:** Cmd+K for document-level actions (export, settings, search)

#### Writing Analysis: **retext ecosystem** (unified.js)
- **Repo:** github.com/retextjs/retext
- **Stars:** ~2,400+ | **License:** MIT
- **Maps to:** Writing Analysis page (Page 09) — passive voice, complex sentences, weak words
- **Plugins used:**
  - `retext-passive` → purple highlights (passive voice)
  - `retext-readability` → red highlights (hard to read)
  - `retext-intensify` → yellow highlights (weak/hedge words)
  - `retext-simplify` → suggest simpler alternatives
  - `retext-equality` → inclusive language checks
- **Runner-up:** write-good (github.com/btford/write-good) — MIT, ~5K stars

#### Readability Scores: **retext-readability + syllable**
- **Maps to:** Writing Analysis page metrics panel — Flesch Reading Ease (45.2), Gunning Fog (14.0)
- **Scores:** Flesch, Flesch-Kincaid, Gunning Fog, Coleman-Liau, ARI, Dale-Chall, SMOG

#### Content Conversion: **unified.js** (remark + rehype)
- **Repos:** github.com/unifiedjs/unified (~4.2K), github.com/remarkjs/remark (~7.5K), github.com/rehypejs/rehype (~2.2K)
- **License:** MIT
- **Maps to:** Import/export workflows, markdown support, content pipeline
- **Runner-up:** Turndown + Showdown — MIT, ~9K + ~14K stars

---

### 2. Citations & Bibliography (Library - Page 05, Studio - Page 07)

#### Citation Formatting: **citation-js**
- **Repo:** github.com/citation-js/citation-js
- **Stars:** ~400+ | **License:** MIT
- **Maps to:** "Cite" button (Page 05), citation modal (APA/MLA/Chicago), auto-citations in Studio
- **Formats:** APA 7th, MLA 9th, Chicago, Vancouver, AMA + 10,000 more via CSL
- **Input:** DOI, BibTeX, RIS, Wikidata, PubMed IDs → CSL-JSON internally
- **Output:** Formatted text, HTML, BibTeX, RIS
- **Runner-up:** citeproc-js — CPAL/AGPL (license concern for SaaS)

#### CSL Styles: **citation-style-language/styles**
- **Repo:** github.com/citation-style-language/styles
- **License:** CC-BY-SA-3.0 (content license, fine for usage)
- **Maps to:** Citation format selector dropdown
- **Strategy:** Bundle top 30 styles, fetch rest on demand from raw GitHub URLs

#### BibTeX/RIS Import/Export: **@citation-js/plugin-bibtex + plugin-ris**
- **License:** MIT
- **Maps to:** "Upload PDF" (parse embedded refs), library import/export
- **Runner-up:** @retorquere/bibtex-parser — MIT, most robust BibTeX parser (Better BibTeX for Zotero)

#### DOI Resolution: **Crossref Content Negotiation + API**
- **API:** api.crossref.org | **License:** CC0 metadata
- **Maps to:** Auto-resolving DOIs when adding papers to library
- **Fallback:** DataCite API for non-Crossref DOIs

---

### 3. Paper Search (Deep Research - Page 06)

#### PubMed: **NCBI E-utilities** (direct REST)
- **API:** eutils.ncbi.nlm.nih.gov | **License:** Public domain
- **Maps to:** Search bar (Page 06), Research tab in Studio (Page 07)
- **Endpoints:** esearch (search), esummary (summaries), efetch (full records), elink (related)
- **Auth:** Free API key from NCBI (10 req/sec vs 3/sec without)

#### Semantic Scholar: **S2 Academic Graph API** (direct REST)
- **API:** api.semanticscholar.org | **License:** Check commercial ToS
- **Maps to:** Search results, AI TL;DR synthesis box, paper recommendations
- **Key features:** `tldr` field (one-sentence summaries), recommendations endpoint, batch API (500/request)

#### OpenAlex: **OpenAlex API** (direct REST)
- **API:** api.openalex.org | **License:** CC0 (public domain)
- **Maps to:** Search autocomplete, publication trends, supplementary search
- **Key features:** Autocomplete endpoint, rich filtering, 250M+ works, zero licensing issues

---

### 4. Content Integrity (Final Checks - Page 10)

#### Plagiarism Detection: **Copyleaks API**
- **Website:** copyleaks.com | **Pricing:** ~$0.02-0.05/scan
- **Maps to:** Plagiarism Check section (14% similarity), match cards, "Add Citation"/"Paraphrase" buttons
- **Returns:** Similarity score, matched sources (URL, title, %), character offsets for highlighting
- **npm:** `@copyleaks/plagiarism-checker`

#### AI Content Detection: **Copyleaks AI Detector** (bundled with above)
- **Maps to:** AI Detection gauge (35% AI), per-paragraph breakdown, "Humanize Text" button
- **Returns:** Overall AI %, per-sentence AI probability, character offsets
- **Why same vendor:** One SDK, one billing, one webhook pattern

#### Self-Hosted Complement: **copydetect** (Python)
- **Repo:** github.com/blinber/copydetect | **License:** MIT
- **Maps to:** Compare against user's own uploaded library (self-plagiarism detection)
- **Algorithm:** Winnowing (same as Stanford MOSS)

#### Text Similarity: **string-similarity**
- **Repo:** github.com/aceakash/string-similarity | **License:** ISC
- **Maps to:** Quick client-side similarity scoring between passages

#### Text Diff: **diff-match-patch** (Google)
- **Repo:** github.com/google/diff-match-patch | **License:** Apache-2.0
- **Maps to:** Showing inline differences between user text and matched sources
- **Complement:** jsdiff (npm: `diff`) — BSD-3-Clause, for word-level diffs

#### Humanization: **Custom LLM Prompt**
- **Maps to:** "Humanize Text" button on AI-flagged paragraphs
- **Approach:** Send flagged passage + surrounding context to your existing AI provider with a specialized prompt. Show diff before/after. Re-run AI detection on output.

---

### 5. Document Processing & Export

#### PDF Viewing: **@react-pdf-viewer/core**
- **Repo:** github.com/react-pdf-viewer/react-pdf-viewer | **License:** Apache-2.0
- **Maps to:** "Chat with PDF" (Page 05), reading papers in library/notebook
- **Runner-up:** react-pdf (wojtekmaj) — MIT, ~9K stars, lighter but needs custom UI

#### PDF Text Extraction: **pdf-parse**
- **Repo:** github.com/modesty/pdf-parse | **License:** MIT
- **Maps to:** Upload PDF → extract text for RAG/Notebook chat
- **Runner-up:** Apache Tika — Apache-2.0, better accuracy but needs Java server

#### PDF Export: **Puppeteer**
- **Repo:** github.com/puppeteer/puppeteer | **Stars:** ~89K | **License:** Apache-2.0
- **Maps to:** "Export" button → PDF (Studio Page 07, Settings Page 12)
- **How:** Render editor HTML with print stylesheet → `page.pdf()` → pixel-perfect output
- **Runner-up:** @react-pdf/renderer — MIT, ~14.5K stars, good for templated PDFs

#### DOCX Export: **docx**
- **Repo:** github.com/dolanmiu/docx | **Stars:** ~4.5K | **License:** MIT
- **Maps to:** "Export" button → DOCX
- **How:** Walk editor AST → map to docx Paragraph/TextRun/Table classes → Packer.toBuffer()
- **Runner-up:** html-to-docx — MIT, quick but lower quality

#### LaTeX Export: **Pandoc** (CLI)
- **Repo:** github.com/jgm/pandoc | **Stars:** ~35K | **License:** GPL-2.0 (subprocess = safe)
- **Maps to:** "Export" button → LaTeX
- **How:** Export editor HTML/Markdown → call Pandoc CLI → generate .tex with BibTeX citations

#### PPTX Generation: **pptxgenjs**
- **Repo:** github.com/gitbrent/PptxGenJS | **Stars:** ~2.8K | **License:** MIT
- **Maps to:** Slides Generator (Page 11) — "Export PPTX" button
- **How:** AI summarizes sections into bullets → map to slides with pptxgenjs → speaker notes
- **Complement:** reveal.js (MIT, ~68K stars) for "present in browser" option

#### File Upload: **react-dropzone**
- **Repo:** github.com/react-dropzone/react-dropzone | **Stars:** ~10.5K | **License:** MIT
- **Maps to:** Drag-drop zones (Page 05 Upload PDF, Page 08 Notebook sources)
- **Runner-up:** Uppy — MIT, ~29K stars, full-featured with dashboard UI

#### Image Processing: **sharp** (server) + **browser-image-compression** (client)
- **sharp:** github.com/lovell/sharp | Apache-2.0 | ~29K stars
- **browser-image-compression:** MIT | ~1.4K stars
- **Maps to:** Slide images, figure optimization, thumbnail generation

---

### 6. Auth & Payments (Already Decided)

| Service | Role | Maps To |
|---------|------|---------|
| **Clerk** | Authentication | Auth page (02), Google OAuth, user management |
| **Convex** | Database + Backend | All data storage, real-time queries, file storage |
| **Razorpay** | Payments | Pricing tiers, Plans & Billing (Page 12) |

---

## Architecture Synergy

The recommended stack creates a cohesive pipeline:

```
                    ┌─────────────────────────────────────┐
                    │           TIPTAP EDITOR              │
                    │   (ProseMirror + Extensions)          │
                    │   Slash commands, citations, AI       │
                    └────────────┬────────────────────────┘
                                 │
                    ┌────────────▼────────────────────────┐
                    │        UNIFIED.JS PIPELINE           │
                    │   remark (markdown) ←→ rehype (html) │
                    │              ↓                        │
                    │   retext (writing analysis)           │
                    │   • passive voice • readability       │
                    │   • weak words   • complexity         │
                    └────────────┬────────────────────────┘
                                 │
              ┌──────────────────┼──────────────────────┐
              │                  │                      │
    ┌─────────▼──────┐  ┌───────▼────────┐  ┌─────────▼──────────┐
    │  CITATION-JS   │  │  EXPORT LAYER  │  │  CONTENT INTEGRITY │
    │  APA/MLA/etc.  │  │  Puppeteer→PDF │  │  Copyleaks API     │
    │  DOI resolve   │  │  docx→DOCX     │  │  Plagiarism+AI     │
    │  BibTeX/RIS    │  │  Pandoc→LaTeX  │  │  diff-match-patch  │
    └────────────────┘  │  pptxgenjs→PPT │  └────────────────────┘
                        └────────────────┘
```

## npm Install Command (All Libraries)

```bash
# Core Editor
npm install @tiptap/core @tiptap/react @tiptap/starter-kit @tiptap/suggestion

# Writing Analysis (unified.js ecosystem)
npm install unified retext retext-passive retext-readability retext-intensify retext-simplify retext-equality syllable

# Content Conversion
npm install remark remark-parse remark-rehype rehype rehype-stringify

# Citations
npm install citation-js @citation-js/core @citation-js/plugin-bibtex @citation-js/plugin-csl @citation-js/plugin-doi @citation-js/plugin-ris @citation-js/plugin-pubmed

# Content Integrity
npm install string-similarity diff-match-patch diff

# Document Processing
npm install @react-pdf-viewer/core pdf-parse docx pptxgenjs react-dropzone sharp browser-image-compression

# UI
npm install cmdk
```

## API Keys Needed (All Free)

| API | Key Source | Rate Limit |
|-----|-----------|------------|
| NCBI (PubMed) | ncbi.nlm.nih.gov/account | 10 req/sec |
| Semantic Scholar | semanticscholar.org/product/api | 10 req/sec |
| OpenAlex | No key — set mailto email | 100K/day |
| Crossref | No key — set mailto in User-Agent | 50 req/sec |
| Copyleaks | copyleaks.com (paid, ~$0.02-0.05/scan) | Per plan |

## Cost Per User (Monthly)

| Component | Cost | Notes |
|-----------|------|-------|
| Copyleaks (10 scans) | ~$0.40 | Plagiarism + AI detection |
| All npm libraries | $0.00 | Open source |
| API calls (PubMed/S2/OA) | $0.00 | Free APIs |
| LLM (AI features) | Variable | Depends on provider/usage |
| **Total library cost** | **~$0.40/user/month** | At INR 499-2000/mo revenue |
