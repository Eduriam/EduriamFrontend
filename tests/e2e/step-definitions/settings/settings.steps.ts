import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { CustomWorld } from "../../support/world";

Then(
  "The notification settings should be saved",
  async function (this: CustomWorld) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    const notificationSwitch = this.page
      .locator('[data-test="notification-settings-switch-button"]')
      .first();

    await expect(
      notificationSwitch.locator('xpath=ancestor::*[@data-saved][1]'),
    ).toHaveAttribute("data-saved", "true");
  },
);

Then("The theme should be changed to dark", async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error("Page is not initialized.");
  }

  await expect(this.page.locator("html")).toHaveAttribute(
    "data-theme-mode",
    "dark",
  );
});
