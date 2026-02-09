import { Then } from "@cucumber/cucumber";

import { CustomWorld } from "../../support/world";

Then(
  "I should see the {string} section",
  async function (this: CustomWorld, sectionTestId: string) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await this.page
      .locator(`[data-test="${sectionTestId}"]`)
      .waitFor({ state: "visible", timeout: 15000 });
  },
);

Then(
  "I should see the {string} button",
  async function (this: CustomWorld, buttonTestId: string) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await this.page
      .locator(`[data-test="${buttonTestId}"]`)
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
      .locator(`[data-test="${drawerTestId}"]`)
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
  },
);
