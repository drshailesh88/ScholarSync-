---
description: Create a PRD through user interview, codebase exploration, and module design, then submit as a GitHub issue.
---

# Write a PRD

You will write a PRD for a new feature. The PRD will be submitted as a GitHub issue.

## Process

1. **Interview the user** about what they want to build. Ask clarifying questions until you understand the feature.
2. **Explore the repo** to understand:
   - What currently exists that's relevant
   - What modules/files will be affected
   - What patterns are already established
   - What tests exist for related features
3. **Interview the user relentlessly** about every aspect of the plan until reaching shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer. If a question can be answered by exploring the codebase, explore the codebase instead.
4. **Sketch the implementation** - identify the modules, interfaces, and schema changes needed. Think about deep modules (small interface, large implementation). Check with user that modules match expectations and which need tests.
5. **Write the PRD** using the template below and submit as a GitHub issue.

## PRD Template

```markdown
# PRD: [Feature Name]

## Problem Statement
_Describe the problem from the user's perspective. What pain does this solve?_

## Solution
_Describe the solution from the user's perspective. What will they experience?_

## User Stories
_A LONG numbered list. Each story follows: "As a <actor>, I want <feature>, so that <benefit>"_

1. As a ..., I want ..., so that ...
2. ...

## Implementation Decisions
_What modules will be created or modified? What interfaces will be defined? What schema changes are needed?_
_Do NOT include file paths - describe modules and interfaces abstractly._
_Think about deep modules: small interface hiding large implementation._

## Testing Decisions
_Which modules will get tests? What makes a good test for this feature? What prior art exists in the test suite?_

## Out of Scope
_What are we explicitly NOT building in this PRD?_
```

## Rules

- The PRD should be self-contained - someone reading only the PRD should understand what to build
- Implementation decisions should describe modules and interfaces, NOT file paths (file paths go stale)
- User stories should be comprehensive - think about edge cases and error states
- Think about "deep modules" from A Philosophy of Software Design
