import { Given, When } from "@cucumber/cucumber";

import { UserPrivate } from "infrastructure/api/users/me/User";

import { CustomWorld } from "../../support/world";
import { setGoogleAuthVariant } from "../../util/mockoon-env";
import { createJwt } from "../util/jwt";

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
    energy: 40,
    equippedStreakFreezes: 0,
    accountInitialized: true,
    lastSessionDate: null,
    activeSubscription: null,
    selectedCourse: {
      id: "test-course",
      name: "Test course",
      language: "en-US",
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

Given("I am logged in as corrector", async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error(
      "Page is not initialized. Make sure browser is initialized.",
    );
  }

  const user = {
    id: "test-corrector",
    username: "Test corrector",
    role: "CORRECTOR",
    streak: 0,
    balance: 0,
    energy: 40,
    equippedStreakFreezes: 0,
    accountInitialized: true,
    lastSessionDate: null,
    activeSubscription: null,
    selectedCourse: {
      id: "test-course",
      name: "Test course",
      language: "en-US",
    },
    lastViewedStudyMapLevel: 0,
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
    localStorage.setItem("idToken", JSON.stringify(idToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    localStorage.setItem("user", JSON.stringify(user));
  };

  if (this.context) {
    await this.context.addInitScript(initScript, {
      user,
      idToken,
      refreshToken,
    });
  }
  await this.page.addInitScript(initScript, { user, idToken, refreshToken });
});

Given(
  "I am logged in and enrolled the course",
  async function (this: CustomWorld) {
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
      energy: 40,
      equippedStreakFreezes: 0,
      accountInitialized: true,
      lastSessionDate: null,
      activeSubscription: null,
      selectedCourse: {
        id: "html",
        name: "HTML",
        language: "en-US",
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
  },
);

Given(
  "I am logged in and enrolled in the learning path",
  async function (this: CustomWorld) {
    if (!this.page) {
      throw new Error(
        "Page is not initialized. Make sure browser is initialized.",
      );
    }

    const user = {
      id: "test-user",
      username: "Test user",
      role: "USER",
      streak: 0,
      balance: 0,
      energy: 40,
      accountInitialized: true,
      lastSessionDate: null,
      activeSubscription: null,
      selectedCourse: {
        id: "test-course",
        name: "Test course",
        language: "en-US",
      },
      lastViewedStudyMapLevel: 0,
      // Extra field used only by the app runtime to mark the enrolled learning path.
      // It is intentionally not part of the UserPrivate TypeScript type.
      selectedLearningPath: { id: "react-developer-path" },
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
      localStorage.setItem("idToken", JSON.stringify(idToken));
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
      localStorage.setItem("user", JSON.stringify(user));
    };

    if (this.context) {
      await this.context.addInitScript(initScript, {
        user,
        idToken,
        refreshToken,
      });
    }
    await this.page.addInitScript(initScript, {
      user,
      idToken,
      refreshToken,
    });
  },
);

Given(
  "I am logged in and I am not enrolled in any course",
  async function (this: CustomWorld) {
    if (!this.page || !this.context) {
      throw new Error(
        "Page is not initialized. Make sure browser is initialized.",
      );
    }

    const user = {
      id: "test-user",
      username: "Test user",
      role: "USER",
      streak: 0,
      balance: 0,
      energy: 40,
      accountInitialized: false,
      lastSessionDate: null,
      activeSubscription: null,
      selectedCourse: null,
      lastViewedStudyMapLevel: 0,
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
      localStorage.setItem("idToken", JSON.stringify(idToken));
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
      localStorage.setItem("user", JSON.stringify(user));
    };

    await this.context.addInitScript(initScript, {
      user,
      idToken,
      refreshToken,
    });
    await this.page.addInitScript(initScript, {
      user,
      idToken,
      refreshToken,
    });

    // Load app so init script runs and localStorage is set
    await this.page.goto("/", {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });
    // Ensure localStorage is set then reload so app reads it (handles init script timing)
    await this.page.evaluate(
      ({ user, idToken, refreshToken }) => {
        localStorage.setItem("idToken", JSON.stringify(idToken));
        localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
        localStorage.setItem("user", JSON.stringify(user));
      },
      { user, idToken, refreshToken },
    );
    await this.page.reload({ waitUntil: "domcontentloaded", timeout: 15000 });
  },
);

Given("I am a premium user", async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error(
      "Page is not initialized. Make sure browser is initialized.",
    );
  }

  const user = {
    id: "test-user",
    username: "Test user",
    role: "PREMIUM_USER",
    streak: 0,
    balance: 0,
    accountInitialized: true,
    lastSessionDate: null,
    activeSubscription: {
      id: "test-subscription",
      validUntil: new Date().toISOString(),
    },
    selectedCourse: {
      id: "test-course",
      name: "Test course",
      language: "en-US",
    },
    lastViewedStudyMapLevel: 0,
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
    localStorage.setItem("idToken", JSON.stringify(idToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    localStorage.setItem("user", JSON.stringify(user));
  };

  if (this.context) {
    await this.context.addInitScript(initScript, {
      user,
      idToken,
      refreshToken,
    });
  }
  await this.page.addInitScript(initScript, {
    user,
    idToken,
    refreshToken,
  });
});

Given("I am not logged in", async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error(
      "Page is not initialized. Make sure browser is initialized.",
    );
  }

  // Clear any existing auth data so the app treats the user as logged out.
  await this.page.addInitScript(() => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  });
});

Given("I have no energy left", async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error(
      "Page is not initialized. Make sure browser is initialized.",
    );
  }

  const setNoEnergyInitScript = () => {
    const userRaw = localStorage.getItem("user");

    if (!userRaw) {
      return;
    }

    try {
      const parsedUser = JSON.parse(userRaw);
      const user = { ...parsedUser, energy: 0 };
      localStorage.setItem("user", JSON.stringify(user));
    } catch {
      // Intentionally ignored, scenarios can still rely on default auth fixture energy.
    }
  };

  if (this.context) {
    await this.context.addInitScript(setNoEnergyInitScript);
  }

  await this.page.addInitScript(setNoEnergyInitScript);
});

Given("No user account is linked to the Google account", async function () {
  await setGoogleAuthVariant("login-account-not-found");
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
      source === "signup" ? "google-signup-code" : "google-login-code";

    await navigateToGoogleCallback(this, `/login/callback?code=${code}`);
  },
);

When("I cancel Google authentication", async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error(
      "Page is not initialized. Make sure browser is initialized.",
    );
  }

  await navigateToGoogleCallback(this, "/login/callback?error=access_denied");
});
