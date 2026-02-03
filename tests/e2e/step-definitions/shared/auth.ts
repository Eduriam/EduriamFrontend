import { Given } from "@cucumber/cucumber";

import { UserPrivate } from "infrastructure/api/user/User";

import { CustomWorld } from "../../support/world";

function base64UrlEncode(value: string): string {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function createJwt(expSecondsFromNow: number): string {
  const exp = Math.floor(Date.now() / 1000) + expSecondsFromNow;
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(JSON.stringify({ exp }));
  return `${header}.${payload}.sig`;
}

Given("I am logged in", async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error(
      "Page is not initialized. Make sure browser is initialized.",
    );
  }

  const user: UserPrivate = {
    id: "test-user",
    username: "Test user",
    role: "USER",
    streak: 0,
    balance: 0,
    accountInitialized: true,
    lastSessionDate: null,
    activeSubscription: null,
    selectedCourse: {
      id: "test-course",
      name: "Test course",
      language1: "en-US",
      language2: "cs",
    },
    lastViewedStudyMapLevel: 0,
  };

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
    localStorage.setItem("idToken", JSON.stringify(idToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Make sure storage is set before the app scripts run.
  if (this.context) {
    await this.context.addInitScript(initScript, {
      user,
      idToken,
      refreshToken,
    });
  }
  await this.page.addInitScript(initScript, { user, idToken, refreshToken });
});
