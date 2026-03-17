import API from "infrastructure/api/API";
import { UserPrivate } from "infrastructure/api/users/me/User";
import AuthManager from "infrastructure/repositories/AuthManager";
import { LocalStorageManager } from "infrastructure/repositories/LocalStorageManager";

import { LoginRequestBody, LoginResponseBody } from "./Login";

export interface LoginParams {}

const LoginAPI = {
  URI: "user-auth/login",

  async login(data: LoginRequestBody): Promise<UserPrivate> {
    return API.post(`${this.URI}`, data).then((resData: LoginResponseBody) => {
      AuthManager.setAuthHeader(resData.idToken);
      LocalStorageManager.setItem<string>("idToken", resData.idToken);
      LocalStorageManager.setItem<string>("refreshToken", resData.refreshToken);
      LocalStorageManager.setItem<UserPrivate>("user", resData.user);

      return resData.user;
    });
  },
};

export default LoginAPI;
