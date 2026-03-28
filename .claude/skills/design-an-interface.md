---
description: Generate multiple radically different interface designs for a module using parallel sub-agents. Use when designing a new type, API, or module boundary that will be used by many callers.
---

# Design an Interface

When designing a new interface (type, API, module boundary), explore multiple radically different approaches before committing.

Based on "Design It Twice" from "A Philosophy of Software Design" by John Ousterhout.

## Process

1. **Gather Requirements**: What problem does this solve? Who are the callers? What are the key operations? What constraints exist? What should be hidden vs exposed?
2. **Generate Designs**: Spawn 3+ sub-agents simultaneously using Agent tool, each with a different constraint:
   - Approach A: Minimize the number of methods/fields
   - Approach B: Maximize flexibility/extensibility
   - Approach C: Optimize for the most common use case
   - (Optional) Approach D: Your own creative constraint
3. **Present Designs**: Show each with interface signature, usage examples, what it hides. Present sequentially.
4. **Compare Designs**: Compare on interface simplicity, general-purpose vs specialized, implementation efficiency, depth, ease of correct use vs ease of misuse. Discuss in prose, not tables.
5. **Synthesize**: Often the best design combines insights from multiple approaches. Ask which fits primary use case, what elements to incorporate.

## Evaluation Criteria

- Interface simplicity (fewer methods = better)
- General-purpose capability
- Implementation efficiency
- **Depth** (small interface hiding significant complexity = GOOD)
- Ease of correct use / difficulty of incorrect use

## Anti-Patterns

- Don't let sub-agents produce similar designs
- Don't skip the comparison step
- Don't implement — this is purely about interface shape
- Don't evaluate based on implementation effort alone
