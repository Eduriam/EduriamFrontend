import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { CustomWorld } from "../../support/world";

Then(
  "I should see a {string} snackbar containing {string}",
  async function (this: CustomWorld, snackbarId: string, text: string) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    const snackbar = this.page.locator(`[data-test="${snackbarId}"]`);

    await snackbar.waitFor({ state: "visible", timeout: 15000 });
    await expect(snackbar).toContainText(text, { timeout: 15000 });
  },
);
