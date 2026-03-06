import type { AvatarDefinition } from "components/avatar/Avatar";

export const DEFAULT_SHOP_AVATAR: AvatarDefinition = {
  skinColor: "light",
  eyes: "eyes_1",
  eyeColor: "darkBrown",
  expression: "expression_1",
  hair: "hair_1",
  hairColor: "darkBrown",
  clothing: "shirt_1",
  backgroundColor: "lightGray",
};

export function buildShopAvatar(
  partial?: Partial<AvatarDefinition>,
): AvatarDefinition {
  return {
    ...DEFAULT_SHOP_AVATAR,
    ...(partial ?? {}),
  };
}
