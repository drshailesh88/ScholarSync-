#!/usr/bin/env bash
set -euo pipefail

# ── Progress Reporter ───────────────────────────────────────────
#
# Usage:
#   ./e2e/ralph/progress.sh           # Full report
#   ./e2e/ralph/progress.sh --compact # One-line summary
#   ./e2e/ralph/progress.sh --module dashboard  # Single module
# ─────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
SPECS_DIR="$PROJECT_DIR/e2e/specs"

COMPACT=false
TARGET_MODULE=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --compact) COMPACT=true; shift ;;
    --module) TARGET_MODULE="$2"; shift 2 ;;
    *) shift ;;
  esac
done

# ── Gather stats ───────────────────────────────────────────────

TOTAL_SPECS=0
TOTAL_COMPLETE=0
TOTAL_PENDING=0
TOTAL_PASS=0
TOTAL_FAIL=0
TOTAL_BLOCKED=0
MODULE_STATS=""

for module_dir in "$SPECS_DIR"/*/; do
  [ -d "$module_dir" ] || continue
  module=$(basename "$module_dir")

  if [ -n "$TARGET_MODULE" ] && [ "$module" != "$TARGET_MODULE" ]; then
    continue
  fi

  m_specs=0
  m_complete=0
  m_pending=0
  m_pass=0
  m_fail=0
  m_blocked=0

  for spec_file in "$module_dir"/spec-*.md; do
    [ -f "$spec_file" ] || continue
    m_specs=$((m_specs + 1))

    status=$(grep "^STATUS:" "$spec_file" 2>/dev/null | head -1 | awk '{print $2}')
    case "$status" in
      COMPLETE) m_complete=$((m_complete + 1)) ;;
      PARTIAL)  ;; # counted but not complete
      *)        m_pending=$((m_pending + 1)) ;;
    esac

    # Count from header (only first 10 lines to avoid matching result lines)
    p=$(head -10 "$spec_file" | grep "^PASS:" 2>/dev/null | awk '{print $2}')
    f=$(head -10 "$spec_file" | grep "^FAIL:" 2>/dev/null | awk '{print $2}')
    b=$(head -10 "$spec_file" | grep "^BLOCKED:" 2>/dev/null | awk '{print $2}')

    m_pass=$((m_pass + ${p:-0}))
    m_fail=$((m_fail + ${f:-0}))
    m_blocked=$((m_blocked + ${b:-0}))
  done

  TOTAL_SPECS=$((TOTAL_SPECS + m_specs))
  TOTAL_COMPLETE=$((TOTAL_COMPLETE + m_complete))
  TOTAL_PENDING=$((TOTAL_PENDING + m_pending))
  TOTAL_PASS=$((TOTAL_PASS + m_pass))
  TOTAL_FAIL=$((TOTAL_FAIL + m_fail))
  TOTAL_BLOCKED=$((TOTAL_BLOCKED + m_blocked))

  if [ "$m_specs" -gt 0 ]; then
    pct=0
    if [ "$m_specs" -gt 0 ]; then
      pct=$((m_complete * 100 / m_specs))
    fi
    MODULE_STATS="$MODULE_STATS\n  | $(printf '%-20s' "$module") | $(printf '%3s' "$m_specs") | $(printf '%3s' "$m_complete") | $(printf '%3s' "$m_pending") | $(printf '%3s' "$m_pass") | $(printf '%3s' "$m_fail") | $(printf '%3s' "$m_blocked") | $(printf '%3s' "$pct")% |"
  fi
done

# ── Output ─────────────────────────────────────────────────────

if $COMPACT; then
  TOTAL_TESTED=$((TOTAL_PASS + TOTAL_FAIL + TOTAL_BLOCKED))
  echo "  │ Progress: ${TOTAL_COMPLETE}/${TOTAL_SPECS} specs | ${TOTAL_PASS}P ${TOTAL_FAIL}F ${TOTAL_BLOCKED}B"
  exit 0
fi

echo ""
echo "  ╔══════════════════════════════════════════════════════════════════════════════╗"
echo "  ║                    ScholarSync — Test Progress Report                        ║"
echo "  ╠══════════════════════════════════════════════════════════════════════════════╣"
echo ""
echo "  | Module               | Specs | Done | Left | Pass | Fail | Block | Pct  |"
echo "  |----------------------|-------|------|------|------|------|-------|------|"
echo -e "$MODULE_STATS"
echo ""

TOTAL_PCT=0
if [ "$TOTAL_SPECS" -gt 0 ]; then
  TOTAL_PCT=$((TOTAL_COMPLETE * 100 / TOTAL_SPECS))
fi

echo "  ── Totals ──"
echo "  Spec files:  $TOTAL_SPECS"
echo "  Complete:    $TOTAL_COMPLETE ($TOTAL_PCT%)"
echo "  Pending:     $TOTAL_PENDING"
echo "  Pass:        $TOTAL_PASS"
echo "  Fail:        $TOTAL_FAIL"
echo "  Blocked:     $TOTAL_BLOCKED"
echo ""
echo "  ╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""
