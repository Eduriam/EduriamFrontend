---
name: implement-features
description: Implement end-to-end product features from feature files and Figma prototypes. Use when the user provides feature files, Figma links, or asks to build a feature with tests and mock API updates.
---

# Implement Features

Read these first:

- `AGENTS.md`
- `../write-feature-files/SKILL.md`

## Inputs

- Feature files
- Figma prototype page and component links

## Workflow

1. Read feature scenarios and expected behavior.
2. Analyze Figma prototypes/components with Figma MCP.
3. Reuse existing components where possible; implement missing ones.
4. Implement feature behavior and required mock API updates.
5. Run targeted E2E tests with `yarn test:e2e -- --tags "@feature-tag"` and fix failures.
6. Refactor for guideline compliance.
7. Run `yarn build`, `yarn lint`, and the tagged E2E test again.

## Constraints

- Keep all changes responsive.
- If Figma uses SVG assets, place them in `public/images`.
- Always use Figma MCP for design data.
