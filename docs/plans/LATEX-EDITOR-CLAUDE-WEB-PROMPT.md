# Claude Code Web Prompt — ScholarSync LaTeX Editor

Copy everything below the line into Claude Code on web to continue implementation from zero context.

---

## PROMPT START — COPY FROM HERE

You are continuing implementation of a LaTeX editor for ScholarSync, an AI-powered academic writing platform. I'm working from a mobile device/web, so I may not be able to run builds locally. Work on branch `feature/latex-editor`.

### Project Context

ScholarSync is a Next.js 15 + TypeScript + Tailwind CSS 4 app with:
- Drizzle ORM + PostgreSQL (71 tables)
- Clerk authentication
- Vercel AI SDK for AI streaming
- Docker deployment (node:22-alpine) on GCP
- Dark/light theme system

The app already has: Dashboard, Studio (rich text editor), Library, Deep Research, Presentations, Systematic Review, Integrity Checks, Notebook, and Settings pages — all fully built.

### What We're Building

A Prism-class LaTeX editor that lives at `/latex/[projectId]` with its own sidebar entry. NOT integrated with the existing Studio page. The design is extremely uncluttered — inspired by Prism and Overleaf, not by Studio (which is busy).

**Read these two documents FIRST before writing any code:**
1. `docs/plans/2026-02-27-latex-editor-design-v2.md` — Full design specification
2. `docs/plans/2026-02-27-latex-editor-implementation-plan.md` — 6-phase implementation plan

**DO NOT reference** `docs/plans/2026-02-26-latex-paper-workspace-design.md` — that is superseded and was AI-generated without review.

### Architecture Summary

**Layout:** Two panels (CodeMirror editor + live preview) with a thin top bar. File tree hidden on left, agent panel hidden on right. Progressive disclosure — nothing visible until summoned.

**Dual Mode:** Visual WYSIWYM mode (default, feels like Google Docs) and Source mode (raw LaTeX). Both are views of the same CodeMirror 6 buffer. One-click toggle.

**Preview:** Client-side only. KaTeX (already installed) for math + LaTeX.js for document structure. Updates as you type. Zero server cost.

**Compilation:** Tectonic binary installed in the existing Docker image (one line in Dockerfile). API route `/api/latex/compile` runs Tectonic as a child process. Returns PDF rendered by pdfjs-dist (already installed).

**AI Model Strategy — CRITICAL:**

Two models, each used where they excel:
- **Claude Sonnet** (`getLatexWriteModel()`) for: complex inline edits (strengthen, expand, restructure), Draft mode chat, `/table`, `/figure`, `/tikz` generation, AI-suggested citations. Claude is used wherever writing quality matters — this is what differentiates us from Prism (which uses GPT-5.2). The user feels Claude's academic writing voice in their paper.
- **GPT-5 Nano** (`getLatexUtilModel()`) for: simple inline edits (grammar, formalize, shorten), error fixes, `/equation` generation, Learn mode follow-ups. 20x cheaper than Haiku ($0.05 vs $1.00 input). Same quality for mechanical/structured tasks.
- **NO AI for:** `/cite` (existing PubMed/S2 search), `/bib` (fetch metadata from CrossRef/S2 API and format as BibTeX), `/template` (static), Learn mode common concepts (static data file)

The rule: Claude where users feel writing quality (it goes into their paper). Nano where they don't (grammar fixes, equation patterns, error fixes). No AI where an API call or static data does the job.

Add two new functions to `src/lib/ai/models.ts`:
- `getLatexWriteModel()` using existing `getAnthropic()` provider
- `getLatexUtilModel()` using existing `getOpenAI()` provider

**Agent Panel (4 tabs):**
1. **Draft** — Streaming chat with Claude Sonnet (writing quality is the product), smart context windowing (send current section + outline, not full doc)
2. **Learn** — Pre-written LaTeX concept explanations from `src/data/latex-concepts.ts` (static file, ~50 concepts). GPT-5 Nano only for follow-up questions. This is NOT an AI feature — it's mostly a data file displayed in a panel.
3. **Cite** — Uses EXISTING PubMed/S2 search infrastructure. BibTeX from CrossRef/S2 API (no AI). Click to insert `\cite{key}`.
4. **Check** — Uses EXISTING integrity check system (AI detection, plagiarism, citation verification) + new LaTeX-specific checks (unused refs, missing labels, package conflicts).

**Database:** Three new tables in `src/lib/db/schema/editor.ts`: `latexProjects`, `latexFiles`, `latexCompilations`. See design doc for schema.

### Packages to Install

**New (all MIT):** codemirror, @codemirror/view, @codemirror/state, @codemirror/language, @codemirror/autocomplete, @codemirror/commands, @codemirror/search, @codemirror/lint, codemirror-lang-latex, codemirror-latex-visual, latex.js, yjs, y-websocket

**Already installed:** katex, pdfjs-dist, react-pdf, citation-js, @ai-sdk/openai, @ai-sdk/anthropic, zustand, framer-motion

### Key Existing Files

- `src/lib/ai/models.ts` — Model factory functions (add getLatexWriteModel -> Claude Sonnet, getLatexUtilModel -> GPT-5 Nano)
- `src/lib/db/schema/editor.ts` — Editor schema (add latex tables here)
- `src/components/layout/app-sidebar.tsx` — Sidebar navigation (add LaTeX Editor entry)
- `src/app/api/search/` — Existing PubMed/S2 search routes (Cite tab uses these)
- `src/components/integrity/` — Existing integrity check components (Check tab wraps these)
- `src/stores/` — Zustand stores (create latex-editor-store.ts)
- `Dockerfile` — Add `RUN apk add --no-cache tectonic` to base stage

### Implementation Order

Follow the 6-phase plan in the implementation doc. Start with Phase 1 (Foundation):
1. Install dependencies
2. Create route shells (`/latex`, `/latex/[projectId]`, `/latex/new`)
3. Add sidebar entry
4. Database schema + migration
5. CodeMirror source editor component
6. Live preview panel (KaTeX + LaTeX.js)
7. Top bar
8. Layout assembly with Zustand store

### Design Language

- **Extremely uncluttered.** Prism/Overleaf feel. NOT Studio-inspired.
- Use the existing ScholarSync design system (glass panels, brand colors, dark/light themes)
- But the page itself should be minimal — two panels, thin top bar, everything else hidden
- Think: deep-work tool. Remove friction, not add features.

### Branding Note

"ScholarSync" is a CODENAME. Use a config constant for the product name, never hardcode it in user-facing strings.

### What NOT to Do

- Do NOT use the superseded design doc (2026-02-26 version)
- Do NOT use Claude for mechanical tasks (grammar, equations, error fixes) — GPT-5 Nano is 20x cheaper and same quality for those
- Do NOT use GPT-5.2 for writing tasks — that would just be rebuilding Prism. Claude Sonnet is our writing quality differentiator
- Do NOT make the page look like Studio — Studio is busy, this is clean
- Do NOT use TeX Live or Docker compilation service — use Tectonic binary in existing Docker image
- Do NOT use SwiftLaTeX (AGPL license, not commercially safe)
- Do NOT build all 6 phases at once — work phase by phase, verify each works before moving on

## PROMPT END
