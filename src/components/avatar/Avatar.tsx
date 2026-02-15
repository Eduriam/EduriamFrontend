"use client";

import Box from "@mui/material/Box";

import type {
  BackgroundColorKey,
  BeardColorKey,
  ClothingColorKey,
  EyeColorKey,
  GlassesColorKey,
  HairColorKey,
  HeadwearColorKey,
  SkinColorKey,
} from "./avatarColors";
import {
  backgroundColors,
  beardColors,
  clothingColors,
  eyeColors,
  glassesColors,
  hairColors,
  headwearColors,
  skinColors,
} from "./avatarColors";

/**
 * Avatar layer option keys.
 * Shape/variant options (one SVG per option).
 */
export type FaceKey = "face_1" | "face_2";
export type HairKey = "hair_1" | "hair_2" | "none";
export type AccessoriesKey = "glasses_1" | "none";
export type BeardKey = "beard_1" | "beard_2" | "none";
export type HeadwearKey = "hat_1" | "hat_2" | "none";
export type ClothingKey = "shirt_1" | "shirt_2";

/**
 * Full avatar definition.
 * Each layer can be optionally set; missing layers are omitted from rendering.
 */
export interface AvatarDefinition {
  skinColor?: SkinColorKey;
  face?: FaceKey;
  eyeColor?: EyeColorKey;
  hair?: HairKey;
  hairColor?: HairColorKey;
  accessories?: AccessoriesKey;
  glassesColor?: GlassesColorKey;
  beard?: BeardKey;
  beardColor?: BeardColorKey;
  headwear?: HeadwearKey;
  headwearColor?: HeadwearColorKey;
  clothing?: ClothingKey;
  clothingColor?: ClothingColorKey;
  backgroundColor?: BackgroundColorKey;
}

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

  const bgColor = definition.backgroundColor
    ? backgroundColors[definition.backgroundColor]
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
  if (definition.hair && definition.hair !== "none") {
    const hairBackPath = getLayerPath("hair_back", definition.hair);
    if (hairBackPath) {
      layers.push({
        path: hairBackPath,
        color: definition.hairColor
          ? hairColors[definition.hairColor]
          : undefined,
        key: "hair_back",
      });
    }
  }

  // 3. Body
  if (definition.skinColor) {
    const path = getLayerPath("body", "default");
    if (path) {
      layers.push({
        path,
        color: definition.skinColor
          ? skinColors[definition.skinColor]
          : undefined,
        key: "body",
      });
    }
  }

  // 4. Face
  if (definition.face) {
    const path = getLayerPath("face", definition.face);
    if (path) {
      layers.push({
        path,
        color: definition.eyeColor ? eyeColors[definition.eyeColor] : undefined,
        key: "face",
      });
    }
  }

  // 5. Eyes (if we have a separate eyes layer)
  // Eye color could be applied to face or a separate layer - depends on asset structure

  // 6. Accessories (glasses)
  if (definition.accessories && definition.accessories !== "none") {
    const path = getLayerPath("accessories", definition.accessories);
    if (path) {
      layers.push({
        path,
        color: definition.glassesColor
          ? glassesColors[definition.glassesColor]
          : undefined,
        key: "accessories",
      });
    }
  }

  // 7. Beard
  if (definition.beard && definition.beard !== "none") {
    const path = getLayerPath("beard", definition.beard);
    if (path) {
      layers.push({
        path,
        color: definition.beardColor
          ? beardColors[definition.beardColor]
          : undefined,
        key: "beard",
      });
    }
  }

  // 8. Hair front (in front of beard, before headwear)
  if (definition.hair && definition.hair !== "none") {
    const hairFrontPath = getLayerPath("hair_front", definition.hair);
    if (hairFrontPath) {
      layers.push({
        path: hairFrontPath,
        color: definition.hairColor
          ? hairColors[definition.hairColor]
          : undefined,
        key: "hair_front",
      });
    }
  }

  // 9. Headwear
  if (definition.headwear && definition.headwear !== "none") {
    const path = getLayerPath("headwear", definition.headwear);
    if (path) {
      layers.push({
        path,
        color: definition.headwearColor
          ? headwearColors[definition.headwearColor]
          : undefined,
        key: "headwear",
      });
    }
  }

  // 10. Clothing
  if (definition.clothing) {
    const path = getLayerPath("clothing", definition.clothing);
    if (path) {
      layers.push({
        path,
        color: definition.clothingColor
          ? clothingColors[definition.clothingColor]
          : undefined,
        key: "clothing",
      });
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
