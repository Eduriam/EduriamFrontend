import type { AvatarDefinition } from "./Avatar";

/**
 * Default avatar with background and typical layer options.
 * Add body/eyes/expression/hair SVG assets to public/images/avatar/ to see full avatar.
 */
export const defaultAvatar: AvatarDefinition = {
  skinColor: "light",
  eyes: "eyes_1",
  eyeColor: "brown",
  expression: "expression_1",
  hair: "hair_1",
  hairColor: "mediumBrown",
  clothing: "shirt_1",
  backgroundColor: "lightGray",
};

/**
 * Minimal avatar: background color only.
 * Demonstrates fallback when no layer assets exist.
 */
export const minimalAvatar: AvatarDefinition = {
  backgroundColor: "lightGray",
};

/**
 * Full avatar with all layers.
 * Requires all corresponding SVG assets in public/images/avatar/.
 */
export const fullAvatar: AvatarDefinition = {
  skinColor: "lightMedium",
  eyes: "eyes_1",
  eyeColor: "darkBrown",
  expression: "expression_2",
  hair: "hair_2",
  hairColor: "black",
  accessories: "glasses_1",
  glassesColor: "black",
  beard: "beard_1",
  beardColor: "black",
  headwear: "hat_1",
  clothing: "shirt_2",
  backgroundColor: "pastelCyan",
};
