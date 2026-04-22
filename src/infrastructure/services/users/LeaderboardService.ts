import { Modify } from "domain/models/utils/modify";

import { FetchHook } from "infrastructure/api/API";
import type { UserLeaderboardModel } from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

const useLeaderboardQuery = (): Modify<
  FetchHook<UserLeaderboardModel>,
  { leaderboard: UserLeaderboardModel }
> => {
  const { data, ...rest } = useAuthenticatedAPI<UserLeaderboardModel>(
    "users/me/leaderboard",
    async () => LeaderboardService.getLeaderboard(),
  );

  return { leaderboard: data, ...rest };
};

export const LeaderboardService = {
  async getLeaderboard(): Promise<UserLeaderboardModel> {
    try {
      const response = await usersClient.getApiUsersMeLeaderboard();
      if (!response.data) {
        throw new Error("Leaderboard response is empty.");
      }

      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  useLeaderboard(): Modify<
    FetchHook<UserLeaderboardModel>,
    { leaderboard: UserLeaderboardModel }
  > {
    return useLeaderboardQuery();
  },
};
