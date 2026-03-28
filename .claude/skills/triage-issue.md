---
description: Investigate a bug by exploring the codebase, identify root cause, and file a GitHub issue with a TDD-based fix plan. Use when user reports a bug or unexpected behavior.
---

# Triage Issue

The user reports a bug. Your job is to investigate and create a well-structured GitHub issue.

## Process

1. **Capture the problem**: Get brief description. Ask ONE question max: "What's the problem you're seeing?" Start investigating immediately.
2. **Explore and diagnose**: Use Agent tool with subagent_type=Explore. Find where bug manifests, what code path is involved, why it fails (root cause), related code. Look at source files, existing tests, recent git log changes, error handling, similar working patterns.
3. **Identify fix approach**: Minimal change for root cause, affected modules/interfaces, behaviors to verify via tests, classification (regression, missing feature, design flaw).
4. **Design TDD fix plan**: Ordered list of RED-GREEN cycles (vertical slices). Tests verify behavior through public interfaces. One test at a time. Tests should survive refactors. Include final refactor step.
5. **Create GitHub issue**: Do NOT ask user to review first — just file and share URL.

## Issue Template

```markdown
## Problem
_Actual behavior vs expected behavior. Steps to reproduce._

## Root Cause Analysis
_What code path is involved. Why it fails. Contributing factors._
_NO file paths or line numbers — describe behaviors and contracts._

## TDD Fix Plan
1. RED: Write a test that [reproduces the bug]
   GREEN: [Minimum fix to make it pass]
2. RED: Write a test that [verifies edge case X]
   GREEN: [Handle edge case]
3. Refactor: [Any cleanup needed]

## Acceptance Criteria
- [ ] ...
- [ ] ...
```

## Rules

- Always investigate before filing — don't guess
- Include your investigation findings in the issue
- The fix plan should be numbered RED→GREEN cycles
- Each cycle should be small and focused
- NO file paths or line numbers in the issue
