---
description: Extract a DDD-style ubiquitous language glossary from the current conversation, flagging ambiguities and proposing canonical terms. Saves to UBIQUITOUS_LANGUAGE.md.
---

# Ubiquitous Language

Build a glossary of domain-specific terms for this project, based on the codebase and any conversations so far.

## Process

1. Scan the conversation for domain-relevant nouns, verbs, and concepts
2. Identify problems: same word for different concepts (ambiguity), different words for same concept (synonyms), vague/overloaded terms
3. Propose a canonical glossary with opinionated term choices
4. Write to `UBIQUITOUS_LANGUAGE.md` in the working directory
5. Output a summary inline

## Output Format

Create or update `UBIQUITOUS_LANGUAGE.md` in the project root:

```markdown
# Ubiquitous Language

## Terms

| Term | Definition | Aliases to Avoid |
|------|-----------|-----------------|
| ... | ... | ... |

## Relationships

- [Term A] contains [Term B]
- [Term C] is a specialization of [Term D]

## Example Dialogues

> "When a user [verbs] a [term], the system should [behavior]"

## Flagged Ambiguities

- [ ] "X" could mean Y or Z — needs clarification
```

## Rules

- Be opinionated — pick the best term, list others as aliases to avoid
- Flag conflicts explicitly
- Only domain terms, not programming concepts
- One-sentence definitions max
- Show relationships with bold term names and cardinality
- Group terms into multiple tables when natural clusters emerge
- Write an example dialogue demonstrating terms in use
- Re-running: reads existing file, incorporates new terms, updates definitions, re-flags ambiguities, rewrites dialogue
