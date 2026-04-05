import { BareFetcher, Key } from "swr";

import useAPI from "infrastructure/api/hooks/useAPI";
import AuthManager from "infrastructure/repositories/AuthManager";

import { SWRHook } from "../API";

export default function useAuthenticatedAPI<T>(
  key: Key,
  fetcher?: BareFetcher<T>,
): SWRHook<T> {
  const hasIdToken = typeof window !== "undefined" && AuthManager.hasIdToken();

  return useAPI<T>(hasIdToken ? key : null, fetcher);
}
