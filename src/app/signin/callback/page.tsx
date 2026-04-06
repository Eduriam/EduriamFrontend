"use client";

import { ContentContainer, Header, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useEffect, useRef } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import CircularProgress from "@mui/material/CircularProgress";

import errorCodes from "infrastructure/api/error-codes";
import {
  GOOGLE_AUTH_ERRORS,
  GOOGLE_AUTH_ERROR_QUERY_PARAM,
  GOOGLE_AUTH_SOURCE_STORAGE_KEY,
  GoogleAuthSource,
} from "infrastructure/services/auth/GoogleAuthService";
import useAuth from "infrastructure/services/AuthProvider";

const GOOGLE_AUTH_PAGE_BY_SOURCE: Record<GoogleAuthSource, string> = {
  signin: "/signin",
  signup: "/signup",
};

const SigninCallbackPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation("common");
  const { authorizeGoogleCode } = useAuth();
  const hasHandledCallbackRef = useRef(false);

  const code = searchParams?.get("code");
  const error = searchParams?.get("error");

  useEffect(() => {
    if (hasHandledCallbackRef.current) {
      return;
    }
    hasHandledCallbackRef.current = true;

    const source = getSourceFromSession();
    const sourcePath = GOOGLE_AUTH_PAGE_BY_SOURCE[source];

    const finishCallback = async () => {
      if (error || !code) {
        sessionStorage.removeItem(GOOGLE_AUTH_SOURCE_STORAGE_KEY);
        router.replace(sourcePath);
        return;
      }

      try {
        await authorizeGoogleCode(code, source);
        sessionStorage.removeItem(GOOGLE_AUTH_SOURCE_STORAGE_KEY);
        router.replace(source === "signup" ? "/onboarding" : "/");
      } catch (errorCode) {
        sessionStorage.removeItem(GOOGLE_AUTH_SOURCE_STORAGE_KEY);
        router.replace(resolveGoogleErrorPath(errorCode, sourcePath));
      }
    };

    void finishCallback();
  }, [authorizeGoogleCode, code, error, router]);

  return (
    <PageRoot data-test="signin-callback-page">
      <ContentContainer width="small" justifyContent="center" spacing={8}>
        <Header variant="title" text={t("loading")} align="center" />
        <CircularProgress color="inherit" />
      </ContentContainer>
    </PageRoot>
  );
};

function getSourceFromSession(): GoogleAuthSource {
  const source = sessionStorage.getItem(GOOGLE_AUTH_SOURCE_STORAGE_KEY);
  return source === "signup" ? "signup" : "signin";
}

function resolveGoogleErrorPath(
  errorCode: unknown,
  fallbackPath: string,
): string {
  if (errorCode === errorCodes.googleAccountNotFound) {
    return `/signin?${GOOGLE_AUTH_ERROR_QUERY_PARAM}=${GOOGLE_AUTH_ERRORS.accountNotFound}`;
  }

  if (errorCode === errorCodes.googleAccountExists) {
    return `/signup?${GOOGLE_AUTH_ERROR_QUERY_PARAM}=${GOOGLE_AUTH_ERRORS.accountExists}`;
  }

  return fallbackPath;
}

export default SigninCallbackPage;
