"use client";

import { useEffect } from "react";

import PushNotificationService from "infrastructure/services/notifications/PushNotificationService";

const PushNotificationForegroundHandler: React.FC = () => {
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    const subscribe = () => {
      void PushNotificationService.listenForForegroundMessages().then(
        (nextUnsubscribe) => {
          if (cancelled) {
            nextUnsubscribe();
            return;
          }

          unsubscribe?.();
          unsubscribe = nextUnsubscribe;
        },
      );
    };

    subscribe();
    window.addEventListener("eduriam:push-notification-enabled", subscribe);

    return () => {
      cancelled = true;
      window.removeEventListener(
        "eduriam:push-notification-enabled",
        subscribe,
      );
      unsubscribe?.();
    };
  }, []);

  return null;
};

export default PushNotificationForegroundHandler;
