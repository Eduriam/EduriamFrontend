import { Then, When } from "@cucumber/cucumber";

import { CustomWorld } from "../../support/world";

function ensurePage(world: CustomWorld) {
  if (!world.page) {
    throw new Error("Page is not initialized.");
  }

  return world.page;
}

interface ExerciseConfig {
  sectionTestId: string;
  correctAnswerTestId?: string;
  incorrectAnswerTestId?: string;
}

function getExerciseConfig(exerciseTestId: string): ExerciseConfig {
  switch (exerciseTestId) {
    case "multiple-choice-exercise":
      return {
        sectionTestId: "multiple-choice-exercise",
        correctAnswerTestId: "multiple-choice-exercise-correct-answer-button",
        incorrectAnswerTestId: "multiple-choice-exercise-incorrect-answer-button",
      };
    default:
      throw new Error(
        `Unsupported exercise test id: "${exerciseTestId}". Add mapping in studySession.ts.`,
      );
  }
}

When(
  "I wait for the explanation to finish",
  async function (this: CustomWorld) {
    const page = ensurePage(this);

    await page
      .locator('[data-test="continue-button"]')
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
  },
);

Then(
  "I should see the {string} exercise",
  async function (this: CustomWorld, exerciseTestId: string) {
    const page = ensurePage(this);

    await page
      .locator(`[data-test="${exerciseTestId}"]`)
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
  },
);

When(
  "I answer the {string} exercise correctly",
  async function (this: CustomWorld, exerciseTestId: string) {
    const page = ensurePage(this);
    const config = getExerciseConfig(exerciseTestId);
    const exercise = page.locator(`[data-test="${config.sectionTestId}"]`).first();

    if (config.correctAnswerTestId) {
      const preferredByDataTest = exercise
        .locator(`[data-test="${config.correctAnswerTestId}"]`)
        .first();
      if ((await preferredByDataTest.count()) > 0) {
        await preferredByDataTest.click();
        return;
      }
    }

    const preferredByText = exercise.locator("button").filter({ hasText: /^blue$/i }).first();

    if ((await preferredByText.count()) > 0) {
      await preferredByText.click();
      return;
    }

    await exercise.locator("button").first().click();
  },
);

When(
  "I answer the {string} exercise incorrectly",
  async function (this: CustomWorld, exerciseTestId: string) {
    const page = ensurePage(this);
    const config = getExerciseConfig(exerciseTestId);
    const exercise = page.locator(`[data-test="${config.sectionTestId}"]`).first();

    if (config.incorrectAnswerTestId) {
      const preferredByDataTest = exercise
        .locator(`[data-test="${config.incorrectAnswerTestId}"]`)
        .first();
      if ((await preferredByDataTest.count()) > 0) {
        await preferredByDataTest.click();
        return;
      }
    }

    const preferredByText = exercise.locator("button").filter({ hasText: /^green$/i }).first();

    if ((await preferredByText.count()) > 0) {
      await preferredByText.click();
      return;
    }

    const options = exercise.locator("button");
    const count = await options.count();
    if (count > 1) {
      await options.nth(1).click();
      return;
    }

    await options.first().click();
  },
);
