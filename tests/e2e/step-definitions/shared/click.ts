import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { CustomWorld } from "../../support/world";

async function findButtonContainer(world: CustomWorld, buttonTestId: string) {
  if (!world.page) {
    throw new Error("Page is not initialized.");
  }

  const selector = `[data-test="${buttonTestId}"]`;
  await world.page.waitForSelector(selector, {
    state: "attached",
    timeout: 15000,
  });
  await world.page
    .locator(`${selector}:visible`)
    .first()
    .waitFor({ state: "visible", timeout: 5000 })
    .catch(() => undefined);

  const visibleCandidates = world.page.locator(
    `${selector}:visible`,
  );
  if ((await visibleCandidates.count()) > 0) {
    return visibleCandidates.first();
  }

  const firstCandidate = world.page.locator(selector).first();
  if ((await firstCandidate.count()) > 0) {
    return firstCandidate;
  }

  throw new Error(
    `Could not find button with data-test id "${buttonTestId}".`,
  );
}

async function clickButtonByTestId(
  world: CustomWorld,
  buttonTestId: string,
): Promise<unknown> {
  if (!world.page) {
    throw new Error(
      "Page is not initialized. Make sure browser is initialized.",
    );
  }

  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const container = await findButtonContainer(world, buttonTestId);
    const innerButton = container.locator("button").first();
    const clickTarget =
      (await innerButton.count()) > 0 ? innerButton : container;

    try {
      await expect(clickTarget).toBeVisible({ timeout: 10000 });
      await expect(clickTarget).toBeEnabled({ timeout: 10000 });
      await clickTarget.click({ timeout: 10000 });
      return container;
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : String(error);
      const isRetriable =
        message.includes("intercepts pointer events") ||
        message.includes("not attached to the DOM") ||
        message.includes("element is not stable");

      if (!isRetriable || attempt === 2) {
        if (message.includes("intercepts pointer events")) {
          await clickTarget.click({ force: true, timeout: 10000 });
          return container;
        }
        throw error;
      }
    }
  }

  throw lastError;
}

When(
  "I click on the {string} button",
  async function (this: CustomWorld, buttonTestId: string) {
    return clickButtonByTestId(this, buttonTestId);
  },
);

When(
  "I click the {string} button",
  async function (this: CustomWorld, buttonTestId: string) {
    return clickButtonByTestId(this, buttonTestId);
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
