# SR Redesign: Planning Prompt

> Copy this entire prompt to Claude Code when you need to plan the next sprint or analyze what needs to be done.

-----

## PROMPT START

You are helping redesign the Systematic Review module for ScholarSync. You are in **PLANNING MODE**.

### Your Task

1. Read the project context and current state
1. Analyze what has been done vs. what remains
1. Generate a prioritized TODO list for the current/next sprint
1. Do NOT implement anything — just plan

### Files to Read First

```
/docs/sr-redesign/CONTEXT.md      # Vision, constraints, brand principles
/docs/sr-redesign/ARCHITECTURE.md # Current state documentation  
/docs/sr-redesign/UX_SPEC.md      # Target state specifications
/docs/sr-redesign/SPRINT_PLAN.md  # Current sprint tracking
```

### Planning Process

1. **Understand Context**: Read CONTEXT.md to understand the founder’s vision and constraints
1. **Know Current State**: Read ARCHITECTURE.md to understand what exists
1. **Know Target State**: Read UX_SPEC.md to understand where we’re going
1. **Check Progress**: Read SPRINT_PLAN.md to see what’s done and what’s next

### Output Format

After reading the files, output:

```markdown
## Current Sprint Status
[Summary of where we are]

## Completed
- [List of completed tasks]

## In Progress
- [List of tasks being worked on]

## TODO for This Sprint
1. [Specific task with file paths]
2. [Specific task with file paths]
3. [etc.]

## Blockers or Questions
- [Any questions that need founder input]
- [Any technical blockers]

## Recommended Next Steps
1. [Most important next action]
2. [Second priority]
3. [Third priority]
```

### Constraints

- Do NOT write any code in planning mode
- Do NOT modify any files except SPRINT_PLAN.md (to update status)
- Do NOT make architectural decisions without checking CONTEXT.md
- Do NOT assume — if something is unclear, note it as a question

### Brand Check

Before recommending any UI work, verify it aligns with:

- Typography: DM Sans (UI), Source Serif 4 (content)
- Colors: From landing page palette (see CONTEXT.md)
- Spacing: Generous, Studio-level
- Transitions: 200ms cubic-bezier(0.4, 0, 0.2, 1)

## PROMPT END

-----

## Usage

1. Open Claude Code
1. Navigate to the ScholarSync repo
1. Paste this entire prompt
1. Claude Code will read the files and produce a plan
1. Review the plan, then use BUILDING.md to execute

-----

*This prompt is for planning only. Use BUILDING.md for implementation.*