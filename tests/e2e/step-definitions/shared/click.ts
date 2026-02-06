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

    const container = this.page
      .locator(`[data-test="${buttonTestId}"]`)
      .first();
    const innerButton = container.locator("button").first();
    const clickTarget =
      (await innerButton.count()) > 0 ? innerButton : container;
    await clickTarget.click();

    return container;
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

When(
  "I select {string} option in the {string} radio group",
  async function (
    this: CustomWorld,
    optionTestId: string,
    _radioGroupTestId: string,
  ) {
    if (!this.page) {
      throw new Error(
        "Page is not initialized. Make sure browser is initialized.",
      );
    }

    const element = this.page.locator(`[data-test="${optionTestId}"]`).first();
    await element.click();

    return element;
  },
);

When(
  "I click on the {string} card",
  { timeout: 45 * 1000 },
  async function (this: CustomWorld, cardTestId: string) {
    if (!this.page) {
      throw new Error(
        "Page is not initialized. Make sure browser is initialized.",
      );
    }

    const container = this.page.locator(`[data-test="${cardTestId}"]`).first();
    await container.waitFor({ state: "attached", timeout: 20000 });
    await container.scrollIntoViewIfNeeded();
    const cardContent = container.locator("> *").first();
    const clickTarget =
      (await cardContent.count()) > 0 ? cardContent : container;
    await clickTarget.click({ timeout: 10000 });

    return container;
  },
);
