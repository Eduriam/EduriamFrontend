import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { ShopItem } from "./ShopItems";

export interface ShopItemParams {
  categoryId?: Id;
}

const ShopItemsAPI = {
  URI: "user/shop-items",

  useShopItems(
    params: ShopItemParams,
  ): Modify<FetchHook<Array<ShopItem>>, { shopItems: Array<ShopItem> }> {
    const { data, ...rest } = useAPI<Array<ShopItem>>(
      `${this.URI}?${parseQueryParams(params)}`,
    );
    return { shopItems: data, ...rest };
  },

  async equipItem(shopItemId: Id): Promise<void> {
    return API.put(`${this.URI}/${shopItemId}/equip`, {});
  },

  async unequipItem(shopItemId: Id): Promise<void> {
    return API.delete(`${this.URI}/${shopItemId}/equip`);
  },

  async buyItem(shopItemId: Id): Promise<void> {
    return API.put(`${this.URI}/${shopItemId}/buy`, {});
  },
};

export default ShopItemsAPI;
