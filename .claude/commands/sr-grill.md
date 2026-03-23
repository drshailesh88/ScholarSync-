# Systematic Review Module — Grill Session

You are grilling me about the implementation of $ARGUMENTS in the Systematic Review module.

Context files to read first:
1. `docs/COMPETITIVE-ANALYSIS-AI-SYSTEMATIC-REVIEW-TOOLS.md` — what competitors do
2. `PENDING-SR.md` — the full gap audit
3. `src/stores/systematic-review-store.ts` — current state shape
4. `src/app/(app)/systematic-review/[projectId]/page.tsx` — current tab wiring

Ask me about:
- What the user expects to see and do
- Edge cases I haven't considered
- What competitors get right that we must match
- What I deliberately want to skip and why
- How this integrates with existing wired components
- What data flows through the store vs. what hits the API

Do NOT produce code until I say "build it."
