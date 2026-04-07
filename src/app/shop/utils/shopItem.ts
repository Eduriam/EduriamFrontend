import type {
  ShopIllustrationKind,
  ShopItemViewModel,
  UserOwnedShopItemModel,
} from "infrastructure/api/generated/models";
import { ShopImageKind, ShopIllustrationKind as ShopIllustrationKindEnum } from "infrastructure/api/generated/models";

const AVATAR_CATEGORY_ORDER = [
  "hair",
  "eyes",
  "expression",
  "beard",
  "accessories",
  "headwear",
  "clothing",
] as const;

export type ShopCategoryId = (typeof AVATAR_CATEGORY_ORDER)[number] | "streak-freeze";

export const getShopItemCategoryId = (item: ShopItemViewModel): ShopCategoryId | undefined => {
  if (item.image.kind === ShopImageKind.Illustration) {
    return "streak-freeze";
  }

  if (!item.image.avatar) {
    return undefined;
  }

  return AVATAR_CATEGORY_ORDER.find(
    (categoryId) => item.image.avatar?.[categoryId] !== null && item.image.avatar?.[categoryId] !== undefined,
  );
};

export const isShopItemPurchased = (
  item: ShopItemViewModel,
  ownedShopItems: Array<UserOwnedShopItemModel>,
): boolean => ownedShopItems.some((ownedItem) => ownedItem.shopItemId === item.id);

export const toIllustrationName = (
  kind: ShopIllustrationKind | undefined | null,
): "streakFreeze" => {
  switch (kind) {
    case ShopIllustrationKindEnum.StreakFreeze:
    default:
      return "streakFreeze";
  }
};
