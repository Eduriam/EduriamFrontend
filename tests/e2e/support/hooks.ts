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

  const dismissNotificationNoticeForBaselineTests = () => {
    window.localStorage.setItem(
      "eduriam.notifications.noticeDismissed",
      "true",
    );
  };

  await this.context?.addInitScript(dismissNotificationNoticeForBaselineTests);
  await this.page?.addInitScript(dismissNotificationNoticeForBaselineTests);
  await this.page
    ?.evaluate(dismissNotificationNoticeForBaselineTests)
    .catch(() => undefined);
});

Before({ tags: "@onboarding" }, async function (this: CustomWorld) {
  await setCurrentUserAccountInitialized(false);
  await seedAuthenticatedSession(this);
});

Before({ tags: "@signup" }, async function () {
  await setCurrentUserAccountInitialized(false);
});

Before({ tags: "@notifications" }, async function (this: CustomWorld) {
  if (!this.context || !this.page) {
    throw new Error("Browser context is not initialized.");
  }

  const setupNotificationTesting = () => {
    type StoredNotification = {
      title: string;
      options: NotificationOptions;
      onClick: () => void;
    };

    const state: {
      permission: NotificationPermission;
      promptVisible: boolean;
      promptResolver?: (permission: NotificationPermission) => void;
      foregroundHandler?: (payload: unknown) => void;
      shownNotifications: StoredNotification[];
    } = {
      permission: "default",
      promptVisible: false,
      shownNotifications: [],
    };

    window.localStorage.removeItem("eduriam.notifications.noticeDismissed");

    (window as any).__eduriamNotificationTestState = state;
    (window as any).__eduriamNotificationTesting = {
      get permission() {
        return state.permission;
      },
      set permission(permission: NotificationPermission) {
        state.permission = permission;
      },
      requestPermission() {
        state.promptVisible = true;

        return new Promise<NotificationPermission>((resolve) => {
          state.promptResolver = resolve;
        });
      },
      getToken() {
        return Promise.resolve("test-fcm-token");
      },
      onMessage(handler: (payload: unknown) => void) {
        state.foregroundHandler = handler;

        return () => {
          state.foregroundHandler = undefined;
        };
      },
      showNotification(
        title: string,
        options: NotificationOptions,
        onClick: () => void,
      ) {
        state.shownNotifications.push({ title, options, onClick });
      },
    };

    (window as any).__eduriamResolveNotificationPermission = (
      permission: NotificationPermission,
    ) => {
      state.permission = permission;
      (window as any).__eduriamNotificationTesting.permission = permission;
      state.promptVisible = false;
      state.promptResolver?.(permission);
      state.promptResolver = undefined;
    };

    (window as any).__eduriamSetNotificationPermission = (
      permission: NotificationPermission,
    ) => {
      state.permission = permission;
      (window as any).__eduriamNotificationTesting.permission = permission;
    };

    (window as any).__eduriamDispatchForegroundMessage = (payload: unknown) => {
      state.foregroundHandler?.(payload);
    };

    (window as any).__eduriamStoreNotification = (
      title: string,
      options: NotificationOptions,
    ) => {
      state.shownNotifications.push({
        title,
        options,
        onClick: () => {
          window.location.assign(options.data?.url || "/");
        },
      });
    };

    (window as any).__eduriamClickNotification = (type: string) => {
      const notification = state.shownNotifications.find(
        (shownNotification) => shownNotification.options.data?.type === type,
      );

      notification?.onClick();
    };
  };

  await this.context.addInitScript(setupNotificationTesting);
  await this.page.addInitScript(setupNotificationTesting);
  await this.page.evaluate(setupNotificationTesting).catch(() => undefined);
});

After(async function (this: CustomWorld) {
  try {
    await resetMockoonGlobalVarsToDefaults();
  } finally {
    await this.closeBrowser();
  }
});

