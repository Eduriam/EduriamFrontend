import type { NullableAvatarPatch } from "app/shop/utils/avatar";

import {
  AvatarAccessories,
  AvatarBeard,
  AvatarClothing,
  AvatarExpression,
  AvatarEyeColor,
  AvatarEyes,
  AvatarGlassesColor,
  AvatarHair,
  AvatarHairColor,
  AvatarHeadwear,
} from "infrastructure/api/generated/models";

export interface ShopCategoryConfig {
  id: string;
  nameKey: string;
  previewAvatar: NullableAvatarPatch;
}

export const shopCategories: ShopCategoryConfig[] = [
  {
    id: "hair",
    nameKey: "avatar.categories.hair",
    previewAvatar: {
      hair: AvatarHair.Hair2,
      hairColor: AvatarHairColor.Red,
    },
  },
  {
    id: "eyes",
    nameKey: "avatar.categories.eyes",
    previewAvatar: {
      eyes: AvatarEyes.Eyes2,
      eyeColor: AvatarEyeColor.Blue,
    },
  },
  {
    id: "expression",
    nameKey: "avatar.categories.expression",
    previewAvatar: {
      expression: AvatarExpression.Expression2,
    },
  },
  {
    id: "beard",
    nameKey: "avatar.categories.beard",
    previewAvatar: {
      beard: AvatarBeard.Beard2,
    },
  },
  {
    id: "accessories",
    nameKey: "avatar.categories.accessories",
    previewAvatar: {
      accessories: AvatarAccessories.Glasses1,
      glassesColor: AvatarGlassesColor.Navy,
    },
  },
  {
    id: "headwear",
    nameKey: "avatar.categories.headwear",
    previewAvatar: {
      headwear: AvatarHeadwear.Hat2,
    },
  },
  {
    id: "clothing",
    nameKey: "avatar.categories.clothing",
    previewAvatar: {
      clothing: AvatarClothing.Shirt2,
    },
  },
];

export const DEFAULT_SHOP_CATEGORY_ID = shopCategories[0].id;
