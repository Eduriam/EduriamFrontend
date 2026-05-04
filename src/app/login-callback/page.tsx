"use client";

import { useEffect, useRef } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import LoadingScreen from "components/loading/LoadingScreen/LoadingScreen";

import useAuth from "infrastructure/services/AuthProvider";
import {
  GOOGLE_AUTH_ERRORS,
  GOOGLE_AUTH_ERROR_QUERY_PARAM,
  GOOGLE_AUTH_SERVICE_ERRORS,
  GOOGLE_AUTH_SOURCE_STORAGE_KEY,
  GoogleAuthSource,
} from "infrastructure/services/auth/GoogleAuthService";

const GOOGLE_AUTH_PAGE_BY_SOURCE: Record<GoogleAuthSource, string> = {
  signin: "/signin",
  signup: "/signup",
};

const LoginCallbackPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
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

  return <LoadingScreen />;
};

function getSourceFromSession(): GoogleAuthSource {
  const source = sessionStorage.getItem(GOOGLE_AUTH_SOURCE_STORAGE_KEY);
  return source === "signup" ? "signup" : "signin";
}

function resolveGoogleErrorPath(
  errorCode: unknown,
  fallbackPath: string,
): string {
  if (errorCode === GOOGLE_AUTH_SERVICE_ERRORS.googleAccountNotFound) {
    return `/signin?${GOOGLE_AUTH_ERROR_QUERY_PARAM}=${GOOGLE_AUTH_ERRORS.accountNotFound}`;
  }

  if (errorCode === GOOGLE_AUTH_SERVICE_ERRORS.googleAccountExists) {
    return `/signup?${GOOGLE_AUTH_ERROR_QUERY_PARAM}=${GOOGLE_AUTH_ERRORS.accountExists}`;
  }

  return fallbackPath;
}

export default LoginCallbackPage;
