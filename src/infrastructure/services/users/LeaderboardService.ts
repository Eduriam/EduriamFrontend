import axios from "axios";
import { Modify } from "domain/models/utils/modify";

import { FetchHook } from "infrastructure/api/API";
import type { UserLeaderboardModel } from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();
export type LeaderboardDataModel = Omit<UserLeaderboardModel, "currentLeague"> & {
  currentLeague: UserLeaderboardModel["currentLeague"] | null;
};

const EMPTY_LEADERBOARD: LeaderboardDataModel = {
  currentLeague: null,
  timeLeft: "PT0M",
  zones: {
    promotionZoneEndIndex: 0,
    demotionZoneStartIndex: 0,
  },
  users: [],
};

const createEmptyLeaderboard = (): LeaderboardDataModel => ({
  ...EMPTY_LEADERBOARD,
  zones: { ...EMPTY_LEADERBOARD.zones },
  users: [],
});

const useLeaderboardQuery = (): Modify<
  FetchHook<LeaderboardDataModel>,
  { leaderboard: LeaderboardDataModel }
> => {
  const { data, ...rest } = useAuthenticatedAPI<LeaderboardDataModel>(
    "users/me/leaderboard",
    async () => LeaderboardService.getLeaderboard(),
  );

  return { leaderboard: data, ...rest };
};

export const LeaderboardService = {
  async getLeaderboard(): Promise<LeaderboardDataModel> {
    try {
      const response = await usersClient.getApiUsersMeLeaderboard();
      if (response.status === 204) {
        return createEmptyLeaderboard();
      }

      if (!response.data) {
        throw new Error("Leaderboard response is empty.");
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 204) {
        return createEmptyLeaderboard();
      }

      return toErrorCode(error);
    }
  },

  useLeaderboard(): Modify<
    FetchHook<LeaderboardDataModel>,
    { leaderboard: LeaderboardDataModel }
  > {
    return useLeaderboardQuery();
  },
};
