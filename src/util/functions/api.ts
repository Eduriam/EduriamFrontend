import { Id } from "domain/models/types/core";

// eslint-disable-next-line @typescript-eslint/ban-types
export function parseQueryParams(params: Object): string {
  const arr = [];
  for (const [key, value] of Object.entries(params)) {
    arr.push(`${key}=${value}`);
  }

  return arr.join("&");
}

export function parseId(value: unknown): Id | undefined {
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (typeof rawValue === "number") {
    return Number.isFinite(rawValue) ? rawValue : undefined;
  }

  if (typeof rawValue !== "string") {
    return undefined;
  }

  const normalizedValue = rawValue.trim();
  if (!normalizedValue) {
    return undefined;
  }

  const parsedValue = Number(normalizedValue);
  return Number.isFinite(parsedValue) ? parsedValue : undefined;
}

export function parseRequiredId(value: unknown): Id | null {
  return parseId(value) ?? null;
}
