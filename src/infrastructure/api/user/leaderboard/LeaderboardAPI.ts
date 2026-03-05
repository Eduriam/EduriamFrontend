import { Modify } from "domain/models/utils/modify";

import API, { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { UserLeaderboard } from "./Leaderboard";

const LeaderboardAPI = {
  URI: "users/me/leaderboard",

  useLeaderboard(): Modify<
    FetchHook<UserLeaderboard>,
    { leaderboard: UserLeaderboard | undefined }
  > {
    const { data, ...rest } = useAPI<UserLeaderboard>(this.URI);

    return {
      leaderboard: data,
      ...rest,
    };
  },

  async getLeaderboard(): Promise<UserLeaderboard> {
    return API.get(this.URI);
  },
};

export default LeaderboardAPI;
