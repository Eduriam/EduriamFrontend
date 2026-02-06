---
name: onboarding-questionnaire-implementation
overview: Implement the new onboarding questionnaire flow on /onboarding based on Figma and feature scenarios, reusing existing components and APIs, updating mocks and redirects from registration.
todos:
  - id: setup-onboarding-route
    content: Create /onboarding route with layout.tsx and basic PageRoot/ContentContainer skeleton.
    status: completed
  - id: implement-onboarding-flow
    content: Implement the multi-step onboarding questionnaire UI and state machine mapping to all sections and buttons in the feature file.
    status: completed
  - id: integrate-apis-and-mocks
    content: Reuse or extend account setup and course APIs and update mock data so the onboarding flow can enroll users and set daily goals.
    status: completed
  - id: update-registration-redirect
    content: Change post-registration redirect targets from /account-setup to /onboarding.
    status: completed
  - id: add-onboarding-stories-and-tests
    content: Add onboarding page mocks/stories and ensure E2E tests for @onboarding-questionnaire pass, plus build and lint checks.
    status: completed
isProject: false
---

### Goal

Implement a multi-step onboarding questionnaire on `/onboarding` that matches the provided Figma flows and satisfies `features/onboarding/onboarding-questionnaire.feature`, reusing existing UI components and APIs, updating mocks, and redirecting new users to `/onboarding` after registration.

### High-level approach

- **Model the flow**: Map each step in the feature file (coding experience, area of interest, user goal, value proposition, recommended courses / all courses, daily goal, completion) to a clear UI section and state machine within the `/onboarding` page.
- **Reuse existing patterns**: Follow the structure and patterns of `account-setup/page.tsx` and other pages (e.g. use `PageRoot`, `ContentContainer`, navigation bars, and `useTransitionNavigationHandler`) to keep UX and implementation consistent.
- **Integrate APIs & mocks**: Use the same or similar APIs as account setup (enrolling in a course, setting daily goals, selecting a course) and adjust the mock API so tests can drive the full flow.

### Concrete steps

1. **Set up routing and basic page skeleton**

- Create `src/app/onboarding/layout.tsx` mirroring how protected pages are configured (e.g. using `ProtectedRoute` or similar from other authenticated pages like `home/layout.tsx`).
- Create `src/app/onboarding/page.tsx` with the standard page structure from the implementation guidelines, e.g.:
  - `"use client"` at the top.
  - Import `PageRoot` and `ContentContainer` from `@eduriam/ui-core`.
  - Use a suitable navigation bar (`BackNavigationBar` or `ProgressNavbar`) at the top.
  - Wrap content in `PageRoot` with `data-test="onboarding-page"` and a `ContentContainer`.

1. **Design onboarding state machine and sections**

- Implement local state in `onboarding/page.tsx` to track:
  - Current step (e.g. `stepIndex` enum or union type).
  - Selected coding experience (e.g. beginner/intermediate/advanced).
  - Selected area of interest.
  - Selected user goal.
  - Selected / recommended course ID and whether user came via recommended or all courses.
  - Selected daily goal.
- Map each step in the `.feature` file to a render branch, ensuring each section has the correct `data-test` identifiers:
  - `coding-experience-section` with radio group `coding-experience-radio-group` and options like `beginner-option`.
  - `area-of-interest-section` with `area-of-interest-radio-group` and its options.
  - `user-goal-section` with `user-goal-radio-group` and options such as `switch-career-option`.
  - `value-proposition-section` showing benefits and a continue button.
  - `recommended-courses-section` including a primary recommended course card `html-course-card` and an `explore-all-courses-button`.
  - `all-courses-section` listing all courses and letting the user select `html-course-card` at least.
  - `daily-goal-section` with `daily-goal-radio-group` and options (e.g. `10-option`).
  - `onboarding-complete-section` with `start-learning-button`.
- For each section, wire `continue-button` and other actions to advance the state machine in a way that follows both scenarios in the feature file.

1. **Reuse existing components and styles**

- Identify suitable components from `@eduriam/ui-core`, `@eduriam/ui-x`, and existing project components for:
  - Radio groups (coding experience, interests, goals, daily goal).
  - Buttons (`continue-button`, `start-learning-button`).
  - Course cards (`html-course-card`) and course lists.
  - Layout elements and typography.
- Use the existing `ValuePropositionListItem` component from `src/app/onboarding/components/ValuePropositionListItem.tsx` to implement the value proposition section according to Figma.
- Avoid custom `sx` styling unless strictly necessary, per the implementation guidelines.

1. **Hook up data and API calls**

- Decide on how to fetch or derive recommended courses and all courses:
  - Prefer reusing the same API abstraction as `SelectCourseForm` / `UserCoursesAPI` and possibly `AccountSetupAPI`.
  - For recommended courses, either:
    - Reuse an existing recommendations API if present, or
    - Filter existing courses based on the answers (coding experience, area of interest, goal) in a simple heuristic on the frontend, making sure mocks support the expected course IDs (e.g. HTML course).
- On course selection and daily goal confirmation (when leaving `daily-goal-section`):
  - Call `AccountSetupAPI.setupAccount` (or an analogous onboarding API) to store the daily goal.
  - Enroll the user in the chosen course and select that course using `UserCoursesAPI` (similar to `account-setup/page.tsx`).
  - After successful API calls, refresh user data (`revalidateUser`) if required, then navigate to `/`.

1. **Align navigation behavior and redirects**

- Implement back navigation behavior consistent with other multi-step flows:
  - Use either `BackNavigationBar` or a custom navigation bar that decrements `stepIndex`.
  - Ensure you do not navigate back from the first step.
- Update the registration flow so that after successful signup, the app navigates to `/onboarding` instead of `/account-setup`:
  - Inspect `src/app/signup/page.tsx` (and any other relevant auth flow files) for the post-registration redirect.
  - Replace any `/account-setup` target with `/onboarding`, maintaining use of `useTransitionNavigationHandler` if used.

1. **Update Storybook mocks and stories for `/onboarding**`

- Create `src/app/onboarding/page.mocks.ts` and `page.stories.tsx` mirroring other pages (e.g. `home/page.mocks.ts`, `page.stories.tsx`) so that the onboarding flow can be viewed and tested in Storybook.
- Provide at least one primary story for the default onboarding flow, wiring it to the same components and state as `page.tsx`.

1. **Extend / adjust mock API**

- Examine `mock/netlify/functions/datafile.json` and existing account setup / course-related mocks.
- Add or adjust endpoints and mock data so that:
  - The user starts with no enrolled courses for the onboarding feature scenarios.
  - Recommended and all courses endpoints return an HTML course with a stable ID used by the page for `html-course-card`.
  - Endpoints used to set daily goals, enroll in a course, and select the active course behave consistently with `AccountSetupAPI` usage.
- Make sure the mocks support both paths in the feature file: choosing the recommended course directly and going via “explore all courses”.

1. **Wire E2E locators and run tests**

- Ensure the page and all interactive elements have the `data-test` attributes required by the feature file (e.g. `data-test="coding-experience-radio-group"`, `data-test="continue-button"`, etc.).
- Run the onboarding-specific E2E tests (e.g. `yarn test:e2e -- --tags "@onboarding-questionnaire"`) and note any failing steps.
- Fix locator mismatches or behavioral issues until the tests pass.

1. **Final checks and quality gates**

- Verify responsiveness manually (desktop and at least one narrow viewport) using the existing UI primitives so that layout matches Figma reasonably.
- Run `yarn build`, `yarn lint`, and re-run the targeted E2E tests to ensure the feature is stable and conforms to project standards.
