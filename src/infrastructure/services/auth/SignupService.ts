import { getAuth } from "infrastructure/api/generated/auth/auth";
import type { RegisterUserModel } from "infrastructure/api/generated/models";
import type { UserPrivate } from "infrastructure/api/users/me/User";
import AuthManager from "infrastructure/repositories/AuthManager";
import { LocalStorageManager } from "infrastructure/repositories/LocalStorageManager";
import { UserService } from "infrastructure/services/users/UserService";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const authClient = getAuth();

export class SignupService {
  static async signUp(data: RegisterUserModel): Promise<UserPrivate> {
    try {
      const response = await authClient.postApiAuthSignup(data);

      if (!response.data) {
        throw new Error("Signup response is empty.");
      }

      AuthManager.setAuthHeader(response.data.accessToken);
      LocalStorageManager.setItem<string>("idToken", response.data.accessToken);
      LocalStorageManager.setItem<string>(
        "refreshToken",
        response.data.refreshToken,
      );

      const user = await UserService.getUser();

      LocalStorageManager.setItem<UserPrivate>("user", user);

      return user;
    } catch (error) {
      return toErrorCode(error);
    }
  }
}
