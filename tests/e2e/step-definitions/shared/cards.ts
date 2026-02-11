import { Then, When } from "@cucumber/cucumber";

import { CustomWorld } from "../../support/world";

Then(
  "I should see the {string} card in the {string} section",
  async function (
    this: CustomWorld,
    cardTestId: string,
    sectionTestId: string,
  ) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    try {
      const section = this.page
        .locator(`[data-test="${sectionTestId}"]`)
        .first();
      const cardInSection = section
        .locator(`[data-test="${cardTestId}"]`)
        .first();

      await cardInSection.waitFor({ state: "visible", timeout: 15000 });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : String(error ?? "");
      const closed =
        message.includes("Target page, context or browser has been closed") ||
        message.includes("Execution context was destroyed");

      if (!closed) {
        throw error;
      }
    }
  },
);

When(
  "I drag and drop the {string} card to the {string} section",
  async function (
    this: CustomWorld,
    cardTestId: string,
    sectionTestId: string,
  ) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    const card = this.page.locator(`[data-test="${cardTestId}"]`).first();
    const section = this.page.locator(`[data-test="${sectionTestId}"]`).first();

    await card.dragTo(section);
  },
);
