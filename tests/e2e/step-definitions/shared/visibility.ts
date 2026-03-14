import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { CustomWorld } from "../../support/world";

Then(
  "I should see the {string} section",
  async function (this: CustomWorld, sectionTestId: string) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await this.page
      .locator(`[data-test="${sectionTestId}"]:visible`)
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
  },
);

Then(
  "I should not see the {string} section",
  async function (this: CustomWorld, sectionTestId: string) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    const locator = this.page.locator(`[data-test="${sectionTestId}"]`).first();
    await expect(locator).toBeHidden({ timeout: 5000 });
  },
);

Then(
  "I should see the {string} button",
  async function (this: CustomWorld, buttonTestId: string) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await this.page
      .locator(`[data-test="${buttonTestId}"]:visible`)
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
  },
);

Then(
  "I should not see the {string} button",
  async function (this: CustomWorld, buttonTestId: string) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    const locator = this.page.locator(`[data-test="${buttonTestId}"]`).first();
    await expect(locator).toBeHidden({ timeout: 5000 });
  },
);

Then(
  "I should see the {string} field",
  async function (this: CustomWorld, fieldTestId: string) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await this.page
      .locator(`[data-test="${fieldTestId}"]:visible`)
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
  },
);

Then(
  "I should see the {string} drawer",
  async function (this: CustomWorld, drawerTestId: string) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await this.page
      .locator(`[data-test="${drawerTestId}"]:visible`)
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
  },
);
