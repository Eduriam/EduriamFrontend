import { Given } from "@cucumber/cucumber";

import { setUpcomingReviewDefined } from "../../util/mockoon-env";
import { CustomWorld } from "../../support/world";

const FRONTEND_PORT = process.env.TEST_FRONTEND_PORT || "3000";
const BASE_URL = `http://localhost:${FRONTEND_PORT}`;

Given(
  "The course is defined",
  async function (this: CustomWorld): Promise<void> {
    await setUpcomingReviewDefined(true);

    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await this.page.goto(`${BASE_URL}/review?courseId=test-course-id`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await this.page.waitForSelector('[data-test="review-page"]', {
      timeout: 15000,
    });
  },
);

Given(
  "The course is not defined",
  async function (this: CustomWorld): Promise<void> {
    await setUpcomingReviewDefined(true);

    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await this.page.goto(`${BASE_URL}/review`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await this.page.waitForSelector('[data-test="review-page"]', {
      timeout: 15000,
    });
  },
);
