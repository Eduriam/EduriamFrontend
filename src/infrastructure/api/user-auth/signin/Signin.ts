import { UserPrivate } from "infrastructure/api/users/me/User";

export interface SigninRequestBody {
  email: string;
  password: string;
}

export interface SigninResponseBody {
  idToken: string;
  refreshToken: string;
  user: UserPrivate;
}
