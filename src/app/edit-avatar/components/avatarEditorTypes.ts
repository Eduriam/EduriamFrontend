import type { AvatarDefinition } from "components/avatar/Avatar";
import {
  backgroundColors,
  beardColors,
  eyeColors,
  glassesColors,
  hairColors,
  skinColors,
} from "components/avatar/avatarColors";

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
import type { ShopItem } from "infrastructure/api/users/me/shop-items/ShopItems";

export type AvatarEditableField = keyof AvatarDefinition;

export interface AvatarEditorCategoryConfig {
  id: string;
  labelKey: string;
  itemField: AvatarEditableField;
  colorField?: AvatarEditableField;
}

export interface AvatarCategory {
  id: string;
  labelKey: string;
  itemField: AvatarEditableField;
  colorField?: AvatarEditableField;
  itemValues: number[];
  colorValues: number[];
}

export const COLOR_FIELD_PALETTE: Partial<
  Record<AvatarEditableField, Record<number, string>>
> = {
  skinColor: {
    [AvatarSkinColor.Light]: skinColors.light,
    [AvatarSkinColor.Fair]: skinColors.fair,
    [AvatarSkinColor.LightMedium]: skinColors.lightMedium,
    [AvatarSkinColor.Medium]: skinColors.medium,
    [AvatarSkinColor.Olive]: skinColors.olive,
    [AvatarSkinColor.Dark]: skinColors.dark,
    [AvatarSkinColor.DeepDark]: skinColors.deepDark,
  },
  eyeColor: {
    [AvatarEyeColor.DarkBrown]: eyeColors.darkBrown,
    [AvatarEyeColor.Brown]: eyeColors.brown,
    [AvatarEyeColor.Blue]: eyeColors.blue,
    [AvatarEyeColor.Green]: eyeColors.green,
    [AvatarEyeColor.Hazel]: eyeColors.hazel,
    [AvatarEyeColor.White]: eyeColors.white,
  },
  hairColor: {
    [AvatarHairColor.Black]: hairColors.black,
    [AvatarHairColor.DarkBrown]: hairColors.darkBrown,
    [AvatarHairColor.MediumBrown]: hairColors.mediumBrown,
    [AvatarHairColor.LightBrown]: hairColors.lightBrown,
    [AvatarHairColor.Blond]: hairColors.blond,
    [AvatarHairColor.Gray]: hairColors.gray,
    [AvatarHairColor.White]: hairColors.white,
    [AvatarHairColor.Red]: hairColors.red,
  },
  beardColor: {
    [AvatarBeardColor.Black]: beardColors.black,
    [AvatarBeardColor.DarkBrown]: beardColors.darkBrown,
    [AvatarBeardColor.MediumBrown]: beardColors.mediumBrown,
    [AvatarBeardColor.Blond]: beardColors.blond,
    [AvatarBeardColor.Gray]: beardColors.gray,
    [AvatarBeardColor.White]: beardColors.white,
  },
  glassesColor: {
    [AvatarGlassesColor.Black]: glassesColors.black,
    [AvatarGlassesColor.DarkGray]: glassesColors.darkGray,
    [AvatarGlassesColor.Brown]: glassesColors.brown,
    [AvatarGlassesColor.Navy]: glassesColors.navy,
  },
  backgroundColor: {
    [AvatarBackgroundColor.LightGray]: backgroundColors.lightGray,
    [AvatarBackgroundColor.PastelCyan]: backgroundColors.pastelCyan,
    [AvatarBackgroundColor.PastelOrange]: backgroundColors.pastelOrange,
    [AvatarBackgroundColor.PastelPurple]: backgroundColors.pastelPurple,
    [AvatarBackgroundColor.PastelGreen]: backgroundColors.pastelGreen,
    [AvatarBackgroundColor.PastelPeach]: backgroundColors.pastelPeach,
  },
};

