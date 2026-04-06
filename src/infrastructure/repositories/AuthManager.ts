import axios from "axios";
import jwtDecode from "jwt-decode";

import type {
  AuthCodeExchangeModel,
  GetUserModel,
  LoginUserModel,
  RegisterUserModel,
} from "infrastructure/api/generated/models";
import { GoogleAuthService } from "infrastructure/services/auth/GoogleAuthService";
import { RefreshTokenService } from "infrastructure/services/auth/RefreshTokenService";
import { SigninService } from "infrastructure/services/auth/SigninService";
import { SignupService } from "infrastructure/services/auth/SignupService";


import { LocalStorageManager } from "./LocalStorageManager";

const AuthManager = {
  hasIdToken(): boolean {
    return Boolean(LocalStorageManager.getItem<string>("idToken"));
  },

  signout(): void {
    this.removeAuthHeader();
    LocalStorageManager.removeItem("idToken");
    LocalStorageManager.removeItem("refreshToken");
    LocalStorageManager.removeItem("user");
  },

  async signin(data: LoginUserModel): Promise<GetUserModel> {
    return SigninService.signin(data);
  },

  async signUp(data: RegisterUserModel): Promise<GetUserModel> {
    return SignupService.signUp(data);
  },

  async getGoogleAuthorizationUrl(): Promise<string> {
    return GoogleAuthService.getGoogleAuthorizationUrl();
  },

  async authorizeGoogleCode(
    data: AuthCodeExchangeModel,
  ): Promise<GetUserModel> {
    return GoogleAuthService.authorizeCode(data);
  },

  async refreshIdToken(): Promise<void> {
    const refreshToken = LocalStorageManager.getItem<string>("refreshToken");

    if (refreshToken === null) {
      // Refresh token doesn't exist, user needs to sign in again
      this.signout();
      return;
    }

    return RefreshTokenService.refreshIdToken({
      refreshToken,
    })
      .then((res) => {
        this.setAuthHeader(res.accessToken);
        LocalStorageManager.setItem<string>("idToken", res.accessToken);
        LocalStorageManager.setItem<string>("refreshToken", res.refreshToken);
      })
      .catch(() => {
        // Refresh token is expired, user needs to sign in again
        this.signout();
      });
  },

  async getCurrentUser(): Promise<GetUserModel> {
    const token = LocalStorageManager.getItem<string>("idToken");

    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      // If Id token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        await this.refreshIdToken();
      } else {
        this.setAuthHeader(token);
      }
    } else {
      this.signout();
    }

    const user = LocalStorageManager.getItem<GetUserModel>("user");
    if (user === null) {
      return Promise.reject("No user found.");
    }

    return user;
  },

  setAuthHeader(idToken: string): void {
    axios.defaults.headers.common["Authorization"] = `Bearer ${idToken}`;
  },

  removeAuthHeader(): void {
    delete axios.defaults.headers.common["Authorization"];
  },
};

export default AuthManager;

interface DecodedToken {
  exp: number;
}
