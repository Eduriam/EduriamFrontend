import { getAuth } from "infrastructure/api/generated/auth/auth";
import type {
  ChangeEmailConfirmModel,
  ChangeEmailModel,
} from "infrastructure/api/generated/models";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const authClient = getAuth();

export class ChangeEmailService {
  static async changeEmail(data: ChangeEmailModel): Promise<void> {
    try {
      await authClient.postApiAuthChangeEmail(data);
    } catch (error) {
      return toErrorCode(error);
    }
  }

  static async confirmEmailChange(data: ChangeEmailConfirmModel): Promise<void> {
    try {
      await authClient.postApiAuthChangeEmailConfirm(data);
    } catch (error) {
      return toErrorCode(error);
    }
  }
}
