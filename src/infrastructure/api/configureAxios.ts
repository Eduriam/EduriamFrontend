import axios, { AxiosRequestConfig } from "axios";

const ABSOLUTE_URL_PATTERN = /^([a-z][a-z\d+\-.]*:)?\/\//i;
let isAxiosConfigured = false;

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

export function configureAxios(): void {
  if (isAxiosConfigured) {
    return;
  }

  axios.defaults.baseURL = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL);
  axios.interceptors.request.use(normalizeApiRequestPath);
  isAxiosConfigured = true;
}
