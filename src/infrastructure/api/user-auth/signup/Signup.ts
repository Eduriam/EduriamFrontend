import { UserPrivate } from "infrastructure/api/users/me/User";

export interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
}

export interface SignupResponseBody {
  idToken: Id;
  refreshToken: Id;
  user: UserPrivate;
}
