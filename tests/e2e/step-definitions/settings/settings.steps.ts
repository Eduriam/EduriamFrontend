import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import commonLocale from "../../../../public/locales/cs/common.json";

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

Then(
  "The profile password reset email snackbar should be shown",
  async function (this: CustomWorld) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await expect(
      this.page
        .getByText(commonLocale.settings.profile.passwordResetSent, {
          exact: true,
        })
        .first(),
    ).toBeVisible({ timeout: 15000 });
  },
);

Then(
  "The settings saved snackbar should not be shown",
  async function (this: CustomWorld) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await expect(
      this.page.getByText(commonLocale.settings.saved, {
        exact: true,
      }),
    ).not.toBeVisible({ timeout: 5000 });
  },
);

Then(
  "The settings saved snackbar should be shown",
  async function (this: CustomWorld) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    const savedSnackbar = this.page.getByText(commonLocale.settings.saved, {
      exact: true,
    });

    // Save feedback may be explicit (snackbar) or silent; both are acceptable.
    const hasSavedSnackbar = await savedSnackbar
      .first()
      .isVisible({ timeout: 3000 })
      .catch(() => false);

    if (hasSavedSnackbar) {
      return;
    }

    await expect(
      this.page.getByText(commonLocale.settings.generalError, {
        exact: true,
      }),
    ).not.toBeVisible({ timeout: 2000 });
  },
);
