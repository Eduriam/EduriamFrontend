import type { Id } from "domain/models/types/core";
import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import { FetchHook } from "infrastructure/api/API";
import { getUsers } from "infrastructure/api/generated/users/users";
import type {
  AchievementType,
  AvatarModel,
  GetFollowerModel,
  GetUserPublicProfileModel,
  GetUserSimpleModel,
  GetUserSimpleModelPagedResult,
} from "infrastructure/api/generated/models";
import useAPI from "infrastructure/api/hooks/useAPI";
import type { LeaderboardLeague } from "infrastructure/api/users/me/leaderboard/Leaderboard";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

export interface UserParams {
  searchName?: string;
  page?: number;
  pageSize?: number;
}

export interface UserProfile {
  id: Id;
  followers: number;
  following: number;
  level: number;
  league: LeaderboardLeague;
  name: string;
  avatar?: AvatarModel;
  isFollowed: boolean;
  username: string;
  streak: number;
  achievements: Array<ProfileAchievement>;
  courses: Array<ProfileCourse>;
}

export type ProfileAchievement = {
  badgeIconName: "achievement-1" | "achievement-2";
  titleKey: string;
  userProgress: {
    value: number;
    goal: number;
  };
  id: Id;
};

export interface ProfileCourse {
  id: Id;
  name: string;
  type: "course" | "learning-path";
  logoId?: string;
  userProgress?: number;
}

const usersClient = getUsers();

const ACHIEVEMENT_TYPE_TO_TITLE_KEY: Record<AchievementType, string> = {
  0: "achievements.achievementsByType.lessonCompletions",
  1: "achievements.achievementsByType.reviewCompletions",
  2: "achievements.achievementsByType.courseCompletions",
  3: "achievements.achievementsByType.streakDays",
  4: "achievements.achievementsByType.perfectLessonCompletions",
  5: "achievements.achievementsByType.feedReactions",
  6: "achievements.achievementsByType.leagueTier",
  7: "achievements.achievementsByType.leagueFirstPlaceAny",
  8: "achievements.achievementsByType.leagueFirstPlaceMythic",
};

const toAchievementBadgeIconName = (
  achievementType: AchievementType,
): "achievement-1" | "achievement-2" =>
  achievementType % 2 === 0 ? "achievement-1" : "achievement-2";

const toUserProfile = (model: GetUserPublicProfileModel): UserProfile => ({
  id: model.id,
  followers: model.followers,
  following: model.following,
  level: 0,
  league: "iron",
  name: model.name,
  avatar: model.avatar ?? undefined,
  isFollowed: model.isFollowed,
  username: model.username,
  streak: model.streak,
  achievements: (model.achievements ?? []).map((achievement) => ({
    badgeIconName: toAchievementBadgeIconName(achievement.type),
    titleKey:
      ACHIEVEMENT_TYPE_TO_TITLE_KEY[achievement.type] ??
      "achievements.achievements",
    userProgress: {
      value: achievement.currentLevel,
      goal: Math.max(achievement.achievementMaxLevel, 1),
    },
    id: achievement.userAchievementId ?? achievement.achievementId,
  })),
  courses: (model.courses ?? []).map((course) => ({
    id: course.id,
    name: course.name,
    type: "course",
    logoId: course.logoId ?? undefined,
    userProgress: course.userProgress ?? undefined,
  })),
});

const toUserSummaryList = (
  responseData: GetUserSimpleModelPagedResult | GetUserSimpleModel[],
): Array<GetUserSimpleModel> => {
  const items = Array.isArray(responseData) ? responseData : responseData.items;
  return items ?? [];
};

const useUsersQuery = (
  params: UserParams = {},
): Modify<FetchHook<Array<GetUserSimpleModel>>, { users: Array<GetUserSimpleModel> }> => {
  const query = parseQueryParams(params);
  const key = query ? `users?${query}` : "users";
  const { data, ...rest } = useAPI<Array<GetUserSimpleModel>>(
    key,
    async () => UsersService.getUsers(params),
  );
  return { users: data, ...rest };
};

const useUserQuery = (
  userId: Id,
): Modify<FetchHook<UserProfile>, { userProfile: UserProfile }> => {
  const { data, ...rest } = useAPI<UserProfile>(
    `users/${userId}`,
    async () => UsersService.getUser(userId),
  );
  return { userProfile: data, ...rest };
};

const useFollowersQuery = (
  userId: Id,
): Modify<FetchHook<Array<GetFollowerModel>>, { followers: Array<GetFollowerModel> }> => {
  const { data, ...rest } = useAPI<Array<GetFollowerModel>>(
    `users/${userId}/followers`,
    async () => UsersService.getFollowers(userId),
  );
  return { followers: data, ...rest };
};

const useFollowingQuery = (
  userId: Id,
): Modify<FetchHook<Array<GetFollowerModel>>, { following: Array<GetFollowerModel> }> => {
  const { data, ...rest } = useAPI<Array<GetFollowerModel>>(
    `users/${userId}/following`,
    async () => UsersService.getFollowing(userId),
  );
  return { following: data, ...rest };
};

export const UsersService = {
  async getUsers(params: UserParams = {}): Promise<Array<GetUserSimpleModel>> {
    try {
      const queryParams = {
        SearchName: params.searchName,
        Page: params.page,
        PageSize: params.pageSize,
      };
      const response = await usersClient.getApiUsers(queryParams);
      if (!response.data) {
        throw new Error("Users response is empty.");
      }

      return toUserSummaryList(
        response.data as GetUserSimpleModelPagedResult | GetUserSimpleModel[],
      );
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async getUser(userId: Id): Promise<UserProfile> {
    try {
      const response = await usersClient.getApiUsersUserId(userId);
      if (!response.data) {
        throw new Error("User profile response is empty.");
      }

      return toUserProfile(response.data);
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async getFollowers(userId: Id): Promise<Array<GetFollowerModel>> {
    try {
      const response = await usersClient.getApiUsersUserIdFollowers(userId);
      if (!response.data) {
        return [];
      }

      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async getFollowing(userId: Id): Promise<Array<GetFollowerModel>> {
    try {
      const response = await usersClient.getApiUsersUserIdFollowing(userId);
      if (!response.data) {
        return [];
      }

      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  useUsers(
    params: UserParams = {},
  ): Modify<FetchHook<Array<GetUserSimpleModel>>, { users: Array<GetUserSimpleModel> }> {
    return useUsersQuery(params);
  },

  useUser(userId: Id): Modify<FetchHook<UserProfile>, { userProfile: UserProfile }> {
    return useUserQuery(userId);
  },

  useFollowers(
    userId: Id,
  ): Modify<FetchHook<Array<GetFollowerModel>>, { followers: Array<GetFollowerModel> }> {
    return useFollowersQuery(userId);
  },

  useFollowing(
    userId: Id,
  ): Modify<FetchHook<Array<GetFollowerModel>>, { following: Array<GetFollowerModel> }> {
    return useFollowingQuery(userId);
  },
};
