# Self-Annealing QA Handoff Document

> Read this file at the start of every new terminal session with the user.
> It gives you full context to act as product manager for the hardening process.

---

## What Is This?

ScholarSync is a 20+ module AI-powered academic research platform (Next.js 16, React 19, TypeScript strict, PostgreSQL+pgvector, Clerk auth, 180+ API routes, 32 pages). The user is a solo developer who built the entire app with AI assistance. Before launching, he wants comprehensive automated testing and hardening — inspired by Andrej Karpathy's AutoResearch methodology (tight loops: hypothesize → change → measure → commit/revert).

The system is called **"Self-Annealing"** — like AutoResearch but for app quality instead of ML experiments. The "temperature" drops as quality rises (HOT → FROZEN). The "metric" is a composite quality score (0-100) measured by `quality-score.mjs`.

---

## Current State (as of 2026-03-13)

### QA Pipeline Progress
- **376 total E2E specs** across 20 modules, containing **12,804 checkpoints**
- **45 specs done** (12%): dashboard (9/9), onboarding (7/7), library (11/11), projects (9/9), settings (8/9)
- **331 specs pending** across 15 modules at 0%
- **1 spec failing**: settings.spec-007 (34/35 passing)
- **Known blocker**: /studio/[id] returns 404

### Unit Tests
- ~280 unit tests exist (Vitest)
- **12 lib/ modules have ZERO tests**: billing, db, storage, pdf, references, analytics, liveblocks, tts, recording, crypto, config, slides
- **8/180+ API routes** have tests
- **13 component modules** have zero tests

### Infrastructure Installed
- Vitest (unit), Playwright (E2E), custom QA pipeline (qa/controller.ts)
- TypeScript strict mode ON, ESLint configured, error boundaries on 15 routes
- Quality gap roadmap exists (.planning/ROADMAP.md)
- Ralph integration runners for 6 modules (notebook, search, studio, latex, integrity, slides)

### Git State
- Current branch: `test/queue-v2` (where prep was done)
- User needs to create: `hardening/session-1` branch
- Many untracked files (e2e tmp files, designs, planning docs)

---

## Files Created During Prep (Phase 0)

| File | Purpose | Size |
|------|---------|------|
| `program.md` | Master agent instruction file (adapted for ScholarSync) | 38KB |
| `quality-score.mjs` | 18-dimension quality scorer, reads qa/queue.jsonl | 498 lines |
| `USAGE-GUIDE.md` | Session-by-session guide for running the annealing process | 282 lines |
| `docs/USER_JOURNEYS.md` | 5 cross-module user journeys (extracted from remote branch) | 452 lines |
| `qa/spec-to-playwright.ts` | UPDATED — now supports all 20 modules (was only 5) | Modified |
| `qa/annealing/sessions/` | 18 copy-paste session prompt files | 18 files |

---

## The 18-Session Plan

### Phase 1: E2E Spec Grinding (Sessions 1-10)
Grind through 331 pending specs using the existing QA pipeline.
Each session: write module-assertion file → run controller → measure → commit/revert.

| Session | Modules | Specs |
|---------|---------|-------|
| 1 | settings (1 fix), studio (17), editor start | ~25 |
| 2-3 | editor (37 total) | ~37 |
| 4 | research (18) | 18 |
| 5 | latex (17) | 17 |
| 6 | notebook (25) | 25 |
| 7 | compliance (16) | 16 |
| 8 | analysis (10), deep-research (15) | 25 |
| 9 | feeds (19), slides start | ~25 |
| 10 | slides (24), slides-ai (21), presentation (27), illustrate (37), poster (15), systematic-review (32) | remaining |

### Phase 2: Unit Tests + API Routes (Sessions 11-13)
- Session 11: Unit tests for 12 untested lib/ modules
- Session 12: API route tests for 172 untested routes
- Session 13: Component tests for 13 untested component modules

### Phase 3: Specialized Testing (Sessions 14-17)
- Session 14: User journey E2E (5 cross-module flows + module entry tests)
- Session 15: Form exhaustive testing + Security (injection, IDOR, auth bypass)
- Session 16: Resilience (network failures, race conditions, empty states, state consistency)
- Session 17: Accessibility (axe-core on all pages, keyboard nav) + code quality sweep

### Phase 4: Codex Verification (Session 18, used for 6 Codex sessions)
Codex re-runs everything Claude did with stricter eyes. Uses `--agent=codex` flag.

---

## Key Architecture Decisions

### The QA Pipeline (how specs become tests)
```
e2e/specs/{module}/spec-NNN.md   (376 spec files with checkpoints)
        ↓
qa/spec-to-playwright.ts         (generates Playwright test from spec markdown)
        ↓
qa/generated/{module}/spec-NNN.spec.ts  (auto-generated Playwright test)
        ↓
qa/module-assertions/{module}.ts  (THE REAL ASSERTIONS — this is the bottleneck)
        ↓
qa/controller.ts                  (runs Playwright, parses results, updates queue.jsonl)
        ↓
qa/queue.jsonl                    (source of truth — NEVER manually edited)
```

### Module Assertion Files — The Bottleneck
Without a `qa/module-assertions/<module>.ts` file, generated tests only verify "page loaded without crash." The assertion file is what makes tests meaningful. Each new module needs one written before the controller can produce real pass/fail verdicts.

