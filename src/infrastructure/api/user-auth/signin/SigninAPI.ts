import API from "infrastructure/api/API";
import { UserPrivate } from "infrastructure/api/users/me/User";
import AuthManager from "infrastructure/repositories/AuthManager";
import { LocalStorageManager } from "infrastructure/repositories/LocalStorageManager";

import { SigninRequestBody, SigninResponseBody } from "./Signin";

export interface SigninParams {}

const SigninAPI = {
  URI: "user-auth/signin",

  async signin(data: SigninRequestBody): Promise<UserPrivate> {
    return API.post(`${this.URI}`, data).then((resData: SigninResponseBody) => {
      AuthManager.setAuthHeader(resData.idToken);
      LocalStorageManager.setItem<string>("idToken", resData.idToken);
      LocalStorageManager.setItem<string>("refreshToken", resData.refreshToken);
      LocalStorageManager.setItem<UserPrivate>("user", resData.user);

      return resData.user;
    });
  },
};

export default SigninAPI;
