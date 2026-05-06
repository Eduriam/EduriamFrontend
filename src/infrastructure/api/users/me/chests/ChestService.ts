import type { Id } from "domain/models/types/core";

import { getUsers } from "infrastructure/api/generated/users/users";
import { invalidateCurrentUser } from "infrastructure/services/users/currentUserState";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

const ChestService = {
  async openChest(userChestId: Id, doubleReward = false): Promise<void> {
    try {
      await usersClient.postApiUsersMeUserChestsUserChestIdOpen(userChestId);

      if (doubleReward) {
        await usersClient.putApiUsersMeUserChestsUserChestIdDouble(userChestId);
      }

      await invalidateCurrentUser();
    } catch (error) {
      return toErrorCode(error);
    }
  },
};

export default ChestService;
