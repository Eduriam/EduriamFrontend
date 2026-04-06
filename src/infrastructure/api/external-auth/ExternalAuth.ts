import type { GetUserModel } from "infrastructure/api/generated/models";

export type GoogleAuthSource = "signin" | "signup";

export interface GoogleAuthorizeResponseBody {
  data?: unknown;
  authorizationUrl?: string;
  url?: string;
}

export interface GoogleCodeExchangeRequestBody {
  code: string;
}

export interface GoogleCodeExchangeResponseBody {
  idToken: string;
  refreshToken: string;
  user: GetUserModel;
}

export const GOOGLE_AUTH_SOURCE_STORAGE_KEY = "googleAuthSource";

export const GOOGLE_AUTH_ERROR_QUERY_PARAM = "googleError";
export const GOOGLE_AUTH_ERRORS = {
  accountNotFound: "account-not-found",
  accountExists: "account-exists",
} as const;

export type GoogleAuthErrorQuery =
  (typeof GOOGLE_AUTH_ERRORS)[keyof typeof GOOGLE_AUTH_ERRORS];