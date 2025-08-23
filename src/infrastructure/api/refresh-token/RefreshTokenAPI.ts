import API from "infrastructure/api/API";

import {
  RefreshTokenRequestBody,
  RefreshTokenResponseBody,
} from "./RefreshToken";

export interface RefreshTokenParams {}

const RefreshTokenAPI = {
  URI: "refresh-token",

  async refreshIdToken(
    data: RefreshTokenRequestBody,
  ): Promise<RefreshTokenResponseBody> {
    return API.post(`${this.URI}`, data);
  },
};

export default RefreshTokenAPI;
