import { When } from "@cucumber/cucumber";

import { CustomWorld } from "../../support/world";

const TEST_CARD = {
  number: "4242424242424242",
  expiry: "1230",
  cvc: "123",
};

When(
  "I fill in the payment details",
  async function (this: CustomWorld) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await this.page
      .locator(`[data-test="subscription-payment-form-section"]:visible`)
      .first()
      .waitFor({ state: "visible", timeout: 15000 });

    try {
      await this.page
        .locator(`iframe[src*="js.stripe.com"]`)
        .first()
        .waitFor({ state: "attached", timeout: 5000 });
    } catch {
      // Mock flow can skip Stripe iframe interaction when no client secret is returned.
      return;
    }

    const stripeFrames = this.page
      .frames()
      .filter((frame) => frame.url().includes("js.stripe.com"));

    for (const frame of stripeFrames) {
      const numberInput = frame
        .locator(`input[name="number"], input[autocomplete="cc-number"]`)
        .first();

      if ((await numberInput.count()) === 0) {
        continue;
      }

      await numberInput.fill(TEST_CARD.number);

      const expiryInput = frame
        .locator(`input[name="exp-date"], input[autocomplete="cc-exp"]`)
        .first();
      if ((await expiryInput.count()) > 0) {
        await expiryInput.fill(TEST_CARD.expiry);
      }

      const cvcInput = frame
        .locator(`input[name="cvc"], input[autocomplete="cc-csc"]`)
        .first();
      if ((await cvcInput.count()) > 0) {
        await cvcInput.fill(TEST_CARD.cvc);
      }

      return;
    }
  },
);
