import { After, Before } from "@cucumber/cucumber";

import { UserPrivate } from "infrastructure/api/users/me/User";

import { createJwt } from "../step-definitions/util/jwt";
import {
  resetMockoonGlobalVarsToDefaults,
  setSignupAccountUninitialized,
} from "../util/mockoon-env";
import { CustomWorld } from "./world";

Before(async function (this: CustomWorld) {
  await resetMockoonGlobalVarsToDefaults();
  await this.initBrowser();
});

Before({ tags: "@onboarding" }, async function (this: CustomWorld) {
  if (!this.context) {
    return;
  }
  const user = {
    id: 1001,
    username: "Test user",
    role: "USER",
    streak: 0,
    balance: 0,
    energy: 40,
    accountInitialized: false,
    activeSubscription: null,
  } as unknown as UserPrivate;
  const idToken = createJwt(60 * 60);
  const refreshToken = "test-refresh-token";
  const initScript = ({
    user,
    idToken,
    refreshToken,
  }: {
    user: UserPrivate;
    idToken: string;
    refreshToken: string;
  }) => {
    // Seed onboarding auth state only when storage is empty.
    // Do not overwrite in-scenario updates (e.g. onboarding completion).
    if (localStorage.getItem("user")) {
      return;
    }

    localStorage.setItem("idToken", JSON.stringify(idToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    localStorage.setItem("user", JSON.stringify(user));
  };
  await this.context.addInitScript(initScript, {
    user,
    idToken,
    refreshToken,
  });
});

Before({ tags: "@signup" }, async function () {
  await setSignupAccountUninitialized(true);
});

After(async function (this: CustomWorld) {
  try {
    await resetMockoonGlobalVarsToDefaults();
  } finally {
    await this.closeBrowser();
  }
});

