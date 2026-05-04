import { Given, When } from "@cucumber/cucumber";

import {
  SubscriptionStatus,
  UserRole,
} from "../../../../src/infrastructure/api/generated/models";

import {
  clearAuthenticatedSession,
  seedAuthenticatedSession,
} from "../../support/auth-storage";
import { CustomWorld } from "../../support/world";
import {
  setCurrentUserAccountInitialized,
  setCurrentUserBalance,
  setCurrentUserEnergy,
  setCurrentUserId,
  setCurrentUserName,
  setCurrentUserRole,
  setCurrentUserSubscriptionActive,
  setCurrentUserSubscriptionStatus,
  setCurrentUserUsername,
  setGoogleAuthVariant,
} from "../../util/mockoon-env";

async function setCurrentUserAsFreeUser(): Promise<void> {
  await Promise.all([
    setCurrentUserId(1001),
    setCurrentUserUsername("test.user"),
    setCurrentUserName("Test user"),
    setCurrentUserRole(UserRole.User),
    setCurrentUserEnergy(40),
    setCurrentUserBalance(1000),
    setCurrentUserAccountInitialized(true),
    setCurrentUserSubscriptionActive(false),
    setCurrentUserSubscriptionStatus(SubscriptionStatus.Active),
  ]);
}

async function setCurrentUserAsPremiumUser(): Promise<void> {
  await Promise.all([
    setCurrentUserId(1001),
    setCurrentUserUsername("premium.user"),
    setCurrentUserName("Premium user"),
    setCurrentUserRole(UserRole.PremiumUser),
    setCurrentUserEnergy(40),
    setCurrentUserBalance(1000),
    setCurrentUserAccountInitialized(true),
    setCurrentUserSubscriptionActive(true),
    setCurrentUserSubscriptionStatus(SubscriptionStatus.Active),
  ]);
}

async function setCurrentUserAsCorrector(): Promise<void> {
  await Promise.all([
    setCurrentUserId(1002),
    setCurrentUserUsername("test.corrector"),
    setCurrentUserName("Test corrector"),
    setCurrentUserRole(UserRole.Admin),
    setCurrentUserEnergy(40),
    setCurrentUserBalance(1000),
    setCurrentUserAccountInitialized(true),
    setCurrentUserSubscriptionActive(false),
    setCurrentUserSubscriptionStatus(SubscriptionStatus.Active),
  ]);
}

async function navigateToGoogleCallback(
  world: CustomWorld,
  callbackPath: string,
): Promise<void> {
  if (!world.page) {
    throw new Error(
      "Page is not initialized. Make sure browser is initialized.",
    );
  }

  try {
    await world.page.goto(callbackPath, {
      waitUntil: "commit",
      timeout: 30000,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("ERR_ABORTED")) {
      throw error;
    }
  }
}

Given("I am signed in", async function (this: CustomWorld) {
  await setCurrentUserAsFreeUser();
  await seedAuthenticatedSession(this);
});

Given("I am signed in as corrector", async function (this: CustomWorld) {
  await setCurrentUserAsCorrector();
  await seedAuthenticatedSession(this);
});

Given(
  "I am signed in and enrolled the course",
  async function (this: CustomWorld) {
    await setCurrentUserAsFreeUser();
    await seedAuthenticatedSession(this);
  },
);

Given(
  "I am signed in and enrolled in the learning path",
  async function (this: CustomWorld) {
    await setCurrentUserAsFreeUser();
    await seedAuthenticatedSession(this);
  },
);

Given(
  "I am signed in and I am not enrolled in any course",
  async function (this: CustomWorld) {
    await setCurrentUserAsFreeUser();
    await setCurrentUserAccountInitialized(false);
    await seedAuthenticatedSession(this);
  },
);

Given("I am a premium user", async function (this: CustomWorld) {
  await setCurrentUserAsPremiumUser();
  await seedAuthenticatedSession(this);
});

Given("I am not signed in", async function (this: CustomWorld) {
  await clearAuthenticatedSession(this);
});

Given("I have no energy left", async function () {
  await setCurrentUserEnergy(0);
});

Given("No user account is linked to the Google account", async function () {
  await setGoogleAuthVariant("signin-account-not-found");
});

Given("A user account already exists for the Google email", async function () {
  await setGoogleAuthVariant("signup-account-exists");
});

When(
  "I complete Google authentication successfully",
  async function (this: CustomWorld) {
    if (!this.page) {
      throw new Error(
        "Page is not initialized. Make sure browser is initialized.",
      );
    }

    const source = await this.page.evaluate(() =>
      sessionStorage.getItem("googleAuthSource"),
    );
    const code =
      source === "signup" ? "google-signup-code" : "google-signin-code";
    await setCurrentUserAccountInitialized(source !== "signup");

    await navigateToGoogleCallback(this, `/login-callback?code=${code}`);
  },
);

When("I cancel Google authentication", async function (this: CustomWorld) {
  await navigateToGoogleCallback(this, "/login-callback?error=access_denied");
});
