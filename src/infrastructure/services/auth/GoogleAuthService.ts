import axios from "axios";

import { getAuth } from "infrastructure/api/generated/auth/auth";
import type {
  AuthCodeExchangeModel,
  GetUserModel,
} from "infrastructure/api/generated/models";
import AuthManager from "infrastructure/repositories/AuthManager";
import { LocalStorageManager } from "infrastructure/repositories/LocalStorageManager";
import { UserService } from "infrastructure/services/users/UserService";

const authClient = getAuth();

export type GoogleAuthSource = "signin" | "signup";

export const GOOGLE_AUTH_SOURCE_STORAGE_KEY = "googleAuthSource";
export const GOOGLE_AUTH_ERROR_QUERY_PARAM = "googleError";
export const GOOGLE_AUTH_ERRORS = {
  accountNotFound: "account-not-found",
  accountExists: "account-exists",
} as const;

export const GOOGLE_AUTH_SERVICE_ERRORS = {
  invalidGoogleAuthorizationUrl: "INVALID_GOOGLE_AUTHORIZATION_URL",
  googleAccountNotFound: "GOOGLE_ACCOUNT_NOT_FOUND",
  googleAccountExists: "GOOGLE_ACCOUNT_EXISTS",
  externalAuthError: "EXTERNAL_AUTH_ERROR",
} as const;

export type GoogleAuthErrorQuery =
  (typeof GOOGLE_AUTH_ERRORS)[keyof typeof GOOGLE_AUTH_ERRORS];

export class GoogleAuthService {
  static async getGoogleAuthorizationUrl(): Promise<string> {
    const response = await authClient.getApiAuthExternalGoogleLogin();

    if (!response.data?.authorizationUrl) {
      throw GOOGLE_AUTH_SERVICE_ERRORS.invalidGoogleAuthorizationUrl;
    }

    return response.data.authorizationUrl;
  }

  static async authorizeCode(
    data: AuthCodeExchangeModel,
  ): Promise<GetUserModel> {
    try {
      const response = await authClient.postApiAuthExternalGoogleToken(data);
      if (!response.data) {
        throw new Error("Google authorization response is empty.");
      }

      AuthManager.setAuthHeader(response.data.accessToken);
      LocalStorageManager.setItem<string>("idToken", response.data.accessToken);
      LocalStorageManager.setItem<string>(
        "refreshToken",
        response.data.refreshToken,
      );

      return await UserService.getUser();
    } catch (error) {
      throw normalizeGoogleAuthError(error);
    }
  }
}

function normalizeGoogleAuthError(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    const responseError =
      isRecord(responseData) && typeof responseData.error === "string"
        ? responseData.error
        : null;

    if (responseError) {
      return responseError;
    }

    const statusCode = error.response?.status;
    if (statusCode === 404) {
      return GOOGLE_AUTH_SERVICE_ERRORS.googleAccountNotFound;
    }

    if (statusCode === 409) {
      return GOOGLE_AUTH_SERVICE_ERRORS.googleAccountExists;
    }
  }

  return GOOGLE_AUTH_SERVICE_ERRORS.externalAuthError;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
