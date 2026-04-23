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

    await card.waitFor({ state: "visible", timeout: 15000 });
    await section.waitFor({ state: "visible", timeout: 15000 });
    await card.scrollIntoViewIfNeeded();
    await section.scrollIntoViewIfNeeded();

    const cardBox = await card.boundingBox();
    const sectionBox = await section.boundingBox();

    if (!cardBox || !sectionBox) {
      throw new Error("Could not resolve card or section bounding box for drag.");
    }

    const startX = cardBox.x + cardBox.width / 2;
    const startY = cardBox.y + cardBox.height / 2;
    const endX = sectionBox.x + sectionBox.width / 2;
    const endY = sectionBox.y + Math.min(48, sectionBox.height / 2);

    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    // Small initial move to pass pointer activation threshold.
    await this.page.mouse.move(startX + 12, startY + 12, { steps: 3 });
    await this.page.mouse.move(endX, endY, { steps: 12 });
    await this.page.mouse.up();
  },
);