export const AVATAR_EDITOR_CATEGORY_CONFIG: AvatarEditorCategoryConfig[] = [
  {
    id: "hair",
    labelKey: "avatarEditor.fields.hair",
    itemField: "hair",
    colorField: "hairColor",
  },
  {
    id: "eyes",
    labelKey: "avatarEditor.fields.eyes",
    itemField: "eyes",
    colorField: "eyeColor",
  },
  {
    id: "expression",
    labelKey: "avatarEditor.fields.expression",
    itemField: "expression",
  },
  {
    id: "beard",
    labelKey: "avatarEditor.fields.beard",
    itemField: "beard",
    colorField: "beardColor",
  },
  {
    id: "accessories",
    labelKey: "avatarEditor.fields.accessories",
    itemField: "accessories",
    colorField: "glassesColor",
  },
  {
    id: "headwear",
    labelKey: "avatarEditor.fields.headwear",
    itemField: "headwear",
  },
  {
    id: "clothing",
    labelKey: "avatarEditor.fields.clothing",
    itemField: "clothing",
  },
  {
    id: "skinColor",
    labelKey: "avatarEditor.fields.skinColor",
    itemField: "skinColor",
  },
  {
    id: "backgroundColor",
    labelKey: "avatarEditor.fields.backgroundColor",
    itemField: "backgroundColor",
  },
];

export const AVATAR_FIELD_LABELS: Partial<Record<AvatarEditableField, string>> =
  {
    hair: "avatarEditor.fields.hair",
    hairColor: "avatarEditor.fields.hairColor",
    eyes: "avatarEditor.fields.eyes",
    eyeColor: "avatarEditor.fields.eyeColor",
    expression: "avatarEditor.fields.expression",
    beard: "avatarEditor.fields.beard",
    beardColor: "avatarEditor.fields.beardColor",
    accessories: "avatarEditor.fields.accessories",
    glassesColor: "avatarEditor.fields.glassesColor",
    headwear: "avatarEditor.fields.headwear",
    clothing: "avatarEditor.fields.clothing",
    skinColor: "avatarEditor.fields.skinColor",
    backgroundColor: "avatarEditor.fields.backgroundColor",
  };

const AVATAR_FIELD_OPTIONS: Partial<
  Record<AvatarEditableField, readonly number[]>
> = {
  hair: [AvatarHair.Hair1, AvatarHair.Hair2, AvatarHair.None],
  eyes: [AvatarEyes.Eyes1, AvatarEyes.Eyes2],
  expression: [AvatarExpression.Expression1, AvatarExpression.Expression2],
  beard: [AvatarBeard.Beard1, AvatarBeard.Beard2, AvatarBeard.None],
  accessories: [AvatarAccessories.Glasses1, AvatarAccessories.None],
  headwear: [AvatarHeadwear.Hat1, AvatarHeadwear.Hat2, AvatarHeadwear.None],
  clothing: [AvatarClothing.Shirt1, AvatarClothing.Shirt2],
  skinColor: [
    AvatarSkinColor.Light,
    AvatarSkinColor.Fair,
    AvatarSkinColor.LightMedium,
    AvatarSkinColor.Medium,
    AvatarSkinColor.Olive,
    AvatarSkinColor.Dark,
    AvatarSkinColor.DeepDark,
  ],
  eyeColor: [
    AvatarEyeColor.DarkBrown,
    AvatarEyeColor.Brown,
    AvatarEyeColor.Blue,
    AvatarEyeColor.Green,
    AvatarEyeColor.Hazel,
    AvatarEyeColor.White,
  ],
  hairColor: [
    AvatarHairColor.Black,
    AvatarHairColor.DarkBrown,
    AvatarHairColor.MediumBrown,
    AvatarHairColor.LightBrown,
    AvatarHairColor.Blond,
    AvatarHairColor.Gray,
    AvatarHairColor.White,
    AvatarHairColor.Red,
  ],
  beardColor: [
    AvatarBeardColor.Black,
    AvatarBeardColor.DarkBrown,
    AvatarBeardColor.MediumBrown,
    AvatarBeardColor.Blond,
    AvatarBeardColor.Gray,
    AvatarBeardColor.White,
  ],
  glassesColor: [
    AvatarGlassesColor.Black,
    AvatarGlassesColor.DarkGray,
    AvatarGlassesColor.Brown,
    AvatarGlassesColor.Navy,
  ],
  backgroundColor: [
    AvatarBackgroundColor.LightGray,
    AvatarBackgroundColor.PastelCyan,
    AvatarBackgroundColor.PastelOrange,
    AvatarBackgroundColor.PastelPurple,
    AvatarBackgroundColor.PastelGreen,
    AvatarBackgroundColor.PastelPeach,
  ],
};

