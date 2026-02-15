/**
 * Avatar color palette.
 * Maps semantic color keys to CSS color values.
 * Used to apply colors dynamically to avatar layers (hair, skin, clothing, etc.)
 * without needing separate SVG files per color variant.
 */

export type SkinColorKey =
  | "light"
  | "fair"
  | "lightMedium"
  | "medium"
  | "olive"
  | "dark"
  | "deepDark";
export type HairColorKey =
  | "black"
  | "darkBrown"
  | "mediumBrown"
  | "lightBrown"
  | "blond"
  | "gray"
  | "white"
  | "red";
export type EyeColorKey =
  | "darkBrown"
  | "brown"
  | "blue"
  | "green"
  | "hazel"
  | "white";
export type ClothingColorKey =
  | "blue"
  | "orange"
  | "purple"
  | "yellow"
  | "green"
  | "gray"
  | "red";
export type BeardColorKey =
  | "black"
  | "darkBrown"
  | "mediumBrown"
  | "blond"
  | "gray"
  | "white";
export type GlassesColorKey = "black" | "darkGray" | "brown" | "navy";
export type HeadwearColorKey =
  | "red"
  | "blue"
  | "yellow"
  | "purple"
  | "green"
  | "brown";
export type BackgroundColorKey =
  | "lightGray"
  | "pastelCyan"
  | "pastelOrange"
  | "pastelPurple"
  | "pastelGreen"
  | "pastelPeach";

export const skinColors: Record<SkinColorKey, string> = {
  light: "#FFDFC4",
  fair: "#F0D5BE",
  lightMedium: "#E1B899",
  medium: "#D1A17C",
  olive: "#B97C60",
  dark: "#8D5524",
  deepDark: "#5C3A21",
};

export const hairColors: Record<HairColorKey, string> = {
  black: "#000000",
  darkBrown: "#4B3621",
  mediumBrown: "#A55728",
  lightBrown: "#D6A77A",
  blond: "#FFD700",
  gray: "#9E9E9E",
  white: "#FFFFFF",
  red: "#FF4500",
};

export const eyeColors: Record<EyeColorKey, string> = {
  darkBrown: "#3B3B3B",
  brown: "#6B4423",
  blue: "#1F75FE",
  green: "#00A86B",
  hazel: "#A52A2A",
  white: "#FFFFFF",
};

export const clothingColors: Record<ClothingColorKey, string> = {
  blue: "#2E86AB",
  orange: "#F26B38",
  purple: "#6A0572",
  yellow: "#FFCB77",
  green: "#4CAF50",
  gray: "#9E9E9E",
  red: "#E53935",
};

export const beardColors: Record<BeardColorKey, string> = {
  black: "#000000",
  darkBrown: "#4B3621",
  mediumBrown: "#A55728",
  blond: "#FFD700",
  gray: "#9E9E9E",
  white: "#FFFFFF",
};

export const glassesColors: Record<GlassesColorKey, string> = {
  black: "#000000",
  darkGray: "#4B4B4B",
  brown: "#3E2723",
  navy: "#1A237E",
};

export const headwearColors: Record<HeadwearColorKey, string> = {
  red: "#E53935",
  blue: "#3949AB",
  yellow: "#FDD835",
  purple: "#8E24AA",
  green: "#43A047",
  brown: "#6D4C41",
};

export const backgroundColors: Record<BackgroundColorKey, string> = {
  lightGray: "#F5F5F5",
  pastelCyan: "#E0F7FA",
  pastelOrange: "#FFF3E0",
  pastelPurple: "#F3E5F5",
  pastelGreen: "#E8F5E9",
  pastelPeach: "#FFE0B2",
};

/** Resolve a color key to a CSS value for a given palette */
export function getColor<K extends string>(
  palette: Record<K, string>,
  key: K | undefined
): string | undefined {
  if (key === undefined || key === null) {
    return undefined;
  }
  return palette[key];
}
