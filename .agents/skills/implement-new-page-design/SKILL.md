---
name: implement-new-page-design
description: Redesign an existing page to match Figma without changing behavior. Use when the user provides code page paths and Figma links for visual-only updates.
---

# Implement New Page Design

Read `AGENTS.md` before coding.

## Inputs

- Figma prototype page/component links
- Codebase page paths

## Workflow

1. Analyze target pages and Figma design via Figma MCP.
2. Update styling, structure, and presentation to match design.
3. Preserve current functionality and flow.
4. Refactor to follow project implementation guidelines.
5. Run `yarn build` and `yarn lint`; fix issues.

## Constraints

- Keep all changes responsive.
- If Figma includes SVG assets, store them in `public/images`.
