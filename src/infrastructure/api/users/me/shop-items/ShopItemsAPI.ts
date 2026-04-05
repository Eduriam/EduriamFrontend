import type { Id } from "domain/models/types/core";
import { Modify } from "domain/models/utils/modify";

import API, { FetchHook } from "infrastructure/api/API";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";

import { ShopItem } from "./ShopItems";

const ShopItemsAPI = {
  URI: "users/me/shop-items",

  useShopItems(): Modify<
    FetchHook<Array<ShopItem>>,
    { shopItems: Array<ShopItem> }
  > {
    const { data, ...rest } = useAuthenticatedAPI<Array<ShopItem>>(this.URI);
    return { shopItems: data, ...rest };
  },

  async patchShopItem(
    shopItemId: Id,
    payload: { bought: boolean },
  ): Promise<ShopItem | void> {
    return API.patch(`${this.URI}/${shopItemId}`, payload);
  },
};

export default ShopItemsAPI;



