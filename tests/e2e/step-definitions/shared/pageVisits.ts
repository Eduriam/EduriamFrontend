import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { CustomWorld } from "../../support/world";

const FRONTEND_PORT = process.env.TEST_FRONTEND_PORT || "3000";
const BASE_URL = `http://localhost:${FRONTEND_PORT}`;

const PAGE_URLS: Record<string, string> = {
  "home-page": `${BASE_URL}/`,
  "login-page": `${BASE_URL}/login`,
  "signup-page": `${BASE_URL}/signup`,
  "welcome-page": `${BASE_URL}/welcome`,
  "account-setup-page": `${BASE_URL}/account-setup`,
  "onboarding-page": `${BASE_URL}/onboarding`,
  "courses-page": `${BASE_URL}/courses`,
  "course-page": `${BASE_URL}/courses/test-course`,
  "recommendations-page": `${BASE_URL}/courses/recommended`,
  "recommendation-quiz-page": `${BASE_URL}/courses/recommended/quiz`,
  "study-page": `${BASE_URL}/study`,
  "review-page": `${BASE_URL}/review`,
  "lesson-page": `${BASE_URL}/lesson`,
  "manage-courses-page": `${BASE_URL}/settings/courses`,
  "learning-path-page": `${BASE_URL}/learning-paths/react-developer-path`,
  "certificate-page": `${BASE_URL}/certificates/test-course-certificate`,
  "premium-page": `${BASE_URL}/subscription`,
  "study-plan-page": `${BASE_URL}/study-plan`,
};

type DefinedPageEntityConfig = {
  queryParam: string;
  queryValue: string;
};

const DEFINED_PAGE_ENTITY_CONFIGS: Record<string, DefinedPageEntityConfig> = {
  "study-page:lesson": {
    queryParam: "lessonId",
    queryValue: "test-lesson-id",
  },
  "study-page:course": {
    queryParam: "courseId",
    queryValue: "test-course-id",
  },
  "review-page:course": {
    queryParam: "courseId",
    queryValue: "test-course-id",
  },
};

/**
 * Navigate to the onboarding page with special handling.
 * Onboarding always requires a fresh navigation to ensure init scripts run.
 */
async function navigateToOnboardingPage(
  page: CustomWorld["page"],
): Promise<void> {
  if (!page) {
    throw new Error("Page is not initialized.");
  }

  const url = PAGE_URLS["onboarding-page"];
  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });

  // Wait for navigation to complete (either onboarding or redirect to welcome)
  await page.waitForURL(/\/onboarding|\/welcome/, { timeout: 10000 });

  if (page.url().includes("/welcome")) {
    throw new Error(
      "Landed on /welcome instead of /onboarding — auth may have failed (e.g. getCurrentUser rejected). Check that test user is in localStorage.",
    );
  }
}

/**
 * Navigate to a standard page, skipping navigation if already on that page.
 */
async function navigateToStandardPage(
  page: CustomWorld["page"],
  url: string,
): Promise<void> {
  if (!page) {
    throw new Error("Page is not initialized.");
  }

  const path = url.replace(BASE_URL, "");
  const alreadyOnPage = page.url().includes(path);

  if (!alreadyOnPage) {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page
      .waitForLoadState("networkidle", { timeout: 15000 })
      .catch(() => undefined);
  }
}

/**
 * Wait for the page marker element, handling welcome-page redirects.
 */
async function waitForPageMarker(
  page: CustomWorld["page"],
  pageName: string,
  timeout: number,
): Promise<void> {
  if (!page) {
    throw new Error("Page is not initialized.");
  }

  const selector = `[data-test="${pageName}"]`;

  if (pageName === "welcome-page") {
    try {
      await page.waitForSelector(selector, {
        timeout,
        state: "attached",
      });
    } catch (error) {
      // For signed-in users, navigating to /welcome should immediately
      // redirect them to the home page. In that case we don't expect the
      // welcome marker to appear, and this step should still succeed.
      const currentUrl = page.url();
      const homePath = PAGE_URLS["home-page"].replace(BASE_URL, "");
      const welcomePath = PAGE_URLS["welcome-page"].replace(BASE_URL, "");

      const redirectedToHome =
        !currentUrl.includes(welcomePath) && currentUrl.includes(homePath);

      if (!redirectedToHome) {
        throw error;
      }
    }
  } else {
    await page.waitForSelector(selector, {
      timeout,
      state: "attached",
    });
  }
}

Given(
  "I am on the {string} page with the {string} defined",
  { timeout: 60 * 1000 },
  async function (this: CustomWorld, pageName: string, entityName: string) {
    if (!this.page) {
      throw new Error(
        "Page is not initialized. Make sure browser is initialized.",
      );
    }

    const baseUrl = PAGE_URLS[pageName];
    if (!baseUrl) {
      throw new Error(
        `Page "${pageName}" is not a supported page name. Supported pages: ${Object.keys(
          PAGE_URLS,
        ).join(", ")}`,
      );
    }

    const definedConfig =
      DEFINED_PAGE_ENTITY_CONFIGS[`${pageName}:${entityName}`];
    if (!definedConfig) {
      throw new Error(
        `Unsupported defined-page combination "${pageName}:${entityName}". Supported combinations: ${Object.keys(
          DEFINED_PAGE_ENTITY_CONFIGS,
        ).join(", ")}`,
      );
    }

    await this.page.goto(
      `${baseUrl}?${definedConfig.queryParam}=${definedConfig.queryValue}`,
      {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      },
    );
    await this.page
      .waitForLoadState("networkidle", { timeout: 15000 })
      .catch(() => undefined);

    await waitForPageMarker(this.page, pageName, 15000);
  },
);

Given(
  "I am on the {string} page",
  { timeout: 60 * 1000 },
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

    // Navigate to the page
    if (pageName === "onboarding-page") {
      await navigateToOnboardingPage(this.page);
    } else {
      await navigateToStandardPage(this.page, url);
    }

    // Wait for the page marker element
    const timeout = pageName === "onboarding-page" ? 45000 : 15000;
    await waitForPageMarker(this.page, pageName, timeout);
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

    const path = url.replace(BASE_URL, "");

    await this.page.waitForSelector(`[data-test="${pageName}"]`, {
      timeout: 10000,
    });

    const currentUrl = this.page.url();
    expect(currentUrl).toContain(path);
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
