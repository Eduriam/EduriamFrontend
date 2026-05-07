import { Then, When } from "@cucumber/cucumber";

import { CustomWorld } from "../../support/world";

const exerciseConfig = {
  multipleChoiceExercise: {
    testId: "multiple-choice-exercise",
    correctAnswerButtonTestId: "multiple-choice-exercise-correct-answer-button",
    incorrectAnswerButtonTestId:
      "multiple-choice-exercise-incorrect-answer-button",
    fallbackCorrectOptionIndex: 0,
    fallbackIncorrectOptionIndex: 1,
  },
  codeExercise: {
    testId: "code-exercise",
    fillInCodeTextFieldTestId: "code-exercise-fill-in-code-text-field",
    correctAnswer: "SELECT id, name FROM users;",
    incorrectAnswer: "SELECT id name FROM users",
  },
} as const;

type ExerciseTestId =
  | (typeof exerciseConfig.multipleChoiceExercise)["testId"]
  | (typeof exerciseConfig.codeExercise)["testId"];

function ensurePage(world: CustomWorld) {
  if (!world.page) {
    throw new Error("Page is not initialized.");
  }

  return world.page;
}

function getExercise(page: ReturnType<typeof ensurePage>, exerciseTestId: string) {
  return page.locator(`[data-test="${exerciseTestId}"]`).first();
}

function throwUnsupportedExerciseType(exerciseTestId: string): never {
  throw new Error(
    `Unsupported exercise test id: "${exerciseTestId}". Add mapping in studySession.ts.`,
  );
}

function parseExerciseTestId(exerciseTestId: string): ExerciseTestId {
  switch (exerciseTestId) {
    case exerciseConfig.multipleChoiceExercise.testId:
    case exerciseConfig.codeExercise.testId:
      return exerciseTestId;
    default:
      throwUnsupportedExerciseType(exerciseTestId);
  }
}

async function fillMultipleChoiceExerciseCorrectly(
  page: ReturnType<typeof ensurePage>,
): Promise<void> {
  const config = exerciseConfig.multipleChoiceExercise;
  const exercise = getExercise(page, config.testId);

  const preferredByDataTest = exercise
    .locator(`[data-test="${config.correctAnswerButtonTestId}"]`)
    .first();
  if ((await preferredByDataTest.count()) > 0) {
    await preferredByDataTest.click();
    return;
  }

  const options = exercise.locator("button");
  const optionCount = await options.count();
  if (optionCount > config.fallbackCorrectOptionIndex) {
    await options.nth(config.fallbackCorrectOptionIndex).click();
    return;
  }

  await options.first().click();
}

async function fillMultipleChoiceExerciseIncorrectly(
  page: ReturnType<typeof ensurePage>,
): Promise<void> {
  const config = exerciseConfig.multipleChoiceExercise;
  const exercise = getExercise(page, config.testId);

  const preferredByDataTest = exercise
    .locator(`[data-test="${config.incorrectAnswerButtonTestId}"]`)
    .first();
  if ((await preferredByDataTest.count()) > 0) {
    await preferredByDataTest.click();
    return;
  }

  const options = exercise.locator("button");
  const optionCount = await options.count();
  if (optionCount > config.fallbackIncorrectOptionIndex) {
    await options.nth(config.fallbackIncorrectOptionIndex).click();
    return;
  }

  await options.first().click();
}

async function fillCodeExerciseCorrectly(
  page: ReturnType<typeof ensurePage>,
): Promise<void> {
  const config = exerciseConfig.codeExercise;
  const exercise = getExercise(page, config.testId);
  await exercise
    .locator(`[data-test="${config.fillInCodeTextFieldTestId}"]`)
    .first()
    .fill(config.correctAnswer);
}

async function fillCodeExerciseIncorrectly(
  page: ReturnType<typeof ensurePage>,
): Promise<void> {
  const config = exerciseConfig.codeExercise;
  const exercise = getExercise(page, config.testId);
  await exercise
    .locator(`[data-test="${config.fillInCodeTextFieldTestId}"]`)
    .first()
    .fill(config.incorrectAnswer);
}

async function answerExerciseCorrectly(
  page: ReturnType<typeof ensurePage>,
  exerciseTestId: ExerciseTestId,
): Promise<void> {
  switch (exerciseTestId) {
    case exerciseConfig.multipleChoiceExercise.testId:
      await fillMultipleChoiceExerciseCorrectly(page);
      return;
    case exerciseConfig.codeExercise.testId:
      await fillCodeExerciseCorrectly(page);
      return;
    default:
      throwUnsupportedExerciseType(exerciseTestId);
  }
}

async function answerExerciseIncorrectly(
  page: ReturnType<typeof ensurePage>,
  exerciseTestId: ExerciseTestId,
): Promise<void> {
  switch (exerciseTestId) {
    case exerciseConfig.multipleChoiceExercise.testId:
      await fillMultipleChoiceExerciseIncorrectly(page);
      return;
    case exerciseConfig.codeExercise.testId:
      await fillCodeExerciseIncorrectly(page);
      return;
    default:
      throwUnsupportedExerciseType(exerciseTestId);
  }
}

When(
  "I wait for the explanation to finish",
  async function (this: CustomWorld) {
    const page = ensurePage(this);

    await page
      .locator('[data-test="explanation-block-section"]')
      .first()
      .waitFor({ state: "hidden", timeout: 45000 });
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
    await answerExerciseCorrectly(page, parseExerciseTestId(exerciseTestId));
  },
);

When(
  "I answer the {string} exercise incorrectly",
  async function (this: CustomWorld, exerciseTestId: string) {
    const page = ensurePage(this);
    await answerExerciseIncorrectly(page, parseExerciseTestId(exerciseTestId));
  },
);
