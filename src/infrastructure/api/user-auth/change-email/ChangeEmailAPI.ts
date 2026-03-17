import API from "infrastructure/api/API";

import { ChangeEmailRequestBody } from "./ChangeEmail";

export interface ChangeEmailParams {}

const ChangeEmailAPI = {
  URI: "user-auth/change-email",

  async changeEmail(data: ChangeEmailRequestBody): Promise<void> {
    return API.post(`${this.URI}`, data);
  },
};

export default ChangeEmailAPI;
