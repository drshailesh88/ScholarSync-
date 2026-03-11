#!/usr/bin/env bash
set -euo pipefail

# ── Ralph Loop — Test & Fix Runner (v2: per-module branches) ────
#
# Usage:
#   ./e2e/ralph/ralph.sh                    # Run all Claude-owned modules
#   MODULE=dashboard ./e2e/ralph/ralph.sh   # Run specific module
#   MAX_ITER=100 ./e2e/ralph/ralph.sh       # Custom iteration limit
#
# Branch model:
#   test/queue-v2            → specs and manifests (no app code)
#   test/claude-{module}-v2  → test results + code fixes per module
#   test/integration-v2      → human-reviewed merges only
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
QUEUE_BRANCH="test/queue-v2"

# Claude-owned modules (from OWNERSHIP.md)
CLAUDE_MODULES="analysis compliance dashboard deep-research feeds illustrate library onboarding poster presentation projects research settings studio systematic-review"

# State
ITERATION=0
START_TIME=$(date +%s)
CURRENT_MODULE=""

# ── Helper: switch to module branch ──────────────────────────────

switch_to_module_branch() {
  local mod="$1"
  local branch="test/claude-${mod}-v2"

  if ! git rev-parse --verify "$branch" >/dev/null 2>&1; then
    echo "  │ Creating branch: $branch"
    git checkout -b "$branch" "$QUEUE_BRANCH" --quiet
  else
    git checkout "$branch" --quiet
  fi
  CURRENT_MODULE="$mod"
}

# ── Helper: extract module name from spec path ───────────────────

module_from_spec() {
  echo "$1" | sed 's|.*/e2e/specs/\([^/]*\)/.*|\1|'
}

# ── Setup ───────────────────────────────────────────────────────

mkdir -p "$LOG_DIR"

echo ""
echo "  ╔══════════════════════════════════════════════════╗"
echo "  ║       RALPH LOOP v2 — Per-Module Branches        ║"
echo "  ╠══════════════════════════════════════════════════╣"
echo "  ║  Max iterations: $(printf '%-28s' "$MAX_ITER")║"
echo "  ║  Module filter:  $(printf '%-28s' "${MODULE:-all claude}")║"
echo "  ║  Test port:      $(printf '%-28s' "$TEST_PORT")║"
echo "  ║  Queue branch:   $(printf '%-28s' "$QUEUE_BRANCH")║"
echo "  ╚══════════════════════════════════════════════════╝"
echo ""

# ── Pre-flight checks ──────────────────────────────────────────

if [ ! -f "$PROMPT_FILE" ]; then
  echo "ERROR: RALPH_PROMPT.md not found at $PROMPT_FILE"
  exit 1
fi

# Ensure we're on the queue branch to start
git checkout "$QUEUE_BRANCH" --quiet 2>/dev/null || {
  echo "ERROR: Queue branch $QUEUE_BRANCH does not exist."
  echo "Create it first with the queue infrastructure."
  exit 1
}

# Count pending specs (Claude-owned only)
if [ -n "$MODULE" ]; then
  PENDING_COUNT=$(grep -rl "STATUS: PENDING" "$PROJECT_DIR/e2e/specs/$MODULE"/spec-*.md 2>/dev/null | wc -l | tr -d ' ')
else
  PENDING_COUNT=0
  for cm in $CLAUDE_MODULES; do
    cnt=$(grep -rl "STATUS: PENDING" "$PROJECT_DIR/e2e/specs/$cm"/spec-*.md 2>/dev/null | wc -l | tr -d ' ')
    PENDING_COUNT=$((PENDING_COUNT + cnt))
  done
fi

if [ "$PENDING_COUNT" -eq 0 ]; then
  echo "  No PENDING specs found for Claude-owned modules."
  exit 0
fi
echo "  PENDING specs: $PENDING_COUNT"
echo ""

# ── Check dev server ───────────────────────────────────────────

