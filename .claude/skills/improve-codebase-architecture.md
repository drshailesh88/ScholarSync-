---
description: Explore a codebase for architectural improvement opportunities - find shallow modules to deepen, interfaces to simplify, and complexity to extract. Use periodically or after major feature additions.
---

# Improve Codebase Architecture

Explore the codebase looking for architectural friction and opportunities to improve.

## Process

1. **Explore broadly** - read module boundaries, interfaces, type definitions. Look for:
   - Where does understanding one concept require bouncing between many small files?
   - Where have pure functions been extracted just for testability, but the real bugs hide in how they're called?
   - Where do tightly coupled modules create integration risk in the seams between them?
   - What is untested or hard to test?
2. **Present candidates** - numbered list showing: Cluster, Why they're coupled, Dependency category, Test impact. Do NOT propose interfaces yet.
3. **User picks a candidate**
4. **Frame the problem space** - write user-facing explanation of constraints, dependencies, rough illustrative code sketch. Show to user, then proceed.
5. **Design multiple interfaces** - spawn 3+ sub-agents in parallel with different constraints (minimize interface, maximize flexibility, optimize common case, ports & adapters). Each outputs: interface signature, usage example, what it hides, dependency strategy, trade-offs. Present sequentially, compare in prose, give opinionated recommendation.
6. **User picks interface**
7. **Create GitHub issue** as a refactor RFC

## Dependency Categories

1. **In-process**: Pure computation, no I/O. Always deepenable.
2. **Local-substitutable**: Has local test stand-ins (PGLite for Postgres, in-memory filesystem).
3. **Remote but owned (Ports & Adapters)**: Own services across network boundary. Define port at module boundary, inject transport.
4. **True external (Mock)**: Third-party services. Mock at the boundary via injected port.

## Rules

- Don't propose changes just for the sake of change
- Every proposal must reduce complexity, not just move it
- Consider the migration cost
- Prefer deepening existing modules over creating new ones
