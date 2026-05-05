import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { CustomWorld } from "../../support/world";

When(
  "I enter {string} in the {string} field",
  async function (this: CustomWorld, value: string, fieldTestId: string) {
    if (!this.page) {
      throw new Error(
        "Page is not initialized. Make sure browser is initialized.",
      );
    }

    // Find actual input inside the Material UI TextField component
    const element = this.page.locator(
      `input[data-test="${fieldTestId}"], textarea[data-test="${fieldTestId}"], [data-test="${fieldTestId}"] input, [data-test="${fieldTestId}"] textarea`,
    );
    await element.fill(value);

    return element;
  },
);

Then(
  "the {string} field should contain {string}",
  async function (this: CustomWorld, fieldTestId: string, value: string) {
    if (!this.page) {
      throw new Error(
        "Page is not initialized. Make sure browser is initialized.",
      );
    }

    const element = this.page.locator(
      `input[data-test="${fieldTestId}"], textarea[data-test="${fieldTestId}"], [data-test="${fieldTestId}"] input, [data-test="${fieldTestId}"] textarea`,
    );

    await expect(element).toHaveValue(value, { timeout: 15000 });
  },
);