if ! curl -s -o /dev/null -w "%{http_code}" "http://localhost:$TEST_PORT" | grep -q "200\|302\|301"; then
  echo "  WARNING: Dev server on port $TEST_PORT not responding."
  echo "  Continuing anyway..."
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

  # Find next pending spec across Claude-owned modules
  NEXT_SPEC=""
  NEXT_MODULE=""

  if [ -n "$MODULE" ]; then
    NEXT_SPEC=$(grep -rl "STATUS: PENDING" "$PROJECT_DIR/e2e/specs/$MODULE"/spec-*.md 2>/dev/null | sort | head -1 || true)
    NEXT_MODULE="$MODULE"
  else
    for cm in $CLAUDE_MODULES; do
      NEXT_SPEC=$(grep -rl "STATUS: PENDING" "$PROJECT_DIR/e2e/specs/$cm"/spec-*.md 2>/dev/null | sort | head -1 || true)
      if [ -n "$NEXT_SPEC" ]; then
        NEXT_MODULE="$cm"
        break
      fi
    done
  fi

  if [ -z "$NEXT_SPEC" ]; then
    echo "  │ ALL CLAUDE SPECS COMPLETE!"
    echo "  └─────────────────────────────────────────────────"
    break
  fi

  SPEC_REL=$(echo "$NEXT_SPEC" | sed "s|$PROJECT_DIR/||")
  echo "  │ Module: $NEXT_MODULE"
  echo "  │ Spec:   $SPEC_REL"

  # Switch to the module's branch
  if [ "$CURRENT_MODULE" != "$NEXT_MODULE" ]; then
    echo "  │ Branch: test/claude-${NEXT_MODULE}-v2"
    switch_to_module_branch "$NEXT_MODULE"
  fi

  # Build the full prompt with spec context and branch awareness
  FULL_PROMPT="$(cat "$PROMPT_FILE")

---

## CURRENT SPEC FILE

File: $SPEC_REL
Module: $NEXT_MODULE
Branch: test/claude-${NEXT_MODULE}-v2

IMPORTANT: You are on branch test/claude-${NEXT_MODULE}-v2.
Only modify files related to the ${NEXT_MODULE} module.
Commit all changes to THIS branch.

$(cat "$NEXT_SPEC")
"

  # Run Claude Code with live heartbeat
  echo "  │ Running Claude Code..."

  # Start heartbeat monitor in background
  (
    while true; do
      sleep 30
      CHECKED=$(grep -c '^\- \[x\]\|^\- \[!\]\|^\- \[b\]\|^\- \[s\]' "$NEXT_SPEC" 2>/dev/null || echo 0)
      TOTAL_ITEMS=$(grep -c '^\- \[' "$NEXT_SPEC" 2>/dev/null || echo 0)
      LOG_SIZE=$(wc -c < "$LOG_FILE" 2>/dev/null | tr -d ' ')
      ELAPSED=$(( $(date +%s) - ITER_START ))
      echo "  │ ♥ ${ELAPSED}s | tested: ${CHECKED}/${TOTAL_ITEMS} | log: ${LOG_SIZE}B"
    done
  ) &
  HEARTBEAT_PID=$!

  echo "$FULL_PROMPT" | CLAUDECODE= claude \
    --dangerously-skip-permissions \
    --disallowed-tools "mcp__task-master-ai__expand_task,mcp__task-master-ai__get_task,mcp__task-master-ai__get_tasks,mcp__task-master-ai__next_task,mcp__task-master-ai__parse_prd,mcp__task-master-ai__set_task_status,mcp__task-master-ai__update_subtask,TaskCreate,TaskGet,TaskList,TaskUpdate,TaskStop" \
    --disable-slash-commands \
    -p - > "$LOG_FILE" 2>&1 || true

  # Stop heartbeat
  kill "$HEARTBEAT_PID" 2>/dev/null || true
  wait "$HEARTBEAT_PID" 2>/dev/null || true

  ITER_END=$(date +%s)
  ITER_DURATION=$((ITER_END - ITER_START))

  # Show results
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

# Switch back to queue branch
git checkout "$QUEUE_BRANCH" --quiet 2>/dev/null || true

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

if [ -f "$PROGRESS_SCRIPT" ]; then
  bash "$PROGRESS_SCRIPT"
fi
