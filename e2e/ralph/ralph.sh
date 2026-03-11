#!/usr/bin/env bash
set -euo pipefail

# ── Ralph Loop — Test & Fix Runner ──────────────────────────────
#
# Usage:
#   ./e2e/ralph/ralph.sh                    # Run all modules
#   MODULE=dashboard ./e2e/ralph/ralph.sh   # Run specific module
#   MAX_ITER=100 ./e2e/ralph/ralph.sh       # Custom iteration limit
#
# The loop runs Claude Code with RALPH_PROMPT.md, one spec per iteration.
# Progress is tracked in spec files and git commits.
# ─────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
PROMPT_FILE="$SCRIPT_DIR/RALPH_PROMPT.md"
LOG_DIR="$SCRIPT_DIR/logs"
PROGRESS_SCRIPT="$SCRIPT_DIR/progress.sh"

# Config
MAX_ITER="${MAX_ITER:-200}"
MODULE="${MODULE:-}"
TEST_PORT="${TEST_PORT:-3001}"
COOLDOWN="${COOLDOWN:-5}"

# Modules owned by Codex — Ralph skips these to avoid conflicts
CODEX_MODULES="editor latex notebook slides slides-ai"

# State
ITERATION=0
START_TIME=$(date +%s)

# ── Setup ───────────────────────────────────────────────────────

mkdir -p "$LOG_DIR"

echo ""
echo "  ╔══════════════════════════════════════════════════╗"
echo "  ║           RALPH LOOP — Test & Fix                ║"
echo "  ╠══════════════════════════════════════════════════╣"
echo "  ║  Max iterations: $(printf '%-28s' "$MAX_ITER")║"
echo "  ║  Module filter:  $(printf '%-28s' "${MODULE:-all}")║"
echo "  ║  Test port:      $(printf '%-28s' "$TEST_PORT")║"
echo "  ║  Prompt:         $(printf '%-28s' "RALPH_PROMPT.md")║"
echo "  ╚══════════════════════════════════════════════════╝"
echo ""

# ── Pre-flight checks ──────────────────────────────────────────

if [ ! -f "$PROMPT_FILE" ]; then
  echo "ERROR: RALPH_PROMPT.md not found at $PROMPT_FILE"
  exit 1
fi

