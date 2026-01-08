import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { CustomWorld } from "../../support/world";

const FRONTEND_PORT = process.env.TEST_FRONTEND_PORT || "3000";
const BASE_URL = `http://localhost:${FRONTEND_PORT}`;

const PAGE_URLS: Record<string, string> = {
  "login-page": `${BASE_URL}/login`,
};

Given(
  "I am on the {string} page",
  async function (this: CustomWorld, pageName: string) {
    if (!this.page) {
      throw new Error(
        "Page is not initialized. Make sure browser is initialized.",
      );
    }

    const url = PAGE_URLS[pageName];
    if (!url) {
      throw new Error(
        `Page "${pageName}" is not a supported page name. Supported pages: ${Object.keys(
          PAGE_URLS,
        ).join(", ")}`,
      );
    }

    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await this.page
      .waitForLoadState("networkidle", { timeout: 10000 })
      .catch(() => undefined);

    await this.page
      .waitForSelector(`[data-test="${pageName}"]`, {
        timeout: 15000,
      })
      .catch(() => undefined);
  },
);

Then(
  "I should be on the {string} page",
  async function (this: CustomWorld, pageName: string) {
    if (!this.page) {
      throw new Error(
        "Page is not initialized. Make sure browser is initialized.",
      );
    }

    const element = await this.page.waitForSelector(
      `[data-test="${pageName}"]`,
      {
        timeout: 15000,
      },
    );
    expect(element).toBeTruthy();

    return !!element;
  },
);

Then(
  "I should be redirected to the {string} page",
  async function (this: CustomWorld, pageName: string) {
    if (!this.page) {
      throw new Error(
        "Page is not initialized. Make sure browser is initialized.",
      );
    }

    const url = PAGE_URLS[pageName];
    if (!url) {
      throw new Error(
        `Page "${pageName}" is not a supported page name. Supported pages: ${Object.keys(
          PAGE_URLS,
        ).join(", ")}`,
      );
    }

    await this.page.waitForURL(url, { timeout: 15000 });
    await this.page.waitForSelector(`[data-test="${pageName}"]`, {
      timeout: 10000,
    });

    const currentUrl = this.page.url();
    expect(currentUrl).toContain(url.replace(BASE_URL, ""));
  },
);

Then(
  "I should remain on the {string} page",
  async function (this: CustomWorld, pageName: string) {
    if (!this.page) {
      throw new Error(
        "Page is not initialized. Make sure browser is initialized.",
      );
    }

    const element = await this.page.waitForSelector(
      `[data-test="${pageName}"]`,
      {
        timeout: 5000,
      },
    );
    expect(element).toBeTruthy();
  },
);
