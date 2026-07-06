# ScholarSync — Claude Code Instructions

## Quick Context
ScholarSync is an AI-powered academic writing platform expanding from medicine-only to all scientific disciplines. Read `docs/multi-domain/MASTER_CONTEXT.md` for full architecture and methodology.

## Current Initiative: Multi-Domain Expansion
- **Architecture:** One app, domain routing (NOT a fork)
- **Safety:** Medicine is default. No domain param = current behavior unchanged.
- **Quality gate:** Annealing score must stay FROZEN (>95). 139 E2E tests must pass.

## Development Methodology
We follow Matt Pocock's engineering process combined with self-annealing QA:
1. Grill-me → shared understanding
2. Ubiquitous language → glossary (UBIQUITOUS_LANGUAGE.md)
3. Write-a-PRD → GitHub Issue
4. PRD-to-issues → vertical slices (tracer bullets)
5. Execute → TDD (RED→GREEN→Refactor, vertical only)
6. QA → durable GitHub Issues (no file paths, behaviors only)
7. Self-anneal → score check
8. E2E → Playwright specs

## Key Files to Read First
- `docs/multi-domain/MASTER_CONTEXT.md` — full plan, file audit, architecture
- `UBIQUITOUS_LANGUAGE.md` — shared vocabulary (if exists)
- `docs/decisions-log.md` — append-only decision log
- `docs/handover-context.md` — project state
- GitHub Issues: `gh issue list --state open`

## Design System & Reference (read before any UI work)
- `docs/design/design.md` — **the frozen skin authority.** Ink-first, hairline, Source Serif 4 / DM Sans / JetBrains Mono, Lucide icons, §8 motion budget. Every pixel obeys this.
- `docs/design/CRAFT-ADDENDUM.md` — adopted **interaction craft** (side-peek, tables, ⌘K, hover-reveal, in-editor composer, act-on-selection, Deep Research agent legibility), each in our tokens + §8 motion jobs.
- `docs/design/reference/SCREEN-CORPUS-INDEX.md` — the **design memory**: 1,898 torn-down real-app screens (Notion, Langdock, Covidence, Elicit, Superhuman…) at `~/S_S_a_2/*-screens/`. Consult it whenever a UI decision needs a reference; it maps our surfaces → best corpus.
- `docs/design/STATE-INVENTORY.md` — the per-surface state coverage tracker (empty/loading/error/offline/…).
- **Cornerstone rule:** *Steal the UX and the craft — never the UI skin.* Reference apps inform flows/patterns/motion; design.md owns every pixel. No competitor colour, chrome, or emoji ever ships.

## Skills Available (.claude/skills/)
grill-me, ubiquitous-language, write-a-prd, prd-to-issues, tdd, qa, design-an-interface, improve-codebase-architecture, triage-issue, git-guardrails

## Rules
- NEVER break existing medical functionality — it's the default
- NEVER modify tests without running them
- Use vertical slices (all layers per task), not horizontal slabs
- Issues must be durable (no file paths, describe behaviors)
- TDD: one test at a time, never write all tests first
- Check GitHub Issues before starting work: `gh issue list --state open`

## Task Master AI Instructions
@./.taskmaster/CLAUDE.md
