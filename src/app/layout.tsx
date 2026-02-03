"use client";

import axios from "axios";
import { SnackbarProvider } from "notistack";

import { ViewTransitions } from "next-view-transitions";

import ThemeProvider from "@mui/material/styles/ThemeProvider";

import GoogleAdsense from "components/atoms/GoogleAdsense/GoogleAdsense";
import GoogleAnalytics from "components/atoms/GoogleAnalytics/GoogleAnalytics";
import Navigation from "components/atoms/navigation/NavigationBars/NavigationBars";

import { NoticeProvider } from "infrastructure/services/NoticeProvider";

import { AuthProvider } from "../infrastructure/services/AuthProvider";
import { ErrorHandler } from "../infrastructure/services/ErrorHandler";
import "../styles/globals.css";
import theme from "../styles/theme";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <ErrorHandler>
              <AuthProvider>
                <NoticeProvider>
                  <Navigation />
                  <GoogleAnalytics />
                  <GoogleAdsense />
                  <ViewTransitions>{children}</ViewTransitions>
                </NoticeProvider>
              </AuthProvider>
            </ErrorHandler>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
