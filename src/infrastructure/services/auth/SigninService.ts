import { getAuth } from "infrastructure/api/generated/auth/auth";
import type {
  GetUserModel,
  LoginUserModel,
} from "infrastructure/api/generated/models";
import AuthManager from "infrastructure/repositories/AuthManager";
import { LocalStorageManager } from "infrastructure/repositories/LocalStorageManager";
import { UserService } from "infrastructure/services/users/UserService";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const authClient = getAuth();

export class SigninService {
  static async signin(data: LoginUserModel): Promise<GetUserModel> {
    try {
      const response = await authClient.postApiAuthSignin(data);

      if (!response.data) {
        throw new Error("Signin response is empty.");
      }

      AuthManager.setAuthHeader(response.data.accessToken);
      LocalStorageManager.setItem<string>("idToken", response.data.accessToken);
      LocalStorageManager.setItem<string>(
        "refreshToken",
        response.data.refreshToken,
      );

      return await UserService.getUser();
    } catch (error) {
      return toErrorCode(error);
    }
  }
}
