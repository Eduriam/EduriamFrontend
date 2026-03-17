import axios, { AxiosError } from "axios";

import errorCodes from "infrastructure/api/error-codes";
import AuthManager from "infrastructure/repositories/AuthManager";
import { LocalStorageManager } from "infrastructure/repositories/LocalStorageManager";

import { UserPrivate } from "../user/User";
import {
  GoogleAuthorizeResponseBody,
  GoogleCodeExchangeRequestBody,
  GoogleCodeExchangeResponseBody,
} from "./ExternalAuth";

const EXTERNAL_GOOGLE_AUTHORIZE_URI = "external-auth/google/authorize";
const CODE_AUTHORIZE_URI = "/authorize";

const ExternalAuthAPI = {
  async getGoogleAuthorizationUrl(): Promise<string> {
    const response = await axios.get<GoogleAuthorizeResponseBody>(
      EXTERNAL_GOOGLE_AUTHORIZE_URI,
    );
    const authorizationUrl = getAuthorizationUrl(response.data);

    if (!authorizationUrl) {
      throw errorCodes.invalidGoogleAuthorizationUrl;
    }

    return authorizationUrl;
  },

  async authorizeCode(data: GoogleCodeExchangeRequestBody): Promise<UserPrivate> {
    try {
      return await this.exchangeCode(CODE_AUTHORIZE_URI, data);
    } catch (error) {
      throw normalizeExternalAuthError(error);
    }
  },

  async exchangeCode(
    endpoint: string,
    data: GoogleCodeExchangeRequestBody,
  ): Promise<UserPrivate> {
    const response = await axios.post<GoogleCodeExchangeResponseBody>(
      endpoint,
      data,
    );
    const authPayload = getCodeExchangeResponsePayload(response.data);

    if (!authPayload) {
      throw errorCodes.externalAuthError;
    }

    AuthManager.setAuthHeader(authPayload.idToken);
    LocalStorageManager.setItem<string>("idToken", authPayload.idToken);
    LocalStorageManager.setItem<string>("refreshToken", authPayload.refreshToken);
    LocalStorageManager.setItem<UserPrivate>("user", authPayload.user);

    return authPayload.user;
  },
};

function normalizeExternalAuthError(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (isAxiosError(error)) {
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
      return errorCodes.googleAccountNotFound;
    }
    if (statusCode === 409) {
      return errorCodes.googleAccountExists;
    }
  }

  return errorCodes.externalAuthError;
}

function getAuthorizationUrl(responseData: unknown): string | null {
  if (typeof responseData === "string") {
    return responseData;
  }

  if (!isRecord(responseData)) {
    return null;
  }

  if (typeof responseData.authorizationUrl === "string") {
    return responseData.authorizationUrl;
  }

  if (typeof responseData.url === "string") {
    return responseData.url;
  }

  if (typeof responseData.data === "string") {
    return responseData.data;
  }

  if (isRecord(responseData.data)) {
    if (typeof responseData.data.authorizationUrl === "string") {
      return responseData.data.authorizationUrl;
    }

    if (typeof responseData.data.url === "string") {
      return responseData.data.url;
    }
  }

  return null;
}

function getCodeExchangeResponsePayload(
  responseData: unknown,
): GoogleCodeExchangeResponseBody | null {
  if (isAuthResponseBody(responseData)) {
    return responseData;
  }

  if (isRecord(responseData) && isAuthResponseBody(responseData.data)) {
    return responseData.data;
  }

  return null;
}

function isAuthResponseBody(data: unknown): data is GoogleCodeExchangeResponseBody {
  return (
    isRecord(data) &&
    typeof data.idToken === "string" &&
    typeof data.refreshToken === "string" &&
    isRecord(data.user)
  );
}

function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export default ExternalAuthAPI;
