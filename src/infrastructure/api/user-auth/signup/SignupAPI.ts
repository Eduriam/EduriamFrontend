import API from "infrastructure/api/API";
import { UserPrivate } from "infrastructure/api/user/User";
import AuthManager from "infrastructure/repositories/AuthManager";
import { LocalStorageManager } from "infrastructure/repositories/LocalStorageManager";

import { SignupRequestBody, SignupResponseBody } from "./Signup";

export interface SignupParams {}

const SignupAPI = {
  URI: "user-auth/signup",

  async signUp(data: SignupRequestBody): Promise<UserPrivate> {
    return API.post(`${this.URI}`, data).then((resData: SignupResponseBody) => {
      AuthManager.setAuthHeader(resData.idToken);
      LocalStorageManager.setItem<string>("idToken", resData.idToken);
      LocalStorageManager.setItem<string>("refreshToken", resData.refreshToken);
      LocalStorageManager.setItem<UserPrivate>("user", resData.user);

      return resData.user;
    });
  },
};

export default SignupAPI;
