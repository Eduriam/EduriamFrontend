import { Given } from "@cucumber/cucumber";

import { UserPrivate } from "infrastructure/api/user/User";

import { CustomWorld } from "../../support/world";
import { createJwt } from "../util/jwt";

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
    energy: 0,
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
      energy: 0,
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
