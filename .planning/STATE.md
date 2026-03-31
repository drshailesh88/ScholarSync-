# Project State

## Current Milestone
**Explore Module V1** — Created 2026-03-31

## Current Phase
Phase 1: SearXNG Deployment + Source Adapter — Status: IN PROGRESS

## Source Documents
- PRD: GitHub Issue #51
- Requirements: .planning/REQUIREMENTS.md
- Roadmap: .planning/ROADMAP.md
- UX Brief: .planning/ux-brief.md
- UI Brief: .planning/ui-brief.md
- Data Requirements: .planning/data-requirements.md
- Infra Requirements: .planning/infra-requirements.md
- Schema: src/lib/db/schema/explore.ts
- Schema Decisions: SCHEMA_DECISIONS.md
- Infra Decisions: INFRA_DECISIONS.md
- Kagi Reverse Engineering: .planning/kagi-reverse-engineering.md
- Competition Research: .planning/competition-research.md
- Ubiquitous Language: UBIQUITOUS_LANGUAGE.md

## Playbook Progress
- Phase 1: Capture & Research ✅
- Phase 2: Grill & Interview ✅
- Phase 3: Language & PRD ✅
- Phase 4: Technical Architecture ✅
- Phase 5: Implementation → STARTING NOW

## Quick Reference
- Next action: Verify the live unified route against the SearXNG adapter, then continue Phase 1 only if app-level curl passes
- SearXNG deployed: `http://34.14.206.241:8080` in GCP project `metal-node-486118-t7`, zone `asia-south1-b`
- Remaining Phase 1 check: `curl /api/search/unified?q=climate+change&tab=web` should return SearXNG-backed results
