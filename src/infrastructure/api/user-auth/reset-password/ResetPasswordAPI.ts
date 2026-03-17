import API from "infrastructure/api/API";

import { ResetPasswordRequestBody } from "./ResetPassword";

export interface ResetPasswordParams {}

const ResetPasswordAPI = {
  URI: "user-auth/reset-password",

  async resetPassword(data: ResetPasswordRequestBody): Promise<void> {
    return API.post(`${this.URI}`, data);
  },
};

export default ResetPasswordAPI;
