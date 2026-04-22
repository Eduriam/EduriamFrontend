"use client";

import Box from "@mui/material/Box";

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

import type {
  BackgroundColorKey,
  BeardColorKey,
  EyeColorKey,
  GlassesColorKey,
  HairColorKey,
  SkinColorKey,
} from "./avatarColors";
import {
  backgroundColors,
  beardColors,
  eyeColors,
  glassesColors,
  hairColors,
  skinColors,
} from "./avatarColors";

/**
 * Avatar layer option keys.
 * Shape/variant options (one SVG per option).
 */
export type EyesKey = "eyes_1" | "eyes_2";
export type ExpressionKey = "expression_1" | "expression_2";
export type HairKey = "hair_1" | "hair_2" | "none";
export type AccessoriesKey = "glasses_1" | "none";
export type BeardKey = "beard_1" | "beard_2" | "none";
export type HeadwearKey = "hat_1" | "hat_2" | "none";
export type ClothingKey = "shirt_1" | "shirt_2";

export type AvatarDefinition = AvatarModel;

export interface AvatarProps {
  definition: AvatarDefinition;
  size?: number | "small" | "medium" | "large";
  alt?: string;
}

const sizeToPixels: Record<string, number> = {
  small: 40,
  medium: 64,
  large: 96,
};

const AVATAR_BASE = "/images/avatar";

const skinColorMap: Record<number, SkinColorKey> = {
  [AvatarSkinColor.Light]: "light",
  [AvatarSkinColor.Fair]: "fair",
  [AvatarSkinColor.LightMedium]: "lightMedium",
  [AvatarSkinColor.Medium]: "medium",
  [AvatarSkinColor.Olive]: "olive",
  [AvatarSkinColor.Dark]: "dark",
  [AvatarSkinColor.DeepDark]: "deepDark",
};

const eyesMap: Record<number, EyesKey> = {
  [AvatarEyes.Eyes1]: "eyes_1",
  [AvatarEyes.Eyes2]: "eyes_2",
};

const eyeColorMap: Record<number, EyeColorKey> = {
  [AvatarEyeColor.DarkBrown]: "darkBrown",
  [AvatarEyeColor.Brown]: "brown",
  [AvatarEyeColor.Blue]: "blue",
  [AvatarEyeColor.Green]: "green",
  [AvatarEyeColor.Hazel]: "hazel",
  [AvatarEyeColor.White]: "white",
};

const expressionMap: Record<number, ExpressionKey> = {
  [AvatarExpression.Expression1]: "expression_1",
  [AvatarExpression.Expression2]: "expression_2",
};

const hairMap: Record<number, HairKey> = {
  [AvatarHair.Hair1]: "hair_1",
  [AvatarHair.Hair2]: "hair_2",
  [AvatarHair.None]: "none",
};

const hairColorMap: Record<number, HairColorKey> = {
  [AvatarHairColor.Black]: "black",
  [AvatarHairColor.DarkBrown]: "darkBrown",
  [AvatarHairColor.MediumBrown]: "mediumBrown",
  [AvatarHairColor.LightBrown]: "lightBrown",
  [AvatarHairColor.Blond]: "blond",
  [AvatarHairColor.Gray]: "gray",
  [AvatarHairColor.White]: "white",
  [AvatarHairColor.Red]: "red",
};

const accessoriesMap: Record<number, AccessoriesKey> = {
  [AvatarAccessories.Glasses1]: "glasses_1",
  [AvatarAccessories.None]: "none",
};

const glassesColorMap: Record<number, GlassesColorKey> = {
  [AvatarGlassesColor.Black]: "black",
  [AvatarGlassesColor.DarkGray]: "darkGray",
  [AvatarGlassesColor.Brown]: "brown",
  [AvatarGlassesColor.Navy]: "navy",
};

const beardMap: Record<number, BeardKey> = {
  [AvatarBeard.Beard1]: "beard_1",
  [AvatarBeard.Beard2]: "beard_2",
  [AvatarBeard.None]: "none",
};

const beardColorMap: Record<number, BeardColorKey> = {
  [AvatarBeardColor.Black]: "black",
  [AvatarBeardColor.DarkBrown]: "darkBrown",
  [AvatarBeardColor.MediumBrown]: "mediumBrown",
  [AvatarBeardColor.Blond]: "blond",
  [AvatarBeardColor.Gray]: "gray",
  [AvatarBeardColor.White]: "white",
};

const headwearMap: Record<number, HeadwearKey> = {
  [AvatarHeadwear.Hat1]: "hat_1",
  [AvatarHeadwear.Hat2]: "hat_2",
  [AvatarHeadwear.None]: "none",
};

const clothingMap: Record<number, ClothingKey> = {
  [AvatarClothing.Shirt1]: "shirt_1",
  [AvatarClothing.Shirt2]: "shirt_2",
};

const backgroundColorMap: Record<number, BackgroundColorKey> = {
  [AvatarBackgroundColor.LightGray]: "lightGray",
  [AvatarBackgroundColor.PastelCyan]: "pastelCyan",
  [AvatarBackgroundColor.PastelOrange]: "pastelOrange",
  [AvatarBackgroundColor.PastelPurple]: "pastelPurple",
  [AvatarBackgroundColor.PastelGreen]: "pastelGreen",
  [AvatarBackgroundColor.PastelPeach]: "pastelPeach",
};

function toMappedValue<T extends string>(
  value: unknown,
  map: Record<number, T>,
): T | undefined {
  if (typeof value === "number") {
    return map[value];
  }

  // Keep compatibility with legacy string payloads while model migration is ongoing.
  if (typeof value === "string") {
    return value as T;
  }

  return undefined;
}

