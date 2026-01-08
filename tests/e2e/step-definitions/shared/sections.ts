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
