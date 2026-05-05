---
name: implement-component
description: Implement a React component from a Figma design into this codebase. Use when the user provides a Figma link or node and asks for a new or updated component implementation.
---

# Implement Component

Read `AGENTS.md` before coding.

## Inputs

- Figma design link or node ID
- Optional behavior notes

## Workflow

1. Fetch design context with Figma MCP (structure, variables, assets, screenshot).
2. Identify whether an existing component from `@eduriam/ui-core` or `@eduriam/ui-x` should be used.
3. Implement the component in the correct location based on reuse scope.
4. Keep the implementation responsive and visually faithful to Figma.
5. Do not integrate the component into pages unless explicitly requested.

## Constraints

- Use Figma MCP for design data.
- Follow project implementation guidelines.
