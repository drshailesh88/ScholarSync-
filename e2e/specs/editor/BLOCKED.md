# Editor Blocked Items

Date: 2026-03-11
Current spec: `spec-001.md`
Status: `BLOCKED`

## Blocker

Browser automation cannot be started inside the current Codex sandbox.

## Evidence

- `agent-browser` is not available.
- No local Playwright package is installed in the workspace.
- Direct Chrome launch fails under sandbox restrictions with Crashpad permission errors against the user Library path.
- On-demand Playwright bootstrap did not complete, so targeted Playwright could not be used as the required fallback.

## Required to resume

One of the following must be available:

1. A working `agent-browser` tool in the Codex session.
2. A usable Playwright installation plus a browser launch path that works inside the sandbox.
3. An environment where targeted elevated Playwright is permitted for `spec-001.md`.

## Resume point

- Start at `e2e/specs/editor/spec-001.md`.
- First real-user browser actions should cover `/editor/new` and `/studio` items from that spec in order.