function getLayerPath(layerName: string, option: string): string {
  if (option === "none") {
    return "";
  }
  return `${AVATAR_BASE}/${layerName}/${option}.svg`;
}

/**
 * Renders an SVG layer with an optional dynamic color.
 * For colorable layers: uses CSS mask + background-color so one SVG serves all color variants.
 */
function AvatarLayer({
  src,
  color,
  size,
  alt = "",
}: {
  src: string;
  color?: string;
  size: number;
  alt?: string;
}) {
  if (!src) {
    return null;
  }

  if (color) {
    return (
      <Box
        component="span"
        aria-hidden
        sx={{
          display: "block",
          width: size,
          height: size,
          backgroundColor: color,
          maskImage: `url(${src})`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskImage: `url(${src})`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
        }}
      />
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        display: "block",
        width: size,
        height: size,
        objectFit: "contain",
      }}
    />
  );
}

const Avatar: React.FC<AvatarProps> = ({
  definition,
  size = "medium",
  alt = "User avatar",
}) => {
  const pixels = typeof size === "number" ? size : (sizeToPixels[size] ?? 64);

  const backgroundColor = toMappedValue(
    definition.backgroundColor,
    backgroundColorMap,
  );
  const skinColor = toMappedValue(definition.skinColor, skinColorMap);
  const eyes = toMappedValue(definition.eyes, eyesMap);
  const eyeColor = toMappedValue(definition.eyeColor, eyeColorMap);
  const expression = toMappedValue(definition.expression, expressionMap);
  const hair = toMappedValue(definition.hair, hairMap);
  const hairColor = toMappedValue(definition.hairColor, hairColorMap);
  const accessories = toMappedValue(definition.accessories, accessoriesMap);
  const glassesColor = toMappedValue(definition.glassesColor, glassesColorMap);
  const beard = toMappedValue(definition.beard, beardMap);
  const beardColor = toMappedValue(definition.beardColor, beardColorMap);
  const headwear = toMappedValue(definition.headwear, headwearMap);
  const clothing = toMappedValue(definition.clothing, clothingMap);

  const bgColor = backgroundColor
    ? backgroundColors[backgroundColor]
    : undefined;

  const layers: Array<{
    path: string;
    color?: string;
    key: string;
  }> = [];

  // 1. Background
  if (bgColor) {
    layers.push({
      path: `${AVATAR_BASE}/background/default.svg`,
      color: bgColor,
      key: "background",
    });
  }

  // 2. Hair back (behind body)
  if (hair && hair !== "none") {
    const hairBackPath = getLayerPath("hair_back", hair);
    if (hairBackPath) {
      layers.push({
        path: hairBackPath,
        color: hairColor ? hairColors[hairColor] : undefined,
        key: "hair_back",
      });
    }
  }

  // 3. Body
  if (skinColor) {
    const path = getLayerPath("body", "default");
    if (path) {
      layers.push({
        path,
        color: skinColors[skinColor],
        key: "body",
      });
    }
  }

  // 4. Eyes
  if (eyes) {
    const path = getLayerPath("eyes", eyes);
    if (path) {
      layers.push({
        path,
        color: eyeColor ? eyeColors[eyeColor] : undefined,
        key: "eyes",
      });
    }
  }

  // 5. Expression
  if (expression) {
    const path = getLayerPath("expression", expression);
    if (path) {
      layers.push({ path, key: "expression" });
    }
  }

  // 6. Accessories (glasses)
  if (accessories && accessories !== "none") {
    const path = getLayerPath("accessories", accessories);
    if (path) {
      layers.push({
        path,
        color: glassesColor ? glassesColors[glassesColor] : undefined,
        key: "accessories",
      });
    }
  }

  // 7. Beard
  if (beard && beard !== "none") {
    const path = getLayerPath("beard", beard);
    if (path) {
      layers.push({
        path,
        color: beardColor ? beardColors[beardColor] : undefined,
        key: "beard",
      });
    }
  }

  // 8. Hair front (in front of beard, before headwear)
  if (hair && hair !== "none") {
    const hairFrontPath = getLayerPath("hair_front", hair);
    if (hairFrontPath) {
      layers.push({
        path: hairFrontPath,
        color: hairColor ? hairColors[hairColor] : undefined,
        key: "hair_front",
      });
    }
  }

  // 9. Headwear
  if (headwear && headwear !== "none") {
    const path = getLayerPath("headwear", headwear);
    if (path) {
      layers.push({ path, key: "headwear" });
    }
  }

  // 10. Clothing
  if (clothing) {
    const path = getLayerPath("clothing", clothing);
    if (path) {
      layers.push({ path, key: "clothing" });
    }
  }

  const filteredLayers = layers.filter((l) => l.path);

  if (filteredLayers.length === 0) {
    return (
      <Box
        sx={{
          width: pixels,
          height: pixels,
          borderRadius: "50%",
          bgcolor: "action.disabledBackground",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label={alt}
      />
    );
  }

  return (
    <Box
      component="figure"
      sx={{
        position: "relative",
        width: pixels,
        height: pixels,
        margin: 0,
        borderRadius: "50%",
        overflow: "hidden",
      }}
      aria-label={alt}
    >
      {filteredLayers.map((layer) => (
        <Box
          key={layer.key}
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AvatarLayer src={layer.path} color={layer.color} size={pixels} />
        </Box>
      ))}
    </Box>
  );
};

export default Avatar;
