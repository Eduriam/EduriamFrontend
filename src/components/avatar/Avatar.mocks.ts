import type { AvatarDefinition } from "./Avatar";

/**
 * Default avatar with background and typical layer options.
 * Add body/face/hair SVG assets to public/images/avatar/ to see full avatar.
 */
export const defaultAvatar: AvatarDefinition = {
  skinColor: "light",
  face: "face_1",
  hair: "hair_1",
  hairColor: "mediumBrown",
  clothing: "shirt_1",
  clothingColor: "blue",
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
  face: "face_1",
  eyeColor: "darkBrown",
  hair: "hair_2",
  hairColor: "black",
  accessories: "glasses_1",
  glassesColor: "black",
  beard: "beard_1",
  beardColor: "black",
  headwear: "hat_1",
  clothing: "shirt_2",
  clothingColor: "gray",
  backgroundColor: "pastelCyan",
};
