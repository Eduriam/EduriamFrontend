import {
  IWorldOptions,
  World,
  setDefaultTimeout,
  setWorldConstructor,
} from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "playwright";

// Set default timeout for all steps
setDefaultTimeout(10 * 1000);

export interface CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
}

export class CustomWorld extends World implements CustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

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
