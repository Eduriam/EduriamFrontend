import API from "infrastructure/api/API";

import type { OpenChestPayload } from "./Chests";

const ChestsAPI = {
  URI: "users/me/chests",

  async openChest(
    chestId: Id,
    payload: OpenChestPayload,
  ): Promise<void> {
    return API.patch(`${this.URI}/${chestId}`, payload);
  },
};

export default ChestsAPI;
