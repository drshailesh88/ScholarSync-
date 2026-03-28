# Multi-Domain Verification & Hardening Plan

## Overview

8 implementation issues are merged. This plan verifies everything works together, hardens quality, and catches regressions. Each step has a detailed execution prompt, agent assignment, and branch instructions.

---

## STEP 1: TypeScript + Lint Full Codebase Check
**Agent:** Local terminal (quick, no API keys needed)
**Risk:** LOW
**Branch:** None needed — read-only check
**Prompt file:** `VERIFY_STEP_01_TYPECHECK.md`

## STEP 2: RSS Feed URL Verification
**Agent:** Local terminal
**Risk:** MEDIUM (many URLs may be broken)
**Branch:** `verify/step-02-fix-feed-urls`
**Prompt file:** `VERIFY_STEP_02_RSS_FEEDS.md`

## STEP 3: DB Migration Dry Run
**Agent:** YOU (manual — touches production database)
**Risk:** HIGH (production DB)
**Branch:** None — migration only
**Instructions inline below**

## STEP 4: Annealing Score Check
**Agent:** Local terminal
**Risk:** LOW (read-only measurement)
**Branch:** None — measurement only
**Prompt file:** `VERIFY_STEP_04_ANNEALING.md`

## STEP 5: Full E2E Journey Tests (139 tests)
**Agent:** Local terminal
**Risk:** LOW (read-only test run)
**Branch:** None — test run only
**Prompt file:** `VERIFY_STEP_05_E2E.md`

## STEP 6: Integration Test — Physics User Journey
**Agent:** Codex (high-stakes — writes new E2E tests for multi-domain)
**Risk:** HIGH (new test code, touches multiple modules)
**Branch:** `verify/step-06-multi-domain-e2e`
**Prompt file:** `VERIFY_STEP_06_INTEGRATION.md`

## STEP 7: Feature Testing Doc Updates
**Agent:** Codex (large scope — updates 8+ feature testing docs)
**Risk:** MEDIUM
**Branch:** `verify/step-07-feature-docs`
**Prompt file:** `VERIFY_STEP_07_FEATURE_DOCS.md`

## STEP 8: Annealing Self-Heal (if score dropped)
**Agent:** Local terminal with `--dangerously-skip-permissions`
**Risk:** MEDIUM (fixes code)
**Branch:** `verify/step-08-annealing-heal`
**Prompt file:** `VERIFY_STEP_08_HEAL.md`

---

## STEP 3 INSTRUCTIONS (MANUAL — YOU DO THIS)

```bash
# 1. Check current Neon database connection
npx drizzle-kit studio

# 2. Review the migration file
cat drizzle/0015_add_user_domain.sql

# 3. Push migration to Neon (this modifies your database)
npx drizzle-kit push

# 4. Verify the column exists
# In Drizzle Studio or via psql:
# SELECT column_name, data_type, column_default FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'domain';
```

Expected output: `domain | text | 'medicine'`

---

## EXECUTION ORDER

```
Step 1 (typecheck) → if clean, proceed
Step 2 (RSS feeds) → can run in parallel with Step 1
Step 3 (DB migration) → YOU do this manually
Step 4 (annealing) → after Steps 1-3
Step 5 (E2E tests) → after Step 3 (needs DB)
Step 6 (integration tests) → after Step 5 (needs baseline passing)
Step 7 (feature docs) → after Step 6 (needs test results)
Step 8 (self-heal) → only if Step 4 or 5 shows regressions
```

## PARALLELIZATION

```
Step 1 (local terminal) ──────┐
Step 2 (local terminal) ──────┤──→ Step 4 (annealing) → Step 5 (E2E)
Step 3 (manual DB migration) ─┘              ↓
                                    Step 6 (Codex — new E2E tests)
                                             ↓
                                    Step 7 (Codex — feature docs)
                                             ↓
                                    Step 8 (self-heal if needed)
```
