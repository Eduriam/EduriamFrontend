export interface RefreshTokenRequestBody {
  token: string;
}

export interface RefreshTokenResponseBody {
  refreshToken: string;
  idToken: string;
}
