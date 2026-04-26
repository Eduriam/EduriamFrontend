import { After, Before } from "@cucumber/cucumber";

import { seedAuthenticatedSession } from "./auth-storage";
import {
  setCurrentUserAccountInitialized,
  resetMockoonGlobalVarsToDefaults,
} from "../util/mockoon-env";
import { CustomWorld } from "./world";

Before(async function (this: CustomWorld) {
  await resetMockoonGlobalVarsToDefaults();
  await this.initBrowser();
});

Before({ tags: "@onboarding" }, async function (this: CustomWorld) {
  await setCurrentUserAccountInitialized(false);
  await seedAuthenticatedSession(this);
});

Before({ tags: "@signup" }, async function () {
  await setCurrentUserAccountInitialized(false);
});

After(async function (this: CustomWorld) {
  try {
    await resetMockoonGlobalVarsToDefaults();
  } finally {
    await this.closeBrowser();
  }
});

