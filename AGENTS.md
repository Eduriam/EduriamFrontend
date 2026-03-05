# AGENTS.md

## Project-level instructions

- Always use `@eduriam/ui-core` and `@eduriam/ui-x` components instead of custom implementations when possible.
- Keep implementations responsive.
- Use Figma MCP for Figma-based tasks.
- Place image assets in `public/images`.
- Always use and define localized texts in `public/locales` instead of hard coding texts. Always use the correct language based on the locale folder name.

## Implementation guidelines

### Project structure

- `features/` contains Gherkin feature files organized by feature.
- `mock/netlify/functions/datafile.json` contains Mockoon API definitions.
- `src/app/` contains Next.js pages.
- `src/app/<page>/components/` contains page-scoped components.
- `src/components/` contains shared components used across pages/features.

### Core rules

1. Prefer `@eduriam/ui-core` and `@eduriam/ui-x` before building custom UI.
2. Avoid custom `sx` overrides on library components unless required.
3. Place page-only components in the page `components/` folder.
4. Place cross-page components in `src/components/`.
5. Implement each component in a PascalCase folder with:
   - `<Name>.tsx`
   - `<Name>.stories.tsx`

### Page conventions

- Keep page files in `src/app/<page>/` with `layout.tsx` and `page.tsx`.
- Put top navigation bars in the page file.
- Use reusable nav bars first (`BackNavigationBar`, `ProgressNavbar`, `BasicNavigationBar`).
- Use `useTransitionNavigationHandler()` for route transitions.

### Mock API conventions

- Use global variables and mockoon endpoint rules to modify the API responses dynamically during testing
