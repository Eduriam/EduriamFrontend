import type { Id } from "domain/models/types/core";
import type { GetUserModel } from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

export class UserService {
  static async getUser(): Promise<GetUserModel> {
    try {
      const response = await usersClient.getApiUsersMe();
      if (!response.data) {
        throw new Error("User profile response is empty.");
      }

      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  }

  static async followUser(userId: Id): Promise<void> {
    try {
      await usersClient.putApiUsersMeFollowingUserId(userId);
    } catch (error) {
      return toErrorCode(error);
    }
  }

  static async unfollowUser(userId: Id): Promise<void> {
    try {
      await usersClient.deleteApiUsersMeFollowingUserId(userId);
    } catch (error) {
      return toErrorCode(error);
    }
  }
}