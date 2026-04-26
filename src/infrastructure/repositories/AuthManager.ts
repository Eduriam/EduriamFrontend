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

  async refreshIdToken(): Promise<boolean> {
    const refreshToken = LocalStorageManager.getItem<string>("refreshToken");

    if (refreshToken === null) {
      // Refresh token doesn't exist, user needs to sign in again
      this.signout();
      return false;
    }

    try {
      const res = await RefreshTokenService.refreshIdToken({
        refreshToken,
      });
      this.setAuthHeader(res.accessToken);
      LocalStorageManager.setItem<string>("idToken", res.accessToken);
      LocalStorageManager.setItem<string>("refreshToken", res.refreshToken);
      return true;
    } catch {
      // Refresh token is expired, user needs to sign in again
      this.signout();
      return false;
    }
  },

  async ensureValidSession(): Promise<boolean> {
    const token = LocalStorageManager.getItem<string>("idToken");

    if (!token) {
      this.signout();
      return false;
    }

    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      // If Id token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        return this.refreshIdToken();
      }
    } catch {
      // Some environments (e.g. test fixtures) use opaque tokens without exp claims. In that case we still attach the token and let API responses drive auth validity.
    }

    this.setAuthHeader(token);
    return true;
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
