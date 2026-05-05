import {
  IWorldOptions,
  World,
  setDefaultTimeout,
  setWorldConstructor,
} from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "playwright";

// Set default timeout for all steps
// Next.js dev server compilation + navigation can exceed 10s on cold start.
setDefaultTimeout(30 * 1000);

export interface CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  notificationTypeEnabled?: boolean;
}

export class CustomWorld extends World implements CustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  notificationTypeEnabled?: boolean;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async initBrowser(): Promise<void> {
    // Run headless by default, unless HEADED=true is set
    const headless = process.env.HEADED !== "true";

    this.browser = await chromium.launch({
      headless,
    });
    const frontendPort = process.env.TEST_FRONTEND_PORT || "3000";
    this.context = await this.browser.newContext({
      baseURL: `http://localhost:${frontendPort}`,
    });
    this.page = await this.context.newPage();
  }

  async closeBrowser(): Promise<void> {
    if (this.page) {
      try {
        // Prevent noisy server-side "render aborted" logs by ending on a stable blank page
        // before closing the browser context between scenarios.
        await this.page.goto("about:blank", {
          waitUntil: "load",
          timeout: 5000,
        });
      } catch {
        // Ignore teardown navigation failures; the page may already be closing.
      }
      await this.page.close();
    }
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
