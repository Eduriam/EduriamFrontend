import { When } from "@cucumber/cucumber";

import { CustomWorld } from "../../support/world";

When(
  "I click on the {string} button",
  async function (this: CustomWorld, buttonTestId: string) {
    if (!this.page) {
      throw new Error(
        "Page is not initialized. Make sure browser is initialized.",
      );
    }

    const element = this.page.locator(`[data-test="${buttonTestId}"]`).first();
    await element.click();

    return element;
  },
);

When(
  "I click on the {string} link",
  async function (this: CustomWorld, linkTestId: string) {
    if (!this.page) {
      throw new Error(
        "Page is not initialized. Make sure browser is initialized.",
      );
    }

    const element = await this.page.locator(`[data-test="${linkTestId}"]`);
    await element.click();

    return element;
  },
);
