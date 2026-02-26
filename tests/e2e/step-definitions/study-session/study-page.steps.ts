import { Given } from "@cucumber/cucumber";

import { setUpcomingLessonDefined } from "../../util/mockoon-env";

const FRONTEND_PORT = process.env.TEST_FRONTEND_PORT || "3000";
const BASE_URL = `http://localhost:${FRONTEND_PORT}`;

Given("The lesson is defined", async function (): Promise<void> {
  await setUpcomingLessonDefined(true);

  if (!this.page) {
    throw new Error("Page is not initialized.");
  }

  await this.page.goto(`${BASE_URL}/study?lessonId=test-lesson-id`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await this.page.waitForSelector('[data-test="study-page"]', {
    timeout: 15000,
  });
});
