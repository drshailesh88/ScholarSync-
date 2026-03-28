---
description: Practice TDD - write tests first, then make them pass, then refactor. Use when implementing features or fixing bugs where test-driven development is appropriate.
---

# TDD

Practice test-driven development. Red → Green → Refactor.

## Philosophy

Tests verify behavior through public interfaces, not implementation details. Good tests are integration-style exercising real code paths through public APIs. Bad tests mock internal collaborators, test private methods, or verify through external means.

## Anti-Pattern: Horizontal Slicing

DO NOT write all tests first then all implementation. This produces tests that test imagined behavior, test shape rather than user-facing behavior, and become insensitive to real changes.

Correct approach: vertical slices — one test, one implementation, repeat.

## Workflow

### 1. Planning
- Confirm with user what interface changes are needed
- Confirm which behaviors to test
- Identify deep modules (small interface, large implementation)
- Design interfaces for testability
- List behaviors to verify
- Get user approval

### 2. Tracer Bullet
Write ONE test confirming ONE thing. Make it pass.

### 3. Incremental Loop
For each remaining behavior:
- **RED**: Write a failing test
- **GREEN**: Write the minimum code to make it pass
- One test at a time. Only enough code to pass. Don't anticipate future tests.

### 4. Refactor
- Extract duplication
- Deepen modules (make interface smaller, implementation richer)
- Apply SOLID principles
- Consider what new code reveals about existing code
- NEVER refactor while RED

## Checklist Per Cycle

- [ ] Test describes behavior, not implementation
- [ ] Test uses public interface only
- [ ] Test would survive an internal refactor
- [ ] Code is minimal — no speculative features
- [ ] All previous tests still pass

## Deep Modules

From "A Philosophy of Software Design" by John Ousterhout:
- **Deep module**: Small interface, large implementation (GOOD)
- **Shallow module**: Large interface, thin implementation (BAD)
- Ask: Can I reduce method count? Simplify params? Hide more complexity inside?

## Mocking Rules

- Mock only at system boundaries (external APIs, databases, time/randomness)
- Never mock your own modules
- Use dependency injection
- Prefer SDK-style interfaces over generic fetchers
