import type { AvatarDefinition } from "components/avatar/Avatar";
import {
  backgroundColors,
  beardColors,
  eyeColors,
  glassesColors,
  hairColors,
  skinColors,
} from "components/avatar/avatarColors";

import type { ShopItem } from "infrastructure/api/user/shop-items/ShopItems";

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
  itemValues: string[];
  colorValues: string[];
}

export const COLOR_FIELD_PALETTE: Partial<
  Record<AvatarEditableField, Record<string, string>>
> = {
  skinColor: skinColors,
  eyeColor: eyeColors,
  hairColor: hairColors,
  beardColor: beardColors,
  glassesColor: glassesColors,
  backgroundColor: backgroundColors,
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

export const AVATAR_FIELD_LABELS: Partial<Record<AvatarEditableField, string>> = {
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
  Record<AvatarEditableField, readonly string[]>
> = {
  hair: ["hair_1", "hair_2", "none"] satisfies NonNullable<
    AvatarDefinition["hair"]
  >[],
  eyes: ["eyes_1", "eyes_2"] satisfies NonNullable<AvatarDefinition["eyes"]>[],
  expression: ["expression_1", "expression_2"] satisfies NonNullable<
    AvatarDefinition["expression"]
  >[],
  beard: ["beard_1", "beard_2", "none"] satisfies NonNullable<
    AvatarDefinition["beard"]
  >[],
  accessories: ["glasses_1", "none"] satisfies NonNullable<
    AvatarDefinition["accessories"]
  >[],
  headwear: ["hat_1", "hat_2", "none"] satisfies NonNullable<
    AvatarDefinition["headwear"]
  >[],
  clothing: ["shirt_1", "shirt_2"] satisfies NonNullable<
    AvatarDefinition["clothing"]
  >[],
  skinColor: Object.keys(skinColors) as NonNullable<
    AvatarDefinition["skinColor"]
  >[],
  eyeColor: Object.keys(eyeColors) as NonNullable<AvatarDefinition["eyeColor"]>[],
  hairColor: Object.keys(hairColors) as NonNullable<
    AvatarDefinition["hairColor"]
  >[],
  beardColor: Object.keys(beardColors) as NonNullable<
    AvatarDefinition["beardColor"]
  >[],
  glassesColor: Object.keys(glassesColors) as NonNullable<
    AvatarDefinition["glassesColor"]
  >[],
  backgroundColor: Object.keys(backgroundColors) as NonNullable<
    AvatarDefinition["backgroundColor"]
  >[],
};

function addValue(
  grouped: Map<AvatarEditableField, Set<string>>,
  field: AvatarEditableField,
  value?: string,
) {
  if (typeof value !== "string") {
    return;
  }

  if (!grouped.has(field)) {
    grouped.set(field, new Set<string>());
  }

  grouped.get(field)?.add(value);
}

function createCategory(
  config: AvatarEditorCategoryConfig,
  grouped: Map<AvatarEditableField, Set<string>>,
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
  value: string,
): AvatarDefinition {
  return {
    ...avatar,
    [field]: value as AvatarDefinition[AvatarEditableField],
  };
}

export function collectAvatarCategories(
  boughtAvatarItems: ShopItem[],
  currentAvatar: AvatarDefinition,
): AvatarCategory[] {
  const grouped = new Map<AvatarEditableField, Set<string>>();

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
    skinColor: avatar.skinColor ?? "light",
  };

  // Body-only preview for the skin color category.
  if (category.itemField === "skinColor") {
    const skinColor =
      (typeof avatar.skinColor === "string" && avatar.skinColor) ||
      category.itemValues[0];
    if (skinColor) {
      preview = applyAvatarFieldValue(preview, "skinColor", skinColor);
    }
    return preview;
  }

  const selectedItemValue = avatar[category.itemField];
  const fallbackItemValue = category.itemValues[0];
  const resolvedItemValue =
    typeof selectedItemValue === "string"
      ? selectedItemValue
      : fallbackItemValue;

  if (resolvedItemValue) {
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
      typeof selectedColorValue === "string"
        ? selectedColorValue
        : fallbackColorValue;

    if (resolvedColorValue) {
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
  value: string,
): string | undefined {
  return COLOR_FIELD_PALETTE[field]?.[value];
}

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
