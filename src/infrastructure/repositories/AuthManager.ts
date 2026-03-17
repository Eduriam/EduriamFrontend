import axios from "axios";
import jwtDecode from "jwt-decode";

import { GoogleCodeExchangeRequestBody } from "infrastructure/api/external-auth/ExternalAuth";
import ExternalAuthAPI from "infrastructure/api/external-auth/ExternalAuthAPI";
import { LoginRequestBody } from "infrastructure/api/user-auth/login/Login";
import LoginAPI from "infrastructure/api/user-auth/login/LoginAPI";
import RefreshTokenAPI from "infrastructure/api/user-auth/refresh-token/RefreshTokenAPI";
import { SignupRequestBody } from "infrastructure/api/user-auth/signup/Signup";
import SignupAPI from "infrastructure/api/user-auth/signup/SignupAPI";

import { UserPrivate } from "../api/users/me/User";
import { LocalStorageManager } from "./LocalStorageManager";

const AuthManager = {
  hasIdToken(): boolean {
    return Boolean(LocalStorageManager.getItem<string>("idToken"));
  },

  logout(): void {
    this.removeAuthHeader();
    LocalStorageManager.removeItem("idToken");
    LocalStorageManager.removeItem("refreshToken");
    LocalStorageManager.removeItem("user");
  },

  async login(data: LoginRequestBody): Promise<UserPrivate> {
    return LoginAPI.login(data);
  },

  async signUp(data: SignupRequestBody): Promise<UserPrivate> {
    return SignupAPI.signUp(data);
  },

  async getGoogleAuthorizationUrl(): Promise<string> {
    return ExternalAuthAPI.getGoogleAuthorizationUrl();
  },

  async authorizeGoogleCode(
    data: GoogleCodeExchangeRequestBody,
  ): Promise<UserPrivate> {
    return ExternalAuthAPI.authorizeCode(data);
  },

  async refreshIdToken(): Promise<void> {
    const refreshToken = LocalStorageManager.getItem<string>("refreshToken");

    if (refreshToken === null) {
      // Refresh token doesn't exist, user needs to log in again
      this.logout();
      return;
    }

    return RefreshTokenAPI.refreshIdToken({
      token: refreshToken,
    })
      .then((res) => {
        this.setAuthHeader(res.idToken);
        LocalStorageManager.setItem<string>("idToken", res.idToken);
        LocalStorageManager.setItem<string>("refreshToken", res.refreshToken);
      })
      .catch(() => {
        // Refresh token is expired, user needs to log in again
        this.logout();
      });
  },

  async getCurrentUser(): Promise<UserPrivate> {
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
      this.logout();
    }

    let user = LocalStorageManager.getItem<UserPrivate>("user");
    if (user === null) {
      return Promise.reject("No user found.");
    } else {
      const studyMapLevel = LocalStorageManager.getItem<number>(
        "lastViewedStudyMapLevel",
      );
      if (studyMapLevel !== null) {
        user = { ...user, lastViewedStudyMapLevel: studyMapLevel };
      }

      return user;
    }
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
