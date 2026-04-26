import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { CustomWorld } from "../../support/world";
import {
  setCurrentUserBalance,
  setShopEnoughMoney,
  setShopLockedItem,
} from "../../util/mockoon-env";

Given("I have enough virtual currency", async function (this: CustomWorld) {
  await setShopEnoughMoney(true);

  const initialBalance = 5000;
  await setCurrentUserBalance(initialBalance);

  (this as CustomWorld & { shopInitialBalance?: number }).shopInitialBalance =
    initialBalance;
});

Given(
  "I do not have enough virtual currency",
  async function (this: CustomWorld) {
    await setShopEnoughMoney(false);

    const initialBalance = 0;
    await setCurrentUserBalance(initialBalance);

    (this as CustomWorld & { shopInitialBalance?: number }).shopInitialBalance =
      initialBalance;
  },
);

Given("I have an unlocked item that is not purchased yet", async () => {
  await setShopLockedItem(false);
});

Given("I have a locked shop item", async () => {
  await setShopLockedItem(true);
});

Then(
  "My virtual currency balance should be decreased",
  async function (this: CustomWorld) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    const initialBalance =
      (this as CustomWorld & { shopInitialBalance?: number }).shopInitialBalance ??
      0;

    const balanceLocator = this.page
      .locator('[data-test="virtual-currency-balance-section"]')
      .first();

    await expect
      .poll(
        async () => {
          const currentBalanceText = await balanceLocator.textContent();

          return Number((currentBalanceText ?? "").replace(/\D/g, ""));
        },
        {
          timeout: 5000,
          message: "Expected virtual currency balance to decrease after purchase",
        },
      )
      .toBeLessThan(initialBalance);
  },
);
