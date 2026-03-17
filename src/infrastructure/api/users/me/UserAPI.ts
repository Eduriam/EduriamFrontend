import API from "infrastructure/api/API";

import { UserPrivate } from "./User";

export interface UserParams {}

const UserAPI = {
  URI: "users/me",

  async getUser(): Promise<UserPrivate> {
    return API.get(`${this.URI}`);
  },
};

export default UserAPI;
