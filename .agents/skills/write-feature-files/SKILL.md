---
name: write-feature-files
description: Create or update Gherkin feature files and related step-definition conventions from requirements and use cases. Use when the user asks for new/updated `.feature` files or scenario wording.
---

# Write Feature Files

## Inputs

- Use case description(s)
- Functional requirements

## Workflow

1. Read the provided requirements and use cases.
2. Check reusable shared steps in `tests/e2e/step-definitions/shared` first.
3. Write complete Gherkin scenarios that cover key user paths.
4. Save the `.feature` file under `features/` in the correct feature folder.

## Authoring rules

1. Prefer shared, generic steps when scenarios can reuse existing behavior.
2. Create feature-specific steps only when shared steps cannot express behavior.
3. Place feature-scoped step definitions under `tests/e2e/step-definitions/` using feature-based folders.

## Naming rules

- Use `data-test` attributes for referenced UI elements.
- Use `"<element-name>-<element-type>"` naming, for example:
  - `login-page`
  - `submit-button`
  - `email-field`
  - `signup-link`
  - `course-name-header`

## Step-definition mapping

- Match step file names to feature file names.
- Example: `features/auth/login.feature` -> `tests/e2e/step-definitions/auth/login.steps.ts`.

## Mockoon environment variables

- Use `tests/e2e/util/mockoon-env.ts` helpers for scenario-specific API responses.
- Always provide a default value when reading env vars in mock templates.
- Example pattern: `{{getEnvVar 'MOCKOON_COURSE_ENROLLED' 'false'}}`.
