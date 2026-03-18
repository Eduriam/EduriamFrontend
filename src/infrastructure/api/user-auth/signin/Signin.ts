import { UserPrivate } from "infrastructure/api/users/me/User";

export interface SigninRequestBody {
  email: string;
  password: string;
}

export interface SigninResponseBody {
  idToken: Id;
  refreshToken: Id;
  user: UserPrivate;
}
