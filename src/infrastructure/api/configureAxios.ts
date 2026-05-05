import axios, { AxiosError, AxiosRequestConfig } from "axios";

import AuthManager from "infrastructure/repositories/AuthManager";

const ABSOLUTE_URL_PATTERN = /^([a-z][a-z\d+\-.]*:)?\/\//i;
const REFRESH_TOKEN_URL = "/api/auth/refresh-token";
let isAxiosConfigured = false;
// Single-flight refresh: when several requests fail with 401 at once, they all await the same token refresh instead of racing multiple refresh calls.
let refreshTokenRequest: Promise<string | null> | null = null;

type RetriableAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

function normalizeBaseUrl(baseUrl?: string): string | undefined {
  if (!baseUrl) {
    return baseUrl;
  }

  return baseUrl.replace(/\/api\/?$/, "");
}

function normalizeRequestUrl(url?: string): string | undefined {
  if (!url || ABSOLUTE_URL_PATTERN.test(url)) {
    return url;
  }

  const urlWithLeadingSlash = url.startsWith("/") ? url : `/${url}`;

  if (urlWithLeadingSlash.startsWith("/api/")) {
    return urlWithLeadingSlash;
  }

  return `/api${urlWithLeadingSlash}`;
}

function normalizeApiRequestPath(
  config: AxiosRequestConfig,
): AxiosRequestConfig {
  return {
    ...config,
    url: normalizeRequestUrl(config.url),
  };
}

function isRefreshTokenRequest(url?: string): boolean {
  const normalizedUrl = normalizeRequestUrl(url);

  return (
    normalizedUrl === REFRESH_TOKEN_URL ||
    Boolean(url?.endsWith(REFRESH_TOKEN_URL))
  );
}

function getRefreshTokenRequest(): Promise<string | null> {
  if (!refreshTokenRequest) {
    refreshTokenRequest = AuthManager.refreshIdToken().finally(() => {
      refreshTokenRequest = null;
    });
  }

  return refreshTokenRequest;
}

async function refreshTokenAndRetryRequest(error: AxiosError): Promise<unknown> {
  const originalRequest = error.config as RetriableAxiosRequestConfig | undefined;

  if (
    error.response?.status !== 401 ||
    !originalRequest ||
    originalRequest._retry ||
    isRefreshTokenRequest(originalRequest.url)
  ) {
    return Promise.reject(error);
  }

  originalRequest._retry = true;
  const accessToken = await getRefreshTokenRequest();

  if (!accessToken) {
    return Promise.reject(error);
  }

  originalRequest.headers = {
    ...originalRequest.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  return axios(originalRequest);
}

export function configureAxios(): void {
  if (isAxiosConfigured) {
    return;
  }

  axios.defaults.baseURL = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL);
  axios.interceptors.request.use(normalizeApiRequestPath);
  axios.interceptors.response.use(
    (response) => response,
    refreshTokenAndRetryRequest,
  );
  isAxiosConfigured = true;
}
