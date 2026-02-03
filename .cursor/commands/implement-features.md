# Implement Features

Based on the provided feature files and links to Figma prototype pages and components, implement the features.

## Input

- Figma prototype pages and components
- Feature files

## Workflow

1. READ the feature files with scenarios
2. ANALYZE all the provided Figma prototype pages and components.
3. ANALYZE which components are already present in the codebase and which need to be implemented
4. IMPLEMENT the feature and necessary components based on the feature file and provided designs
5. IMPLEMENT any necessary changes to the mock API
6. RUN E2E tests for the specific feature using `yarn test:e2e -- --tags "@feature-tag"`
7. FIX any errors or missing steps. Always run tests so that you know everything was fixed.
8. REFACTOR the code so that it follows the implementation guidelines.
9. RUN `yarn build`, `yarn lint` and `yarn test:e2e -- --tags "@feature-tag"` to verify that the feature is working. Fix any issues.

## Details

- All implementation should be responsive!
- Always follow the implementation guidelines defined in `.cursor/rules/implementation-guidelines.mdc`
- The E2E tests take a long time to run. You can always run the `sleep` command to wait for the tests to finish. Recommended sleep time
- If you have any questions regarding the implementation you can ask.
- If the Figma page contains SVG images, download them and put them in a `public/images` directory
