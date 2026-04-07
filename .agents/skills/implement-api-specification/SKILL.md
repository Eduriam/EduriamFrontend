---
name: implement-api-specification
description: Implement changes in the codebase for a specific Service based on the generated API classes and models.
---

# Implement Component

Read `AGENTS.md` before coding.

## Inputs

- Name of the Service to be implemented
- The original API class that should be rewritten

## Workflow

1. Read the related generated API classes and models in `src/infrastructure/api/generated`.
2. Read the original API class.
3. Create a Service class that will replace the existing API class.
4. Make any necessary changes to the codebase and the mock API so that it reflects the new structure in the generated API classes and models.
5. Run yarn build and all e2e tests to make sure everything works.

## Constraints

- Remove the old API class
- The Mock API MUST reflect the new API classes and models. Change the old endpoints to match the new specification.
- If absolutely necessary, you can create functions in the Service class that convert the new model to the old model. This should be done only if necessary. The end goal is to not have the converting functions at all and use the generated models directly. So prefer changing the codebase code to match the new model.
