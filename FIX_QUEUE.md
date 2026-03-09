# Gap Closure Fix Queue

## Prioritization Rules
- P0 (CRITICAL): Score 1-2 in any dimension of Studio, Research, Slides, LaTeX, or Integrity
- P1 (IMPORTANT): Score 3 in any dimension of the above core modules
- P2 (IMPORTANT): Score 1-2 in any dimension of non-core modules (Notebook, Illustration, Systematic Review)
- P3 (POLISH): Score 3 in non-core modules
- DEFER: Anything requiring new features, new dependencies, or architecture changes

## Within each priority level, sort by:
1. Effort: S before M before L (ship quick wins first)
2. Module importance: Studio > Research > Slides > LaTeX > Integrity > Notebook > Illustration

## The Queue

| Order | Gap ID | Module | Gap Description | Dimension(s) | Current Score | Target | Effort | Priority | Status |
|-------|--------|--------|----------------|---------------|---------------|--------|--------|----------|--------|
| 1 | GAP-007 | Studio | Selection-based formatting unreliable (Ctrl+B, toolbar Bold) | D1=3, D4=2 | 20/35 | 24+ | S | P0 | DONE (2->4, 7c53862) |
| 2 | GAP-001 | Research | Search stalls + hydration mismatch on first query | D1=1, D3=1, D4=1, D7=1 | 13/35 | 24+ | M | P0 | DONE (1->3, b4b4baa) |
| 3 | GAP-002 | Studio | Citation insertion does not complete reliably | D3=2, D4=2 | 20/35 | 25+ | M | P0 | DONE (2->4, 551dc7d) |
| 4 | GAP-003 | LaTeX | Paper creation crashes before workspace opens | D3=1, D4=1, D7=1 | 14/35 | 24+ | M | P0 | PENDING (error originates in editor page, not creation action) |
| 5 | GAP-004 | Integrity | Pasted-text check never reaches results | D1=1, D3=1, D4=1 | 13/35 | 24+ | M | P0 | PENDING |
| 6 | GAP-006 | Systematic Review | Empty-state project creation blocked | D4=1, D7=1 | 16/35 | 24+ | M | P2 | PENDING |
| 7 | GAP-005 | Notebook | Cross-source answer does not render reliably | D1=2, D3=2, D4=2 | 22/35 | 27+ | M | P2 | PENDING |
