import { Modify } from "domain/models/utils/modify";

import { FetchHook } from "infrastructure/api/API";
import type {
  ChangeUserSettingsPatchModel,
  GetUserSettingsModel,
} from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";
import { invalidateCurrentUser } from "infrastructure/services/users/currentUserState";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

const useSettingsQuery = (): Modify<
  FetchHook<GetUserSettingsModel>,
  { settings: GetUserSettingsModel }
> => {
  const { data, ...rest } = useAuthenticatedAPI<GetUserSettingsModel>(
    "users/me/settings",
    async () => SettingsService.getSettings(),
  );

  return { settings: data, ...rest };
};

export const SettingsService = {
  async getSettings(): Promise<GetUserSettingsModel> {
    try {
      const response = await usersClient.getApiUsersMeSettings();
      if (!response.data) {
        throw new Error("User settings response is empty.");
      }

      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async updateSettings(
    settings: ChangeUserSettingsPatchModel,
  ): Promise<GetUserSettingsModel> {
    try {
      const response = await usersClient.patchApiUsersMeSettings(settings);
      if (!response.data) {
        throw new Error("Updated user settings response is empty.");
      }

      await invalidateCurrentUser();
      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  useSettings(): Modify<
    FetchHook<GetUserSettingsModel>,
    { settings: GetUserSettingsModel }
  > {
    return useSettingsQuery();
  },
};
