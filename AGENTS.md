# ScholarSync — Codex Agent Instructions

## Quick Context
ScholarSync is an AI-powered academic writing platform expanding from medicine-only to all scientific disciplines. Read `docs/multi-domain/MASTER_CONTEXT.md` for full architecture and methodology.

## Current Initiative: Multi-Domain Expansion
- **Architecture:** One app, domain routing (NOT a fork)
- **Safety:** Medicine is default. No domain param = current behavior unchanged.
- **Quality gate:** Annealing score must stay FROZEN (>95). 139 E2E tests must pass.

## Key Files to Read First
- `docs/multi-domain/MASTER_CONTEXT.md` — full plan, file audit, architecture
- `UBIQUITOUS_LANGUAGE.md` — shared vocabulary (if exists)
- `docs/decisions-log.md` — append-only decision log
- GitHub Issues for task context

## Rules
- NEVER break existing medical functionality
- Use vertical slices (all layers per task), not horizontal slabs
- TDD: write test first, make it pass, then next test
- Run existing tests after every change
- Reference parent PRD issue in commits
- Each issue should be independently demoable when complete
