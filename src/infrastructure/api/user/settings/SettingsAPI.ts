import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";

import { Settings } from "./Settings";

export interface SettingsParams {}

const SettingsAPI = {
  URI: "users/me/settings",

  useSettings(
    params: SettingsParams = {},
  ): Modify<FetchHook<Settings>, { settings: Settings }> {
    const { data, ...rest } = useAuthenticatedAPI<Settings>(
      `${this.URI}?${parseQueryParams(params)}`,
    );
    return { settings: data, ...rest };
  },

  async updateSettings(settings: Partial<Settings>): Promise<Settings> {
    return API.patch(`${this.URI}`, settings);
  },
};

export default SettingsAPI;