**Existing assertion files**: dashboard, onboarding, projects, library, editor (5 of 20)
**Pattern**: Source-level assertions — reads .tsx files and checks for specific code patterns (CSS classes, component imports, function calls). This is more reliable than browser selectors for structural checks.

### The Quality Score (quality-score.mjs)
18 dimensions across 5 phases. Key new dimensions that read qa/queue.jsonl:
- `specPassRate` (12%): specs with pass1_done or pass2_done / total
- `checkpointPassRate` (10%): sum of passing checkpoints / total checkpoints
- `moduleCoverage` (8%): modules with ≥1 passing spec / total modules
- `assertionModuleCoverage` (5%): assertion files / total modules

Phase gates: Phase 1 ≥ 70, Phase 2 ≥ 60, Phase 3 ≥ 75, Phase 4 ≥ 85, Phase 5 ≥ 95

### Known Issues
- `/studio/[id]` returns 404 — only `/studio` works
- `/editor` without `[id]` not a valid route — spec-to-playwright falls back to `/dashboard`
- Auth bypass: `__playwright` cookie set in test beforeEach for dev mode
- QA dev server runs on port 3001 (not 3000)
- Clerk auth state saved at `.claude/auth-state.json`

---

## The User's Workflow

1. User opens Claude Code on web
2. Copies prompt from `qa/annealing/sessions/session-NN-*.md`
3. Pastes into Claude Code on web
4. Closes laptop, goes to work (he's a doctor)
5. Checks progress later via `annealing-log.jsonl` and `git log`
6. Repeats with next session

After Claude sessions → Codex does a second pass (session-18 prompt, used 6 times).
After Codex → User does ~90 min manual testing (visual, business logic, real integrations).

---

## How to Help the User in the Next Session

### If user asks "where are we?"
1. Check `qa/PROGRESS.md` for module completion
2. Check `annealing-log.jsonl` for session history
3. Run `node quality-score.mjs` for current composite score
4. Check `git log --oneline -20` for recent commits

### If user asks "which session should I run next?"
Look at progress → find the next uncompleted session from the plan above.

### If user reports a session failed or got stuck
1. Read the annealing-log.jsonl for the last few entries
2. Check if the module-assertion file exists for the stuck module
3. Check if spec-to-playwright.ts has the module's `has<Module>Assertions` boolean
4. Check if the route actually works (some return 404)

### If user wants to skip to a specific phase
That's fine — sessions are independent. Just paste the relevant prompt file.

### If user asks about Codex handoff
- Codex uses the same pipeline but with `--agent=codex` flag
- Controller tracks pass2 results separately in queue.jsonl
- Codex should be STRICTER than Claude, not duplicating work

---

## Critical Files Reference

| File | What It Does |
|------|-------------|
| `program.md` | Master instruction file — every Claude Code session reads this first |
| `quality-score.mjs` | Measures 18 quality dimensions, drives commit/revert decisions |
| `USAGE-GUIDE.md` | Human-readable guide for running sessions |
| `qa/queue.jsonl` | 376-line source of truth for all specs — NEVER manually edit |
| `qa/controller.ts` | Execution engine — picks specs, generates tests, runs Playwright, updates queue |
| `qa/spec-to-playwright.ts` | Converts spec markdown → Playwright test code |
| `qa/module-assertions/*.ts` | Per-module assertion logic — THE key deliverable per module |
| `qa/PROGRESS.md` | Auto-updated progress dashboard |
| `annealing-log.jsonl` | Session history — how next session picks up where last one stopped |
| `e2e/specs/{module}/spec-*.md` | The 376 spec files — read-only reference for what to test |
| `docs/USER_JOURNEYS.md` | 5 cross-module user journey documentation |
| `docs/MASTER_REGISTRY.md` | Complete UI registry with backend wiring |
| `.planning/ROADMAP.md` | Quality gap closure roadmap (P0-P2 sprints) |
| `.planning/STATE.md` | Current project state and blockers |

---

## Test Type Coverage Map

| Test Type | Session | Status |
|-----------|---------|--------|
| E2E Spec Testing (12,804 checkpoints) | 1-10 | PENDING |
| Unit Tests (12 untested modules) | 11 | PENDING |
| API Route Tests (172 untested) | 12 | PENDING |
| Component Tests (13 untested modules) | 13 | PENDING |
| User Journey E2E (5 cross-module flows) | 14 | PENDING |
| Form Exhaustive Testing | 15 | PENDING |
| Security (injection, IDOR, auth bypass) | 15 | PENDING |
| Resilience (network, race conditions) | 16 | PENDING |
| Accessibility (WCAG 2.1 AA) | 17 | PENDING |
| Codex Verification Pass | 18 (x6) | PENDING |
| Manual Testing (~90 min) | Post-automation | PENDING |

---

## Expected Outcome

After all sessions complete:
- Composite quality score > 95 (currently ~12)
- 350+/376 E2E specs passing
- 11,500+/12,804 checkpoints passing
- All 20 modules have assertion files and passing tests
- Unit test coverage for all lib/ modules and API routes
- Security, accessibility, and resilience tests passing
- Temperature: FROZEN

Manual testing then covers only: visual design, real integrations (Clerk, Razorpay), mobile devices, business logic correctness, subjective quality — approximately 90 minutes.
