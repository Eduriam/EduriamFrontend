import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { CustomWorld } from "../../support/world";
import {
  type MockoonNoticeVariant,
  setNoticeVariant,
} from "../../util/mockoon-env";

const NOTICE_VARIANTS_BY_TEST_ID: Record<string, MockoonNoticeVariant> = {
  "notifications-disabled-notice": "single-notifications-disabled",
  "streak-milestone-notice": "single-streak-milestone",
  "streak-lost-notice": "single-streak-lost",
  "streak-saved-notice": "single-streak-saved",
  "league-promoted-notice": "single-league-promoted",
  "league-demoted-notice": "single-league-demoted",
  "achievement-earned-notice": "single-achievement-earned",
  "chest-reward-notice": "single-chest-reward",
  "advertisement-notice": "single-advertisement",
};

const ALL_NOTICE_TEST_IDS = Object.keys(NOTICE_VARIANTS_BY_TEST_ID);

Given(
  "I have an unread {string} notice",
  async function (noticeTestId: string) {
    const variant = NOTICE_VARIANTS_BY_TEST_ID[noticeTestId];

    if (!variant) {
      throw new Error(
        `Unsupported notice "${noticeTestId}". Supported values: ${ALL_NOTICE_TEST_IDS.join(", ")}`,
      );
    }

    await setNoticeVariant(variant);
  },
);

Then(
  "I should see the {string} notice",
  async function (this: CustomWorld, noticeTestId: string) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await this.page
      .locator(`[data-test="${noticeTestId}"]`)
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
  },
);

Then(
  "I should not see the {string} notice",
  async function (this: CustomWorld, noticeTestId: string) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    const locator = this.page.locator(`[data-test="${noticeTestId}"]`).first();
    await expect(locator).toBeHidden({ timeout: 5000 });
  },
);

Then(
  "I should see exactly {int} notice dialog",
  async function (this: CustomWorld, expectedVisibleNotices: number) {
    const { page } = this;

    if (!page) {
      throw new Error("Page is not initialized.");
    }

    const visibility: number[] = await Promise.all(
      ALL_NOTICE_TEST_IDS.map(async (noticeTestId) => {
        const locator = page.locator(`[data-test="${noticeTestId}"]`).first();

        try {
          return (await locator.isVisible()) ? 1 : 0;
        } catch {
          return 0;
        }
      }),
    );

    const visibleNotices = visibility.reduce(
      (sum: number, value: number) => sum + value,
      0,
    );
    expect(visibleNotices).toBe(expectedVisibleNotices);
  },
);