# Check if any PENDING specs exist
PENDING_COUNT=$(grep -rl "STATUS: PENDING" "$PROJECT_DIR/e2e/specs/"/*/spec-*.md 2>/dev/null | wc -l | tr -d ' ')
if [ "$PENDING_COUNT" -eq 0 ]; then
  echo "  No PENDING specs found. Run build-specs-from-docs.cjs first."
  echo "  Or all specs are already complete!"
  exit 0
fi
echo "  PENDING specs: $PENDING_COUNT"
echo ""

# ── Check dev server ───────────────────────────────────────────

if ! curl -s -o /dev/null -w "%{http_code}" "http://localhost:$TEST_PORT" | grep -q "200\|302\|301"; then
  echo "  WARNING: Dev server on port $TEST_PORT not responding."
  echo "  Start it with: TEST_PORT=$TEST_PORT npm run dev -- -p $TEST_PORT"
  echo "  Continuing anyway (server may start later)..."
  echo ""
fi

# ── Main loop ──────────────────────────────────────────────────

while [ "$ITERATION" -lt "$MAX_ITER" ]; do
  ITERATION=$((ITERATION + 1))
  ITER_START=$(date +%s)
  LOG_FILE="$LOG_DIR/iter-$(printf '%04d' $ITERATION).log"

  echo "  ┌─────────────────────────────────────────────────"
  echo "  │ Iteration $ITERATION / $MAX_ITER"
  echo "  │ $(date '+%Y-%m-%d %H:%M:%S')"
  echo "  │"

  # Find next spec to test (skip Codex-owned modules unless MODULE is set)
  SKIP_FILTER="grep -v"
  if [ -n "$MODULE" ]; then
    SKIP_FILTER="cat"  # no filtering when module is explicit
  else
    # Build filter to exclude Codex modules
    for cm in $CODEX_MODULES; do
      SKIP_FILTER="$SKIP_FILTER -e /specs/$cm/"
    done
  fi

  if [ -n "$MODULE" ]; then
    NEXT_SPEC=$(grep -rl "STATUS: PENDING" "$PROJECT_DIR/e2e/specs/$MODULE"/spec-*.md 2>/dev/null | sort | head -1 || true)
  else
    NEXT_SPEC=$(grep -rl "STATUS: PENDING" "$PROJECT_DIR/e2e/specs/"/*/spec-*.md 2>/dev/null | eval "$SKIP_FILTER" | sort | head -1 || true)
  fi

  if [ -z "$NEXT_SPEC" ]; then
    echo "  │ No more PENDING specs. Checking for failures..."
    if [ -n "$MODULE" ]; then
      NEXT_SPEC=$(grep -rl "FAIL:" "$PROJECT_DIR/e2e/specs/$MODULE"/spec-*.md 2>/dev/null | sort | head -1 || true)
    else
      NEXT_SPEC=$(grep -rl "FAIL:" "$PROJECT_DIR/e2e/specs/"/*/spec-*.md 2>/dev/null | eval "$SKIP_FILTER" | sort | head -1 || true)
    fi

    if [ -z "$NEXT_SPEC" ]; then
      echo "  │ ALL SPECS COMPLETE (Ralph's modules)!"
      echo "  └─────────────────────────────────────────────────"
      break
    fi
  fi

  SPEC_REL=$(echo "$NEXT_SPEC" | sed "s|$PROJECT_DIR/||")
  echo "  │ Spec: $SPEC_REL"

  # Build the full prompt with spec context
  FULL_PROMPT="$(cat "$PROMPT_FILE")

---

## CURRENT SPEC FILE

File: $SPEC_REL

$(cat "$NEXT_SPEC")
"

  # Run Claude Code with live heartbeat
  echo "  │ Running Claude Code..."

  # Start heartbeat monitor in background
  (
    while true; do
      sleep 30
      # Count checked items in the spec file
      CHECKED=$(grep -c '^\- \[x\]\|^\- \[!\]\|^\- \[b\]\|^\- \[s\]' "$NEXT_SPEC" 2>/dev/null || echo 0)
      TOTAL_ITEMS=$(grep -c '^\- \[' "$NEXT_SPEC" 2>/dev/null || echo 0)
      LOG_SIZE=$(wc -c < "$LOG_FILE" 2>/dev/null | tr -d ' ')
      ELAPSED=$(( $(date +%s) - ITER_START ))
      echo "  │ ♥ ${ELAPSED}s | tested: ${CHECKED}/${TOTAL_ITEMS} | log: ${LOG_SIZE}B"
    done
  ) &
  HEARTBEAT_PID=$!

  echo "$FULL_PROMPT" | CLAUDECODE= claude --dangerously-skip-permissions -p - > "$LOG_FILE" 2>&1 || true

  # Stop heartbeat
  kill "$HEARTBEAT_PID" 2>/dev/null || true
  wait "$HEARTBEAT_PID" 2>/dev/null || true

  ITER_END=$(date +%s)
  ITER_DURATION=$((ITER_END - ITER_START))

  # Show results from the completed spec
  PASS_COUNT=$(grep -c '^\- \[x\]' "$NEXT_SPEC" 2>/dev/null || echo 0)
  FAIL_COUNT=$(grep -c '^\- \[!\]' "$NEXT_SPEC" 2>/dev/null || echo 0)
  BLOCK_COUNT=$(grep -c '^\- \[b\]' "$NEXT_SPEC" 2>/dev/null || echo 0)
  LOG_SIZE=$(wc -c < "$LOG_FILE" 2>/dev/null | tr -d ' ')

  echo "  │"
  echo "  │ Done: ${ITER_DURATION}s | ${PASS_COUNT}P ${FAIL_COUNT}F ${BLOCK_COUNT}B | log: ${LOG_SIZE}B"

  # Show overall progress
  if [ -f "$PROGRESS_SCRIPT" ]; then
    bash "$PROGRESS_SCRIPT" --compact 2>/dev/null || true
  fi

  echo "  └─────────────────────────────────────────────────"
  echo ""

  # Cooldown between iterations
  if [ "$COOLDOWN" -gt 0 ]; then
    sleep "$COOLDOWN"
  fi
done

# ── Final report ───────────────────────────────────────────────

END_TIME=$(date +%s)
TOTAL_DURATION=$((END_TIME - START_TIME))
TOTAL_MINUTES=$((TOTAL_DURATION / 60))

echo ""
echo "  ╔══════════════════════════════════════════════════╗"
echo "  ║           RALPH LOOP — Complete                  ║"
echo "  ╠══════════════════════════════════════════════════╣"
echo "  ║  Iterations run: $(printf '%-28s' "$ITERATION")║"
echo "  ║  Total time:     $(printf '%-28s' "${TOTAL_MINUTES}m")║"
echo "  ╚══════════════════════════════════════════════════╝"
echo ""

# Run final progress report
if [ -f "$PROGRESS_SCRIPT" ]; then
  bash "$PROGRESS_SCRIPT"
fi
