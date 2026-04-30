import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { CustomWorld } from "../../support/world";

const NOTIFICATION_LABELS_BY_TYPE: Record<
  string,
  { title: string; body: string }
> = {
  "study-reminder-notification": {
    title: "Eduriam",
    body: "Je čas se dnes učit.",
  },
};

Given(
  "The {string} notification type is enabled in settings",
  function (this: CustomWorld, notificationType: string) {
    if (!NOTIFICATION_LABELS_BY_TYPE[notificationType]) {
      throw new Error(`Unsupported notification type "${notificationType}".`);
    }

    this.notificationTypeEnabled = true;
  },
);

Given(
  "The {string} notification type is disabled in settings",
  function (this: CustomWorld, notificationType: string) {
    if (!NOTIFICATION_LABELS_BY_TYPE[notificationType]) {
      throw new Error(`Unsupported notification type "${notificationType}".`);
    }

    this.notificationTypeEnabled = false;
  },
);

Given(
  "I have push notifications allowed",
  async function (this: CustomWorld) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    if (this.page.url() === "about:blank") {
      const frontendPort = process.env.TEST_FRONTEND_PORT || "3000";
      await this.page.goto(`http://localhost:${frontendPort}/`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
    }

    await this.page.evaluate(() => {
      (window as any).__eduriamSetNotificationPermission("granted");
    });
  },
);

Then(
  "I should see the browser push notification permission prompt",
  async function (this: CustomWorld) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await expect
      .poll(
        async () =>
          this.page?.evaluate(
            () => (window as any).__eduriamNotificationTestState.promptVisible,
          ),
        { timeout: 5000 },
      )
      .toBe(true);
  },
);

When(
  "I grant the browser push notification permission",
  async function (this: CustomWorld) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await this.page.evaluate(() => {
      (window as any).__eduriamResolveNotificationPermission("granted");
    });
  },
);

When(
  "I deny the browser push notification permission",
  async function (this: CustomWorld) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await this.page.evaluate(() => {
      (window as any).__eduriamResolveNotificationPermission("denied");
    });
  },
);

Given(
  "A push notification event for {string} occurs",
  async function (this: CustomWorld, notificationType: string) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    const notification = NOTIFICATION_LABELS_BY_TYPE[notificationType];

    if (!notification) {
      throw new Error(`Unsupported notification type "${notificationType}".`);
    }

    if (!this.notificationTypeEnabled) {
      return;
    }

    await this.page.evaluate(
      ({ body, title, type }) => {
        (window as any).__eduriamStoreNotification(title, {
          body,
          data: {
            type,
            url: "/",
          },
        });
      },
      {
        ...notification,
        type: notificationType,
      },
    );
  },
);

Then(
  "I should receive the {string} push notification",
  async function (this: CustomWorld, notificationType: string) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await expect
      .poll(
        async () =>
          this.page?.evaluate(
            (type) =>
              (window as any).__eduriamNotificationTestState.shownNotifications.some(
                (notification: { options: NotificationOptions }) =>
                  notification.options.data?.type === type,
              ),
            notificationType,
          ),
        { timeout: 5000 },
      )
      .toBe(true);
  },
);

Then(
  "I should not receive the {string} push notification",
  async function (this: CustomWorld, notificationType: string) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    const wasShown = await this.page.evaluate(
      (type) =>
        (window as any).__eduriamNotificationTestState.shownNotifications.some(
          (notification: { options: NotificationOptions }) =>
            notification.options.data?.type === type,
        ),
      notificationType,
    );

    expect(wasShown).toBe(false);
  },
);

When(
  "I click the {string} push notification",
  async function (this: CustomWorld, notificationType: string) {
    if (!this.page) {
      throw new Error("Page is not initialized.");
    }

    await this.page.evaluate((type) => {
      (window as any).__eduriamClickNotification(type);
    }, notificationType);
  },
);
