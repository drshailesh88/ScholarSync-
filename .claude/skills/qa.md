---
description: QA a feature interactively - the user describes issues and you file them as GitHub issues. Use when the user wants to do a QA walkthrough of a completed feature.
---

# QA

The user will walk through a feature and describe problems they find. Your job is to turn their feedback into well-written, durable GitHub issues.

## Process

1. **Listen and lightly clarify**: At most 2-3 short clarifying questions (expected vs actual, steps to reproduce, consistent or intermittent). Do NOT over-interview.
2. **Explore codebase in background**: Use Agent (subagent_type=Explore) to learn domain language (check UBIQUITOUS_LANGUAGE.md), understand feature purpose, identify behavior boundary. NOT to find a fix.
3. **Assess scope**: Single issue or breakdown? Break down when fix spans multiple independent areas, separable concerns, or multiple distinct failure modes.
4. **File GitHub issue(s)**: Create with `gh issue create`. Do NOT ask user to review first — just file and share URLs.

## Single Issue Template

```markdown
## What Happened
_Describe the unexpected behavior using domain language, not code references._

## What Should Happen
_Describe the expected behavior._

## Steps to Reproduce
1. ...
2. ...

## Additional Context
_Any relevant details._
```

## Breakdown Template

```markdown
## Parent Issue: #[number]

## What's Wrong
_Describe the behavior problem._

## What Should Happen
_Describe the expected behavior._

## Steps to Reproduce
1. ...

## Blocked By
- #[number] (reason)

## Additional Context
```

## Rules for Durable Issues

- **NO file paths or line numbers** - they go stale after refactors
- **Use domain language** from UBIQUITOUS_LANGUAGE.md, not code references
- **Describe behaviors** - "When a user searches for X, the results should show Y"
- **NOT implementation details** - "The function in utils.ts should return Z"
- A good issue reads like a spec; a bad one reads like a diff
- Issues must survive a major refactor - if someone rewrites the entire module, the issue should still make sense
- After filing, ask "Next issue, or are we done?"
