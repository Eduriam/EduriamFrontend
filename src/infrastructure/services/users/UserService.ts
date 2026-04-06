import type { GetUserModel } from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import type { UserPrivate } from "infrastructure/api/users/me/User";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

const toUserPrivate = (user: GetUserModel): UserPrivate => ({
  id: user.id,
  username: user.username,
  role:
    user.role === "PREMIUM_USER" || user.role === "CORRECTOR"
      ? user.role
      : "USER",
  streak: user.streak,
  balance: user.balance,
  energy: user.energy,
  streakFreezes: user.streakFreezes,
  accountInitialized: user.accountInitialized,
  activeSubscription: user.activeSubscription,
});

export class UserService {
  static async getUser(): Promise<UserPrivate> {
    try {
      const response = await usersClient.getApiUsersMe();
      if (!response.data) {
        throw new Error("User profile response is empty.");
      }

      return toUserPrivate(response.data);
    } catch (error) {
      return toErrorCode(error);
    }
  }
}
