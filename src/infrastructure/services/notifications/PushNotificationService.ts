import DeviceService from "infrastructure/services/notifications/DeviceService";

type ForegroundMessagePayload = {
  notification?: {
    title?: string;
    body?: string;
  };
  data?: {
    title?: string;
    body?: string;
    url?: string;
    type?: string;
  };
};

type TestNotificationHooks = {
  permission?: NotificationPermission;
  requestPermission?: () => Promise<NotificationPermission>;
  getToken?: () => Promise<string | null>;
  onMessage?: (
    handler: (payload: ForegroundMessagePayload) => void,
  ) => () => void;
  showNotification?: (
    title: string,
    options: NotificationOptions,
    onClick: () => void,
  ) => void;
};

declare global {
  interface Window {
    __eduriamNotificationTesting: TestNotificationHooks;
    __eduriamNotificationTestState: {
      permission: NotificationPermission;
      promptVisible: boolean;
      shownNotifications: Array<{
        title: string;
        options: NotificationOptions;
        onClick: () => void;
      }>;
    };
    __eduriamResolveNotificationPermission: (
      permission: NotificationPermission,
    ) => void;
    __eduriamSetNotificationPermission: (
      permission: NotificationPermission,
    ) => void;
    __eduriamDispatchForegroundMessage: (
      payload: ForegroundMessagePayload,
    ) => void;
    __eduriamStoreNotification: (
      title: string,
      options: NotificationOptions,
    ) => void;
    __eduriamClickNotification: (type: string) => void;
  }
}

export const NOTIFICATION_NOTICE_DISMISSED_STORAGE_KEY =
  "eduriam.notifications.noticeDismissed";

type EnablePushNotificationResult =
  | "registered"
  | "permission-granted"
  | "permission-denied"
  | "unsupported"
  | "missing-config"
  | "token-unavailable"
  | "registration-failed";

const LOCALHOST_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isSecureNotificationContext(): boolean {
  if (!isBrowser()) {
    return false;
  }

  return (
    window.location.protocol === "https:" ||
    LOCALHOST_HOSTNAMES.has(window.location.hostname)
  );
}

function getFirebaseConfig() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  if (
    !config.apiKey ||
    !config.projectId ||
    !config.messagingSenderId ||
    !config.appId
  ) {
    return null;
  }

  return config;
}

function getCurrentPermission(): NotificationPermission {
  return (
    window.__eduriamNotificationTesting?.permission ??
    window.Notification.permission
  );
}

async function requestPermission(): Promise<NotificationPermission> {
  const testRequestPermission =
    window.__eduriamNotificationTesting?.requestPermission;

  if (testRequestPermission) {
    return testRequestPermission();
  }

  return window.Notification.requestPermission();
}

async function getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration> {
  const existingRegistration =
    await navigator.serviceWorker.getRegistration("/sw.js");

  if (existingRegistration) {
    return existingRegistration;
  }

  return navigator.serviceWorker.register("/sw.js");
}

async function getFirebaseToken(): Promise<string | null> {
  const testGetToken = window.__eduriamNotificationTesting?.getToken;

  if (testGetToken) {
    return testGetToken();
  }

  const firebaseConfig = getFirebaseConfig();
  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

  if (!firebaseConfig || !vapidKey) {
    return null;
  }

  const [{ getApp, getApps, initializeApp }, messagingModule] =
    await Promise.all([import("firebase/app"), import("firebase/messaging")]);

  const app =
    getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const isSupported = await messagingModule.isSupported();

  if (!isSupported) {
    return null;
  }

  const messaging = messagingModule.getMessaging(app);
  const serviceWorkerRegistration = await getServiceWorkerRegistration();

  return messagingModule.getToken(messaging, {
    vapidKey,
    serviceWorkerRegistration,
  });
}

function getNotificationTargetUrl(payload: ForegroundMessagePayload): string {
  return payload.data?.url || "/";
}

function showForegroundNotification(payload: ForegroundMessagePayload): void {
  const title =
    payload.notification?.title ||
    payload.data?.title ||
    "Eduriam";
  const body = payload.notification?.body || payload.data?.body;
  const targetUrl = getNotificationTargetUrl(payload);
  const onClick = () => {
    window.focus();
    window.location.assign(targetUrl);
  };

  const options: NotificationOptions = {
    body,
    data: {
      url: targetUrl,
      type: payload.data?.type,
    },
  };

  const testShowNotification =
    window.__eduriamNotificationTesting?.showNotification;

  if (testShowNotification) {
    testShowNotification(title, options, onClick);
    return;
  }

  const notification = new window.Notification(title, options);
  notification.onclick = onClick;
}

const PushNotificationService = {
  isSupported(): boolean {
    return (
      isBrowser() &&
      "Notification" in window &&
      "serviceWorker" in navigator &&
      isSecureNotificationContext()
    );
  },

  shouldShowNotificationNotice(): boolean {
    if (!this.isSupported()) {
      return false;
    }

    if (getCurrentPermission() === "granted") {
      return false;
    }

    return (
      window.localStorage.getItem(NOTIFICATION_NOTICE_DISMISSED_STORAGE_KEY) !==
      "true"
    );
  },

  dismissNotificationNotice(): void {
    if (!isBrowser()) {
      return;
    }

    window.localStorage.setItem(
      NOTIFICATION_NOTICE_DISMISSED_STORAGE_KEY,
      "true",
    );
  },

  async enablePushNotifications(): Promise<EnablePushNotificationResult> {
    if (!this.isSupported()) {
      return "unsupported";
    }

    const permission = await requestPermission();
    window.__eduriamNotificationTesting =
      window.__eduriamNotificationTesting ?? {};
    window.__eduriamNotificationTesting.permission = permission;

    if (permission !== "granted") {
      this.dismissNotificationNotice();
      return "permission-denied";
    }

    const firebaseConfig = getFirebaseConfig();
    const hasTestTokenGetter = !!window.__eduriamNotificationTesting?.getToken;

    if (!firebaseConfig && !hasTestTokenGetter) {
      return "missing-config";
    }

    try {
      const token = await getFirebaseToken();

      if (!token) {
        window.dispatchEvent(new Event("eduriam:push-notification-enabled"));
        return "token-unavailable";
      }

      await DeviceService.registerDeviceToken(token);
      window.dispatchEvent(new Event("eduriam:push-notification-enabled"));
      return "registered";
    } catch {
      window.dispatchEvent(new Event("eduriam:push-notification-enabled"));
      return "registration-failed";
    }
  },

  async listenForForegroundMessages(): Promise<() => void> {
    if (!this.isSupported() || getCurrentPermission() !== "granted") {
      return () => undefined;
    }

    const testOnMessage = window.__eduriamNotificationTesting?.onMessage;

    if (testOnMessage) {
      return testOnMessage(showForegroundNotification);
    }

    const firebaseConfig = getFirebaseConfig();

    if (!firebaseConfig) {
      return () => undefined;
    }

    const [{ getApp, getApps, initializeApp }, messagingModule] =
      await Promise.all([import("firebase/app"), import("firebase/messaging")]);
    const isSupported = await messagingModule.isSupported();

    if (!isSupported) {
      return () => undefined;
    }

    const app =
      getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    const messaging = messagingModule.getMessaging(app);

    return messagingModule.onMessage(messaging, showForegroundNotification);
  },
};

export default PushNotificationService;
