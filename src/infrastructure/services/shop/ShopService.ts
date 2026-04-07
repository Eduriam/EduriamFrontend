import type { Id } from "domain/models/types/core";
import { Modify } from "domain/models/utils/modify";

import { FetchHook } from "infrastructure/api/API";
import type {
  ShopItemViewModel,
  UserOwnedShopItemModel,
} from "infrastructure/api/generated/models";
import { getShop } from "infrastructure/api/generated/shop/shop";
import { getUsers } from "infrastructure/api/generated/users/users";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const shopClient = getShop();
const usersClient = getUsers();

const useShopItemsQuery = (): Modify<
  FetchHook<Array<ShopItemViewModel>>,
  { shopItems: Array<ShopItemViewModel> }
> => {
  const { data, ...rest } = useAuthenticatedAPI<Array<ShopItemViewModel>>(
    "shop/items",
    async () => ShopService.getShopItems(),
  );
  return { shopItems: data, ...rest };
};

const useOwnedShopItemsQuery = (): Modify<
  FetchHook<Array<UserOwnedShopItemModel>>,
  { ownedShopItems: Array<UserOwnedShopItemModel> }
> => {
  const { data, ...rest } = useAuthenticatedAPI<Array<UserOwnedShopItemModel>>(
    "users/me/shop-items",
    async () => ShopService.getOwnedShopItems(),
  );
  return { ownedShopItems: data, ...rest };
};

export const ShopService = {
  async getShopItems(): Promise<Array<ShopItemViewModel>> {
    try {
      const response = await shopClient.getApiShopItems();
      return response.data ?? [];
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async getOwnedShopItems(): Promise<Array<UserOwnedShopItemModel>> {
    try {
      const response = await usersClient.getApiUsersMeShopItems();
      return response.data ?? [];
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async purchaseShopItem(shopItemId: Id): Promise<void> {
    try {
      await shopClient.postApiShopItemsShopItemIdPurchase(shopItemId);
    } catch (error) {
      return toErrorCode(error);
    }
  },

  useShopItems(): Modify<
    FetchHook<Array<ShopItemViewModel>>,
    { shopItems: Array<ShopItemViewModel> }
  > {
    return useShopItemsQuery();
  },

  useOwnedShopItems(): Modify<
    FetchHook<Array<UserOwnedShopItemModel>>,
    { ownedShopItems: Array<UserOwnedShopItemModel> }
  > {
    return useOwnedShopItemsQuery();
  },
};
