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
}