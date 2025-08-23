import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { Follower } from "./Followers";

export interface FollowerParams {}

const FollowersAPI = {
  URI: (userId: Id) => `users/${userId}/followers`,

  useFollowers(
    userId: Id,
    params: FollowerParams = {},
  ): Modify<FetchHook<Array<Follower>>, { followers: Array<Follower> }> {
    const { data, ...rest } = useAPI<Array<Follower>>(
      `${this.URI(userId)}?${parseQueryParams(params)}`,
    );
    return { followers: data, ...rest };
  },
};

export default FollowersAPI;