function addValue(
  grouped: Map<AvatarEditableField, Set<number>>,
  field: AvatarEditableField,
  value: unknown,
) {
  const normalized = toAvatarOptionNumber(field, value);
  if (normalized === undefined) {
    return;
  }

  if (!grouped.has(field)) {
    grouped.set(field, new Set<number>());
  }

  grouped.get(field)?.add(normalized);
}

function createCategory(
  config: AvatarEditorCategoryConfig,
  grouped: Map<AvatarEditableField, Set<number>>,
): AvatarCategory {
  const itemValues = Array.from(grouped.get(config.itemField) ?? []);
  const colorValues = config.colorField
    ? Array.from(grouped.get(config.colorField) ?? [])
    : [];

  return {
    id: config.id,
    labelKey: config.labelKey,
    itemField: config.itemField,
    colorField: config.colorField,
    itemValues,
    colorValues,
  };
}

function applyAvatarFieldValue(
  avatar: AvatarDefinition,
  field: AvatarEditableField,
  value: number,
): AvatarDefinition {
  return {
    ...avatar,
    [field]: value as AvatarDefinition[typeof field],
  };
}

export function collectAvatarCategories(
  boughtAvatarItems: ShopItem[],
  currentAvatar: AvatarDefinition,
): AvatarCategory[] {
  const grouped = new Map<AvatarEditableField, Set<number>>();

  boughtAvatarItems.forEach((item) => {
    if (item.image.type !== "avatar") {
      return;
    }
    const avatarPatch = item.image.avatar;

    AVATAR_EDITOR_CATEGORY_CONFIG.forEach((config) => {
      addValue(grouped, config.itemField, avatarPatch[config.itemField]);

      if (config.colorField) {
        addValue(grouped, config.colorField, avatarPatch[config.colorField]);
      }
    });
  });

  AVATAR_EDITOR_CATEGORY_CONFIG.forEach((config) => {
    addValue(grouped, config.itemField, currentAvatar[config.itemField]);
    if (config.colorField) {
      addValue(grouped, config.colorField, currentAvatar[config.colorField]);
    }

    AVATAR_FIELD_OPTIONS[config.itemField]?.forEach((value) =>
      addValue(grouped, config.itemField, value),
    );
    if (config.colorField) {
      AVATAR_FIELD_OPTIONS[config.colorField]?.forEach((value) =>
        addValue(grouped, config.colorField as AvatarEditableField, value),
      );
    }
  });

  return AVATAR_EDITOR_CATEGORY_CONFIG.map((config) =>
    createCategory(config, grouped),
  );
}

export function buildCategoryPreview(
  category: AvatarCategory,
  avatar: AvatarDefinition,
): AvatarDefinition {
  let preview: AvatarDefinition = {
    skinColor: (toAvatarOptionNumber(
      "skinColor",
      avatar.skinColor,
    ) ?? AvatarSkinColor.Light) as AvatarDefinition["skinColor"],
  };

  // Body-only preview for the skin color category.
  if (category.itemField === "skinColor") {
    const skinColor =
      toAvatarOptionNumber("skinColor", avatar.skinColor) ?? category.itemValues[0];
    if (skinColor !== undefined) {
      preview = applyAvatarFieldValue(preview, "skinColor", skinColor);
    }
    return preview;
  }

  const selectedItemValue = avatar[category.itemField];
  const fallbackItemValue = category.itemValues[0];
  const resolvedItemValue =
    typeof selectedItemValue === "number"
      ? selectedItemValue
      : fallbackItemValue;

  if (resolvedItemValue !== undefined) {
    preview = applyAvatarFieldValue(
      preview,
      category.itemField,
      resolvedItemValue,
    );
  }

  if (category.colorField) {
    const selectedColorValue = avatar[category.colorField];
    const fallbackColorValue = category.colorValues[0];
    const resolvedColorValue =
      typeof selectedColorValue === "number"
        ? selectedColorValue
        : fallbackColorValue;

    if (resolvedColorValue !== undefined) {
      preview = applyAvatarFieldValue(
        preview,
        category.colorField,
        resolvedColorValue,
      );
    }
  }

  return preview;
}

