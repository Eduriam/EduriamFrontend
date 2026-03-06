import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { setAvatarItemsPurchased } from "../../util/mockoon-env";
import { CustomWorld } from "../../support/world";

Given("I have purchased avatar customization items", async () => {
  await setAvatarItemsPurchased(true);
});

Then(
  "I should see the updated avatar preview",
  async function (this: CustomWorld) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    const preview = this.page.locator('[data-test="avatar-preview-section"]').first();
    await preview.waitFor({ state: "visible", timeout: 10000 });

    const updated = await preview.getAttribute("data-avatar-updated");
    expect(updated).toBe("true");
  },
);
