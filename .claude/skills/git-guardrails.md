---
description: Set up Claude Code hooks to block dangerous git commands before they execute. Use to protect the repository from accidental destructive operations.
---

# Git Guardrails

Set up Claude Code hooks to block dangerous git operations.

## What Gets Blocked

- `git push` (all variants)
- `git reset --hard`
- `git clean -f` / `-fd`
- `git branch -D`
- `git checkout .`
- `git restore .`
- `push --force`

## Setup

1. Ask scope: project only (`.claude/settings.json`) or all projects (`~/.claude/settings.json`)
2. Add PreToolUse hook to settings JSON:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"$CLAUDE_TOOL_INPUT\" | jq -r '.tool_input.command' | grep -qE '(git reset --hard|git clean|git checkout -- \\.|git branch -D|git push.*--force)' && echo 'BLOCKED: Dangerous git operation. Use a safer alternative.' && exit 1 || exit 0"
          }
        ]
      }
    ]
  }
}
```

3. Verify by running a test command through the hook

## Rules

- Block destructive operations that are almost never wanted in automated context
- If you need to do these, do them manually with intention
- `git push` is blocked so the user explicitly reviews and pushes