export function getAvatarOptionColor(
  field: AvatarEditableField,
  value: number,
): string | undefined {
  return COLOR_FIELD_PALETTE[field]?.[value];
}

function toAvatarOptionNumber(
  field: AvatarEditableField,
  value: unknown,
): number | undefined {
  if (typeof value === "number") {
    return value;
  }

  // Legacy support for old string-valued avatar payloads.
  if (typeof value !== "string") {
    return undefined;
  }

  const legacyMap = LEGACY_FIELD_VALUE_MAP[field];
  return legacyMap?.[value];
}

const LEGACY_FIELD_VALUE_MAP: Partial<Record<AvatarEditableField, Record<string, number>>> =
  {
    hair: { hair_1: AvatarHair.Hair1, hair_2: AvatarHair.Hair2, none: AvatarHair.None },
    eyes: { eyes_1: AvatarEyes.Eyes1, eyes_2: AvatarEyes.Eyes2 },
    expression: {
      expression_1: AvatarExpression.Expression1,
      expression_2: AvatarExpression.Expression2,
    },
    beard: { beard_1: AvatarBeard.Beard1, beard_2: AvatarBeard.Beard2, none: AvatarBeard.None },
    accessories: {
      glasses_1: AvatarAccessories.Glasses1,
      none: AvatarAccessories.None,
    },
    headwear: {
      hat_1: AvatarHeadwear.Hat1,
      hat_2: AvatarHeadwear.Hat2,
      none: AvatarHeadwear.None,
    },
    clothing: { shirt_1: AvatarClothing.Shirt1, shirt_2: AvatarClothing.Shirt2 },
    skinColor: {
      light: AvatarSkinColor.Light,
      fair: AvatarSkinColor.Fair,
      lightMedium: AvatarSkinColor.LightMedium,
      medium: AvatarSkinColor.Medium,
      olive: AvatarSkinColor.Olive,
      dark: AvatarSkinColor.Dark,
      deepDark: AvatarSkinColor.DeepDark,
    },
    eyeColor: {
      darkBrown: AvatarEyeColor.DarkBrown,
      brown: AvatarEyeColor.Brown,
      blue: AvatarEyeColor.Blue,
      green: AvatarEyeColor.Green,
      hazel: AvatarEyeColor.Hazel,
      white: AvatarEyeColor.White,
    },
    hairColor: {
      black: AvatarHairColor.Black,
      darkBrown: AvatarHairColor.DarkBrown,
      mediumBrown: AvatarHairColor.MediumBrown,
      lightBrown: AvatarHairColor.LightBrown,
      blond: AvatarHairColor.Blond,
      gray: AvatarHairColor.Gray,
      white: AvatarHairColor.White,
      red: AvatarHairColor.Red,
    },
    beardColor: {
      black: AvatarBeardColor.Black,
      darkBrown: AvatarBeardColor.DarkBrown,
      mediumBrown: AvatarBeardColor.MediumBrown,
      blond: AvatarBeardColor.Blond,
      gray: AvatarBeardColor.Gray,
      white: AvatarBeardColor.White,
    },
    glassesColor: {
      black: AvatarGlassesColor.Black,
      darkGray: AvatarGlassesColor.DarkGray,
      brown: AvatarGlassesColor.Brown,
      navy: AvatarGlassesColor.Navy,
    },
    backgroundColor: {
      lightGray: AvatarBackgroundColor.LightGray,
      pastelCyan: AvatarBackgroundColor.PastelCyan,
      pastelOrange: AvatarBackgroundColor.PastelOrange,
      pastelPurple: AvatarBackgroundColor.PastelPurple,
      pastelGreen: AvatarBackgroundColor.PastelGreen,
      pastelPeach: AvatarBackgroundColor.PastelPeach,
    },
  };

export function serializeAvatar(definition: AvatarDefinition): string {
  return JSON.stringify(
    Object.keys(definition)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        const typedKey = key as keyof AvatarDefinition;
        acc[key] = definition[typedKey];
        return acc;
      }, {}),
  );
}
