# Branch Protection Setup (MUST DO MANUALLY IN GITHUB)

## Why
Without branch protection, anyone (including AI tools) can push broken code
directly to main. These rules ensure every change goes through a Pull Request
and passes CI before merging.

## Steps

1. Go to: https://github.com/drshailesh88/ScholarSync-/settings/rules
2. Click "New ruleset"
3. Configure:
   - **Ruleset name:** Protect main
   - **Enforcement status:** Active
   - **Target branches:** Add target → Include default branch
   - **Rules to enable:**
     - ✅ Restrict deletions
     - ✅ Require a pull request before merging
       - Required approvals: 0 (since you're solo, set to 0)
     - ✅ Require status checks to pass
       - Click "Add checks"
       - Add: `Code Quality`
       - Add: `Build`
     - ✅ Block force pushes
4. Click "Create"

## What this does
- Nobody (including you) can push directly to `main` — all changes must go through a PR
- PRs cannot be merged unless CI passes (lint + typecheck + build)
- Force pushes to main are blocked (prevents accidental history rewrites)
- The branch cannot be deleted

## For your AI coding workflow
When using Claude Code or any AI tool:
1. AI creates a feature branch (e.g., `claude/some-feature-xyz`)
2. AI pushes code to that branch
3. AI opens a Pull Request to main
4. CI automatically runs and must pass
5. You review and merge only if green ✅

If CI is red ❌, tell the AI tool: "CI failed, fix the errors before I can merge"
