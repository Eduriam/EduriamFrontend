"use client";

import { SnackbarProvider } from "notistack";

import { ViewTransitions } from "next-view-transitions";

import GoogleAdsense from "components/advertisement/GoogleAdsense/GoogleAdsense";
import GoogleAnalytics from "components/atoms/GoogleAnalytics/GoogleAnalytics";

import { configureAxios } from "infrastructure/api/configureAxios";
import { NoticeProvider } from "infrastructure/services/NoticeProvider";
import PwaServiceWorkerRegistration from "infrastructure/services/PwaServiceWorkerRegistration";
import ThemeModeProvider from "infrastructure/services/ThemeModeProvider";

import { AuthProvider } from "../infrastructure/services/AuthProvider";
import { ErrorHandler } from "../infrastructure/services/ErrorHandler";
import "../styles/globals.css";

configureAxios();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body>
        <PwaServiceWorkerRegistration />
        <ViewTransitions>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <ErrorHandler>
              <AuthProvider>
                <ThemeModeProvider>
                  <NoticeProvider>
                    <GoogleAnalytics />
                    <GoogleAdsense />
                    {children}
                  </NoticeProvider>
                </ThemeModeProvider>
              </AuthProvider>
            </ErrorHandler>
          </SnackbarProvider>
        </ViewTransitions>
      </body>
    </html>
  );
}
