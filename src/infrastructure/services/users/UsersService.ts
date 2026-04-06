import type { Id } from "domain/models/types/core";
import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import { FetchHook } from "infrastructure/api/API";
import { getUsers } from "infrastructure/api/generated/users/users";
import type {
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
  avatarDefinition?: AvatarModel;
  isFollowed: boolean;
  username: string;
  streak: number;
  achievements: Array<ProfileAchievement>;
  courses: Array<ProfileCourse>;
}

export type UserSummary = Pick<
  UserProfile,
  "id" | "name" | "username" | "avatarDefinition" | "isFollowed"
>;

export type ProfileAchievement = {
  badgeIconName: "achievement-1" | "achievement-2";
  userProgress: {
    value: number;
    goal: number;
  };
  description?: string;
  id: Id;
  title: string;
};

export interface ProfileCourse {
  id: Id;
  name: string;
  type: "course" | "learning-path";
  logoId?: string;
  userProgress?: number;
}

const usersClient = getUsers();

const toUserSummary = (model: GetUserSimpleModel): UserSummary => ({
  id: model.id,
  name: model.name,
  username: model.username,
  avatarDefinition: model.avatarDefinition ?? undefined,
  isFollowed: model.isFollowed,
});

const toUserProfile = (model: GetUserPublicProfileModel): UserProfile => ({
  id: model.id,
  followers: model.followers,
  following: model.following,
  level: 0,
  league: "iron",
  name: model.name,
  avatarDefinition: model.avatarDefinition ?? undefined,
  isFollowed: model.isFollowed,
  username: model.username,
  streak: model.streak,
  achievements: (model.achievements ?? []).map((achievement, index) => ({
    badgeIconName: index % 2 === 0 ? "achievement-1" : "achievement-2",
    userProgress: {
      value: achievement.unlockedAt ? 1 : 0,
      goal: 1,
    },
    description: achievement.description,
    id: achievement.achievementId,
    title: achievement.name,
  })),
  courses: (model.courses ?? []).map((course) => ({
    id: course.id,
    name: course.name,
    type: "course",
    userProgress: course.userProgress,
  })),
});

const toUserSummaryList = (
  responseData: GetUserSimpleModelPagedResult | GetUserSimpleModel[],
): Array<UserSummary> => {
  const items = Array.isArray(responseData) ? responseData : responseData.items;
  return (items ?? []).map(toUserSummary);
};

const useUsersQuery = (
  params: UserParams = {},
): Modify<FetchHook<Array<UserSummary>>, { users: Array<UserSummary> }> => {
  const query = parseQueryParams(params);
  const key = query ? `users?${query}` : "users";
  const { data, ...rest } = useAPI<Array<UserSummary>>(
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
  async getUsers(params: UserParams = {}): Promise<Array<UserSummary>> {
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
  ): Modify<FetchHook<Array<UserSummary>>, { users: Array<UserSummary> }> {
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
