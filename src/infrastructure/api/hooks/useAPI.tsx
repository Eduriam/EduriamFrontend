import useSWR, { BareFetcher, Key } from "swr";

import { useEffect, useRef } from "react";

import useErrorHandler from "infrastructure/services/ErrorHandler";

import API, { SWRHook } from "../API";

export default function useAPI<T>(
  key: Key,
  fetcher?: BareFetcher<T>,
): SWRHook<T> {
  const { data, error, mutate } = useSWR<T>(
    key,
    fetcher ?? (API.get as BareFetcher<T>),
  );
  const { setError } = useErrorHandler();
  const errorHandledRef = useRef(false);

  useEffect(() => {
    if (error && !errorHandledRef.current) {
      setError();
      errorHandledRef.current = true;
    }

    if (!error) {
      errorHandledRef.current = false;
    }
  }, [error, setError]);

  return {
    // Existing API hooks rely on `data` being typed as T, while SWR returns T | undefined before the first response.
    data: data as T,
    isLoading: !error && !data,
    mutate,
  };
}
