import { Given } from "@cucumber/cucumber";

import { CustomWorld } from "../../support/world";
import { setStudySessionVariant } from "../../util/mockoon-env";

const FRONTEND_PORT = process.env.TEST_FRONTEND_PORT || "3000";
const BASE_URL = `http://localhost:${FRONTEND_PORT}`;
const LESSON_ID = "4001";

async function navigateToStudyPageWithDefinedLesson(
  world: CustomWorld,
): Promise<void> {
  if (!world.page) {
    throw new Error("Page is not initialized.");
  }

  await world.page.goto(`${BASE_URL}/study?lessonId=${LESSON_ID}`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await world.page.waitForLoadState("load", { timeout: 15000 }).catch(() => undefined);
  await world.page
    .locator('[data-test="study-page"]')
    .first()
    .waitFor({ state: "attached", timeout: 15000 });
}

Given(
  /^the lesson contains a code exercise(?:\s*#.*)?$/i,
  async function (this: CustomWorld) {
    await setStudySessionVariant("code-exercise");

    // The study session request already fired when this step runs in Background,
    // so revisit the study page after switching Mockoon variant.
    await navigateToStudyPageWithDefinedLesson(this);
  },
);
