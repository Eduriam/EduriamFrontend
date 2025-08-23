import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { UserProfile, UserSummary } from "./Users";

export interface UserParams {
  searchName?: string;
}

const UsersAPI = {
  URI: "users",

  useUsers(
    params: UserParams = {},
  ): Modify<FetchHook<Array<UserSummary>>, { users: Array<UserSummary> }> {
    const { data, ...rest } = useAPI<Array<UserSummary>>(
      `${this.URI}?${parseQueryParams(params)}`,
    );
    return { users: data, ...rest };
  },

  useUser(
    userId: Id,
  ): Modify<FetchHook<UserProfile>, { userProfile: UserProfile }> {
    const { data, ...rest } = useAPI<UserProfile>(`${this.URI}/${userId}`);
    return { userProfile: data, ...rest };
  },
};

export default UsersAPI;
