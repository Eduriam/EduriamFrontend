"use client";

import { useEffect } from "react";

export interface IPwaServiceWorkerRegistration {}

const LOCALHOST_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);

const PwaServiceWorkerRegistration: React.FC<
  IPwaServiceWorkerRegistration
> = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    if (!("serviceWorker" in navigator)) {
      return;
    }

    const isSecureContext =
      window.location.protocol === "https:" ||
      LOCALHOST_HOSTNAMES.has(window.location.hostname);

    if (!isSecureContext) {
      return;
    }

    const registerServiceWorker = () => {
      void navigator.serviceWorker.register("/sw.js");
    };

    if (document.readyState === "complete") {
      registerServiceWorker();

      return;
    }

    window.addEventListener("load", registerServiceWorker);

    return () => window.removeEventListener("load", registerServiceWorker);
  }, []);

  return null;
};

export default PwaServiceWorkerRegistration;
