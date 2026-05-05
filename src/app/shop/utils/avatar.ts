import {
  AvatarAccessories,
  AvatarBackgroundColor,
  AvatarBeard,
  AvatarBeardColor,
  AvatarClothing,
  AvatarExpression,
  AvatarEyeColor,
  AvatarEyes,
  AvatarGlassesColor,
  AvatarHair,
  AvatarHairColor,
  AvatarHeadwear,
  type AvatarModel,
  AvatarSkinColor,
} from "infrastructure/api/generated/models";

export const DEFAULT_SHOP_AVATAR: AvatarModel = {
  skinColor: AvatarSkinColor.Light,
  eyes: AvatarEyes.Eyes1,
  eyeColor: AvatarEyeColor.DarkBrown,
  expression: AvatarExpression.Expression1,
  hair: AvatarHair.Hair1,
  hairColor: AvatarHairColor.DarkBrown,
  accessories: AvatarAccessories.None,
  glassesColor: AvatarGlassesColor.Black,
  beard: AvatarBeard.None,
  beardColor: AvatarBeardColor.DarkBrown,
  headwear: AvatarHeadwear.None,
  clothing: AvatarClothing.Shirt1,
  backgroundColor: AvatarBackgroundColor.LightGray,
};

export type NullableAvatarPatch = {
  [K in keyof AvatarModel]?: AvatarModel[K] | null;
};

export function buildShopAvatar(
  partial?: NullableAvatarPatch | null,
): AvatarModel {
  const sanitizedPatch = Object.fromEntries(
    Object.entries(partial ?? {}).filter(([, value]) => value !== null),
  ) as Partial<AvatarModel>;

  return {
    ...DEFAULT_SHOP_AVATAR,
    ...sanitizedPatch,
  };
}
