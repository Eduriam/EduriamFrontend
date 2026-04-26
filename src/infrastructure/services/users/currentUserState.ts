import useSWR, { KeyedMutator, mutate } from "swr";

import type { GetUserModel } from "infrastructure/api/generated/models";
import AuthManager from "infrastructure/repositories/AuthManager";

import { UserService } from "./UserService";

export const CURRENT_USER_KEY = "users/me";

interface UseCurrentUserResult {
  user?: GetUserModel;
  isLoading: boolean;
  mutate: KeyedMutator<GetUserModel>;
}

export function useCurrentUserState(): UseCurrentUserResult {
  const hasIdToken = typeof window !== "undefined" && AuthManager.hasIdToken();
  const { data, error, mutate: mutateCurrentUser } =
    useSWR<GetUserModel>(hasIdToken ? CURRENT_USER_KEY : null, UserService.getUser, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: false,
      revalidateIfStale: false,
    });

  return {
    user: data,
    isLoading: hasIdToken && data === undefined && !error,
    mutate: mutateCurrentUser,
  };
}

export async function setCurrentUser(user: GetUserModel): Promise<void> {
  try {
    await mutate(CURRENT_USER_KEY, user, false);
  } catch {
    // Non-blocking cache writes should not fail user-facing flows.
  }
}

export async function patchCurrentUser(
  userChange: Partial<GetUserModel>,
): Promise<void> {
  try {
    await mutate(
      CURRENT_USER_KEY,
      (currentUser: GetUserModel | undefined) =>
        currentUser ? { ...currentUser, ...userChange } : currentUser,
      false,
    );
  } catch {
    // Non-blocking cache writes should not fail user-facing flows.
  }
}

export async function clearCurrentUser(): Promise<void> {
  try {
    await mutate(CURRENT_USER_KEY, undefined, false);
  } catch {
    // Non-blocking cache writes should not fail user-facing flows.
  }
}

export async function invalidateCurrentUser(): Promise<void> {
  try {
    await mutate(CURRENT_USER_KEY);
  } catch {
    // Non-blocking revalidation should not fail user-facing flows.
  }
}
