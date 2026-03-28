# Step 4 (v2): Self-Annealing QA Loop — Post Multi-Domain Expansion

## AGENT: Local terminal with `claude --dangerously-skip-permissions`
## BRANCH: `verify/step-04-annealing-v2`

## BRANCH INSTRUCTIONS (DO THIS FIRST)

```bash
git checkout main
git pull origin main
git checkout -b verify/step-04-annealing-v2
```

## CRITICAL CONTEXT

We just merged 8 PRs adding ~8,000 lines of code for multi-domain expansion:
- Domain Registry with 15 domain configs
- arXiv source adapter
- Domain-aware search pipeline (query augment, evidence levels, study types, filters)
- Domain branching in deep research, RAG, guide/learn mode, presentation, poster
- Feature flags controlling module visibility
- Onboarding domain picker + DB migration
- ~300 curated journal feeds
- Domain-specific poster templates + LaTeX templates

The LAST annealing score (99.41 FROZEN) was measured BEFORE these changes. We need to measure the score NOW against the current codebase and fix any regressions.

## DO NOT just read annealing-log.jsonl and report the old score. That score is STALE. You MUST run the quality scorer fresh.

## WHAT TO DO

### Phase 1: Measure

```bash
# Run the quality scorer against CURRENT codebase
node quality-score.mjs 2>&1 | tee /tmp/annealing-fresh.log

# Show the result
cat /tmp/annealing-fresh.log
```

Record the composite score and every dimensional score. Compare against the previous entry in `annealing-log.jsonl`.

### Phase 2: Diagnose (if score dropped)

For EACH dimension that dropped:
1. What was the score before? What is it now?
2. Which files from the multi-domain work likely caused the drop?
3. What specific checkpoints are failing?

Common things that could have dropped:
- **TypeScript Strict** — new files might have `any` types or missing strict annotations
- **Lint Cleanliness** — new files might have lint warnings
- **Error Boundaries** — new domain provider component might need error boundaries
- **API Hardening** — new API routes (`/api/deep-research`, `/api/feeds/copilot/summarize`) may need input validation, auth checks, rate limiting
- **Empty/Boundary States** — what happens when domain config is missing? When sources array is empty? When journal feeds return nothing?
- **Auth Security** — new routes need auth checks
- **Checkpoint Pass Rate** — new features need checkpoints in FEATURES_TESTING.md docs

### Phase 3: Fix (one at a time, TDD)

For each regression found:

1. Write a test that captures the regression (RED)
2. Fix the code minimally (GREEN)
3. Verify the fix doesn't break anything else
4. Run `node quality-score.mjs` again to see if the dimension improved
5. Commit the fix

```bash
# After each fix:
npx tsc --noEmit  # must stay clean
npx vitest run src/lib/search/ src/lib/deep-research/ src/lib/rag/ src/lib/ai/  # existing tests pass
node quality-score.mjs  # check if score improved
```

### Phase 4: Loop

Repeat Phase 2-3 until:
- Composite score ≥ 95 (FROZEN temperature)
- No dimension below 80
- All existing tests pass

### Phase 5: Log

Append the final score to the annealing log:

```bash
# Get current score values from the quality scorer output and append
# Format must match existing entries in annealing-log.jsonl
```

Also update `docs/handover-context.md` with:
- Current annealing score
- What was fixed
- Multi-domain expansion status

## WHAT NOT TO DO

- DO NOT just read the old annealing log and report that score
- DO NOT skip running `node quality-score.mjs`
- DO NOT modify the quality-score.mjs scorer itself
- DO NOT modify existing test files (only add new ones if needed)
- DO NOT break the medicine path — all fixes must preserve backward compatibility

## TYPICAL FIXES YOU MIGHT NEED

1. **New API routes missing auth**: Add `getCurrentUserId()` check at top of route
2. **New API routes missing rate limiting**: Add `checkRateLimit()` call
3. **New API routes missing input validation**: Add zod schema validation
4. **New components missing error boundaries**: Wrap with ErrorBoundary
5. **Empty state handling**: What does FilterPanel show when domain has 0 filter options? What does the journal browser show when there are 0 feeds for a domain?
6. **Missing TypeScript strict annotations**: Add proper types to new functions

## COMMIT AND PR

After each fix cycle, commit:
```bash
git add -A
git commit -m "anneal: fix [dimension] regression — [what was fixed]"
```

After all fixes:
```bash
git push -u origin verify/step-04-annealing-v2
gh pr create --base main --title "anneal: post-multi-domain self-healing — score [X] → [Y]" --body "Self-annealing loop after multi-domain expansion. Fixed [N] regressions."
```
