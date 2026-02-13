# ScholarSync Phase 2 — Autonomous Build Prompt

Paste everything below this line into the autonomous terminal:

---

You are building ScholarSync Phase 2 autonomously. You must build continuously until ALL tasks are complete. Never stop to ask for input. Never wait for confirmation. If something breaks, fix it and keep going.

## PROJECT CONTEXT

ScholarSync is an AI-powered academic writing platform for Indian medical students. It's a Next.js 16 App Router project at the current working directory.

**Phase 1 is COMPLETE:** Next.js 16 + TypeScript + Tailwind CSS 4 scaffolding, Clerk auth with placeholder key handling, 71-table Drizzle ORM schema, dual dark/light theme system (dark default), AI models utility (Claude via Vercel AI SDK), glass morphism design system, app sidebar + header, 10 stub app pages, and a full landing page.

**Phase 2 builds ALL 10 real app pages** from HTML mockups, installs new dependencies (Tiptap editor, cmdk, react-dropzone), creates search API routes (PubMed, Semantic Scholar), wires AI chat streaming, and polishes the entire UI.

## YOUR METHODOLOGY

You follow three methodologies simultaneously:

### 1. Task Master (Task Tracking)
- All tasks are tracked via Task Master. The PRD is at `.taskmaster/docs/prd-phase2.txt`
- Start by parsing the PRD: `task-master parse-prd .taskmaster/docs/prd-phase2.txt --append`
- If parsing fails (API key issues), create tasks manually using `task-master add-task`
- Before starting each task: `task-master set-status --id=<id> --status=in-progress`
- After completing each task: `task-master set-status --id=<id> --status=done`
- Check next task: `task-master next`
- Tasks are numbered 29-50 (continuing from Phase 1's 28 tasks)

### 2. Spec-Driven Development (Spec Kit)
Before coding each page:
1. READ the HTML mockup file in `ui-mockups-codex/` (e.g., `dashboard.html` for Dashboard)
2. READ the page specification in `docs/MASTER_REGISTRY.md`
3. READ the library info in `docs/LIBRARY_MAP.md` if the task uses external libraries
4. THEN code to match the spec exactly

### 3. Ralph Wiggum Loop (Build → Test → Fix → Repeat)
For EVERY task:
```
1. BUILD: Write the code
2. TEST: Run `npx tsc --noEmit` to check TypeScript
3. FIX: If errors, fix them immediately
4. TEST AGAIN: Run `npm run dev` briefly to verify the page loads (curl localhost:3000/page)
5. REPEAT until the page works with zero errors
6. MARK DONE: task-master set-status --id=<id> --status=done
7. NEXT: task-master next
```

## STEP-BY-STEP EXECUTION

### Phase A: Setup (Tasks 29-31)
Execute sequentially:
1. Task 29: `npm install @tiptap/core @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/pm cmdk react-dropzone`
2. Task 30: Create `src/lib/mock-data.ts` — realistic data for medical student researching CRISPR
3. Task 31: Create 8 shared UI components in `src/components/ui/`

### Phase B: CRUD Pages (Tasks 32-34)
Can use parallel agents for independent pages:
- Agent 1: Task 32 — Dashboard page
- Agent 2: Task 33 — Projects page
- Agent 3: Task 34 — Library page

### Phase C: Deep Research (Tasks 35-38)
Execute sequentially (each builds on the previous):
1. Task 35: Deep Research page UI (with mock data)
2. Task 36: PubMed API route
3. Task 37: Semantic Scholar API route
4. Task 38: Wire real search to the page

### Phase D: Studio/Editor (Tasks 39-42)
Execute sequentially:
1. Task 39: Tiptap editor component + toolbar
2. Task 40: Full Studio page (3-column layout)
3. Task 41: AI chat streaming API route
4. Task 42: Wire streaming to Studio chat

### Phase E: Remaining Pages (Tasks 43-47)
Can use parallel agents:
- Agent 1: Task 43 — Notebook page
- Agent 2: Task 44 — Analysis page + Task 45 — Compliance page
- Agent 3: Task 46 — Presentation page + Task 47 — Settings page

### Phase F: Polish (Tasks 48-50)
Execute sequentially:
1. Task 48: Cmdk command palette
2. Task 49: Mobile responsive sidebar
3. Task 50: Full end-to-end verification + fix all issues

## CRITICAL CODING RULES

### Theme System
- NEVER hardcode colors. ALWAYS use theme CSS variables:
  - Backgrounds: `bg-background`, `bg-surface`, `bg-surface-raised`
  - Text: `text-ink`, `text-ink-muted`
  - Borders: `border-border`, `border-border-subtle`
  - Glass: `bg-glass` or `.glass-panel` CSS class
  - Brand: `text-brand`
- Test BOTH themes on every page

### Component Conventions
- Server Components by default. Only add `"use client"` when hooks/interactivity needed.
- Icons: ONLY `@phosphor-icons/react` — NEVER Lucide, Heroicons, or others
- Utility: Always use `cn()` from `src/lib/utils.ts` for conditional classes
- Fonts: Inter (dark mode sans), Plus Jakarta Sans (light mode sans), Merriweather (serif/editor)
- Use `.glass-panel` CSS class for glass morphism effects
- Reuse: GlassPanel, GlowCard, ThemeToggle, Logo, AppSidebar, AppHeader from existing components

### AI Conventions
- ALL AI calls use `getModel()` / `getSmallModel()` / `getBigModel()` from `src/lib/ai/models.ts`
- NEVER hardcode model names like "claude-sonnet-4-20250514"
- Streaming chat uses `streamText` from `ai` package + `toDataStreamResponse()`
- Client-side chat uses `useChat` hook from `ai/react`
- Always handle missing ANTHROPIC_API_KEY gracefully (show message, don't crash)

### File Organization
```
src/
  app/
    api/
      chat/route.ts           # AI chat streaming
      search/
        pubmed/route.ts        # PubMed search
        semantic-scholar/route.ts  # S2 search
    (app)/
      dashboard/page.tsx       # ← Replace stub pages
      studio/page.tsx
      research/page.tsx
      ... (all 10 pages)
  components/
    ui/                        # Reusable UI components
      data-table.tsx
      search-input.tsx
      tabs.tsx
      badge.tsx
      modal.tsx
      progress-bar.tsx
      empty-state.tsx
      circular-gauge.tsx
      command-palette.tsx
    editor/                    # Tiptap components
      tiptap-editor.tsx
      toolbar.tsx
    layout/                    # Existing layout components
  lib/
    mock-data.ts               # Mock data layer
    ai/models.ts               # AI model utility (exists)
    db/                        # Drizzle schema (exists)
    utils.ts                   # cn() utility (exists)
```

### Error Handling
- If `npm install` fails: check for conflicts, try installing packages one at a time
- If TypeScript errors: fix them immediately, run `npx tsc --noEmit` until zero errors
- If a page crashes on dev: read the error, fix the component, test again
- If an API route fails: add proper try/catch, return appropriate error status codes
- If Clerk auth blocks pages (placeholder keys): ensure all auth checks use the `hasClerkKeys` pattern already established in the codebase
- NEVER skip a broken task — fix it before moving on

### Quality Gates (Every Task)
1. `npx tsc --noEmit` — ZERO errors
2. The page renders in the browser without console errors
3. Both dark and light themes look correct
4. Existing pages still work (no regressions)

## CONTEXT FILES TO READ FIRST

Before starting ANY coding, read these files to understand the codebase:
1. `docs/MASTER_REGISTRY.md` — Every page specification, components, buttons, backend wiring
2. `docs/LIBRARY_MAP.md` — Libraries mapped to every feature
3. `src/app/globals.css` — Theme CSS variables
4. `src/app/layout.tsx` — Root layout (ClerkProvider + ThemeProvider)
5. `src/app/(app)/layout.tsx` — App layout (Sidebar + Header)
6. `src/components/ui/glass-panel.tsx` — Glass panel component pattern
7. `src/components/ui/glow-card.tsx` — Glow card pattern
8. `src/components/layout/app-sidebar.tsx` — Sidebar navigation
9. `src/lib/mock-data.ts` — After you create it in Task 30
10. `.taskmaster/docs/prd-phase2.txt` — The full PRD with all task specifications

For EACH page task, also read:
- The corresponding HTML mockup in `ui-mockups-codex/` (e.g., `ui-mockups-codex/dashboard.html`)
- The page section in `docs/MASTER_REGISTRY.md`

## GO

Start now. Read context files, parse the PRD into Task Master, then execute the build loop continuously. Do not stop until Task 50 is complete and verified.
