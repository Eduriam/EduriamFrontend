import type { AccountSetupModel } from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import { invalidateCurrentUser } from "infrastructure/services/users/currentUserState";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

export class AccountSetupService {
  static async setupAccount(data: AccountSetupModel): Promise<void> {
    try {
      await usersClient.postApiUsersMeAccountSetup(data);
      await invalidateCurrentUser();
    } catch (error) {
      return toErrorCode(error);
    }
  }
}
