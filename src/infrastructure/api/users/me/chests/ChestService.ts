import type { Id } from "domain/models/types/core";

import { getUsers } from "infrastructure/api/generated/users/users";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

const ChestService = {
  async openChest(userChestId: Id, doubleReward = false): Promise<void> {
    try {
      if (doubleReward) {
        await usersClient.putApiUsersMeUserChestsUserChestIdDouble(userChestId);
        return;
      }

      await usersClient.postApiUsersMeUserChestsUserChestIdOpen(userChestId);
    } catch (error) {
      return toErrorCode(error);
    }
  },
};

export default ChestService;
