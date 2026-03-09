# Quality Gap Closure Roadmap

## Sprint 1: Critical Gaps (P0) — Weeks 1-2
- GAP-001 Research search stall + hydration mismatch (M)
- GAP-002 Studio citation insertion failure (M)
- GAP-003 LaTeX paper creation crash (M)
- GAP-004 Integrity check result-path stall (M)

## Sprint 2: Important Gaps (P1) — Weeks 3-4
- GAP-005 Notebook answer generation + feedback hardening (M)
- GAP-006 Systematic Review create-flow unblock (M)
- GAP-007 Studio selection-formatting reliability (S)

## Sprint 3: Polish Gaps (P2) — Weeks 5-6
- Slides AI-generation and landing-flow hardening
- Illustration route normalization and export confidence
- Studio export feedback and advanced insertion discoverability
- Any remaining list-exit / empty-state polish issues

## Deferred to V2
- Full competitor-grade collaboration parity in Studio
- Deeper BioRender-grade manual editing validation
- Broader NotebookLM-style artifact/export completeness

## How to Execute
For each gap:
1. Open Claude Code
2. Run: `/gsd:quick "[Gap description from spec]"`
3. For larger grouped work, start `/gsd:new-milestone` and use the spec files as the discuss-phase input
4. Implement, verify with `agent-browser`, and commit before moving on

## GSD Setup Note
- GSD is installed locally in `.claude/`
- The slash-command workflows are available under `.claude/commands/gsd/`
- I did not auto-run an interactive milestone workflow from the shell because this install is slash-command oriented; the gap specs above are ready to be used directly in `/gsd:quick` or `/gsd:new-milestone`

