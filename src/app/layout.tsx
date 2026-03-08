"use client";

import axios from "axios";
import { SnackbarProvider } from "notistack";

import { ViewTransitions } from "next-view-transitions";

import GoogleAdsense from "components/atoms/GoogleAdsense/GoogleAdsense";
import GoogleAnalytics from "components/atoms/GoogleAnalytics/GoogleAnalytics";

import { NoticeProvider } from "infrastructure/services/NoticeProvider";
import ThemeModeProvider from "infrastructure/services/ThemeModeProvider";

import { AuthProvider } from "../infrastructure/services/AuthProvider";
import { ErrorHandler } from "../infrastructure/services/ErrorHandler";
import "../styles/globals.css";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
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
