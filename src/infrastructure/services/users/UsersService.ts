import type { Id } from "domain/models/types/core";
import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import { FetchHook } from "infrastructure/api/API";
import { getUsers } from "infrastructure/api/generated/users/users";
import type {
  GetApiUsersParams,
  GetFollowerModel,
  GetUserPublicProfileModel,
  GetUserSimpleModel,
} from "infrastructure/api/generated/models";
import useAPI from "infrastructure/api/hooks/useAPI";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

const useUsersQuery = (
  params: GetApiUsersParams = {},
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
): Modify<FetchHook<GetUserPublicProfileModel>, { userProfile: GetUserPublicProfileModel }> => {
  const { data, ...rest } = useAPI<GetUserPublicProfileModel>(
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
  async getUsers(params: GetApiUsersParams = {}): Promise<Array<GetUserSimpleModel>> {
    try {
      const response = await usersClient.getApiUsers(params);
      return response.data?.items ?? [];
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async getUser(userId: Id): Promise<GetUserPublicProfileModel> {
    try {
      const response = await usersClient.getApiUsersUserId(userId);
      if (!response.data) {
        throw new Error("User profile response is empty.");
      }

      return response.data;
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
    params: GetApiUsersParams = {},
  ): Modify<FetchHook<Array<GetUserSimpleModel>>, { users: Array<GetUserSimpleModel> }> {
    return useUsersQuery(params);
  },

  useUser(
    userId: Id,
  ): Modify<
    FetchHook<GetUserPublicProfileModel>,
    { userProfile: GetUserPublicProfileModel }
  > {
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
