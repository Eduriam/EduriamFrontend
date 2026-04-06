import { getAuth } from "infrastructure/api/generated/auth/auth";
import type {
  ChangePasswordModel,
  ResetPasswordModel,
} from "infrastructure/api/generated/models";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const authClient = getAuth();

export class ResetPasswordService {
  static async resetPassword(data: ResetPasswordModel): Promise<void> {
    try {
      await authClient.postApiAuthResetPassword(data);
    } catch (error) {
      return toErrorCode(error);
    }
  }

  static async confirmResetPassword(data: ChangePasswordModel): Promise<void> {
    try {
      await authClient.postApiAuthResetPasswordConfirm(data);
    } catch (error) {
      return toErrorCode(error);
    }
  }
}
