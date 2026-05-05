import type { AvatarDefinition } from "./Avatar";
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
  AvatarSkinColor,
} from "infrastructure/api/generated/models";

/**
 * Default avatar with background and typical layer options.
 * Add body/eyes/expression/hair SVG assets to public/images/avatar/ to see full avatar.
 */
export const defaultAvatar: AvatarDefinition = {
  skinColor: AvatarSkinColor.Light,
  eyes: AvatarEyes.Eyes1,
  eyeColor: AvatarEyeColor.Brown,
  expression: AvatarExpression.Expression1,
  hair: AvatarHair.Hair1,
  hairColor: AvatarHairColor.MediumBrown,
  accessories: AvatarAccessories.None,
  glassesColor: AvatarGlassesColor.Black,
  beard: AvatarBeard.None,
  beardColor: AvatarBeardColor.Black,
  headwear: AvatarHeadwear.None,
  clothing: AvatarClothing.Shirt1,
  backgroundColor: AvatarBackgroundColor.LightGray,
};

/**
 * Minimal avatar: background color only.
 * Demonstrates fallback when no layer assets exist.
 */
export const minimalAvatar: AvatarDefinition = {
  skinColor: AvatarSkinColor.Light,
  eyes: AvatarEyes.Eyes1,
  eyeColor: AvatarEyeColor.Brown,
  expression: AvatarExpression.Expression1,
  hair: AvatarHair.None,
  hairColor: AvatarHairColor.Black,
  accessories: AvatarAccessories.None,
  glassesColor: AvatarGlassesColor.Black,
  beard: AvatarBeard.None,
  beardColor: AvatarBeardColor.Black,
  headwear: AvatarHeadwear.None,
  clothing: AvatarClothing.Shirt1,
  backgroundColor: AvatarBackgroundColor.LightGray,
};

/**
 * Full avatar with all layers.
 * Requires all corresponding SVG assets in public/images/avatar/.
 */
export const fullAvatar: AvatarDefinition = {
  skinColor: AvatarSkinColor.LightMedium,
  eyes: AvatarEyes.Eyes1,
  eyeColor: AvatarEyeColor.DarkBrown,
  expression: AvatarExpression.Expression2,
  hair: AvatarHair.Hair2,
  hairColor: AvatarHairColor.Black,
  accessories: AvatarAccessories.Glasses1,
  glassesColor: AvatarGlassesColor.Black,
  beard: AvatarBeard.Beard1,
  beardColor: AvatarBeardColor.Black,
  headwear: AvatarHeadwear.Hat1,
  clothing: AvatarClothing.Shirt2,
  backgroundColor: AvatarBackgroundColor.PastelCyan,
};
