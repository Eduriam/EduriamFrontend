import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { CustomWorld } from "../../support/world";

When(
  "I wait for the advertisement to finish",
  async function (this: CustomWorld) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    const advertisementDialog = this.page
      .locator('[data-test="advertisement-fullscreen-dialog"]')
      .first();

    await advertisementDialog.waitFor({ state: "visible", timeout: 15000 });

    const continueButton = advertisementDialog
      .locator('[data-test="advertisement-continue-button"]')
      .first();

    await expect(continueButton).toBeEnabled({ timeout: 30000 });
  },
);
